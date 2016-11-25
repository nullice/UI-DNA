<template>
    <div class="color-range" v-bind:class="{'hue':(value_type=='hsl.h'||value_type=='hsv.h'||value_type=='hwb.h') }">

        <div v-if="value_type=='hsl.sl'" class="picker-map" v-on:click="map_select($event)">
            <div class="picker-map-background-s"
                 v-bind:style="pickerMapStyle_s"></div>
            <div class="picker-map-background-l"
                 v-bind:style="pickerMapStyle_l"></div>
            <div class="picker-map-background-h"
                 v-bind:style="pickerMapStyle_h"></div>
        </div>

        <template v-else>
            <div class="range-bar">
                <div class="range-thumb" v-bind:style="rangeThumbStyle"
                     v-on:mousedown="thumb_mousedown($event)"
                     v-on:mouseup="thumb_mouseup($event)"
                ></div>

                <div class="range-bar-background" v-on:click="range_select($event)"
                     v-bind:style="rangeBarStyle"></div>
            </div>
            <div class="range-title">{{range_title}}</div>
            <div class="range-input">
                <input type="text" v-model="in_value"
                       v-on:mousewheel="mousewheel($event)">
                <div class="spin-button">
                    <div v-on:click="in_value++" class="spin-up"><i class="icon-dropdown-arrow"></i></div>
                    <div v-on:click="in_value--" class="spin-down"><i class="icon-dropdown-arrow"></i></div>
                </div>
            </div>
        </template>
    </div>

</template>
<style lang="scss">


    .color-range .range-bar-background {
        width: 100%;
        height: 100%;
        border-radius: 2px;
    }

    .color-range.hue .range-bar-background {
        background: linear-gradient(90deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);

    }



    .color-range {
        white-space: nowrap;
        &:active {
            cursor: default;
        }
        .range-bar {
            display: inline-block;
            height: 10px;
            min-width: 140px;
            background: #3b3b3b;
            position: relative;
            cursor: default;
            border-radius: 4px;

            &:active {
                cursor: default;
            }
            .range-thumb {
                width: 4px;
                height: 10px;
                background: #fff;
                position: absolute;
                top: 0px;
                bottom: 0px;
                left: 0px;
                margin: auto;
                border-radius: 1px;
                box-shadow: 0 0px 2px rgba(0, 0, 0, 0.42);
                outline: none;
                border: 2px solid #fff;
                background: rgba(255, 255, 255, 0);
                -webkit-user-select: none;
                margin-left: -3px;
                z-index: 2;
            }
        }

        .range-title {
            display: inline-block;
            position: relative;
            font-size: 12px;
            color: #6F6F6F;
            padding: 0 0 0 10px;
        }
        .range-input {
            width: 54px;
            display: inline-block;
            position: relative;

            &:hover .spin-button {
                opacity: 1;
                transition: .5s all;
            }
            .spin-button {
                display: inline-block;
                width: 16px;
                height: 20px;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                opacity: 0;
                padding-bottom: 6px;
                .spin-up, .spin-down {
                    font-size: 8px;
                    color: #888;
                    text-align: center;
                    padding: 1px 2px;
                    border-radius: 2px;
                }
                .spin-up {
                    i {
                        display: inline-block;
                        transform: scaleY(-1);
                    }
                }

                .spin-up:hover, .spin-down:hover {
                    background: rgba(17, 17, 17, 0.09);
                    color: #3c72e1;
                }


            }

            input {
                width: 44px;
                outline: none;
                -webkit-user-select: none;
                border: none;
                border-bottom: 1px solid #adadad;
                color: #292929;
                background: rgba(255, 255, 255, 0);
                padding: 4px 0px;
                margin: 4px 6px;
                width: 44px;
                min-width: 10px;
                font-size: 13px;

                &:focus {
                    border-bottom: 1px solid #1e76e3;
                }
            }
        }

        .picker-map {

            position: absolute;
            width: 100%;
            height: 60px;
            top: 0;
            right: 0;
            border-radius: 4px 4px 0 0;

            .picker-map-background-h ,.picker-map-background-s, .picker-map-background-l
            {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            .picker-map-background-h
            {
                background: #ff944a;
                z-index: 1;
            }

            .picker-map-background-s
            {
                background: linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
                z-index: 2;
            }

            .picker-map-background-l
            {
                background: linear-gradient(0deg,#000,transparent);
                z-index: 3;
            }

        }
    }
</style>
<script>

    export default{
        props: ['in_value', 'in_value2', 'range_title', 'value_type', 'edit_color'],
        watch: {
            'in_value': function (val)
            {
                console.log("watch:in_value:", val, Number.isNaN(val))
                if (typeof val != 'number' || Number.isNaN(val))
                {
                    val = +val;
                    this.in_value = val;
                }

                if (this.value_type == "hsl.h" || this.value_type == "hsv.h" || this.value_type == "hwb.h")
                {
                    if (val > 360)
                    {
                        this.in_value = 360;
                    }
                    if (val < 0)
                    {
                        this.in_value = 0;
                    }

                    if (this.o_set_once)
                    {
                        this.o_set_once = false;
                        if (this.value_type == "hsl.h")
                        {
                            this.edit_color.hsl.h = this.in_value;
                        }
                        else if (this.value_type == "hsv.h")
                        {
                            this.edit_color.hsv.h = this.in_value;

                        } else if (this.value_type == "hwb.h")
                        {
                            this.edit_color.hwb.h = this.in_value;
                        }
                    }

                }
                else if (this.value_type == "hsl.s" || this.value_type == "hsl.l" || this.value_type == "hsv.s" || this.value_type == "hsv.v"
                        || this.value_type == "hwb.w" || this.value_type == "hwb.b")
                {
                    if (val > 100)
                    {
                        this.in_value = 100;
                    }
                    if (val < 0)
                    {
                        this.in_value = 0;
                    }

                    if (this.o_set_once)
                    {
                        this.o_set_once = false;
                        if (this.value_type == "hsl.s")
                        {
                            this.edit_color.hsl.s = this.in_value;
                        }
                        else if (this.value_type == "hsl.l")
                        {
                            this.edit_color.hsl.l = this.in_value;
                        }
                        else if (this.value_type == "hsv.s")
                        {
                            this.edit_color.hsv.s = this.in_value;
                        }
                        else if (this.value_type == "hsv.v")
                        {
                            this.edit_color.hsv.v = this.in_value;
                        }
                        else if (this.value_type == "hwb.w")
                        {
                            this.edit_color.hwb.w = this.in_value;
                        }
                        else if (this.value_type == "hwb.b")
                        {
                            this.edit_color.hwb.b = this.in_value;
                        }

                    }
                }
                else if (this.value_type[0] == 'r')
                {
                    if (val > 255)
                    {
                        this.in_value = 255;
                    }
                    if (val < 0)
                    {
                        this.in_value = 0;
                    }
                    if (this.o_set_once)
                    {
                        this.o_set_once = false;
                        if (this.value_type == "rgb.r")
                        {
                            this.edit_color.r = this.in_value;
                        }
                        else if (this.value_type == "rgb.g")
                        {
                            this.edit_color.g = this.in_value;
                        }
                        else if (this.value_type == "rgb.b")
                        {
                            this.edit_color.b = this.in_value;
                        }
                    }
                }


                this.range_thumb_value2offset();
            },

            'edit_color.int': function (val)
            {

                console.log('edit_color', this.value_type, val, "edit_color:", this.edit_color.rgba)

                this.update_refer_color();
            }

        },
        ready: function ()
        {
            this.range_thumb_value2offset();
            this.update_refer_color();
        },
        data(){
            return {
                msg: 'hello vue',
                width: 140,
                offset: 0,
                mouse_offset: 0,
                mouse_start: 0,
                rangeThumbStyle: {
                    left: "0px",
                    transition: "none",//"0.1s all"
                    background: "#000"
                },
                rangeBarStyle: {
                    "-webkit-filter": "none",
                    background: ""
                },
                o_mouseIsDown: false,
                o_set_once: false,
                o_temp_color: new window.IchiColor({h: 0, s: 100, l: 50})

            }
        },
        methods: {
            range_select: function (e)
            {
                if (e.target.className != "range-bar-background")
                {
                    return false;
                }

                this.rangeThumbStyle.transition = "0.1s all";

                console.log("layerX", e.layerX, " e.layery", e.layerY)
                console.log(e)
                var offsetX = e.layerX
                var width = e.target.offsetWidth
                this.width = width

                if (offsetX < 4)
                {
                    offsetX = 0;
                }
                if (offsetX > width - 4)
                {
                    offsetX = width;
                }

                this.range_thumb_offset2value(offsetX, width)
//                this.range_thumb_value2offset();

                var self = this;
                setTimeout(function ()
                {
                    self.rangeThumbStyle.transition = "none";
                }, 100)
            },
            range_thumb_offset2value: function (offsetX, width)
            {
                if (this.value_type == "hsl.h" || this.value_type == "hsv.h" || this.value_type == "hwb.h")
                {
                    var z = ( offsetX / width) * 360;
                }
                else if (this.value_type == "hsl.s" || this.value_type == "hsl.l" || this.value_type == "hsv.v"
                        || this.value_type == "hsv.s" || this.value_type == "hwb.w" || this.value_type == "hwb.b"
                )
                {
                    var z = ( offsetX / width) * 100;
                }
                else if (this.value_type[0] == "r")
                {
                    var z = ( offsetX / width) * 255;
                }


                z = Math.floor(z)
                this.set_color();
                this.in_value = z;
                console.log("offset2value" + this.value_type, z, "in_value:", this.in_value, "edit_color", this.edit_color.rgba)
            },

            range_thumb_value2offset: function ()
            {
                console.log(this.value_type, this.edit_color.rgba)
                if (this.value_type == "hsl.h" || this.value_type == "hsv.h" || this.value_type == "hwb.h")
                {
                    var offsetX = this.in_value * this.width / 360;
                }
                else if (this.value_type == "hsl.s" || this.value_type == "hsl.l" || this.value_type == "hsv.s"
                        || this.value_type == "hsv.v" || this.value_type == "hwb.w" || this.value_type == "hwb.b")
                {
                    var offsetX = this.in_value * this.width / 100;
                }
                else if (this.value_type[0] == "r")
                {
                    var offsetX = this.in_value * this.width / 255;
                }


                if (offsetX > this.width - 5)
                {
                    this.rangeThumbStyle.left = offsetX - 5 + "px";
                    this.offset = offsetX - 5;
                }
                else if (offsetX < 4)
                {
                    this.rangeThumbStyle.left = 1 + "px";
                    this.offset = 1;
                }
                else
                {
                    this.rangeThumbStyle.left = offsetX + "px";
                    this.offset = offsetX;
                }


                console.log("value2offset" + this.value_type, "in_value:", this.in_value, "offset", offsetX, "edit_color", this.edit_color.rgba)
            },
            thumb_mousedown: function (e)
            {
                this.o_mouseIsDown = true;
                this.mouse_offset = e.pageX;
                this.mouse_start = this.offset;

//                console.log("mouseDown", e)
                window.addEventListener('mousemove', this.thumb_hold_mouse)
                window.addEventListener('mouseup', this.thumb_hold_mouse_end)
            },
            thumb_mouseup: function (e)
            {
                this.o_mouseIsDown = false;
//                console.log("mouseUp", e);
            },
            thumb_hold_mouse: function (e)
            {
                var moveOffset = e.pageX - this.mouse_offset;

                this.range_thumb_offset2value(this.mouse_start + moveOffset, this.width);
//                console.log("thumb_hold_mouse", moveOffset, e);
            },
            thumb_hold_mouse_end: function (e)
            {
//                console.log("thumb_hold_mouse_end", e)
                window.removeEventListener('mousemove', this.thumb_hold_mouse)
                window.removeEventListener('mouseup', this.thumb_hold_mouse_end)
            },
            mousewheel: function (e)
            {
//                console.log(e)
                var offset = (e.wheelDelta / 120) / 5;

                if (offset < 1 && offset > 0)
                {
                    offset = 1;
                }
                if (offset > -1 && offset < 0)
                {
                    offset = -1;
                }

                if (e.altKey)
                {
                    offset = offset * 10;
                }
                this.set_color();
                this.in_value += offset;
            },
            update_refer_color: function ()
            {

                if (this.value_type == "hsl.h" || this.value_type == "hsv.h" || this.value_type == "hwb.h")
                {
                    this.o_temp_color.hsl.h = this.in_value;
                    this.o_temp_color.hsl.s = this.edit_color.hsl.s;
                    this.o_temp_color.hsl.l = this.edit_color.hsl.l;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;


                    var brightness = (this.o_temp_color.hsl.l / 50);
                    var saturation = (this.o_temp_color.hsl.s / 100);
                    this.rangeBarStyle["-webkit-filter"] = `brightness(${brightness}) saturate(${saturation})`

//                    console.log(' update_refer_color : hsl.h)', this.rangeThumbStyle.background)

                }
                else if (this.value_type == "hsl.s")
                {
                    this.o_temp_color.hsl.h = this.edit_color.hsl.h;
                    this.o_temp_color.hsl.s = 0;
                    this.o_temp_color.hsl.l = this.edit_color.hsl.l;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.hsl.s = 100;
                    var colorHex1 = this.o_temp_color.hex;

                    this.o_temp_color.hsl.h = this.edit_color.hsl.h;
                    this.o_temp_color.hsl.s = this.in_value;
                    this.o_temp_color.hsl.l = this.edit_color.hsl.l;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;

                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 100%)`;
                }
                else if (this.value_type == "hsl.l")
                {
                    this.o_temp_color.hsl.h = this.edit_color.hsl.h;
                    this.o_temp_color.hsl.s = this.edit_color.hsl.s;
                    this.o_temp_color.hsl.l = this.in_value;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;

                    this.o_temp_color.hsl.h = this.edit_color.hsl.h;
                    this.o_temp_color.hsl.s = this.edit_color.hsl.s;
                    this.o_temp_color.hsl.l = 0;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.hsl.l = 50;
                    var colorHex1 = this.o_temp_color.hex;
                    this.o_temp_color.hsl.l = 100;
                    var colorHex2 = this.o_temp_color.hex;

                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 50%,${colorHex2} 100% )`;
                }
                else if (this.value_type == "rgb.r")
                {
                    this.o_temp_color.r = 0;
                    this.o_temp_color.g = this.edit_color.g;
                    this.o_temp_color.b = this.edit_color.b;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.r = 255;
                    var colorHex1 = this.o_temp_color.hex;
                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 100%)`;

                    this.o_temp_color.r = this.in_value;
                    this.o_temp_color.g = this.edit_color.g;
                    this.o_temp_color.b = this.edit_color.b;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;
                }
                else if (this.value_type == "rgb.g")
                {
                    this.o_temp_color.r = this.edit_color.g;
                    this.o_temp_color.g = 0
                    this.o_temp_color.b = this.edit_color.b;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.g = 255;
                    var colorHex1 = this.o_temp_color.hex;
                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 100%)`;

                    this.o_temp_color.r = this.edit_color.g;
                    this.o_temp_color.g = this.in_value;
                    this.o_temp_color.b = this.edit_color.b;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;
                }
                else if (this.value_type == "rgb.b")
                {
                    this.o_temp_color.r = this.edit_color.b;
                    this.o_temp_color.g = this.edit_color.g;
                    this.o_temp_color.b = 0;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.b = 255;
                    var colorHex1 = this.o_temp_color.hex;
                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 100%)`;

                    this.o_temp_color.r = this.edit_color.b;
                    this.o_temp_color.g = this.edit_color.g;
                    this.o_temp_color.b = this.in_value;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;
                }
                else if (this.value_type == "hsv.s")
                {
                    this.o_temp_color.hsv.h = this.edit_color.hsv.h;
                    this.o_temp_color.hsv.s = 0;
                    this.o_temp_color.hsv.v = this.edit_color.hsv.v;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.hsv.s = 100;
                    var colorHex1 = this.o_temp_color.hex;

                    this.o_temp_color.hsv.h = this.edit_color.hsv.h;
                    this.o_temp_color.hsv.s = this.in_value;
                    this.o_temp_color.hsv.v = this.edit_color.hsv.v;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;

                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 100%)`;
                }
                else if (this.value_type == "hsv.v")
                {
                    this.o_temp_color.hsv.h = this.edit_color.hsv.h;
                    this.o_temp_color.hsv.s = this.edit_color.hsv.s;
                    this.o_temp_color.hsv.v = 0;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.hsv.v = 100;
                    var colorHex1 = this.o_temp_color.hex;

                    this.o_temp_color.hsv.h = this.edit_color.hsv.h;
                    this.o_temp_color.hsv.s = this.edit_color.hsv.s;
                    this.o_temp_color.hsv.v = this.in_value;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;

                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 100%)`;
                }
                else if (this.value_type == "hwb.w")
                {
                    this.o_temp_color.hwb.h = this.edit_color.hwb.h;
                    this.o_temp_color.hwb.w = 0;
                    this.o_temp_color.hwb.b = this.edit_color.hwb.b;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.hwb.w = 100;
                    var colorHex1 = this.o_temp_color.hex;

                    this.o_temp_color.hwb.h = this.edit_color.hwb.h;
                    this.o_temp_color.hwb.w = this.in_value;
                    this.o_temp_color.hwb.b = this.edit_color.hwb.b;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;

                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 100%)`;
                }
                else if (this.value_type == "hwb.b")
                {
                    this.o_temp_color.hwb.h = this.edit_color.hwb.h;
                    this.o_temp_color.hwb.w = this.edit_color.hwb.w;
                    this.o_temp_color.hwb.b = 0;
                    var colorHex0 = this.o_temp_color.hex;
                    this.o_temp_color.hwb.b = 100;
                    var colorHex1 = this.o_temp_color.hex;

                    this.o_temp_color.hwb.h = this.edit_color.hwb.h;
                    this.o_temp_color.hwb.w = this.edit_color.hwb.w;
                    this.o_temp_color.hwb.b = this.in_value;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;

                    this.rangeBarStyle.background = `linear-gradient(90deg, ${colorHex0} 0, ${colorHex1} 100%)`;
                }
            }
            ,
            set_color: function ()
            {
                this.o_set_once = true;
            }
        }

    }


</script>
