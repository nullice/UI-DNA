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
                }
            }
        }
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

    var userDataDir = path.join(appDir, "UserData")
    _checkDir(userDataDir);
    this._path_userDataDir = userDataDir;

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