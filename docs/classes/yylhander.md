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

Defined in: [yylHander.ts:67](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L67)

## Properties

### context

• **context**: *string*

Defined in: [yylHander.ts:63](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L63)

___

### env

• **env**: Env

Defined in: [yylHander.ts:65](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L65)

___

### logger

• **logger**: [*Logger*](../modules.md#logger)<*msg* \| *progress*\>

Defined in: [yylHander.ts:67](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L67)

___

### seed

• **seed**: *undefined* \| SeedEntry

Defined in: [yylHander.ts:66](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L66)

___

### yylConfig

• **yylConfig**: YylConfig

Defined in: [yylHander.ts:64](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L64)

## Methods

### formatConfig

▸ **formatConfig**(`option`: [*FormatConfigOption*](../interfaces/formatconfigoption.md)): YylConfig

格式化配置

#### Parameters:

Name | Type |
------ | ------ |
`option` | [*FormatConfigOption*](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:307](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L307)

___

### getHomePage

▸ **getHomePage**(`op?`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<*undefined* \| *string*\>

获取 homePage

#### Parameters:

Name | Type |
------ | ------ |
`op?` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<*undefined* \| *string*\>

Defined in: [yylHander.ts:428](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L428)

___

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [yylHander.ts:408](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L408)

___

### init

▸ **init**(`op`: [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md)): *Promise*<*undefined* \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

初始化

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md) |

**Returns:** *Promise*<*undefined* \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

Defined in: [yylHander.ts:101](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L101)

___

### initPlugins

▸ **initPlugins**(): *Promise*<*any*\>

解析 yylConfig.plugins 内容

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:413](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L413)

___

### initScripts

▸ **initScripts**(`ctx`: *any*): *Promise*<*any*\>

scripts 执行

#### Parameters:

Name | Type |
------ | ------ |
`ctx` | *any* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:516](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L516)

___

### livereload

▸ **livereload**(): *Promise*<*void*\>

热更新

**Returns:** *Promise*<*void*\>

Defined in: [yylHander.ts:574](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L574)

___

### openHomePage

▸ **openHomePage**(`op`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<*undefined* \| *string*\>

打开 homePage

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<*undefined* \| *string*\>

Defined in: [yylHander.ts:502](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L502)

___

### parseConfig

▸ **parseConfig**(`op`: [*ParseConfigOption*](../interfaces/parseconfigoption.md)): YylConfig

解析配置

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*ParseConfigOption*](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:265](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L265)

___

### runAfterScripts

▸ **runAfterScripts**(`watch?`: *boolean*): *Promise*<*any*\>

执行 after script

#### Parameters:

Name | Type |
------ | ------ |
`watch?` | *boolean* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:555](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L555)

___

### runBeforeScripts

▸ **runBeforeScripts**(`watch?`: *boolean*): *Promise*<*any*\>

执行 before script

#### Parameters:

Name | Type |
------ | ------ |
`watch?` | *boolean* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:536](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L536)

___

### saveConfigToServer

▸ **saveConfigToServer**(): *Promise*<*void*\>

保存配置到缓存目录

**Returns:** *Promise*<*void*\>

Defined in: [yylHander.ts:585](https://github.com/jackness1208/yyl-hander/blob/65abc17/src/yylHander.ts#L585)
