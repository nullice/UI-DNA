<template>
    <value-input name="H" v-bind:edit_value.sync="Gob.position.h"
                 v-bind:out_value.sync="Gob.position.assignment.h"
                 v-bind:enable_assign.sync="Gob.position.enableAssigns.h"></value-input>


</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    export default{
        props: ['edit_value', "out_value", 'name','name_html', "value_type", "enable_assign", "mini", "mode_color"],
        data(){

            return{
                msg:'hello vue'
            }
        },
        components:{
            "value-input": ValueInput,
        }
    }
</script>
