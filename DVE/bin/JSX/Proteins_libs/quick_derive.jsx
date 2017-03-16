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

            if (+infoObjec.rename == 1)
            {
                Kinase.layer.setLayerName_byActive(orgName + " -1")
            } else if (+infoObjec.rename == 2)
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
                if (infoObjec.rename != undefined && +infoObjec.rename == 1)
                {
                    Kinase.layer.setLayerName_byActive(orgName + " -" + time)

                } else if (infoObjec.rename != undefined && +infoObjec.rename == 2)
                {
                    Kinase.layer.setLayerName_byActive(orgName + " -" + (r + 1) + "-" + (c + 1))
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


/**
 * 派生镜像
 * {
 * direction:0,//水平镜像，垂直镜像
 * }
 * @returns {number}
 */
Libs.quick_derive_mirror = function (infoObjec, envObject)
{
    function _func()
    {
        var ids = Kinase.layer.getTargetLayersID()
        if (ids == undefined || ids.length === 0)
        {
            return 0;
        } else if (ids.length == 1)
        {
            var bounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)
            var selectW = bounds.w
            var selectH = bounds.h


        } else
        {
            var bounds = Kinase.layer.getLayersRange(ids)
            var selectW = bounds.w
            var selectH = bounds.h
        }

        if (infoObjec.direction != undefined && (infoObjec.direction == 1))
        {//垂直
            var offset = {x: 0, y: selectH}

        } else
        {//水平
            var offset = {x: selectW, y: 0}
        }


        Kinase.layer.copyLayer_byActive()
        Kinase.layer.mirrorLayer_byActive(infoObjec.direction)
        Kinase.layer.moveLayerXY(Kinase.REF_ActiveLayer, null, offset)
    }

    Proteins.doCon(_func, "派生镜像", false)
    return 0

}


Libs.quick_derive_longShadow = function (infoObjec, envObject)
{

    var count = 0
    var notRezShape = false;//不栅格化
    if (infoObjec['notRezShape'])
    {
        notRezShape = true
    }
    var setOpacity = false;
    if (infoObjec['setOpacity'])
    {
        setOpacity = true
    }


    function _func()
    {
        var ids = Kinase.layer.getTargetLayersID()
        if (ids == undefined || ids.length != 1)
        {
            return 0
        }
        var orgItemIndex = Kinase.layer.getItemIndexBylayerID(ids[0])


        var len = infoObjec['length'] || 3;


        var offset = {x: 1, y: 1}
        offset = setOffsetByAngle(infoObjec.angle || 0, offset)

        $.writeln("offset: " + json(offset))
        var orgOffset = {
            x: offset.x,
            y: offset.y,
        }
        var stepLengt = 1

        if (infoObjec['stepByStep'])//逐步完成
        {
            doEvery()
        } else
        {
            doFastSample()
        }


        function doEvery()
        {
            var newIds = []
            for (var i = 0; i < len; i++)
            {
                var ids = stepOnce()
                for (var x in ids)
                {
                    newIds.push(ids[x])
                }
            }

            Kinase.layer.selectLoad(newIds)
            Kinase.layer.mergeLayer_byActive()
            if (notRezShape != true)
            {
                Kinase.layer.rasterizeLayer_byActive()
            }

        }

        function doFastSample()
        {
            if (len < 3)
            {
                doEvery();
                return 0;
            }

            var newQueueIds = []

            var id = stepQueue(3)
            newQueueIds.push(id)
            for (var i = 0; (count + stepLengt ) < len; i++)
            {
                id = stepQueue(3)
                newQueueIds.push(id)
            }

            offset.x = orgOffset.x * (len - count)
            offset.y = orgOffset.y * (len - count)
            stepLengt = (len - count)
            $.writeln(" -stepLengt:" + stepLengt)
            var ids = stepOnce()
            for (var x in ids)
            {
                newQueueIds.push(ids[x])
            }
            Kinase.layer.selectLoad(newQueueIds)
            Kinase.layer.mergeLayer_byActive()
            if (notRezShape != true)
            {
                Kinase.layer.rasterizeLayer_byActive()
            }

        }

        function setOffsetByAngle(angle, offset)
        {
            var des = EnzJSX._psShadow2CssShadow(angle, 1, 9, 9)
            $.writeln(" -des:" + json(des))

            offset.x = des.x;
            offset.y = des.y;
            return normalize(offset)

            function normalize(offset)
            {
                if (offset.x == 0)
                {
                    offset.x = 1;
                }
                var ratio = Math.abs(1 / offset.x);


                offset.x = offset.x < 0 ? -1 : 1;

                offset.y = offset.y * ratio


                return offset
            }

        }

        function stepOnce()
        {
            count += stepLengt;
            var ids = Kinase.layer.copyLayer_byActive()
            Kinase.layer.moveLayerXY(Kinase.REF_ActiveLayer, null, offset)
            Kinase.layer.moveActiveLayerOrder(orgItemIndex)
            if (notRezShape != true)
            {
                Kinase.layer.rasterizeLayer_byActive()
            }
            if (setOpacity == true)
            {
                var initOpacity = 100;
                if (infoObjec['initOpacity'] != undefined && infoObjec['initOpacity'] > 0)
                {
                    initOpacity = infoObjec['initOpacity'];
                }

                Kinase.layer.setAppearance_byActive({opacity: initOpacity * (1 - (count / len))})
            }

            return ids
        }


        function stepQueue(length)
        {
            var newIds = []
            for (var i = 0; i < ( length || 5); i++)
            {
                var ids = stepOnce()

                for (var x in ids)
                {
                    newIds.push(ids[x])
                }
            }

            Kinase.layer.selectLoad(newIds)
            Kinase.layer.mergeLayer_byActive()
            offset.x = offset.x * length;
            offset.y = offset.y * length
            stepLengt = stepLengt * length
            $.writeln(" -stepLengt:" + stepLengt)
            return Kinase.layer.getLayerIdByActive()
        }

        $.writeln("stepLengt:" + stepLengt)
    }


    Proteins.doCon(_func, "派生长阴影", false)

    return count
}





