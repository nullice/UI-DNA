/**
 * Created by bgllj on 2017/3/16.
 */
(function ()
{

    /**
     * 最小化文本框
     * @param infoObjec
     * @param envObject
     * @returns {number}
     */
    Libs.quick_text_minBounds = function (infoObjec, envObject)
    {


        function _func()
        {

            var ids = Kinase.layer.getTargetLayersID()
            if (ids == undefined)
            {
                return 0
            } else if (ids.length > 1)
            {
                for (var i = 0; i < ids.length; i++)
                {
                    Kinase.layer.selectLayer_byID(ids[i])
                    minOnce()
                }
            } else
            {
                minOnce()
            }



            function minOnce()
            {
                Kinase.layer.setLayerTextMinBounds_Quick(Kinase.REF_ActiveLayer,null)
            }

        }

        Proteins.doCon(_func, "文本框最小化", true)
        return 0
    }



})()






