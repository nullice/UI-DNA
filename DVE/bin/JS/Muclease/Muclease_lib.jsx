/**
 * Created by bgllj on 2016/7/6.
 */




/**
 * Created by bgllj on 2016/7/5.
 */



// Muclease 核酸酶


function actionDescriptorToObject(actionDescriptor, in_outSimple)
{
    var out_ob = {};
    _scanAD(actionDescriptor, out_ob, false, in_outSimple)


    function _scanAD(ad, ob, isAList, outSimple)
    {
        var len = ad.count;
        for (var i = 0; i < len; i++)
        {
            if (isAList)
            {
                var key = i;
            } else
            {
                var key = ad.getKey(i);
            }

            var obType = ad.getType(key)
            var obValue = null;

            if ("DescValueType.BOOLEANTYPE" == obType)
            {
                obValue = ad.getBoolean(key);
            }
            else if ("DescValueType.STRINGTYPE" == obType)
            {
                obValue = ad.getString(key);
            }
            else if ("DescValueType.INTEGERTYPE" == obType)
            {
                obValue = ad.getInteger(key);
            }
            else if ("DescValueType.DOUBLETYPE" == obType)
            {
                obValue = ad.getDouble(key);
            }
            else if ("DescValueType.CLASSTYPE" == obType)
            {
                obValue = ad.getClass(key);
            }
            else if ("DescValueType.LARGEINTEGERTYPE" == obType)
            {
                obValue = ad.getLargeInteger(key);
            }
            else if ("DescValueType.ALIASTYPE" == obType)
            {
                obValue = ad.getPath(key);
            }
            else if ("DescValueType.UNITDOUBLE" == obType)
            {
                obValue = {
                    doubleType: typeIDToStringID(ad.getUnitDoubleType(key)),
                    doubleValue: ad.getUnitDoubleValue(key)
                };
            }
            else if ("DescValueType.ENUMERATEDTYPE" == obType)
            {
                obValue = {
                    enumerationType: typeIDToStringID(ad.getEnumerationType(key)),
                    enumerationValue: typeIDToStringID(ad.getEnumerationValue(key))
                };
            }
            else if ("DescValueType.REFERENCETYPE" == obType)
            {
                obValue =actionReferenceToObject(ad);
            }
            else if ("DescValueType.OBJECTTYPE" == obType)
            {
                obValue = {}
                _scanAD(ad.getObjectValue(key), obValue, false, outSimple)
            }
            else if ("DescValueType.LISTTYPE" == obType)
            {
                if (outSimple)
                {
                    obValue = [];
                    _scanAD(ad.getList(key), obValue, true, outSimple)
                }
                else
                {
                    obValue = {};
                    _scanAD(ad.getList(key), obValue, true, outSimple)

                }
            }


            if (isAList)
            {
                var name = key;
            } else
            {
                var name = typeIDToStringID(key);
            }

            if (outSimple)
            {
                if (isAList)
                {
                    ob[key] = obValue;
                }
                else
                {
                    ob[name] = obValue;
                    if ("DescValueType.OBJECTTYPE" == obType)
                    {
                        ob[name]._objectType = typeIDToStringID(ad.getObjectType(key));
                    }
                }

            }
            else
            {

                ob[name] = {
                    value: obValue,
                    type: obType.toString()
                };
                if ("DescValueType.OBJECTTYPE" == obType)
                {
                    ob[name].objectType = typeIDToStringID(ad.getObjectType(key));
                }

            }

        }

    }

    $.writeln(JSON.stringify(out_ob));
    var f = new File("D:/1.TXT");
    f.open("a")
    f.write(JSON.stringify(out_ob))
}


function actionReferenceToObject(actionReference)
{
    var ob ={};

    try{ ob.form = actionReference.getForm().toString()    }  catch(e){}
    try{ ob.desiredClass = typeIDToStringID(actionReference.getDesiredClass())    }  catch(e){}
    try{ ob.enumeratedType = typeIDToStringID(actionReference.gettEnumeratedType())    }  catch(e){}
    try{ ob.enumeratedValue = typeIDToStringID(actionReference.getEnumeratedValue())   }  catch(e){}
    try{ ob.identifier = typeIDToStringID(actionReference.getIdentifier())   }  catch(e){}
    try{ ob.index =actionReference.getIndex()   }  catch(e){}
    try{ ob.offset =actionReference.getOffset()  }  catch(e){}
    try{ ob.property =typeIDToStringID(actionReference.getProperty()) }  catch(e){}
    try{ ob.name =actionReference.getName() }  catch(e){}

    return ob;
}

