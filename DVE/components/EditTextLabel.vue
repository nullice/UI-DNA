<template>

    <div class="edit-text-label">
        <div class="display_label {{display_class}} {{class_switch_1}}" v-show="!o_editing" v-on:dblclick="dbclick">
            {{show_text}}
        </div>
        <input type="text" id="edit_label_id_{{in_value}}"
               class="edit_label edit_label_input {{edit_class}} {{class_switch_1}}"
               v-model="edit_value" lazy
               v-if="o_editing" v-on:blur="editEnd">

    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .edit-text-label {
        display: inline;
        -webkit-user-select: text;
        .edit_label {
            cursor: text;
        }
        white-space: nowrap;
    }
</style>
<script>

    export default{
        props: ["in_value", "var_name", "display_class", "edit_class", "class_switch_1", "edit_set_func"],
        data(){
            return {
                o_editing: false,
            }

        },
        methods: {
            /**
             * 判断是否是多行文本，或长度过大的文本。用来决定是使用行内编辑器还是打开多行输入窗口
             */
            check_longTextValue: function (text)
            {
                if (text != undefined && text.length != undefined)
                {
                    var reg = /\n/
                    if (reg.test(text))
                    {
                        return true
                    } else
                    {
                        if (text.length > 16)
                        {
                            return true
                        }
                    }
                }


            },

            dbclick: function (e)
            {
                if (this.check_longTextValue(this.in_value) || TYP.type(this.in_value) == "object")
                {

                    var isObject = false;
                    if (TYP.type(this.in_value) == "object")
                    {
                        var isObject = true
                    }


                    var data = [
                        {name: "", type: "textareaBig", cows: 5, value: this.in_value},
                    ]
                    var self = this
                    var ok_func = function (data, doneFunc)
                    {


                        if (isObject)
                        {


                            try
                            {
                                self.in_value = JSON.parse(data[0].value)
                            } catch (e)
                            {
                                console.info("edit-text-label var :err :object - JSON", e)
                                try
                                {
                                    eval("self.in_value =" + data[0].value)
                                } catch (e)
                                {
                                    console.info("edit-text-label var :err :object - eval", e)
                                }

                            }



                            


                        } else
                        {
                            self.in_value = data[0].value
                        }

                        if (doneFunc != undefined)
                        {
                            doneFunc();
                        }

                    }
                    /*编辑对象内容*/

                    if (isObject)
                    {
                        data[0].value = JSON.stringify(this.in_value)
                    }


                    UI_action.show_message_input("var_edit", "编辑：" + this.var_name, data, ok_func)

                }
                else
                {
                    this.o_editing = true;

                    var e = this.$el.children;
                    setTimeout(function ()
                    {
                        for (var i = 0; i < e.length; i++)
                        {
                            if (e[i].classList[0] && e[i].classList[0] == "edit_label")
                            {
                                e[i].focus();
                                e[i].select();
                            }
                        }
                    }, 200)

//                window.ee = this.$el.parentElement.children;
//                console.log("edit_label_id_" + this.in_value)
                }
            },

            editEnd: function ()
            {
                this.o_editing = false;
            }
        },
        computed: {
            // 一个计算属性的 getter
            show_text: {
                get: function ()
                {

                    if (TYP.type(this.in_value) == "object")
                    {
                        return Lang.from("[对象变量]")
                    }

                    return this.in_value;
                }
            },


            edit_value: {
                get: function ()
                {
                    return this.in_value;
                },
                set: function (x)
                {
                    if (this.edit_set_func != undefined)
                    {
                        return this.edit_set_func(x);
                    } else
                    {
                        this.in_value = x;
                        return x;
                    }

                }
            },
        }


    }
</script>
