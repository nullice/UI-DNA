/**
 * Created by bgllj on 2016/9/7.
 */

//
// Vue.filter('lang', )


console.info("[module] - lang.js")

var VueLang =
{
    currentLANG: null,
    fiterFunc: function (value, postfix)
    {
        VueLang.LANG_DEBUG[value] = postfix;
        if (VueLang.currentLANG == undefined)
        {
            //当 currentLANG 为 LANG_Chiness 时返回原文
            return value;
        }

        if (postfix !== undefined)
        { //当存在 postfix 时给原文加上 postfix，用作区分。在原文相同，但需要翻译成不同词时使用。
            value = value + postfix;
        }

        if (VueLang.currentLANG[value] !== undefined)
        {
            return VueLang.currentLANG[value];
        } else
        {
            return value
        }

    },
    from: function (value, postfix)
    {
        return VueLang.fiterFunc(value, postfix)
    }


}

VueLang.LANG_DEBUG ={

}

VueLang.LANG_Chiness2English = {

    "位置": "Position",
    "形状": "Shape",
    "链接": "Link",
}

VueLang.to = VueLang.fiterFunc;
//--------------------------------------------
export default VueLang;
