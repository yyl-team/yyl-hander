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

\+ **new YylHander**(`option`: [_YylParserOption_](../interfaces/yylparseroption.md)): [_YylHander_](yylhander.md)

#### Parameters:

| Name     | Type                                                  |
| -------- | ----------------------------------------------------- |
| `option` | [_YylParserOption_](../interfaces/yylparseroption.md) |

**Returns:** [_YylHander_](yylhander.md)

Defined in: [yylHander.ts:53](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L53)

## Properties

### context

• **context**: _string_

Defined in: [yylHander.ts:50](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L50)

---

### env

• **env**: Env

Defined in: [yylHander.ts:52](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L52)

---

### logger

• **logger**: [_Logger_](../modules.md#logger)

Defined in: [yylHander.ts:53](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L53)

---

### yylConfig

• **yylConfig**: YylConfig

Defined in: [yylHander.ts:51](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L51)

## Methods

### formatConfig

▸ **formatConfig**(`option`: [_FormatConfigOption_](../interfaces/formatconfigoption.md)): YylConfig

#### Parameters:

| Name     | Type                                                        |
| -------- | ----------------------------------------------------------- |
| `option` | [_FormatConfigOption_](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:117](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L117)

---

### getHomePage

▸ **getHomePage**(`op?`: [_GetHomePageOption_](../interfaces/gethomepageoption.md)): _Promise_<_undefined_ \| _string_\>

获取 homePage

#### Parameters:

| Name  | Type                                                      |
| ----- | --------------------------------------------------------- |
| `op?` | [_GetHomePageOption_](../interfaces/gethomepageoption.md) |

**Returns:** _Promise_<_undefined_ \| _string_\>

Defined in: [yylHander.ts:238](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L238)

---

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [yylHander.ts:218](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L218)

---

### initPlugins

▸ **initPlugins**(): _Promise_<_any_\>

解析 yylConfig.plugins 内容

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:223](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L223)

---

### initScripts

▸ **initScripts**(`ctx`: _any_): _Promise_<_any_\>

scripts 执行

#### Parameters:

| Name  | Type  |
| ----- | ----- |
| `ctx` | _any_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:326](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L326)

---

### livereload

▸ **livereload**(): _Promise_<_void_\>

热更新

**Returns:** _Promise_<_void_\>

Defined in: [yylHander.ts:394](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L394)

---

### openHomePage

▸ **openHomePage**(`op`: [_GetHomePageOption_](../interfaces/gethomepageoption.md)): _Promise_<_undefined_ \| _string_\>

打开 homePage

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_GetHomePageOption_](../interfaces/gethomepageoption.md) |

**Returns:** _Promise_<_undefined_ \| _string_\>

Defined in: [yylHander.ts:312](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L312)

---

### parseConfig

▸ **parseConfig**(`op`: [_ParseConfigOption_](../interfaces/parseconfigoption.md)): YylConfig

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_ParseConfigOption_](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:76](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L76)

---

### runAfterScripts

▸ **runAfterScripts**(`ctx`: _string_): _Promise_<_any_\>

执行 after script

#### Parameters:

| Name  | Type     |
| ----- | -------- |
| `ctx` | _string_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:370](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L370)

---

### runBeforeScripts

▸ **runBeforeScripts**(`ctx`: _string_): _Promise_<_any_\>

执行 before script

#### Parameters:

| Name  | Type     |
| ----- | -------- |
| `ctx` | _string_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:346](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L346)

---

### saveConfigToServer

▸ **saveConfigToServer**(): _Promise_<_void_\>

保存配置到缓存目录

**Returns:** _Promise_<_void_\>

Defined in: [yylHander.ts:405](https://github.com/jackness1208/yyl-hander/blob/14d9d5f/src/yylHander.ts#L405)
