const path = require('path');
const Concat = require('concat-with-sourcemaps');
const util = require('yyl-util');
const fs = require('fs');
const frp = require('yyl-file-replacer');
const extFs = require('yyl-fs');

class Opzer {
  constructor(log, extFn) {
    this.log = log;
    this.extFn = extFn;
  }
  async afterTask(config, iEnv, isUpdate) {
    const self = this;
    await self.resource(config, iEnv);
    await self.concat(config, iEnv);
    await self.varSugar(config, iEnv);

    if (isUpdate) {
      await self.rev.update(config, iEnv);
    } else {
      iEnv.revIgnore = /async_component/;
      await self.rev.build(config, iEnv);
    }
  }
  async varSugar(config, iEnv) {
    const log = this.log;
    const extFn = this.extFn;
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
  async concat(config) {
    const log = this.log;
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
}

module.exports = Opzer;