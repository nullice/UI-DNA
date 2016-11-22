<template>
    <div class="color-range" v-bind:class="{'hue':(value_type=='hsl.h') }">
        <div class="range-title">{{range_title}}</div>
        <div class="range-bar">
            <div class="range-thumb" v-bind:style="rangeThumbStyle"
                 v-on:mousedown="thumb_mousedown($event)"
                 v-on:mouseup="thumb_mouseup($event)"
            ></div>

            <div class="range-bar-background" v-on:click="range_select($event)"></div>
        </div>
        <div class="range-input">
            <input type="text" v-model="in_value" v-on:input="range_thumb_value2offset"
                   v-on:mousewheel="mousewheel($event)">
            <div class="spin-button">
                <div v-on:click="in_value++" class="spin-up"><i class="icon-dropdown-arrow"></i></div>
                <div v-on:click="in_value--" class="spin-down"><i class="icon-dropdown-arrow"></i></div>
            </div>
        </div>
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
            border-radius: 2px;

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
            }
        }

        .range-title {
            display: inline-block;
            position: relative;
            font-size: 12px;
            color: #6F6F6F;
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
    }
</style>
<script>

    export default{
        props: ['in_value', 'range_title', 'value_type', 'edit_color'],
        watch: {
            'in_value': function (val)
            {
                if (typeof val != 'number')
                {
                    val = +val;
                    this.in_value = val;
                }

                if (this.value_type == "hsl.h")
                {
                    if (val > 360)
                    {
                        this.in_value = 360;
                    }
                    if (val < 0)
                    {
                        this.in_value = 0;
                    }
//                    this.rangeThumbStyle['-webkit-filter']=`brightness(.5
                }
                else if (this.value_type == "hsl.s")
                {
                    if (val > 100)
                    {
                        this.in_value = 100;
                    }
                    if (val < 0)
                    {
                        this.in_value = 0;
                    }
                }
            }
        },
        ready: function ()
        {
            this.range_thumb_value2offset();
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
                },
                o_mouseIsDown: false,
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

                this.rangeThumbStyle.transition = "0.2s all";

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
                this.range_thumb_value2offset();
                var self = this;
                setTimeout(function ()
                {
                    self.rangeThumbStyle.transition = "none";
                }, 200)
            },
            range_thumb_offset2value: function (offsetX, width)
            {
                if (this.value_type == "hsl.h")
                {
                    var z = ( offsetX / width) * 360;
                }
                else if (this.value_type == "hsl.s")
                {
                    var z = ( offsetX / width) * 100;
                }

                z = Math.floor(z)
                this.in_value = z;
                console.log(z, this.in_value)
            },
            range_thumb_value2offset: function ()
            {
                if (this.value_type == "hsl.h")
                {
                    var offsetX = this.in_value * this.width / 360;
                    this.o_temp_color.hsl.h = this.in_value;
                    this.o_temp_color.hsl.s = this.edit_color.hsl.s;
                    this.o_temp_color.hsl.l = this.edit_color.hsl.l;
                    this.rangeThumbStyle.background = this.o_temp_color.hex;
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

                return this.in_value
            },
            thumb_mousedown: function (e)
            {
                this.o_mouseIsDown = true;
                this.mouse_offset = e.pageX;
                this.mouse_start = this.offset;

                console.log("mouseDown", e)
                window.addEventListener('mousemove', this.thumb_hold_mouse)
                window.addEventListener('mouseup', this.thumb_hold_mouse_end)
            },
            thumb_mouseup: function (e)
            {
                this.o_mouseIsDown = false;
                console.log("mouseUp", e);
            },
            thumb_hold_mouse: function (e)
            {
                var moveOffset = e.pageX - this.mouse_offset;

                this.range_thumb_offset2value(this.mouse_start + moveOffset, this.width);
                this.range_thumb_value2offset();
                console.log("thumb_hold_mouse", moveOffset, e);
            },
            thumb_hold_mouse_end: function (e)
            {
                console.log("thumb_hold_mouse_end", e)
                window.removeEventListener('mousemove', this.thumb_hold_mouse)
                window.removeEventListener('mouseup', this.thumb_hold_mouse_end)
            },
            mousewheel: function (e)
            {
                console.log(e)
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
                this.in_value += offset;
            }
        }

    }


</script>
