<template>
    <div class="exmo_area">
        <h2> 变量列表 </h2>
        <bubble-box v-if="o_msg_bubble.var_panel.show"
                    v-bind:msg="o_msg_bubble.var_panel.msg"
                    v-bind:msg_title="o_msg_bubble.var_panel.title"
                    v-bind:msg_color="o_msg_bubble.var_panel.color"
        ></bubble-box>


        <div class="var_list">
            <div class="var_list_filter">
                <span class="icon" title="{{'过滤名称'|lang}}"><i class="icon-filter"></i></span>
                <input type="text" title="{{'过滤名称'|lang}}" class="exmo_input_text  " v-model="o_filter_key">
            </div>


            <!--todo:计划增加拼音、假名过滤支持-->
            <div class="var_item" v-for="a_var in vars |  filterBy o_filter_key in 'name'">
                <edit-text-label
                        v-bind:in_value.sync="$key"
                        display_class="var_name cell"
                        edit_class="var_name cell"
                        v-bind:edit_set_func="o_set_func_name"
                ></edit-text-label>


                <edit-text-label
                        v-bind:class_switch_1="a_var.isFormula ? 'formula' :''"
                        v-bind:in_value.sync="a_var.value"
                        display_class="var_value cell"
                        edit_class="var_value cell"

                ></edit-text-label>


            </div>
        </div>

    </div>
</template>

<style lang="scss">

    .var_item {
        margin: 0 0;
        padding: 0 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0);
        border-top: 1px solid rgba(0, 0, 0, 0);

        &:hover {
            background: rgba(0, 0, 0, 0.05);
            border-bottom: 1px solid rgba(0, 0, 0, 0.04);
            border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .var_name, .var_value {
            display: inline-block;
        }

        .cell {
            font-size: 13px;
            padding: 4px 4px;
            color: #666;

        }

        .cell:not(input) {
            cursor: default;
        }

        .var_name {
            width: 30%;
            max-width: 100px;
        }

        .var_value {
            width: 60%;
            border-left: 1px solid rgba(173, 173, 173, 0.01);
            padding-left: 4px;
            color: #89939c;
            /* max-width: 100px; */
        }
        .var_value.formula {
            color: #4b83e8;

        }

        &:not(:nth-last-of-type(1)) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }
    }

    .var_list .edit_label {
        min-width: 50px;
        border: none;
        border-bottom: 1px solid #6596E2;
        background: none;
        outline: none;
    }

    .var_list_filter {
        .icon {
            color: #818181;
            font-size: 11px;
        }
        input {
            width: 73px;
            margin: 0 0 4px 0;
        }

        .exmo_input {

        }
    }


</style>


<script>
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import EditTextLabel from '../components/EditTextLabel.vue';
    import BubbleBox from '../components/MessageBox/BubbleBox.vue';

    export default {
        data(){
            return {

                vars: varSystem.vars,
                o_msg_bubble: UI_model.msg_bubble,
                o_filter_key: "",
                o_set_func_name: function (newValue)
                {
                    var result = varSystem.renameVar(this.in_value, newValue);

                    this.in_value = result.name
                    if (result.err == undefined)
                    {
                        UI_action.message_bubble("var_panel", "", Lang.from("重命名完成"),"none",-500)
                    } else
                    {
                        if (result.err == "repe")
                        {
                            //UI_action.message_bubble("var_panel","","手及水电费撒打发")
                            UI_action.message_bubble("var_panel", "", Lang.from("名称已存在"),"red")
                        } else if (result.err == "Illegal_name")
                        {
                            UI_action.message_bubble("var_panel", "", Lang.from("变量名称不合法"),"red")
                        }
                    }
                    
                },
            }
        },
        components: {
            "value-input": ValueInput,
            "edit-text-label": EditTextLabel,
            "bubble-box": BubbleBox,

        },

    };

</script>
