const path = require('path');
const util = require('yyl-util');
const fs = require('fs');
const extFs = require('yyl-fs');
const extOs = require('yyl-os');
const chalk = require('chalk');
const request = require('yyl-request');

class Opzer {
  constructor({log, extFn, vars}) {
    this.log = log;
    this.extFn = extFn;
    this.config = null;
    this.iEnv = {};
    this.vars = vars;
  }
  setVars(vars) {
    this.vars = vars;
  }
  init ({config, iEnv}) {
    this.config = config;
    this.iEnv = iEnv;
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

  async getHomePage() {
    const { vars, config, iEnv} = this;

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
    return addr;
  }

  async openHomePage() {
    const { log } = this;
    const addr = await this.getHomePage();

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