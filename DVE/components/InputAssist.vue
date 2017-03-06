<template>

    <div class="input-assist-box">
123
        <!--<input type="text" @blur.stop="bl" @focus.stop="fs" >-->

    </div>


</template>
<style>
    .input-assist-box{

        position: absolute;
        z-index: 44;
        background: whitesmoke;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.11), 0px 5px 6px rgba(34, 34, 34, 0.15);
        border-radius: 2px;
        padding: 0;

    }


</style>
<script>

    export default{
        props: ["assist_type",],
        data(){
            return {
                o_editing: false,
            }

        },
        methods:{

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
                        this.in_value =x;
                        return x;
                    }

                }
            },
        }


    }
</script>
