/**
 * Created by bgllj on 2016/10/10.
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
//             · arrayARR ·
//
//       By nullice ui@nullice.com
//             nullice.com
//            license: LGPL


/**
 * 数组相关功能模块
 * @type {{}}
 */
var arrayARR = {

    /**
     * 对称差。（不支持对象数组）---
     * a:[1,2,3] b:[1,2,4]  a△b => [3,4]
     * @param {Array} a
     * @param {Array} b
     * @returns {Array}
     */
    symDifference: function (a, b)
    {
        var ob = {};
        for (var i = 0; i < a.length; i++)
        {
            ob[a[i]] = true;
        }

        for (var i = 0; i < b.length; i++)
        {
            if (ob[b[i]] == undefined)
            {
                ob[b[i]] = true;
            } else
            {
                ob[b[i]] = false;
            }
        }

        var arr = [];
        for (var x in ob)
        {
            if (ob[x] != false)
            {
                arr.push(x);
            }
        }
        return arr;
    },


    /**
     * 对称差。对象数组。
     *  a:[{key:1}, {key:2}]  b:[{key:2}, {key:3}]  a△b => [{key:1},{key:3}]
     * @param a
     * @param b
     * @param key 对象关键属性
     * @returns {Array}
     */
    symDifference_ObjectArray: function (a, b, key)
    {
        var ob = {};
        for (var i = 0; i < a.length; i++)
        {
            ob[a[i][key]] = {is: true, ob: a[i]};
        }

        for (var i = 0; i < b.length; i++)
        {
            if (ob[b[i][key]] == undefined)
            {
                ob[b[i][key]] = {is: true, ob: b[i]};
            } else
            {
                ob[b[i][key]] = {is: false};
            }
        }

        var arr = [];
        for (var x in ob)
        {
            if (ob[x].is != false)
            {
                arr.push(ob[x].ob);
            }
        }
        return arr;
    },


    /**
     * 差集。（不支持对象数组）
     * a:[1,2,3] b:[1,2,4]   a-b => [3]
     * @param {Array} a
     * @param {Array} b
     * @returns {Array}
     */
    difference: function (a, b)
    {
        var ob = {};
        for (var i = 0; i < a.length; i++)
        {
            ob[a[i]] = true;
        }

        for (var i = 0; i < b.length; i++)
        {
            if (ob[b[i]] != undefined)
            {
                ob[b[i]] = false;
            }
        }

        var arr = [];
        for (var x in ob)
        {
            if (ob[x] != false)
            {
                arr.push(x);
            }
        }
        return arr;
    },

    /**
     * 并集。（不支持对象数组）
     * a:[1,2,3] b:[1,2,4]   a∪b => [1,2,3,4]
     * @param {Array} a
     * @param {Array} b
     * @returns {Array}
     */
    union: function (a, b)
    {
        var ob = {};
        for (var i = 0; i < a.length; i++)
        {
            ob[a[i]] = true;
        }

        for (var i = 0; i < b.length; i++)
        {
            if (ob[b[i]] == undefined)
            {
                ob[b[i]] = true;
            }
        }


        var arr = [];
        for (var x in ob)
        {
            if (ob[x] != false)
            {
                arr.push(x);
            }
        }
        return arr;
    },


    /**
     * 交集。（不支持对象数组）
     * a:[1,2,3] b:[1,2,4]   a∩b => [1,2]
     * @returns {Array}
     */
    intersection: function (a,b)
    {
        var ob = {};
        for (var i = 0; i < a.length; i++)
        {
            ob[a[i]] = false;
        }

        for (var i = 0; i < b.length; i++)
        {
            if (ob[b[i]] != undefined)
            {
                ob[b[i]] = true;
            }
        }

        var arr = [];
        for (var x in ob)
        {
            if (ob[x] != false)
            {
                arr.push(x);
            }
        }
        return arr;
    },


    /**
     * 从数组中移除元素，默认是非变异的。
     * @param {Array} arr
     * @param {Function} removeRule 可以给定值或者一个判断函数 function(x){ return x>3;}
     * @param {Boolean} isMutator 变异模式，为真会改变原数组
     * @returns {*}
     */
    remove: function (arr, removeRule, isMutator)
    {
        if (isMutator)
        {

        } else
        {
            var arr = arr.slice(0, arr.length);
        }

        for (var i = 0; i < arr.length; i++)
        {
            if (removeRule.constructor == Function)
            {
                if (removeRule(arr[i]))
                {
                    arr.splice(i, 1);
                    i--;
                }

            } else
            {
                if (arr[i] == removeRule)
                {
                    arr.splice(i, 1);
                    i--;
                }
            }

        }

        return arr;
    },


    /**
     * 数组是否拥有指定成员
     * arr:["A","B","C"] => hasMember(arr, "C") => true
     * @param {Array} arr
     * @param memberValue 指定成员值
     * @param equalFunc 比较函数，boolean equalFunc( arr[i], memberValue)。可空。
     * @returns {boolean}
     */
    hasMember: function (arr, memberValue, equalFunc)
    {
        if (equalFunc == undefined)
        {
            for (var i = 0; i < arr.length; i++)
            {
                if (arr[i] == memberValue)
                {
                    return true;
                }
            }
            return false;
        } else
        {
            for (var i = 0; i < arr.length; i++)
            {
                if (equalFunc(arr[i], memberValue))
                {
                    return true;
                }
            }
            return false;
        }
    },


    /**
     * 对象数组查找
     * 从对象数组中提取出一个对象，根据对象的一个属性值。
     * arr: [{name:a},{name:b}] getByKey(arr,"name","b") => return {name:b}
     * @param {[Object]} objectArr 对象数组
     * @param {String} key 关键属性
     * @param keyValue 欲提取的关键属性值
     * @param equalRule 值比较函数，可空
     * @returns {*}
     */
    getByKey: function (objectArr, key, keyValue, equalRule)
    {
        for (var i = 0; i < objectArr.length; i++)
        {
            if (objectArr[i][key] != undefined)
            {
                if (equalRule != undefined)
                {
                    if (equalRule(objectArr[i][key], keyValue))
                    {
                        return objectArr[i]
                    }

                } else
                {
                    if (objectArr[i][key] == keyValue)
                    {
                        return objectArr[i]
                    }
                }
            }
        }

    },

    /**
     * 对象数组删除
     * 从对象数组中找到出一个对象元素，并删除这个元素。
     * arr: [{name:a},{name:b}] deleteByKey(arr,"name","b") => arr: [{name:a}]
     * @param {[Object]} objectArr 对象数组
     * @param {String} key 关键属性
     * @param keyValue 欲提取的关键属性值
     * @param equalRule 值比较函数，可空
     * @returns {*}
     */
    deleteByKey: function (objectArr, key, keyValue, equalRule)
    {
        for (var i = 0; i < objectArr.length; i++)
        {
            if (objectArr[i][key] != undefined)
            {
                if (equalRule != undefined)
                {
                    if (equalRule(objectArr[i][key], keyValue))
                    {
                        objectArr.splice(i,1)
                    }

                } else
                {
                    if (objectArr[i][key] == keyValue)
                    {
                        objectArr.splice(i,1)
                    }
                }
            }
        }

    },





    /**
     * 排序对象数组
     * @param arr 数组
     * @param key 对象排序的键值，如 [{a:12}, {a:33}] , key 为 "a" 则以 a 排序
     * @param bigFront 大值在前
     */
    sortObjectArray: function (arr, key, bigFront)
    {
        if (arr != undefined && arr.sort != undefined)
        {

            return arr.sort(by(key));
        }

         function by(name)
        {
            return function (o, p)
            {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p)
                {
                    a = o[name];
                    b = p[name];
                    if (a === b)
                    {
                        return 0;
                    }
                    if (typeof a === typeof b)
                    {
                        if (bigFront)
                        {
                            return a > b ? -1 : 1;
                        } else
                        {
                            return a < b ? -1 : 1;
                        }

                    }
                    return typeof a < typeof b ? -1 : 1;
                }
                else
                {
                    throw ("error");
                }
            }
        }
    }


}


export default arrayARR;
