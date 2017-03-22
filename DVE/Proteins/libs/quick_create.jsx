/**
 * Created by bgllj on 2017/3/16.
 */
(function ()
{


    Libs.quick_create_smartlink_fromShape = function (infoObjec, envObject)
    {
        if (infoObjec["files"] == undefined)
        {
            return
        }

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
                    createOnce(ids[i])
                }
            } else
            {
                createOnce(ids[0])
            }



            function createOnce()
            {

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






