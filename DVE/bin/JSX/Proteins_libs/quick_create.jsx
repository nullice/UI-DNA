/**
 * Created by bgllj on 2017/3/16.
 */
(function ()
{

    /**
     * 以现有图层为蒙版创建链接对象
     * {
     *      images:[], //图片文件地址数组
     *      maskType:"CM","CM",//蒙版类型，"CM"：剪贴蒙版，
     *      linkLayer:true,//链接图层
     *
     *
     * }
     * @param infoObjec
     * @param envObject
     */
    Libs.quick_create_smartlink_fromShape = function (infoObjec, envObject)
    {
        if (infoObjec["images"] == undefined)
        {
            return
        }

        function _func()
        {
            var imagesPool = infoObjec["images"]
            var ids = Kinase.layer.getTargetLayersID()
            if (ids == undefined)
            {
                return 0
            }
            else if (ids.length > 1)
            {
                for (var i = 0; i < ids.length; i++)
                {
                    createOnce(ids[i], i)
                }
            } else
            {
                createOnce(ids[0], 0)
            }


            function createOnce(id, i)
            {
                Kinase.layer.selectLayer_byID(id)
                Kinase.layer.copyLayer_byActive()
                Kinase.layer.setLayerToSmart_ByActive()
                Kinase.layer.setLayerSmartInfo_ByActive({linked: true, link: imagesPool[i]})


                if (infoObjec["maskType"] == "CM") {
                    Kinase.layer.createCMask_byActive()
                    Kinase.layer.selectMultLayers_byID([id])

                }
            }


        }

        Proteins.doCon(_func, "从现有图层创建链接对象", true)
    }


    // Libs.quick_text_textTableToCsvArr= function (infoObjec, envObject)
    // {
    //
    //     if(infoObjec["textTable"] == undefined)
    //     {
    //         return
    //     }
    //
    //
    //     var textTable = infoObjec["textTable"]
    //     var csvArr  =[]
    //     for (var r = 0; r < textTable.length; r++)
    //     {
    //         var row = []
    //         for (var c = 0; c < textTable[r].length; c++)
    //         {
    //             var text = ""
    //             if (textTable[r][c].text != undefined )
    //             {
    //                 text = textTable[r][c].text
    //             }
    //             row.push(text)
    //         }
    //         csvArr.push(row)
    //     }
    //
    //     return csvArr
    // }


})()






