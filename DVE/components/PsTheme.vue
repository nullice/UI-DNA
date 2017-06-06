<template>
    <div class="ps-theme-css"></div>
</template>
<style lang="scss">

    .ps-theme-css {
        display: none;
    }

    /*----pstheme4:最暗------*/

    .pstheme2 {
        background: #B8B8B8 !important;
        color: rgba(0, 0, 0, 0.41);
        .exmo_area.suspend {
            background: #B8B8B8;
        }
        .setting_panel {
            background: #B8B8B8;
        }
        .exmo_area.attr_panel.area_pad.suspend_off {
            background: #B8B8B8;
        }

    }

    .pstheme3 {
        background: #525252 !important;
        color: rgba(255, 255, 255, 0.41);
        .exmo_area.suspend {
            background: #525252;
        }
        .setting_panel {
            background: #525252;
        }
        .exmo_area.attr_panel.area_pad.suspend_off {
            background: #525252;
        }

    }

    .pstheme4 {
        background: #323232 !important;
        color: rgba(255, 255, 255, 0.41);
        .exmo_area.suspend {
            background: #323232;
        }
        .setting_panel {
            background: #323232;
        }
        .exmo_area.attr_panel.area_pad.suspend_off {
            background: #323232;
        }
    }

    .pstheme4, .pstheme3 {

        .exmo_area {
            border-bottom: 2px solid rgba(0, 0, 0, 0.21);
        }

        .exmo_area.attr_panel {
            border-bottom: none;
        }

        .mini_select_preview {
            color: rgba(255, 255, 255, 0.54);
        }

        .layer-item {
            color: rgba(255, 255, 255, 0.57);
        }

        .layer-item span.id {
            background: rgba(98, 98, 98, 0.65);
            color: #BDBDBD;
        }

        .layer-item span.index {
            color: rgba(255, 255, 255, 0.39);
        }

        h2 {
            color: rgba(255, 255, 255, 0.77);
        }

        label.exmo_button_icon.freshen.mini i {
            color: rgba(255, 255, 255, 0.56);
        }

        .mini_info span.layerNumber {
            border: 1px solid rgba(237, 237, 237, 0.35);
            color: #CDCDCD;
        }

        .menu-buttom-box .menu-buttom .exmo_button_icon i {
            color: rgba(255, 255, 255, 0.58);
        }

        .exmo_button_icon:hover {
            background: rgba(219, 219, 219, 0.2);
            border: 1px solid rgba(139, 132, 132, 0.44);
        }

        h1, h2, h3, h4, h5, h6 {
            color: rgba(255, 255, 255, 0.57);
        }
        .exmo_button_icon i {
            color: rgba(255, 255, 255, 0.7);
        }

        .inline-icon-input input.exmo_input_text {

            border-bottom: 1px solid rgba(255, 255, 255, 0.26);
            color: rgba(255, 255, 255, 0.65);
        }

        .quick_buts .quick_but:not(:nth-last-of-type(1)) .quick_but_icon {
            border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .quick_buts .quick_but .quick_but_more_icon {
            color: rgba(255, 255, 255, 0.52);
        }
        .quick_buts .quick_but .quick_but_more_icon.more_on {
            color: #428BE7;
            background: linear-gradient(0deg, rgba(5, 117, 255, 0.64), rgba(60, 87, 129, 0));
        }

        .quick_buts .quick_but .quick_but_more_icon:hover {
            color: #1e76e3;
            background: linear-gradient(0deg, rgba(30, 118, 227, 0.59), rgba(49, 118, 227, 0));
        }

        .exmo_input_text, .exmo_select {
            color: rgba(255, 255, 255, 0.56);
        }

        .exmo_input_text:not(:hover), .exmo_select:not(:hover) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.17);
            color: rgba(255, 255, 255, 0.56);
        }

        .exmo_checkbox .exmo_checkbox_shadow::after {
            border-color: rgba(255, 255, 255, 0.54);
            background: rgba(115, 115, 115, 0);
        }
        .exmo_checkbox input[type="checkbox"]:checked + .exmo_checkbox_shadow:before {
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(247, 247, 247, 0);
        }
        .exmo_checkbox .exmo_checkbox_shadow::before {
            background: rgba(93, 93, 93, 1);
            border: 1px solid rgba(255, 255, 255, 0);

        }

        .quick_funcs_box .quick_more_item {
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(255, 255, 255, 0.06) 10px, rgba(255, 255, 255, 0.02) 98%, rgba(0, 0, 0, 0.2) 100%);
        }

        .quick_funcs_box .quick_more_item .info .sub {
            color: rgba(255, 255, 255, 0.41);
        }

        .quick_funcs_box .quick_more_item .info {
            color: rgba(255, 255, 255, 0.59);
        }

        option {
            background: #303030;
        }

        .long-shadow-icon {
            display: inline-block;
            i {
                font-size: 13px;
                line-height: 13px;
                transition: all .2s;
                text-shadow: 0px 2px rgba(255, 255, 255, 0.31);
            }

            &.deg90 i {
                text-shadow: 0px 4px rgba(255, 255, 255, 0.31);
            }

            &.deg45 i {
                text-shadow: -2px 4px rgba(255, 255, 255, 0.31);
            }

            &.deg0 i {
                text-shadow: -4px 0px rgba(255, 255, 255, 0.31);
            }

            &.deg-45 i {
                text-shadow: -2px -4px rgba(255, 255, 255, 0.31);
            }

            &.deg-90 i {
                text-shadow: 0px -4px rgba(255, 255, 255, 0.31);
            }

            &.deg-135 i {
                text-shadow: 2px -4px rgba(255, 255, 255, 0.31);
            }

            &.deg180 i {
                text-shadow: 4px 0px rgba(255, 255, 255, 0.31);
            }

            &.deg135 i {
                text-shadow: 2px 4px rgba(255, 255, 255, 0.31);
            }

        }

        .exmo_button, .exmo_button_ghost, .exmo_btn_group .btn_primary {
            border: 1px solid rgba(50, 50, 50, 0);
            background-color: rgba(84, 84, 84, 0.78);
            color: rgba(255, 255, 255, 0.67);
            box-shadow: 0 2px 1px rgba(0, 0, 0, 0.04);

            &:hover {
                background-color: rgba(134, 134, 134, 0.46);
            }

        }
        .exmo_btn_group .btn_primary i {
            color: rgba(255, 255, 255, 0.65);
            vertical-align: text-bottom;
        }

        .exmo_btn_group input:checked + .btn_primary i {
            color: #A0CAFF;
        }

        .exmo_btn_group input:checked + .btn_primary {
            color: #E7F2FF;
            background: rgba(49, 124, 210, 0.7);

            &:hover {
                background: rgba(49, 124, 210, 0.7);
            }
        }

        h3 span {
            background: rgba(255, 255, 255, 0.15);
            color: rgba(255, 255, 255, 0.6);
        }

        .exmo_icon_cheackbox:checked + .exmo_button_icon:not(:hover) {
            border: 1px solid rgba(79, 77, 77, 0.13);
            background: rgba(255, 255, 255, 0.17);
        }

        input[id^="advance"] + label i.select_triangle_icon.icon-play3 {
            color: #A9A9A9 !important;
        }

        .exmo_box_name {
            color: rgba(255, 255, 255, 0.47);
        }

        .quick_buts .quick_but.more-but .quick_but_icon:hover {
            background: linear-gradient(0deg, rgba(63, 148, 255, 0), rgba(0, 116, 255, 0.47));
        }

        .quick_buts .quick_but.more-but .quick_but_more_icon.more_on {
            background: linear-gradient(0deg, rgba(30, 118, 227, 0), rgba(0, 99, 255, 0.27));
        }
        .quick_buts .quick_but.more-but .quick_but_icon.more_on {
            background: linear-gradient(0deg, rgba(92, 164, 255, 0.09), rgba(0, 116, 255, 0.41));
        }
        .quick_buts .quick_but.more-but .quick_but_icon.more_on i {
            color: rgba(65, 176, 255, 0.97);
        }

        textarea.exmo_inbox.value_input_box {
            border-bottom: 1px solid rgba(255, 255, 255, 0.21);
            color: rgba(255, 255, 255, 0.76);
        }

        .quick_funcs_box .quick_more_item .more_button_bar_big button.exmo_button_ghost:not(:hover) {
            color: rgba(255, 255, 255, 0.59);
            background: rgba(255, 255, 255, 0.17);
        }
        .quick_funcs_box .quick_more_item .more_button_bar_big button.exmo_button_ghost:hover {
            background: #777;
            color: rgba(255, 255, 255, 0.79);
        }

        .value_input_textarea_box textarea.exmo_inbox.value_input_box {
            border-bottom: 1px solid rgba(255, 255, 255, 0.18);
        }

        .exmo_button:hover:not(:disabled), .exmo_button_ghost:hover:not(:disabled), .exmo_btn_group .btn_primary:hover:not(:disabled) {
            color: #87BBF7;
        }
        .attr_select .select_input .select_input_label {
            color: rgba(255, 255, 255, 0.63);
        }

        .attr_select .select_input {
            background: rgba(255, 255, 255, 0);
        }

        .input-assist-box {
            background: rgb(76, 76, 76);
        }

        .input-assist-box .assist-range .max-info {
            color: rgba(255, 255, 255, 0.46);
        }

        .attr_option {
            color: rgba(255, 255, 255, 0.78);
        }

        .exmo_range::-webkit-slider-runnable-track {
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.28);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) inset;
            border-radius: 8px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.38);
            height: 5px;
            outline: none;
        }

        .exmo_range::-webkit-slider-thumb {
            background: #A5A5A5;

        }
        .attr_select .option_list {
            background: rgb(76, 76, 76);
        }

        .attr_select .select_input {
            border-bottom: 1px solid rgba(255, 255, 255, 0.21);
        }

        .message-box-input .message-window-input {
            background: #414141;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.32);
        }

        .message-box-input .message-window-input .input_item {
            color: rgba(255, 255, 255, 0.59);
        }

        .express_pad .data_caryon_save .exmo_button_icon.mini i {
            color: #C3C3C3;
        }

        .menu_box .option_list.menu {
            background: rgb(76, 76, 76);
        }
        .menu_box .option_list.menu .option_hr {
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid rgba(210, 210, 210, 0.01);
        }

        .vue-color-cylinder-main-box {

            background: #4C4C4C;
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.18), 0 2px 4px rgba(0, 0, 0, 0.08);
        }

        .color-range .range-title {
            color: rgba(255, 255, 255, 0.55);

        }

        .color-range .range-input input:not(:hover) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.16);
        }

        .color-range .range-input input {
            color: rgba(255, 255, 255, 0.77);
            background: rgba(255, 255, 255, 0);
        }

        .vue-color-cylinder-main-box .color-input-box .color-input .title {
            color: #ADADAD;
        }

        .vue-color-cylinder-main-box .confirm-box .button-box button:hover {
            background: #1FA1FF;
            color: #FFFFFF;
        }

        .vue-color-cylinder-main-box .confirm-box .button-box button {
            background: rgba(255, 241, 241, 0);
            color: rgba(255, 255, 255, 0.82);
        }

        .color-picker {
            border-bottom: 1px solid rgba(0, 0, 0, 0.27);
        }

        .color-range .range-bar .range-thumb {
            border: 2px solid #C8C8C8;
        }

        .setting_set_panel h3 {
            color: rgba(219, 219, 219, 0.88);
        }

        .setting_about_panel .logo i {
            color: #D5D5D5;
        }
        .setting_about_panel .lnfo-box .logo_title {
            color: rgba(255, 255, 255, 0.54);
        }
        .setting_about_panel .lnfo-box .info {
            color: rgba(255, 255, 255, 0.48);
        }
        .setting_about_panel .lnfo-box .logo_version {
            color: rgba(255, 255, 255, 0.39);
        }

        .setting_about_panel .lnfo-box .author {
            color: rgba(255, 255, 255, 0.45);
        }
        .setting_about_panel .lnfo-box .author span.by {
            color: rgba(255, 255, 255, 0.33);
        }

        .setting_about_panel .lnfo-box .logo_version:hover {
            color: #439EF5 !important;
        }

        .setting_about_panel .links-box li {
            color: rgba(255, 255, 255, 0.49);
        }
        .area_tool .exmo_icon_cheackbox:checked + .exmo_button_icon {
            border: 1px solid rgba(79, 77, 77, 0.13);
            background: rgba(255, 255, 255, 0.17);
        }

        .set_logo i, .set_logo.right i {
            opacity: .2;
        }

        div#auto-update {
            background: #4B4B4B;
        }

        div#auto-update h2 {
            color: #A29BFF;
        }
        div#auto-update .now_ver {
            color: rgba(186, 184, 219, 0.76);
        }

        div#auto-update .clog {
            color: rgba(255, 255, 255, 0.65);
        }

        div#auto-update .but-bar .exmo_button_icon {
            color: rgba(255, 255, 255, 0.59);
        }

        div#auto-update .but-bar .exmo_button_icon:hover {
            background: #2DA0F4;
        }

        .setting_about_panel .var-update-box {
            border: 1px solid #7D74FF;
            color: #9189FF;
            white-space: nowrap;
        }

        .var_item .cell {
            color: rgba(255, 255, 255, 0.49);
        }

        .var_item:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .var_item .var_value.formula {
            color: #7A9DDD;
        }

        .setting_about_panel .net-messge-box .msg-item {
            background: rgba(63, 52, 253, 0.18);
            border: 1px solid rgba(164, 100, 255, 0.53);
            color: rgba(239, 217, 255, 0.51);
        }

        .setting_about_panel .net-messge-box .msg-item.lv1 {
            background: rgba(86, 86, 86, 0.44);
            border: 1px solid rgba(165, 165, 165, 0.33);
            color: rgba(194, 194, 194, 0.7);
        }

        .menu-buttom-box .menu-box {
            background: rgb(75, 75, 75);
        }

        .option_hr {
            border-bottom: 1px solid rgba(0, 0, 0, 0.24);
        }

        .exmo_area.suspend, .express_pad {
            border-top: 2px solid rgba(0, 0, 0, 0.25);

        }

        .quick_funcs_box .quick_more_item .fun_block:not(:nth-last-of-type(1)) {
            border-bottom: 1px dashed rgba(255, 255, 255, 0.26);
        }
    }

    .pstheme3 {
        .menu-buttom-box .menu-box {
            background: #767676;
        }

        .menu_box .option_list.menu {
            background: #767676;
        }

        .attr_select .option_list, .pstheme3 .attr_select .option_list {
            background: #767676;
        }

        .attr_option.selected {
            background: rgba(211, 211, 211, 0.65);
            color: #fff;
        }
        .attr_option {
            color: rgba(255, 255, 255, 1);
        }

        .exmo_button, .exmo_button_ghost, .exmo_btn_group .btn_primary {
            border: 1px solid rgba(50, 50, 50, 0);
            background-color: rgba(126, 126, 126, 0.78);
            color: rgba(255, 255, 255, 0.67);
            box-shadow: 0 2px 1px rgba(0, 0, 0, 0.04);
        }

        .exmo_area {
            border-bottom: 2px solid rgba(0, 0, 0, 0.16);
        }

        .exmo_area.suspend, .express_pad {
            border-top: 2px solid rgba(0, 0, 0, 0.16);
        }

        .setting_about_panel .var-update-box {
            background: rgba(118, 111, 253, 0.15);
            border: 1px solid #7D74FF;
            color: #7D74FF;
        }

        .setting_about_panel .var-update-box {
            border: 1px solid #7D74FF;
            color: #C2BDFF;
        }

        .input-assist-box {
            background: #767676;
        }

        .exmo_range::-webkit-slider-thumb {
            background: #CDCDCD;
        }

        .exmo_range::-webkit-slider-runnable-track {
            background-color: rgba(0, 0, 0, 0.11);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) inset;
            border-bottom: 1px solid rgba(182, 182, 182, 0.44);
        }

        .vue-color-cylinder-main-box {
            background: #5E5E5E;
        }

        .exmo_checkbox .exmo_checkbox_shadow::before {
            background: #797979;
        }
    }

    .pstheme2 {
        .exmo_input_text:not(:focus), .exmo_select:not(:focus) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        }

        .exmo_input_text:focus, .exmo_select:focus {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }

        .attr_select .select_input {
            border-bottom: 1px solid rgba(0, 0, 0, 0.22);
            }

        .exmo_button, .exmo_button_ghost, .exmo_btn_group .btn_primary {
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.04);

        }
        .exmo_button:not(:hover), .exmo_button_ghost:not(:hover), .exmo_btn_group .btn_primary:not(:hover) {
            background-color: #DDDDDD;
        }

        .exmo_btn_group input:checked + .btn_primary {
            background: rgba(71, 135, 255, 0.59);
            border-color: rgba(255, 255, 255, 0.23);
        }

        .exmo_btn_group input:checked + .btn_primary i {
            color: #C7D4FF;
        }

        input.edit_input[type="readonly"] {
            color: #919191;
        }


        h2 {
            color: rgba(0, 0, 0, 0.6);
        }
        .exmo_box_name {
            color: #595959;

        }

        .area_tool .exmo_button_icon i {
            color: #666666;
        }

        .quick_buts .quick_but.more-but .quick_but_more_icon.more_on {
            background: -webkit-linear-gradient(bottom, rgba(19, 101, 202, 0.36), #AFB6BE);
        }

        .exmo_button_icon:hover {
            background: #D8D8D8;
        }

        .quick_funcs_box .quick_more_item {
            background: linear-gradient(180deg, rgba(158, 158, 158, 0.83) 0%, rgba(153, 153, 153, 0.24) 6px, rgba(153, 153, 153, 0.16) 98%, rgba(150, 150, 150, 0.52) 100%);
        }

        .quick_funcs_box .quick_more_item .info {
            color: #626262;
              }

        .exmo_icon_cheackbox:checked + .exmo_button_icon {
            border: 1px solid #949494;
            }
        .exmo_button_icon:hover {
            border: 1px solid rgba(157, 157, 157, 0.59);
        }

        .layer-item span.id {
            background: #909090;
            color: #c6c6c6;

        }
    }

    /*----------------------*/

</style>

<script>
    export default {

        watch: {},
        mounted: function ()
        {
        },
        props: [],
        data () {
            return {}
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>

