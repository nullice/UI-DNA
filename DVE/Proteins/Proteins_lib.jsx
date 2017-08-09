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


/*基础功能：*/



json =JSON.stringify




/**
 * 对象数组查找
 * 从对象数组中提取出一个对象，根据对象的一个属性值。
 * arr: [{name:a},{name:b}] getByKey(arr,"name","b") => return {name:b}
 * @param {[Object]} objectArr 对象数组
 * @param {String} key 关键属性
 * @param keyValue 欲提取的关键属性值
 * @param equalRule 值比较函数，可空
 * @returns {*}
 */
var getByKey = function (objectArr, key, keyValue, equalRule)
{
    for (var i = 0; i < objectArr.length; i++)
    {
        if (objectArr[i][key] != undefined)
        {
            if (equalRule != undefined)
            {
                if (equalRule(objectArr[i][key], keyValue))
                {
                    return objectArr[i]
                }

            } else
            {
                if (objectArr[i][key] == keyValue)
                {
                    return objectArr[i]
                }
            }
        }
    }

}


/**
 * id 按属性名排序
 * @param ids
 * @param propertyName
 * @param layerPool
 * @returns {Array}
 */
function sortIds(ids, propertyName, layerPool)
{

    var layerArr = idsTolayerArr(ids, layerPool)
    sortObjectArray(layerArr, propertyName, false)

    var rankIds_xy = []
    for (var i = 0; i < layerArr.length; i++)
    {
        rankIds_xy.push(layerArr[i].id)
    }

    return rankIds_xy
}


/**
 * 排序对象数组
 * @param arr 数组
 * @param key 对象排序的键值，如 [{a:12}, {a:33}] , key 为 "a" 则以 a 排序
 * @param bigFront 大值在前
 */
var sortObjectArray = function (arr, key, bigFront, isStr)
{
    if (arr != undefined && arr.sort != undefined)
    {

        return arr.sort(by(key));
    }

    function by(name)
    {
        return function (o, p)
        {
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p)
            {
                a = o[name];
                b = p[name];
                if (a === b)
                {
                    return 0;
                }
                if (typeof a === typeof b)
                {


                    if (bigFront)
                    {
                        if (isStr)
                        {
                            return a.localeCompare(b);
                        } else
                        {
                            return a > b ? -1 : 1;
                        }

                    } else
                    {
                        if (isStr)
                        {
                            return -a.localeCompare(b);
                        } else
                        {
                            return a < b ? -1 : 1;
                        }
                    }


                }
                return typeof a < typeof b ? -1 : 1;
            }
            else
            {
                throw ("error");
            }
        }
    }
}


/**
 * 差集。（不支持对象数组）
 * a:[1,2,3] b:[1,2,4]   a-b => [3]
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
var difference = function (a, b)
{
    var ob = {};
    for (var i = 0; i < a.length; i++)
    {
        ob[a[i]] = true;
    }

    for (var i = 0; i < b.length; i++)
    {
        if (ob[b[i]] != undefined)
        {
            ob[b[i]] = false;
        }
    }

    var arr = [];
    for (var x in ob)
    {
        if (ob[x] != false)
        {
            arr.push(x);
        }
    }
    return arr;
}


/**
 * 交集。（不支持对象数组）
 * a:[1,2,3] b:[1,2,4]   a∩b => [1,2]
 * @returns {Array}
 */
var intersection = function (a, b)
{
    var ob = {};
    for (var i = 0; i < a.length; i++)
    {
        ob[a[i]] = false;
    }

    for (var i = 0; i < b.length; i++)
    {
        if (ob[b[i]] != undefined)
        {
            ob[b[i]] = true;
        }
    }

    var arr = [];
    for (var x in ob)
    {
        if (ob[x] != false)
        {
            arr.push(x);
        }
    }
    return arr;
}





/**
 * ids 数组到 layerArr 数组
 * @param ids
 * @param layerPool
 * @returns {Array}
 */
function idsTolayerArr(ids, layerPool)
{

    var layerArr = []
    for (var i = 0; i < ids.length; i++)
    {

        layerArr.push(getByKey(layerPool, "id", ids[i]))
    }
    return layerArr
}


