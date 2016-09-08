/**
 * Created by bgllj on 2016/9/8.
 */
var stringSTR = {


    /**
     * 取字符串左边
     * @param str 原文
     * @param offset 偏移值
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
            return s.right(-offset);
        }
    },
    /**
     * 取字符串右边
     * @param str 原文
     * @param offset 偏移值
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
            return this.left(-offset);
        }
    },

    /**
     * 插入文本到指定位置
     * @param str 原文
     * @param start 开始位置
     * @param offset 偏移值
     * @param inStr 要插入的文本
     * @returns {*}
     */
    insert: function (str, start, offset, inStr)
    {
        return str.slice(0, start) + inStr + str.slice(start + Math.abs(offset));
    }


}


export  default stringSTR