/**
 * Created by bgllj on 2016/9/18.
 */


var SetSystem = function (settingFile)
{
    var settingFile = settingFile

    this.attArea = {};
    this.attArea.tagsActive = {};
    this.attArea.tagsActive.position = true;
    this.attArea.tagsActive.shape = false;
    this.attArea.tagsActive.text= false;

    this.autoRender = false;


    return this;
}








//---------------------------

export default SetSystem;