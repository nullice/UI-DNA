<template>
    <menu-buttom v-bind:options="options" memu_name="var_panel_option" v-bind:click_func="click_func"
    >
        <i class="icon-briefcase"></i>
    </menu-buttom>
</template>
<style lang="scss" rel="stylesheet/scss">


    .var_panel_option {
        .menu-buttom {
            right: 76px;
        }
    }

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

    .exmo_area:hover .var_panel_option {
        visibility: visible;
    }

    .exmo_area .var_panel_option {
        visibility: hidden;
    }

    .menu-buttom-box.var_panel_option .menu-buttom {
        margin-top: -34px;
    }

    .menu-buttom-box.var_panel_option .menu-box {
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
                options: [
                    {
                        value: 'copy_var',
                        label: Lang.from('复制'),
                        title: Lang.from("复制文本形式的变量列表"),
                        selected_func: this.copy_var,
                        button: true,

                    },
                    {
                        value: 'paste_var',
                        label: Lang.from('粘贴'),
                        title: Lang.from("粘贴文本形式的变量列表"),
                        selected_func: this.paste_var,
                        button: true,
                    },
                    {br: true},
                    {
                        value: 'export_var',
                        label: Lang.from('导出'),
                        title: Lang.from("导出变量列表"),
                        selected_func: this.export_var,
                        button: true,

                    },
                    {
                        value: 'import_var',
                        label: Lang.from('导入'),
                        title: Lang.from("导入变量列表"),
                        selected_func: this.import_var,
                        button: true,

                    },
                    {hr: true},
                    {br: true},
                    {
                        value: 'delete_all',
                        label: Lang.from('清空变量列表'),
                        title: Lang.from("删除变量列表中所有内容"),
                        selected_func: this.delete_all,
                        button: true,
                        block: true
                    },
                ]
            }
        },
        methods: {

            click_func: function ()
            {
                var a = $(".var_panel")
                if (a.hasClass("suspend_on") == false)
                {
                    var but = $(".var_panel .tool:nth(1) label")
                    but.click();

                }


            },


            copy_var: function ()
            {
                var varStr = JSON.stringify(varSystem.vars)
                NodeCopy.copy(varStr)
            },
            paste_var: function ()
            {
                var varStr = NodeCopy.paste()

                try
                {
                    var ob = JSON.parse(varStr)
                    if (ob != undefined)
                    {
                        varSystem.importVarsFromObject(ob)
                    }

                } catch (e)
                {
                    console.error("VarPanel_optionMenu.vue - paste_var()", e)
                }
            },
            export_var: function ()
            {
                var varStr = JSON.stringify(varSystem.vars)
                appCaryon.userSaveFile(varStr, "varList.json", "json", Lang.from("导出到文件"))
            },
            import_var: function ()
            {
                var varStr = appCaryon.userReadFile(Lang.from("打开一个变量列表文件"), ["json"])

                try
                {
                    var ob = JSON.parse(varStr)
                    if (ob != undefined)
                    {
                        varSystem.importVarsFromObject(ob)
                    }

                } catch (e)
                {
                    console.error("VarPanel_optionMenu.vue - import_var()", e)
                }
            },
            delete_all: function ()
            {

                var self = this;

                var data = [
                    {name: "", type: "textnote", html: Lang.from("是否真的要清空变量列表?")},
                ]

                UI_action.show_message_input("layer_selector", "确认", data, ok_func)

                function ok_func(data, doneFunc)
                {
                    varSystem.loadVarsFromObject({})
                    doneFunc()
                }


            }


        },
        computed: {},
        components: {
            "menu-buttom": MenuButtom,
            "bubble-box": BubbleBox,
        }
    }
</script>
