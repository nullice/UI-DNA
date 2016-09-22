/**
 * Created by bgllj on 2016/9/20.
 */

async function task_Enzymes()
{

    var id = []

    var NUM = 3;
    for (var i = 0; i < NUM; i++)
    {
        id[i] = await enzymes.createLayer("await - 新建图层" + i)
        test.seeVelue(await enzymes.getLayerName_byID(id[i]), "await - 新建图层" + (i), `enzymes.createLayer("await - 新建图层${(i)}")`)
    }


    await  enzymes.selectLoad(id);
    var getIds =  await enzymes.getSelectLayerArray("id");

    test.seeVelue(getIds, id, "getSelectLayerArray('id')");


    //
    // for (var i = 0; i < NUM; i++)
    // {
    //     test.seeVelue(await enzymes.getLayerName_byID(id), "await - 新建图层" + i, `enzymes.createLayer("await - 新建图层${i}")`)
    // }


    test.report();


    // console.log(await enzymes.getAllLayerArray("id"))
    // console.log(await enzymes.getAllLayerArray("itemIndex"))
    // console.log(await enzymes.getAllLayerArray("name"))
    // console.log(await enzymes.getAllLayerArray())
    // console.log(JSON.stringify(await enzymes.checkLayerExist(3, "id")))
    // console.log(JSON.stringify(await enzymes.checkLayerExist("await - 新建图层2", "name", true)))
    // console.log(JSON.stringify(await enzymes.checkLayerExist("await - 新建图层2", "name")))


    var re = await enzymes.checkLayerExist("__UI-DNA__", "name");
    if (re.exist == false)
    {

    }
}


//-----------------------------------------------------
export default task_Enzymes;