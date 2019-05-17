# 修改历史
## 0.1.3-beta1(2019-05-17)
* [FIX] 修复 Hander.optimize.openHomePage() 报错问题
* [DEL] 去掉 Hander.parseConfig() 中 检验 commonPath， globalCommonPath 字段的逻辑

## 0.1.2 (2019-05-17)
* [FIX] 修复Hander.parseConfig(configPath, iEnv) 当定义 iEnv.workflow 时 依然不生效问题

## 0.1.1 (2019-05-14)
* [ADD] 修复 Hander.parseConfig(configPath, iEnv) 新增 iEnv.workflow 参数
* [FIX] 修复 Hander.parseConfig() 当不存在 config.workflow & config.x.workflow 时 会报错的问题

## 0.1.0 (2019.05.09)
* [ADD] 新增 class Handle
* [ADD] 新增 Hander.hideProtocol(iPath: string): string
* [ADD] 新增 Hander.sugarReplace(str: string, alias: object): string;
* [ADD] 新增 Hander.parseConfig(configPath: string, iEnv: object, returnKeys: string[] | string): Promise<any>;
* [ADD] 新增 Hander.setVars(vars: IVars): IVars;
* [ADD] 新增 Hander.optimize.init(config: IConfig, iEnv: IEnv): void;
* [ADD] 新增 Hander.optimize.varSugar(): Promise<any>;
* [ADD] 新增 Hander.optimize.afterTask(isUpdate?: boolean): Promise<any>;
* [ADD] 新增 Hander.optimize.concat(): Promise<any>;
* [ADD] 新增 Hander.optimize.resource(): Promise<any>;
* [ADD] 新增 Hander.optimize.initPlugins(): Promise<any>;
* [ADD] 新增 Hander.optimize.openHomePage(): Promise<any>;
* [ADD] 新增 Hander.optimize.livereload(): Promise<any>;
* [ADD] 新增 Hander.optimize.saveConfigToServer(): Promise<any>;
* [ADD] 新增 Hander.optimize.rev.init({ config: IConfig, iEnv: IEnv }): void;
* [ADD] 新增 Hander.optimize.rev.build(): Promise<any>;
* [ADD] 新增 Hander.optimize.rev.update(remoteManifestData?: object): Promise<any>;
* [ADD] 新增 Hander.optimize.rev.clean(): Promise<any>;