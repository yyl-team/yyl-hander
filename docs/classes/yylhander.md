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
- [yylConfig](yylhander.md#yylconfig)

### Methods

- [formatConfig](yylhander.md#formatconfig)
- [getHomePage](yylhander.md#gethomepage)
- [getYylConfig](yylhander.md#getyylconfig)
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

Defined in: [yylHander.ts:53](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L53)

## Properties

### context

• **context**: *string*

Defined in: [yylHander.ts:50](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L50)

___

### env

• **env**: Env

Defined in: [yylHander.ts:52](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L52)

___

### logger

• **logger**: [*Logger*](../modules.md#logger)

Defined in: [yylHander.ts:53](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L53)

___

### yylConfig

• **yylConfig**: YylConfig

Defined in: [yylHander.ts:51](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L51)

## Methods

### formatConfig

▸ **formatConfig**(`option`: [*FormatConfigOption*](../interfaces/formatconfigoption.md)): YylConfig

#### Parameters:

Name | Type |
------ | ------ |
`option` | [*FormatConfigOption*](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:117](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L117)

___

### getHomePage

▸ **getHomePage**(`op?`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<*undefined* \| *string*\>

获取 homePage

#### Parameters:

Name | Type |
------ | ------ |
`op?` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<*undefined* \| *string*\>

Defined in: [yylHander.ts:238](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L238)

___

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [yylHander.ts:218](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L218)

___

### initPlugins

▸ **initPlugins**(): *Promise*<*any*\>

解析 yylConfig.plugins 内容

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:223](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L223)

___

### initScripts

▸ **initScripts**(`ctx`: *any*): *Promise*<*any*\>

scripts 执行

#### Parameters:

Name | Type |
------ | ------ |
`ctx` | *any* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:326](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L326)

___

### livereload

▸ **livereload**(): *Promise*<*void*\>

热更新

**Returns:** *Promise*<*void*\>

Defined in: [yylHander.ts:394](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L394)

___

### openHomePage

▸ **openHomePage**(`op`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<*undefined* \| *string*\>

打开 homePage

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<*undefined* \| *string*\>

Defined in: [yylHander.ts:312](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L312)

___

### parseConfig

▸ **parseConfig**(`op`: [*ParseConfigOption*](../interfaces/parseconfigoption.md)): YylConfig

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*ParseConfigOption*](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:76](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L76)

___

### runAfterScripts

▸ **runAfterScripts**(`ctx`: *string*): *Promise*<*any*\>

执行 after script

#### Parameters:

Name | Type |
------ | ------ |
`ctx` | *string* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:370](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L370)

___

### runBeforeScripts

▸ **runBeforeScripts**(`ctx`: *string*): *Promise*<*any*\>

执行 before script

#### Parameters:

Name | Type |
------ | ------ |
`ctx` | *string* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:346](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L346)

___

### saveConfigToServer

▸ **saveConfigToServer**(): *Promise*<*void*\>

保存配置到缓存目录

**Returns:** *Promise*<*void*\>

Defined in: [yylHander.ts:405](https://github.com/jackness1208/yyl-hander/blob/d712c60/src/yylHander.ts#L405)
