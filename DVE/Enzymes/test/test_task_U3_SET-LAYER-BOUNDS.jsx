/**
 * Created by bgllj on 2016/7/13.
 */
$.evalFile(File($.fileName).path + "/test.jsx");

//用 2 个有多个图层的文档进行测试，一个文档有背景图层，一个文档没有背景图层。

task_setLayerBounds()
// task --------


function task_setLayerBounds()
{
    var itemIndexlist = ki.layer.getAllLayersItemIndex();

    log("测试setLayerBounds() ")
    log("================")
    var err = 0;
    var time = 0;


    log("实际测试数：" + time + ", 错误：" + err)
    log("END================")
}


