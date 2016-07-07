/**
 * Created by 不知语冰 on 2015/11/7.
 * 提供扩展面板随界面颜色而改变背景颜色的功能。并且可自行切换 CSS 。
 */

(function ()
{
    var cs = new CSInterface();
    var WHITE = 0xFFFFFF, BLACK = 0x000000,
        DARK_LIGHT_SWITCH_COLOR = 0x888888,
        LIGHT1_2_SWITCH_COLOR = 0xCCCCCC,
        DARK1_2_SWITCH_COLOR = 0x444444;


    //----------------------------
    //注册 PS 界面配色改变事件监听器
    cs.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setUIColors);
    setUIColors();

    //---------------------------
    function setUIColors()
    {
        var skinInfo = cs.getHostEnvironment().appSkinInfo;

        if (skinInfo)
        {
            //获取 PS 外观背景色
            var panelBgColor = toHex(skinInfo.panelBackgroundColor.color);

            //===设置界面背景色为 PS 外观设置
            var body = document.getElementsByTagName("body");
            body[0].style.backgroundColor ="#"+ panelBgColor;

            $(".editmod").css("background-color","#"+ panelBgColor);


			//=== 切换 CSS 文件
            function changeCSSfile(id,file)
            {
                var cssLink = document.getElementById(id);
                cssLink.href=file;
            }

            //===判断 PS 外观设置，并执行动作；由暗到亮 4 档级别，从最亮到最暗： light1、2，dark1、2
            panelBgColor= "0x"+panelBgColor
            if(panelBgColor > DARK_LIGHT_SWITCH_COLOR)
            {
                if(panelBgColor > LIGHT1_2_SWITCH_COLOR)
                {
                    //light1
                    //alert("light1")
                    //changeCSSfile("css_topcoat","css/topcoat-desktop-light.css");
                    //changeCSSfile("css_dark","");
                }
                else
                {
                    //light2
                    //alert("light2")
                    //changeCSSfile("css_topcoat","css/topcoat-desktop-light.css");
                    //changeCSSfile("css_dark","css/light2.css");
                }
            }
            else
            {
                if(panelBgColor > DARK1_2_SWITCH_COLOR)
                {
                    //dark1
                   // alert("dark1")
                    //changeCSSfile("css_topcoat","css/topcoat-desktop-dark.css");
                    //changeCSSfile("css_dark","css/dark1.css");
                }
                else
                {
                    //dark2
                    //alert("dark2")
                    //changeCSSfile("css_topcoat","css/topcoat-desktop-dark.css");
                    //changeCSSfile("css_dark","css/dark2.css");
                }
            }
        }


    }


    //把 color 对象转换为 16进制字符串
    function toHex(color, prefix, delta)
    {
        function computeValue(value, delta)
        {
            value=Math.floor(value);
            var computedValue = !isNaN(delta) ? value + delta : value;
            if (computedValue < 0)
            {
                computedValue = 0;
            }
            else if (computedValue > 255)
            {
                computedValue = 255;
            }

            computedValue = computedValue.toString(16);
            return computedValue.length == 1 ? "0" + computedValue : computedValue;
        }

        var hex = "";
        if (color)
        {
            with (color)
            {
                hex = computeValue(red, delta) + computeValue(green, delta) + computeValue(blue, delta);
            }
        }


            return  hex;
    }
})()


