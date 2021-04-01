[yyl-hander](../README.md) / [Exports](../modules.md) / YylHander

# Class: YylHander

## Hierarchy

- **YylHander**

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

\+ **new YylHander**(`option`: [_YylParserOption_](../interfaces/yylparseroption.md)): [_YylHander_](yylhander.md)

#### Parameters:

| Name     | Type                                                  |
| -------- | ----------------------------------------------------- |
| `option` | [_YylParserOption_](../interfaces/yylparseroption.md) |

**Returns:** [_YylHander_](yylhander.md)

Defined in: [yylHander.ts:67](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L67)

## Properties

### context

• **context**: _string_

Defined in: [yylHander.ts:63](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L63)

---

### env

• **env**: Env

Defined in: [yylHander.ts:65](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L65)

---

### logger

• **logger**: [_Logger_](../modules.md#logger)<_msg_ \| _progress_\>

Defined in: [yylHander.ts:67](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L67)

---

### seed

• **seed**: _undefined_ \| SeedEntry

Defined in: [yylHander.ts:66](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L66)

---

### yylConfig

• **yylConfig**: YylConfig

Defined in: [yylHander.ts:64](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L64)

## Methods

### formatConfig

▸ **formatConfig**(`option`: [_FormatConfigOption_](../interfaces/formatconfigoption.md)): YylConfig

格式化配置

#### Parameters:

| Name     | Type                                                        |
| -------- | ----------------------------------------------------------- |
| `option` | [_FormatConfigOption_](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:308](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L308)

---

### getHomePage

▸ **getHomePage**(`op?`: [_GetHomePageOption_](../interfaces/gethomepageoption.md)): _Promise_<_undefined_ \| _string_\>

获取 homePage

#### Parameters:

| Name  | Type                                                      |
| ----- | --------------------------------------------------------- |
| `op?` | [_GetHomePageOption_](../interfaces/gethomepageoption.md) |

**Returns:** _Promise_<_undefined_ \| _string_\>

Defined in: [yylHander.ts:429](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L429)

---

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [yylHander.ts:409](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L409)

---

### init

▸ **init**(`op`: [_YylHanderInitOption_](../interfaces/yylhanderinitoption.md)): _Promise_<_undefined_ \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

初始化

#### Parameters:

| Name | Type                                                          |
| ---- | ------------------------------------------------------------- |
| `op` | [_YylHanderInitOption_](../interfaces/yylhanderinitoption.md) |

**Returns:** _Promise_<_undefined_ \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

Defined in: [yylHander.ts:101](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L101)

---

### initPlugins

▸ **initPlugins**(): _Promise_<_any_\>

解析 yylConfig.plugins 内容

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:414](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L414)

---

### initScripts

▸ **initScripts**(`ctx`: _any_): _Promise_<_any_\>

scripts 执行

#### Parameters:

| Name  | Type  |
| ----- | ----- |
| `ctx` | _any_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:517](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L517)

---

### livereload

▸ **livereload**(): _Promise_<_void_\>

热更新

**Returns:** _Promise_<_void_\>

Defined in: [yylHander.ts:575](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L575)

---

### openHomePage

▸ **openHomePage**(`op`: [_GetHomePageOption_](../interfaces/gethomepageoption.md)): _Promise_<_undefined_ \| _string_\>

打开 homePage

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_GetHomePageOption_](../interfaces/gethomepageoption.md) |

**Returns:** _Promise_<_undefined_ \| _string_\>

Defined in: [yylHander.ts:503](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L503)

---

### parseConfig

▸ **parseConfig**(`op`: [_ParseConfigOption_](../interfaces/parseconfigoption.md)): YylConfig

解析配置

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_ParseConfigOption_](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:266](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L266)

---

### runAfterScripts

▸ **runAfterScripts**(`watch?`: _boolean_): _Promise_<_any_\>

执行 after script

#### Parameters:

| Name     | Type      |
| -------- | --------- |
| `watch?` | _boolean_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:556](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L556)

---

### runBeforeScripts

▸ **runBeforeScripts**(`watch?`: _boolean_): _Promise_<_any_\>

执行 before script

#### Parameters:

| Name     | Type      |
| -------- | --------- |
| `watch?` | _boolean_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:537](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L537)

---

### saveConfigToServer

▸ **saveConfigToServer**(): _Promise_<_void_\>

保存配置到缓存目录

**Returns:** _Promise_<_void_\>

Defined in: [yylHander.ts:586](https://github.com/jackness1208/yyl-hander/blob/4886e59/src/yylHander.ts#L586)
