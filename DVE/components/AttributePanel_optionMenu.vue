<template>
    <menu-buttom v-bind:options="options" memu_name="attribute_panel_option"
    >
        <i class="icon-briefcase"></i>
    </menu-buttom>
{{options[options.length-1].state}}
</template>
<style lang="scss" rel="stylesheet/scss">

    .exmo_area:hover .attribute_panel_option{
        visibility: visible;
    }
    .exmo_area .attribute_panel_option{
        visibility: hidden;
    }


    .menu-buttom-box.attribute_panel_option .menu-buttom{
        margin-top: -34px;
    }

     .menu-buttom-box.attribute_panel_option .menu-box{
         margin-top: -12px;
     }
     .attr_option.inline_block.subbut {
         /* display: none; */
         width: 29px;
         text-align: center;
         white-space: nowrap;
         padding: 6px 9px;
         /* padding-left: 2px; */
         /* color: rgba(0, 0, 0, 0.55); */
     }


</style>
<script>

    import  MenuButtom from '../components/MenuButtom.vue'
    import BubbleBox from '../components/MessageBox/BubbleBox.vue';

    export default{
        props: [],
        data(){
            return {

                o_use_mRNA:false,

                options: [
                    {
                        value: 'inver_order_layers',
                        label: '图层样式',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        class:"onlytext",


                    },
                    {
                        value: 'name_order_layers',
                        label: '复制',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    ,
                    {
                        value: 'name_order_layers',
                        label: '粘贴',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    {hr: true},
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '位置参数',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        class:"onlytext",


                    },
                    {
                        value: 'name_order_layers',
                        label: '复制',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    ,
                    {
                        value: 'name_order_layers',
                        label: '粘贴',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '形状参数',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        class:"onlytext",


                    },
                    {
                        value: 'name_order_layers',
                        label: '复制',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    ,
                    {
                        value: 'name_order_layers',
                        label: '粘贴',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '文本参数',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        class:"onlytext",


                    },
                    {
                        value: 'name_order_layers',
                        label: '复制',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    ,
                    {
                        value: 'name_order_layers',
                        label: '粘贴',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '对象参数',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        class:"onlytext",


                    },
                    {
                        value: 'name_order_layers',
                        label: '复制',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    ,
                    {
                        value: 'name_order_layers',
                        label: '粘贴',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '样式参数',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        class:"onlytext",
                    },
                    {
                        value: 'name_order_layers',
                        label: '复制',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    ,
                    {
                        value: 'name_order_layers',
                        label: '粘贴',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '更多参数',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        class:"onlytext",
                    },
                    {
                        value: 'name_order_layers',
                        label: '复制',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    ,
                    {
                        value: 'name_order_layers',
                        label: '粘贴',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        class:"subbut",
                    },
                    {br: true},
                    {hr: true},
                    //-------------------------------
                    {
                        button: true,
                        value: 'usemRNA',
                        label: '压缩复制的文本',
                        title: "把复制的参数文本压缩成 mRNA 短文本",
                        selected_func: this.name_order_layers,
                        state:true,
                        block:true,
                        type:"multi_select",
                    },


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
