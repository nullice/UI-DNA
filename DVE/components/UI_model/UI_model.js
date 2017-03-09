/**
 * Created by bgllj on 2016/10/12.
 */

import  IchiColor_base  from "./../../Caryon/IchiColor/ichi-color.js";
import  IchiColor_ex  from "./../../Caryon/IchiColor/ichi-color-extension";
var IchiColor = IchiColor_ex(IchiColor_base);

var UI_model = {

    msg_bubble: {
        var_panel: {title: "", msg: "", show: false, color: "none"},
        input_box: {title: "", msg: "", show: false, color: "none"}
    },
    msg_input: {
        var_panel: {title: "", data: [], show: false, color: "none", callback: function () {return 0}},
        var_edit: {title: "", data: [], show: false, color: "none", callback: function () {return 0}}
    },
    msg_color_picker: {
        color1: {
            show: false,
            position: {x: 0, y: 0},
            color: IchiColor(),
            old_color_hex: "#000",
            old_color_alpha: 1,
            callback: function () {},
            callback_reject: function ()
            {

                UI_model.msg_color_picker.color1.color.hex = UI_model.msg_color_picker.color1.old_color_hex
                UI_model.msg_color_picker.color1.color.alpha = UI_model.msg_color_picker.color1.old_color_alpha
                if (UI_model.msg_color_picker.color1.callback != undefined)
                {
                    UI_model.msg_color_picker.color1.callback(UI_model.msg_color_picker.color1.color)
                }

            },
            end_func: function ()
            {
                UI_model.msg_color_picker.color1.show = false;
            }
        }

    }


}

var UI_action = {
    /**
     * 弹出气泡提示框
     * @param panel 面板区域名
     * @param title 提示标题文本
     * @param msg 提示文本
     * @param color 提示框颜色
     * @param time 额外显示时间（毫秒）
     */
    show_message_bubble: function (panel, title, msg, color, time)
    {
        var time = time || 0;
        if (color == undefined)
        {
            var color = "none";
        } else
        {
            var color = color;
        }


        UI_model.msg_bubble[panel].show = false;
        UI_model.msg_bubble[panel].title = title;
        UI_model.msg_bubble[panel].msg = msg;
        UI_model.msg_bubble[panel].color = color;
        UI_model.msg_bubble[panel].show = true;

        setTimeout(function ()
        {
            UI_model.msg_bubble[panel].show = false;
        }, 1000 * 2.5 + 1000 * ((msg + title).length / 5) + time)
    },

    show_message_input: function (panel, title, data, callback)
    {
        UI_model.msg_input[panel].show = false;
        UI_model.msg_input[panel].title = title;
        UI_model.msg_input[panel].data = data;
        UI_model.msg_input[panel].callback = callback;
        // UI_model.msg_input[panel].msg = msg;
        UI_model.msg_input[panel]._illegal = false;
        UI_model.msg_input[panel].show = true;
    },

    show_message_color_picker: function (panel, color_hex, color_alpha, callback)
    {
        UI_model.msg_color_picker[panel].show = false;
        UI_model.msg_color_picker[panel].color.hex = color_hex;
        UI_model.msg_color_picker[panel].old_color_hex = color_hex;
        UI_model.msg_color_picker[panel].color.alpha = color_alpha || 1;
        UI_model.msg_color_picker[panel].old_color_alpha = color_alpha || 1;
        UI_model.msg_color_picker[panel].callback = callback;
        UI_model.msg_color_picker[panel].show = true;
    }

}

export {UI_model, UI_action}