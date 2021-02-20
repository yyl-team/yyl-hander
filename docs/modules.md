[yyl-hander](README.md) / Exports

# yyl-hander

## Table of contents

### Classes

- [YylHander](classes/yylhander.md)

### Interfaces

- [FormatConfigOption](interfaces/formatconfigoption.md)
- [GetHomePageOption](interfaces/gethomepageoption.md)
- [ParseConfigOption](interfaces/parseconfigoption.md)
- [YylParserOption](interfaces/yylparseroption.md)

### Type aliases

- [Logger](modules.md#logger)
- [LoggerSubType](modules.md#loggersubtype)
- [LoggerType](modules.md#loggertype)

### Variables

- [DEFAULT_ALIAS](modules.md#default_alias)
- [LANG](modules.md#lang)
- [PROXY_CACHE_PATH](modules.md#proxy_cache_path)
- [SERVER_CONFIG_LOG_PATH](modules.md#server_config_log_path)
- [SERVER_DATA_PATH](modules.md#server_data_path)
- [SERVER_PATH](modules.md#server_path)
- [SERVER_PLUGIN_PATH](modules.md#server_plugin_path)
- [SUGAR_REG](modules.md#sugar_reg)
- [USERPROFILE](modules.md#userprofile)

### Functions

- [hideProtocol](modules.md#hideprotocol)
- [sugarReplace](modules.md#sugarreplace)

## Type aliases

### Logger

Ƭ **Logger**: (`type`: [_LoggerType_](modules.md#loggertype), `subType`: [_LoggerSubType_](modules.md#loggersubtype), ...`args`: _any_[]) => _void_

Defined in: [yylHander.ts:32](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L32)

---

### LoggerSubType

Ƭ **LoggerSubType**: _info_ \| _success_ \| _warn_ \| _error_ \| _cmd_

Defined in: [yylHander.ts:34](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L34)

---

### LoggerType

Ƭ **LoggerType**: _msg_

Defined in: [yylHander.ts:33](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L33)

## Variables

### DEFAULT_ALIAS

• `Const` **DEFAULT_ALIAS**: YylConfigAlias

Defined in: [yylHander.ts:36](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L36)

---

### LANG

• `Const` **LANG**: _object_

#### Type declaration:

| Name                               | Type     |
| ---------------------------------- | -------- |
| `CONFIG_ATTR_IS_NEEDFUL`           | _string_ |
| `CONFIG_NOT_EXISTS`                | _string_ |
| `CONFIG_PARSE_ERROR`               | _string_ |
| `CONFIG_SAVED`                     | _string_ |
| `MISS_NAME_OPTIONS`                | _string_ |
| `NAME_OPTIONS_NOT_EXISTS`          | _string_ |
| `OPEN_ADDR`                        | _string_ |
| `RUN_ALL_AFTER_SCRIPT_FINISHED`    | _string_ |
| `RUN_ALL_AFTER_SCRIPT_START`       | _string_ |
| `RUN_ALL_BEFORE_SCRIPT_FINISHED`   | _string_ |
| `RUN_ALL_BEFORE_SCRIPT_START`      | _string_ |
| `RUN_SCRIPT_FN_FINISHED`           | _string_ |
| `RUN_SCRIPT_FN_START`              | _string_ |
| `RUN_WATCH_AFTER_SCRIPT_FINISHED`  | _string_ |
| `RUN_WATCH_AFTER_SCRIPT_START`     | _string_ |
| `RUN_WATCH_BEFORE_SCRIPT_FINISHED` | _string_ |
| `RUN_WATCH_BEFORE_SCRIPT_START`    | _string_ |

Defined in: [const.ts:25](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/const.ts#L25)

---

### PROXY_CACHE_PATH

• `Const` **PROXY_CACHE_PATH**: _string_

proxy 缓存目录

Defined in: [const.ts:23](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/const.ts#L23)

---

### SERVER_CONFIG_LOG_PATH

• `Const` **SERVER_CONFIG_LOG_PATH**: _string_

server 存放构建生成的 config 的缓存文件

Defined in: [const.ts:20](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/const.ts#L20)

---

### SERVER_DATA_PATH

• `Const` **SERVER_DATA_PATH**: _string_

server 数据存放目录

Defined in: [const.ts:14](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/const.ts#L14)

---

### SERVER_PATH

• `Const` **SERVER_PATH**: _string_

server 根目录

Defined in: [const.ts:11](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/const.ts#L11)

---

### SERVER_PLUGIN_PATH

• `Const` **SERVER_PLUGIN_PATH**: _string_

server plugins 存放目录

Defined in: [const.ts:17](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/const.ts#L17)

---

### SUGAR_REG

• `Const` **SUGAR_REG**: _RegExp_

Defined in: [const.ts:5](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/const.ts#L5)

---

### USERPROFILE

• `Const` **USERPROFILE**: _string_

profile

Defined in: [const.ts:8](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/const.ts#L8)

## Functions

### hideProtocol

▸ **hideProtocol**(`url`: _string_): _string_

去掉 protocol

#### Parameters:

| Name  | Type     |
| ----- | -------- |
| `url` | _string_ |

**Returns:** _string_

Defined in: [util.ts:16](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/util.ts#L16)

---

### sugarReplace

▸ **sugarReplace**(`str`: _string_, `alias?`: YylConfigAlias): _string_

sugar 替换

#### Parameters:

| Name     | Type           |
| -------- | -------------- |
| `str`    | _string_       |
| `alias?` | YylConfigAlias |

**Returns:** _string_

Defined in: [util.ts:25](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/util.ts#L25)
