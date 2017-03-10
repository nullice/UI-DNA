/**
 * Created by bgllj on 2017/3/9.
 */

/**
 * 复制形状属性
 * @param infoObjec
 * @param envObject
 * @returns {*}
 */
Libs.quick_shape_advance_copyShapeProperty = function (infoObjec, envObject)
{
    try
    {
        var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
        var desc692 = new ActionDescriptor();
        var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
        var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
        var idshapeCopyShapeAll = stringIDToTypeID("shapeCopyShapeAll");
        desc692.putEnumerated(idshapeClipboardOperation, idshapeClipboardOperation, idshapeCopyShapeAll);
        executeAction(idshapeClipboardOperation, desc692, DialogModes.NO);

    } catch (e)
    {
        return null
    }

    return 0
}


/**
 * 粘贴形状属性
 * @param infoObjec
 * @param envObject
 * @returns {*}
 */
Libs.quick_shape_advance_pasetShapeProperty = function (infoObjec, envObject)
{
    try
    {

        var idshapeClipboardOperation = stringIDToTypeID( "shapeClipboardOperation" );
        var desc926 = new ActionDescriptor();
        var idshapeClipboardOperation = stringIDToTypeID( "shapeClipboardOperation" );
        var idshapeClipboardOperation = stringIDToTypeID( "shapeClipboardOperation" );
        var idshapePasteShapeAll = stringIDToTypeID( "shapePasteShapeAll" );
        desc926.putEnumerated( idshapeClipboardOperation, idshapeClipboardOperation, idshapePasteShapeAll );
        executeAction( idshapeClipboardOperation, desc926, DialogModes.NO );


    } catch (e)
    {
        return null
    }

    return 0
}


/**
 * 复制形状 CSS 到剪贴板
 * @param infoObjec
 * @param envObject
 * @returns {*}
 */
Libs.quick_shape_advance_copyShapeCSS= function (infoObjec, envObject)
{
    try
    {
        var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
        var desc692 = new ActionDescriptor();
        var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
        var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
        var idshapeCopyShapeAll = stringIDToTypeID("shapeCopyShapeAll");
        desc692.putEnumerated(idshapeClipboardOperation, idshapeClipboardOperation, idshapeCopyShapeAll);
        executeAction(idshapeClipboardOperation, desc692, DialogModes.NO);

    } catch (e)
    {
        return null
    }

    return 0
}


/**
 * 复制形状 SVG 文本到剪贴板
 * @param infoObjec
 * @param envObject
 * @returns {*}
 */
Libs.quick_shape_advance_copyShapeSVG= function (infoObjec, envObject)
{
    try
    {
        var idcopyLayerSVG = stringIDToTypeID( "copyLayerSVG" );
        var desc949 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref225 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref225.putEnumerated( idLyr, idOrdn, idTrgt );
        desc949.putReference( idnull, ref225 );
        executeAction( idcopyLayerSVG, desc949, DialogModes.NO );

    } catch (e)
    {
        return null
    }

    return 0
}



// Libs.quick_shape_advance_copyShapeProperty = function (infoObjec, envObject)
// {
//
//     function _func()
//     {
//         var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
//         var desc692 = new ActionDescriptor();
//         var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
//         var idshapeClipboardOperation = stringIDToTypeID("shapeClipboardOperation");
//         var idshapeCopyShapeAll = stringIDToTypeID("shapeCopyShapeAll");
//         desc692.putEnumerated(idshapeClipboardOperation, idshapeClipboardOperation, idshapeCopyShapeAll);
//         executeAction(idshapeClipboardOperation, desc692, DialogModes.NO);
//     }
//
//     Proteins.doCon(_func, "形状对称差", false)
//     return 0
// }







