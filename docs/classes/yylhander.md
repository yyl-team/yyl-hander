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
- [runner](yylhander.md#runner)
- [seed](yylhander.md#seed)
- [yylConfig](yylhander.md#yylconfig)

### Methods

- [getHomePage](yylhander.md#gethomepage)
- [getYylConfig](yylhander.md#getyylconfig)
- [init](yylhander.md#init)
- [initPlugins](yylhander.md#initplugins)
- [initScripts](yylhander.md#initscripts)
- [livereload](yylhander.md#livereload)
- [openHomePage](yylhander.md#openhomepage)
- [runAfterScripts](yylhander.md#runafterscripts)
- [runBeforeScripts](yylhander.md#runbeforescripts)
- [saveConfigToServer](yylhander.md#saveconfigtoserver)
- [formatConfig](yylhander.md#formatconfig)
- [parseConfig](yylhander.md#parseconfig)
- [startServer](yylhander.md#startserver)

## Constructors

### constructor

\+ **new YylHander**(`option`: [*YylParserOption*](../interfaces/yylparseroption.md)): [*YylHander*](yylhander.md)

#### Parameters:

Name | Type |
------ | ------ |
`option` | [*YylParserOption*](../interfaces/yylparseroption.md) |

**Returns:** [*YylHander*](yylhander.md)

Defined in: [yylHander.ts:260](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L260)

## Properties

### context

• **context**: *string*

Defined in: [yylHander.ts:66](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L66)

___

### env

• **env**: Env

Defined in: [yylHander.ts:68](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L68)

___

### logger

• **logger**: *Logger*<*msg* \| *progress*\>

Defined in: [yylHander.ts:70](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L70)

___

### runner

• `Optional` **runner**: *undefined* \| *Runner*

Defined in: [yylHander.ts:71](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L71)

___

### seed

• **seed**: *undefined* \| SeedEntry

Defined in: [yylHander.ts:69](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L69)

___

### yylConfig

• **yylConfig**: YylConfig

Defined in: [yylHander.ts:67](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L67)

## Methods

### getHomePage

▸ **getHomePage**(`op?`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<*undefined* \| *string*\>

获取 homePage

#### Parameters:

Name | Type |
------ | ------ |
`op?` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<*undefined* \| *string*\>

Defined in: [yylHander.ts:492](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L492)

___

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [yylHander.ts:472](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L472)

___

### init

▸ **init**(`op`: [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md)): *Promise*<*undefined* \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

初始化

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md) |

**Returns:** *Promise*<*undefined* \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

Defined in: [yylHander.ts:295](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L295)

___

### initPlugins

▸ **initPlugins**(): *Promise*<*any*\>

解析 yylConfig.plugins 内容

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:477](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L477)

___

### initScripts

▸ **initScripts**(`ctx`: *any*): *Promise*<*any*\>

scripts 执行

#### Parameters:

Name | Type |
------ | ------ |
`ctx` | *any* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:580](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L580)

___

### livereload

▸ **livereload**(): *Promise*<*void*\>

热更新

**Returns:** *Promise*<*void*\>

Defined in: [yylHander.ts:638](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L638)

___

### openHomePage

▸ **openHomePage**(`op`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<*undefined* \| *string*\>

打开 homePage

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<*undefined* \| *string*\>

Defined in: [yylHander.ts:566](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L566)

___

### runAfterScripts

▸ **runAfterScripts**(`watch?`: *boolean*): *Promise*<*any*\>

执行 after script

#### Parameters:

Name | Type |
------ | ------ |
`watch?` | *boolean* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:619](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L619)

___

### runBeforeScripts

▸ **runBeforeScripts**(`watch?`: *boolean*): *Promise*<*any*\>

执行 before script

#### Parameters:

Name | Type |
------ | ------ |
`watch?` | *boolean* |

**Returns:** *Promise*<*any*\>

Defined in: [yylHander.ts:600](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L600)

___

### saveConfigToServer

▸ **saveConfigToServer**(): *Promise*<*void*\>

保存配置到缓存目录

**Returns:** *Promise*<*void*\>

Defined in: [yylHander.ts:649](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L649)

___

### formatConfig

▸ `Static`**formatConfig**(`option`: [*FormatConfigOption*](../interfaces/formatconfigoption.md)): YylConfig

格式化配置

#### Parameters:

Name | Type |
------ | ------ |
`option` | [*FormatConfigOption*](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:116](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L116)

___

### parseConfig

▸ `Static`**parseConfig**(`op`: [*ParseConfigOption*](../interfaces/parseconfigoption.md)): YylConfig

解析配置

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*ParseConfigOption*](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:74](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L74)

___

### startServer

▸ `Static`**startServer**(`op`: [*StartServerOption*](../interfaces/startserveroption.md)): *Promise*<*Runner*\>

启动服务器

#### Parameters:

Name | Type |
------ | ------ |
`op` | [*StartServerOption*](../interfaces/startserveroption.md) |

**Returns:** *Promise*<*Runner*\>

Defined in: [yylHander.ts:217](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L217)
