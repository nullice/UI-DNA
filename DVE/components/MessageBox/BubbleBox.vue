<template>
    <div class="message-box-bubbble  animated fadeInDown message-color-{{msg_color}}">

        <div class="message-window">
            <i class="icon-info"></i>
            <span class="message-title">{{msg_title}}</span>
            <span class="message-content">{{msg}}</span>
        </div>
    </div>
</template>
<style>
    .message-box-bubbble {
        position: absolute;
        background: #5f9ee8;
        border-radius: 4px;
        width: 200px;
        height: 32px;
        right: 0;
        left: 0;
        margin: auto;
        margin-top: -35px;
        font-size: 12px;
        z-index: 33;
    }

    .message-box-bubbble.message-color-red {
        background: #F06E6E;
    }

    .message-box-bubbble .message-window {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        line-height: 32px;
        padding: 0 30px;
        color: rgba(255, 255, 255, 0.92);
    }

    .message-box-bubbble .message-title {
        font-weight: bold;
    }

    .message-box-bubbble .message-window i.icon-info {
        color: rgba(0, 0, 0, 0.44);
        line-height: 32px;
        vertical-align: text-bottom;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 10px;
        font-size: 13px;
    }


</style>
<script>

    export default{
        props: ["msg", "msg_title", "msg_color"],
        data(){
            return {}
        },
        components: {}
    }
</script>
