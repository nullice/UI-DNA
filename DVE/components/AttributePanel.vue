<template>

    <a-area area_title="UI-DNA 属性" area_id="attr_panel">
        <div class="exmo_btn_group" data-toggle="buttons">
            <input type="checkbox" v-model="tagsActive.position" name="group1" id="option1" autocomplete="off" checked>
            <label class="btn btn_primary" for="option1" title="{{'位置' |lang}}">
                <span><i class="icon-enlarge icon_position "></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.shape" name="group1" id="option2" autocomplete="off">
            <label class="btn btn_primary " for="option2" title="{{'形状' |lang}}">
                <span><i class="icon-sampler-graphics icon_shape"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.text" name="group1" id="option3" autocomplete="off">
            <label class="btn btn_primary " for="option3" title="{{'文字' |lang}}" >
                <span><i class="icon-sampler-charStyle"></i></span>
            </label>

            <input type="checkbox" id="option4" autocomplete="off">
            <label class="btn btn_primary" for="option4"  title="{{'智能对象' |lang}}">
                <span><i class="icon-layer-smartobject"></i></span>
            </label>

            <input type="checkbox" id="option5" autocomplete="off">
            <label class="btn btn_primary" for="option5"  title="{{'图层样式' |lang}}">
                <span><i class="icon-libraries-addLayerStyle"></i></span>
            </label>

            <input type="checkbox" id="option6" autocomplete="off">
            <label class="btn btn_primary" for="option6"  title="{{'自定义' |lang}}">
                <span><i class="icon-cog icon_more"></i></span>
            </label>

        </div>

        <div class="tag-box tag-position" v-show="tagsActive.position" v-bind:class="{active:tagsActive.position}"
             transition="trans-fade">
            <h3> {{'位置' |lang}} </h3>
            <value-input name="X" v-bind:edit_value.sync="Gob.position.x"
                         v-bind:out_value.sync="Gob.position.assignment.x"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.x"
                         mini="true"></value-input>

            <value-input name="Y" v-bind:edit_value.sync="Gob.position.y"
                         v-bind:out_value.sync="Gob.position.assignment.y"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.y"
                         mini="true"></value-input>

            <value-input name="W" v-bind:edit_value.sync="Gob.position.w"
                         v-bind:out_value.sync="Gob.position.assignment.w"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.w"
                         mini="true"></value-input>
            <value-input name="H" v-bind:edit_value.sync="Gob.position.h"
                         v-bind:out_value.sync="Gob.position.assignment.h"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.h"
                         mini="true"></value-input>
            <!--<comp-a></comp-a>-->
        </div>

        <div class="tag-box tag-shape" v-show="tagsActive.shape" v-bind:class="{active:tagsActive.shape}"
             transition="trans-fade">
            <h3> {{'形状' |lang}} </h3>
            <value-input name="X" v-bind:edit_value.sync="Gob.position.x"
                         v-bind:out_value.sync="Gob.position.assignment.x"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.x"></value-input>
            <value-input name="Y" v-bind:edit_value.sync="Gob.position.y"
                         v-bind:out_value.sync="Gob.position.assignment.y"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.y"></value-input>
            <value-input name="W" v-bind:edit_value.sync="Gob.position.w"
                         v-bind:out_value.sync="Gob.position.assignment.w"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.w"></value-input>
            <value-input name="H" v-bind:edit_value.sync="Gob.position.h"
                         v-bind:out_value.sync="Gob.position.assignment.h"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.h"></value-input>
            <!--<comp-a></comp-a>-->
        </div>


        <div class="tag-box tag-text" v-show="tagsActive.text" v-bind:class="{active:tagsActive.text}"
             transition="trans-fade">
            <h3> {{'文本' |lang}} </h3>
            <value-input name="内容" v-bind:edit_value.sync="Gob.position.x"
                         v-bind:out_value.sync="Gob.position.assignment.x"
                         v-bind:enable_assign.sync="Gob.position.enableAssigns.x"></value-input>

        </div>


    </a-area>
</template>

<style lang="scss">

    /*.exmo_area .tag-box{*/
    /*!*display: none;*!*/
    /*opacity: 0;*/
    /*transition: all .5s;*/
    /*}*/
    /*.exmo_area .tag-box.active{*/
    /*!*display: block;*!*/
    /*opacity: 1;*/
    /*transition: all .5s;*/
    /*}*/

    i.icon_position {
        font-size: 11px !important;
        vertical-align: top !important;
        transform: rotate(45deg) !important;
        margin-top: 7px !important;
        display: inline-block !important;
    }
    i.icon_shape {
        margin-bottom: 1px!important;
        display: inline-block!important;
    }

    i.icon_more {
        margin-bottom: 1px;
        display: inline-block;
    }






    .tag-position.trans-fade-transition {
        height: 90px;

    }

    .trans-fade-transition {
        transition: all .3s ease;
        height: 150px;
        opacity: 1;

    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .trans-fade-enter, .trans-fade-leave {
        height: 0;
        opacity: 0;
    }
</style>


<script>

    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import Area from '../components/area.vue';
    //import CompA from '../components/A.vue'

    export default {
        data(){
            return {
                Gob: Gob,
                tagsActive: setSystem.attArea.tagsActive,


            }
        },
        components: {
            "value-input": ValueInput,
            "a-area": Area
//        "comp-a":ValueInput
        }
    };

</script>
