import { YylConfig, Env, YylConfigAlias } from 'yyl-config-types';
import { SeedEntry, SeedOptimizeResult, SeedEventName } from 'yyl-seed-base';
export interface FormatConfigOption {
    yylConfig: YylConfig;
    env: Env;
    context: string;
}
export interface GetHomePageOption {
    files?: string[];
}
export interface ParseConfigOption {
    configPath: string;
    env: Env;
}
export declare type Logger<T extends keyof SeedEventName = keyof SeedEventName> = (type: T, args01: SeedEventName[T]['Args01'], args02?: SeedEventName[T]['Args02'], args03?: SeedEventName[T]['Args03']) => void;
export interface YylParserOption {
    yylConfig?: YylConfig | string;
    env?: Env;
    logger?: Logger;
    context?: string;
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
    constructor(option: YylParserOption);
    /** 初始化 */
    init(op: YylHanderInitOption): Promise<[YylConfig, SeedOptimizeResult | undefined] | undefined>;
    /** 解析配置 */
    parseConfig(op: ParseConfigOption): YylConfig;
    /** 格式化配置 */
    formatConfig(option: FormatConfigOption): YylConfig;
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
