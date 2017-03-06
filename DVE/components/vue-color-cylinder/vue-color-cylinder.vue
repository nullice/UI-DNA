<template>

    <div class="vue-color-cylinder-main-box" v-bind:style="positon_style" v-on:mousedown="main_box_mousedown($event)">
        <!--<div class="saturation-lighteness-picker-board"></div>-->
        <color-map v-bind:in_value="color1.hsv.s" v-bind:in_value2="color1.hsv.v" v-bind:in_value3="color1.hsv.h"
                   v-bind:value_type="o_menu.hue.state?'hue':'sv'"
                   v-bind:edit_color="color1"></color-map>

        <menu-box
                v-bind:menu_data="o_menu"
                in_class="color-setting-button"
        >
            <button class="exmo_button_icon mini"><i class="icon-settings"></i></button>
        </menu-box>

        <div class="setting_panel" v-if="o_menu.setting.state">
            <div class="color-model">
                <div class="model-title">HSL</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl.child.h">
                    <div class="exmo_checkbox_shadow"></div>
                    H
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl.child.s">
                    <div class="exmo_checkbox_shadow"></div>
                    S
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl.child.l">
                    <div class="exmo_checkbox_shadow"></div>
                    L
                </label>
            </div>
            <div class="color-model">
                <div class="model-title">HSL (255)</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl255.child.h">
                    <div class="exmo_checkbox_shadow"></div>
                    H
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl255.child.s">
                    <div class="exmo_checkbox_shadow"></div>
                    S
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl255.child.l">
                    <div class="exmo_checkbox_shadow"></div>
                    L
                </label>
            </div>

            <div class="color-model">
                <div class="model-title">HSL (240)</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl240.child.h">
                    <div class="exmo_checkbox_shadow"></div>
                    H
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl240.child.s">
                    <div class="exmo_checkbox_shadow"></div>
                    S
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsl240.child.l">
                    <div class="exmo_checkbox_shadow"></div>
                    L
                </label>
            </div>

            <div class="color-model">
                <div class="model-title">HSB</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsv.child.h">
                    <div class="exmo_checkbox_shadow"></div>
                    H
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsv.child.s">
                    <div class="exmo_checkbox_shadow"></div>
                    S
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hsv.child.v">
                    <div class="exmo_checkbox_shadow"></div>
                    B
                </label>
            </div>

            <div class="color-model">
                <div class="model-title">RGB</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.rgb.child.r">
                    <div class="exmo_checkbox_shadow"></div>
                    R
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.rgb.child.g">
                    <div class="exmo_checkbox_shadow"></div>
                    G
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.rgb.child.b">
                    <div class="exmo_checkbox_shadow"></div>
                    B
                </label>
                <br>
            </div>

            <div class="color-model">
                <div class="model-title">HWB</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hwb.child.h">
                    <div class="exmo_checkbox_shadow"></div>
                    H
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hwb.child.w">
                    <div class="exmo_checkbox_shadow"></div>
                    W
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.hwb.child.b">
                    <div class="exmo_checkbox_shadow"></div>
                    B
                </label>
            </div>


            <div class="color-model">
                <div class="model-title">Lab</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.labPs.child.l">
                    <div class="exmo_checkbox_shadow"></div>
                    L
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.labPs.child.a">
                    <div class="exmo_checkbox_shadow"></div>
                    a
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.labPs.child.b">
                    <div class="exmo_checkbox_shadow"></div>
                    b
                </label>
            </div>

            <div class="color-model">
                <div class="model-title">XYZ</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.xyz.child.x">
                    <div class="exmo_checkbox_shadow"></div>
                    X
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.xyz.child.y">
                    <div class="exmo_checkbox_shadow"></div>
                    Y
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.xyz.child.z">
                    <div class="exmo_checkbox_shadow"></div>
                    Z
                </label>
            </div>
            <div class="color-model">
                <div class="model-title">输入框</div>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.more.child.rgba">
                    <div class="exmo_checkbox_shadow"></div>
                    RGBA
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.more.child.rgb">
                    <div class="exmo_checkbox_shadow"></div>
                    RGB
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.more.child.hex">
                    <div class="exmo_checkbox_shadow"></div>
                    HEX
                </label>
                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.more.child.int">
                    <div class="exmo_checkbox_shadow"></div>
                    INT
                </label>

                <label class="exmo_checkbox">
                    <input type="checkbox" v-model="o_menu.more.child.info">
                    <div class="exmo_checkbox_shadow"></div>
                    INFO
                </label>
            </div>

            <div class="button_box">
                <button class="exmo_button" v-on:click="o_menu.setting.state=false">确定</button>
            </div>
        </div>

        <div class="color-range-box">
            <div class="color-picker hsl" transition="expand"
                 v-if="o_menu.hsl.state">
                <color-range v-bind:in_value="color1.hsl.h" range_title="H" value_type="hsl.h"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl.child.h"></color-range>
                <color-range v-bind:in_value="color1.hsl.s" range_title="S" value_type="hsl.s"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl.child.s"></color-range>
                <color-range v-bind:in_value="color1.hsl.l" range_title="L" value_type="hsl.l"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl.child.l"></color-range>
            </div>

            <div class="color-picker hsl" transition="expand"
                 v-if="o_menu.hsl255.state">
                <div class="sub_title">HSL (255)</div>
                <color-range v-bind:in_value="color1.ex.hsl255.h" range_title="H" value_type="hsl255.h"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl255.child.h"></color-range>
                <color-range v-bind:in_value="color1.ex.hsl255.s" range_title="S" value_type="hsl255.s"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl255.child.s"></color-range>
                <color-range v-bind:in_value="color1.ex.hsl255.l" range_title="L" value_type="hsl255.l"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl255.child.l"></color-range>
            </div>

            <div class="color-picker hsl" transition="expand"
                 v-if="o_menu.hsl240.state">
                <div class="sub_title">HSL (240)</div>
                <color-range v-bind:in_value="color1.ex.hsl240.h" range_title="H" value_type="hsl240.h"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl240.child.h"></color-range>
                <color-range v-bind:in_value="color1.ex.hsl240.s" range_title="S" value_type="hsl240.s"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl240.child.s"></color-range>
                <color-range v-bind:in_value="color1.ex.hsl240.l" range_title="L" value_type="hsl240.l"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsl240.child.l"></color-range>
            </div>


            <div class="color-picker hsv" transition="expand"
                 v-if="o_menu.hsv.state">
                <color-range v-bind:in_value="color1.hsv.h" range_title="H" value_type="hsv.h"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsv.child.h"></color-range>
                <color-range v-bind:in_value="color1.hsv.s" range_title="S" value_type="hsv.s"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsv.child.s"></color-range>
                <color-range v-bind:in_value="color1.hsv.v" range_title="B" value_type="hsv.v"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hsv.child.v"></color-range>
            </div>

            <div class="color-picker hwb" transition="expand"
                 v-if="o_menu.hwb.state">
                <color-range v-bind:in_value="color1.hwb.h" range_title="H" value_type="hwb.h"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hwb.child.h"></color-range>
                <color-range v-bind:in_value="color1.hwb.w" range_title="W" value_type="hwb.w"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hwb.child.w"></color-range>
                <color-range v-bind:in_value="color1.hwb.b" range_title="B" value_type="hwb.b"
                             v-bind:edit_color="color1"
                             v-if="o_menu.hwb.child.b"></color-range>
            </div>

            <div class="color-picker rgb"
                 v-if="o_menu.rgb.state">
                <color-range v-bind:in_value="color1.r" range_title="R" value_type="rgb.r"
                             v-bind:edit_color="color1"
                             v-if="o_menu.rgb.child.r"></color-range>
                <color-range v-bind:in_value="color1.g" range_title="G" value_type="rgb.g"
                             v-bind:edit_color="color1"
                             v-if="o_menu.rgb.child.g"></color-range>
                <color-range v-bind:in_value="color1.b" range_title="B" value_type="rgb.b"
                             v-bind:edit_color="color1"
                             v-if="o_menu.rgb.child.b"></color-range>
            </div>

            <div class="color-picker labps"
                 v-if="o_menu.labPs.state">
                <color-range v-bind:in_value="color1.ex.labPs.l" range_title="L" value_type="labPs.l"
                             v-bind:edit_color="color1"
                             v-if="o_menu.labPs.child.l"></color-range>
                <color-range v-bind:in_value="color1.ex.labPs.a" range_title="a" value_type="labPs.a"
                             v-bind:edit_color="color1"
                             v-if="o_menu.labPs.child.a"></color-range>
                <color-range v-bind:in_value="color1.ex.labPs.b" range_title="b" value_type="labPs.b"
                             v-bind:edit_color="color1"
                             v-if="o_menu.labPs.child.b"></color-range>
            </div>


            <div class="color-picker xyz"
                 v-if="o_menu.xyz.state">
                <color-range v-bind:in_value="color1.ex.xyz.x" range_title="X" value_type="xyz.x"
                             v-bind:edit_color="color1"
                             v-if="o_menu.xyz.child.x"></color-range>
                <color-range v-bind:in_value="color1.ex.xyz.y" range_title="Y" value_type="xyz.y"
                             v-bind:edit_color="color1"
                             v-if="o_menu.xyz.child.y"></color-range>
                <color-range v-bind:in_value="color1.ex.xyz.z" range_title="Z" value_type="xyz.z"
                             v-bind:edit_color="color1"
                             v-if="o_menu.xyz.child.z"></color-range>

            </div>
            <!--H:<input  max="360" min="0"  v-model="color1.hsl.h" type="range" class="exmo_range" >{{color1.hsl.h}}-->
            <!--<br>-->
            <!--S:<input  max="100" min="0"  v-model="color1.hsl.s" type="range" class="exmo_range" >{{color1.hsl.s}}-->
            <!--<br>-->
            <!--L:<input  max="100" min="0"  v-model="color1.hsl.l" type="range" class="exmo_range" >{{color1.hsl.l}}-->
            <!--<br>-->
            <!--R:<input  max="255" min="0"  v-model="color1.r" type="range" class="exmo_range" >{{color1.r}}-->
            <!--<br>-->
            <!--G:<input  max="255" min="0"  v-model="color1.g" type="range" class="exmo_range" >{{color1.g}}-->
            <!--<br>-->
            <!--B:<input  max="255" min="0"  v-model="color1.b" type="range" class="exmo_range" >{{color1.b}}-->

        </div>


        <div class="color-input-box" spellcheck="false">
            <color-range v-bind:in_value="color1.alpha" range_title="" value_type="alpha"
                         v-bind:edit_color="color1"></color-range>
            <div class="color-block-box">

                <div class="color-background color-block">
                    <div class="color-block main-color" style="background:{{color1.rgba}}"></div>
                </div>

                <slot></slot>
            </div>


            <div v-if="o_menu.more.child.rgba" class="color-input rgba">
                <span class="title">RGBA: </span> <input v-model="color1.rgba" type="text" class="exmo_input_text">
            </div>

            <div v-if="o_menu.more.child.rgb" class="color-input rgb">
                <span class="title">RGB: </span> <input v-model="color1.rgb" type="text" class="exmo_input_text">
            </div>

            <div v-if="o_menu.more.child.hex" class="color-input hex">
                <span class="title" v-on:click="o_uppercase=!o_uppercase" title="点击切换大小写">HEX:</span> <input
                    v-model="color1.hex" type="text" style="{{o_uppercase?'text-transform:uppercase;':''}}"
                    class="exmo_input_text">
            </div>
            <div v-if="o_menu.more.child.int" class="color-input int">
                <span class="title">INT:</span> <input v-model="color1.int" type="text" class="exmo_input_text">
            </div>

            <div v-if="o_menu.more.child.info" class="color-info">
                <span class="sub_title">WCAG Luma:</span> {{color1.ex.theLuma_WCAG}}
                <br>
                <span class="sub_title">Wavelength:</span> {{color1.ex.theWavelength}}
            </div>
        </div>
        <div v-if="cofirm_mode='true'" class="confirm-box">
            <div class="button-box">
                <button v-on:click="click_cancel">返回</button>
                <button v-on:click="click_ok" class="ok">确定</button>
            </div>

        </div>


        <!--<pre> {{color1|json 4}}</pre>-->
    </div>

</template>
<style lang="scss" rel="stylesheet/scss">

    .vue-color-cylinder-main-box {
        position: fixed;
        width: 260px;
        background: #fff;
        z-index: 22;
        border-radius: 4px;
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
        padding: 10px 0;
        box-sizing: border-box;
        padding-top: 64px;
        cursor: default;

        .menu_box.color-setting-button {
            position: absolute;
            font-size: 10px;
            right: 0px;
            margin-top: -4px;
            z-index: 2;

            .exmo_button_icon.mini i {
                font-size: 12px;
                color: #B6B6B6;
            }

            .menu.option_list {
                position: absolute;
                right: 10px;
                width: 140px;
                z-index: 11;
                box-sizing: border-box;
            }

        }

        .color-input-box {
            padding: 0 10px 0 55px;

            .color-block-box {
                position: absolute;
                padding-top: 15px;
                width: 52px;
                left: 0px;
                text-align: center;

                .color-background {
                    background-color: white;
                    background-size: 10px 10px;
                    background-position: 0px 0px, 5px 5px;
                    background-image: -webkit-linear-gradient(45deg, #d2d2d2 25%, #d2d2d2 25%, transparent 25%, transparent 75%, #d2d2d2 75%, #d2d2d2 75%), -webkit-linear-gradient(-135deg, #d2d2d2 25%, #d2d2d2 25%, transparent 25%, transparent 75%, #d2d2d2 75%, #d2d2d2 75%);

                }

                .color-block {
                    width: 22px;
                    height: 22px;
                    display: inline-block;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.13);
                }
            }

            .color-input {
                position: relative;
                .title {
                    font-size: 10px;
                    color: #898983;
                    position: absolute;
                    line-height: 39px;
                    cursor: default;
                }
                input.exmo_input_text {
                    margin-left: 38px;
                }

                &.rgba input.exmo_input_text {
                    width: 150px;
                }
                &.rgb input.exmo_input_text {
                    width: 150px;
                }
            }

            .color-info {
                font-size: 10px;
                padding-top: 4px;
                color: #898983;
                line-height: 28px;
                -webkit-user-select: text;
            }

        }
        .setting_panel {
            position: absolute;
            background: #F9F9F9;
            opacity: .95;
            width: 80%;
            left: 0;
            right: 0;
            margin: auto;
            padding: 15px 20px 6px 20px;
            z-index: 33;
            box-shadow: 0 1px 4px rgba(34, 34, 34, 0.36);
            border-radius: 2px;

            .model-title {
                font-size: 12px;
                margin-bottom: 8px;
                color: #898989;
                font-weight: 600;
                cursor: default;
            }

            .color-model {
                margin: 10px 0;
                label.exmo_checkbox {
                    padding: 0 6px;
                    color: #5E5E5E;
                }
            }
            .button_box {
                text-align: center;
            }
        }

        .confirm-box {
            height: 30px;

            .button-box {
                text-align: center;
                position: absolute;
                bottom: 0;
                overflow: hidden;
                border-radius: 0 0 4px 4px;
                width: 100%;
                white-space: nowrap;

                button {
                    border: none;
                    background: rgba(166, 88, 88, 0);
                    color: #6B6B6B;
                    font-family: inherit;
                    padding: 9px 52px;
                    margin: 0;
                    transition: all .3s;
                    outline: none;

                    &.ok {
                        margin-left: -4px;
                    }

                    &:hover {
                        background: #5EB4F2;
                        color: #FFFFFF;
                    }

                    &:active {
                        background: #2F88C8;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }

    .color-picker {
        padding: 5px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);

        .sub_title {
            font-size: 10px;
            color: #BEBEBE;
            border-radius: 4px;
            padding: 4px 0 0 0;
            text-align: right;
            -webkit-user-select: none;
            cursor: default;
        }

    }

    .expand-transition {
        transition: all .4s ease;
        overflow: hidden;
        max-height: 200px;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .expand-enter, .expand-leave {
        max-height: 0px;
        opacity: 0;
    }

</style>
<script>
    import  IchiColor_base  from "./../../Caryon/IchiColor/ichi-color.js";
    import  IchiColor_ex  from "./../../Caryon/IchiColor/ichi-color-extension";
    import  ColorRNA  from  "./../../Caryon/IchiColor/lib/ColorRNA.js";
    import  ColorRange from "./lib/color-range.vue"
    import  ColorMap from "./lib/color-map.vue"
    import  Menu from "./../AttributePanel_menu.vue"
    import  ARR from "./../../Caryon/Richang_JSEX/arrayARR"
    var IchiColor = IchiColor_ex(IchiColor_base);

    export default{
        props: ['ichi_color', 'confirm_mode', 'callback_confirm', 'callback_reject', "end_func"],
        watch: {

            "color_bullets": function (val)
            {
//                console.log("------------------")
//                console.log(val)
            },
            "color1.int": function (val)
            {
                if (this.callback_confirm != undefined)
                {
                    var now = (new Date()).getTime();
                    if (now - this.o_time_defer > 200)
                    {
                        this.callback_confirm(this.ichi_color);

                        this.o_time_defer = now;
                    }
                }

            },
            "color1.alpha": function (val)
            {
                if (this.callback_confirm != undefined)
                {
                    var now = (new Date()).getTime();
                    if (now - this.o_time_defer > 200)
                    {
                        this.callback_confirm(this.ichi_color);

                        this.o_time_defer = now;
                    }
                }

            }

        },
        data(){
            return {
                msg: 'hello vue',
                color1: this.ichi_color,
                o_menu: {
                    hue: {
                        name: "Hue",
                        type: "multi_select",
                        state: true,
                    },
                    hr: {
                        type: "multi_select",
                        state: true,
                        hr: true,
                    },
                    hsl: {
                        name: "HSL",
                        type: "multi_select",
                        state: true,
                        child: {
                            h: true,
                            s: true,
                            l: true,
                        }
                    },
                    hsl255: {
                        name: "HSL 255",
                        type: "multi_select",
                        state: false,
                        child: {
                            h: true,
                            s: true,
                            l: true,
                        }
                    },
                    hsl240: {
                        name: "HSL 240",
                        type: "multi_select",
                        state: false,
                        child: {
                            h: true,
                            s: true,
                            l: true,
                        }
                    },
                    hsv: {
                        name: "HSB",
                        type: "multi_select",
                        state: false,
                        child: {
                            h: true,
                            s: true,
                            v: true,
                        }
                    },
                    hwb: {
                        name: "HWB",
                        type: "multi_select",
                        state: false,
                        child: {
                            h: true,
                            w: true,
                            b: true,
                        }
                    },
                    rgb: {
                        name: "RGB",
                        type: "multi_select",
                        state: true,
                        child: {
                            r: true,
                            g: true,
                            b: true,
                        }
                    },
                    labPs: {
                        name: "Lab",
                        type: "multi_select",
                        state: false,
                        child: {
                            l: true,
                            a: true,
                            b: true,
                        }
                    },
                    xyz: {
                        name: "XYZ",
                        type: "multi_select",

                        state: false,
                        child: {
                            x: true,
                            y:true,
                            z: true,
                        }
                    },
                    more: {
                        type: "multi_select",
                        state: true,
                        hr: true,
                        child: {
                            rgba: true,
                            rgb: false,
                            hex: true,
                            int: false,

                        }
                    },
                    setting: {
                        name: "更多设置",
                        type: "select",
                        state: false,

                    },
                },
                o_uppercase: false,
                o_time_defer: 0,
                positon_style: {"top": "10px", "left": "20px"},
                positon_style_int: {"top": 10, "left": 20},
                mouse_start_X: 0,
                mouse_start_Y: 0,
                o_window_X: 0,
                o_window_Y: 0,

            }
        },
        methods: {
            click_ok: function ()
            {
                this.callback_confirm(this.ichi_color);
                this.end_func();
            },
            click_cancel: function ()
            {
                this.callback_reject();
                this.end_func();
            },
            main_box_mousedown: function (e)
            {
                console.log("main_box_mousedown",
                        ARR.hasMember(e.target.classList, "color-picker") || ARR.hasMember(e.target.classList, " color-input-box")
                        , e.target.classList)

                if (ARR.hasMember(e.target.classList, "color-picker") || ARR.hasMember(e.target.classList, " color-input-box"))
                {
                    this.o_mouseIsDown = true;
                    this.mouse_start_X = e.pageX;
                    this.mouse_start_Y = e.pageY;
                    this.o_window_X = this.positon_style_int["left"]
                    this.o_window_Y = this.positon_style_int["top"]

                    window.addEventListener('mousemove', this.main_box_hold_mouse)
                    window.addEventListener('mouseup', this.main_box_hold_mouse_end)


                }
            },
            main_box_hold_mouse: function (e)
            {
                var moveOffsetX = e.pageX - this.mouse_start_X;
                var moveOffsetY = e.pageY - this.mouse_start_Y;

                this.positon_style_int["top"] = this.o_window_Y + moveOffsetY;
                this.positon_style_int["left"] = this.o_window_X + moveOffsetX;
                this.positon_style["top"] = this.positon_style_int["top"] + "px";
                this.positon_style["left"] = this.positon_style_int["left"] + "px";

//                console.log("moveOffsetX", moveOffsetX, "moveOffsetY", moveOffsetY)
            },
            main_box_hold_mouse_end: function (e)
            {
                window.removeEventListener('mousemove', this.main_box_hold_mouse)
                window.removeEventListener('mouseup', this.main_box_hold_mouse_end)
            }

        },
        components: {
            "color-range": ColorRange,
            "color-map": ColorMap,
            "menu-box": Menu
        }
    }
</script>
