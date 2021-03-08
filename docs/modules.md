[yyl-hander](README.md) / Exports

# yyl-hander

## Table of contents

### Classes

- [YylHander](classes/yylhander.md)

### Interfaces

- [FormatConfigOption](interfaces/formatconfigoption.md)
- [GetHomePageOption](interfaces/gethomepageoption.md)
- [ParseConfigOption](interfaces/parseconfigoption.md)
- [YylHanderInitOption](interfaces/yylhanderinitoption.md)
- [YylParserOption](interfaces/yylparseroption.md)

### Type aliases

- [Logger](modules.md#logger)

### Variables

- [DEFAULT\_ALIAS](modules.md#default_alias)
- [LANG](modules.md#lang)
- [PROXY\_CACHE\_PATH](modules.md#proxy_cache_path)
- [SERVER\_CONFIG\_LOG\_PATH](modules.md#server_config_log_path)
- [SERVER\_DATA\_PATH](modules.md#server_data_path)
- [SERVER\_PATH](modules.md#server_path)
- [SERVER\_PLUGIN\_PATH](modules.md#server_plugin_path)
- [SUGAR\_REG](modules.md#sugar_reg)
- [USERPROFILE](modules.md#userprofile)

### Functions

- [hideProtocol](modules.md#hideprotocol)
- [sugarReplace](modules.md#sugarreplace)

## Type aliases

### Logger

Ƭ **Logger**<T\>: (`type`: T, `args01`: SeedEventName[T][*Args01*], `args02?`: SeedEventName[T][*Args02*], `args03?`: SeedEventName[T][*Args03*]) => *void*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | keyof SeedEventName | keyof SeedEventName |

Defined in: [yylHander.ts:27](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/yylHander.ts#L27)

## Variables

### DEFAULT\_ALIAS

• `Const` **DEFAULT\_ALIAS**: YylConfigAlias

Defined in: [yylHander.ts:49](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/yylHander.ts#L49)

___

### LANG

• `Const` **LANG**: *object*

#### Type declaration:

Name | Type |
------ | ------ |
`CLEAN_DIST_FAIL` | *string* |
`CLEAN_DIST_FINISHED` | *string* |
`CONFIG_ATTR_IS_NEEDFUL` | *string* |
`CONFIG_NOT_EXISTS` | *string* |
`CONFIG_NOT_SET` | *string* |
`CONFIG_PARSE_ERROR` | *string* |
`CONFIG_SAVED` | *string* |
`DEL_PKG_LOCK_FILE` | *string* |
`INSTALL_YARN` | *string* |
`MISS_NAME_OPTIONS` | *string* |
`NAME_OPTIONS_NOT_EXISTS` | *string* |
`NO_OPZER_HANDLE` | *string* |
`OPEN_ADDR` | *string* |
`OPTIMIZE_FINISHED` | *string* |
`OPTIMIZE_START` | *string* |
`PAGE_RELOAD` | *string* |
`PRINT_HOME_PAGE` | *string* |
`REQUIRE_ATLEAST_VERSION` | *string* |
`RUN_ALL_AFTER_SCRIPT_FINISHED` | *string* |
`RUN_ALL_AFTER_SCRIPT_START` | *string* |
`RUN_ALL_BEFORE_SCRIPT_FINISHED` | *string* |
`RUN_ALL_BEFORE_SCRIPT_START` | *string* |
`RUN_SCRIPT_FN_FINISHED` | *string* |
`RUN_SCRIPT_FN_START` | *string* |
`RUN_WATCH_AFTER_SCRIPT_FINISHED` | *string* |
`RUN_WATCH_AFTER_SCRIPT_START` | *string* |
`RUN_WATCH_BEFORE_SCRIPT_FINISHED` | *string* |
`RUN_WATCH_BEFORE_SCRIPT_START` | *string* |
`SAVE_CONFIG_TO_SERVER_FAIL` | *string* |
`SEED_INIT_FAIL` | *string* |
`SEED_INIT_FINISHED` | *string* |
`SEED_INIT_START` | *string* |
`SEED_NOT_SET` | *string* |
`YARN_VERSION` | *string* |

Defined in: [const.ts:25](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/const.ts#L25)

___

### PROXY\_CACHE\_PATH

• `Const` **PROXY\_CACHE\_PATH**: *string*

proxy 缓存目录

Defined in: [const.ts:23](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/const.ts#L23)

___

### SERVER\_CONFIG\_LOG\_PATH

• `Const` **SERVER\_CONFIG\_LOG\_PATH**: *string*

server 存放构建生成的 config 的缓存文件

Defined in: [const.ts:20](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/const.ts#L20)

___

### SERVER\_DATA\_PATH

• `Const` **SERVER\_DATA\_PATH**: *string*

server 数据存放目录

Defined in: [const.ts:14](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/const.ts#L14)

___

### SERVER\_PATH

• `Const` **SERVER\_PATH**: *string*

server 根目录

Defined in: [const.ts:11](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/const.ts#L11)

___

### SERVER\_PLUGIN\_PATH

• `Const` **SERVER\_PLUGIN\_PATH**: *string*

server plugins 存放目录

Defined in: [const.ts:17](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/const.ts#L17)

___

### SUGAR\_REG

• `Const` **SUGAR\_REG**: *RegExp*

Defined in: [const.ts:5](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/const.ts#L5)

___

### USERPROFILE

• `Const` **USERPROFILE**: *string*

profile

Defined in: [const.ts:8](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/const.ts#L8)

## Functions

### hideProtocol

▸ **hideProtocol**(`url`: *string*): *string*

去掉 protocol

#### Parameters:

Name | Type |
------ | ------ |
`url` | *string* |

**Returns:** *string*

Defined in: [util.ts:16](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/util.ts#L16)

___

### sugarReplace

▸ **sugarReplace**(`str`: *string*, `alias?`: YylConfigAlias): *string*

sugar 替换

#### Parameters:

Name | Type |
------ | ------ |
`str` | *string* |
`alias?` | YylConfigAlias |

**Returns:** *string*

Defined in: [util.ts:25](https://github.com/jackness1208/yyl-hander/blob/303fcf0/src/util.ts#L25)
