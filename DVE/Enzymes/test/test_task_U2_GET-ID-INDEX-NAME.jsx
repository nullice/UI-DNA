/**
 * Created by bgllj on 2016/7/13.
 */
$.evalFile(File($.fileName).path + "/test.jsx");

//用 2 个有多个图层的文档进行测试，一个文档有背景图层，一个文档没有背景图层。

task_getItemIndexBylayerID();
task_getTargetLayersID()
selctLayer_byItemIndex()
task_selctMultLayers_byItemIndex()
// task --------


function task_getItemIndexBylayerID()
{
    var arr = ki.layer.getAllLayersItemIndex();

    log("测试 getLayerIdByItemIndex()、getLayerIdByItemIndex()、getLayerName_byID()、getLayerName_byItemIndex() ")
    log("测试图层数：" + arr.length)
    log("================")
    var err = 0;
    var time = 0;


    for (var i = 0; i < arr.length; i++)
    {

        var id = ki.layer.getLayerIdByItemIndex(arr[i])
        var index = ki.layer.getItemIndexBylayerID(id);

        if (index != arr[i])
        {
            log("err: " + "getItemIndexBylayerID(" + id + ")->" + index + " != index:" + arr[i]);
            err++;
        }

        var name_from_id = ki.layer.getLayerName_byID(id);
        var name_from_index = ki.layer.getLayerName_byItemIndex(index);
        if (name_from_id != name_from_index)
        {
            log("err: " + "name_from_id:" + name_from_id + " != name_from_index:" + name_from_index);
            err++;
        }
        else
        {
            log("index: " + index + " ,id: " + id + " ,name:" + name_from_id);
        }
        time++;
    }

    log("实际测试数：" + time + ", 错误：" + err)
    log("END================")
}


function task_getTargetLayersID()
{
    var arr_ID = ki.layer.getTargetLayersID();
    var arr_Index = ki.layer.getTargetLayersItemIndex();


    log("测试 getTargetLayersID()、 getTargetLayersItemIndex()")
    log("getTargetLayersID() -> " + arr_ID);
    log("getTargetLayersItemIndex() -> " + arr_Index);
    if (arr_ID.length != arr_Index.length)
    {
        log("(err : arr_ID.length != arr_Index.length")
        log("END================")
        return;
    }
    log("测试图层数：" + arr_ID.length)
    log("================")
    var err = 0;
    var time = 0;

    for (var i = 0; i < arr_ID.length; i++)
    {

        var id = ki.layer.getLayerIdByItemIndex(arr_Index[i])
        var index = ki.layer.getItemIndexBylayerID(arr_ID[i]);

        if (index != arr_Index[i])
        {
            log("err: " + "getItemIndexBylayerID(" + id + ")->" + index + " != index:" + arr_Index[i]);
            err++;
        }

        var name_from_id = ki.layer.getLayerName_byID(id);
        var name_from_index = ki.layer.getLayerName_byItemIndex(index);
        if (name_from_id != name_from_index)
        {
            log("err: " + "name_from_id:" + name_from_id + " != name_from_index:" + name_from_index);
            err++;
        }
        else
        {
            log("index: " + index + " ,id: " + id + " ,name:" + name_from_id);
        }
        time++;
    }

    log("实际测试数：" + time + ", 错误：" + err)
    log("END================")
}

function selctLayer_byItemIndex()
{
    log("测试 selectLayer_byItemIndex() ,selectLayer_byID()")
    var err = 0;
    var time = 0;

    var arr = ki.layer.getAllLayersItemIndex();
    log("测试图层数：" + arr.length + "(x2 次)")
    log("================")
    for (var i = 0; i < arr.length; i++)
    {
        ki.layer.selectLayer_byItemIndex(arr[i]);
        var index = ki.layer.getTargetLayersItemIndex()[0];
        if (index != arr[i])
        {
            log("err: selectLayer_byItemIndex" + arr[i] + ")");
            err++;
        }

        time++;
    }

    for (var i = 0; i < arr.length; i++)
    {
        ki.layer.selectLayer_byID(ki.layer.getLayerIdByItemIndex(arr[i]));
        var id = ki.layer.getTargetLayersID()[0];
        if (id != ki.layer.getLayerIdByItemIndex(arr[i]))
        {
            log("err: selectLayer_byID" + ki.layer.getLayerIdByItemIndex(arr[i]) + ")");
            err++;
        }

        time++;
    }


    log("实际测试数：" + time + ", 错误：" + err)
    log("END================")

}

function task_selctMultLayers_byItemIndex()
{
    log("测试 selectMultLayers_byItemIndex")
    var err = 0;
    var time = 0;

    var arr = ki.layer.getAllLayersItemIndex();
    log("================")
    log("arr" + arr)
    ki.layer.selectMultLayers_byItemIndex(arr);
    ki.layer.selectLayer_byItemIndex(arr[0]);
    arr = ki.layer.itemIndexArray_ToLayerIdArray(arr);
    ki.layer.selectMultLayers_byID(arr,true);
    ki.layer.selectMultLayers_byID([arr[0],arr[2]],true);

    var indexs = ki.layer.getTargetLayersItemIndex();
    ki.layer.selectMultLayers_byItemIndex(indexs,true);
    var ids = ki.layer.getTargetLayersID();
    ki.layer.selectMultLayers_byID(ids,true);


}
