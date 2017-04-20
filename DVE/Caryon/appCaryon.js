/**
 * Created by nullice on 2017/4/1.
 */

var path = require("path")
var fs = require("fs")

var AppCaryon = function ()
{
    return this;
}


/**
 * 启动用于监护 UI-DNA 的影子扩展（UI-DNA-Shadow）
 * UI-DNA-Shadow 会在 Photoshop 启动时启动
 */
AppCaryon.prototype.start_UI_DNA_Shadow = function ()
{
    cs.requestOpenExtension("UI-DNA-Shadow")
}


AppCaryon.prototype.restar_UI_DNA = function ()
{
    setSystem.saveAppState(true)
    eventCaryon.sampleEventSend("UI-DNA-Shadow:restart")
    cs.closeExtension()
}

AppCaryon.prototype.restarCold_UI_DNA = function ()
{
    eventCaryon.sampleEventSend("UI-DNA-Shadow:restart")
    cs.closeExtension()
}


AppCaryon.prototype.openUrl = function (url)
{
    cs.openURLInDefaultBrowser(url)
}


/**
 * 第一次安装时解压额外资源 zip 包到用户目录
 * @param url
 */
AppCaryon.prototype.unzipInstallExtra = function ()
{

    //todo:现在使用的支持中文 zip 文件名的 TextDecoder 方法在旧版 ps 中不支持，计划换成 decompress-zip
    try
    {

        if (window.TextDecoder == undefined)
        {
            return;
        }

        var zipPath = path.join(setSystem._path_extensionDir, "EXTRA/install.zip")
        if (fs.existsSync(zipPath))
        {
            var adm_zip = new AdmZip(zipPath)
            adm_zip.extractAllTo(setSystem._path_userDataDir, true)

        } else
        {
            console.log("unzipInstallExtra", "install.zip not exist", zipPath)
        }

    } catch (e)
    {
        console.error(e)
    }

}

export default AppCaryon;
