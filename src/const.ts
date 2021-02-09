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
  CONFIG_PARSE_ERROR: '配置解析错误',
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
