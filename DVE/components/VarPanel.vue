<template>
    <a-area area_title="变量列表" area_id="var_panel">
        <bubble-box v-if="o_msg_bubble.var_panel.show"
                    v-bind:msg="o_msg_bubble.var_panel.msg"
                    v-bind:msg_title="o_msg_bubble.var_panel.title"
                    v-bind:msg_color="o_msg_bubble.var_panel.color"
        ></bubble-box>

        <input-box
                v-if="o_msg_input.var_panel.show"
                v-bind:msg_title="o_msg_input.var_panel.title"
                v-bind:msg_input_data="o_msg_input.var_panel.data"
                v-bind:msg_callback="o_msg_input.var_panel.callback"
                v-bind:msg_mode="o_msg_input.var_panel"
                v-bind:msg="o_msg_input.var_panel.msg"
        >
        </input-box>


        <div class="var_tool">
            <button v-on:click="add_new_var" class="exmo_button_icon mini"><i class="icon-add-new"></i></button>
        </div>


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

                <button v-on:click="delete_a_var($key)" class="exmo_button_icon mini var_delete"><i
                        class="icon-close"></i></button>
            </div>
        </div>

    </a-area>
</template>

<style lang="scss">

    .var_item {
        margin: 0 0;
        padding: 0 10px;
        position: relative;
        /*border: 1px solid rgba(0, 0, 0, 0);*/

        &:hover {
            background: rgba(0, 0, 0, 0.065);
            /*border: 1px solid rgba(0, 0, 0, 0.04);*/
            /*!* border: 1px solid rgba(0, 0, 0, 0.04); *!*/
            border-bottom: 1px solid rgba(0, 0, 0, 0.0) !important;
            border-radius: 4px;
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

        .var_delete {
            display: none;
            position: absolute;
            top: 0;
            right: 3px;
        }
        &:hover .var_delete {
            background-color: transparent;
            display: inline-block;

            &.exmo_button_icon.mini {
                padding-top: 4px;
            }

            &.exmo_button_icon.mini:hover i {
                font-weight: bold;
                color: #EC5D5D;

            }

            &.exmo_button_icon:hover {
                background: rgba(255, 255, 255, 0);
                border: none;
                margin-top: 1px;
                margin-right: 1px;
            }
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

    .var_tool {
        position: absolute;
        right: 10px;
    }
</style>


<script>
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import EditTextLabel from '../components/EditTextLabel.vue';
    import BubbleBox from '../components/MessageBox/BubbleBox.vue';
    import InputBox from '../components/MessageBox/InputBox.vue';
    import Area from '../components/area.vue';


    export default {
        data(){
            return {

                vars: varSystem.vars,
                o_msg_bubble: UI_model.msg_bubble,
                o_msg_input: UI_model.msg_input,
                o_filter_key: "",
                o_set_func_name: function (newValue)
                {
                    var result = varSystem.renameVar(this.in_value, newValue);

                    this.in_value = result.name
                    if (result.err == undefined)
                    {
                        UI_action.message_bubble("var_panel", "", Lang.from("重命名完成"), "none", -500)
                    } else
                    {
                        if (result.err == "repe")
                        {
                            //UI_action.message_bubble("var_panel","","手及水电费撒打发")
                            UI_action.message_bubble("var_panel", "", Lang.from("名称已存在"), "red")
                        } else if (result.err == "Illegal_name")
                        {
                            UI_action.message_bubble("var_panel", "", Lang.from("变量名称不合法"), "red")
                        }
                    }

                },
            }
        },

        methods: {
            add_new_var: function ()
            {
                var data = [{name: "变量名", type: "text", varify: varify_varName}, {name: "值", type: "text"},
                    {
                        name: "类型", type: "select", options: [
                        {text: Lang.from('模板变量'), value: 'template'},
                        {text: Lang.from('普通变量'), value: 'normal'},
                        {text: Lang.from('脚本变量'), value: 'script'}
                    ],
                        select: "normal"
                    },]

                var varify_varName = function (x, e)
                {
                    var result = varSystem.varifyName(x)
                    // console.log(e)
                    if (result.pass == false)
                    {
                        if (result.err == "repe")
                        {
                            UI_action.message_bubble("input_box", "", Lang.from("名称已存在"), "red");
                            if (e != undefined)
                            {
                                e.srcElement.classList.add("illegal_value")
                            }
                            return false;
                        } else if (result.err == "Illegal_name")
                        {
                            UI_action.message_bubble("input_box", "", Lang.from("变量名称不合法"), "red");
                            if (e != undefined)
                            {
                                e.srcElement.classList.add("illegal_value")
                            }
                            return false;
                        }
                    }
                    else
                    {
                        if (e != undefined)
                        {
                            e.srcElement.classList.remove("illegal_value")
                        }
                        return true;
                    }
                }


                var ok_func = function (data, doneFunc)
                {
                    if (varify_varName(data[0].value))
                    {
                        varSystem.addVar(data[0].value, data[1].value)
                        if (doneFunc != undefined)
                        {
                            doneFunc();
                        }

                    }
                }

                UI_action.message_input("var_panel", "新建变量", data, ok_func)
            },
            delete_a_var: function (name)
            {
                if (varSystem.vars[name] != undefined)
                {
                    var data = []


                    var ok_func = function (data, doneFunc)
                    {
                        varSystem.removeVar(name)
                        if (doneFunc != undefined)
                        {
                            doneFunc();
                        }
                    }

                    if (varSystem.vars[name].relatives.length > 0)
                    {
                        var text = `这些变量引用了 ${name}：<p class="p_var_list">${varSystem.vars[name].relatives.toString()}</p>如果删除  ${name} 会使这些变量无效 <p>确认要删除 ${name} ？</p>`
//                        var text = "这些变量引用了" + name+varSystem.vars[name].relatives.toString()+"如果删除" +name+"会使这些变量无效"
                        UI_action.message_input("var_panel", "删除变量 " + name, data, ok_func, text)
                    } else
                    {
                        UI_action.message_input("var_panel", "删除变量 " + name, data, ok_func, `确认要删除 ${name} ？`)
                    }


                }


            }

        },

        components: {
            "value-input": ValueInput,
            "edit-text-label": EditTextLabel,
            "bubble-box": BubbleBox,
            "input-box": InputBox,
            "a-area": Area
        },

    };

</script>
