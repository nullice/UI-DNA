<template>

    <div class="vue-color-cylinder-main-box">

        <div class="color-hsl">
            <div class="saturation-lighteness-picker-board"></div>
            <div class="hue-picker">
                <color-range   v-bind:in_value.sync="color1.r"></color-range>
            </div>
        </div>

        <div class="color-rgb"></div>

        <pre> {{color1|json 4}}</pre>
    </div>

</template>
<style>
    body {
        background-color: #ff0000;
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
