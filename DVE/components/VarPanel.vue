<template>
    <div class="exmo_area">
        <h2> 变量列表 </h2>

        <div class="var_list">
            <div class="var_list_filter">
                <span class="icon" title="{{过滤名称|lang}}"><i class="icon-filter"></i></span>
                <input type="text"  title="{{过滤名称|lang}}"class="exmo_input_text  " v-model="o_filter_key">
            </div>


            <!--todo:计划增加拼音、假名过滤支持-->
            <div class="var_item" v-for="var in vars |  filterBy o_filter_key in 'name'">
                <edit-text-label
                        v-bind:in_value.sync="$key"
                        display_class="var_name cell"
                        edit_class="var_name cell"
                        v-bind:edit_set_func="o_set_func_name"
                ></edit-text-label>


                <edit-text-label
                        v-bind:class_switch_1="var.isFormula?'formula':''"
                        v-bind:in_value.sync="var.value"
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
    export default {
        data(){
            return {
                vars: varSystem.vars,


                o_filter_key: "",
                o_set_func_name: function (newValue)
                {
                    this.in_value = varSystem.renameVar(this.in_value, newValue);
                }

            }
        },
        components: {
            "value-input": ValueInput,
            "edit-text-label": EditTextLabel

        },

    };

</script>
