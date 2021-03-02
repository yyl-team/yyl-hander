[yyl-hander](../README.md) / [Exports](../modules.md) / YylHander

# Class: YylHander

## Hierarchy

* **YylHander**

## Table of contents

### Constructors

- [constructor](yylhander.md#constructor)

### Properties

- [context](yylhander.md#context)
- [env](yylhander.md#env)
- [logger](yylhander.md#logger)
- [seed](yylhander.md#seed)
- [yylConfig](yylhander.md#yylconfig)

### Methods

- [formatConfig](yylhander.md#formatconfig)
- [getHomePage](yylhander.md#gethomepage)
- [getYylConfig](yylhander.md#getyylconfig)
- [init](yylhander.md#init)
- [initPlugins](yylhander.md#initplugins)
- [initScripts](yylhander.md#initscripts)
- [livereload](yylhander.md#livereload)
- [openHomePage](yylhander.md#openhomepage)
- [parseConfig](yylhander.md#parseconfig)
- [runAfterScripts](yylhander.md#runafterscripts)
- [runBeforeScripts](yylhander.md#runbeforescripts)
- [saveConfigToServer](yylhander.md#saveconfigtoserver)

## Constructors

### constructor

\+ **new YylHander**(`option`: [*YylParserOption*](../interfaces/yylparseroption.md)): [*YylHander*](yylhander.md)

#### Parameters:

Name | Type |
------ | ------ |
`option` | [*YylParserOption*](../interfaces/yylparseroption.md) |

**Returns:** [*YylHander*](yylhander.md)

Defined in: yylHander.ts:66

## Properties

### context

• **context**: *string*

Defined in: yylHander.ts:62

___

### env

• **env**: Env

Defined in: yylHander.ts:64

___

### logger

• **logger**: [*Logger*](../modules.md#logger)<*msg* \| *progress*, *number* \| *error* \| *warn* \| *info* \| *add* \| *update* \| *success* \| *del* \| *cmd* \| *start* \| *finished*\>

Defined in: yylHander.ts:66

___

### seed

• **seed**: *undefined* \| SeedEntry

Defined in: yylHander.ts:65

___

### yylConfig

• **yylConfig**: YylConfig

Defined in: yylHander.ts:63

## Methods

### formatConfig

▸ **formatConfig**(`option`: [*FormatConfigOption*](../interfaces/formatconfigoption.md)): YylConfig

格式化配置

#### Parameters:

Name | Type |
------ | ------ |
`option` | [*FormatConfigOption*](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: yylHander.ts:302

___

### getHomePage

▸ **getHomePage**(`op?`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<*undefined* \| *string*\>

获取 homePage

#### Parameters:

Name | Type |
------ | ------ |
`op?` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<*undefined* \| *string*\>

Defined in: yylHander.ts:423

___

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: yylHander.ts:403

___

### init

▸ **init**(`op`: [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md)): *Promise*<*undefined* \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

初始化

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md) |

**Returns:** *Promise*<*undefined* \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

Defined in: yylHander.ts:100

___

### initPlugins

▸ **initPlugins**(): *Promise*<*any*\>

解析 yylConfig.plugins 内容

**Returns:** *Promise*<*any*\>

Defined in: yylHander.ts:408

___

### initScripts

▸ **initScripts**(`ctx`: *any*): *Promise*<*any*\>

scripts 执行

#### Parameters:

Name | Type |
------ | ------ |
`ctx` | *any* |

**Returns:** *Promise*<*any*\>

Defined in: yylHander.ts:511

___

### livereload

▸ **livereload**(): *Promise*<*void*\>

热更新

**Returns:** *Promise*<*void*\>

Defined in: yylHander.ts:569

___

### openHomePage

▸ **openHomePage**(`op`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<*undefined* \| *string*\>

打开 homePage

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<*undefined* \| *string*\>

Defined in: yylHander.ts:497

___

### parseConfig

▸ **parseConfig**(`op`: [*ParseConfigOption*](../interfaces/parseconfigoption.md)): YylConfig

解析配置

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*ParseConfigOption*](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: yylHander.ts:260

___

### runAfterScripts

▸ **runAfterScripts**(`watch?`: *boolean*): *Promise*<*any*\>

执行 after script

#### Parameters:

Name | Type |
------ | ------ |
`watch?` | *boolean* |

**Returns:** *Promise*<*any*\>

Defined in: yylHander.ts:550

___

### runBeforeScripts

▸ **runBeforeScripts**(`watch?`: *boolean*): *Promise*<*any*\>

执行 before script

#### Parameters:

Name | Type |
------ | ------ |
`watch?` | *boolean* |

**Returns:** *Promise*<*any*\>

Defined in: yylHander.ts:531

___

### saveConfigToServer

▸ **saveConfigToServer**(): *Promise*<*void*\>

保存配置到缓存目录

**Returns:** *Promise*<*void*\>

Defined in: yylHander.ts:580
