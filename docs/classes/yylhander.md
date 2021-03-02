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

Defined in: [yylHander.ts:66](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L66)

## Properties

### context

• **context**: _string_

Defined in: [yylHander.ts:62](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L62)

---

### env

• **env**: Env

Defined in: [yylHander.ts:64](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L64)

---

### logger

• **logger**: [_Logger_](../modules.md#logger)<_msg_ \| _progress_, _number_ \| _error_ \| _warn_ \| _info_ \| _add_ \| _update_ \| _success_ \| _del_ \| _cmd_ \| _start_ \| _finished_\>

Defined in: [yylHander.ts:66](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L66)

---

### seed

• **seed**: _undefined_ \| SeedEntry

Defined in: [yylHander.ts:65](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L65)

---

### yylConfig

• **yylConfig**: YylConfig

Defined in: [yylHander.ts:63](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L63)

## Methods

### formatConfig

▸ **formatConfig**(`option`: [_FormatConfigOption_](../interfaces/formatconfigoption.md)): YylConfig

格式化配置

#### Parameters:

| Name     | Type                                                        |
| -------- | ----------------------------------------------------------- |
| `option` | [_FormatConfigOption_](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:301](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L301)

---

### getHomePage

▸ **getHomePage**(`op?`: [_GetHomePageOption_](../interfaces/gethomepageoption.md)): _Promise_<_undefined_ \| _string_\>

获取 homePage

#### Parameters:

| Name  | Type                                                      |
| ----- | --------------------------------------------------------- |
| `op?` | [_GetHomePageOption_](../interfaces/gethomepageoption.md) |

**Returns:** _Promise_<_undefined_ \| _string_\>

Defined in: [yylHander.ts:422](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L422)

---

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [yylHander.ts:402](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L402)

---

### init

▸ **init**(`op`: [_YylHanderInitOption_](../interfaces/yylhanderinitoption.md)): _Promise_<_undefined_ \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

初始化

#### Parameters:

| Name | Type                                                          |
| ---- | ------------------------------------------------------------- |
| `op` | [_YylHanderInitOption_](../interfaces/yylhanderinitoption.md) |

**Returns:** _Promise_<_undefined_ \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

Defined in: [yylHander.ts:100](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L100)

---

### initPlugins

▸ **initPlugins**(): _Promise_<_any_\>

解析 yylConfig.plugins 内容

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:407](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L407)

---

### initScripts

▸ **initScripts**(`ctx`: _any_): _Promise_<_any_\>

scripts 执行

#### Parameters:

| Name  | Type  |
| ----- | ----- |
| `ctx` | _any_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:510](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L510)

---

### livereload

▸ **livereload**(): _Promise_<_void_\>

热更新

**Returns:** _Promise_<_void_\>

Defined in: [yylHander.ts:568](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L568)

---

### openHomePage

▸ **openHomePage**(`op`: [_GetHomePageOption_](../interfaces/gethomepageoption.md)): _Promise_<_undefined_ \| _string_\>

打开 homePage

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_GetHomePageOption_](../interfaces/gethomepageoption.md) |

**Returns:** _Promise_<_undefined_ \| _string_\>

Defined in: [yylHander.ts:496](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L496)

---

### parseConfig

▸ **parseConfig**(`op`: [_ParseConfigOption_](../interfaces/parseconfigoption.md)): YylConfig

解析配置

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_ParseConfigOption_](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:259](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L259)

---

### runAfterScripts

▸ **runAfterScripts**(`watch?`: _boolean_): _Promise_<_any_\>

执行 after script

#### Parameters:

| Name     | Type      |
| -------- | --------- |
| `watch?` | _boolean_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:549](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L549)

---

### runBeforeScripts

▸ **runBeforeScripts**(`watch?`: _boolean_): _Promise_<_any_\>

执行 before script

#### Parameters:

| Name     | Type      |
| -------- | --------- |
| `watch?` | _boolean_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:530](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L530)

---

### saveConfigToServer

▸ **saveConfigToServer**(): _Promise_<_void_\>

保存配置到缓存目录

**Returns:** _Promise_<_void_\>

Defined in: [yylHander.ts:579](https://github.com/jackness1208/yyl-hander/blob/d810b2c/src/yylHander.ts#L579)
