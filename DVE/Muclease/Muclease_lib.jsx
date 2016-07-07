/**
 * Created by bgllj on 2016/7/6.
 */


// Muclease 核酸酶
//--------------------------
// By nullice ui@nullice.com
// nullice.com
// license: LGPL

$.evalFile("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/com.nullice.pschen.fonTags/jsx/json2.js");

/**
 *
 * @returns {Muclease}
 * @constructor
 */
Muclease = function ()
{
    try
    {
        JSON
    }
    catch (e)
    {
        $.writeln("无法使用 Muclease，因为载入 JSON 解析库，请载入 json2.js ")
    }

    return this;
};


/**
 * 把 actionReference 解析为一个简单 Object 并返回
 * @param actionReference
 * @returns {{}} actionReference 解析后的 Object
 */
Muclease.prototype.actionReferenceToObject = function (actionReference)
{
    var ob = {};

    try
    {
        ob.form = actionReference.getForm().toString()
    } catch (e)
    {
    }
    try
    {
        ob.desiredClass = typeIDToStringID(actionReference.getDesiredClass())
    } catch (e)
    {
    }
    try
    {
        ob.enumeratedType = typeIDToStringID(actionReference.gettEnumeratedType())
    } catch (e)
    {
    }
    try
    {
        ob.enumeratedValue = typeIDToStringID(actionReference.getEnumeratedValue())
    } catch (e)
    {
    }
    try
    {
        ob.identifier = typeIDToStringID(actionReference.getIdentifier())
    } catch (e)
    {
    }
    try
    {
        ob.index = actionReference.getIndex()
    } catch (e)
    {
    }
    try
    {
        ob.offset = actionReference.getOffset()
    } catch (e)
    {
    }
    try
    {
        ob.property = typeIDToStringID(actionReference.getProperty())
    } catch (e)
    {
    }
    try
    {
        ob.name = actionReference.getName()
    } catch (e)
    {
    }

    return ob;
}


/**
 * 把 actionDescriptor 解析为一个 Object 并返回
 * @param actionDescriptor
 * @param in_outSimple bool 为真输出便于阅读的简单对象，否则输出带属性 Type 的完整对象
 * @returns {{}} actionDescriptor 解析后的 Object
 */
Muclease.prototype.actionDescriptorToObject = function (actionDescriptor, in_outSimple)
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
                obValue = Muclease.prototype.actionReferenceToObject(ad);
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

    return out_ob
}


/**
 * 把 actionDescriptor 解析为一个简单 Object 并返回
 * @param actionDescriptor
 * @returns {{}} actionDescriptor 解析后的简单 Object
 */
Muclease.prototype.actionDescriptorToSimpleObject = function (actionDescriptor)
{
    return Muclease.prototype.actionDescriptorToObject(actionDescriptor, true);
}

/**
 * 把 actionDescriptor 解析为对象并转换为 JSON 字符串
 * @param actionDescriptor
 */
Muclease.prototype.actionDescriptorToJSON = function (actionDescriptor)
{
    var ob = Muclease.prototype.actionDescriptorToObject(actionDescriptor);
    return JSON.stringify(ob);
}


/**
 * 把 actionDescriptor 解析为简单对象并转换为 JSON 字符串
 * @param actionDescriptor
 */
Muclease.prototype.actionDescriptorToSampleJSON = function (actionDescriptor)
{
    var ob = Muclease.prototype.actionDescriptorToObject(actionDescriptor, true);
    return JSON.stringify(ob);
}

/**
 * 把 actionReference 解析为简单对象并转换为 JSON 字符串
 * @param actionDescriptor
 */
Muclease.prototype.actionReferenceToJSON = function (actionDescriptor)
{
    var ob = Muclease.prototype.actionReferenceToObject(actionDescriptor);
    return JSON.stringify(ob);
}

/**
 * 把一个 JSON 字符串，写到一个文件中。
 * @param filePath
 * @param json
 */
Muclease.prototype.jsonToFile = function (filePath, json)
{
    var f = new File(filePath);
    f.open("w");
    f.write(json);
    f.close();
}

Muclease.prototype.objectToActionReference = function (ob)
{
    if (ob.constructor !== Object)
    {
        return null;
    }


    var af = new ActionReference();

    if (ob.form !== undefined)
    {
        af.putForm()
    }


    try
    {
        ob.form = actionReference.getForm().toString()
    } catch (e)
    {
    }
    try
    {
        ob.desiredClass = typeIDToStringID(actionReference.getDesiredClass())
    } catch (e)
    {
    }
    try
    {
        ob.enumeratedType = typeIDToStringID(actionReference.gettEnumeratedType())
    } catch (e)
    {
    }
    try
    {
        ob.enumeratedValue = typeIDToStringID(actionReference.getEnumeratedValue())
    } catch (e)
    {
    }
    try
    {
        ob.identifier = typeIDToStringID(actionReference.getIdentifier())
    } catch (e)
    {
    }
    try
    {
        ob.index = actionReference.getIndex()
    } catch (e)
    {
    }
    try
    {
        ob.offset = actionReference.getOffset()
    } catch (e)
    {
    }
    try
    {
        ob.property = typeIDToStringID(actionReference.getProperty())
    } catch (e)
    {
    }
    try
    {
        ob.name = actionReference.getName()
    } catch (e)
    {
    }

    return ob;
}