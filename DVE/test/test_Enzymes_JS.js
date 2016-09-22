/**
 * Created by bgllj on 2016/9/20.
 */

async function test_task_Enzymes()
{
    var id = 0
    id = await enzymes.createLayer("await - 新建图层1")
    test.seeVelue(await enzymes.getLayerName_byID(id), "await - 新建图层1", 'enzymes.createLayer("await - 新建图层1")')

    id = await enzymes.createLayer("await - 新建图层2")
    test.seeVelue(await enzymes.getLayerName_byID(id), "await - 新建图层2", 'enzymes.createLayer("await - 新建图层2")')

    id = await enzymes.createLayer("await - 新建图层3")
    test.seeVelue(await enzymes.getLayerName_byID(id), "await - 新建图层3", 'enzymes.createLayer("await - 新建图层3")')


    test.report();


    console.log(await enzymes.getAllLayerArray("id"))
    console.log(await enzymes.getAllLayerArray("itemIndex"))
    console.log(await enzymes.getAllLayerArray("name"))
    console.log(await enzymes.getAllLayerArray())
    console.log(JSON.stringify(await enzymes.checkLayerExist(3, "id")))
    console.log(JSON.stringify(await enzymes.checkLayerExist("await - 新建图层2","name", true)))
    console.log(JSON.stringify(await enzymes.checkLayerExist("await - 新建图层2","name")))

    
    
   var re = await enzymes.checkLayerExist("__UI-DNA__","name");
    if(re.exist==true)
    {
        
    }
}


//-----------------------------------------------------
export default test_task_Enzymes;