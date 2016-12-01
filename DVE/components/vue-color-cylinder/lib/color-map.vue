<template>
    <div class="color-map" v-bind:class="{'hsv':(value_type=='hsv') }">
        <div class="picker-map-box" v-on:click="map_select($event)">
            <div class="map-thumb" v-bind:style="mapThumbMapStyle"
                 v-on:mousedown="thumb_mousedown($event)"
            ></div>

            <div class="picker-map-background-s"
                 v-bind:style="pickerMapStyle_s"></div>
            <div class="picker-map-background-v"
                 v-bind:style="pickerMapStyle_v"></div>
            <div class="picker-map-background-h"
                 v-bind:style="pickerMapStyle_h"></div>
        </div>
    </div>


</template>
<style lang="scss">
    .color-map {
        cursor: default;
        &.hsv {
            .picker-map-box {
                position: absolute;
                width: 100%;
                height: 60px;
                top: 0;
                right: 0;
                border-radius: 4px 4px 0 0;
                overflow: hidden;

                .map-thumb {
                    width: 5px;
                    height: 5px;
                    position: absolute;
                    background: rgba(0, 0, 0, 0);
                    z-index: 4;
                    bottom: 0px;
                    left: 0px;
                    border-radius: 10px;
                    border: 2px solid #fff;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.39);
                    margin-bottom: -3px;
                    margin-left: -3px;
                    cursor: default;
                }

                .picker-map-background-h, .picker-map-background-s, .picker-map-background-v {
                    position: absolute;
                    width: 100%;
                    height: 100%;

                }
                .picker-map-background-h {
                    background: #ff944a;
                    z-index: 1;
                }

                .picker-map-background-s {
                    background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
                    z-index: 2;
                }

                .picker-map-background-v {
                    background: linear-gradient(0deg, #000, transparent);
                    z-index: 3;
                }

            }

        }

    }


</style>
<script>

    export default{
        ready: function ()
        {
            this.map_thumb_value2offset();
            this.update_refer_color();
        },
        watch: {
            'edit_color.int': function (val)
            {
                this.update_refer_color();
            },
            'in_value': function (val)
            {

                if (this.value_type == "hsv")
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
                        if (this.value_type == "hsv")
                        {
                            this.edit_color.hsv.s = this.in_value;

                        }
                    }
                }

                this.map_thumb_value2offset();
            },
            'in_value2': function (val)
            {

                if (this.value_type == "hsv")
                {
                    if (val > 100)
                    {
                        this.in_value2 = 100;
                    }
                    if (val < 0)
                    {
                        this.in_value2 = 0;
                    }

                    if (this.o_set_once2)
                    {
                        this.o_set_once2 = false;
                        if (this.value_type == "hsv")
                        {
                            this.edit_color.hsv.v = this.in_value2;
                        }
                    }

                }

                this.map_thumb_value2offset();

            }
        },
        props: ['in_value', 'in_value2', 'value_type', 'edit_color'],
        data(){
            return {
                width: 260,
                height: 60,
                mouse_offset: 0,
                mouse_start: 0,
                offsetX: 0,
                offsetY: 0,
                mouse_startX: 0,
                mouse_startY: 0,
                o_set_once: true,
                o_set_once2: true,
                o_mouse_active: false,
                o_temp_color: new window.IchiColor({h: 0, s: 100, l: 50}),
                mapThumbMapStyle: {
                    left: "0px",
                    right: "0px",
                    bottom: "0px"
                },

                pickerMapStyle_s: {
                    background: ""
                },
                pickerMapStyle_v: {
                    background: ""
                },

                pickerMapStyle_h: {
                    background: ""
                }

            }
        },
        methods: {
            map_thumb_value2offset: function ()
            {
//                console.log(this.value_type, this.edit_color.rgba)
                if (this.value_type == "hsv")
                {
                    var offsetX = this.in_value * this.width / 100;
                    var offsetY = this.in_value2 * this.height / 100
                }


                this.mapThumbMapStyle.left = offsetX + "px";
                this.mapThumbMapStyle.bottom = offsetY + "px";
                this.offsetX = offsetX;
                this.offsetY = offsetY;

               console.log("value2offset" + this.value_type, "in_value:", this.in_value, "offsetX", offsetX, "edit_color", this.edit_color.rgba)
            },
            map_thumb_offset2value: function (offsetX, width, offsetY, height)
            {


                if (this.value_type == "hsv")
                {
                    var z1 = ( offsetX / width) * 100; //s
                    var z2 = 100 - ( offsetY / height) * 100; //l

                     if (z1 < 0)
                    {
                        z1 = 0;
                    }
                    if (z2 < 0)
                    {
                        z2 = 0;
                    }
                    if (z1 > 100)
                    {
                        z1 = 100;
                    }
                    if (z2 > 100)
                    {
                        z2 = 100;
                    }
                }


                z1 = Math.floor(z1);
                z2 = Math.floor(z2);
                this.in_value = z1;
                this.in_value2 = z2;
                this.o_set_once = true;
                this.o_set_once2 = true;
                console.log("s:" + z1, "l:" + z2)
            },
            map_select: function (e)
            {
                if (e.target.className == "map-thumb" || this.o_mouse_active)
                {
                    return false;
                }

                var offsetX = e.layerX
                var width = e.target.offsetWidth
                this.width = width

                var offsetY = e.layerY
                var height = e.target.offsetHeight
                this.height = height
                this.map_thumb_offset2value(offsetX, width, offsetY, height)
            },


            thumb_mousedown: function (e)
            {
                this.o_mouse_active = true;
                this.mouse_offsetX = e.pageX;
                this.mouse_startX = this.offsetX;
                this.mouse_offsetY = e.pageY;
                this.mouse_startY = this.height - this.offsetY;

                window.addEventListener('mousemove', this.thumb_hold_mouse)
                window.addEventListener('mouseup', this.thumb_hold_mouse_end)
            },
            thumb_hold_mouse: function (e)
            {
                var moveOffsetX = e.pageX - this.mouse_offsetX;
                var moveOffsetY = e.pageY - this.mouse_offsetY;
                this.map_thumb_offset2value(this.mouse_startX + moveOffsetX, this.width, this.mouse_startY + moveOffsetY, this.height);
            },

            thumb_hold_mouse_end: function (e)
            {
                this.o_mouse_active = false;
                window.removeEventListener('mousemove', this.thumb_hold_mouse)
                window.removeEventListener('mouseup', this.thumb_hold_mouse_end)
            },

            update_refer_color: function ()
            {
                if (this.value_type == "hsv")
                {
                    this.o_temp_color.hsv.h = this.edit_color.hsv.h;
                    this.o_temp_color.hsv.s = 100;
                    this.o_temp_color.hsv.v = 100;
                    this.pickerMapStyle_h.background = this.o_temp_color.hex;

                }
            }

        }
    }
</script>
