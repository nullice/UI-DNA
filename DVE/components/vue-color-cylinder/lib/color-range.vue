<template>
    <div>
        <input type="text" v-model="in_value"> [{{in_value}}],
        <button v-on:click="in_value=333" > a d ds</button>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>

    export default{
        props: ['in_value',],
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>
