import path from 'path'
import { type } from 'yyl-util'
import { YylConfigAlias, YylConfig } from 'yyl-config-types'
import { SUGAR_REG } from './const'

export function toCtx<T = any>(ctx: any) {
  return ctx as T
}

/** 路径格式化 */
export function formatPath(url: string) {
  return url.split(path.sep).join('/')
}

/** 去掉 protocol */
export function hideProtocol(url: string) {
  if (typeof url === 'string') {
    return url.replace(/^https?:/, '')
  } else {
    return url
  }
}

/** sugar 替换 */
export function sugarReplace(str: string, alias?: YylConfigAlias) {
  return str.replace(SUGAR_REG, (str, $1, $2) => {
    if (alias) {
      if ($2 in alias) {
        return alias[$2]
      } else {
        return str
      }
    } else {
      return str
    }
  })
}

/** 检查当前 yylConfig 是否需要 添加 env.name */
export function needEnvName(yylConfig: YylConfig): string[] {
  if (yylConfig.workflow) {
    return []
  } else {
    const r: string[] = []
    Object.keys(yylConfig).forEach((key) => {
      const iAttr = toCtx<any>(yylConfig)[key]
      if (typeof iAttr === 'object' && iAttr.workflow) {
        r.push(key)
      }
    })

    return r
  }
}

interface AnyObj {
  [key: string]: any
}

/** sugar 深替换 */
export function deepReplace<T extends AnyObj = any>(obj: T, alias: YylConfigAlias): void {
  Object.keys(obj).forEach((key) => {
    const curKey = sugarReplace(key, alias)
    if (curKey !== key) {
      toCtx<AnyObj>(obj)[curKey] = obj[key]
      delete obj[key]
    }
    switch (type(obj[curKey])) {
      case 'array':
        toCtx<AnyObj>(obj)[curKey] = obj[curKey].map((val: string) => {
          if (type(val) === 'string') {
            return sugarReplace(val, alias)
          } else {
            return val
          }
        })
        deepReplace(toCtx<AnyObj>(obj)[curKey], alias)
        break

      case 'object':
        deepReplace(toCtx<AnyObj>(obj), alias)
        break

      case 'string':
        toCtx<AnyObj>(obj)[curKey] = sugarReplace(toCtx<AnyObj>(obj)[curKey], alias)
        break

      case 'number':
        break

      default:
        break
    }
  })
}
