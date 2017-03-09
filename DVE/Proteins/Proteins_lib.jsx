/**
 * Created by bgllj on 2017/3/7.
 */
Proteins = {

    envObject: {},

    exec: function (funcName, parameObject)
    {
        // $.writeln(funcName)
        // $.writeln(Libs[funcName] != undefined)
        // $.writeln(typeof  Libs[funcName])

        if (Libs[funcName] != undefined)
        {
            if (typeof  Libs[funcName] == "function")
            {
                var result = Libs[funcName](parameObject, Proteins.envObject)
            }

        }

        if (result != undefined)
        {
            return JSON.stringify(result);
        } else
        {
            return JSON.stringify({err: "Proteins.exec( " + funcName + " )"});
        }

    },
    /*执行 jsx 脚本文件*/
    evalJsxFile: function (path)
    {
        try
        {
            $.evalFile(path);
        } catch (e)
        {
            return JSON.stringify({err: "Proteins.evalJsxFile( " + path + " )： " + e});
        }
    },
    /*执行一个目录下所有 jsx 脚本文件*/
    evalJsxFolder: function (jsxFolderPath)
    {
        var folder = new Folder(jsxFolderPath);
        var result = [];
        $.writeln(folder.exists)
        if (folder.exists)
        {
            var jsxs = folder.getFiles("*.jsx");
            for (var i = 0; i < jsxs.length; i++)
            {
                var jsxFile = jsxs[i];

                var re = Proteins.evalJsxFile(jsxFile)
                if (re != undefined)
                {
                    result.push();
                }

            }
        }
        return JSON.stringify(result);
    },

    /**
     * 函数执行控制。为执行函数指定历史记录名称，并可选是否保持图层选中
     * @param _func 要执行的函数
     * @param historyName
     * @param holdLayerSelect 保持图层选中，动作执行后选中执行前的图层
     */
    doCon: function (func, historyName, holdLayerSelect)
    {

        if (holdLayerSelect)
        {
            var selectSave = ki.layer.selectSave();
            app.activeDocument.suspendHistory(historyName, "func()");
            ki.layer.selectLoad(selectSave);
        } else
        {
            app.activeDocument.suspendHistory(historyName, "func()");
        }

    },
    firstFontPostScriptName: null,


}
/*获取首选字体：优先级： 微软雅黑，冬青黑，思源黑体*/
Proteins.firstFontPostScriptName =  Kinase.app.getFontPostScriptName_byFontPostScriptName(["MicrosoftYaHei", "SourceHanSansCN-Normal", "HiraginoSansGB-W3"])

//环境参数对象内容：
// envObject=({
//     USER_DATA: cs.getSystemPath(SystemPath.USER_DATA) , /*用户数据文件夹 如 C:/Users/语冰/AppData/Roaming*/
//     COMMON_FILES: cs.getSystemPath(SystemPath.COMMON_FILES) , /*	系统公共库文件夹*/
//     HOST_APPLICATION: cs.getSystemPath(SystemPath.HOST_APPLICATION),/* Photoshop.exe 的位置*/
//     EXTENSION:cs.getSystemPath(SystemPath.EXTENSION),/*扩展所在路径*/
//     TEMP:os.tmpdir(),/*系统临时文件夹*/
//     _path_userDataDir: setSystem._path_userDataDir, /*UI-DNA 用户数据文件夹 如 C:\Users\nullice\AppData\Roaming\nullice.designEnzyme\UI-DNA\UserData*/
//     _path_userTempDir: setSystem._path_userTempDir,/*UI-DNA 用户临时文件夹 如 C:\Users\nullice\AppData\Roaming\nullice.designEnzyme\UI-DNA\temp*/
//
// });


/*功能库*/
Libs = {}