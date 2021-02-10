import { YylConfig, Env, YylConfigAlias } from 'yyl-config-types';
export interface YylParserOption {
    yylConfig: YylConfig;
    env?: Env;
    logger?: Logger;
    context?: string;
}
export declare type ParseConfigOption = Pick<Required<YylParserOption>, 'env' | 'yylConfig' | 'context'>;
export interface GetHomePageOption {
    files?: string[];
}
export declare type Logger = (type: LoggerType, subType: LoggerSubType, ...args: any[]) => void;
export declare type LoggerType = 'msg';
export declare type LoggerSubType = 'info' | 'success' | 'warn' | 'error' | 'cmd';
export declare const DEFAULT_ALIAS: YylConfigAlias;
export declare class YylHander {
    context: string;
    yylConfig: YylConfig;
    env: Env;
    logger: Logger;
    constructor(option: YylParserOption);
    parseConfig(option: ParseConfigOption): YylConfig;
    /** 获取 yylConfig 内容 */
    getYylConfig(): YylConfig;
    /** 解析 yylConfig.plugins 内容 */
    initPlugin(): Promise<any>;
    /** 获取 homePage */
    getHomePage(op?: GetHomePageOption): Promise<string | undefined>;
    /** 打开 homePage */
    openHomePage(op: GetHomePageOption): Promise<string | undefined>;
    /** scripts 执行 */
    initScripts(ctx: any): Promise<any>;
    /** 执行 before script */
    runBeforeScripts(ctx: string): Promise<any>;
    /** 执行 after script */
    runAfterScripts(ctx: string): Promise<any>;
    /** 热更新 */
    livereload(): Promise<void>;
    /** 保存配置到缓存目录 */
    saveConfigToServer(): Promise<void>;
}
