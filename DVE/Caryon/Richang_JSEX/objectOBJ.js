/**
 * Created by bgllj on 2016/10/26.
 */

//      ___                       ___           ___           ___           ___           ___
//     /\  \                     /\__\         /\  \         /\  \         /\  \         /\__\
//    /::\  \       ___         /:/  /         \:\  \       /::\  \        \:\  \       /:/ _/_
//   /:/\:\__\     /\__\       /:/  /           \:\  \     /:/\:\  \        \:\  \     /:/ /\  \
//  /:/ /:/  /    /:/__/      /:/  /  ___   ___ /::\  \   /:/ /::\  \   _____\:\  \   /:/ /::\  \
// /:/_/:/__/___ /::\  \     /:/__/  /\__\ /\  /:/\:\__\ /:/_/:/\:\__\ /::::::::\__\ /:/__\/\:\__\
// \:\/:::::/  / \/\:\  \__  \:\  \ /:/  / \:\/:/  \/__/ \:\/:/  \/__/ \:\~~\~~\/__/ \:\  \ /:/  /
//  \::/~~/~~~~   ~~\:\/\__\  \:\  /:/  /   \::/__/       \::/__/       \:\  \        \:\  /:/  /
//   \:\~~\          \::/  /   \:\/:/  /     \:\  \        \:\  \        \:\  \        \:\/:/  /
//    \:\__\         /:/  /     \::/  /       \:\__\        \:\__\        \:\__\        \::/  /
//     \/__/         \/__/       \/__/         \/__/         \/__/         \/__/         \/__/
//
//
//                日常
//        +-------------------+
//        |   Richang  JSEX   |
//        +-------------------+
//             · objectOBJ ·
//
//       By nullice ui@nullice.com
//             nullice.com
//            license: LGPL


var objectOBJ = {


    /**
     * 对象是否为空
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject: function (obj)
    {
        for (var name in obj)
        {
            return false;
        }
        return true;
    },

    /**
     * 复制对象。可控制要复制的属性，复制后的属性名，处理新属性值
     * @param ob1 源对象
     * @param ob2 目标对象
     * @param func_allowCopy 判断是否允许复制的函数，返回真允许复制 func_allowCopy(属性名,属性值)。可空
     * @param func_rename 重命名复制到目标对象上的属性名， 返回新属性名 func_rename(属性名,属性值)。可空
     * @param func_valueFiter 处理复制到目标对象上的属性值，返回处理后的属性值 func_rename(属性名,属性值)。可空
     * @param func_for 每次循环执行的函数 func_for(ob1,ob2,x)。可空
     */

    objectCopyToObject: function (ob1, ob2, func_allowCopy, func_rename, func_valueFiter, func_for)
    {

        if(ob2 == undefined)
        {return}
        for (var x in ob1)
        {

            if (func_for != undefined)
            {
                func_for(ob1, ob2, x);
            }

            var _allowCopy = true;
            if (func_allowCopy != undefined)
            {
                _allowCopy = func_allowCopy(x, ob1[x]);
            }


            var name = x;
            if (func_rename != undefined)
            {
                name = func_rename(x, ob1[x]);
            }


            if ( ob1[x]!= undefined && ob1[x].constructor === Object)
            {
                if(typeof ob2[name] !=="object")
                {
                    ob2[name] = {};
                }

                this.objectCopyToObject(ob1[x], ob2[name], func_allowCopy, func_rename, func_valueFiter)
            } else
            {

                if (func_valueFiter != undefined)
                {
                    ob2[name] = func_valueFiter(x, ob1[x]);

                } else
                {

                    ob2[name] = ob1[x];
                }

            }
        }

    },


    /**
     * 根据属性名路径列表（names）获取对象属性的值
     * @param object 对象
     * @param names 属性名路径列表，如 [position,enableAssigns,y]
     * @param aheadEndTime 提取结束个数，如设置为 1 则是获取倒数第 2 个属性的值，
     * @returns {*}
     * @private
     */
    getObjectValueByNames: function (object, names, aheadEndTime)
    {
        var nowValue;
        for (var i = 0; i < (names.length - (aheadEndTime || 0)); i++)
        {
            if (i == 0)
            {
                if (object[names[i]] != undefined)
                {
                    nowValue = object[names[i]];
                } else
                {
                    return null
                }

            } else
            {

                if (nowValue[names[i]] != undefined)
                {
                    nowValue = nowValue[names[i]];
                }
                else
                {
                    return null
                }

            }

        }

        return nowValue
    },


    /**
     * 根据属性名路径列表（names）对对象属性赋值
     * @param object 对象
     * @param names 属性名路径列表，如 [position,enableAssigns,y]
     * @param value 值
     */
    setObjectValueByNames: function (object, names, value)
    {
        var nowObject;

        if (names.length == 1)
        {
            object[names[0]] = value;
            return
        }


        for (var i = 0; i < (names.length); i++)
        {
            if (i == 0 && names.length>2)
            {
                if(object[names[0]] == undefined)
                {
                    object[names[0]] ={}
                }
                nowObject = object[names[0]];
            }
            else if (i < names.length - 2 && names.length>2 )
            {
                if(nowObject[names[i]]== undefined)
                {
                    nowObject[names[i]] ={}
                }

                nowObject = nowObject[names[i]];
            }
            else if (i == names.length - 2)
            {
                if(names.length==2)
                {
                    if(object[names[0]] == undefined)
                    {
                        object[names[0]] ={}
                    }
                    nowObject = object[names[0]];

                    nowObject[names[1]] = value
                    return

                }
                else{

                    if(nowObject[names[i]]== undefined)
                    {
                        nowObject[names[i]] ={}
                    }

                    nowObject = nowObject[names[i]];
                    nowObject[names[i + 1]] = value
                    return
                }

            }
        }
    }


}


export default objectOBJ
