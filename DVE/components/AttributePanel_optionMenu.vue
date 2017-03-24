<template>
    <menu-buttom v-bind:options="options" memu_name="attribute_panel_option"
    >
        <i class="icon-briefcase"></i>
    </menu-buttom>

</template>
<style lang="scss" rel="stylesheet/scss">

     .menu-buttom-box.attribute_panel_option .menu-buttom{
        margin-top: -34px;
    }

     .menu-buttom-box.attribute_panel_option .menu-box{
         margin-top: -12px;
     }



</style>
<script>

    import  MenuButtom from '../components/MenuButtom.vue'
    import BubbleBox from '../components/MessageBox/BubbleBox.vue';

    export default{
        props: [],
        data(){
            return {

                options: [
                    {
                        value: 'inver_order_layers',
                        label: '位置信息',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: function ()
                        {

                        },
                        button: true,

                    },
                    {
                        value: 'name_order_layers',
                        label: '复制',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                    },
                    ,
                    {
                        value: 'name_order_layers',
                        label: '粘贴',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                    },
                    {hr: true},
                    {
                        value: 'rename_rename',
                        label: '重命名图层',
                        title: "重命名选中图层",
                        selected_func: this.rename_rename,
                        button: true,
                        block: true,
                    },
                    {
                        value: 'rename_replace',
                        label: '图层名称替换',
                        title: "在选中图层中替换图层名称",
                        selected_func: this.rename_replace,
                        button: true,
                        block: true,
                    },
                    {
                        value: 'find_select',
                        label: '寻找图层',
                        title: "根据图层名称寻找并选中图层",
                        selected_func: this.find_select,
                        button: true,
                        block: true,
                    },
                    {
                        value: 'tag_select',
                        label: '寻找标签',
                        title: "根据图层标签寻找并选中图层",
                        selected_func: this.tag_select,
                        button: true,
                        block: true,
                    },

                    {hr: true},
                    {
                        value: 'i_select_layers',
                        label: '反选图层',
                        title: "根据图层名称寻找并选中图层",
                        selected_func: this.i_select_layers,
                        button: true,
                        block: true,
                    },
                    {
                        value: 'selectShot',
                        label: '记录',
                        title: "记录当前所有图层选中状态",
                        selected_func: this.selectShot,
                        button: true,

                    },
                    {
                        value: 'selectRepaly',
                        label: '还原',
                        title: "还原图层选中状态的记录",
                        selected_func: this.selectRepaly,
                        button: true,
                        class: "rigth-but",

                    },
//
//                    {hr: true},
//
//                    {
//                        value: 'radian_all',
//                        label_html: '<i class=" icon-radio-unchecked" style="font-size: 14px;">',
//                        title: "应用到所有圆角",
//                        selected_func: this.open_file,
//                        button: true
//                    },
//                    {
//                        value: 'info_pin',
//                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
//                        title: "创建变量标注",
//                        selected_func: this.info_pin,
//                        button: true
//                    }
                ]
            }
        },
        methods: {

        },
        computed: {},
        components: {
            "menu-buttom": MenuButtom,
            "bubble-box": BubbleBox,
        }
    }
</script>
