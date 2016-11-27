<template>

    <div class="vue-color-cylinder-main-box">

        <div class="color-hsl">
            <div class="saturation-lighteness-picker-board"></div>
            <div class="hue-picker">

                <color-map v-bind:in_value="color1.hsl.s" v-bind:in_value2="color1.hsl.l" value_type="hsl"
                           v-bind:edit_color="color1"></color-map>

                <color-range v-bind:in_value="color1.hsl.h" range_title="H" value_type="hsl.h"
                             v-bind:edit_color="color1"></color-range>
                <color-range v-bind:in_value="color1.hsl.s" range_title="S" value_type="hsl.s"
                             v-bind:edit_color="color1"></color-range>
                <color-range v-bind:in_value="color1.hsl.l" range_title="L" value_type="hsl.l"
                             v-bind:edit_color="color1"></color-range>

                <color-range v-bind:in_value="color1.r" range_title="R" value_type="rgb.r"
                             v-bind:edit_color="color1"></color-range>
                <color-range v-bind:in_value="color1.g" range_title="G" value_type="rgb.g"
                             v-bind:edit_color="color1"></color-range>
                <color-range v-bind:in_value="color1.b" range_title="B" value_type="rgb.b"
                             v-bind:edit_color="color1"></color-range>

                <color-range v-bind:in_value="color1.hsv.h" range_title="H" value_type="hsv.h"
                             v-bind:edit_color="color1"></color-range>
                <color-range v-bind:in_value="color1.hsv.s" range_title="S" value_type="hsv.s"
                             v-bind:edit_color="color1"></color-range>
                <color-range v-bind:in_value="color1.hsv.v" range_title="V" value_type="hsv.v"
                             v-bind:edit_color="color1"></color-range>


                <color-range v-bind:in_value="color1.ex.labPs.l" range_title="L" value_type="labPs.l"
                             v-bind:edit_color="color1"></color-range>
                <color-range v-bind:in_value="color1.ex.labPs.a" range_title="a" value_type="labPs.a"
                             v-bind:edit_color="color1"></color-range>
                <color-range v-bind:in_value="color1.ex.labPs.b" range_title="b" value_type="labPs.b"
                             v-bind:edit_color="color1"></color-range>


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
        </div>

        <div class="color-rgb" style="background:{{color1.hex}}">{{color1.rgba}}</div>

        <!--<pre> {{color1|json 4}}</pre>-->
    </div>

</template>
<style lang="scss">

    .vue-color-cylinder-main-box {
        position: absolute;
        width: 260px;
        height: 250px;
        background: #fff;
        z-index: 22;
        border-radius: 4px;
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
        padding: 10px 15px;
        box-sizing: border-box;
        padding-top: 64px;
    }


</style>
<script>
    import  IchiColor_base  from "./../../Caryon/IchiColor/ichi-color.js";
    import  IchiColor_ex  from "./../../Caryon/IchiColor/ichi-color-extension";
    import  ColorRNA  from  "./../../Caryon/IchiColor/lib/ColorRNA.js";
    import  ColorRange from "./lib/color-range.vue"
    import  ColorMap from "./lib/color-map.vue"
    var IchiColor = IchiColor_ex(IchiColor_base);

    export default{
        props: ['in_color',],
        data(){
            return {
                msg: 'hello vue',
                color1: IchiColor("#f00")
            }
        },
        components: {
            "color-range": ColorRange,
            "color-map": ColorMap
        }
    }
</script>
