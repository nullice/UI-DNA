/**
 * Created by bgllj on 2016/10/10.
 */

/**
 * 数组相关功能模块
 * @type {{}}
 */
var arrayARR = {

    /**
     * 对称差。（不支持对象数组）---
     * a:[1,2,3] b:[1,2,4]  a△b => [3,4]
     * @param a
     * @param b
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
     * 差集。（不支持对象数组）
     * a:[1,2,3] b:[1,2,4]   a-b => [3]
     * @param a
     * @param b
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
     * @param a
     * @param b
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
    intersection: function ()
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
     * @param arr
     * @param removeRule 可以给定值或者一个判断函数 function(x){ return x>3;}
     * @param isMutator
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
    }
}


export default arrayARR;