const path = require('path');
const Concat = require('concat-with-sourcemaps');
const util = require('yyl-util');
const fs = require('fs');
const frp = require('yyl-file-replacer');
const extFs = require('yyl-fs');
const extOs = require('yyl-os');
const chalk = require('chalk');
const request = require('yyl-request');

const Rev = require('./rev');

class Opzer {
  constructor({log, extFn, vars}) {
    this.log = log;
    this.extFn = extFn;
    this.config = null;
    this.iEnv = {};
    this.vars = vars;
    this.rev = new Rev({ log, vars });
  }
  setVars(vars) {
    this.rev.setVars(vars);
    this.vars = vars;
  }
  init ({config, iEnv}) {
    this.config = config;
    this.iEnv = iEnv;
    this.rev.init({ config, iEnv });
  }
  async afterTask(isUpdate) {
    const self = this;
    const { iEnv } = this;

    await self.resource();
    await self.concat();
    await self.varSugar();

    if (isUpdate) {
      await self.rev.update();
    } else {
      iEnv.revIgnore = /async_component/;
      await self.rev.build();
    }
  }
  async varSugar() {
    const { log, extFn, config, iEnv } = this;

    const varObj = util.extend({}, config.alias);
    let mainPrefix = '/';
    let staticPrefix = '/';
    let root = varObj.destRoot;

    if (iEnv.remote || iEnv.isCommit) {
      mainPrefix = config.commit.mainHost || config.commit.hostname || '/';
      staticPrefix = config.commit.staticHost || config.commit.hostname || '/';
    }

    Object.keys(varObj).forEach((key) => {
      let iPrefix = '';
      if (varObj[key].match(frp.IS_MAIN_REMOTE)) {
        iPrefix = mainPrefix;
      } else {
        iPrefix = staticPrefix;
      }
      varObj[key] = util.path.join(
        iPrefix,
        path.relative(root, varObj[key])
      );
    });

    const htmls = await extFs.readFilePaths(config.destRoot, /\.html$/, true);

    htmls.forEach((iPath) => {
      let iCnt = fs.readFileSync(iPath).toString();
      iCnt = frp.htmlPathMatch(iCnt, (rPath) => {
        return extFn.sugarReplace(rPath, varObj);
      });
      fs.writeFileSync(iPath, iCnt);
    });
    log('msg', 'success', 'varSugar run finished');
  }
  async concat() {
    const { log, config } = this;

    if (config.concat) {
      log('msg', 'info', 'concat start');
      const keys = Object.keys(config.concat);
      if (keys.length) {
        await util.forEach(keys, async (dest) => {
          const srcs = config.concat[dest];
          const concat = new Concat(false, dest, '\n');

          srcs.forEach((item) => {
            if (!fs.existsSync(item)) {
              log('msg', 'warn', `${item} is not exists, break`);
              return;
            }

            if (path.extname(item) == '.js') {
              concat.add(null, `;/* ${path.basename(item)} */`);
            } else {
              concat.add(null, `/* ${path.basename(item)} */`);
            }
            concat.add(item, fs.readFileSync(item));
          });

          await extFs.mkdirSync(path.dirname(dest));
          fs.writeFileSync(dest, concat.content);
          log('msg', 'concat', [dest].concat(srcs));
        });
      } else {
        log('msg', 'success', 'concat finished, no concat setting');
      }
    } else {
      log('msg', 'info', 'config.concat is not defined, break');
    }
  }
  async resource() {
    const { log, config } = this;

    if (config.resource) {
      const data = await extFs.copyFiles(config.resource);
      data.add.forEach((iPath) => {
        log('msg', 'create', iPath);
      });

      data.update.forEach((iPath) => {
        log('msg', 'update', iPath);
      });
      log('msg', 'success', 'resource copy finished');
    } else {
      log('msg', 'info', 'config.resource is not defined, break');
    }
  }
  async initPlugins() {
    const { config } = this;
    let pluginPath = null;
    if (config.resolveModule) {
      pluginPath = path.join(config.resolveModule, '..');
      if (!fs.existsSync(pluginPath)) {
        extFs.mkdirSync(pluginPath);
      }
    }
    return await extOs.installNodeModules(config.plugins, pluginPath);
  }

  async openHomePage() {
    const { log, vars, config, iEnv} = this;

    const htmls = await extFs.readFilePaths(config.alias.destRoot, /\.html$/, true);
    let addr;
    const localServerAddr = `http://${vars.LOCAL_SERVER}:${config.localserver.port}`;
    const localServerAddr2 = `http://127.0.0.1:${config.localserver.port}`;
    const iHost = config.commit.hostname.replace(/\/$/, '');

    htmls.sort((a, b) => {
      const aName = path.basename(a);
      const bName = path.basename(b);
      const reg = /^index|default$/;
      const aReg = reg.exec(aName);
      const bReg = reg.exec(bName);

      if (aReg && !bReg) {
        return -1;
      } else if (!aReg && bReg) {
        return 1;
      } else {
        return a.localeCompare(b);
      }
    });

    if (config.proxy && config.proxy.homePage) {
      addr = config.proxy.homePage;
    } else {
      if (iEnv.proxy) {
        let iAddr = '';
        if (config.proxy && config.proxy.localRemote) {
          for (let key in config.proxy.localRemote) {
            iAddr = config.proxy.localRemote[key].replace(/\/$/, '');
            if ((iAddr === localServerAddr || iAddr === localServerAddr2) && key.replace(/\/$/, '') !== iHost) {
              addr = key;
              break;
            }
          }
        }
        if (!addr) {
          addr = config.commit.hostname;
        }
      } else {
        addr = localServerAddr;
      }

      if (htmls.length) {
        addr = util.path.join(addr, path.relative(config.alias.destRoot, htmls[0]));
      }
    }

    log('msg', 'success', 'open addr:');
    log('msg', 'success', chalk.cyan(addr));
    await extOs.openBrowser(addr);
    return addr;
  }
  async livereload() {
    const { config, vars } = this;

    const reloadPath = `http://${vars.LOCAL_SERVER}:${config.localserver.port}1/changed?files=1`;
    try {
      await request(reloadPath);
    } catch (er) { }
  }
  async saveConfigToServer() {
    const { log, vars, config } = this;

    if (!config || !config.workflow || !config.name) {
      return;
    }
    await extFs.mkdirSync(vars.SERVER_CONFIG_LOG_PATH);
    const filename = `${config.workflow}-${config.name}.js`;
    const serverConfigPath = path.join(vars.SERVER_CONFIG_LOG_PATH, filename);
    const printPath = `~/.yyl/${path.relative(vars.SERVER_PATH, serverConfigPath)}`;
    fs.writeFileSync(serverConfigPath, JSON.stringify(config, null, 2));
    log('msg', 'success', `config saved ${chalk.yellow(printPath)}`);
  }
}

module.exports = Opzer;