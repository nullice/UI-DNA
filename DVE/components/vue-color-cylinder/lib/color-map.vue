<template>
    <div class="color-map" v-bind:class="{'hsl':(value_type=='hsl') }">
        <div class="picker-map-box" v-on:click="map_select($event)">
            <div class="map-thumb" v-bind:style="mapThumbMapStyle"
                 v-on:mousedown="thumb_map_mousedown($event)"
                 v-on:mouseup="thumb_map_mouseup($event)"
            ></div>

            <div class="picker-map-background-s"
                 v-bind:style="pickerMapStyle_s"></div>
            <div class="picker-map-background-l"
                 v-bind:style="pickerMapStyle_l"></div>
            <div class="picker-map-background-h"
                 v-bind:style="pickerMapStyle_h"></div>
        </div>
    </div>


</template>
<style lang="scss">
    .color-map {
        &.hsl {
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
                    top: 10px;
                    left: 20px;
                    border-radius: 10px;
                    border: 2px solid #fff;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.39);
                }

                .picker-map-background-h, .picker-map-background-s, .picker-map-background-l {
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

                .picker-map-background-l {
                    background: linear-gradient(0deg, #000, transparent);
                    z-index: 3;
                }

            }

        }

    }


</style>
<script>

    export default{
        props: ['in_value', 'in_value2', 'value_type', 'edit_color'],
        data(){
            return {
                mouse_offset: 0,
                mouse_start: 0,
                offsetX: 0,
                offsetY: 0,
                mouse_startX: 0,
                mouse_startY: 0,

                mapThumbMapStyle: {
                    left: "0px",
                    right:"0px"
                },

                pickerMapStyle_s:{
                    background:""
                },
                pickerMapStyle_l:{
                    background:""
                },

                pickerMapStyle_h:{
                    background:""``
                }

            }
        },
        components: {}
    }
</script>
