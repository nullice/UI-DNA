<template>
    <menu-buttom v-bind:options="options" memu_name="attribute_panel_option"
    >
        <i class="icon-briefcase"></i>
    </menu-buttom>

    <label title="{{'强制刷新'|lang}}" class="exmo_button_icon  freshen mini" v-on:click="click_freshen"
           v-bind:class="{'freshen-rotate':nowFreshen}">
        <i class="icon-refresh"></i>
    </label>


</template>
<style lang="scss" rel="stylesheet/scss">


    label.exmo_button_icon.freshen.mini {
        position: absolute;
        top: 5px;
        left: 102px;
        color: #F0F0F0;
        padding: 1px 5px;
        i {
            color: rgba(0, 0, 0, 0.42);
            font-size: 13px;
        }
    }

    .exmo_area:hover .attribute_panel_option {
        visibility: visible;
    }

    .exmo_area .attribute_panel_option {
        visibility: hidden;
    }

    .menu-buttom-box.attribute_panel_option .menu-buttom {
        margin-top: -34px;
    }

    .menu-buttom-box.attribute_panel_option .menu-box {
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

    @-webkit-keyframes freshen-rotate-key {
        0%,
        100% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    .freshen-rotate i {
        display: inline-block;
        animation: freshen-rotate-key .4s linear infinite
    }

</style>
<script>

    import  MenuButtom from '../components/MenuButtom.vue'
    import BubbleBox from '../components/MessageBox/BubbleBox.vue';

    export default{
        props: [],
        data(){
            return {
                o_use_mRNA: false,
                Gob: Gob,


                options: [
                    {
                        value: 'layer_effectall',
                        label: '图层样式',
                        title: "",
                        selected_func: null,
                        button: true,
                        class: "onlytext",
                    },
                    {
                        value: 'copy_effect',
                        label: '复制',
                        title: "以文本形式复制图层样式",
                        selected_func: this.copy_effect,
                        button: true,
                        class: "subbut",
                    },
                    {
                        value: 'paste_effect',
                        label: '粘贴',
                        title: "粘贴并应用文本形式的图层样式",
                        selected_func: this.paste_effect,
                        button: true,
                        class: "subbut",
                    },
                    {hr: true},
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '位置参数',
                        title: "",
                        selected_func: null,
                        button: true,
                        class: "onlytext",


                    },
                    {
                        value: 'copy_position',
                        label: '复制',
                        title: "复制位置参数",
                        selected_func: this.copy_position,
                        button: true,
                        class: "subbut",
                    },
                    {
                        value: 'paste_position',
                        label: '粘贴',
                        title: "粘贴并应用形状参数",
                        selected_func: this.paste_position,
                        button: true,
                        class: "subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '形状参数',
                        title: "",
                        selected_func: null,
                        button: true,
                        class: "onlytext",
                    },
                    {
                        value: 'copy_shape',
                        label: '复制',
                        title: "复制形状参数",
                        selected_func: this.copy_shape,
                        button: true,
                        class: "subbut",
                    },
                    {
                        value: 'paste_shape',
                        label: '粘贴',
                        title: "粘贴并应用形状参数",
                        selected_func: this.paste_shape,
                        button: true,
                        class: "subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '文本参数',
                        title: "",
                        selected_func: null,
                        button: true,
                        class: "onlytext",
                    },
                    {
                        value: 'copy_text',
                        label: '复制',
                        title: "复制文本参数",
                        selected_func: this.copy_text,
                        button: true,
                        class: "subbut",
                    },
                    {
                        value: 'paste_text',
                        label: '粘贴',
                        title: "粘贴并应用文本参数",
                        selected_func: this.paste_text,
                        button: true,
                        class: "subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '对象参数',
                        title: "",
                        selected_func: null,
                        button: true,
                        class: "onlytext",
                    },
                    {
                        value: 'copy_smartObject',
                        label: '复制',
                        title: "复制智能对象参数",
                        selected_func: this.copy_smartObject,
                        button: true,
                        class: "subbut",
                    },
                    {
                        value: 'paste_smartObject',
                        label: '粘贴',
                        title: "粘贴并应用智能对象参数",
                        selected_func: this.paste_smartObject,
                        button: true,
                        class: "subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '样式参数',
                        title: "",
                        selected_func: null,
                        button: true,
                        class: "onlytext",
                    },
                    {
                        value: 'copy_quickEffect',
                        label: '复制',
                        title: "复制样式参数",
                        selected_func: this.copy_quickEffect,
                        button: true,
                        class: "subbut",
                    },
                    {
                        value: 'paste_quickEffect',
                        label: '粘贴',
                        title: "粘贴并应用样式参数",
                        selected_func: this.paste_quickEffect,
                        button: true,
                        class: "subbut",
                    },
                    {br: true},
                    //-------------------------------
                    {
                        value: 'inver_order_layers',
                        label: '更多参数',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        class: "onlytext",
                    },
                    {
                        value: 'copy_more',
                        label: '复制',
                        title: "复制更多参数",
                        selected_func: this.copy_more,
                        button: true,
                        class: "subbut",
                    },
                    {
                        value: 'paste_more',
                        label: '粘贴',
                        title: "粘贴并应用更多参数",
                        selected_func: this.paste_more,
                        button: true,
                        class: "subbut",
                    },
                    {br: true},
                    {hr: true},
                    //-------------------------------
                    {
                        button: true,
                        value: 'useAssign',
                        label: '复制赋值参数',
                        title: "把复制的参数文本压缩成 mRNA 短文本",
                        state: true,
                        block: true,
                        type: "multi_select",
                    },
                    {br: true},
                    {
                        button: true,
                        value: 'usemRNA',
                        label: '压缩复制的文本',
                        title: "把复制的参数文本压缩成 mRNA 短文本",
                        state: true,
                        block: true,
                        type: "multi_select",
                    }
                ]
            }
        },
        methods: {

            click_freshen: function ()
            {

                var self = this
                self.nowFreshen = true


                Gob.disableSelectEvent =false;
                Gob.selectUpdateing = false;
                Gob.updateSelect()
                setTimeout(function ()
                {
                    self.nowFreshen = false
                }, 800)
            },

            copy_effect: async function ()
            {
                var str = await Gob.exportEffectRNA(this.use_mRNA, !this.use_mRNA)
                NodeCopy.copy(str)
            },
            paste_effect: function ()
            {
                var str = NodeCopy.paste();
                Gob.importEffectRNA(str)

            },
            copy_position: async function ()
            {
                var str = await Gob.exportGobRNA("position", this.use_Assign, this.use_mRNA, !this.use_mRNA)
                NodeCopy.copy(str)
            },
            paste_position: async function ()
            {
                var str = NodeCopy.paste();
                Gob.importGobRNA("position", str)
            },
            copy_shape: async function ()
            {
                var str = await Gob.exportGobRNA("shape", this.use_Assign, this.use_mRNA, !this.use_mRNA)
                NodeCopy.copy(str)
            },
            paste_shape: async function ()
            {
                var str = NodeCopy.paste();
                Gob.importGobRNA("shape", str)
            },
            copy_text: async function ()
            {
                var str = await Gob.exportGobRNA("text", this.use_Assign, this.use_mRNA, !this.use_mRNA)
                NodeCopy.copy(str)
            },
            paste_text: async function ()
            {
                var str = NodeCopy.paste();
                Gob.importGobRNA("text", str)
            },
            copy_smartObject: async function ()
            {
                var str = await Gob.exportGobRNA("smartObject", this.use_Assign, this.use_mRNA, !this.use_mRNA)
                NodeCopy.copy(str)
            },
            paste_smartObject: async function ()
            {
                var str = NodeCopy.paste();
                Gob.importGobRNA("smartObject", str)
            },
            copy_quickEffect: async function ()
            {
                var str = await Gob.exportGobRNA("quickEffect", this.use_Assign, this.use_mRNA, !this.use_mRNA)
                NodeCopy.copy(str)
            },
            paste_quickEffect: async function ()
            {
                var str = NodeCopy.paste();
                Gob.importGobRNA("quickEffect", str)
            },
            copy_more: async function ()
            {
                var str = await Gob.exportGobRNA("more", this.use_Assign, this.use_mRNA, !this.use_mRNA)
                NodeCopy.copy(str)
            },
            paste_more: async function ()
            {
                var str = NodeCopy.paste();
                Gob.importGobRNA("more", str)
            },

        },
        computed: {

            nowFreshen: {
                get: function ()
                {
                    return setSystem.ui.panel.att.nowFreshen
                },
                set: function (x)
                {
                    setSystem.ui.panel.att.nowFreshen = x;
                }

            },
            use_mRNA: {
                get: function ()
                {
                    return this.options[this.options.length - 1].state;
                }
            },
            use_Assign: {
                get: function ()
                {
                    return this.options[this.options.length - 2].state;
                }
            },

        },
        components: {
            "menu-buttom": MenuButtom,
            "bubble-box": BubbleBox,
        }
    }
</script>
