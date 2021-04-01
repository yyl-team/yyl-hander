import { format } from 'prettier'
import extOs from 'yyl-os'
import path from 'path'
import { formatPath } from './util'
export const SUGAR_REG = /(\{\$)([a-zA-Z0-9@_\-$.~]+)(\})/g

/** profile */
export const USERPROFILE = `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}`

/** server 根目录 */
export const SERVER_PATH = formatPath(path.join(USERPROFILE, '.yyl'))

/** server 数据存放目录 */
export const SERVER_DATA_PATH = formatPath(path.join(SERVER_PATH, 'data'))

/** server plugins 存放目录 */
export const SERVER_PLUGIN_PATH = formatPath(path.join(SERVER_PATH, 'plugins'))

/** server 存放构建生成的 config 的缓存文件 */
export const SERVER_CONFIG_LOG_PATH = formatPath(path.join(SERVER_PATH, 'config-log'))

/** proxy 缓存目录 */
export const PROXY_CACHE_PATH = formatPath(path.join(USERPROFILE, '.anyproxy/cache'))

export const LANG = {
  OPEN_ADDR: '打开 url',
  CONFIG_SAVED: '配置已保存',

  CONFIG_NOT_EXISTS: 'yyl.config 路径不存在',
  CONFIG_NOT_SET: 'new yylHander 入参不存在: op.yylConfig',
  CONFIG_PARSE_ERROR: '配置解析错误',
  REQUIRE_ATLEAST_VERSION: '项目要求 yyl 版本 不能低于',
  DEL_PKG_LOCK_FILE: '存在 package-lock.json, 与 yarn 冲突，删之',
  INSTALL_YARN: '请先安装 yarn',
  YARN_VERSION: 'yarn 版本',
  SEED_NOT_SET: '没有传入 seed 配置',
  PRINT_HOME_PAGE: '主页地址',
  PAGE_RELOAD: '页面刷新',
  SAVE_CONFIG_TO_SERVER_FAIL: '保存配置到本地服务失败',
  CLEAN_DIST_FAIL: '清除本地输出目录失败',
  CLEAN_DIST_FINISHED: '清除本地输出目录完成',
  SEED_INIT_START: '正在初始化 seed包构建部分',
  SEED_INIT_FINISHED: '初始化 seed包构建部分完成',
  SEED_INIT_FAIL: '初始化 seed包构建部分失败',
  NO_OPZER_HANDLE: 'seed 包没返回 opzer',
  OPTIMIZE_START: '开始构建项目',
  OPTIMIZE_FINISHED: '任务执行完成',

  RUNNER_START: 'server 模块启动 开始',
  RUNNER_START_FAIL: 'server 模块启动 失败',
  RUNNER_START_FINISHED: 'server 模块启动 完成',

  MISS_NAME_OPTIONS: '缺少 --name 属性',
  NAME_OPTIONS_NOT_EXISTS: '--name 属性设置错误',
  CONFIG_ATTR_IS_NEEDFUL: 'config 中以下属性为必填项',
  RUN_ALL_BEFORE_SCRIPT_START: '开始执行 config.all.beforeScripts',
  RUN_ALL_BEFORE_SCRIPT_FINISHED: '执行 config.all.beforeScripts 完成',
  RUN_ALL_AFTER_SCRIPT_START: '开始执行 config.all.afterScripts',
  RUN_ALL_AFTER_SCRIPT_FINISHED: '执行 config.all.afterScripts 完成',
  RUN_WATCH_BEFORE_SCRIPT_START: '开始执行 config.watch.beforeScripts',
  RUN_WATCH_BEFORE_SCRIPT_FINISHED: '执行 config.watch.beforeScripts 完成',
  RUN_WATCH_AFTER_SCRIPT_START: '开始执行 config.watch.afterScripts',
  RUN_WATCH_AFTER_SCRIPT_FINISHED: '执行 config.watch.afterScripts 完成',
  RUN_SCRIPT_FN_START: '开始执行回调方法',
  RUN_SCRIPT_FN_FINISHED: '执行回调完成'
}
