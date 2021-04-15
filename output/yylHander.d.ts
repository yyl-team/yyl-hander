import { YylConfig, Env, YylConfigAlias } from 'yyl-config-types';
import { SeedEntry, SeedOptimizeResult, Logger } from 'yyl-seed-base';
import { Runner } from 'yyl-server';
export { tsParser, TsParserOption } from 'node-ts-parser';
/** 格式化配置 - 配置 */
export interface FormatConfigOption {
    yylConfig: YylConfig;
    env: Env;
    context: string;
}
/** 获取 homepage - 配置 */
export interface GetHomePageOption {
    files?: string[];
}
/** yyl.config 解析 - 配置 */
export interface ParseConfigOption {
    configPath: string;
    env: Env;
}
export interface YylParserOption {
    yylConfig?: YylConfig | string;
    env?: Env;
    logger?: Logger;
    context?: string;
}
/** 启动服务器 - 配置 */
export interface StartServerOption extends YylParserOption {
    opzer?: SeedOptimizeResult;
}
export interface YylHanderInitOption {
    /** seed 包 */
    seed: SeedEntry;
    /** 是否执行 watch */
    watch?: boolean;
    /** yyl 版本 - 用于与 yylConfig.version 进行比较 */
    yylVersion?: string;
}
export declare const DEFAULT_ALIAS: YylConfigAlias;
export declare class YylHander {
    context: string;
    yylConfig: YylConfig;
    env: Env;
    seed: SeedEntry | undefined;
    logger: Logger;
    runner?: Runner;
    /** 解析配置 */
    static parseConfig(op: ParseConfigOption): YylConfig;
    /** 格式化配置 */
    static formatConfig(option: FormatConfigOption): YylConfig;
    /** 启动服务器 */
    static startServer(op: StartServerOption): Promise<Runner>;
    constructor(option: YylParserOption);
    /** 初始化 */
    init(op: YylHanderInitOption): Promise<[YylConfig, SeedOptimizeResult | undefined] | undefined>;
    /** 获取 yylConfig 内容 */
    getYylConfig(): YylConfig;
    /** 解析 yylConfig.plugins 内容 */
    initPlugins(): Promise<any>;
    /** 获取 homePage */
    getHomePage(op?: GetHomePageOption): Promise<string | undefined>;
    /** 打开 homePage */
    openHomePage(op: GetHomePageOption): Promise<string | undefined>;
    /** scripts 执行 */
    initScripts(ctx: any): Promise<any>;
    /** 执行 before script */
    runBeforeScripts(watch?: boolean): Promise<any>;
    /** 执行 after script */
    runAfterScripts(watch?: boolean): Promise<any>;
    /** 热更新 */
    livereload(): Promise<void>;
    /** 保存配置到缓存目录 */
    saveConfigToServer(): Promise<void>;
}
