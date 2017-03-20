/**
 * Created by bgllj on 2017/3/16.
 */
(function ()
{

    /**
     * 最小化文本框
     * @param infoObjec
     * @param envObject
     * @returns {number}
     */
    Libs.quick_text_minBounds = function (infoObjec, envObject)
    {


        function _func()
        {

            var ids = Kinase.layer.getTargetLayersID()
            if (ids == undefined)
            {
                return 0
            } else if (ids.length > 1)
            {
                for (var i = 0; i < ids.length; i++)
                {
                    minOnce(ids[i])
                }
            } else
            {
                minOnce(ids[0])
            }


            function minOnce(id)
            {

                var type = Kinase.layer.getLayerType(Kinase.REF_LayerID, id)

                if (type.typeName == "text")
                {
                    Kinase.layer.selectLayer_byID(id)
                    Kinase.layer.setLayerTextMinBounds_Quick(Kinase.REF_ActiveLayer, null)
                } else if (type.typeName == "layerSet")
                {
                    var child = Kinase.layer.getChildLayerID_byItemIndex(Kinase.layer.getItemIndexBylayerID(id))

                    if (child != undefined)
                    {
                        for (var z = 0; z < child.length; z++)
                        {
                            minOnce(child[z])
                        }
                    }

                }
            }

        }

        Proteins.doCon(_func, "文本框最小化", true)
        return 0
    }


    Libs.quick_text_calcTextTable = function (infoObjec, envObject)
    {
        var grid = Libs.quick_permute_calcLayersGrid("onlyTextLayer")
        var meterDxy = Libs.quick_permute_calcLayerMeterDxy(grid.RowColIds, grid.LayerPool)

        var textLayerTable = []

        var RowColIds = grid.RowColIds
        for (var r = 0; r < RowColIds.length; r++)
        {
            var row = []
            for (var c = 0; c < RowColIds[r].length; c++)
            {
                var id = RowColIds[r][c]
                var textInfo = Kinase.layer.getLayerTextInfo(Kinase.REF_LayerID, id)
                var text = ""
                if (textInfo != undefined && textInfo.text != undefined)
                {
                    text = textInfo.text
                }

                var textLayerCell = {
                    id: id,
                    text: text,
                    name: Kinase.layer.getLayerName_byID(id),
                }
                row.push(textLayerCell)
            }
            textLayerTable.push(row)
        }

        return textLayerTable
    }


    Libs.quick_text_textTableRender = function (infoObjec, envObject)
    {
        if (infoObjec["textTable"] == undefined)
        {
            return
        }

        function _func()
        {
            var textTable = infoObjec["textTable"]
            for (var r = 0; r < textTable.length; r++)
            {
                var row = []
                for (var c = 0; c < textTable[r].length; c++)
                {
                    var id = textTable[r][c].id
                    var text = ""
                    if (textTable[r][c].text != undefined)
                    {
                        text = textTable[r][c].text
                    }


                    var orgTextInfo = Kinase.layer.getLayerTextInfo(Kinase.REF_LayerID, id)
                    var orgText = ""
                    if (orgTextInfo != undefined && orgTextInfo.text != undefined)
                    {
                        orgText = orgTextInfo.text
                    }

                    if (text != orgText)
                    {
                        Kinase.layer.selectLayer_byID(id)
                        Kinase.layer.setLayerText_Quick(text, Kinase.REF_ActiveLayer, null)
                    }
                }
            }

        }

        Proteins.doCon(_func, "表格文本设置", true)
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






