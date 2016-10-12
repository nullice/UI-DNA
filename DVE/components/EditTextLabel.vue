<template>
    <div class="display_label {{display_class}}" v-show="!o_editing" v-on:dblclick="dbclick">{{in_value}}</div>
    <input type="text" id="edit_label_id_{{in_value}}" class="edit_label {{edit_class}}" v-model="edit_value" lazy
           v-if="o_editing" v-on:blur="editEnd">
</template>
<style>

    .edit_label{
        cursor:text ;
    }

</style>
<script>

    export default{
        props: ["in_value", "display_class", "edit_class", "edit_set_func"],
        data(){
            return {
                o_editing: false,

            }

        },
        methods: {
            dbclick: function (e)
            {
                this.o_editing = true;

                var e = this.$el.parentElement.children;
                setTimeout(function ()
                {
                    for (var i = 0; i < e.length; i++)
                    {
                        console.log(e[i] + ":"+e[i].classList[0])
                        if(e[i].classList[0]&&e[i].classList[0]=="edit_label")
                        {

                            e[i].focus();
                            e[i].select();
                        }
                    }
                },100)





//
//                window.ee = this.$el.parentElement.children;
//                console.log("edit_label_id_" + this.in_value)


            },

            editEnd: function ()
            {
                this.o_editing = false;
            }
        },
        computed: {
            // 一个计算属性的 getter
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
                        return x;
                    }

                }
            },
        }


    }
</script>
