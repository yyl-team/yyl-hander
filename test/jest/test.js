const fs = require('fs');
const path = require('path');
const extFs = require('yyl-fs');
const util = require('yyl-util');

const Handler = require('../../lib/yh');

const TEST_CTRL = {
  SET_VARS: true,
  HIDE_PROTOCOL: true,
  SUGAR_REPLACE: true,
  PARSE_CONFIG: true
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
    const r = await yh.parseConfig(configPath, {});
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
      'plugins': [
        'yyl-flexlayout',
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
      'resolveModule': `${yh.vars.SERVER_PLUGIN_PATH}/webpack-vue2/node_modules`
    };

    expectResult.concat[`${configDir}/dist/project/1/mobile/js/vendors.js`] = [
      `${configDir}/src/js/lib/a.js`,
      `${configDir}/src/js/lib/b.js`
    ];

    expectResult.resource[`${configDir}/src/pc/svga`] = `${configDir}/dist/project/1/mobile/tpl`;
    expect(r).toEqual(expectResult);
  });
}