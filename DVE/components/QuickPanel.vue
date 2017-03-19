<link rel="stylesheet" href="../bin/CSS/Vendor/animate.css">
<template>

    <a-area area_title="快捷功能" area_id="quick_panel" v-bind:area_disable_fixbut="true" v-bind:area_opened="true">
        <!--<pre> {{Gob_selectTypes|json}}</pre>-->


        <!--变换-->
        <div class="quick_funcs_box">
            <h4>变换</h4>
            <div class="quick_buts">
                <quick-icon-button v-bind:title="Lang.from('变换平面角度')" name="transform_angle"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.transform_angle"
                                   v-bind:func="func_tansform_anglePanel"
                                   v-bind:func_right="func_tansform_anglePanel_switch">

                    <i class="icon-libraries-addSwatch transform-ap-icon a{{o_tansform_anglePanel}}"></i>
                </quick-icon-button>

                <div class="exmo_inbox inline-icon-input" title="{{'缩放比例'|lang}}">
                    <input type="text" class="exmo_input_text" placeholder="2"
                           v-model="o_tansform_scale_scale">
                </div>

                <quick-icon-button v-bind:title="Lang.from('比例变换')" name="transform_scale"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.transform_scale"
                                   v-bind:func_right="func_tansform_scale_cb"
                                   v-bind:func="func_tansform_scale">

                    <i class="iconfont  icon-jia-yuankuang"></i>
                </quick-icon-button>

                <div class="exmo_inbox inline-icon-input" title="{{'旋转角度'|lang}}">
                    <input type="text" class="exmo_input_text" placeholder="45"
                           v-model="o_tansform_rotation_angle">
                </div>

                <quick-icon-button v-bind:title="Lang.from('旋转图层')" name="transform_rotation"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.transform_rotation"
                                   v-bind:func="func_transform_rotation"
                                   v-bind:func_right="func_transform_rotation_cb">
                    <i class="icon-rotation"></i>
                </quick-icon-button>


            </div>

            <div class="quick_mores">
                <!--变换平面角度-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.transform_angle}">
                    <div class="info">
                        变换平面角度
                    </div>

                    <div class="exmo_inbox " title="为 0 时自动计算">
                        <div class="exmo_box_name">变换角</div>
                        <select class="exmo_select" v-model="o_tansform_anglePanel" style="width: 126px;">
                            <option value="0"> {{"左"|lang}}</option>
                            <option value="1"> {{"右"|lang}}</option>
                        </select>
                    </div>
                </div>

                <!--缩放-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.transform_scale}">

                    <div class="info">左键比例缩放，右键比例倒数缩放</div>
                    <div class="info">
                        <div class="exmo_checkbox">
                            <input type="checkbox" id="quick_tansform_scale1"
                                   v-model="o_tansform_scale_scaleEffect">
                            <div class="exmo_checkbox_shadow"></div>
                            <label for="quick_tansform_scale1">
                                缩放图层样式
                            </label>
                        </div>
                    </div>
                </div>

                <!--旋转-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.transform_rotation}">

                    <div class="info">旋转锚点</div>
                    <select-input block="true" default_value="0"
                                  v-bind:value.sync="o_tansform_rotation_centerState"
                                  v-bind:select_style="{width:'69px'}"
                                  v-bind:list_style="{width:'147px'}"
                                  v-bind:options="o_tansform_rotation_options"
                                  in_class="permute_matrix_anchor"
                    >
                    </select-input>
                    <div class="permute_matrix_anchor_shadw"></div>
                </div>

            </div>
        </div>


        <!--派生-->
        <div class="quick_funcs_box">
            <h4>派生</h4>
            <div class="quick_buts">
                <quick-icon-button v-bind:title="Lang.from('派生一个图层')"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:func="func_derive_copyOnce">
                    <i class="iconfont icon-fuzhi"
                       style="font-size: 15px;line-height: 13px; display: inline-block;margin-bottom: -2px;"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('派生阵列')" name="derive_matrix"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.derive_matrix"
                                   v-bind:func="func_derive_matrix">
                    <i class="iconfont  icon-bk-dot"
                       style="font-size: 13px; display: inline-block;margin-bottom: -2px;"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('派生镜像')" name="derive_mirror"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.derive_mirror"
                                   v-bind:func="func_derive_mirror"
                                   v-bind:func_right="func_derive_mirror_switch"

                >
                    <i class="" style="  font-size: 16px;line-height: 13px;"
                       v-bind:class="{'icon-flip-horizontal':o_derive_mirror_direction==0,  'icon-flip-vertical':o_derive_mirror_direction==1, }"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('派生背板')" name="derive_padding"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.derive_padding"
                                   v-bind:func="func_derive_padding">
                    <i class="iconfont  icon-tuceng"
                       style="  font-size: 16px; line-height: 13px;"></i>
                </quick-icon-button>


                <quick-icon-button v-bind:title="Lang.from('派生长阴影')" name="derive_longShadow"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.derive_longShadow"
                                   v-bind:func="func_derive_longShadow"
                                   v-bind:func_right="func_derive_longShadow_selectDirection"


                >

                    <span class="long-shadow-icon {{'deg'+o_derive_longShadow_direction}}">
                              <i class="icon-diamonds " style="font-size: 13px;line-height: 13px;"
                              ></i>
                    </span>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('派生厚度层')" name="derive_3D_depth"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.derive_3D_depth"
                                   v-bind:func="func_derive_3Ddepth"
                                   v-bind:func_right="func_derive_3D_depth_selectDirection"
                >
                    <i class="iconfont icon-mianfenge derive-3ddepth-icon {{'deg'+o_derive_derive_3D_depth_direction}}"
                       style="  display: inline-block; transition: all .2s;transform: rotate({{o_style_3ddepth_angle}}deg);line-height: 13px; font-size: 14px;"></i>
                </quick-icon-button>





            </div>
            <div class="quick_mores">
                <!--派生阵列-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.derive_matrix}">
                    <div class="info">
                        按指定行列重复复制选中图层并排布 <br><span class="sub"></span>
                    </div>

                    <div class="exmo_inbox min" title="为 0 时自动计算">
                        <div class="exmo_box_name">行数</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_matrix_row"
                        >
                    </div>

                    <div class="exmo_inbox min" title="为 0 时自动计算">
                        <div class="exmo_box_name">列数</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_matrix_col"
                        >
                    </div>

                    <br>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">水平间距</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="0"
                               v-model="o_derive_matrix_dX"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">垂直间距</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="0"
                               v-model="o_derive_matrix_dY"
                        >
                    </div>


                    <div class="exmo_inbox " title="为 0 时自动计算">
                        <div class="exmo_box_name">列数</div>
                        <select class="exmo_select" v-model="o_derive_matrix_rename" style="width: 126px;">
                            <option value="0"> {{"默认"|lang}}</option>
                            <option value="1"> {{"原名 -序号"|lang}}</option>
                            <option value="2"> {{"原名 -行号-列号"|lang}}</option>
                        </select>
                    </div>


                    <div class="info">
                        <div class="exmo_checkbox">
                            <input type="checkbox" id="quick_derive_longShadow4"
                                   v-model="o_derive_matrix_copyDataCaryon">
                            <div class="exmo_checkbox_shadow"></div>
                            <label for="quick_derive_longShadow4">
                                复制 UI-DNA 属性
                            </label>
                        </div>
                    </div>


                </div>

                <!--派生镜像-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.derive_mirror}">
                    <div class="info">
                        镜像方向
                        <div class="inline-but-bar">
                            <input type="radio" class="exmo_icon_cheackbox" id="quick_derive_mirror_01"
                                   value="0" name="group_derive_mirror"
                                   v-model="o_derive_mirror_direction">
                            <label class="exmo_button_icon mini" for="quick_derive_mirror_01">
                                <i class="icon-flip-horizontal"></i></label>

                            <input type="radio" class="exmo_icon_cheackbox" id="quick_derive_mirror_02"
                                   value="1" name="group_derive_mirror"
                                   v-model="o_derive_mirror_direction">
                            <label class="exmo_button_icon mini" for="quick_derive_mirror_02">
                                <i class="icon-flip-vertical"></i></label>
                        </div>
                    </div>

                </div>

                <!--派生长阴影-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.derive_longShadow}">
                    <div class="info">
                        长阴影方向
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">角度</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_longShadow_direction"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="inline-but-bar">
                            <label class="exmo_button_icon mini" v-on:click="func_derive_longShadow_selectDirection">
                                <i class="icon-rotation" style="font-size: 15px;line-height: 15px;"></i>

                            </label>
                        </div>
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">距离</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_longShadow_length"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">不透明度</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_longShadow_opacity"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">渐变</div>
                        <div class="exmo_checkbox">
                            <input type="checkbox" id="quick_derive_longShadow0"
                                   v-model="o_derive_longShadow_effect">
                            <div class="exmo_checkbox_shadow"></div>
                            <label for="quick_derive_longShadow0">
                                启用
                            </label>
                        </div>
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">不栅格化</div>
                        <div class="exmo_checkbox">
                            <input type="checkbox" id="quick_derive_longShadow2"
                                   v-model="o_derive_longShadow_notRezShape">
                            <div class="exmo_checkbox_shadow"></div>
                            <label for="quick_derive_longShadow2">
                                启用
                            </label>
                        </div>
                    </div>

                    <br><br>

                    <div class="info">
                        <span title="派生速度较慢，请谨慎选择距离">拖影*</span>
                        <div class="func_enable">
                            <div class="exmo_checkbox">
                                <input type="checkbox" id="quick_derive_longShadow1"
                                       v-model="o_derive_longShadow_stepByStep">
                                <div class="exmo_checkbox_shadow"></div>
                                <label for="quick_derive_longShadow1">
                                    启用
                                </label>
                            </div>
                        </div>

                        <div v-show="o_derive_longShadow_stepByStep">
                            <div class="exmo_inbox  longtext">
                                <div class="exmo_box_name">初始不透明度</div>
                                <input type="text" class="exmo_input_text"
                                       v-model="o_derive_longShadow_initOpacity"
                                >
                            </div>
                        </div>
                    </div>

                </div>

                <!--派生厚度-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.derive_3D_depth}">
                    <div class="info">
                        厚度层方向
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">角度</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_derive_3D_depth_direction"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="inline-but-bar">
                            <label class="exmo_button_icon mini" v-on:click="func_derive_3D_depth_selectDirection">
                                <i class="icon-rotation" style="font-size: 15px;line-height: 15px;"></i>

                            </label>
                        </div>
                    </div>


                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">距离</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_derive_3D_depth_length"
                        >
                    </div>


                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">平滑斜面</div>
                        <div class="exmo_checkbox">
                            <input type="checkbox" id="quick_derive_longShadow3"
                                   v-model="o_derive_derive_3D_depth_smooth">
                            <div class="exmo_checkbox_shadow"></div>
                            <label for="quick_derive_longShadow3">
                                启用
                            </label>
                        </div>
                    </div>

                    <br>
                    <div class="info">
                        斜面不透明度
                    </div>
                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">顶部</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_derive_3D_depth_topShadowOpacity"
                        >
                    </div>
                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">底部</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_derive_3D_depth_bottomShadowOpacity"
                        >
                    </div>


                </div>

                <!--派生背板-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.derive_padding}">
                    <div class="info">
                        派生一个位于目标底部的背板图层<br><span class="sub">会自动粘贴形状属性</span>
                    </div>
                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">上边距</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_padding_top"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">右边距</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_padding_right"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">下边距</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_padding_bottom"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">左边距</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_padding_left"
                        >
                    </div>


                    <div class="exmo_inbox ">
                        <div class="exmo_box_name">padding</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_derive_padding_padding"
                        >
                    </div>

                </div>


            </div>
        </div>


        <!--排列-->
        <div class="quick_funcs_box">
            <h4>排列</h4>
            <div class="quick_buts">
                <quick-icon-button v-bind:title="Lang.from('间距排列')" name="permute_spacing"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.permute_spacing"
                                   v-bind:func="func_permute_doSpacingGird">
                    <i class="icon-libraries-sortIcons" style="font-size: 13px;"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('网格排列')" name="permute_matrix"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.permute_matrix"
                                   v-bind:func="func_permute_doMatrix">
                    <i class="iconfont icon-duoxuanjuzhen"
                       style="font-size: 13px;margin-bottom: -1px;display: inline-block;"></i>
                </quick-icon-button>


                <quick-icon-button v-bind:title="Lang.from('内边距排列')" name="permute_padding"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.permute_padding"
                                   v-bind:func="func_permute_padding">
                    <i class="iconfont icon-anniu1"
                       style="  font-size: 18px;line-height: 13px;margin-bottom: -2px;display: inline-block;"></i>
                </quick-icon-button>

                <!--<quick-icon-button v-bind:title="Lang.from('更多功能')" name="shape_advance"-->
                <!--v-bind:click_more_func="click_onecMore"-->
                <!--v-bind:more_onoff="more_onoff.shape_advance" v-bind:func="func_shape_shape_advance">-->
                <!--<i class="iconfont  icon-gengduo-shuxiang"></i>-->
                <!--</quick-icon-button>-->

            </div>
            <div class="quick_mores">
                <!--间距排列-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.permute_spacing}">
                    <div class="info">
                        通过指定图层间水平和垂直间距来排列图层 <br><span class="sub">可理解为文本的排列方式</span>
                    </div>
                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">水平间距</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_spacing_dX_calc"
                               v-model="o_permute_spacing_dX"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">垂直间距</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_spacing_dY_calc"
                               v-model="o_permute_spacing_dY"
                        >
                    </div>
                    <br>

                    <div class="exmo_inbox min" title="为 0 时自动计算">
                        <div class="exmo_box_name">行数</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_spacing_row_calc"
                               v-model="o_permute_spacing_row"
                        >
                    </div>

                    <div class="exmo_inbox min" title="为 0 时自动计算">
                        <div class="exmo_box_name">列数</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_spacing_col_calc"
                               v-model="o_permute_spacing_col"
                        >
                    </div>

                    <br>
                    <br>
                    <div class="info">
                        行内垂直对齐方式
                        <div class="inline-but-bar"><input type="radio" class="exmo_icon_cheackbox"
                                                           id="quick_permute_01"
                                                           value="top" name="group_permut_spacing0"
                                                           v-model="o_permute_spacing_inLineAlign">
                            <label class="exmo_button_icon mini" for="quick_permute_01">
                                <i class="icon-align-top"></i></label>

                            <input type="radio" class="exmo_icon_cheackbox" id="quick_permute_02"
                                   value="bottom" name="group_permut_spacing0"
                                   v-model="o_permute_spacing_inLineAlign">
                            <label class="exmo_button_icon mini" for="quick_permute_02">
                                <i class="icon-align-bottom"></i></label>

                            <input type="radio" class="exmo_icon_cheackbox" id="quick_permute_03"
                                   value="vetically" name="group_permut_spacing0"
                                   v-model="o_permute_spacing_inLineAlign">
                            <label class="exmo_button_icon mini" for="quick_permute_03">
                                <i class="icon-align-middle"></i></label></div>
                    </div>


                </div>

                <!--网格排列-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.permute_matrix}">
                    <div class="info">
                        通过指定网格来排列图层<br><span class="sub">图层锚点对齐网格交点</span>
                    </div>
                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">网格宽度</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_spacing_dMxtX_calc"
                               v-model="o_permute_matrix_dX"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">网格高度</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_spacing_dMxtY_calc"
                               v-model="o_permute_matrix_dY"
                        >
                    </div>
                    <br>
                    <div class="exmo_inbox min" title="为 0 时自动计算">
                        <div class="exmo_box_name">行数</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_spacing_row_calc"
                               v-model="o_permute_matrix_row"
                        >
                    </div>

                    <div class="exmo_inbox min" title="为 0 时自动计算">
                        <div class="exmo_box_name">列数</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_spacing_col_calc"
                               v-model="o_permute_matrix_col"
                        >
                    </div>

                    <br>
                    <br>
                    <div class="info">
                        图层对齐网格锚点
                    </div>

                    <select-input block="true" default_value="0"
                                  v-bind:value.sync="o_permute_matrix_anchor"
                                  v-bind:select_style="{width:'69px'}"
                                  v-bind:list_style="{width:'147px'}"
                                  v-bind:options="o_permute_matrix_anchor_options"
                                  in_class="permute_matrix_anchor"
                    >
                    </select-input>
                    <div class="permute_matrix_anchor_shadw"></div>


                </div>

                <!--内边距排列-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.permute_padding}">
                    <div class="info">
                        选定 2 个图层，以上端图层为基准以内边距排列<br><span class="sub">可选多组图层</span>
                    </div>
                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">上边距</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_permute_padding_top"
                               v-bind:placeholder="o_permute_padding_top_calc"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">右边距</div>
                        <input type="text" class="exmo_input_text"
                               v-bind:placeholder="o_permute_padding_right_calc"
                               v-model="o_permute_padding_right"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">下边距</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_permute_padding_bottom"
                               v-bind:placeholder="o_permute_padding_bottom_calc"
                        >
                    </div>

                    <div class="exmo_inbox min">
                        <div class="exmo_box_name">左边距</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_permute_padding_left"
                               v-bind:placeholder="o_permute_padding_left_calc"
                        >
                    </div>


                    <div class="exmo_inbox ">
                        <div class="exmo_box_name">padding</div>
                        <input type="text" class="exmo_input_text"
                               v-model="o_permute_padding_padding"
                        >
                    </div>

                </div>


            </div>
        </div>

        <!--形状-->
        <div v-show="show_shape" class="quick_funcs_box">
            <h4>形状</h4>
            <div class="quick_buts">

                <quick-icon-button v-bind:func="func_shape_combine" v-bind:in_title="Lang.from('合并形状')">
                    <i class="icon-xor-union"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:func=" func_shape_symDifference" v-bind:in_title="Lang.from('形状对称差')">
                    <i class="icon-xor-difference"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:func="func_shape_intersect" v-bind:in_title="Lang.from('形状交集')">
                    <i class="icon-xor-intersect"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:func="func_shape_subtract" v-bind:in_title="Lang.from('减去形状')">
                    <i class="icon-xor-subtract"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('设置圆角')" name="radius"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.radius" v-bind:func="func_shape_radius">
                    <i class="icon-sampler-stroke-swatch"></i>
                </quick-icon-button>

                <quick-icon-button v-bind:title="Lang.from('更多功能')" name="shape_advance"
                                   v-bind:click_more_func="click_onecMore"
                                   v-bind:more_onoff="more_onoff.shape_advance" v-bind:func="func_shape_shape_advance">
                    <i class="iconfont  icon-gengduo-shuxiang"></i>
                </quick-icon-button>

            </div>
            <div class="quick_mores ">
                <!--圆角-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.radius}">
                    <div class="fun_block">
                        <div class="info">
                            设置圆角 {{o_radius_now}}
                        </div>

                        <div class="exmo_inbox">
                            <div class="exmo_box_name">圆角</div>
                            <input type="text" class="exmo_input_text" placeholder="如 2 或 2,2,0,0"
                                   v-model="setSystem.ui.quick.shape_radius"
                                   v-on:input="func_shape_radius">
                        </div>
                    </div>

                    <!--路径角变换-->
                    <div class="fun_block">
                        <div class="info">
                            <span title="此功能封装自 David Jensen（photoshopscripts.wordpress.com）的脚本：Photoshop Corner Editor 1.0.6">路径角变换*</span>
                            <span v-show="setSystem.ui.quick.shape_enable_curnerEditor">  <br> 使用前先用
                                <span class="click-text"
                                      v-on:click='selectTool("pathComponentSelectTool")'>
                                    路径选择工具</span>  选中形状
                            </span>

                            <div class="func_enable">
                                <div class="exmo_checkbox">
                                    <input type="checkbox" id="cablece1"
                                           v-model="setSystem.ui.quick.shape_enable_curnerEditor">
                                    <div class="exmo_checkbox_shadow"></div>
                                    <label for="cablece1">
                                        启用
                                    </label>
                                </div>
                            </div>

                        </div>

                        <div v-show="setSystem.ui.quick.shape_enable_curnerEditor">
                            <div class="exmo_inbox">
                                <div class="exmo_box_name">圆角参数</div>
                                <input type="text" class="exmo_input_text" placeholder="如 2 或 2,2,0,0 或 2,3 5,3"
                                       v-model="o_shape_cornerEditor_radiiTxt">
                            </div>


                            <div class="exmo_inbox">
                                <div class="exmo_box_name">圆角模式</div>
                                <div class="exmo_radio">
                                    <input type="radio" id="cmethod0" value="0" name="group_corner_method"
                                           v-model="o_shape_cornerEditor_cornerMethod0">
                                    <div class="exmo_radio_shadow"></div>

                                    <label for="cmethod0">
                                        半径
                                    </label>
                                </div>

                                <div class="exmo_radio">
                                    <input type="radio" id="cmethod1" name="group_corner_method" value="1"
                                           v-model="o_shape_cornerEditor_cornerMethod0">
                                    <div class="exmo_radio_shadow"></div>
                                    <label for="cmethod1">
                                        Adobe
                                    </label>
                                </div>

                            </div>

                            <div class="exmo_inbox">
                                <div class="exmo_checkbox">
                                    <input type="checkbox" id="csvaeol1" v-model="o_shape_cornerEditor_editable">
                                    <div class="exmo_checkbox_shadow"></div>
                                    <label for="csvaeol1">
                                        保存原始角
                                    </label>
                                </div>
                            </div>

                            <div class="more_button_bar">
                                <button class="exmo_button_ghost" v-on:click="func_shape_cornerEditor_do(0)">圆角</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_cornerEditor_do(1)">反圆</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_cornerEditor_do(2)">斜切</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_cornerEditor_do(3)">内直</button>

                            </div>

                        </div>


                    </div>

                </div>

                <!--形状高级选项-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.shape_advance}">
                    <div class="info">

                    </div>


                    <div class="fun_block">
                        <div class="info">
                            形状属性
                            <div class="more_button_bar_big inline">
                                <button class="exmo_button_ghost" v-on:click="func_shape_copyShapeProperty">复制</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_pasetShapeProperty">粘贴</button>
                            </div>
                        </div>

                    </div>

                    <div class="fun_block">
                        <!--<div class="info">-->
                        <!--CSS 与 SVG <span class="sub">使用 SVGO 优化 </span>-->
                        <!--</div>-->

                        <div class="info">
                            SVG
                            <div class="more_button_bar_big inline">
                                <button class="exmo_button_ghost" v-on:click="func_shape_copySvg">复制</button>
                                <button class="exmo_button_ghost" v-on:click="func_shape_saveSvg">导出</button>
                            </div>
                        </div>

                        <div class="exmo_inbox">
                            <div class="exmo_checkbox">
                                <input type="checkbox" id="qp_ssvgo" v-model="setSystem.ui.quick.shape_use_svgo">
                                <div class="exmo_checkbox_shadow"></div>
                                <label for="qp_ssvgo">
                                    使用 SVGO 优化
                                </label>
                            </div>
                        </div>


                    </div>


                </div>

            </div>
        </div>


        <!--文本-->
        <div v-show="show_text" class="quick_funcs_box">
            <h4>文本</h4>
            <div class="quick_buts">
                <quick-icon-button v-bind:title="Lang.from('最小化文本框')" name="text_minBounds"
                                   v-bind:func="func_text_minBounds">
                    <i class="icon-shrink"></i>
                </quick-icon-button>


            </div>

            <div class="quick_mores">
                <!--变换平面角度-->
                <div class="quick_more_item" v-bind:class="{'more_on':more_onoff.transform_angle}">
                    <div class="info">
                        变换平面角度
                    </div>

                    <div class="exmo_inbox " title="为 0 时自动计算">
                        <div class="exmo_box_name">变换角</div>
                        <select class="exmo_select" v-model="o_tansform_anglePanel" style="width: 126px;">
                            <option value="0"> {{"左"|lang}}</option>
                            <option value="1"> {{"右"|lang}}</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>


    </a-area>


</template>
<style lang="scss" rel="stylesheet/scss">

    .exmo_inbox.longtext {
        .exmo_box_name {
            width: 90px;
        }

        input.exmo_input_text {
            width: calc(100% - 130px) !important;
        }
    }

    .exmo_area.quick_panel {
        padding-bottom: 0;
        overflow: visible;

        &.suspend_off {
            overflow: hidden;
            max-height: 22px;
        }
    }

    span.click-text {
        color: #5D88CB;
        cursor: pointer;

        &:hover {
            color: #2771E4;
            text-decoration: underline;
        }
    }

    .long-shadow-icon {
        display: inline-block;
        i {
            font-size: 13px;
            line-height: 13px;
            transition: all .2s;
            text-shadow: 0px 2px rgba(0, 0, 0, 0.29);
        }

        &.deg90 i {
            text-shadow: 0px 4px rgba(0, 0, 0, 0.29);
        }

        &.deg45 i {
            text-shadow: -2px 4px rgba(0, 0, 0, 0.29);
        }

        &.deg0 i {
            text-shadow: -4px 0px rgba(0, 0, 0, 0.29);
        }

        &.deg-45 i {
            text-shadow: -2px -4px rgba(0, 0, 0, 0.29);
        }

        &.deg-90 i {
            text-shadow: 0px -4px rgba(0, 0, 0, 0.29);
        }

        &.deg-135 i {
            text-shadow: 2px -4px rgba(0, 0, 0, 0.29);
        }

        &.deg180 i {
            text-shadow: 4px 0px rgba(0, 0, 0, 0.29);
        }

        &.deg135 i {
            text-shadow: 2px 4px rgba(0, 0, 0, 0.29);
        }

    }

    .transform-ap-icon {

        font-size: 4px;
        line-height: 13px;
        display: inline-block;
        margin-bottom: -2px;
        transition: all .3s;
        -webkit-transform: rotatex(52deg) rotateY(9deg) rotateZ(36deg);

        &.a0 {
            -webkit-transform: rotatex(52deg) rotateY(9deg) rotateZ(36deg);
        }
        &.a1 {

            -webkit-transform: rotatex(58deg) rotateY(-17deg) rotateZ(59deg);
        }

    }

    .inline-icon-input {
        vertical-align: top;
        padding: 8px 6px;
        width: 28px;

        input.exmo_input_text {
            line-height: 13px;
            margin: 0;
            padding: 0 3px;
            padding-bottom: 0px;
            margin-top: -5px;
            width: 22px;
            text-align: right;
            border-bottom: 1px solid rgba(173, 173, 173, 0);
            font-weight: 900;
            color: rgba(41, 41, 41, 0.45);

            &:hover {
                border-bottom: 1px solid rgba(173, 173, 173, .4);
            }

            &:focus {
                border-bottom: 1px solid rgba(44, 115, 255, 0.94);
            }

        }
    }

    .quick_funcs_box {
        h4 {
            position: absolute;
            margin-left: -2px;
            margin-top: 4px;
            font-weight: normal;
            font-size: 12px;
        }

        .quick_buts {
            font-size: 0;
            padding-left: 30px;

        }

        .quick_more_item {

            .exmo_inbox {
                width: 100%;
                margin-bottom: 8px;

                &.min {
                    width: calc(50% - 6px);

                    input.exmo_input_text {
                        width: calc(50% - 8px);
                    }

                }

                .exmo_checkbox {
                    margin-left: 6px;
                    margin-top: 3px;
                }

            }

            input.exmo_input_text {
                width: calc(100% - 90px);
            }

            .exmo_checkbox, .exmo_radio {
                color: #777;
                vertical-align: middle;
                label {
                    font-size: 12px;
                }
            }

            .exmo_checkbox {
                margin-top: 6px;
            }
            .more_button_bar {
                text-align: center;
                width: 100%;
                padding-top: 12px;
                button.exmo_button_ghost {
                    font-size: 12px;
                    padding: 3px 16px;
                }

            }

            .more_button_bar_big {
                text-align: center;
                width: 100%;

                &.inline {
                    display: inline-block;
                    text-align: right;
                    position: absolute;
                    right: 0;
                }

                button.exmo_button_ghost {
                    font-size: 12px;
                    padding: 3px 20px;
                    margin: 0 8px;
                }
            }

            .fun_block:not(:nth-last-of-type(1)) {
                margin-bottom: 16px;
                padding-bottom: 14px;
                border-bottom: 1px dashed rgba(0, 0, 0, 0.22);
            }

            h4 {
                font-weight: normal;
                font-size: 13px;
                padding: 2px 0;
                margin: 0;
            }

            .info {
                -webkit-user-select: text;
                font-size: 12px;
                color: #797878;
                padding-bottom: 6px;
                margin-bottom: 4px;
                position: relative;

                .sub {
                    color: rgba(0, 0, 0, 0.34);
                    padding-left: 5px;
                }

                .func_enable {
                    position: absolute;
                    right: 10px;
                    top: 0px;
                    margin-top: -5px;
                }

                .inline-but-bar {
                    position: absolute;
                    right: 10px;
                    top: 0px;
                    margin-top: 0px;
                    -webkit-user-select: none;

                }
            }

            .permute_matrix_anchor_shadw {
                height: 22px;
            }
            .permute_matrix_anchor {
                position: absolute;

            }
            .option_list.permute_matrix_anchor {
                margin-top: 40px;
            }

            padding: 0px 16px;
            overflow: hidden;
            visibility: hidden;
            max-height: 0;
            transition: all .4s;
            background-color: rgba(228, 229, 229, 1);
            width: 100%;
            margin-left: -16px;
            background: linear-gradient(180deg, rgba(158, 158, 158, 0.44) 0%, rgba(153, 153, 153, 0.24) 6px, rgba(153, 153, 153, 0.16) 98%, rgba(205, 205, 205, 0.52) 100%);
        }
        .quick_more_item.more_on {

            padding: 10px 16px;

            visibility: visible;
            max-height: 999px;
        }

    }


</style>
<script>
    import AttrOption from "./AttributePanel_option.vue"
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import Area from '../components/area.vue';
    import AttrSelect from "./AttributePanel_select.vue"
    import SelectInput from "./AttributePanel_selectInput.vue"
    import AttrTextarea from "./AttributePanel_textarea.vue"
    import QuickIconButton from "./QuickPanel_iconButton.vue"

    export default{
        watch: {
            "Gob.selectTime": async function (val)
            {
                if (setSystem.ui.quick.shape_enable_curnerEditor)
                {
                    this.func_shape_cornerEditor_updateInfoByXmp()
                }

                if (this.more_onoff.permute_spacing || this.more_onoff.permute_matrix)
                {
                    this.func_permute_updateSpacingGird()
                }

                if (this.more_onoff.permute_padding)
                {
                    this.func_permute_updatePadding()
                }


            },
            "more_onoff.permute_spacing": function ()
            {
                if (this.more_onoff.permute_spacing || this.more_onoff.permute_matrix)
                {
                    this.func_permute_updateSpacingGird()
                }
            }
            ,
            "more_onoff.permute_matrix": function ()
            {
                if (this.more_onoff.permute_spacing || this.more_onoff.permute_matrix)
                {
                    this.func_permute_updateSpacingGird()
                }
            }
            ,
            "more_onoff.permute_padding": function ()
            {
                if (this.more_onoff.permute_padding)
                {
                    this.func_permute_updatePadding()
                }
            }

        },

        props: [],
        data(){
            return {
                more_onoff: {
                    one: false,
                    radius: false,
                    shape_advance: false,
                    permute_spacing: false,
                    permute_matrix: false,
                    permute_padding: false,
                    derive_matrix: false,
                    derive_mirror: false,
                    derive_longShadow: false,
                    derive_3D_depth: false,
                    derive_padding: false,
                    transform_angle: false,
                    transform_scale: false,
                    transform_rotation: false,
                },
                Lang: Lang,
                Gob: Gob,
                setSystem: setSystem,
                Gob_selectTypes: Gob.selectTypes, /*当前选中图层类型状态，以此控制功能按钮是否显示*/
                o_editing: false,
                inline_block: true,
                options: [
                    {
                        value: 'test2',
                        label: "sss第三方",
                        block: true,
                    },
                    {
                        br: true,
                    },
                    {
                        value: 'test',
                        label: "创建同步变量的文本图层",
                    },
                    {
                        br: true,
                    },
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

                ],

                o_shape_cornerEditor_radiiTxt: "",
                o_shape_cornerEditor_cornerMethod0: 0,
                o_shape_cornerEditor_editable: true,

                o_permute_spacing_col: null,
                o_permute_spacing_row: null,
                o_permute_spacing_col_calc: 0,
                o_permute_spacing_row_calc: 0,
                o_permute_spacing_dX: null,
                o_permute_spacing_dY: null,
                o_permute_spacing_dX_calc: 0,
                o_permute_spacing_dY_calc: 0,
                o_permute_spacing_dMxtX_calc: 0,
                o_permute_spacing_dMxtY_calc: 0,
                o_permute_spacing_inLineAlign: "bottom",
                o_permute_matrix_col: null,
                o_permute_matrix_row: null,
                o_permute_matrix_dX: null,
                o_permute_matrix_dY: null,
                o_permute_matrix_anchor: 4,
                o_permute_matrix_anchor_options: [
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
                o_permute_padding_top: null,
                o_permute_padding_right: null,
                o_permute_padding_bottom: null,
                o_permute_padding_left: null,
                o_permute_padding_top_calc: 0,
                o_permute_padding_right_calc: 0,
                o_permute_padding_bottom_calc: 0,
                o_permute_padding_left_calc: 0,
                o_derive_matrix_col: 2,
                o_derive_matrix_row: 2,
                o_derive_matrix_dX: 10,
                o_derive_matrix_dY: 10,
                o_derive_matrix_rename: 0,
                o_derive_matrix_copyDataCaryon: true,
                o_derive_mirror_direction: 0,
                o_derive_longShadow_direction: -135,
                o_derive_longShadow_length: 20,
                o_derive_longShadow_stepByStep: false,
                o_derive_longShadow_initOpacity: 95,
                o_derive_longShadow_effect: true,
                o_derive_longShadow_opacity: 80,
                o_derive_longShadow_notRezShape: false,
                o_derive_derive_3D_depth_direction: 90,
                o_derive_derive_3D_depth_length: 20,
                o_derive_derive_3D_depth_bevelDirection: 0,
                o_derive_derive_3D_depth_bottomShadowOpacity: 50,
                o_derive_derive_3D_depth_topShadowOpacity: 25,
                o_derive_derive_3D_depth_smooth: true,
                o_derive_padding_top: 30,
                o_derive_padding_right: 30,
                o_derive_padding_bottom: 30,
                o_derive_padding_left: 30,
                o_tansform_anglePanel: 0,
                o_tansform_scale_scale: 2,
                o_tansform_scale_scaleEffect: true,
                o_tansform_rotation_angle: 45,
                o_tansform_rotation_centerState: 6,
                o_tansform_rotation_options: [
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
                        value: '7',
                        label_html: '<i class="icon-reference-cl " style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '8',
                        label_html: '<i class="icon-reference-cm" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '3',
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
                        value: '5',
                        label_html: '<i class="icon-reference-bm" style="font-size: 21px;">',
                        label: ''
                    }
                    ,
                    {
                        value: '4',
                        label_html: '<i class="icon-reference-br" style="font-size: 21px;">',
                        label: ''
                    }

                ],

            }

        },
        methods: {
            selectTool: function (toolName)
            {
                Proteins.exec("inputAssist_setCurrentTool", {toolName: toolName})
            },
            click_onecMore: function (moreName)
            {
                for (var x in  this.more_onoff)
                {
                    if (x != moreName)
                    {
                        this.more_onoff[x] = false
                    }
                    else
                    {
                        this.more_onoff[x] = !this.more_onoff[x]
                    }
                }
            },

            func_shape_one: function ()
            {

            },
            func_shape_combine: function ()
            {
                Proteins.exec("quick_shape_path_combine")
            },
            func_shape_subtract: function ()
            {
                Proteins.exec("quick_shape_path_subtract")
            },
            func_shape_intersect: function ()
            {
                Proteins.exec("quick_shape_path_intersect")
            },
            func_shape_symDifference: function ()
            {
                Proteins.exec("quick_shape_path_symDifference")
            },
            func_shape_radius: _.debounce(function (e)
            {

                var text = this.setSystem.ui.quick.shape_radius

                if (text != undefined && text.split != undefined)
                {
                    var textArr = text.split(/[,，\ ]/)

                    var reg = /[0-9]*/
                    var intArr = []

                    for (var i = 0; i < textArr.length; i++)
                    {
                        if (i > 4)
                        {
                            break
                        }
                        var _int = reg.exec(textArr[i])[0]
                        if (_int != undefined && _int.length > 0)
                        {
                            intArr.push(_int)
                        }
                    }

                    if (intArr.length > 0)
                    {
                        var setValue = intArr[0]
                        this.Gob.shape.radian.topLeft = +setValue
                        if (intArr[1] != undefined) setValue = intArr[1]
                        this.Gob.shape.radian.topRight = +setValue
                        if (intArr[2] != undefined) setValue = intArr[2]
                        this.Gob.shape.radian.bottomRight = +setValue
                        if (intArr[3] != undefined) setValue = intArr[3]
                        this.Gob.shape.radian.bottomLeft = +setValue
                    }


                }


            }, 500),

            func_shape_shape_advance: function ()
            {
                this.click_onecMore("shape_advance")
            },

            func_shape_cornerEditor_updateInfoByXmp: async function ()
            {

                var info = await Proteins.exec("encapsulate_cornerEditor_getEditLog")


                if (info.cornerPatternMetadata != undefined)
                {
                    this.o_shape_cornerEditor_radiiTxt = info.cornerPatternMetadata
                }

                if (info.cornerMethodMetadata != undefined)
                {
                    this.o_shape_cornerEditor_cornerMethod0 = info.cornerMethodMetadata
                }

            },

            func_shape_cornerEditor_do: function (type)
            {
                var itemIndexArr = []
                Gob.selectList.forEach(function (x) {itemIndexArr.push(x.itemIndex)})
                var parameOb = {

                    radiiTxt: this.o_shape_cornerEditor_radiiTxt, //圆角参数文本
                    cornerType: +type,//= 0Round;  1Inverse; 2Chamfer;  3Inset
                    cornerMethod: +this.o_shape_cornerEditor_cornerMethod0,//0 Radius 模式, 1 Adobe 模式
                    editable: this.o_shape_cornerEditor_editable, // Save Original Corners
                    selectedLayers: itemIndexArr//当前选中图层 itemIndex 数组，提供这个能提高速度
                }


                Proteins.exec("encapsulate_cornerEditor_do", parameOb)

            },
            func_shape_pasetShapeProperty: function ()
            {
                Proteins.exec("quick_shape_advance_pasetShapeProperty")
            }
            ,
            func_shape_copyShapeProperty: function ()
            {
                Proteins.exec("quick_shape_advance_copyShapeProperty")
            },
            func_shape_copySvg: async function ()
            {
                var svgFin = ""
                if (Gob.selectList.length < 2)
                {
                    await _func()
                } else
                {

                    var save = await enzymes.selectSave()
                    Gob.stopSelectEvent = true
                    for (var i = 0; i < Gob.selectList.length; i++)
                    {
                        await enzymes.selectLayer_byID(Gob.selectList[i].id)
                        //-----------------------
                        await _func()
                        if (i < Gob.selectList.length - 1)
                        {
                            svgFin = svgFin + "\n\n"
                        }

                        //-----------------------
                    }
                    Gob.stopSelectEvent = false
                    await enzymes.selectLoad(save)
                }


                async function _func()
                {
                    if (await  Proteins.exec("quick_shape_advance_copyShapeSVG") == 0)
                    {
                        var svg = NodeCopy.paste()
                        if (setSystem.ui.quick.shape_use_svgo)
                        {
                            try
                            {
                                var svgo = await svgoAsync(svg)

                                if (svgo.data != undefined)
                                {
                                    svg = svgo.data
                                }
                            } catch (e)
                            {
                                console.error(e)
                            }
                        }
                        svgFin = svgFin + svg;
                    }

                }

                NodeCopy.copy(svgFin)

            },
            func_shape_saveSvg: async function ()
            {
                var svgFin = []
                var layerNames = []
                if (Gob.selectList.length < 2)
                {
                    await _func()
                    layerNames.push(Gob.selectList[0].name)
                } else
                {
                    var save = await enzymes.selectSave()
                    Gob.stopSelectEvent = true
                    for (var i = 0; i < Gob.selectList.length; i++)
                    {
                        await enzymes.selectLayer_byID(Gob.selectList[i].id)
                        //-----------------------
                        await _func()
                        layerNames.push(Gob.selectList[i].name)

                        //-----------------------
                    }
                    Gob.stopSelectEvent = false
                    await enzymes.selectLoad(save)
                }


                if (svgFin.length == 1)
                {

                    console.info(window)

                    var result = window.cep.fs.showSaveDialogEx("保存 SVG", "", ["svg"], layerNames[0] + ".svg", "SVG");
                    if (0 == result.err)
                    {
                        if (result.data.length == 0)
                        {
                            console.log("用户放弃了保存");
                        }
                        else
                        {
                            var svaeResult = window.cep.fs.writeFile(result.data, svgFin[0]);
                        }
                    }


                } else if (svgFin.length > 1)
                {

                    var result = window.cep.fs.showOpenDialogEx(true, true, "选择文件夹", "", "")

                    if (0 == result.err)
                    {
                        if (result.data.length == 0)
                        {
                            console.log("用户放弃了保存");
                        }
                        else
                        {
                            console.log("result.data", result.data);
                            for (var i = 0; i < svgFin.length; i++)
                            {
                                var writePath = path.join(result.data[0], FIL.filterFileName(layerNames[i], "_") + ".svg")
                                console.log("svg writePath:", writePath)
                                window.cep.fs.writeFile(writePath, svgFin[i]);

                            }

                        }
                    }


                }


                //end------------------
                async function _func()
                {
                    if (await  Proteins.exec("quick_shape_advance_copyShapeSVG") == 0)
                    {
                        var svg = NodeCopy.paste()
                        if (setSystem.ui.quick.shape_use_svgo)
                        {
                            try
                            {
                                var svgo = await svgoAsync(svg)

                                if (svgo.data != undefined)
                                {
                                    svg = svgo.data
                                }
                            } catch (e)
                            {
                                console.error(e)
                            }
                        }

                        svgFin.push(svg)
                    }

                }
            },
            func_permute_updateSpacingGird: async function ()
            {
                console.info("func_permute_updateSpacingGird")
                var info = await Proteins.exec("quick_permute_getLayerGrid")
                this.o_permute_spacing_col_calc = info.colNumber
                this.o_permute_spacing_row_calc = info.rowNumber = info.rowNumber
                this.o_permute_spacing_dX_calc = info.suggestDX || 0
                this.o_permute_spacing_dY_calc = info.suggestDY || 0
                this.o_permute_spacing_dMxtX_calc = info.suggestMxtX || 0
                this.o_permute_spacing_dMxtY_calc = info.suggestMxtY || 0


            },
            func_permute_updatePadding: async function ()
            {
                console.info("func_permute_updatePadding")
                var info = await Proteins.exec("quick_permute_getLayerPadding")
                this.o_permute_padding_top_calc = info.suggestPadding_top || 0
                this.o_permute_padding_right_calc = info.suggestPadding_right || 0
                this.o_permute_padding_bottom_calc = info.suggestPadding_bottom || 0
                this.o_permute_padding_left_calc = info.suggestPadding_left || 0
            },
            func_permute_doSpacingGird: async function ()
            {
                var paramOb = {
                    rowNumber: this.o_permute_spacing_row, /*行数*/
                    colNumber: this.o_permute_spacing_col, /*列数*/
                    dX: this.o_permute_spacing_dX, /* x 间距*/
                    dY: this.o_permute_spacing_dY, /* Y 间距*/
                    inLineAlign: this.o_permute_spacing_inLineAlign, /*行内垂直对齐方式*/
                }


                if (paramOb.colNumber == undefined || paramOb.colNumber == "")
                {
                    paramOb.colNumber = this.o_permute_spacing_col_calc
                }
                if (paramOb.rowNumber == undefined || paramOb.rowNumber == "")
                {
                    paramOb.rowNumber = this.o_permute_spacing_row_calc
                }
                if (paramOb.dX == undefined || paramOb.dX == "")
                {
                    paramOb.dX = this.o_permute_spacing_dX_calc
                }
                if (paramOb.dY == undefined || paramOb.dY == "")
                {
                    paramOb.dY = this.o_permute_spacing_dY_calc
                }

                await Proteins.exec("quick_permute_doPermuteBySpacing", paramOb)
                this.func_permute_updateSpacingGird()
            },
            func_permute_doMatrix: async function ()
            {
                var paramOb = {
                    rowNumber: this.o_permute_matrix_row, /*行数*/
                    colNumber: this.o_permute_matrix_col, /*列数*/
                    dX: this.o_permute_matrix_dX, /* x 间距*/
                    dY: this.o_permute_matrix_dY, /* Y 间距*/
                    anchor: this.o_permute_matrix_anchor, /*行内垂直对齐方式*/
                }


                if (paramOb.colNumber == undefined || paramOb.colNumber == "")
                {
                    paramOb.colNumber = this.o_permute_spacing_col_calc
                }
                if (paramOb.rowNumber == undefined || paramOb.rowNumber == "")
                {
                    paramOb.rowNumber = this.o_permute_spacing_row_calc
                }
                if (paramOb.dX == undefined || paramOb.dX == "")
                {
                    paramOb.dX = this.o_permute_spacing_dMxtX_calc
                }
                if (paramOb.dY == undefined || paramOb.dY == "")
                {
                    paramOb.dY = this.o_permute_spacing_dMxtY_calc
                }

                await Proteins.exec("quick_permute_doPermuteByMatrixGrid", paramOb)
                this.func_permute_updateSpacingGird()
            },

            func_permute_padding: async function ()
            {
                var paramOb = {
                    padding_right: this.o_permute_padding_right, /*行数*/
                    padding_bottom: this.o_permute_padding_bottom, /*列数*/
                    padding_left: this.o_permute_padding_left, /* x 间距*/
                    padding_top: this.o_permute_padding_top, /* Y 间距*/
                }


                if (paramOb.padding_top == undefined || paramOb.padding_top == "")
                {
                    paramOb.padding_top = this.o_permute_padding_top_calc
                }
                if (paramOb.padding_right == undefined || paramOb.padding_right == "")
                {
                    paramOb.padding_right = this.o_permute_padding_right_calc
                }
                if (paramOb.padding_bottom == undefined || paramOb.padding_bottom == "")
                {
                    paramOb.padding_bottom = this.o_permute_padding_bottom_calc
                }
                if (paramOb.padding_left == undefined || paramOb.padding_left == "")
                {
                    paramOb.padding_left = this.o_permute_padding_left_calc
                }

                await Proteins.exec("quick_permute_doPermuteByPadding", paramOb)
                this.func_permute_updatePadding()
            },

            func_derive_copyOnce: async function ()
            {
                var oldIds = await enzymes.getSelectLayerArray("id")
                var newIds = await Proteins.exec("quick_derive_matrix", {

                        col: 2, //列数
                        row: 1, //行数
                        dX: 30, //x 间距
                        dY: 30, //y 间距
                        rename: 0 //重命名模式
                    }
                )

                if (this.o_derive_matrix_copyDataCaryon)
                {
                    this.deriveSyncdataCaryon(oldIds, newIds)
                }
            },

            func_derive_matrix: async function ()
            {
                var oldIds = await enzymes.getSelectLayerArray("id")
                var newIds = await Proteins.exec("quick_derive_matrix", {

                        col: this.o_derive_matrix_col, //列数
                        row: this.o_derive_matrix_row, //行数
                        dX: this.o_derive_matrix_dX, //x 间距
                        dY: this.o_derive_matrix_dY, //y 间距
                        rename: this.o_derive_matrix_rename //重命名模式
                    }
                )

                if (this.o_derive_matrix_copyDataCaryon)
                {
                    this.deriveSyncdataCaryon(oldIds, newIds)
                }


            },
            deriveSyncdataCaryon: function (oldIds, newIds)
            {
                if (oldIds.length != undefined)
                {
                    for (var i = 0; i < newIds.length; i++)
                    {
                        for (var z = 0; z < newIds[i].length; z++)
                        {
                            if (oldIds[z] != undefined)
                            {
                                dataCaryon.copyLayerToNewId(oldIds[z], newIds[i][z])
                            }
                        }
                    }
                }

            },

            func_derive_mirror: function ()
            {
                Proteins.exec("quick_derive_mirror", {
                        direction: this.o_derive_mirror_direction
                    }
                )
            },
            func_derive_mirror_switch: function ()
            {
                if (this.o_derive_mirror_direction == 1)
                {
                    this.o_derive_mirror_direction = 0
                } else
                {
                    this.o_derive_mirror_direction = 1
                }
            },

            func_angle_switch: function (angle)
            {
                if (angle % 45 != 0)
                {
                    var intNum = Math.floor(angle / 45)

                    angle = intNum * 45
                }
                angle = angle - 45

                if (angle <= -180)
                {
                    angle = 180
                }

                return angle
            },

            func_derive_longShadow_selectDirection: function ()
            {
                this.o_derive_longShadow_direction = this.func_angle_switch(this.o_derive_longShadow_direction)
            },
            func_derive_3D_depth_selectDirection: function ()
            {
                this.o_derive_derive_3D_depth_direction = this.func_angle_switch(this.o_derive_derive_3D_depth_direction)


            },
            func_derive_longShadow: function ()
            {
                Proteins.exec("quick_derive_longShadow", {
                        notRezShape: this.o_derive_longShadow_notRezShape || false,//不栅格化图层
                        angle: this.o_derive_longShadow_direction, //阴影角度
                        length: this.o_derive_longShadow_length, //阴影长度
                        effect: this.o_derive_longShadow_effect,//渐变
                        opacity: this.o_derive_longShadow_opacity,//阴影不透明度
                        stepByStep: this.o_derive_longShadow_stepByStep,//逐步产生阴影
                        initOpacity: this.o_derive_longShadow_initOpacity,//逐步产生阴影-起始不透明
                    }
                )
            },
            func_derive_3Ddepth: function ()
            {
                Proteins.exec("quick_derive_3Ddepth", {
                        angle: this.o_derive_derive_3D_depth_direction,
                        length: this.o_derive_derive_3D_depth_length,
                        bevelDirection: this.o_derive_derive_3D_depth_bevelDirection,
                        bottomShadowOpacity: this.o_derive_derive_3D_depth_bottomShadowOpacity,
                        topShadowOpacity: this.o_derive_derive_3D_depth_topShadowOpacity,
                        smooth: this.o_derive_derive_3D_depth_smooth,
                    }
                )
            },
            func_tansform_anglePanel: function ()
            {
                Proteins.exec("quick_transform_anglePanel", {
                        angleIndex: this.o_tansform_anglePanel,
                    }
                )
            },
            func_tansform_anglePanel_switch: function ()
            {
                if (this.o_tansform_anglePanel == 1)
                {
                    this.o_tansform_anglePanel = 0
                } else
                {
                    this.o_tansform_anglePanel = 1
                }
            },
            func_tansform_scale: function ()
            {
                if (this.o_tansform_scale_scale == undefined || this.o_tansform_scale_scale == "")
                {
                    var scale = 2;
                } else
                {
                    var scale = this.o_tansform_scale_scale
                }

                Proteins.exec("quick_transform_scale", {
                        scale: scale,
                        scaleEffect: this.o_tansform_scale_scaleEffect
                    }
                )
            },
            func_tansform_scale_cb: function ()
            {
                if (this.o_tansform_scale_scale == undefined || this.o_tansform_scale_scale == "")
                {
                    var scale = 2;
                } else
                {
                    var scale = this.o_tansform_scale_scale
                }


                Proteins.exec("quick_transform_scale", {
                        scale: 1 / scale,
                        scaleEffect: this.o_tansform_scale_scaleEffect
                    }
                )
            },
            func_transform_rotation: function ()
            {

                if (this.o_tansform_rotation_angle == undefined || this.o_tansform_rotation_angle == "")
                {
                    var angle = 45;
                } else
                {
                    var angle = this.o_tansform_rotation_angle
                }

                Proteins.exec("quick_transform_rotation", {
                        angle: angle,
                        centerState: this.o_tansform_rotation_centerState
                    }
                )
            },
            func_transform_rotation_cb: function ()
            {
                if (this.o_tansform_rotation_angle == undefined || this.o_tansform_rotation_angle == "")
                {
                    var angle = 45;
                } else
                {
                    var angle = this.o_tansform_rotation_angle
                }

                Proteins.exec("quick_transform_rotation", {
                        angle: -angle,
                        centerState: this.o_tansform_rotation_centerState
                    }
                )
            },
            func_text_minBounds: function ()
            {
                Proteins.exec("quick_text_minBounds", {})
            },
            func_derive_padding:function ()
            {
                Proteins.exec("quick_derive_padding",  {
                    left: this.o_derive_padding_left,
                    top: this.o_derive_padding_top,
                    right: this.o_derive_padding_right,
                    bottom: this.o_derive_padding_bottom,
                })
            }



        },
        computed: {
            // 一个计算属性的 getter
            o_range_style: {
                get: function ()
                {
                    if (this.assist_range_width != undefined)
                    {
                        return {
                            width: this.assist_range_width + "px"
                        }
                    }
                    else
                    {
                        return {
                            width: "90px"
                        }
                    }
                },
            },
            o_radius_now: {
                get: function ()
                {
                    var text =
                        this.Gob.shape.radian.topLeft + ", "
                        + this.Gob.shape.radian.topRight + ","
                        + this.Gob.shape.radian.bottomRight + ","
                        + this.Gob.shape.radian.bottomLeft
                }
            },
            show_shape: {
                get: function ()
                {
                    return this.Gob.selectTypes["shape"]

                },
            },


            show_text: {
                get: function ()
                {
                    return this.Gob.selectTypes["text"]

                },
            },
            o_permute_padding_padding: {
                get: function ()
                {
                    var unit = "px"
                    var top = this.o_permute_padding_top
                    var bottom = this.o_permute_padding_bottom
                    var left = this.o_permute_padding_left
                    var right = this.o_permute_padding_right

                    if (top == undefined || top == "")
                    {
                        top = this.o_permute_padding_top_calc
                    }
                    if (right == undefined || right == "")
                    {
                        right = this.o_permute_padding_right_calc
                    }
                    if (bottom == undefined || bottom == "")
                    {
                        bottom = this.o_permute_padding_bottom_calc
                    }
                    if (left == undefined || left == "")
                    {
                        left = this.o_permute_padding_left_calc
                    }
                    if (left == right && top == bottom)
                    {
                        var str = (top + unit + " " + right + unit )

                    } else
                    {

                        var str = (top + unit + " " + left + unit + " " + bottom + unit + " " + right + unit)
                    }

                    return str
                },
                set: function (value)
                {
                    if (value != undefined && value.split != undefined)
                    {
                        var arrStr = value.split(" ")
                        arrStr = arrStr.map(function (val)
                        {
                            var reg = /[0-9]*/g
                            return reg.exec(val)[0]
                        })

                        if (arrStr.length == 1)
                        {
                            this.o_permute_padding_top = arrStr[0]
                            this.o_permute_padding_bottom = arrStr[0]
                            this.o_permute_padding_left = arrStr[0]
                            this.o_permute_padding_right = arrStr[0]

                        } else if (arrStr.length == 2)
                        {
                            this.o_permute_padding_top = arrStr[0]
                            this.o_permute_padding_bottom = arrStr[0]
                            this.o_permute_padding_left = arrStr[1]
                            this.o_permute_padding_right = arrStr[1]

                        }
                        else if (arrStr.length == 4)
                        {
                            this.o_permute_padding_top = arrStr[0]
                            this.o_permute_padding_bottom = arrStr[2]
                            this.o_permute_padding_left = arrStr[1]
                            this.o_permute_padding_right = arrStr[3]

                        }

                    }
                }
            },
            o_derive_padding_padding: {
                get: function ()
                {
                    var unit = "px"
                    var top = this.o_derive_padding_top
                    var bottom = this.o_derive_padding_bottom
                    var left = this.o_derive_padding_left
                    var right = this.o_derive_padding_right

                    if (left == right && top == bottom)
                    {
                        var str = (top + unit + " " + right + unit )

                    } else
                    {
                        var str = (top + unit + " " + left + unit + " " + bottom + unit + " " + right + unit)
                    }

                    return str
                },
                set: function (value)
                {
                    if (value != undefined && value.split != undefined)
                    {
                        var arrStr = value.split(" ")
                        arrStr = arrStr.map(function (val)
                        {
                            var reg = /[0-9]*/g
                            return reg.exec(val)[0]
                        })

                        if (arrStr.length == 1)
                        {
                            this.o_derive_padding_top = arrStr[0]
                            this.o_derive_padding_bottom = arrStr[0]
                            this.o_derive_padding_left = arrStr[0]
                            this.o_derive_padding_right = arrStr[0]

                        } else if (arrStr.length == 2)
                        {
                            this.o_derive_padding_top = arrStr[0]
                            this.o_derive_padding_bottom = arrStr[0]
                            this.o_derive_padding_left = arrStr[1]
                            this.o_derive_padding_right = arrStr[1]

                        }
                        else if (arrStr.length == 4)
                        {
                            this.o_derive_padding_top = arrStr[0]
                            this.o_derive_padding_bottom = arrStr[2]
                            this.o_derive_padding_left = arrStr[1]
                            this.o_derive_padding_right = arrStr[3]

                        }

                    }
                }
            },
            o_style_3ddepth_angle: {
                get: function ()
                {

                    var x = this.o_derive_derive_3D_depth_direction
                    x = (-(x - 90) - 30)

                    if (this.o_derive_derive_3D_depth_direction == 180 || this.o_derive_derive_3D_depth_direction == -180)
                    {
                        return 240
                    }

                    if (this.o_derive_derive_3D_depth_direction == 135)
                    {
                        return 285
                    }
                    return x
                },
            },


        },
        components: {
            "attr-option": AttrOption,
            "value-input": ValueInput,
            "a-area": Area,
            "attr-select": AttrSelect,
            "select-input": SelectInput,
            "attr-textarea": AttrTextarea,
            "quick-icon-button": QuickIconButton

        }


    }
</script>
