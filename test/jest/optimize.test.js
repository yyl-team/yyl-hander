const fn = require('../lib/util');
const path = require('path');
const extFs = require('yyl-fs');
const fs = require('fs');
const { Handler, log, vars, FRAG_PATH } = require('../lib/const');
const yh = new Handler( { log, vars });

test('yh.optimize.afterTask(): Promise<any>', async () => {
  // 准备
  await fn.frag.build(FRAG_PATH);
  const casePath = path.join(__dirname, '../case/case-optimize/');
  await extFs.copyFiles(casePath, FRAG_PATH);

  // 开始
  const configPath = path.join(FRAG_PATH, 'yyl.config.js');
  const iEnv = { isCommit: true, branches: 'master' };
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

    // rev 内容检查 isCommit, version, branches 是否存在
    const rMap = JSON.parse(fs.readFileSync(revPath).toString());
    expect(rMap.isCommit).toEqual(undefined);
    expect(rMap.branches).toEqual('master');

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
  await fn.frag.destroy(FRAG_PATH);
});