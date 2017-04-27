/**
 * Created by bgllj on 2017/3/7.
 */


// Proteins 蛋白质
//--------------------------
// By nullice ui@nullice.com
// nullice.com
// license: LGPL

var fs =require("fs")
var path = require("path")
var Proteins = {
    exec: async function (functionName, parameObject)
    {
        return new Promise(function (resolve, reject)
        {
            Gob.stopSelectEvent = true;
            renderCaryon.stopRenderPatch = true;
            var obJson = JSON.stringify(parameObject);
            var _jsxCode = `Proteins.exec('${functionName}',${obJson})`
            console.log(_jsxCode)
            evalScript(
                _jsxCode,
                (r) =>
                {
                    renderCaryon.stopRenderPatch = false;
                    Gob.stopSelectEvent = false;
                    resolve(JSON.parse(Proteins.jsxBackCheck(r, _jsxCode)))
                })
        })
    },

    /**
     * 执行 jsx 脚本文件
     * @param jsxFilePath
     * @returns {Promise}
     */
    evalJsxFile: async function (jsxFilePath)
    {

        return new Promise(function (resolve, reject)
        {

            var json = JSON.stringify(jsxFilePath)
            var _jsxCode = `Proteins.evalJsxFile(${json})`
            evalScript(
                _jsxCode,
                (r) => {resolve(JSON.parse(Proteins.jsxBackCheck(r, _jsxCode)))})
        })

    },

    /**
     * 载入并执行文件夹内的所有 jsx 脚本
     * @param jsxFolderPath
     * @returns {Promise}
     */
    evalJsxFolder: async function (jsxFolderPath)
    {

        return new Promise(function (resolve, reject)
        {
            var json = JSON.stringify(jsxFolderPath)
            var _jsxCode = `Proteins.evalJsxFolder(${json})`

            console.log("evalJsxFolder:", _jsxCode)
            evalScript(
                _jsxCode,
                (r) => {resolve(JSON.parse(Proteins.jsxBackCheck(r, _jsxCode)))})
        })

    },

    /*捕获错误*/
    jsxBackCheck: function (returnValue, jsxCode)
    {
        if (returnValue == "EvalScript error.")
        {
            console.error(returnValue);
            console.error(jsxCode)
            return ""
        }
        else
        {
            return returnValue
        }

    }

}

Proteins.init = async function ()
{
    var envJson = JSON.stringify({
        USER_DATA: cs.getSystemPath(SystemPath.USER_DATA), /*用户数据文件夹 如 C:/Users/语冰/AppData/Roaming*/
        COMMON_FILES: cs.getSystemPath(SystemPath.COMMON_FILES), /*	系统公共库文件夹*/
        HOST_APPLICATION: cs.getSystemPath(SystemPath.HOST_APPLICATION), /* Photoshop.exe 的位置*/
        EXTENSION: cs.getSystemPath(SystemPath.EXTENSION), /*扩展所在路径*/
        TEMP: os.tmpdir(), /*系统临时文件夹*/
        _path_userDataDir: setSystem._path_userDataDir, /*UI-DNA 用户数据文件夹 如 C:\Users\nullice\AppData\Roaming\nullice.designEnzyme\UI-DNA\UserData*/
        _path_userTempDir: setSystem._path_userTempDir, /*UI-DNA 用户临时文件夹 如 C:\Users\nullice\AppData\Roaming\nullice.designEnzyme\UI-DNA\temp*/

    });

    var _jsxCode = `Proteins.envObject = ${envJson}`
    evalScript(_jsxCode,)



    if (UIDNA._ON_AUTOUPDATA_)
    {
        var aupProteinsPath = path.join(setSystem._path_autoUpdateDir, "JSX_V0@" + UIDNA.verIndex+"/JSX/Proteins_libs")

        var readly = false;
        if (fs.existsSync(aupProteinsPath))
        {
            readly = true
            readly = readly & fs.existsSync(path.join(aupProteinsPath, "/quick_transform.jsx"))
            readly = readly & fs.existsSync(path.join(aupProteinsPath, "/quick_shape_distribution.jsx"))
        }

        if(readly)
        {
            var libsPath = aupProteinsPath.replace(/\\/g,"/")
        }else
        {
            var libsPath = path.join(cs.getSystemPath(SystemPath.EXTENSION), "JSX", "Proteins_libs")
        }

    } else
    {
        var libsPath = path.join(cs.getSystemPath(SystemPath.EXTENSION), "JSX", "Proteins_libs")
    }

    logger.pin("Proteins", "Proteins.int()", "载入脚本功能库文件夹:" + libsPath)
    var log = await  Proteins.evalJsxFolder(libsPath)
    console.log(log)
    return

}

export default Proteins;
