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
- [TsParserOption](interfaces/tsparseroption.md)
- [YylHanderInitOption](interfaces/yylhanderinitoption.md)
- [YylParserOption](interfaces/yylparseroption.md)

### Variables

- [DEFAULT\_ALIAS](modules.md#default_alias)
- [LANG](modules.md#lang)
- [PROXY\_CACHE\_PATH](modules.md#proxy_cache_path)
- [SERVER\_CONFIG\_LOG\_PATH](modules.md#server_config_log_path)
- [SERVER\_DATA\_PATH](modules.md#server_data_path)
- [SERVER\_PATH](modules.md#server_path)
- [SERVER\_PLUGIN\_PATH](modules.md#server_plugin_path)
- [USERPROFILE](modules.md#userprofile)

### Functions

- [hideProtocol](modules.md#hideprotocol)
- [sugarReplace](modules.md#sugarreplace)
- [tsParser](modules.md#tsparser)

## Variables

### DEFAULT\_ALIAS

• `Const` **DEFAULT\_ALIAS**: YylConfigAlias

Defined in: [src/yylHander.ts:54](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/yylHander.ts#L54)

___

### LANG

• `Const` **LANG**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CLEAN_DIST_FAIL` | *string* |
| `CLEAN_DIST_FINISHED` | *string* |
| `CONFIG_ATTR_IS_NEEDFUL` | *string* |
| `CONFIG_NOT_EXISTS` | *string* |
| `CONFIG_NOT_SET` | *string* |
| `CONFIG_PARSE_ERROR` | *string* |
| `CONFIG_SAVED` | *string* |
| `DEL_PKG_LOCK_FILE` | *string* |
| `INSTALL_YARN` | *string* |
| `MISS_NAME_OPTIONS` | *string* |
| `MOMERY_USE` | *string* |
| `NAME_OPTIONS_NOT_EXISTS` | *string* |
| `NO_OPZER_HANDLE` | *string* |
| `OPEN_ADDR` | *string* |
| `OPTIMIZE_FINISHED` | *string* |
| `OPTIMIZE_START` | *string* |
| `PAGE_RELOAD` | *string* |
| `PARSE_TS_FAIL` | *string* |
| `PARSE_TS_FINISHED` | *string* |
| `PARSE_TS_START` | *string* |
| `PRINT_HOME_PAGE` | *string* |
| `REQUIRE_ATLEAST_VERSION` | *string* |
| `RUNNER_START` | *string* |
| `RUNNER_START_FAIL` | *string* |
| `RUNNER_START_FINISHED` | *string* |
| `RUN_ALL_AFTER_SCRIPT_FINISHED` | *string* |
| `RUN_ALL_AFTER_SCRIPT_START` | *string* |
| `RUN_ALL_BEFORE_SCRIPT_FINISHED` | *string* |
| `RUN_ALL_BEFORE_SCRIPT_START` | *string* |
| `RUN_GC` | *string* |
| `RUN_PEER_CHECK_FINISHED` | *string* |
| `RUN_SCRIPT_FN_FINISHED` | *string* |
| `RUN_SCRIPT_FN_START` | *string* |
| `RUN_WATCH_AFTER_SCRIPT_FINISHED` | *string* |
| `RUN_WATCH_AFTER_SCRIPT_START` | *string* |
| `RUN_WATCH_BEFORE_SCRIPT_FINISHED` | *string* |
| `RUN_WATCH_BEFORE_SCRIPT_START` | *string* |
| `SAVE_CONFIG_TO_SERVER_FAIL` | *string* |
| `SEED_INIT_FAIL` | *string* |
| `SEED_INIT_FINISHED` | *string* |
| `SEED_INIT_START` | *string* |
| `SEED_NOT_SET` | *string* |
| `YARN_VERSION` | *string* |

Defined in: [src/const.ts:24](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/const.ts#L24)

___

### PROXY\_CACHE\_PATH

• `Const` **PROXY\_CACHE\_PATH**: *string*

proxy 缓存目录

Defined in: [src/const.ts:22](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/const.ts#L22)

___

### SERVER\_CONFIG\_LOG\_PATH

• `Const` **SERVER\_CONFIG\_LOG\_PATH**: *string*

server 存放构建生成的 config 的缓存文件

Defined in: [src/const.ts:19](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/const.ts#L19)

___

### SERVER\_DATA\_PATH

• `Const` **SERVER\_DATA\_PATH**: *string*

server 数据存放目录

Defined in: [src/const.ts:13](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/const.ts#L13)

___

### SERVER\_PATH

• `Const` **SERVER\_PATH**: *string*

server 根目录

Defined in: [src/const.ts:10](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/const.ts#L10)

___

### SERVER\_PLUGIN\_PATH

• `Const` **SERVER\_PLUGIN\_PATH**: *string*

server plugins 存放目录

Defined in: [src/const.ts:16](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/const.ts#L16)

___

### USERPROFILE

• `Const` **USERPROFILE**: *string*

profile

Defined in: [src/const.ts:7](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/const.ts#L7)

## Functions

### hideProtocol

▸ **hideProtocol**(`url`: *string*): *string*

去掉 protocol

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |

**Returns:** *string*

Defined in: [src/util.ts:16](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/util.ts#L16)

___

### sugarReplace

▸ **sugarReplace**(`str`: *string*, `alias?`: YylConfigAlias): *string*

sugar 替换

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `alias?` | YylConfigAlias |

**Returns:** *string*

Defined in: [src/util.ts:25](https://github.com/yyl-team/yyl-hander/blob/e08967c/src/util.ts#L25)

___

### tsParser

▸ **tsParser**<T\>(`op`: [*TsParserOption*](interfaces/tsparseroption.md)): *TsParserResult*<T\>

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | *any* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*TsParserOption*](interfaces/tsparseroption.md) |

**Returns:** *TsParserResult*<T\>

Defined in: node_modules/node-ts-parser/output/index.d.ts:8
