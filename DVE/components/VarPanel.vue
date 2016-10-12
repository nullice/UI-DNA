<template>
    <div class="exmo_area">
        <h2> 变量列表 </h2>

        <div class="var_list">
            <div class="var_item" v-for="var in vars">
                <edit-text-label
                        v-bind:in_value.sync="$key"
                        display_class="var_name cell"
                        edit_class="var_name cell"
                        v-bind:edit_set_func="o_set"
                >
                </edit-text-label>


                <div class="var_value cell" v-bind:class="{formula:var.isFormula}">{{var.value}}</div>

            </div>
        </div>

    </div>
</template>

<style lang="scss">

    .var_item {
        margin: 4px 0;

        .var_name, .var_value {
            display: inline-block;
        }

        .cell {
            font-size: 13px;
            padding: 4px 4px;
            color: #666;

        }

        .cell:not(input)
        {
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


        .edit_label{
            min-width: 50px;
            border: none;
            border-bottom: 1px solid #6596E2;
            background: none;
            outline: none;
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
                _editing: {},
                o_set: function (newValue)
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
