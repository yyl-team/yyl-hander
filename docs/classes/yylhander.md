[yyl-hander](../README.md) / [Exports](../modules.md) / YylHander

# Class: YylHander

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | [*YylParserOption*](../interfaces/yylparseroption.md) |

**Returns:** [*YylHander*](yylhander.md)

Defined in: [src/yylHander.ts:302](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L302)

## Properties

### context

• **context**: *string*

Defined in: [src/yylHander.ts:68](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L68)

___

### env

• **env**: Env= {}

Defined in: [src/yylHander.ts:70](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L70)

___

### logger

• **logger**: *Logger*<keyof LoggerType\>

Defined in: [src/yylHander.ts:72](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L72)

___

### runner

• `Optional` **runner**: *Runner*

Defined in: [src/yylHander.ts:73](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L73)

___

### seed

• **seed**: *undefined* \| SeedEntry

Defined in: [src/yylHander.ts:71](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L71)

___

### yylConfig

• **yylConfig**: YylConfig= {}

Defined in: [src/yylHander.ts:69](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L69)

## Methods

### getHomePage

▸ **getHomePage**(`op?`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<string\>

获取 homePage

#### Parameters

| Name | Type |
| :------ | :------ |
| `op?` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<string\>

Defined in: [src/yylHander.ts:613](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L613)

___

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [src/yylHander.ts:593](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L593)

___

### init

▸ **init**(`op`: [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md)): *Promise*<undefined \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

初始化

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md) |

**Returns:** *Promise*<undefined \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

Defined in: [src/yylHander.ts:353](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L353)

___

### initPlugins

▸ **initPlugins**(`cb`: (`msg`: *Buffer*) => *any*): *Promise*<any\>

解析 yylConfig.plugins 内容

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (`msg`: *Buffer*) => *any* |

**Returns:** *Promise*<any\>

Defined in: [src/yylHander.ts:598](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L598)

___

### initScripts

▸ **initScripts**(`ctx`: *any*): *Promise*<any\>

scripts 执行

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | *any* |

**Returns:** *Promise*<any\>

Defined in: [src/yylHander.ts:709](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L709)

___

### livereload

▸ **livereload**(): *Promise*<void\>

热更新

**Returns:** *Promise*<void\>

Defined in: [src/yylHander.ts:775](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L775)

___

### openHomePage

▸ **openHomePage**(`op`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<string\>

打开 homePage

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<string\>

Defined in: [src/yylHander.ts:695](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L695)

___

### runAfterScripts

▸ **runAfterScripts**(`watch?`: *boolean*): *Promise*<any\>

执行 after script

#### Parameters

| Name | Type |
| :------ | :------ |
| `watch?` | *boolean* |

**Returns:** *Promise*<any\>

Defined in: [src/yylHander.ts:754](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L754)

___

### runBeforeScripts

▸ **runBeforeScripts**(`watch?`: *boolean*): *Promise*<any\>

执行 before script

#### Parameters

| Name | Type |
| :------ | :------ |
| `watch?` | *boolean* |

**Returns:** *Promise*<any\>

Defined in: [src/yylHander.ts:733](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L733)

___

### saveConfigToServer

▸ **saveConfigToServer**(): *Promise*<void\>

保存配置到缓存目录

**Returns:** *Promise*<void\>

Defined in: [src/yylHander.ts:786](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L786)

___

### formatConfig

▸ `Static` **formatConfig**(`option`: [*FormatConfigOption*](../interfaces/formatconfigoption.md)): YylConfig

格式化配置

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | [*FormatConfigOption*](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [src/yylHander.ts:139](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L139)

___

### parseConfig

▸ `Static` **parseConfig**(`op`: [*ParseConfigOption*](../interfaces/parseconfigoption.md)): YylConfig

解析配置

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*ParseConfigOption*](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [src/yylHander.ts:76](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L76)

___

### startServer

▸ `Static` **startServer**(`op`: [*StartServerOption*](../interfaces/startserveroption.md)): *Promise*<Runner\>

启动服务器

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*StartServerOption*](../interfaces/startserveroption.md) |

**Returns:** *Promise*<Runner\>

Defined in: [src/yylHander.ts:259](https://github.com/yyl-team/yyl-hander/blob/72b76e8/src/yylHander.ts#L259)
