/**
 * Created by bgllj on 2016/9/18.
 */

var fs = require("fs")
var path = require("path")

var __saveJson
console.info("[module] - settingCaryon.js")
var SetSystem = function ()
{
    //定义设置项

    this._svaeJson = "";

    this.ui = {
        language: null,
        panel: {
            main: {
                settingPanel: false,
                tagsActive: {
                    position: true,
                    shape: false,
                    text: false,
                    smartobject: false,
                    style: false,
                    more: false,
                },
                nameGroupTitle: {
                    "0": "0",
                    "1": "1",
                    "2": "2",
                    "3": "3",
                    "4": "4",
                    "5": "5",
                    "6": "6",
                    "7": "7",
                    "8": "8",
                    "9": "9",
                }
            },
            att: {
                nowFreshen: false,
            }
        },
        hostTheme: {
            syncColor: false,
            syncTheme: false,
            themeCss1: null, /*最亮*/
            themeCss2: null, /**/
            themeCss3: null, /**/
            themeCss4: null, /*最暗*/

        },
        quick: {
            shape_radius: "",
            shape_enable_curnerEditor: false,
            shape_use_svgo: true
        },
    }

    this.gob = {
        $anchor: 0,
    }


    this.inset = {
        able_saveDoc: false, /*保存uidna属性同时保存文档*/
        selectMax: 6, /*最大选中图层数，大于这个数，选中图层时 Gob 将不从实际图层拉取数据而是仅显示“多值”*/
    }

    this.autoRender = false;
    this.init();

    var self = this
    setTimeout(function ()
    {
        self.timerForSave()
    }, 1500)

    return this;

}


SetSystem.prototype.timerForSave = function ()
{
    var self = this;
    this.save(true)

    setTimeout(function ()
    {
        self.timerForSave()
    }, 15000)
}

/**
 * 初始化设置系统配置
 */
SetSystem.prototype.init = function ()
{
    //目录初始化

    var uidnaInfo = ARR.getByKey(cs.getExtensions(), "id", cs.getExtensionID())
    this._path_extensionDir = uidnaInfo.basePath;

    this._userDataDir = "";
    var seriesDir = path.join(cs.getSystemPath(SystemPath.USER_DATA), "nullice.designEnzyme")
    _checkDir(seriesDir);

    var appDir = path.join(seriesDir, "UI-DNA")
    _checkDir(appDir);
    this._path_appDir = appDir;

    var logDir = path.join(appDir, "log")
    _checkDir(logDir);
    this._path_logDir = logDir;

    var userDataDir = path.join(appDir, "UserData")
    _checkDir(userDataDir);
    this._path_userDataDir = userDataDir;

    var languageDir = path.join(appDir, "language")
    _checkDir(languageDir);
    this._path_languageDir = languageDir;


    var autoUpdateDir = path.join(appDir, "AutoUpdate")
    _checkDir(autoUpdateDir);
    this._path_autoUpdateDir = autoUpdateDir;

    var extraDir = path.join(userDataDir, "Extra")
    _checkDir(extraDir);
    this._path_userDataDir_extraDir = extraDir;

    var extraCssDir = path.join(extraDir, "CSS")
    _checkDir(extraCssDir);
    this._path_userDataDir_extraCssDir = extraCssDir;

    var extraJsDir = path.join(extraDir, "JavaScript")
    _checkDir(extraJsDir);
    this._path_userDataDir_extraJsDir = extraJsDir;

    var userTempDir = path.join(appDir, "temp")
    _checkDir(userTempDir);
    this._path_userTempDir = userTempDir;

    var userExDir = path.join(appDir, "Capsules")
    _checkDir(userExDir);
    this._path_userExDir = userExDir;

    logger.pin("setting", "settingCaryon.js:SetSystem.prototype.init",
        "初始化目录", {
            "extensionDir": this._path_extensionDir,
            "seriesDir": seriesDir,
            "appDir": appDir,
            "userDataDir": userDataDir
        })


    //END ----------------------------

    function _checkDir(dir)
    {
        if (fs.existsSync(dir) == false)
        {
            fs.mkdirSync(dir)
        }
        if (fs.existsSync(dir) == false)
        {
            logger.err("mkdirSync() failed.", "settingCaryon.js:SetSystem.prototype.init _checkDir", {"dir": dir})
        }

    }


}


SetSystem.prototype.save = function (checkChange)
{

    this.vcc = this.getVueColorCylinderMenu()// VueColorCylinder 设置

    var obJson = JSON.stringify(this, null, 4)

    if (checkChange)
    {
        if (__saveJson == obJson)
        {
            // console.log("SetSystem..save() checkChange:未更改")
            return
        }
    }

    __saveJson = obJson
    var filePath = path.join(this._path_userDataDir, "setting.json")
    console.log("[设置保存.]", filePath)
    fs.writeFileSync(filePath, obJson)
}


SetSystem.prototype.load = function ()
{
    try
    {
        var filePath = path.join(this._path_userDataDir, "setting.json")
        if (fs.existsSync(filePath))
        {
            var data = fs.readFileSync(filePath)
            if (data != undefined)
            {
                var ob = JSON.parse(data)
                if (typeof  ob === "object")
                {
                    OBJ.objectCopyToObject(ob, this)
                    console.log("[设置载入.]", filePath)
                    if (this.vcc != undefined)
                    {
                        this.setVueColorCylinderMenu(this.vcc) // VueColorCylinder 设置
                    }else
                    {
                        console.log("[设置载入 vcc 无效]", this)
                    }

                }else{
                    console.log("[设置载入无效.]", filePath)
                }
            }
        }
    }
    catch (e)
    {
        console.error("[设置载入失败]SetSystem.prototype.load",e)
    }
}


SetSystem.prototype.saveAppState = function (useonce)
{
    //0.保存设置
    this.save()

    var appState = {
        vars: varSystem.vars,
        dataCaryon: dataCaryon,
        useonce: useonce,
        ui: {
            lastWidth: document.documentElement.clientWidth,
            lastHeight: document.documentElement.clientHeight
        }
    }

    var obJson = JSON.stringify(appState, null, 4)
    fs.writeFileSync(path.join(this._path_userDataDir, "appState.json"), obJson)
}


SetSystem.prototype.loadAppState = function ()
{
    try
    {
        if (fs.existsSync(path.join(this._path_userDataDir, "appState.json")))
        {
            var data = fs.readFileSync(path.join(this._path_userDataDir, "appState.json"))
            if (data != undefined)
            {
                this.load()
                var ob = JSON.parse(data)
                if (typeof  ob === "object")
                {
                    console.log("loadAppState", ob)
                    OBJ.objectCopyToObject(ob.dataCaryon, dataCaryon)
                    varSystem.loadVarsFromObject(ob.vars)
                    console.log(`cs.resizeContent(${ob.ui.lastWidth}, ${ob.ui.lastHeight})`, cs.resizeContent(ob.ui.lastWidth, ob.ui.lastHeight))
                    cs.resizeContent(ob.ui.lastWidth, ob.ui.lastHeight)
                    if (ob.useonce)
                    {
                        fs.unlinkSync(path.join(this._path_userDataDir, "appState.json"))
                    }
                }
            }
        }
    } catch (e)
    {
        console.error(e)
    }

}


SetSystem.prototype._getVueColorCylinderMenu = "none"
SetSystem.prototype._setVueColorCylinderMenu = "none"


SetSystem.prototype.getVueColorCylinderMenu = function ()
{
    if (this._getVueColorCylinderMenu !== "none")
    {
        return this._getVueColorCylinderMenu()
    }
}
SetSystem.prototype.setVueColorCylinderMenu = function (vCCsetting)
{
    if (this._setVueColorCylinderMenu !== "none")
    {
        this._setVueColorCylinderMenu(vCCsetting)
    }
}


function fileUrl(str)
{
    var pathName = path.resolve(str).replace(/\\/g, '/');
    if (pathName[0] !== '/')
    {
        pathName = '/' + pathName;
    }
    return encodeURI('file://' + pathName);
};


SetSystem.prototype.loadUserCss = function ()
{
    this._path_userDataDir_extraCssDir
    var csss = fs.readdirSync(setSystem._path_userDataDir_extraCssDir)
    var htmlBox = document.querySelector("#user-css-box")
    for (var i = 0; i < csss.length; i++)
    {

        var link = document.createElement("link")
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("type", "text/css")
        link.setAttribute("href", fileUrl(path.join(setSystem._path_userDataDir_extraCssDir, csss[i])))
        htmlBox.appendChild(link)

    }
}

SetSystem.prototype.loadUserJs = function ()
{
    this._path_userDataDir_extraJsDir
    var jss = fs.readdirSync(setSystem._path_userDataDir_extraJsDir)
    var htmlBox = document.querySelector("#user-js-box")
    for (var i = 0; i < jss.length; i++)
    {
        var scriptElemnt = document.createElement("script")
        scriptElemnt.type = "text/javascript";
        scriptElemnt.async = true;
        scriptElemnt.setAttribute('src', fileUrl(path.join(setSystem._path_userDataDir_extraJsDir, jss[i])));
        htmlBox.appendChild(scriptElemnt)

    }
}


SetSystem.prototype.loadLanguage = function ()
{
    this._path_languageDir
    var langJsons = fs.readdirSync(setSystem._path_languageDir)
    for (var i = 0; i < langJsons.length; i++)
    {
        try
        {
            var data = fs.readFileSync(path.join(this._path_languageDir, langJsons[i]))
            if (data != undefined)
            {
                var ob = JSON.parse(data)
                if (typeof  ob === "object")
                {
                    if (ob.languageName != undefined)
                    {
                        Lang["LANG_" + ob.languageName] = ob.languageMap;
                    }
                }
            }
        } catch (e)
        {
            console.error(e)
        }
    }
}

SetSystem.prototype.outDebugLanguageJson = function ()
{

    var ob = {
        languageName: 'Debug',
        languageMap: Lang.LANG_DEBUG
    }
    var obJson = JSON.stringify(ob, null, 4)
    fs.writeFileSync(path.join(this._path_languageDir, "Debug.language.json"), obJson)


}


//---------------------------

export default SetSystem;
