const path = require('path');
const util = require('yyl-util');
const extOs = require('yyl-os');
const fs = require('fs');
const chalk = require('chalk');
const Opzer = require('./opzer');
const pkg = require('../package.json');

const SUGAR_REG = /(\{\$)([a-zA-Z0-9@_\-$.~]+)(\})/g;
const USERPROFILE = process.env[process.platform == 'win32'? 'USERPROFILE': 'HOME'];

class Handler {
  constructor({ log, vars }) {
    const self = this;
    self.log = log;
    self.optimize = new Opzer( { log, extFn: this });
    self.setVars(Object.assign({
      // 本机ip
      LOCAL_SERVER: extOs.LOCAL_IP,

      // pkg 版本 用于 proxy useragent
      PKG_VERSION: pkg.version,

      // 是否 windows 系统
      IS_WINDOWS: process.platform == 'win32',

      // server 根目录
      SERVER_PATH: util.path.join(USERPROFILE, '.yyl'),

      // server 数据存放目录
      SERVER_DATA_PATH: util.path.join(USERPROFILE, '.yyl/data'),

      // server plugins 存放目录
      SERVER_PLUGIN_PATH: util.path.join(USERPROFILE, '.yyl/plugins'),

      // server proxy mapping 存放地址
      SERVER_PROXY_MAPPING_FILE: util.path.join(USERPROFILE, '.yyl/data/proxy-mapping.js'),

      // server 存放构建生成的 config 的缓存文件
      SERVER_CONFIG_LOG_PATH: util.path.join(USERPROFILE, '.yyl/config-log'),

      // proxy 缓存目录
      PROXY_CACHE_PATH: util.path.join(USERPROFILE, '.anyproxy/cache')
    }, vars));
  }
  setVars(op) {
    this.vars = Object.assign(this.vars, op);
    return this.vars;
  }
  hideProtocol(str) {
    if (typeof str === 'string') {
      return str.replace(/^http[s]?:/, '');
    } else {
      return str;
    }
  }
  sugarReplace(str, alias) {
    return str.replace(SUGAR_REG, (str, $1, $2) => {
      if ($2 in alias) {
        return alias[$2];
      } else {
        return str;
      }
    });
  }
  parseConfig(configPath, iEnv, returnKeys) {
    const vars = this.vars;
    const log = this.log;
    const self = this;

    let config = {};
    if (!fs.existsSync(configPath)) {
      throw `config path not exists: ${chalk.yellow(configPath)}`;
    }

    const dirname = path.dirname(configPath);

    try {
      util.extend(true, config, util.requireJs(configPath));
    } catch (er) {
      throw `config parse error: ${configPath}, ${er.message}`;
    }

    // extend config.mine.js
    let mineConfig = {};
    const mineConfigPath = configPath.replace(/\.js$/, '.mine.js');

    if (fs.existsSync(mineConfigPath)) {
      try {
        mineConfig = util.requireJs(mineConfigPath);
      } catch (er) { }
    }

    util.extend(true, config, mineConfig);

    let usefulKeys = [];
    const isUseful = function (obj, ctx) {
      let keys = [];
      if (typeof ctx === 'string') {
        keys.push(ctx);
      } else if (util.type(ctx) === 'array') {
        keys = ctx;
      }
      if (!keys.length) {
        return true;
      }
      let r = false;
      keys.forEach((key) => {
        if (key in obj) {
          r = true;
        }
      });
      return r;
    };
    const usefulCtx = returnKeys || 'workflow';

    if (!isUseful(config, usefulCtx)) {
      Object.keys(config).forEach((key) => {
        if (isUseful(config[key], usefulCtx)) {
          usefulKeys.push(key);
        }
      });
    }

    if (!iEnv.name && usefulKeys.length) {
      throw `missing --name options: ${usefulKeys.join('|')}`;
    } else if (iEnv.name && usefulKeys.indexOf(iEnv.name) === -1) {
      throw `--name ${iEnv.name} is not the right command, usage: ${Object.keys(config).join('|')}`;
    } else if (iEnv.name && config[iEnv.name]) {
      config = config[iEnv.name];
    }

    if (!isUseful(config, usefulCtx)) {
      let errMsg = util.type(usefulCtx) === 'array' ? usefulCtx.join(',') : usefulCtx;
      throw `config[${errMsg}] is not defined`;
    }

    // alias format to absolute
    if (config.alias) {
      Object.keys(config.alias).forEach((key) => {
        config.alias[key] = util.path.resolve(
          dirname,
          config.alias[key]
        );
      });
    }

    // webpackConfigPath format to absolute
    if (config.webpackConfigPath) {
      config.webpackConfigPath = util.path.resolve(dirname, config.webpackConfigPath);
    }

    // config.resource to absolute
    if (config.resource) {
      Object.keys(config.resource).forEach((key) => {
        const curKey = util.path.resolve(dirname, key);
        config.resource[curKey] = util.path.resolve(dirname, config.resource[key]);
        delete config.resource[key];
      });
    }

    // 文件变量解析
    const deep = (obj) => {
      Object.keys(obj).forEach((key) => {
        const curKey = self.sugarReplace(key, config.alias);
        if (curKey !== key) {
          obj[curKey] = obj[key];
          delete obj[key];
        }

        switch (util.type(obj[curKey])) {
          case 'array':
            obj[curKey] = obj[curKey].map((val) => {
              if (util.type(val) === 'string') {
                return self.sugarReplace(val, config.alias);
              } else {
                return val;
              }
            });

          case 'object':
            deep(obj[curKey]);
            break;

          case 'string':
            obj[curKey] = self.sugarReplace(obj[curKey], config.alias);
            break;

          case 'number':
            break;

          default:
            break;
        }
      });
    };

    ['concat', 'commit'].forEach((key) => {
      if (util.type(config[key]) === 'object') {
        deep(config[key]);
      }
    });

    // 必要字段检查
    // alias 相关检查
    if (!returnKeys || (returnKeys && ~returnKeys.indexOf('alias'))) {
      if (!config.alias) {
        config.alias = {};
      }
      if (config.alias && !config.alias.dirname) {
        config.alias.dirname = vars.PROJECT_PATH;
      }

      // 必要字段
      [
        'srcRoot',
        'destRoot'
      ].some((key) => {
        if (!config.alias[key]) {
          throw `${chalk.yellow(`config.alias.${key}`)} is necessary, please check your config: ${chalk.cyan(configPath)}`;
        }
      });

      // 必要字段 2
      if (!config.commit || !config.commit.hostname) {
        throw `${chalk.yellow(config.commit.hostname)} is necessary, please check your config: ${chalk.cyan(configPath)}`;
      }

      // 选填字段
      [
        'globalcomponents',
        'globallib',
        'destRoot',
        'imagesDest',
        'jsDest',
        'revDest',
        'jslibDest',
        'cssDest',
        'imagesDest',
        'htmlDest',
        'tplDest'
      ].some((key) => {
        if (!config.alias[key]) {
          config.alias[key] = config.alias.destRoot;
          log('msg', 'warn', `${chalk.yellow(`config.alias.${key}`)} is not set, auto fill it: ${chalk.cyan(`config.alias.${key} = '${config.alias.destRoot}'`)}`);
        }
      });
    }

    // platform 相关检查
    if (!returnKeys || (returnKeys && ~returnKeys.indexOf('platform'))) {
      if (!config.platform) {
        config.platform = 'pc';
        log('msg', 'warn', `${chalk.yellow('config.platform')} is not exist, build it ${chalk.cyan(`config.platform = ${config.platform}`)}`);
      }
    }

    // localserver
    if (!returnKeys || (returnKeys && ~returnKeys.indexOf('localserver'))) {
      if (!config.localserver) {
        config.localserver = {};
      }
      if (!config.localserver.root) {
        config.localserver.root = util.path.join(vars.PROJECT_PATH, 'dist');
      }
    }

    // 配置 resolveModule (适用于 webpack-vue2)
    if (!config.resolveModule && config.workflow) {
      config.resolveModule = util.path.join(vars.SERVER_PLUGIN_PATH, config.workflow, 'node_modules');
    }

    let r = {};
    if (returnKeys) {
      returnKeys.forEach((key) => {
        r[key] = config[key];
      });
    } else {
      r = config;
    }
    return Promise.resolve(r);
  }
}


module.exports = Handler;