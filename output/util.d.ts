import { YylConfigAlias, YylConfig } from 'yyl-config-types';
export declare function toCtx<T = any>(ctx: any): T;
/** 路径格式化 */
export declare function formatPath(url: string): string;
/** 去掉 protocol */
export declare function hideProtocol(url: string): string;
/** sugar 替换 */
export declare function sugarReplace(str: string, alias?: YylConfigAlias): string;
/** 检查当前 yylConfig 是否需要 添加 env.name */
export declare function needEnvName(yylConfig: YylConfig): string[];
interface AnyObj {
    [key: string]: any;
}
/** sugar 深替换 */
export declare function deepReplace<T extends AnyObj = any>(obj: T, alias: YylConfigAlias): void;
export {};
