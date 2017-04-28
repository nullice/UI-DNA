/**
 * Created by nullice on 2017/4/1.
 */

var path = require("path")
var fs = require("fs")
var nodeUrl = require("url")

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
    setTimeout(function ()
    {
        cs.closeExtension()
    }, 100)
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
        var zipPath = path.join(setSystem._path_extensionDir, "EXTRA/install.zip")
        if(window.AdmZip!=undefined)
        {

            if (fs.existsSync(zipPath))
            {
                var adm_zip = new AdmZip(zipPath)
                adm_zip.extractAllTo(setSystem._path_userDataDir, true)

            } else
            {
                console.log("unzipInstallExtra", "install.zip not exist", zipPath)
            }
        }else
        {
            setTimeout(function ()
            {
                console.info("[zip] START unzip",zipPath)
                var unzipper = new DecompressZip(zipPath)
                unzipper.on('extract', function (log) {
                    console.log('[zip]Finished extracting',zipPath);

                    window._QuickPanel_fillText_importFillDataFromFile()
                    window._QuickPanel_createSmartLink_importFillDataFromFile()
                });

                unzipper.extract({
                    path: setSystem._path_userDataDir,
                });
            },800)

        }


    } catch (e)
    {
        console.error(e)
    }

}

AppCaryon.prototype.startAutoUptate = async function (url, filename, jsxs, verIndex)
{

    try
    {
        // var fileName = "patch_main_V0@5_test.js"
        // var data = netCaryon.getOnce("http://nullice.coding.me/UI-DNA-CN/patch_main_V0%405_test.js",true)
        var fileName = filename
        var data = await netCaryon.getOnce(url, true)
        fs.writeFileSync(path.join(setSystem._path_autoUpdateDir, fileName), data)

        if (jsxs != undefined)
        {

            var downloadJson = await netCaryon.getOnce(jsxs, true)
            if (downloadJson.jsxs != undefined)
            {
                var aupJsxPath = path.join(setSystem._path_autoUpdateDir, "JSX_V0@" + verIndex)
                var jsxPath = path.join(aupJsxPath, "JSX")
                var proteins_libsPath = path.join(jsxPath, "Proteins_libs")
                try
                {

                    rmdirAllSync(aupJsxPath)
                } catch (e)
                {
                }

                fs.mkdirSync(aupJsxPath)
                fs.mkdirSync(jsxPath)
                fs.mkdirSync(proteins_libsPath)
                await  downloadList(downloadJson.jsxs, jsxPath)

                if (downloadJson.proteins != undefined)
                {
                    await  downloadList(downloadJson.proteins, proteins_libsPath)
                }
            }
        }

        this.deletOldAutoUptateFile(verIndex)
        return true

    } catch (e)
    {
        try
        {
            var aupJsxPath = path.join(setSystem._path_autoUpdateDir, "JSX_V0@" + verIndex)
            rmdirAllSync(aupJsxPath)
            fs.unlinkSync(path.join(setSystem._path_autoUpdateDir, fileName))

        } catch (e)
        {
        }


        console.error(e)
        return e
    }


    async function downloadList(urls, savePath)
    {
        for (var i = 0; i < urls.length; i++)
        {
            var urlOb = nodeUrl.parse(urls[i])
            var fileName = path.basename(urlOb.pathname)
            fileName = fileName.replace("%40", "@")

            console.info("[downloadList]", i, fileName, "url:", urls[i])
            var data = await netCaryon.getOnce(urls[i], true)

            if (TYP.type(data) == "object")
            {
                data = JSON.stringify(data)
            }
            fs.writeFileSync(path.join(savePath, fileName), data)
        }


    }
}


AppCaryon.prototype.deletOldAutoUptateFile = async function (verIndex)
{
    try
    {
        var aupJsxPath = path.join(setSystem._path_autoUpdateDir, "JSX_V0@" + (verIndex - 1))
        rmdirAllSync(aupJsxPath)


    } catch (e)
    {
        console.error(e)
    }


    try
    {
        var fileList = fs.readdirSync(setSystem._path_autoUpdateDir)
        var reg = /^patch_main_V0@[0-9]{0,4}/
        var reg_ver = /@[0-9]{0,4}/


        for (var i = 0; i < fileList.length; i++)
        {
            if (reg.test(fileList[i]))
            {
                var thisver = +(reg_ver.exec(fileList[i])[0].slice(1))
                if (thisver < verIndex)
                {
                    fs.unlinkSync(path.join(setSystem._path_autoUpdateDir, fileList[i]))

                }
            }
        }

    } catch (e)
    {
        console.error(e)
    }


}


var rmdirAllSync = (function ()
{
    function iterator(url, dirs)
    {
        var stat = fs.statSync(url);
        if (stat.isDirectory())
        {
            dirs.unshift(url);
            inner(url, dirs);
        } else if (stat.isFile())
        {
            fs.unlinkSync(url);
        }
    }

    function inner(path, dirs)
    {
        var arr = fs.readdirSync(path);
        for (var i = 0, el; el = arr[i++];)
        {
            iterator(path + "/" + el, dirs);
        }
    }

    return function (dir, cb)
    {
        cb = cb || function () {};
        var dirs = [];

        try
        {
            iterator(dir, dirs);
            for (var i = 0, el; el = dirs[i++];)
            {
                fs.rmdirSync(el);
            }
            cb()
        } catch (e)
        {
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }
})();


export default AppCaryon;
