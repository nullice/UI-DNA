<template>
    <div class="exmo_area {{o_height_mode}}" v-bind:style="o_fixed_height?o_style_css:null">
        <h2> {{area_title}} </h2>
        <div class="area_tool">
            <input v-model="o_fixed_height" type="checkbox" class="exmo_icon_cheackbox " id="check_btn_{{area_id}}_1"
                   autocomplete="off">
            <label class="exmo_button_icon mini" for="check_btn_{{area_id}}_1"><i
                    class="{{o_fixed_height?'icon-shrink2':'icon-enlarge2'}}"></i></label>
        </div>

        <slot></slot>
    </div>

    <div draggable="true" v-if="o_fixed_height" v-on:dragstart="drag_heigth_start($event)"
         v-on:dragend="drag_heigth_end($event)"
         v-on:drag="drag_heigth($event)"


         class="exmo_drag"></div>
</template>

<script>

    export default {
        props: ['area_title', "area_id", "area_hight"],

        ready: function ()
        {
            if (this["area_hight"] != undefined)
            {
                this.o_height = +this.area_hight;
                this.o_fixed_height = true;
            }
        },

        data(){
            return {
                o_fixed_height: false,
                o_height: 222,
                o_last_offset: 0,
                o_style_css: {
                    height: "223px",
//                    background: "rgba(255, 0, 0, 0.37)"
                },
                o_dragging: false
            }
        },
        computed: {
            o_height_mode: function ()
            {
                if (this.o_fixed_height)
                {
                    return "mod_fixed_height"
                }
                return ""
            }
        },
        methods: {
            drag_heigth: function (e)
            {
                this.o_height += e.screenY - this.o_last_offset;
                this.o_style_css.height = this.o_height + "px";
                this.o_last_offset = e.screenY;
            },
            drag_heigth_start: function (e)
            {

                this.o_last_offset = e.screenY;
                this.o_dragging = true
//                this.o_dragging=false
//
//                window.e = this.o_style_css
//                this.o_height += e.offsetY - this.o_last_offset
//                this.o_last_offset = e.offsetY;
//                this.o_style_css.height = this.o_height + "px";
//                console.log(this.o_height, e)
            }
            ,
            drag_heigth_end: function (e)
            {
                this.o_dragging = false

                console.log(e.screenY, e)
                this.o_height += e.screenY - this.o_last_offset;
                this.o_style_css.height = this.o_height + "px";
//
//                window.e = this.o_style_css
//                this.o_height += e.offsetY - this.o_last_offset
//                this.o_last_offset = e.offsetY;
//                this.o_style_css.height = this.o_height + "px";
//                console.log(this.o_height, e)
            }


        }

    }


</script>

<style lang="scss">


    .exmo_drag {
        background: rgba(255, 0, 0, 0.0);
        height: 6px;
        width: 100%;
        display: block;
        position: relative;
        margin-top: -4px;
        cursor: n-resize;
    }

    .exmo_area {
        position: relative;

    /*transition: all .5s;*/

    &
    .mod_fixed_height {
        /*height: 200px;*/
        overflow: scroll;
        overflow-x: hidden;
    }

    }

    .exmo_area:hover .area_tool {
        display: block;
    }

    .area_tool {
        position: absolute;
        top: 9px;
        right: 10px;
        display: none;

    .exmo_button_icon i {
        color: #ABABAB;

        font-size: 11px;
    }

    .exmo_icon_cheackbox:checked + .exmo_button_icon {
        border: none;
        background: rgba(80, 80, 80, 0.09);
        margin-right: -2px;
    }

    .exmo_button_icon.mini {
        padding: 0 4px;
        padding-bottom: 2px;
    }

    }
</style>


