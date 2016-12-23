<template>

    <debug-microscope>测试用</debug-microscope>
    <!---->
    <input type="text" v-model="UI_model.msg_color_picker.color1.color.hex">
    <vue-color-cylinder v-show="UI_model.msg_color_picker.color1.show"
                        v-bind:ichi_color.sync="UI_model.msg_color_picker.color1.color" confirm="true"
                        v-bind:callback_confirm="UI_model.msg_color_picker.color1.callback"
                        v-bind:callback_reject="UI_model.msg_color_picker.color1.callback_reject"
                        v-bind:end_func="UI_model.msg_color_picker.color1.end_func"

    ></vue-color-cylinder>

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
                          v-bind:select_style="{width:'69px'}"
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
            <color-input v-bind:name="Lang.from('颜色')"
                         v-bind:title="Lang.from('颜色')"
                         v-bind:out_value.sync="Gob.text.assignment.color"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.color"
                         v-bind:color.sync="Gob.text.color"
                         mini="true"
            ></color-input>

            <value-input v-bind:name="Lang.from('字体')" v-bind:edit_value.sync="Gob.text.fontPostScriptName"
                         v-bind:out_value.sync="Gob.text.assignment.fontPostScriptName"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.fontPostScriptName"
            ></value-input>

            <value-input v-bind:name="Lang.from('仿粗体')" v-bind:edit_value.sync="Gob.text.bold"
                         v-bind:out_value.sync="Gob.text.assignment.bold"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.bold"
                         mini="true"></value-input>

            <value-input v-bind:name="Lang.from('仿斜体')" v-bind:edit_value.sync="Gob.text.italic"
                         v-bind:out_value.sync="Gob.text.assignment.italic"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.italic"
                         mini="true"></value-input>

            <value-input v-bind:name="Lang.from('字体尺寸')" v-bind:edit_value.sync="Gob.text.size"
                         v-bind:out_value.sync="Gob.text.assignment.size"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.size"
                         mini="true"></value-input>

            <value-input v-bind:name="Lang.from('基线')"
                         v-bind:title="Lang.from('基线偏移')"
                         v-bind:edit_value.sync="Gob.text.baselineShift"
                         v-bind:out_value.sync="Gob.text.assignment.baselineShift"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.baselineShift"
                         mini="true"></value-input>

            <select-input v-bind:block="false" default_value="0"
                          v-bind:name="Lang.from('锯齿')"
                          v-bind:title="Lang.from('下划线')"
                          v-bind:value.sync="Gob.text.antiAlias"
                          v-bind:select_style="{width:'64px'}"
                          v-bind:options="o_text_antiAlias_options"
                          in_class="text_antiAlias"
            >
                <value-input v-bind:name="Lang.from('')"
                             v-bind:edit_value.sync="Gob.text.antiAlias"
                             v-bind:out_value.sync="Gob.text.assignment.antiAlias"
                             v-bind:enable_assign.sync="Gob.text.enableAssigns.antiAlias"
                             mini="true"></value-input>
            </select-input>


            <select-input v-bind:block="false" default_value=""
                          v-bind:name="Lang.from('划线')"
                          v-bind:title="Lang.from('下划线')"
                          v-bind:value.sync="Gob.text.underline"
                          v-bind:select_style="{width:'64px'}"
                          v-bind:options="o_text_underline_options"
                          in_class="text_underline"
            >
                <value-input v-bind:name="Lang.from('')"
                             v-bind:edit_value.sync="Gob.text.underline"
                             v-bind:out_value.sync="Gob.text.assignment.underline"
                             v-bind:enable_assign.sync="Gob.text.enableAssigns.underline"
                             mini="true"></value-input>
            </select-input>


            <select-input v-bind:block="true" default_value=""
                          v-bind:name="Lang.from('对齐')"
                          v-bind:title="Lang.from('段落对齐')"
                          v-bind:value.sync="Gob.text.justification"
                          v-bind:select_style="{width:'64px'}"
                          v-bind:list_style="{width:'132px'}"
                          v-bind:options="o_text_justification_options"
                          in_class="text_justification"
            >
                <value-input v-bind:name="Lang.from('')"
                             v-bind:edit_value.sync="Gob.text.justification"
                             v-bind:out_value.sync="Gob.text.assignment.justification"
                             v-bind:enable_assign.sync="Gob.text.enableAssigns.justification"
                             mini="true"></value-input>


            </select-input>



            <value-input v-bind:name="Lang.from('行距')"
                         v-bind:title="Lang.from('行距')"
                         v-bind:edit_value.sync="Gob.text.leading"
                         v-bind:out_value.sync="Gob.text.assignment.leading"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.leading"
                         mini="true"></value-input>

            <value-input v-bind:name="Lang.from('字距')"
                         v-bind:title="Lang.from('字符间距')"
                         v-bind:edit_value.sync="Gob.text.tracking"
                         v-bind:out_value.sync="Gob.text.assignment.tracking"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.tracking"
                         mini="true"></value-input>



            <value-input v-bind:name="Lang.from('水平')"
                         v-bind:title="Lang.from('水平缩放')"
                         v-bind:edit_value.sync="Gob.text.horizontalScale"
                         v-bind:out_value.sync="Gob.text.assignment.horizontalScale"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.horizontalScale"
                         mini="true"></value-input>

            <value-input v-bind:name="Lang.from('垂直')"
                         v-bind:name="Lang.from('垂直缩放')"
                         v-bind:edit_value.sync="Gob.text.verticalScale"
                         v-bind:out_value.sync="Gob.text.assignment.verticalScale"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.verticalScale"
                         mini="true"></value-input>


            <!--<value-input  -bind:name="Lang.from('仿斜体')" v-bind:edit_value.sync="Gob.position.x"-->
            <!--v-bind:out_value.sync="Gob.position.assignment.x"-->
            <!--v-bind:enable_assign.sync="Gob.position.enableAssigns.x"-->
            <!--mini="true"></value-input>-->
            <!--<value-input  -bind:name="Lang.from('仿斜体')" v-bind:edit_value.sync="Gob.position.x"-->
            <!--v-bind:out_value.sync="Gob.position.assignment.x"-->
            <!--v-bind:enable_assign.sync="Gob.position.enableAssigns.x"-->
            <!--mini="true"></value-input>-->

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

    .tag-text.trans-fade-transition {
        height: 400px;

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

    /*-----*/
    .attr_select.text_justification i{
        font-size: 16px!important;
    }

</style>


<script>

    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import Area from '../components/area.vue';
    import AttrSelect from "./AttributePanel_select.vue"
    import SelectInput from "./AttributePanel_selectInput.vue"
    import AttrTextarea from "./AttributePanel_textarea.vue"
    import VueColorCylinder from "./vue-color-cylinder/vue-color-cylinder.vue"
    import ColorInput from '../components/AttributePanel_color.vue';
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
                UI_model: UI_model,
                Lang: Lang,
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
                        br: true,
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

                        br: true,
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

                ],
                o_text_antiAlias_options: [
                    {value: 'antiAliasNone', label: Lang.from('无')},
                    {value: 'antiAliasSharp', label: Lang.from('锐利')},
                    {value: 'antiAliasCrisp', label: Lang.from('犀利')},
                    {value: 'antiAliasStrong', label: Lang.from('浑厚')},
                    {value: 'antiAliasSmooth', label: Lang.from('平滑')},
                    {hr: true},
                    {value: 'antiAliasPlatformLCD', label: Lang.from('Win LCD')},
                    {value: 'antiAliasPlatformGray', label: Lang.from('Windows')},
                ],

                o_text_underline_options: [
                    {value: 'underlineOff', label: Lang.from('无')},
                    {value: 'underlineOnLeftInVertical', label: Lang.from('下')},
                    {value: 'underlineOnRightInVertical', label: Lang.from('右')},
                ],
                o_text_justification_options:[
                    {value: 'left', label_html: "<i class='icon-text-left'>"},
                    {value: 'center', label_html: "<i class='icon-text-center'>"},
                    {value: 'right', label_html: "<i class='icon-text-right'>"},
                    {br: true},
                    {value: 'justifyLeft', label_html: "<i class='icon-text-justified-left'>"},
                    {value: 'justifyAll', label_html: "<i class='icon-text-justified'>"},
                    {value: 'justifyRight', label_html: "<i class='icon-text-justified-right'>"},
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
            "color-input": ColorInput,
            "debug-microscope": DebugPanel
//        "comp-a":ValueInput
        }
    };

</script>
