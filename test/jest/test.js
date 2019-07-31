const fs = require('fs');
const path = require('path');
const extFs = require('yyl-fs');
const util = require('yyl-util');

const Handler = require('../../lib/yh');

const TEST_CTRL = {
  SET_VARS: true,
  HIDE_PROTOCOL: true,
  SUGAR_REPLACE: true,
  PARSE_CONFIG: true,
  OPTIMIZE: true
};

const FRAG_PATH = path.join(__dirname, '../__frag');

const fn = {
  frag: {
    async build() {
      if (fs.existsSync(FRAG_PATH)) {
        await fn.frag.destroy();
      }
      await extFs.mkdirSync(FRAG_PATH);
    },
    async destroy() {
      await extFs.removeFiles(FRAG_PATH, true);
    }
  }
};

const log = () => {};
const USERPROFILE = process.env[process.platform == 'win32'? 'USERPROFILE': 'HOME'];

const vars = {
  PROJECT_PATH: process.cwd(),
  SERVER_PLUGIN_PATH: util.path.join(USERPROFILE, '.yyl/plugins')
};

const yh = new Handler( { log, vars });

if (TEST_CTRL.SET_VARS) {
  test('yh.setVars(vars): IVars', () => {
    const r = yh.setVars({ PROJECT_PATH: __dirname});
    expect(r.PROJECT_PATH).toEqual(__dirname);
    expect(yh.vars.PROJECT_PATH).toEqual(__dirname);
  });
}

if (TEST_CTRL.HIDE_PROTOCOL) {
  test('yh.hideProtocol(iPath): string', () => {
    const checkingMap = {
      'http://www.yy.com/991': '//www.yy.com/991',
      'https://www.yy.com/991': '//www.yy.com/991',
      'http://www.yy.com/991?from=https:': '//www.yy.com/991?from=https:'
    };
    Object.keys(checkingMap).forEach((key) => {
      expect(yh.hideProtocol(key)).toEqual(checkingMap[key]);
    });
  });
}

if (TEST_CTRL.SUGAR_REPLACE) {
  test('yh.sugarReplace(str, data): string', () => {
    const checkingArr = [{
      str: 'hello {$name}',
      data: { name: 'jackness' },
      result: 'hello jackness'
    }, {
      str: 'hello {$name} {$name}',
      data: { name: 'jackness' },
      result: 'hello jackness jackness'
    }, {
      str: ['hello {$name}', 'hello {$name}'].join('\r\n'),
      data: { name: 'jackness' },
      result: ['hello jackness', 'hello jackness'].join('\r\n')
    }, {
      str: 'hello {$name}',
      data: {},
      result: 'hello {$name}'
    }];

    checkingArr.forEach((item) => {
      expect(yh.sugarReplace(item.str, item.data)).toEqual(item.result);
    });
  });
}

if (TEST_CTRL.PARSE_CONFIG) {
  test('yh.parseConfig(configPath, iEnv, returnKeys): object', async () => {
    const configDir = util.path.join(__dirname, '../case/case-parse-config');
    const configPath = path.join(configDir, 'yyl.config.js');
    yh.setVars({ PROJECT_PATH: configDir });
    const r = await yh.parseConfig(configPath, { workflow: 'webpack-vue3'});
    const expectResult = {
      'workflow': 'webpack-vue3',
      'name': '1',
      'version': '3.4.10',
      'platform': 'mobile',
      'proxy': {
        'port': 8887,
        'localRemote': {
          'http://web.yy.com/': 'http://127.0.0.1:5000/',
          'http://www.yy.com/web/1': 'http://127.0.0.1:5000/project/1/mobile/html',
          'http://www.yy.com/api/mock': 'http://127.0.0.1:5000/api/mock'
        },
        'homePage': 'http://www.yy.com/web/1/'
      },
      'localserver': {
        'root': './dist',
        'port': 5000
      },
      'dest': {
        'basePath': '/project/1/mobile',
        'jsPath': 'js',
        'jslibPath': 'js/lib',
        'cssPath': 'css',
        'htmlPath': 'html',
        'imagesPath': 'images',
        'tplPath': 'tpl',
        'revPath': 'assets'
      },
      'commit': {
        'type': 'gitlab-ci',
        'revAddr': 'http://web.yystatic.com/project/1/mobile/assets/rev-manifest.json',
        'hostname': '//web.yystatic.com',
        'staticHost': '//web.yystatic.com',
        'mainHost': '//www.yy.com/web'
      },
      'concat': {},
      'resource': {},
      'plugins': [
        'yyl-flexlayout'
      ],
      'webpackConfigPath': `${configDir}/webpack.config.js`,
      'alias': {
        'root': `${configDir}/dist/project/1/mobile`,
        'revRoot': `${configDir}/dist/project/1/mobile`,
        'destRoot': `${configDir}/dist`,
        'srcRoot': `${configDir}/src`,
        'dirname': `${configDir}`,
        'commons': util.path.join(configDir, '../commons'),
        'globalcomponents': util.path.join(configDir, '../commons/components'),
        'globallib': util.path.join(configDir, '../commons/lib'),
        'jsDest': `${configDir}/dist/project/1/mobile/js`,
        'jslibDest': `${configDir}/dist/project/1/mobile/js/lib`,
        'htmlDest': `${configDir}/dist/project/1/mobile/html`,
        'cssDest': `${configDir}/dist/project/1/mobile/css`,
        'imagesDest': `${configDir}/dist/project/1/mobile/images`,
        'revDest': `${configDir}/dist/project/1/mobile/assets`,
        'tplDest': `${configDir}/dist/project/1/mobile/tpl`,
        '@': `${configDir}/src`,
        '~@': `${configDir}/src/components`
      },
      'resolveModule': `${yh.vars.SERVER_PLUGIN_PATH}/webpack-vue3/1/node_modules`
    };

    expectResult.concat[`${configDir}/dist/project/1/mobile/js/vendors.js`] = [
      `${configDir}/src/js/lib/a.js`,
      `${configDir}/src/js/lib/b.js`
    ];

    expectResult.resource[`${configDir}/src/pc/svga`] = `${configDir}/dist/project/1/mobile/tpl`;
    expect(r).toEqual(expectResult);
  });

  test('yh.parseConfig(configPath, iEnv, returnKeys): object no plugins', async () => {
    const configDir = util.path.join(__dirname, '../case/case-parse-config-noplugins');
    const configPath = path.join(configDir, 'yyl.config.js');
    yh.setVars({ PROJECT_PATH: configDir });
    const r = await yh.parseConfig(configPath);
    const expectResult = {
      'workflow': 'webpack-vue2',
      'name': '1',
      'version': '3.4.10',
      'platform': 'mobile',
      'proxy': {
        'port': 8887,
        'localRemote': {
          'http://web.yy.com/': 'http://127.0.0.1:5000/',
          'http://www.yy.com/web/1': 'http://127.0.0.1:5000/project/1/mobile/html',
          'http://www.yy.com/api/mock': 'http://127.0.0.1:5000/api/mock'
        },
        'homePage': 'http://www.yy.com/web/1/'
      },
      'localserver': {
        'root': './dist',
        'port': 5000
      },
      'dest': {
        'basePath': '/project/1/mobile',
        'jsPath': 'js',
        'jslibPath': 'js/lib',
        'cssPath': 'css',
        'htmlPath': 'html',
        'imagesPath': 'images',
        'tplPath': 'tpl',
        'revPath': 'assets'
      },
      'commit': {
        'type': 'gitlab-ci',
        'revAddr': 'http://web.yystatic.com/project/1/mobile/assets/rev-manifest.json',
        'hostname': '//web.yystatic.com',
        'staticHost': '//web.yystatic.com',
        'mainHost': '//www.yy.com/web'
      },
      'concat': {},
      'resource': {},
      'plugins': [],
      'webpackConfigPath': `${configDir}/webpack.config.js`,
      'alias': {
        'root': `${configDir}/dist/project/1/mobile`,
        'revRoot': `${configDir}/dist/project/1/mobile`,
        'destRoot': `${configDir}/dist`,
        'srcRoot': `${configDir}/src`,
        'dirname': `${configDir}`,
        'commons': util.path.join(configDir, '../commons'),
        'globalcomponents': util.path.join(configDir, '../commons/components'),
        'globallib': util.path.join(configDir, '../commons/lib'),
        'jsDest': `${configDir}/dist/project/1/mobile/js`,
        'jslibDest': `${configDir}/dist/project/1/mobile/js/lib`,
        'htmlDest': `${configDir}/dist/project/1/mobile/html`,
        'cssDest': `${configDir}/dist/project/1/mobile/css`,
        'imagesDest': `${configDir}/dist/project/1/mobile/images`,
        'revDest': `${configDir}/dist/project/1/mobile/assets`,
        'tplDest': `${configDir}/dist/project/1/mobile/tpl`,
        '@': `${configDir}/src`,
        '~@': `${configDir}/src/components`
      }
    };

    expectResult.concat[`${configDir}/dist/project/1/mobile/js/vendors.js`] = [
      `${configDir}/src/js/lib/a.js`,
      `${configDir}/src/js/lib/b.js`
    ];

    expectResult.resource[`${configDir}/src/pc/svga`] = `${configDir}/dist/project/1/mobile/tpl`;
    expect(r).toEqual(expectResult);
  });
}

if (TEST_CTRL.OPTIMIZE) {
  test('yh.optimize.afterTask(): Promise<any>', async () => {
    // 准备
    await fn.frag.build();
    const casePath = path.join(__dirname, '../case/case-optimize/');
    await extFs.copyFiles(casePath, FRAG_PATH);

    // 开始
    const configPath = path.join(FRAG_PATH, 'yyl.config.js');
    const iEnv = { isCommit: true };
    const config = await yh.parseConfig(configPath, iEnv);
    const revPath = path.join(config.alias.revDest, yh.optimize.rev.filename);

    const serverPluginPath = path.join(yh.vars.SERVER_PLUGIN_PATH, config.workflow, config.name);
    await extFs.removeFiles(serverPluginPath);

    // 检查结果
    const check = function() {
      // plugins check
      expect(fs.existsSync(path.join(serverPluginPath, 'node_modules/yyl-flexlayout'))).toEqual(true);

      // resource check
      expect(fs.existsSync(path.join(config.alias.root, 'svga', 'logo.png'))).toEqual(true);
      expect(fs.existsSync(path.join(config.alias.root, 'svga', 't.js'))).toEqual(true);

      // concat check
      expect(fs.existsSync(path.join(config.alias.jsDest, 'vendors.js'))).toEqual(true);

      // rev check
      expect(fs.existsSync(revPath)).toEqual(true);

      // varSugar check
      const htmlPath = path.join(config.alias.htmlDest, 'index.html');
      const htmlCnt = fs.readFileSync(htmlPath).toString();

      const SUGAR_REG = /(\{\$)([a-zA-Z0-9@_\-$.~]+)(\})/g;
      const URL_REG = /__url\(/g;
      expect(htmlCnt.match(SUGAR_REG)).toEqual(null);
      expect(htmlCnt.match(URL_REG)).toEqual(null);

      // varSugar js check
      const jsPath = path.join(config.alias.svgaDest, 't.js');
      const jsCnt = fs.readFileSync(jsPath).toString();
      expect(jsCnt.match(SUGAR_REG)).toEqual(null);
      expect(jsCnt.match(URL_REG)).toEqual(null);
    };

    yh.optimize.init({ config, iEnv });

    // 构建模拟
    await yh.optimize.initPlugins();
    await yh.optimize.afterTask(false);
    check();
    const revData1 = JSON.parse(fs.readFileSync(revPath).toString());

    // 更新模拟
    await extFs.copyFiles(casePath, FRAG_PATH);

    // 文件变更模拟
    const vendorsPath = path.join(config.alias.jsDest, 'vendors.js');
    let vCnt = fs.readFileSync(vendorsPath).toString();
    vCnt = `console.log(1123);${vCnt}`;
    fs.writeFileSync(vendorsPath, vCnt);

    await yh.optimize.afterTask(true);
    check();
    const revData2 = JSON.parse(fs.readFileSync(revPath).toString());

    // rev hash 变更校验
    expect(revData1).toEqual(revData2);

    // 销毁
    await fn.frag.destroy();
  });
}