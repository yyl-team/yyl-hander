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

\+ **new YylHander**(`option`: [_YylParserOption_](../interfaces/yylparseroption.md)): [_YylHander_](yylhander.md)

#### Parameters:

| Name     | Type                                                  |
| -------- | ----------------------------------------------------- |
| `option` | [_YylParserOption_](../interfaces/yylparseroption.md) |

**Returns:** [_YylHander_](yylhander.md)

Defined in: [yylHander.ts:260](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L260)

## Properties

### context

• **context**: _string_

Defined in: [yylHander.ts:66](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L66)

---

### env

• **env**: Env

Defined in: [yylHander.ts:68](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L68)

---

### logger

• **logger**: _Logger_<_msg_ \| _progress_\>

Defined in: [yylHander.ts:70](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L70)

---

### runner

• `Optional` **runner**: _undefined_ \| _Runner_

Defined in: [yylHander.ts:71](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L71)

---

### seed

• **seed**: _undefined_ \| SeedEntry

Defined in: [yylHander.ts:69](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L69)

---

### yylConfig

• **yylConfig**: YylConfig

Defined in: [yylHander.ts:67](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L67)

## Methods

### getHomePage

▸ **getHomePage**(`op?`: [_GetHomePageOption_](../interfaces/gethomepageoption.md)): _Promise_<_undefined_ \| _string_\>

获取 homePage

#### Parameters:

| Name  | Type                                                      |
| ----- | --------------------------------------------------------- |
| `op?` | [_GetHomePageOption_](../interfaces/gethomepageoption.md) |

**Returns:** _Promise_<_undefined_ \| _string_\>

Defined in: [yylHander.ts:492](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L492)

---

### getYylConfig

▸ **getYylConfig**(): YylConfig

获取 yylConfig 内容

**Returns:** YylConfig

Defined in: [yylHander.ts:472](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L472)

---

### init

▸ **init**(`op`: [_YylHanderInitOption_](../interfaces/yylhanderinitoption.md)): _Promise_<_undefined_ \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

初始化

#### Parameters:

| Name | Type                                                          |
| ---- | ------------------------------------------------------------- |
| `op` | [_YylHanderInitOption_](../interfaces/yylhanderinitoption.md) |

**Returns:** _Promise_<_undefined_ \| [YylConfig, *undefined* \| SeedOptimizeResult]\>

Defined in: [yylHander.ts:295](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L295)

---

### initPlugins

▸ **initPlugins**(): _Promise_<_any_\>

解析 yylConfig.plugins 内容

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:477](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L477)

---

### initScripts

▸ **initScripts**(`ctx`: _any_): _Promise_<_any_\>

scripts 执行

#### Parameters:

| Name  | Type  |
| ----- | ----- |
| `ctx` | _any_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:580](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L580)

---

### livereload

▸ **livereload**(): _Promise_<_void_\>

热更新

**Returns:** _Promise_<_void_\>

Defined in: [yylHander.ts:638](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L638)

---

### openHomePage

▸ **openHomePage**(`op`: [_GetHomePageOption_](../interfaces/gethomepageoption.md)): _Promise_<_undefined_ \| _string_\>

打开 homePage

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_GetHomePageOption_](../interfaces/gethomepageoption.md) |

**Returns:** _Promise_<_undefined_ \| _string_\>

Defined in: [yylHander.ts:566](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L566)

---

### runAfterScripts

▸ **runAfterScripts**(`watch?`: _boolean_): _Promise_<_any_\>

执行 after script

#### Parameters:

| Name     | Type      |
| -------- | --------- |
| `watch?` | _boolean_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:619](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L619)

---

### runBeforeScripts

▸ **runBeforeScripts**(`watch?`: _boolean_): _Promise_<_any_\>

执行 before script

#### Parameters:

| Name     | Type      |
| -------- | --------- |
| `watch?` | _boolean_ |

**Returns:** _Promise_<_any_\>

Defined in: [yylHander.ts:600](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L600)

---

### saveConfigToServer

▸ **saveConfigToServer**(): _Promise_<_void_\>

保存配置到缓存目录

**Returns:** _Promise_<_void_\>

Defined in: [yylHander.ts:649](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L649)

---

### formatConfig

▸ `Static`**formatConfig**(`option`: [_FormatConfigOption_](../interfaces/formatconfigoption.md)): YylConfig

格式化配置

#### Parameters:

| Name     | Type                                                        |
| -------- | ----------------------------------------------------------- |
| `option` | [_FormatConfigOption_](../interfaces/formatconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:116](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L116)

---

### parseConfig

▸ `Static`**parseConfig**(`op`: [_ParseConfigOption_](../interfaces/parseconfigoption.md)): YylConfig

解析配置

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_ParseConfigOption_](../interfaces/parseconfigoption.md) |

**Returns:** YylConfig

Defined in: [yylHander.ts:74](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L74)

---

### startServer

▸ `Static`**startServer**(`op`: [_StartServerOption_](../interfaces/startserveroption.md)): _Promise_<_Runner_\>

启动服务器

#### Parameters:

| Name | Type                                                      |
| ---- | --------------------------------------------------------- |
| `op` | [_StartServerOption_](../interfaces/startserveroption.md) |

**Returns:** _Promise_<_Runner_\>

Defined in: [yylHander.ts:217](https://github.com/jackness1208/yyl-hander/blob/7fcda46/src/yylHander.ts#L217)
