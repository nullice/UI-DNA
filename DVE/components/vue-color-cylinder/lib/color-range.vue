<template>
    <div class="color-range">
        <div class="range-title">{{range_title}}</div>
        <div class="range-bar"
             v-on:click="range_select($event)"
        >
            <div class="range-thumb" v-bind:style="rangeThumbStyle"></div>
        </div>
        <div class="range-input">
            <input type="text" v-model="in_value">
            <div class="spin-button">
                <div class="spin-up"></div>
                <div class="spin-down"></div>
            </div>
        </div>

    </div>

    <!--<input type="text" v-model="in_value"> [{{in_value}}],-->
    <button v-on:click="in_value=333"> a d ds</button>
</template>
<style lang="scss">

    .color-range {
        white-space: nowrap;
        .range-bar {
            display: inline-block;
            height: 10px;
            min-width: 140px;
            background: #3b3b3b;
            position: relative;

            .range-thumb {
                width: 4px;
                height: 8px;
                background: #fff;
                position: absolute;
                left: 0px;
                transition: 0.4s all;
                border-radius: 1px;
                margin: 1px 0;

            }
        }

        .range-title {
            display: inline-block;
        }
        .range-input {
            width: 54px;
            display: inline-block;

            input {
                width: 44px;
            }

        }
    }

</style>
<script>

    export default{
        props: ['in_value', 'range_title', 'value_type'],
        data(){
            return {
                msg: 'hello vue',
                width: 140,
                rangeThumbStyle: {
                    left: "0px"
                }

            }
        },
        methods: {
            range_select: function (e)
            {

                console.log("layerX", e.layerX, " e.layery", e.layerY)

                var offsetX = e.layerX
                var width = e.target.offsetWidth
                this.width = width

                if (offsetX < 10)
                {
                    offsetX = 0;
                }
                if (offsetX > width - 10)
                {
                    offsetX = width;
                }


                if (this.value_type == "hsl.h")
                {

                    this.in_value = ( offsetX / width) * 360
                }
                this.ramge_thumb_update();

            },
            ramge_thumb_update: function ()
            {

                var offsetX = this.in_value * this.width / 360
                console.log("offsetX",offsetX)
                if (offsetX > this.width - 5)
                {
                    this.rangeThumbStyle.left = offsetX - 5 + "px";
                }
                else
                {
                    this.rangeThumbStyle.left = offsetX + "px";
                }

            }


        }
    }
</script>
