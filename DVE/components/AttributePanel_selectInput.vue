<template>
    <div select_input>
        <attr-select
                     v-bind:block="block"
                     v-bind:in_class="in_class"
                     v-bind:default_value="default_value"
                     v-bind:value.sync="value"
                     v-bind:select_style="select_style"
                     v-bind:options="options"
        >
        </attr-select>


    </div>
</template>
<style>

</style>
<script>
    import AttrSelect from "./AttributePanel_select.vue"

    export default{

        props: ['value', 'block', 'select_style', 'options', 'default_value','in_class'],
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            "attr-select": AttrSelect
        }
    }
</script>
