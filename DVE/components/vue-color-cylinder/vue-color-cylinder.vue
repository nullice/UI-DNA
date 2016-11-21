<template>

    <div class="vue-color-cylinder-main-box">

        <div class="color-hsl">
            <div class="saturation-lighteness-picker-board"></div>
            <div class="hue-picker">
                <color-range v-bind:in_value.sync="color1.hsl.h" range_title="H" value_type="hsl.h"> </color-range>
            </div>
        </div>

        <div class="color-rgb"></div>

        <!--<pre> {{color1|json 4}}</pre>-->
    </div>

</template>
<style lang="scss">

    .vue-color-cylinder-main-box {
        position: absolute;
        width: 240px;
        height: 250px;
        background: #fff;
        z-index: 22;
        border-radius: 4px;
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
        padding: 10px;
        box-sizing: border-box;
    }


</style>
<script>
    import  IchiColor  from "./../../Caryon/IchiColor/ichi-color.js";
    import  ColorRNA  from  "./../../Caryon/IchiColor/lib/ColorRNA.js";
    import  ColorRange from "./lib/color-range.vue"


    export default{
        props: ['in_color',],
        data(){
            return {
                msg: 'hello vue',
                color1: IchiColor("#f00")
            }
        },
        components: {
            "color-range": ColorRange
        }
    }
</script>
