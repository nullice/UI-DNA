<template>

    <a-area area_title="UI-DNA 属性" area_id="attr_panel">
        <div class="exmo_btn_group" data-toggle="buttons">
            <input type="checkbox" v-model="tagsActive.position" name="group1" id="option1" autocomplete="off" checked>
            <label class="btn btn_primary" for="option1" title="{{'位置' |lang}}">
                <span>{{'位置' |lang}}</span>
            </label>

            <input type="checkbox" v-model="tagsActive.shape" name="group1" id="option2" autocomplete="off">
            <label class="btn btn_primary " for="option2">
                <span><i class="icon-xor-intersect"></i></span>
            </label>

            <input type="checkbox" name="group1" id="option3" autocomplete="off">
            <label class="btn btn_primary " for="option3">
                <span><i class="icon-xor-difference"></i></span>
            </label>

            <input type="checkbox" id="option4" autocomplete="off">
            <label class="btn btn_primary" for="option4">
                <span><i class="icon-glyph"></i></span>
            </label>
        </div>

        <div class="tag-box tag-position" v-show="tagsActive.position" v-bind:class="{active:tagsActive.position}"
             transition="trans-fade">
            <h3> {{'位置' |lang}} </h3>
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
    </a-area>
</template>

<style>

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
