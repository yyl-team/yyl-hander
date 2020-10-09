import { YylConfig, Env } from 'yyl-config-types'

export default class Handler {
  constructor({ log: LogFunction, vars: Vars });
  /** vars */ 
  vars: Vars;
  /** 设置 vars */
  public setVars(vars: Vars): Vars;
  /** 去掉协议 */
  public hideProtocol(iPath: string): string;
  /** 语法糖 replace */
  public sugarReplace(str: string, alias: object): string;
  /** config 格式化 */
  public parseConfig(configPath: string, env: Env, returnKeys: string[] | string): Promise<any>;
  /**  构建相关操作 */
  public optimize: Optimize
}

/** log 输出 function 配置 */
export type LogFunction = (type: string, status: string, args: any[]) => void;

/** script 类型 */
export type ScriptType = 'watch' | 'all'

export interface Optimize {
  /** 初始化 */
  init(config: YylConfig, env: Env): void;
  /** 初始化 插件操作 */
  initPlugins(): Promise<any>;
  /** 打开 home page */
  openHomePage(): Promise<any>;
  /** livereload 操作 */
  livereload(): Promise<any>;
  /**  报错配置到 服务器操作 */
  saveConfigToServer(): Promise<any>;
  /** 初始化 config.[all|watch].beforeScripts */
  initBeforeScripts(ctx: ScriptType): Promise<any>;
  /** 初始化 config.[all|watch].afterScripts */
  initAfterScripts(ctx: ScriptType): Promise<any>;
}

export interface Vars {
  /** 本程序根目录 */
  BASE_PATH?: string;
  /** init path */
  INIT_PATH?: string;
  /**  是否 windows 系统 */
  IS_WINDOWS?: boolean;
  /** svn rev 文件保留多少个版本 */
  REV_KEEP_COUNT?: string;
  /** 当前cmd 所在地址 */
  PROJECT_PATH: string;
  /** 搜索用 common 目录路径匹配 */
  COMMIN_PATH_LIKE?: string;
  /** 用户设置文件地址 */
  USER_CONFIG_FILE?: string;
  /** 用户 package.json 地址 */
  USER_PKG_FILE?: string;
  /** server 根目录 */
  SERVER_PATH?: string;
  /** server 数据存放目录 */
  SERVER_DATA_PATH?: string;
  /** server plugins 存放目录 */
  SERVER_PLUGIN_PATH: string;
  /** server proxy mapping 存放地址 */
  SERVER_PROXY_MAPPING_FILE?: string;
  /** server 存放构建生成的 config 的缓存文件 */
  SERVER_CONFIG_LOG_PATH?: string;
  /** proxy 缓存目录 */
  PROXY_CACHE_PATH?: string;
  /** 本机 ip地址 */
  LOCAL_SERVER?: string;
  /** yyl 版本 */
  PKG_VERSION: string;
}