/**
 * Created by bgllj on 2017/3/9.
 */


/**
 * 派生 矩阵
 * {
 *      col:3, //列数
 *      row:2, //行数
 *      dX:50, //x 间距
 *      dX:50, //y 间距
 *      rename:0,1,2//0:photoshop 默认 1: “xx-1” ~"xx-99"‘；2："xx-1-1"~ "xx-2-4"
 * }
 * @param infoObjec
 * @param envObject
 * @returns {number}
 */
Libs.quick_derive_matrix = function (infoObjec, envObject)
{

    if (infoObjec == undefined)
    {
        return;
    }

    var col = 1;
    var row = 1;


    if (infoObjec.col != undefined && infoObjec.col > 0)
    {
        col = infoObjec.col;
    }

    if (infoObjec.row != undefined && infoObjec.row > 0)
    {
        row = infoObjec.row;
    }

    var len = row * col


    var ids = Kinase.layer.getTargetLayersID()
    if (ids == undefined || ids.length === 0)
    {
        return 0;
    } else if (ids.length == 1)
    {
        var bounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)
        var orgX = bounds.w
        var orgY = bounds.h


    } else
    {
        var bounds = Kinase.layer.getLayersRange(ids)
        var orgX = bounds.w
        var orgY = bounds.h
    }


    function _func()
    {
        if (infoObjec.rename != undefined && infoObjec.rename > 0)
        {
            var orgName = Kinase.layer.getLayerName_byActive()

            if (infoObjec.rename === 1)
            {
                Kinase.layer.setLayerName_byActive(orgName + " -1" )
            } else if(infoObjec.rename === 2)
            {
                Kinase.layer.setLayerName_byActive(orgName + " -1-1")
            }

        }

        var offset = {x: infoObjec.dX + orgX, y: 0}
        var time = 0
        for (var r = 0; r < row; r++)
        {
            for (var c = 0; c < col; c++)
            {
                time++;
                if (r == 0 && c == 0)
                {
                    continue;
                }

                if (c > 0)
                {
                    var offset = {x: infoObjec.dX + orgX, y: 0}
                }
                Kinase.layer.copyLayer_byActive()
                Kinase.layer.moveLayerXY(Kinase.REF_ActiveLayer, null, offset)
                if (infoObjec.rename != undefined && infoObjec.rename === 1)
                {
                    Kinase.layer.setLayerName_byActive(orgName + " -" + time)
                } else if(infoObjec.rename != undefined && infoObjec.rename === 2)
                {
                    Kinase.layer.setLayerName_byActive(orgName + " -" + (r+1) + "-" + (c+1))
                }

            }
            // $.writeln("r::::" + -(infoObjec.dX * (col - 1))+","+infoObjec.dY)
            // $.writeln("r::::" + -(infoObjec.dX * (col - 1))+","+infoObjec.dY)
            var offset = {x: -((infoObjec.dX + orgX) * (col - 1 )), y: infoObjec.dY + orgY}

        }

    }

    Proteins.doCon(_func, " 派生阵列", false)
    return 0
}













