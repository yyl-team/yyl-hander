# 修改历史
## 0.4.0(2019-09-20)
* feat: `Hander.parseConfig` 支持 `typeof config === function`

## 0.3.2(2019-09-12)
* fix: 修复 `Hander.parseConfig` 如果遇到未 定义 `vars.PROJECT_PATH` 会报错问题
* fix: 修复 `Hander.parseConfig` 在 yyl-server 下执行会报错问题

## 0.3.1(2019-07-31)
* fix: 修复 `Hander.parseConfig` 如果遇到未 定义 `config.name` 会报错问题

## 0.3.0(2019-07-31)
* feat: `Hander.parseConfig` 如遇到 `config.plugins.length === 0`, 不会生成 `config.resolveModule` 对象

## 0.2.2(2019-07-18)
* fix: 修复 js 内 通过 __url({$cssDest}) 引入 css时， 前缀不对问题

## 0.2.1(2019-07-17)
* fix: 修复 js 内 通过 __url({$cssDest}) 引入 css时， 缺少hash 问题

## 0.2.0(2019-07-17)
* feat: 新增 js 文件支持 `__url({$jsDest})` 模式

## 0.1.5(2019-07-17)
* fix: 修复 webpack 下 在 js 引入 路径 不会自动替换成带hash 版本的问题

## 0.1.4(2019-07-12)
* fix: 修复 安装 plugins 后 会出现 warning 问题

## 0.1.3(2019-07-11)
* fix: 修复 安装 plugins 后 会出现 warning 问题

## 0.1.3-beta3(2019-05-17)
* fix: 修复 Hander.optimize.initPlugins 永远都会下载的问题

## 0.1.3-beta2(2019-05-17)
* fix: 修复 Hander.optimize.openHomePage() 报错问题
* [DEL] 去掉 Hander.parseConfig() 中 检验 commonPath， globalCommonPath 字段的逻辑

## 0.1.2 (2019-05-17)
* fix: 修复Hander.parseConfig(configPath, iEnv) 当定义 iEnv.workflow 时 依然不生效问题

## 0.1.1 (2019-05-14)
* feat: 修复 Hander.parseConfig(configPath, iEnv) 新增 iEnv.workflow 参数
* fix: 修复 Hander.parseConfig() 当不存在 config.workflow & config.x.workflow 时 会报错的问题

## 0.1.0 (2019.05.09)
* feat: 新增 class Handle
* feat: 新增 Hander.hideProtocol(iPath: string): string
* feat: 新增 Hander.sugarReplace(str: string, alias: object): string;
* feat: 新增 Hander.parseConfig(configPath: string, iEnv: object, returnKeys: string[] | string): Promise<any>;
* feat: 新增 Hander.setVars(vars: IVars): IVars;
* feat: 新增 Hander.optimize.init(config: IConfig, iEnv: IEnv): void;
* feat: 新增 Hander.optimize.varSugar(): Promise<any>;
* feat: 新增 Hander.optimize.afterTask(isUpdate?: boolean): Promise<any>;
* feat: 新增 Hander.optimize.concat(): Promise<any>;
* feat: 新增 Hander.optimize.resource(): Promise<any>;
* feat: 新增 Hander.optimize.initPlugins(): Promise<any>;
* feat: 新增 Hander.optimize.openHomePage(): Promise<any>;
* feat: 新增 Hander.optimize.livereload(): Promise<any>;
* feat: 新增 Hander.optimize.saveConfigToServer(): Promise<any>;
* feat: 新增 Hander.optimize.rev.init({ config: IConfig, iEnv: IEnv }): void;
* feat: 新增 Hander.optimize.rev.build(): Promise<any>;
* feat: 新增 Hander.optimize.rev.update(remoteManifestData?: object): Promise<any>;
* feat: 新增 Hander.optimize.rev.clean(): Promise<any>;