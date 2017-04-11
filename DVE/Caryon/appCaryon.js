/**
 * Created by nullice on 2017/4/1.
 */


var AppCaryon = function ()
{
    return this;
}


/**
 * 启动用于监护 UI-DNA 的影子扩展（UI-DNA-Shadow）
 * UI-DNA-Shadow 会在 Photoshop 启动时启动
 */
AppCaryon.prototype.start_UI_DNA_Shadow = function ()
{
    cs.requestOpenExtension("UI-DNA-Shadow")
}




AppCaryon.prototype.restar_UI_DNA = function ()
{
    setSystem.saveAppState()
    eventCaryon.sampleEventSend("UI-DNA-Shadow:restart")
    cs.closeExtension()
}

AppCaryon.prototype.restarCold_UI_DNA = function ()
{
    eventCaryon.sampleEventSend("UI-DNA-Shadow:restart")
    cs.closeExtension()
}




AppCaryon.prototype.openUrl = function (url)
{
    cs.openURLInDefaultBrowser(url)
}



export default AppCaryon;
