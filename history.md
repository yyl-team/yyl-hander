# 版本变更
## 1.2.2 (*)

- feat: 更新 `yyl-server@1.0.5`

## 1.2.1 (2021-04-06)

- feat: 更新 `yyl-server@1.0.4`

## 1.1.7 (2021-03-08)

- feat: 调整 log

## 1.1.6 (2021-03-08)

- feat: 调整 log

## 1.1.5 (2021-03-08)

- feat: 调整 log

## 1.1.4 (2021-03-08)

- feat: 调整 logger 类型
- feat: 更新 `yyl-seed-base@0.2.4`

## 1.1.2 (2021-03-02)

- feat: 补充关键节点 log

## 1.1.0 (2021-02-22)

- feat: 新增 init 方法
- feat: 调整 logger types

## 1.0.0 (2021-02-11)

- feat: 全新改版

## 0.12.2 (2020-10-12)

- feat: 当 initScript 设置为 function 并且返回字符串时， 依然执行 runCMD

## 0.12.1 (2020-10-12)

- feat: 补充 beforeScripts， afterScripts 相关 log
- fix: 修复 当执行 beforescript 中 webpack 时，会阻塞 yyl webpack hooks 通知问题

## 0.12.0 (2020-10-10)

- feat: 接入 `yyl-config-types`
- feat: 新增 `yh.initBeforeScript()`, `yh.initAfterScript()`
- feat: 重新整理 test 用例

## 0.11.4 (2020-09-22)

- fix: yh.parseConfig localserver.root 路径调整

## 0.11.3 (2020-09-22)

- feat: yh.opzer localserver 为空时兼容处理

## 0.11.2 (2020-09-22)

- feat: yh.parseConfig localserver 字段自动补全

## 0.11.1 (2020-09-22)

- feat: yh.parseConfig 所有必要字段都改为自动填充， 去掉对应的 warning

## 0.10.0 (2020-04-09)

- feat: 更新 `yyl-os@0.11.0`
- feat: yh.optimize 支持 `config.yarn` 配置项
- feat: 新增 `prettier` 开发用插件

## 0.9.0 (2020-03-15)

- feat: `yh.optimize.getHomePage()` 新增 `op.files` 属性
- feat: `yh.optimize.openHomePage()` 新增 `op.files` 属性

## 0.8.2 (2020-02-29)

- feat: 修复 yh.openBrowser() 报错问题

## 0.8.1 (2020-02-23)

- feat: 补充 optimize 相关用例

## 0.8.0 (2020-02-23)

- feat: afterTask 相关函数已迁移到 `yyl-seed-gulp-requirejs` 本组件不再保留
- del: 移除 `yh.optimize.afterTask()`
- del: 移除 `yh.optimize.varSugar()`
- del: 移除 `yh.optimize.resource()`
- del: 移除 `yh.optimize.concat()`
- del: 移除 `yh.optimize.rev`

## 0.7.1(2020-02-23)

- feat: 新增 `yh.optimize.getHomePage()` 方法

## 0.7.0(2020-02-23)

- feat: 让 config.resource 支持 sugar 写法

## 0.6.1(2020-02-19)

- feat: \_\_html 内容会做一次 sugarReplace

## 0.6.0(2020-02-18)

- feat: 新增 \_\_html js 的语法糖用于引入 html 模板

## 0.5.0(2020-02-13)

- feat: 打包时添加 env 变量到 revMap

## 0.4.0(2019-09-20)

- feat: `Hander.parseConfig` 支持 `typeof config === function`

## 0.3.2(2019-09-12)

- fix: 修复 `Hander.parseConfig` 如果遇到未 定义 `vars.PROJECT_PATH` 会报错问题
- fix: 修复 `Hander.parseConfig` 在 yyl-server 下执行会报错问题

## 0.3.1(2019-07-31)

- fix: 修复 `Hander.parseConfig` 如果遇到未 定义 `config.name` 会报错问题

## 0.3.0(2019-07-31)

- feat: `Hander.parseConfig` 如遇到 `config.plugins.length === 0`, 不会生成 `config.resolveModule` 对象

## 0.2.2(2019-07-18)

- fix: 修复 js 内 通过 \_\_url({$cssDest}) 引入 css 时， 前缀不对问题

## 0.2.1(2019-07-17)

- fix: 修复 js 内 通过 \_\_url({$cssDest}) 引入 css 时， 缺少 hash 问题

## 0.2.0(2019-07-17)

- feat: 新增 js 文件支持 `__url({$jsDest})` 模式

## 0.1.5(2019-07-17)

- fix: 修复 webpack 下 在 js 引入 路径 不会自动替换成带 hash 版本的问题

## 0.1.4(2019-07-12)

- fix: 修复 安装 plugins 后 会出现 warning 问题

## 0.1.3(2019-07-11)

- fix: 修复 安装 plugins 后 会出现 warning 问题

## 0.1.3-beta3(2019-05-17)

- fix: 修复 Hander.optimize.initPlugins 永远都会下载的问题

## 0.1.3-beta2(2019-05-17)

- fix: 修复 Hander.optimize.openHomePage() 报错问题
- [DEL] 去掉 Hander.parseConfig() 中 检验 commonPath， globalCommonPath 字段的逻辑

## 0.1.2 (2019-05-17)

- fix: 修复 Hander.parseConfig(configPath, iEnv) 当定义 iEnv.workflow 时 依然不生效问题

## 0.1.1 (2019-05-14)

- feat: 修复 Hander.parseConfig(configPath, iEnv) 新增 iEnv.workflow 参数
- fix: 修复 Hander.parseConfig() 当不存在 config.workflow & config.x.workflow 时 会报错的问题

## 0.1.0 (2019.05.09)

- feat: 新增 class Handle
- feat: 新增 Hander.hideProtocol(iPath: string): string
- feat: 新增 Hander.sugarReplace(str: string, alias: object): string;
- feat: 新增 Hander.parseConfig(configPath: string, iEnv: object, returnKeys: string[] | string): Promise<any>;
- feat: 新增 Hander.setVars(vars: IVars): IVars;
- feat: 新增 Hander.optimize.init(config: IConfig, iEnv: IEnv): void;
- feat: 新增 Hander.optimize.varSugar(): Promise<any>;
- feat: 新增 Hander.optimize.afterTask(isUpdate?: boolean): Promise<any>;
- feat: 新增 Hander.optimize.concat(): Promise<any>;
- feat: 新增 Hander.optimize.resource(): Promise<any>;
- feat: 新增 Hander.optimize.initPlugins(): Promise<any>;
- feat: 新增 Hander.optimize.openHomePage(): Promise<any>;
- feat: 新增 Hander.optimize.livereload(): Promise<any>;
- feat: 新增 Hander.optimize.saveConfigToServer(): Promise<any>;
- feat: 新增 Hander.optimize.rev.init({ config: IConfig, iEnv: IEnv }): void;
- feat: 新增 Hander.optimize.rev.build(): Promise<any>;
- feat: 新增 Hander.optimize.rev.update(remoteManifestData?: object): Promise<any>;
- feat: 新增 Hander.optimize.rev.clean(): Promise<any>;
