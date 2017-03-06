<template>

    <debug-microscope>测试用</debug-microscope>
    <!---->
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
            <label class="btn btn_primary" title="{{'位置' |lang}}"
                   v-on:contextmenu.prevent="selectOnce('position')"
                   v-on:click="onlySelect('position')">
                <span><i class="icon-enlarge icon_position "></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.shape"
                   name="group1" id="option2" autocomplete="off">
            <label class="btn btn_primary " title="{{'形状' |lang}}"
                   v-on:contextmenu.prevent="selectOnce('shape')"
                   v-on:click="onlySelect('shape')">
                <span><i class="icon-sampler-graphics icon_shape"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.text"
                   name="group1" id="option3" autocomplete="off" checked>
            <label class="btn btn_primary " title="{{'文字' |lang}}"
                   v-on:contextmenu.prevent="selectOnce('text')"
                   v-on:click="onlySelect('text')">

                <span><i class="icon-sampler-charStyle"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.smartobject" id="option4" autocomplete="off">
            <label class="btn btn_primary" title="{{'智能对象' |lang}}"
                   v-on:contextmenu.prevent="selectOnce('smartobject')"
                   v-on:click="onlySelect('smartobject')">
                <span><i class="icon-layer-smartobject"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.style" id="option5" autocomplete="off">
            <label class="btn btn_primary" title="{{'图层样式' |lang}}"
                   v-on:contextmenu.prevent="selectOnce('style')"
                   v-on:click="onlySelect('style')">
                <span><i class="icon-libraries-addLayerStyle"></i></span>
            </label>

            <input type="checkbox" v-model="tagsActive.more" id="option6" autocomplete="off">
            <label class="btn btn_primary" title="{{'自定义' |lang}}"
                   v-on:contextmenu.prevent="selectOnce('more')"
                   v-on:click="onlySelect('more')">

                <span><i class="icon-cog icon_more"></i></span>
            </label>

        </div>

        <div class="tag-box tag-position" v-show="tagsActive.position" v-bind:class="{active:tagsActive.position}"
             transition="trans-fade">
            <h3><span> {{'位置' |lang}} </span></h3>
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
                          v-bind:list_style="{width:'147px'}"
                          v-bind:options="o_positon_anchor_options"
                          in_class="position_anchor"
            >
            </select-input>
            <!--<comp-a></comp-a>-->
        </div>

        <div class="tag-box tag-shape" v-show="tagsActive.shape" v-bind:class="{active:tagsActive.shape, 'advance_on':o_advance_shape}"
             transition="trans-fade">
            <h3><span> {{'形状' |lang}} </span></h3>
            <color-input v-bind:name="Lang.from('填充')"
                         v-bind:title="Lang.from('填充')"
                         v-bind:out_value.sync="Gob.shape.assignment.fillColor"
                         v-bind:enable_assign.sync="Gob.shape.enableAssigns.fillColor"
                         v-bind:color.sync="Gob.shape.fillColor"
                         v-bind:color_names="['shape','fillColor']"
                         v-bind:color_enable.sync="Gob.shape.fillColorEnabled"

                         mini="true"
            ></color-input>


            <color-input v-bind:name="Lang.from('描边')"
                         v-bind:title="Lang.from('描边')"
                         v-bind:out_value.sync="Gob.shape.assignment.strokeColor"
                         v-bind:enable_assign.sync="Gob.shape.enableAssigns.strokeColor"
                         v-bind:color.sync="Gob.shape.strokeColor"
                         v-bind:color_names="['shape','strokeColor']"
                         v-bind:color_enable.sync="Gob.shape.strokeColorEnabled"

                         mini="true"
            ></color-input>


            <value-input v-bind:name="Lang.from('线宽')"
                         v-bind:title="Lang.from('描边宽度')"
                         v-bind:edit_value.sync="Gob.shape.lineWidth"
                         v-bind:out_value.sync="Gob.shape.assignment.lineWidth"
                         v-bind:enable_assign.sync="Gob.shape.enableAssigns.lineWidth"
                         v-bind:assist_range_max="10"
                         mini="true"></value-input>

            <value-input v-bind:name="Lang.from('虚线')"
                         v-bind:title="Lang.from('虚线设置')"
                         v-bind:edit_value.sync="Gob.shape.dashSet"
                         v-bind:out_value.sync="Gob.shape.assignment.dashSet"
                         v-bind:enable_assign.sync="Gob.shape.enableAssigns.dashSet"
                         mini="true"></value-input>


            <br>
            <input type="checkbox" id="advance_2" autocomplete="off"  v-model="o_advance_shape">
            <label class="btn btn_primary" title="{{'高级' |lang}}"
                   for="advance_2">
                <span><i class="select_triangle_icon icon-play3"></i><span class="text">{{'高级' |lang}}</span></span>
            </label>
            <div class="advance_box">

                <select-input v-bind:block="false" default_value=""
                              v-bind:name="Lang.from('对齐')"
                              v-bind:title="Lang.from('描边对齐')"
                              v-bind:value.sync="Gob.shape.lineAlignment"
                              v-bind:select_style="{width:'64px'}"
                              v-bind:list_style="{width:'132px'}"
                              v-bind:options="o_shape_lineAlignment_options"
                              in_class="text_line_alignment"
                >

                    <value-input v-bind:name="Lang.from('对齐')"
                                 v-bind:title="Lang.from('描边对齐')"
                                 v-bind:edit_value.sync="Gob.shape.lineAlignment"
                                 v-bind:out_value.sync="Gob.shape.assignment.lineAlignment"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.lineAlignment"
                                 mini="true"
                    ></value-input>

                </select-input>


                <select-input v-bind:block="false" default_value=""
                              v-bind:name="Lang.from('端点')"
                              v-bind:title="Lang.from('描边端点')"
                              v-bind:value.sync="Gob.shape.lineCapType"
                              v-bind:select_style="{width:'64px'}"
                              v-bind:list_style="{width:'132px'}"
                              v-bind:options="o_shape_lineCapType_options"
                              in_class="text_line_cap_type"
                >
                    <value-input v-bind:name="Lang.from('端点')"
                                 v-bind:title="Lang.from('描边端点')"
                                 v-bind:edit_value.sync="Gob.shape.lineCapType"
                                 v-bind:out_value.sync="Gob.shape.assignment.lineCapType"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.lineCapType"
                                 mini="true"
                    ></value-input>
                </select-input>

                <select-input v-bind:block="false" default_value=""
                              v-bind:name="Lang.from('角点')"
                              v-bind:title="Lang.from('描边角点')  "
                              v-bind:value.sync="Gob.shape.lineJoinType"
                              v-bind:select_style="{width:'64px'}"
                              v-bind:list_style="{width:'132px'}"
                              v-bind:options="o_shape_lineJoinType_options"
                              in_class="text_line_cap_type"
                >
                    <value-input v-bind:name="Lang.from(Lang.from('角点'))"
                                 v-bind:title="Lang.from('描边角点')"
                                 v-bind:edit_value.sync="Gob.shape.lineJoinType"
                                 v-bind:out_value.sync="Gob.shape.assignment.lineJoinType"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.lineJoinType"
                                 mini="true"
                    >
                    </value-input>
                </select-input>


                <div><br>
                    <div class="exmo_box_name">圆角弧度</div>
                </div>
                <div>
                    <value-input v-bind:name="Lang.from('右上')"
                                 v-bind:title="Lang.from('右上')"
                                 v-bind:edit_value.sync="Gob.shape.radian.topRight"
                                 v-bind:out_value.sync="Gob.shape.assignment.radian.topLeft"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.radian.topLeft"
                                 mini="true"></value-input>

                    <value-input v-bind:name="Lang.from('左上')"
                                 v-bind:title="Lang.from('左上')"
                                 v-bind:edit_value.sync="Gob.shape.radian.topLeft"
                                 v-bind:out_value.sync="Gob.shape.assignment.radian.topLeft"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.radian.topLeft"
                                 mini="true"></value-input>

                    <value-input v-bind:name="Lang.from('右下')"
                                 v-bind:title="Lang.from('右下')"
                                 v-bind:edit_value.sync="Gob.shape.radian.bottomRight"
                                 v-bind:out_value.sync="Gob.shape.assignment.radian.bottomRight"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.radian.bottomRight"
                                 mini="true"></value-input>

                    <value-input v-bind:name="Lang.from('左下')"
                                 v-bind:title="Lang.from('左下')"
                                 v-bind:edit_value.sync="Gob.shape.radian.bottomLeft"
                                 v-bind:out_value.sync="Gob.shape.assignment.radian.bottomLeft"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.radian.bottomLeft"
                                 mini="true"></value-input>
                </div>

                <div>
                    <div><br>
                        <div class="exmo_box_name">形状位置</div>
                    </div>
                    <value-input v-bind:name="Lang.from('X')"
                                 v-bind:title="Lang.from('X')"
                                 v-bind:edit_value.sync="Gob.shape.shapeSize.x"
                                 v-bind:out_value.sync="Gob.shape.assignment.shapeSize.x"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.shapeSize.x"
                                 v-bind:mini="true"></value-input>

                    <value-input v-bind:name="Lang.from('Y')"
                                 v-bind:title="Lang.from('Y')"
                                 v-bind:edit_value.sync="Gob.shape.shapeSize.y"
                                 v-bind:out_value.sync="Gob.shape.assignment.shapeSize.y"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.shapeSize.y"
                                 v-bind:mini="true"></value-input>


                    <value-input v-bind:name="Lang.from('H')"
                                 v-bind:title="Lang.from('H')"
                                 v-bind:edit_value.sync="Gob.shape.shapeSize.h"
                                 v-bind:out_value.sync="Gob.shape.assignment.shapeSize.h"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.shapeSize.h"
                                 v-bind:mini="true"></value-input>


                    <value-input v-bind:name="Lang.from('W')"
                                 v-bind:title="Lang.from('W')"
                                 v-bind:edit_value.sync="Gob.shape.shapeSize.w"
                                 v-bind:out_value.sync="Gob.shape.assignment.shapeSize.w"
                                 v-bind:enable_assign.sync="Gob.shape.enableAssigns.shapeSize.w"
                                 v-bind:mini="true"></value-input>

                </div>

            </div>













            <!--"-->
        </div>


        <div class="tag-box tag-text" v-show="tagsActive.text" v-bind:class="{active:tagsActive.text, 'advance_on':o_advance_text}"
             transition="trans-fade">
            <h3><span> {{'文本' |lang}} </span></h3>

            <!--<vue-color-cylinder></vue-color-cylinder>-->
            <color-input v-bind:name="Lang.from('颜色')"
                         v-bind:title="Lang.from('颜色')"
                         v-bind:out_value.sync="Gob.text.assignment.color"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.color"
                         v-bind:color.sync="Gob.text.color"
                         v-bind:color_names="['text','color']"
                         mini="true"
            ></color-input>


            <value-input v-bind:name="Lang.from('字体')"
                         v-bind:title="Lang.from('字体')"
                         v-bind:edit_value.sync="Gob.text.fontPostScriptName"
                         v-bind:out_value.sync="Gob.text.assignment.fontPostScriptName"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.fontPostScriptName"
            ></value-input>


            <value-input v-bind:name="Lang.from('尺寸')"
                         v-bind:title="Lang.from('字体尺寸')"
                         v-bind:edit_value.sync="Gob.text.size"
                         v-bind:out_value.sync="Gob.text.assignment.size"
                         v-bind:enable_assign.sync="Gob.text.enableAssigns.size"
                         v-bind:assist_range_max="128"
                         mini="true"></value-input>

            <attr-textarea name_html="<i class='icon-file-text'></i>" v-bind:edit_value.sync="Gob.text.text"
                           v-bind:out_value.sync="Gob.text.assignment.text"
                           v-bind:enable_assign.sync="Gob.text.enableAssigns.text"
                           v-bind:enable_formula.sync="Gob.text.$enableTextFormula"
            ></attr-textarea>


            <input type="checkbox" id="advance_1" autocomplete="off" v-model="o_advance_text">
            <label class="btn btn_primary" title="{{'高级' |lang}}"
                   for="advance_1">
                <span><i class="select_triangle_icon icon-play3"></i><span class="text">{{'高级' |lang}}</span></span>
            </label>
            <div class="advance_box">


                <value-input v-bind:name="Lang.from('粗体')"
                             v-bind:title="Lang.from('仿粗体')"
                             v-bind:edit_value.sync="Gob.text.bold"
                             v-bind:out_value.sync="Gob.text.assignment.bold"
                             v-bind:enable_assign.sync="Gob.text.enableAssigns.bold"
                             v-bind:assist_type="'boolean'"
                             mini="true"></value-input>

                <value-input v-bind:name="Lang.from('斜体')"
                             v-bind:title="Lang.from('仿斜体')"
                             v-bind:edit_value.sync="Gob.text.italic"
                             v-bind:out_value.sync="Gob.text.assignment.italic"
                             v-bind:enable_assign.sync="Gob.text.enableAssigns.italic"
                             v-bind:assist_type="'boolean'"
                             mini="true"></value-input>


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


                <value-input v-bind:name="Lang.from('基线')"
                             v-bind:title="Lang.from('基线偏移')"
                             v-bind:edit_value.sync="Gob.text.baselineShift"
                             v-bind:out_value.sync="Gob.text.assignment.baselineShift"
                             v-bind:enable_assign.sync="Gob.text.enableAssigns.baselineShift"
                             mini="true"></value-input>

                <select-input v-bind:block="false" default_value=""
                              v-bind:name="Lang.from('模式')"
                              v-bind:title="Lang.from('图层抗锯齿模式')"
                              v-bind:value.sync="Gob.text.antiAlias"
                              v-bind:select_style="{width:'64px'}"
                              v-bind:options="o_text_antiAlias_options"
                              in_class="text_antiAlias"
                >
                    <value-input v-bind:name="Lang.from('模式')"
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
                    <value-input v-bind:name="Lang.from('划线')"
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
                    <value-input v-bind:name="Lang.from('对齐')"
                                 v-bind:edit_value.sync="Gob.text.justification"
                                 v-bind:out_value.sync="Gob.text.assignment.justification"
                                 v-bind:enable_assign.sync="Gob.text.enableAssigns.justification"
                                 mini="true"></value-input>
                </select-input>

            </div>


        </div>


        <div class="tag-box tag-smartobject" v-show="tagsActive.smartobject"
             v-bind:class="{active:tagsActive.smartobject}"
             transition="trans-fade">
            <h3><span> {{'智能对象' |lang}} </span></h3>

            <div class="attr-checkbox">
                <label class="exmo_checkbox">
                    <input type="checkbox"
                           v-model:value="Gob.smartObject.linked">
                    <div class="exmo_checkbox_shadow"></div>
                    {{'链接对象' | lang}}
                </label>
            </div>

            <value-input v-bind:name="Lang.from('路径')"
                         v-bind:title="Lang.from('链接对象路径')"
                         v-bind:edit_value.sync="Gob.smartObject.link"
                         v-bind:out_value.sync="Gob.smartObject.assignment.link"
                         v-bind:enable_assign.sync="Gob.smartObject.enableAssigns.link"
                         v-bind:assist_type="'path'"
            ></value-input>

            <value-input v-bind:name="Lang.from('名称')"
                         v-bind:readonly="true"
                         v-bind:title="Lang.from('链接对象名称（只读）')"
                         v-bind:edit_value="Gob.smartObject.fileReference"
                         v-bind:out_value.sync="Gob.smartObject.assignment.fileReference"
                         v-bind:enable_assign.sync="Gob.smartObject.enableAssigns.fileReference"
            ></value-input>

            <!--<code>{{Gob.smartObject|json}}</code>-->
        </div>

        <div class="tag-box tag-style" v-show="tagsActive.style" v-bind:class="{active:tagsActive.style}"
             transition="trans-fade">
            <h3><span> {{'阴影' |lang}} </span></h3>

            <value-input v-bind:name="Lang.from('X')"
                         v-bind:title="Lang.from('阴影水平偏移')"
                         v-bind:edit_value.sync="Gob.quickEffect.dropShadow.x"
                         v-bind:out_value.sync="Gob.quickEffect.assignment.dropShadow.x"
                         v-bind:enable_assign.sync="Gob.quickEffect.enableAssigns.dropShadow.x"
                         mini="true"
            ></value-input>

            <value-input v-bind:name="Lang.from('Y')"
                         v-bind:title="Lang.from('阴影垂直偏移')"
                         v-bind:edit_value.sync="Gob.quickEffect.dropShadow.y"
                         v-bind:out_value.sync="Gob.quickEffect.assignment.dropShadow.y"
                         v-bind:enable_assign.sync="Gob.quickEffect.enableAssigns.dropShadow.y"
                         mini="true"
            ></value-input>

            <value-input v-bind:name="Lang.from('大小')"
                         v-bind:title="Lang.from('阴影大小')"
                         v-bind:edit_value.sync="Gob.quickEffect.dropShadow.blur"
                         v-bind:out_value.sync="Gob.quickEffect.assignment.dropShadow.blur"
                         v-bind:enable_assign.sync="Gob.quickEffect.enableAssigns.dropShadow.blur"
                         mini="true"
            ></value-input>

            <value-input v-bind:name="Lang.from('扩展')"
                         v-bind:title="Lang.from('扩展半径')"
                         v-bind:edit_value.sync="Gob.quickEffect.dropShadow.spread"
                         v-bind:out_value.sync="Gob.quickEffect.assignment.dropShadow.spread"
                         v-bind:enable_assign.sync="Gob.quickEffect.enableAssigns.dropShadow.spread"
                         mini="true"
            ></value-input>

            <color-input v-bind:name="Lang.from('颜色')"
                         v-bind:title="Lang.from('阴影颜色')"
                         v-bind:out_value.sync="Gob.quickEffect.assignment.dropShadow.color"
                         v-bind:enable_assign.sync="Gob.quickEffect.enableAssigns.dropShadow.color"
                         v-bind:color.sync="Gob.quickEffect.dropShadow.color"
                         v-bind:opacity.sync="Gob.quickEffect.dropShadow.opacity"
                         v-bind:color_names="['quickEffect','dropShadow','color']"
                         mini="true"
            ></color-input>


            <value-input v-bind:name=""
                         v-bind:title="Lang.from('阴影不透明度')"
                         name_html="<i class='icon-uniE9B5'></i>"
                         v-bind:edit_value.sync="Gob.quickEffect.dropShadow.opacity"
                         v-bind:out_value.sync="Gob.quickEffect.assignment.dropShadow.opacity"
                         v-bind:enable_assign.sync="Gob.quickEffect.enableAssigns.dropShadow.opacity"
                         mini="true"
            ></value-input>

            <h3><span> {{'图层样式' |lang}} </span></h3>
            <value-input v-bind:name="Lang.from('全部')"
                         v-bind:title="Lang.from('全部图层样式')"
                         v-bind:edit_value.sync="Gob.quickEffect.copyEffect_All"
                         v-bind:out_value.sync="Gob.quickEffect.assignment.copyEffect_All"
                         v-bind:enable_assign.sync="Gob.quickEffect.enableAssigns.copyEffect_All"

            ></value-input>

        </div>

        <div class="tag-box tag-more" v-show="tagsActive.more" v-bind:class="{active:tagsActive.more}"
             transition="trans-fade">

            <h3><span> {{'信息' |lang}} </span></h3>
            <value-input v-bind:name="Lang.from('名称')"
                         v-bind:title="Lang.from('图层名称')"
                         v-bind:edit_value.sync="Gob.more.layerName"
                         v-bind:out_value.sync="Gob.more.assignment.layerName"
                         v-bind:enable_assign.sync="Gob.more.enableAssigns.layerName"
            ></value-input>

            <select-input v-bind:block="false" default_value=""
                          v-bind:name="Lang.from('颜色')"
                          v-bind:title="Lang.from('图层备注颜色')"
                          v-bind:value.sync="Gob.more.layerColor"
                          v-bind:select_style="{width:'30px'}"
                          v-bind:options="o_more_layercolor_options"
                          in_class="namegroup"
            >
                <value-input v-bind:name="Lang.from('')"
                             v-bind:title="Lang.from('图层备注颜色')"
                             v-bind:edit_value.sync="Gob.more.layerColor"
                             v-bind:out_value.sync="Gob.more.assignment.layerColor"
                             v-bind:enable_assign.sync="Gob.more.enableAssigns.layerColor"
                             mini="true"></value-input>

            </select-input>


            <h3><span> {{'外观' |lang}} </span></h3>
            <value-input v-bind:name=""
                         v-bind:title="Lang.from('图层不透明度')"
                         name_html="<i class='icon-uniE9B5'></i>"
                         v-bind:edit_value.sync="Gob.more.opacity"
                         v-bind:out_value.sync="Gob.more.assignment.opacity"
                         v-bind:enable_assign.sync="Gob.more.enableAssigns.opacity"
                         mini="true"
            ></value-input>

            <value-input v-bind:name="Lang.from('填充')"
                         v-bind:title="Lang.from('填充不透明度')"
                         v-bind:edit_value.sync="Gob.more.fillOpacity"
                         v-bind:out_value.sync="Gob.more.assignment.fillOpacity"
                         v-bind:enable_assign.sync="Gob.more.enableAssigns.fillOpacity"
                         mini="true"
            ></value-input>


            <select-input v-bind:block="false" default_value=""
                          v-bind:name="Lang.from('混合')"
                          v-bind:title="Lang.from('图层混合模式')"
                          v-bind:value.sync="Gob.more.mode"
                          v-bind:select_style="{width:'64px'}"
                          v-bind:options="o_more_mode_options"
                          in_class="text_antiAlias"
            >
                <value-input v-bind:name="Lang.from('锯齿')"
                             v-bind:edit_value.sync="Gob.more.mode"
                             v-bind:out_value.sync="Gob.more.assignment.mode"
                             v-bind:enable_assign.sync="Gob.more.enableAssigns.mode"
                             mini="true"></value-input>
            </select-input>


            <div class="attr-checkbox">
                <label class="exmo_checkbox">
                    <input type="checkbox"
                           v-model:value="Gob.more.visible">
                    <div class="exmo_checkbox_shadow"></div>
                    {{'图层可视' | lang}}
                </label>
            </div>


            <h3><span> {{'自定义' |lang}} </span></h3>

            <value-input v-bind:name="Lang.from('标签')"
                         v-bind:title="Lang.from('自定义标签')"
                         v-bind:edit_value.sync="Gob.more.$tags"
                         v-bind:out_value.sync="Gob.more.assignment.$tags"
                         v-bind:enable_assign.sync="Gob.more.enableAssigns.$tags"
            ></value-input>

            <value-input v-bind:name="Lang.from('别名')"
                         v-bind:title="Lang.from('图层别名')"
                         v-bind:edit_value.sync="Gob.more.$alias"
                         v-bind:out_value.sync="Gob.more.assignment.$alias"
                         v-bind:enable_assign.sync="Gob.more.enableAssigns.$alias"
            ></value-input>


            <select-input v-bind:block="false" default_value=""
                          v-bind:name="Lang.from('名组')"
                          v-bind:title="Lang.from('名称组')"
                          v-bind:value.sync="o_show_name_group"
                          v-bind:select_style="{width:'30px'}"
                          v-bind:options="o_more_namegroup_options"
                          in_class="namegroup"
            >

            </select-input>
            <div>
                <value-input
                        v-show="o_show_name_group == 0"
                        v-bind:name="Lang.from('0')"
                        v-bind:title="Lang.from('名称组0')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup0"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup0"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup0"
                ></value-input>

                <value-input
                        v-show="o_show_name_group == 1"
                        v-bind:name="Lang.from('1')"
                        v-bind:title="Lang.from('名称组1')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup1"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup1"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup1"
                ></value-input>
                <value-input
                        v-show="o_show_name_group == 2"
                        v-bind:name="Lang.from('2')"
                        v-bind:title="Lang.from('名称组2')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup2"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup2"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup2"
                ></value-input>
                <value-input
                        v-show="o_show_name_group == 3"
                        v-bind:name="Lang.from('3')"
                        v-bind:title="Lang.from('名称组3')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup3"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup3"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup3"
                ></value-input>
                <value-input
                        v-show="o_show_name_group == 4"
                        v-bind:name="Lang.from('4')"
                        v-bind:title="Lang.from('名称组4')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup4"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup4"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup4"
                ></value-input>
                <value-input
                        v-show="o_show_name_group == 5"
                        v-bind:name="Lang.from('5')"
                        v-bind:title="Lang.from('名称组5')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup5"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup5"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup5"
                ></value-input>
                <value-input
                        v-show="o_show_name_group == 6"
                        v-bind:name="Lang.from('6')"
                        v-bind:title="Lang.from('名称组6')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup6"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup6"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup6"
                ></value-input>
                <value-input
                        v-show="o_show_name_group == 7"
                        v-bind:name="Lang.from('7')"
                        v-bind:title="Lang.from('名称组7')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup7"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup7"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup7"
                ></value-input>
                <value-input
                        v-show="o_show_name_group == 8"
                        v-bind:name="Lang.from('8')"
                        v-bind:title="Lang.from('名称组8')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup8"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup8"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup8"
                ></value-input>
                <value-input
                        v-show="o_show_name_group == 9"
                        v-bind:name="Lang.from('9')"
                        v-bind:title="Lang.from('名称组9')"
                        v-bind:edit_value.sync="Gob.more.$nameGroup9"
                        v-bind:out_value.sync="Gob.more.assignment.$nameGroup9"
                        v-bind:enable_assign.sync="Gob.more.enableAssigns.$nameGroup9"
                ></value-input>
            </div>


        </div>


    </a-area>
</template>

<style lang="scss" rel="stylesheet/scss">

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
        margin-bottom: 28px;

    }

    .attr_select.position_anchor {
        margin-left: 161px;
    }

    .option_list.position_anchor {
        margin-left: -63px;
    }

    .tag-text.trans-fade-transition {
        height: 260px;
        &.advance_on
        {
            height: 500px;
        }

    }


    .tag-shape.trans-fade-transition {
        height: 155px;
        &.advance_on
        {
            height: 500px;
        }
    }

    .tag-style.trans-fade-transition {
        height: 250px;

    }

    .tag-more.trans-fade-transition {
        height: 450px;

    }

    .exmo_area.attr_panel {
        overflow: visible;
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
    .attr_select.text_justification i {
        font-size: 16px !important;
    }

    .attr-checkbox {
        margin-left: 4px;
        margin-top: 16px;
    }

    .advance_box {
        overflow: hidden;
    }

    input[id^="advance"]:checked + label + .advance_box {
        max-height: 999px;
        transition: all .2s;
        overflow: visible;
    }

    input[id^="advance"] + label + .advance_box {
        max-height: 0px;
        transition: all .3s;
    }

    input[id^="advance"] + label {
        position: absolute;
        right: 20px;
    }

    input[id^="advance"] + label span.text {
        font-size: 12px;
        margin-left: 5px;
    }

    input[id^="advance"] + label i.select_triangle_icon.icon-play3 {
        font-size: 11px !important;
        color: #666 !important;
        transform: rotate(90deg);
        display: inline-block;
    }

    input[id^="advance"]:checked + label i.select_triangle_icon.icon-play3 {
        transform: rotate(-90deg);
    }

    input[id^="advance"] {
        height: 0;
        width: 0;
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

        ready: function ()
        {
            console.log("--------------readyreadyreadyready--------------------")
        },
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
            },
            selectOnce: function (tagName)
            {
                this.tagsActive[tagName] = !this.tagsActive[tagName];
            }

        },
        data(){
            return {
                Gob: Gob,
                tagsActive: setSystem.ui.panel.main.tagsActive,
                UI_model: UI_model,
                Lang: Lang,
                o_value: "",
                o_show_name_group: 0,
                o_advance_shape:false,
                o_advance_text:false,
                o_advance_more:false,
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
                o_text_justification_options: [
                    {value: 'left', label_html: "<i class='icon-text-left'>"},
                    {value: 'center', label_html: "<i class='icon-text-center'>"},
                    {value: 'right', label_html: "<i class='icon-text-right'>"},
                    {br: true},
                    {value: 'justifyLeft', label_html: "<i class='icon-text-justified-left'>"},
                    {value: 'justifyAll', label_html: "<i class='icon-text-justified'>"},
                    {value: 'justifyRight', label_html: "<i class='icon-text-justified-right'>"},
                ],

                o_shape_lineAlignment_options: [
                    {value: 'strokeStyleAlignInside', label: Lang.from('内部')},
                    {value: 'strokeStyleAlignCenter', label: Lang.from('中间')},
                    {value: 'strokeStyleAlignOutside', label: Lang.from('外部')},
                ],
                o_shape_lineCapType_options: [
                    {value: 'strokeStyleButtCap', label: Lang.from('断面')},
                    {value: 'strokeStyleRoundCap', label: Lang.from('圆端')},
                    {value: 'strokeStyleSquareCap', label: Lang.from('平端')},
                ],
                o_shape_lineJoinType_options: [
                    {value: 'strokeStyleMiterJoin', label: Lang.from('直角')},
                    {value: 'strokeStyleRoundJoin', label: Lang.from('圆角')},
                    {value: 'strokeStyleBevelJoin', label: Lang.from('斜削')},
                ],
                o_more_mode_options: [
                    {value: 'normal', label: Lang.from('正常')},
                    {value: 'darken', label: Lang.from('变暗')},
                    {hr: true},
                    {value: 'dissolve', label: Lang.from('溶解')},
                    {value: 'multiply', label: Lang.from('正片叠底')},
                    {value: 'colorBurn', label: Lang.from('色彩加深')},
                    {value: 'linearBurn', label: Lang.from('线性加深')},
                    {value: 'darkerColor', label: Lang.from('深色')},
                    {hr: true},
                    {value: 'lighten', label: Lang.from('变亮')},
                    {value: 'screen', label: Lang.from('滤色')},
                    {value: 'colorDodge', label: Lang.from('色彩减淡')},
                    {value: 'linearDodge', label: Lang.from('线性减淡')},
                    {value: 'lighterColor', label: Lang.from('浅色')},
                    {hr: true},
                    {value: 'overlay', label: Lang.from('叠加')},
                    {value: 'softLight', label: Lang.from('柔光')},
                    {value: 'hardLight', label: Lang.from('强光')},
                    {value: 'vividLight', label: Lang.from('亮光')},
                    {value: 'linearLight', label: Lang.from('线性光')},
                    {value: 'pinLight', label: Lang.from('点光')},
                    {value: 'hardMix', label: Lang.from('实色混合')},
                    {hr: true},
                    {value: 'difference', label: Lang.from('差值')},
                    {value: 'exclusion', label: Lang.from('排除')},
                    {value: 'blendSubtraction', label: Lang.from('减去')},
                    {value: 'blendDivide', label: Lang.from('划分')},
                    {hr: true},
                    {value: 'hue', label: Lang.from('色相')},
                    {value: 'saturation', label: Lang.from('饱和度')},
                    {value: 'color', label: Lang.from('颜色')},
                    {value: 'luminosity', label: Lang.from('明度')},
                ],
                o_more_namegroup_options: [
                    {value: '0', label: setSystem.ui.panel.main.nameGroupTitle[0]},
                    {value: '1', label: setSystem.ui.panel.main.nameGroupTitle[1]},
                    {value: '2', label: setSystem.ui.panel.main.nameGroupTitle[2]},
                    {value: '3', label: setSystem.ui.panel.main.nameGroupTitle[3]},
                    {value: '4', label: setSystem.ui.panel.main.nameGroupTitle[4]},
                    {value: '5', label: setSystem.ui.panel.main.nameGroupTitle[5]},
                    {value: '6', label: setSystem.ui.panel.main.nameGroupTitle[6]},
                    {value: '7', label: setSystem.ui.panel.main.nameGroupTitle[7]},
                    {value: '8', label: setSystem.ui.panel.main.nameGroupTitle[8]},
                    {value: '9', label: setSystem.ui.panel.main.nameGroupTitle[9]},
                ],
                o_more_layercolor_options: [
                    {value: 'none', label: Lang.from('无')},
                    {value: 'red', label: Lang.from('红色')},
                    {value: 'orange', label: Lang.from('橙色')},
                    {value: 'yellowColor', label: Lang.from('橙色')},
                    {value: 'grain', label: Lang.from('绿色')},
                    {value: 'blue', label: Lang.from('蓝色')},
                    {value: 'violet', label: Lang.from('紫色')},
                    {value: 'gray', label: Lang.from('灰色')},

                ],


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
