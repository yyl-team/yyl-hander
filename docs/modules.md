[yyl-hander](README.md) / Exports

# yyl-hander

## Table of contents

### Classes

- [YylHander](classes/yylhander.md)

### Interfaces

- [FormatConfigOption](interfaces/formatconfigoption.md)
- [GetHomePageOption](interfaces/gethomepageoption.md)
- [ParseConfigOption](interfaces/parseconfigoption.md)
- [StartServerOption](interfaces/startserveroption.md)
- [YylHanderInitOption](interfaces/yylhanderinitoption.md)
- [YylParserOption](interfaces/yylparseroption.md)

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

## Variables

### DEFAULT_ALIAS

• `Const` **DEFAULT_ALIAS**: YylConfigAlias

Defined in: [yylHander.ts:52](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L52)

---

### LANG

• `Const` **LANG**: _object_

#### Type declaration:

| Name                               | Type     |
| ---------------------------------- | -------- |
| `CLEAN_DIST_FAIL`                  | _string_ |
| `CLEAN_DIST_FINISHED`              | _string_ |
| `CONFIG_ATTR_IS_NEEDFUL`           | _string_ |
| `CONFIG_NOT_EXISTS`                | _string_ |
| `CONFIG_NOT_SET`                   | _string_ |
| `CONFIG_PARSE_ERROR`               | _string_ |
| `CONFIG_SAVED`                     | _string_ |
| `DEL_PKG_LOCK_FILE`                | _string_ |
| `INSTALL_YARN`                     | _string_ |
| `MISS_NAME_OPTIONS`                | _string_ |
| `NAME_OPTIONS_NOT_EXISTS`          | _string_ |
| `NO_OPZER_HANDLE`                  | _string_ |
| `OPEN_ADDR`                        | _string_ |
| `OPTIMIZE_FINISHED`                | _string_ |
| `OPTIMIZE_START`                   | _string_ |
| `PAGE_RELOAD`                      | _string_ |
| `PRINT_HOME_PAGE`                  | _string_ |
| `REQUIRE_ATLEAST_VERSION`          | _string_ |
| `RUNNER_START`                     | _string_ |
| `RUNNER_START_FAIL`                | _string_ |
| `RUNNER_START_FINISHED`            | _string_ |
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
| `SAVE_CONFIG_TO_SERVER_FAIL`       | _string_ |
| `SEED_INIT_FAIL`                   | _string_ |
| `SEED_INIT_FINISHED`               | _string_ |
| `SEED_INIT_START`                  | _string_ |
| `SEED_NOT_SET`                     | _string_ |
| `YARN_VERSION`                     | _string_ |

Defined in: [const.ts:25](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/const.ts#L25)

---

### PROXY_CACHE_PATH

• `Const` **PROXY_CACHE_PATH**: _string_

proxy 缓存目录

Defined in: [const.ts:23](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/const.ts#L23)

---

### SERVER_CONFIG_LOG_PATH

• `Const` **SERVER_CONFIG_LOG_PATH**: _string_

server 存放构建生成的 config 的缓存文件

Defined in: [const.ts:20](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/const.ts#L20)

---

### SERVER_DATA_PATH

• `Const` **SERVER_DATA_PATH**: _string_

server 数据存放目录

Defined in: [const.ts:14](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/const.ts#L14)

---

### SERVER_PATH

• `Const` **SERVER_PATH**: _string_

server 根目录

Defined in: [const.ts:11](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/const.ts#L11)

---

### SERVER_PLUGIN_PATH

• `Const` **SERVER_PLUGIN_PATH**: _string_

server plugins 存放目录

Defined in: [const.ts:17](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/const.ts#L17)

---

### SUGAR_REG

• `Const` **SUGAR_REG**: _RegExp_

Defined in: [const.ts:5](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/const.ts#L5)

---

### USERPROFILE

• `Const` **USERPROFILE**: _string_

profile

Defined in: [const.ts:8](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/const.ts#L8)

## Functions

### hideProtocol

▸ **hideProtocol**(`url`: _string_): _string_

去掉 protocol

#### Parameters:

| Name  | Type     |
| ----- | -------- |
| `url` | _string_ |

**Returns:** _string_

Defined in: [util.ts:16](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/util.ts#L16)

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

Defined in: [util.ts:25](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/util.ts#L25)
