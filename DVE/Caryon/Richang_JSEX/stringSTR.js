/**
 * Created by bgllj on 2016/9/8.
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
//            · stringSTR ·
//
//       By nullice ui@nullice.com
//             nullice.com
//            license: LGPL


/**
 * 字符串相关功能模块
 * @type {{left: stringSTR.left, right: stringSTR.right, insert: stringSTR.insert}}
 */
var stringSTR = {
    /**
     * 取字符串左边
     * ****依赖 stringSTR.right()***
     * @param {String} str 原文
     * @param {Number} offset 偏移值
     * @returns {*}
     */
    left: function (str, offset)
    {

        if (offset >= 0)
        {
            var s = str.substr(0, offset);
            return s;
        } else
        {
            return this.right(str, -offset);
        }
    },
    /**
     * 取字符串右边。
     * ****依赖 stringSTR.left()***
     * @param {String} str 原文
     * @param {Number} offset 偏移值
     * @returns {*}
     */
    right: function (str, offset)
    {
        if (offset >= 0)
        {
            var s = str.substr(str.length - offset, offset);
            return s;
        } else
        {
            return this.left(str, -offset);
        }
    },

    /**
     * 插入文本到指定位置
     * @param {String} str 原文
     * @param {Number} start 开始位置
     * @param {Number} offset 偏移值
     * @param {String} inStr 要插入的文本
     * @returns {*}
     */
    insert: function (str, start, offset, inStr)
    {
        return str.slice(0, start) + inStr + str.slice(start + Math.abs(offset));
    },
}


export  default stringSTR