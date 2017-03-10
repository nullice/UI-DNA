/**
 * Created by bgllj on 2016/9/18.
 */

var fs = require("fs")
var path = require("path")



var SetSystem = function ()
{
    //定义设置项

    this.ui = {
        panel:{
            main:{
                tagsActive:{
                    position:true,
                    shape:false,
                    text:false,
                    smartobject:false,
                    style:false,
                    more:false,
                },
                nameGroupTitle:{
                    "0":"0",
                    "1":"1",
                    "2":"2",
                    "3":"3",
                    "4":"4",
                    "5":"5",
                    "6":"6",
                    "7":"7",
                    "8":"8",
                    "9":"9",

                }
            }
        },
        quick:{
            shape_radius:"",
            shape_enable_curnerEditor:false,
            shape_use_svgo:true

        }

    }
    this.inset={
        selectMax:6,/*最大选中图层数，大于这个数，选中图层时 Gob 将不从实际图层拉取数据而是仅显示“多值”*/
    }

    this.autoRender = false;
    this.init();
    return this;

}


/**
 * 初始化设置系统配置
 */
SetSystem.prototype.init = function ()
{

    //目录初始化
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

    var userTempDir = path.join(appDir, "temp")
    _checkDir(userTempDir);
    this._path_userTempDir = userTempDir;

    var userExDir = path.join(appDir, "Capsules")
    _checkDir(userExDir);
    this._path_userExDir = userExDir;


    logger.pin("setting", "settingCaryon.js:SetSystem.prototype.init",
       "初始化目录", {"seriesDir": seriesDir, "appDir": appDir, "userDataDir": userDataDir})


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


//---------------------------

export default SetSystem;