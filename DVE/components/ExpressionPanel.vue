<template>
    <div class="bottom_pad"></div>
    <div class="express_pad">
        <button class="express_but exmo_button_icon mini"><i class="icon-add-new"></i>{{"渲染"|lang}}</button>
    </div>


</template>
<style lang="scss">


    .express_pad {
        height: 50px;
        width: 100%;
        position: fixed;
        bottom: 0;
        background: inherit;
        border-top: 2px solid rgba(0, 0, 0, 0.08);
    }

    .bottom_pad {
        height: 50px;
    }


</style>
<script>

    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>
