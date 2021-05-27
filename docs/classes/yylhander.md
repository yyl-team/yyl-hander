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

Defined in: [src/yylHander.ts:283](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L283)

## Properties

### context

• **context**: *string*

Defined in: [src/yylHander.ts:68](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L68)

___

### env

• **env**: Env= {}

Defined in: [src/yylHander.ts:70](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L70)

___

### logger

• **logger**: *Logger*<keyof LoggerType\>

Defined in: [src/yylHander.ts:72](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L72)

___

### runner

• `Optional` **runner**: *Runner*

Defined in: [src/yylHander.ts:73](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L73)

___

### seed

• **seed**: *undefined* \| SeedEntry

Defined in: [src/yylHander.ts:71](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L71)

___

### yylConfig

• **yylConfig**: YylConfig= {}

Defined in: [src/yylHander.ts:69](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L69)

## Methods

### getHomePage

▸ **getHomePage**(`op?`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<string\>

获取 homePage

#### Parameters

| Name | Type |
| :------ | :------ |
| `op?` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<string\>

Defined in: [src/yylHander.ts:568](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L568)

___

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [src/yylHander.ts:548](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L548)

___

### init

▸ **init**(`op`: [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md)): *Promise*<undefined \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

初始化

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*YylHanderInitOption*](../interfaces/yylhanderinitoption.md) |

**Returns:** *Promise*<undefined \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

Defined in: [src/yylHander.ts:334](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L334)

___

### initPlugins

▸ **initPlugins**(`cb`: (`msg`: *Buffer*) => *any*): *Promise*<any\>

解析 yylConfig.plugins 内容

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (`msg`: *Buffer*) => *any* |

**Returns:** *Promise*<any\>

Defined in: [src/yylHander.ts:553](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L553)

___

### initScripts

▸ **initScripts**(`ctx`: *any*): *Promise*<any\>

scripts 执行

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | *any* |

**Returns:** *Promise*<any\>

Defined in: [src/yylHander.ts:660](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L660)

___

### livereload

▸ **livereload**(): *Promise*<void\>

热更新

**Returns:** *Promise*<void\>

Defined in: [src/yylHander.ts:726](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L726)

___

### openHomePage

▸ **openHomePage**(`op`: [*GetHomePageOption*](../interfaces/gethomepageoption.md)): *Promise*<string\>

打开 homePage

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*GetHomePageOption*](../interfaces/gethomepageoption.md) |

**Returns:** *Promise*<string\>

Defined in: [src/yylHander.ts:646](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L646)

___

### runAfterScripts

▸ **runAfterScripts**(`watch?`: *boolean*): *Promise*<any\>

执行 after script

#### Parameters

| Name | Type |
| :------ | :------ |
| `watch?` | *boolean* |

**Returns:** *Promise*<any\>

Defined in: [src/yylHander.ts:705](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L705)

___

### runBeforeScripts

▸ **runBeforeScripts**(`watch?`: *boolean*): *Promise*<any\>

执行 before script

#### Parameters

| Name | Type |
| :------ | :------ |
| `watch?` | *boolean* |

**Returns:** *Promise*<any\>

Defined in: [src/yylHander.ts:684](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L684)

___

### saveConfigToServer

▸ **saveConfigToServer**(): *Promise*<void\>

保存配置到缓存目录

**Returns:** *Promise*<void\>

Defined in: [src/yylHander.ts:741](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L741)

___

### formatConfig

▸ `Static` **formatConfig**(`option`: [*FormatConfigOption*](../interfaces/formatconfigoption.md)): YylConfig

格式化配置

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | [*FormatConfigOption*](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [src/yylHander.ts:139](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L139)

___

### parseConfig

▸ `Static` **parseConfig**(`op`: [*ParseConfigOption*](../interfaces/parseconfigoption.md)): YylConfig

解析配置

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*ParseConfigOption*](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [src/yylHander.ts:76](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L76)

___

### startServer

▸ `Static` **startServer**(`op`: [*StartServerOption*](../interfaces/startserveroption.md)): *Promise*<Runner\>

启动服务器

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | [*StartServerOption*](../interfaces/startserveroption.md) |

**Returns:** *Promise*<Runner\>

Defined in: [src/yylHander.ts:240](https://github.com/yyl-team/yyl-hander/blob/7fb2734/src/yylHander.ts#L240)
