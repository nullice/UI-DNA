/**
 * Created by bgllj on 2016/10/10.
 */

/**
 * 字符串相关功能模块
 * @type {{}}
 */
var arrayARR = {

    /**
     * 对称差。（不支持对象数组）---
     * [1,2,3] [1,2,4] => [3,4]
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
            if (ob[x] == false)
            {
                delete ob[x];
            } else
            {
                arr.push(x);
            }
        }

        return arr;

    }
}

export  default arrayARR;