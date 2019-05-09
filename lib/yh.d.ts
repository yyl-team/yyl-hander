export default class Handler {
  constructor({ log: logFunction, vars: IVars });
  // vars
  public vars: IVars;
  // 设置 vars
  public setVars(vars: IVars): IVars;
  // 去掉协议
  public hideProtocol(iPath: string): string;
  // 语法糖 replace
  public sugarReplace(str: string, alias: object): string;
  // config 格式化
  public parseConfig(configPath: string, iEnv: object, returnKeys: string[] | string): Promise<any>;
}

type logFunction = (type: string, args: any[]) => void;

interface IVars {
  // 本程序根目录
  BASE_PATH?: string;
  // init path
  INIT_PATH?: string;
  // 是否 windows 系统
  IS_WINDOWS?: boolean;
  // svn rev 文件保留多少个版本
  REV_KEEP_COUNT?: string;
  // 当前cmd 所在地址
  PROJECT_PATH: string;
  // 搜索用 common 目录路径匹配
  COMMIN_PATH_LIKE?: string;
  // 用户设置文件地址
  USER_CONFIG_FILE?: string;
  // 用户 package.json 地址
  USER_PKG_FILE?: string;
  // server 根目录
  SERVER_PATH?: string;
  // server 数据存放目录
  SERVER_DATA_PATH?: string;
  // server plugins 存放目录
  SERVER_PLUGIN_PATH: string;
  // server proxy mapping 存放地址
  SERVER_PROXY_MAPPING_FILE?: string;
  // server 存放构建生成的 config 的缓存文件
  SERVER_CONFIG_LOG_PATH?: string;
  // proxy 缓存目录
  PROXY_CACHE_PATH?: string;
  // 本机 ip地址
  LOCAL_SERVER?: string;
}