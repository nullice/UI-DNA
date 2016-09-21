/**
 * Created by bgllj on 2016/9/20.
 */

async function test_task_Enzymes()
{
    var id=0
    id = await enzymes.createLayer("await - 新建图层1")
    test.seeVelue(await enzymes.getLayerName_byID(id) ,"await - 新建图层1", 'enzymes.createLayer("await - 新建图层1")')

    id = await enzymes.createLayer("await - 新建图层2")
    test.seeVelue(await enzymes.getLayerName_byID(id) ,"await - 新建图层2", 'enzymes.createLayer("await - 新建图层2")')

    id = await enzymes.createLayer("await - 新建图层3")
    test.seeVelue(await enzymes.getLayerName_byID(id) ,"await - 新建图层3", 'enzymes.createLayer("await - 新建图层3")')

    test.report();

    var arr =await enzymes.getAllLayerArray("id");
    console.log(arr)
    console.log("--------------")
    console.log(arr[0],arr[1])
}



//-----------------------------------------------------
export default test_task_Enzymes;