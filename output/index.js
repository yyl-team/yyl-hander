/*!
 * yyl-hander cjs 1.1.2
 * (c) 2020 - 2021 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');
var util = require('yyl-util');
var extOs = require('yyl-os');
var extFs = require('yyl-fs');
var chalk = require('chalk');
var request = require('request-promise');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
var extOs__default = /*#__PURE__*/_interopDefaultLegacy(extOs);
var extFs__default = /*#__PURE__*/_interopDefaultLegacy(extFs);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var request__default = /*#__PURE__*/_interopDefaultLegacy(request);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const SUGAR_REG = /(\{\$)([a-zA-Z0-9@_\-$.~]+)(\})/g;
/** profile */
const USERPROFILE = `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}`;
/** server 根目录 */
const SERVER_PATH = formatPath(path__default['default'].join(USERPROFILE, '.yyl'));
/** server 数据存放目录 */
const SERVER_DATA_PATH = formatPath(path__default['default'].join(SERVER_PATH, 'data'));
/** server plugins 存放目录 */
const SERVER_PLUGIN_PATH = formatPath(path__default['default'].join(SERVER_PATH, 'plugins'));
/** server 存放构建生成的 config 的缓存文件 */
const SERVER_CONFIG_LOG_PATH = formatPath(path__default['default'].join(SERVER_PATH, 'config-log'));
/** proxy 缓存目录 */
const PROXY_CACHE_PATH = formatPath(path__default['default'].join(USERPROFILE, '.anyproxy/cache'));
const LANG = {
    OPEN_ADDR: '打开 url',
    CONFIG_SAVED: '配置已保存',
    CONFIG_NOT_EXISTS: 'yyl.config 路径不存在',
    CONFIG_NOT_SET: 'new yylHander 入参不存在: op.yylConfig',
    CONFIG_PARSE_ERROR: '配置解析错误',
    REQUIRE_ATLEAST_VERSION: '项目要求 yyl 版本 不能低于',
    DEL_PKG_LOCK_FILE: '存在 package-lock.json, 与 yarn 冲突，删之',
    INSTALL_YARN: '请先安装 yarn',
    YARN_VERSION: 'yarn 版本',
    SEED_NOT_SET: '没有传入 seed 配置',
    PRINT_HOME_PAGE: '主页地址',
    PAGE_RELOAD: '页面刷新',
    SAVE_CONFIG_TO_SERVER_FAIL: '保存配置到本地服务失败',
    CLEAN_DIST_FAIL: '清除本地输出目录失败',
    CLEAN_DIST_FINISHED: '清除本地输出目录完成',
    SEED_INIT_START: '正在初始化 seed包构建部分',
    SEED_INIT_FINISHED: '初始化 seed包构建部分完成',
    SEED_INIT_FAIL: '初始化 seed包构建部分失败',
    NO_OPZER_HANDLE: 'seed 包没返回 opzer',
    OPTIMIZE_START: '开始构建项目',
    OPTIMIZE_FINISHED: '任务执行完成',
    MISS_NAME_OPTIONS: '缺少 --name 属性',
    NAME_OPTIONS_NOT_EXISTS: '--name 属性设置错误',
    CONFIG_ATTR_IS_NEEDFUL: 'config 中以下属性为必填项',
    RUN_ALL_BEFORE_SCRIPT_START: '开始执行 config.all.beforeScripts',
    RUN_ALL_BEFORE_SCRIPT_FINISHED: '执行 config.all.beforeScripts 完成',
    RUN_ALL_AFTER_SCRIPT_START: '开始执行 config.all.afterScripts',
    RUN_ALL_AFTER_SCRIPT_FINISHED: '执行 config.all.afterScripts 完成',
    RUN_WATCH_BEFORE_SCRIPT_START: '开始执行 config.watch.beforeScripts',
    RUN_WATCH_BEFORE_SCRIPT_FINISHED: '执行 config.watch.beforeScripts 完成',
    RUN_WATCH_AFTER_SCRIPT_START: '开始执行 config.watch.afterScripts',
    RUN_WATCH_AFTER_SCRIPT_FINISHED: '执行 config.watch.afterScripts 完成',
    RUN_SCRIPT_FN_START: '开始执行回调方法',
    RUN_SCRIPT_FN_FINISHED: '执行回调完成'
};

function toCtx(ctx) {
    return ctx;
}
/** 路径格式化 */
function formatPath(url) {
    return url.split(path__default['default'].sep).join('/');
}
/** 去掉 protocol */
function hideProtocol(url) {
    if (typeof url === 'string') {
        return url.replace(/^https?:/, '');
    }
    else {
        return url;
    }
}
/** sugar 替换 */
function sugarReplace(str, alias) {
    return str.replace(SUGAR_REG, (str, $1, $2) => {
        if (alias) {
            if ($2 in alias) {
                return alias[$2];
            }
            else {
                return str;
            }
        }
        else {
            return str;
        }
    });
}
/** 检查当前 yylConfig 是否需要 添加 env.name */
function needEnvName(yylConfig) {
    if (yylConfig.workflow) {
        return [];
    }
    else {
        const r = [];
        Object.keys(yylConfig).forEach((key) => {
            const iAttr = toCtx(yylConfig)[key];
            if (typeof iAttr === 'object' && iAttr.workflow) {
                r.push(key);
            }
        });
        return r;
    }
}
/** sugar 深替换 */
function deepReplace(obj, alias) {
    Object.keys(obj).forEach((key) => {
        const curKey = sugarReplace(key, alias);
        if (curKey !== key) {
            toCtx(obj)[curKey] = obj[key];
            delete obj[key];
        }
        switch (util.type(obj[curKey])) {
            case 'array':
                toCtx(obj)[curKey] = obj[curKey].map((val) => {
                    if (util.type(val) === 'string') {
                        return sugarReplace(val, alias);
                    }
                    else {
                        return val;
                    }
                });
                deepReplace(toCtx(obj)[curKey], alias);
                break;
            case 'object':
                deepReplace(toCtx(obj), alias);
                break;
            case 'string':
                toCtx(obj)[curKey] = sugarReplace(toCtx(obj)[curKey], alias);
                break;
        }
    });
}

const DEFAULT_ALIAS = {
    root: './dist',
    srcRoot: './src',
    destRoot: './dist',
    dirname: './',
    jsDest: './dist/js',
    cssDest: './dist/css',
    imagesDest: './dist/images',
    htmlDest: './dist/html',
    revDest: './dist/assets',
    revRoot: './dist'
};
class YylHander {
    constructor(option) {
        this.context = process.cwd();
        this.yylConfig = {};
        this.env = {};
        this.seed = undefined;
        this.logger = () => { };
        const { yylConfig, env, logger, context } = option;
        if (logger) {
            this.logger = logger;
        }
        if (env) {
            this.env = env;
        }
        if (context) {
            this.context = context;
        }
        if (this.env.config) {
            const configPath = path__default['default'].resolve(process.cwd(), this.env.config);
            this.context = path__default['default'].dirname(configPath);
            this.yylConfig = this.parseConfig({
                configPath,
                env: this.env
            });
        }
        else if (typeof yylConfig === 'string') {
            this.context = path__default['default'].dirname(yylConfig);
            this.yylConfig = this.parseConfig({
                configPath: yylConfig,
                env: this.env
            });
        }
        else if (yylConfig) {
            this.yylConfig = this.formatConfig({ yylConfig, env: this.env, context: this.context });
        }
        else {
            throw new Error(`${LANG.CONFIG_NOT_EXISTS}`);
        }
    }
    /** 初始化 */
    init(op) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { seed, watch, yylVersion } = op;
            const { yylConfig, context, logger, env } = this;
            logger('progress', 'start');
            // 版本检查
            if (yylVersion && yylConfig.version) {
                if (util__default['default'].compareVersion(yylConfig.version, yylVersion) > 0) {
                    logger('msg', 'error', [new Error(`${LANG.REQUIRE_ATLEAST_VERSION}: ${yylConfig.version}`)]);
                    return;
                }
            }
            // yarn 安装检查
            if (yylConfig.yarn) {
                const yarnVersion = yield extOs__default['default'].getYarnVersion();
                if (yarnVersion) {
                    logger('msg', 'info', [`${LANG.YARN_VERSION}: ${chalk__default['default'].green(yarnVersion)}`]);
                    // 删除 package-lock.json
                    const pkgLockPath = path__default['default'].join(context, 'package-lock.json');
                    if (fs__default['default'].existsSync(pkgLockPath)) {
                        yield extFs__default['default'].removeFiles(pkgLockPath).catch(() => undefined);
                        logger('msg', 'warn', [LANG.DEL_PKG_LOCK_FILE]);
                    }
                }
                else {
                    logger('msg', 'error', [
                        new Error(`${LANG.INSTALL_YARN}: ${chalk__default['default'].yellow('npm i yarn -g')}`)
                    ]);
                    return;
                }
            }
            if (!seed) {
                logger('msg', 'error', [new Error(LANG.SEED_NOT_SET)]);
                return;
            }
            // config.plugins 插件初始化
            yield this.initPlugins().catch((er) => {
                logger('msg', 'error', [er]);
            });
            // 保存配置到服务器
            try {
                this.saveConfigToServer();
            }
            catch (er) {
                logger('msg', 'error', [new Error(LANG.SAVE_CONFIG_TO_SERVER_FAIL)]);
            }
            // clean dist
            if (((_a = yylConfig.localserver) === null || _a === void 0 ? void 0 : _a.root) &&
                path__default['default'].join(yylConfig.localserver.root) !== path__default['default'].join(context)) {
                yield extFs__default['default'].removeFiles((_b = yylConfig.localserver) === null || _b === void 0 ? void 0 : _b.root).catch(() => {
                    var _a;
                    logger('msg', 'warn', [
                        `${LANG.CLEAN_DIST_FAIL}: ${chalk__default['default'].yellow((_a = yylConfig.localserver) === null || _a === void 0 ? void 0 : _a.root)}`
                    ]);
                });
                logger('msg', 'success', [
                    `${LANG.CLEAN_DIST_FINISHED}: ${chalk__default['default'].yellow((_c = yylConfig.localserver) === null || _c === void 0 ? void 0 : _c.root)}`
                ]);
            }
            // 执行代码前配置项
            yield this.runBeforeScripts().catch((er) => {
                logger('msg', 'error', [er]);
            });
            try {
                logger('msg', 'info', [`${LANG.SEED_INIT_START}`]);
                const opzer = yield seed.optimize({
                    yylConfig,
                    env,
                    ctx: watch ? 'watch' : 'all',
                    root: context
                });
                logger('msg', 'info', [`${LANG.SEED_INIT_FINISHED}`]);
                return yield new Promise((resolve, reject) => {
                    if (opzer) {
                        let isUpdate = false;
                        let isError = false;
                        const htmlSet = new Set();
                        logger('msg', 'info', [LANG.OPTIMIZE_START]);
                        opzer
                            .on('msg', (type, args) => {
                            if (type === 'error') {
                                isError = toCtx(args[0]);
                            }
                            if (['create', 'update'].includes(type)) {
                                if (/\.html$/.test(args[0])) {
                                    htmlSet.add(args[0]);
                                }
                            }
                        })
                            .on('progress', (subType) => __awaiter(this, void 0, void 0, function* () {
                            if (subType === 'start') {
                                logger('progress', 'start');
                            }
                            else if (subType === 'finished') {
                                if (!watch && isError) {
                                    logger('msg', 'error', [isError]);
                                    return;
                                }
                                /** 执行代码执行后配置项 */
                                this.runAfterScripts(watch);
                                logger('msg', 'success', [`${watch ? 'watch' : 'all'} ${LANG.OPTIMIZE_FINISHED}`]);
                                const homePage = yield this.getHomePage({
                                    files: (() => {
                                        const r = [];
                                        htmlSet.forEach((item) => {
                                            r.push(item);
                                        });
                                        return r;
                                    })()
                                });
                                logger('msg', 'success', [
                                    `${LANG.PRINT_HOME_PAGE}: ${chalk__default['default'].yellow.bold(homePage)}`
                                ]);
                                // 第一次构建 打开 对应页面
                                if (watch && !isUpdate && !env.silent && env.proxy && homePage) {
                                    extOs__default['default'].openBrowser(homePage);
                                }
                                if (isUpdate) {
                                    if (env.livereload) {
                                        logger('msg', 'success', [LANG.PAGE_RELOAD]);
                                        yield this.livereload();
                                    }
                                    logger('progress', 'finished');
                                }
                                else {
                                    isUpdate = true;
                                    logger('progress', 'finished');
                                    resolve([yylConfig, opzer]);
                                }
                            }
                            else {
                                logger('progress', subType);
                            }
                        }));
                        if (watch) {
                            opzer.watch();
                        }
                        else {
                            opzer.all();
                        }
                    }
                    else {
                        logger('msg', 'error', [new Error(LANG.NO_OPZER_HANDLE)]);
                        resolve([yylConfig, opzer]);
                    }
                });
            }
            catch (er) {
                logger('msg', 'error', [new Error(LANG.SEED_INIT_FAIL)]);
            }
        });
    }
    /** 解析配置 */
    parseConfig(op) {
        const { configPath, env } = op;
        let yylConfig = {};
        if (!fs__default['default'].existsSync(configPath)) {
            throw new Error(`${LANG.CONFIG_NOT_EXISTS}: ${chalk__default['default'].yellow(configPath)}`);
        }
        const context = path__default['default'].dirname(configPath);
        try {
            yylConfig = require(configPath);
        }
        catch (er) {
            throw new Error(`${LANG.CONFIG_PARSE_ERROR}: ${configPath}, ${er.message}`);
        }
        if (typeof yylConfig === 'function') {
            yylConfig = yylConfig({ env });
        }
        // extend config.mine.js
        let mineConfig = {};
        const mineConfigPath = configPath.replace(/\.js$/, '.mine.js');
        if (fs__default['default'].existsSync(mineConfigPath)) {
            try {
                mineConfig = require(mineConfigPath);
            }
            catch (er) { }
        }
        if (typeof mineConfigPath === 'function') {
            mineConfig = mineConfig({ env });
        }
        // deep extends
        util__default['default'].extend(true, yylConfig, mineConfig);
        return this.formatConfig({
            context,
            yylConfig,
            env
        });
    }
    /** 格式化配置 */
    formatConfig(option) {
        var _a, _b, _c;
        let { yylConfig, env, context } = option;
        // 检查是否需要 env.name
        const requiredNames = needEnvName(yylConfig);
        if (requiredNames.length) {
            if (env.name) {
                if (requiredNames.includes(env.name)) {
                    yylConfig = toCtx(yylConfig)[env.name];
                }
                else {
                    throw new Error(`${LANG.NAME_OPTIONS_NOT_EXISTS}: ${env.name}, usage: ${requiredNames.join('|')}`);
                }
            }
            else {
                throw new Error(`${LANG.MISS_NAME_OPTIONS}: ${requiredNames.join('|')}`);
            }
        }
        if (env.workflow) {
            yylConfig.workflow = env.workflow;
        }
        if (!yylConfig.workflow) {
            throw new Error(`${LANG.CONFIG_ATTR_IS_NEEDFUL}: workflow`);
        }
        if (!yylConfig.name) {
            yylConfig.name = 'default';
        }
        // yylConfig 初始化
        yylConfig.alias = Object.assign(Object.assign({}, DEFAULT_ALIAS), yylConfig.alias);
        // alias format to absolute
        Object.keys(yylConfig.alias).forEach((key) => {
            if (yylConfig.alias && yylConfig.alias[key]) {
                yylConfig.alias[key] = formatPath(path__default['default'].resolve(context, yylConfig.alias[key]));
            }
        });
        // commit
        if (!((_a = yylConfig.commit) === null || _a === void 0 ? void 0 : _a.hostname)) {
            if (!yylConfig.commit) {
                yylConfig.commit = {
                    revAddr: '',
                    hostname: '/'
                };
            }
            else {
                yylConfig.commit.hostname = '/';
            }
        }
        if (yylConfig.webpackConfigPath) {
            yylConfig.webpackConfigPath = util__default['default'].path.resolve(context, yylConfig.webpackConfigPath);
        }
        // config.resource to absolute
        if (yylConfig.resource) {
            Object.keys(yylConfig.resource).forEach((key) => {
                let curKey = sugarReplace(key, yylConfig.alias);
                if (curKey === key) {
                    curKey = formatPath(path__default['default'].resolve(context, key));
                }
                if (yylConfig.resource) {
                    const curVal = yylConfig.resource[key];
                    let rVal = sugarReplace(curVal, yylConfig.alias);
                    if (rVal === curVal) {
                        rVal = formatPath(path__default['default'].resolve(context, yylConfig.resource[key]));
                    }
                    yylConfig.resource[curKey] = rVal;
                    delete yylConfig.resource[key];
                }
            });
        }
        if (util.type(yylConfig.concat) === 'object') {
            if (yylConfig.concat) {
                deepReplace(yylConfig.concat, yylConfig.alias);
            }
        }
        if (!yylConfig.platform) {
            yylConfig.platform = 'pc';
        }
        if ((_b = yylConfig === null || yylConfig === void 0 ? void 0 : yylConfig.localserver) === null || _b === void 0 ? void 0 : _b.root) {
            yylConfig.localserver.root = formatPath(path__default['default'].resolve(context, yylConfig.localserver.root));
        }
        // 配置 resolveModule (适用于 webpack)
        if (!yylConfig.resolveModule && yylConfig.workflow && ((_c = yylConfig.plugins) === null || _c === void 0 ? void 0 : _c.length)) {
            yylConfig.resolveModule = formatPath(path__default['default'].join(SERVER_PLUGIN_PATH, yylConfig.workflow, yylConfig.name, 'node_modules'));
        }
        return yylConfig;
    }
    /** 获取 yylConfig 内容 */
    getYylConfig() {
        return this.yylConfig;
    }
    /** 解析 yylConfig.plugins 内容 */
    initPlugins() {
        return __awaiter(this, void 0, void 0, function* () {
            const { yylConfig } = this;
            let pluginPath = null;
            if (yylConfig.resolveModule) {
                pluginPath = path__default['default'].join(yylConfig.resolveModule, '..');
                if (!fs__default['default'].existsSync(pluginPath)) {
                    extFs__default['default'].mkdirSync(pluginPath);
                }
            }
            if (yylConfig.plugins && pluginPath) {
                return yield extOs__default['default'].installNodeModules(yylConfig.plugins, pluginPath, !!yylConfig.yarn);
            }
        });
    }
    /** 获取 homePage */
    getHomePage(op) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            const { yylConfig, env } = this;
            const files = (op === null || op === void 0 ? void 0 : op.files) || [];
            const sortHtmls = function (htmls) {
                htmls.sort((a, b) => {
                    const aName = path__default['default'].basename(a);
                    const bName = path__default['default'].basename(b);
                    const reg = /^index|default$/;
                    const aReg = reg.exec(aName);
                    const bReg = reg.exec(bName);
                    if (aReg && !bReg) {
                        return -1;
                    }
                    else if (!aReg && bReg) {
                        return 1;
                    }
                    else {
                        return a.localeCompare(b);
                    }
                });
            };
            let addr;
            let localServerAddr = '';
            let localServerAddr2 = '';
            if ((_a = yylConfig === null || yylConfig === void 0 ? void 0 : yylConfig.localserver) === null || _a === void 0 ? void 0 : _a.port) {
                localServerAddr = `http://${extOs__default['default'].LOCAL_IP}:${yylConfig.localserver.port}`;
                localServerAddr2 = `http://127.0.0.1:${yylConfig.localserver.port}`;
            }
            const iHost = (_b = yylConfig === null || yylConfig === void 0 ? void 0 : yylConfig.commit) === null || _b === void 0 ? void 0 : _b.hostname.replace(/\/$/, '');
            if (((_c = yylConfig.proxy) === null || _c === void 0 ? void 0 : _c.homePage) && env.proxy) {
                addr = yylConfig.proxy.homePage;
            }
            else {
                let htmls = [];
                if (files && files.length) {
                    htmls = files;
                }
                else {
                    if (yylConfig.alias) {
                        htmls = yield extFs__default['default'].readFilePaths((_d = yylConfig.alias) === null || _d === void 0 ? void 0 : _d.destRoot, /\.html$/, true);
                    }
                }
                sortHtmls(htmls);
                if (env.proxy) {
                    let iAddr = '';
                    if ((_e = yylConfig.proxy) === null || _e === void 0 ? void 0 : _e.localRemote) {
                        for (const key in yylConfig.proxy.localRemote) {
                            iAddr = yylConfig.proxy.localRemote[key].replace(/\/$/, '');
                            if ((iAddr === localServerAddr || iAddr === localServerAddr2) &&
                                key.replace(/\/$/, '') !== iHost) {
                                addr = key;
                                break;
                            }
                        }
                    }
                    if (!addr) {
                        addr = (_f = yylConfig.commit) === null || _f === void 0 ? void 0 : _f.hostname;
                    }
                }
                else {
                    addr = localServerAddr;
                }
                if (htmls.length) {
                    if (yylConfig.alias && addr) {
                        addr = util__default['default'].path.join(addr, path__default['default'].relative((_g = yylConfig.alias) === null || _g === void 0 ? void 0 : _g.destRoot, htmls[0]));
                    }
                }
            }
            return addr;
        });
    }
    /** 打开 homePage */
    openHomePage(op) {
        return __awaiter(this, void 0, void 0, function* () {
            const { logger } = this;
            const addr = yield this.getHomePage(op);
            if (addr) {
                logger('msg', 'success', [LANG.OPEN_ADDR]);
                logger('msg', 'success', [chalk__default['default'].cyan(addr)]);
                yield extOs__default['default'].openBrowser(addr);
            }
            return addr;
        });
    }
    /** scripts 执行 */
    initScripts(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { yylConfig, env, logger, context } = this;
            if (typeof ctx === 'string') {
                logger('msg', 'cmd', [ctx]);
                return yield extOs.runSpawn(ctx, context);
            }
            else if (typeof ctx === 'function') {
                logger('msg', 'info', [LANG.RUN_SCRIPT_FN_START]);
                const rFn = ctx({ config: yylConfig, env });
                if (typeof rFn === 'string') {
                    logger('msg', 'cmd', [rFn]);
                    return yield extOs.runSpawn(rFn, context);
                }
                else {
                    const r = yield rFn;
                    logger('msg', 'success', [LANG.RUN_SCRIPT_FN_FINISHED]);
                    return r;
                }
            }
        });
    }
    /** 执行 before script */
    runBeforeScripts(watch) {
        return __awaiter(this, void 0, void 0, function* () {
            const { yylConfig, logger } = this;
            let entry = yylConfig.all;
            if (watch) {
                entry = yylConfig.watch;
            }
            if (entry && entry.beforeScripts) {
                logger('msg', 'info', [
                    watch ? LANG.RUN_WATCH_BEFORE_SCRIPT_START : LANG.RUN_ALL_BEFORE_SCRIPT_START
                ]);
                const r = yield this.initScripts(entry.beforeScripts);
                logger('msg', 'success', [
                    watch ? LANG.RUN_WATCH_BEFORE_SCRIPT_FINISHED : LANG.RUN_ALL_BEFORE_SCRIPT_FINISHED
                ]);
                return r;
            }
        });
    }
    /** 执行 after script */
    runAfterScripts(watch) {
        return __awaiter(this, void 0, void 0, function* () {
            const { yylConfig, logger } = this;
            let entry = yylConfig.all;
            if (watch) {
                entry = yylConfig.watch;
            }
            if (entry && entry.afterScripts) {
                logger('msg', 'info', [
                    watch ? LANG.RUN_WATCH_AFTER_SCRIPT_START : LANG.RUN_ALL_AFTER_SCRIPT_START
                ]);
                const r = yield this.initScripts(entry.afterScripts);
                logger('msg', 'success', [
                    watch ? LANG.RUN_WATCH_AFTER_SCRIPT_FINISHED : LANG.RUN_ALL_AFTER_SCRIPT_FINISHED
                ]);
                return r;
            }
        });
    }
    /** 热更新 */
    livereload() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { yylConfig } = this;
            if ((_a = yylConfig.localserver) === null || _a === void 0 ? void 0 : _a.port) {
                const reloadPath = `http://${extOs__default['default'].LOCAL_IP}:${yylConfig.localserver.port}1/changed?files=1`;
                try {
                    yield request__default['default'](reloadPath);
                }
                catch (er) { }
            }
        });
    }
    /** 保存配置到缓存目录 */
    saveConfigToServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const { logger, yylConfig } = this;
            if (!yylConfig.workflow || !yylConfig.name) {
                return;
            }
            yield extFs__default['default'].mkdirSync(SERVER_CONFIG_LOG_PATH);
            const filename = `${yylConfig.workflow}-${yylConfig.name}.js`;
            const serverConfigPath = path__default['default'].join(SERVER_CONFIG_LOG_PATH, filename);
            const printPath = `~/.yyl/${path__default['default'].relative(SERVER_PATH, serverConfigPath)}`;
            fs__default['default'].writeFileSync(serverConfigPath, JSON.stringify(yylConfig, null, 2));
            logger('msg', 'success', [`${LANG.CONFIG_SAVED}: ${chalk__default['default'].yellow(printPath)}`]);
        });
    }
}

exports.DEFAULT_ALIAS = DEFAULT_ALIAS;
exports.LANG = LANG;
exports.PROXY_CACHE_PATH = PROXY_CACHE_PATH;
exports.SERVER_CONFIG_LOG_PATH = SERVER_CONFIG_LOG_PATH;
exports.SERVER_DATA_PATH = SERVER_DATA_PATH;
exports.SERVER_PATH = SERVER_PATH;
exports.SERVER_PLUGIN_PATH = SERVER_PLUGIN_PATH;
exports.SUGAR_REG = SUGAR_REG;
exports.USERPROFILE = USERPROFILE;
exports.YylHander = YylHander;
exports.hideProtocol = hideProtocol;
exports.sugarReplace = sugarReplace;
