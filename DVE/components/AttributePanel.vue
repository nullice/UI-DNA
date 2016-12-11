<template>

    <debug-microscope>测试用</debug-microscope>

    <a-area area_title="UI-DNA 属性" area_id="attr_panel">
        <div class="exmo_btn_group" data-toggle="buttons">
            <input type="checkbox" v-model="tagsActive.position"
                   name="group1" id="option1" autocomplete="off" checked>
            <label class="btn btn_primary" for="option1" title="{{'位置' |lang}}"
                   v-on:contextmenu.prevent="onlySelect('position')">
                <span><i class="icon-enlarge icon_position "></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.shape"
                   name="group1" id="option2" autocomplete="off">
            <label class="btn btn_primary " for="option2" title="{{'形状' |lang}}"
                   v-on:contextmenu.prevent="onlySelect('shape')">
                <span><i class="icon-sampler-graphics icon_shape"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.text"
                   name="group1" id="option3" autocomplete="off" checked>
            <label class="btn btn_primary " for="option3" title="{{'文字' |lang}}"
                   v-on:contextmenu.prevent="onlySelect('text')">
                <span><i class="icon-sampler-charStyle"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.smartobject" id="option4" autocomplete="off">
            <label class="btn btn_primary" for="option4" title="{{'智能对象' |lang}}">
                <span><i class="icon-layer-smartobject"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.style" id="option5" autocomplete="off">
            <label class="btn btn_primary" for="option5" title="{{'图层样式' |lang}}">
                <span><i class="icon-libraries-addLayerStyle"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.more" id="option6" autocomplete="off">
            <label class="btn btn_primary" for="option6" title="{{'自定义' |lang}}">
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

            <select-input block="true" default_value="0"
                          v-bind:value.sync="Gob.position.$anchor"
                          v-bind:select_style="{width:'24px'}"
                          v-bind:options="o_positon_anchor_options"
                          in_class="position_anchor"
            >
            </select-input>
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

            <!--<vue-color-cylinder></vue-color-cylinder>-->

            <attr-textarea name_html="<i class='icon-file-text'></i>" v-bind:edit_value.sync="Gob.text.text"
                           v-bind:out_value.sync="Gob.text.assignment.text"
                           v-bind:enable_assign.sync="Gob.text.enableAssigns.text"
                           v-bind:enable_formula.sync="Gob.text.$enableFormula"
            ></attr-textarea>

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
        margin-bottom: 1px !important;
        display: inline-block !important;
    }

    i.icon_more {
        margin-bottom: 1px;
        display: inline-block;
    }

    .tag-position.trans-fade-transition {
        height: 130px;

    }

    .attr_select.position_anchor {
        margin-left: 161px;
    }

    .option_list.position_anchor {
        margin-left: -63px;
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
    import AttrSelect from "./AttributePanel_select.vue"
    import SelectInput from "./AttributePanel_selectInput.vue"
    import AttrTextarea from "./AttributePanel_textarea.vue"
    import VueColorCylinder from "./vue-color-cylinder/vue-color-cylinder.vue"
    import DebugPanel from "./DebugPanel.vue"

    //import CompA from '../components/A.vue'

    export default {
        methods: {
            onlySelect: function (tagName)
            {
                for (var x in this.tagsActive)
                {

                    if (x == tagName)
                    {
                        this.tagsActive[x] = true;
                    } else
                    {
                        this.tagsActive[x] = false;
                    }

                }
                return false;
            }

        },
        data(){
            return {
                Gob: Gob,
                tagsActive: setSystem.attArea.tagsActive,
                o_value: "",
                o_positon_anchor_options: [
                    {
                        value: '0',
                        label_html: '<i class="icon-reference-tl" style="font-size: 21px;">',
                        label: "",
                        selected: true,
                    },
                    {
                        value: '1',
                        label_html: '<i class="icon-reference-tm" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '2',
                        label_html: '<i class="icon-reference-tr" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        hr: true,
                    },
                    {
                        value: '3',
                        label_html: '<i class="icon-reference-cl " style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '4',
                        label_html: '<i class="icon-reference-cm" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '5',
                        label_html: '<i class="icon-reference-cr" style="font-size: 21px;">',
                        label: ''
                    }, {

                        hr: true,
                    },
                    {
                        value: '6',
                        label_html: '<i class="icon-reference-bl" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '7',
                        label_html: '<i class="icon-reference-bm" style="font-size: 21px;">',
                        label: ''
                    }
                    ,
                    {
                        value: '8',
                        label_html: '<i class="icon-reference-br" style="font-size: 21px;">',
                        label: ''
                    }

                ]


            }
        },
        components: {
            "value-input": ValueInput,
            "a-area": Area,
            "attr-select": AttrSelect,
            "select-input": SelectInput,
            "attr-textarea": AttrTextarea,
            "vue-color-cylinder": VueColorCylinder,
            "debug-microscope":DebugPanel
//        "comp-a":ValueInput
        }
    };

</script>
