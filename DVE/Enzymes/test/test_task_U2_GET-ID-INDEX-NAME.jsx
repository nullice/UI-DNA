/**
 * Created by bgllj on 2016/7/13.
 */
$.evalFile(File($.fileName).path + "/test.jsx");


task_getItemIndexBylayerID();


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
            log("err: " + "getItemIndexBylayerID(" + id + ")->" + index + " != index:" + arr[i])
        }

        var name_from_id = ki.layer.getLayerName_byID(id);
        var name_from_index = ki.layer.getLayerName_byItemIndex(index);
        if (name_from_id != name_from_index)
        {
            log("err: " + "name_from_id:" + name_from_id + " != name_from_index:" + name_from_index)
        }
        else
        {
            log("index: " + index + " ,id: " + id + " ,name:"+name_from_id);
        }
        time++;
    }

    log("实际测试数：" + time + ", 错误：" + err)
    log("END================")


}