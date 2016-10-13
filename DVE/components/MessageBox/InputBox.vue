<template>
    <div class="message-box-input  animated fadeInDown message-color-{{msg_color}}">
        <div class="message-window">
            <i class="icon-info"></i>
            <span class="message-title">{{msg_title}}</span>
            <span class="message-content">{{msg}}</span>
        </div>
    </div>
</template>


<style lang="scss">


</style>
<script>

    export default{
        props: ["msg","msg_title","msg_color"],
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>
