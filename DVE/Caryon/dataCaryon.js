/**
 * Created by bgllj on 2016/9/7.
 */



var DataCaryon = function ()
{

    this.layers = [DataCaryon.prototype.layerSample];
    
    this.selectLayers=[];
    
    return this;
}





DataCaryon.prototype.layerSample={
    name:"图层名",
    id:2,
    index:1,
    position:{x:0, y:0, w:0, h:0 ,assignment:{}},



}

//---------------

export default DataCaryon;
