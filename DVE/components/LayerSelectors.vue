<template>

    <menu-buttom v-bind:options="options" v-bind:memu_name="layer_selsectors"
    >
        <i class="icon-briefcase"></i>
    </menu-buttom>
    <input-box
            v-if="o_msg_input.layer_selector.show"
            v-bind:msg_title="o_msg_input.layer_selector.title"
            v-bind:msg_input_data="o_msg_input.layer_selector.data"
            v-bind:msg_callback="o_msg_input.layer_selector.callback"
            v-bind:msg_mode="o_msg_input.layer_selector"
            v-bind:msg="o_msg_input.layer_selector.msg"
    >
    </input-box>

    <a-area area_title="选中图层" area_id="layer_selectors"
            v-bind:area_disable_fixbut="true"
            v-bind:area_init_close="true"
    >
        <bubble-box v-if="o_msg_bubble.layer_selector.show"
                    v-bind:msg="o_msg_bubble.layer_selector.msg"
                    v-bind:msg_title="o_msg_bubble.layer_selector.title"
                    v-bind:msg_color="o_msg_bubble.layer_selector.color"
        ></bubble-box>


        <div class="mini_info">
            <span class="layerNumber">{{Gob.selectList.length}}</span>
        </div>

        <div class="layers_list">
            <div class="layer-item" v-for="layer in Gob.selectList">
                <span class="type">
                    <i v-if="layer.type.typeName=='shape'"
                       class="icon-sampler-graphics"
                       v-bind:title="Lang.from('形状图层')"
                    ></i>

                   <i v-if="layer.type.typeName=='text'"
                      class="icon-layer-text"
                      v-bind:title="Lang.from('文本图层')"
                   ></i>

                    <i v-if="layer.type.typeName=='bitmap'"
                       class="icon-layer-pixel"
                       v-bind:title="Lang.from('像素图层')"
                    ></i>

                    <i v-if="layer.type.typeName=='smartObject'"
                       class="icon-layer-smartobject"
                       v-bind:title="Lang.from('智能对象图层')"
                    ></i>

                      <i v-if="layer.type.typeName=='layerSet'"
                         class="icon-layer-group-collapsed"
                         v-bind:title="Lang.from('图层组')"
                      ></i>

                    <i v-if="layer.type.typeName=='other'"
                       class="icon-stop2"
                       v-bind:title="Lang.from('其他类型')"
                    ></i>
                </span>


                <span class="id" title="ID">{{layer.id}}</span>
                <span class="name">{{layer.name}}</span>
                <span class="index" title="item index">{{layer.itemIndex}}</span>
            </div>

        </div>
    </a-area>
</template>

<style lang="scss" rel="stylesheet/scss">

    .mini_info {
        max-height: 76px;
        overflow-y: hidden;

        span.layerNumber {
            font-size: 9px;
            border: 1px solid rgba(69, 69, 69, 0.35);
            color: #6C6C6C;
            padding: 0px 5px;
            border-radius: 4px;
        }
    }

    .mini_info {
        position: absolute;
        top: 6px;
        left: 77px;
    }

    .layer-item {
        font-size: 11px;
        color: #666;
        margin: 4px 0;
        padding-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:not(:nth-last-of-type(1)) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        span.index {
            float: right;
            color: #C0C0C0;
            font-style: italic;
            cursor: default;
            user-select: text;
        }

        span.id {
            background: #C0C0C0;
            color: #fff;
            border-radius: 3px;
            padding: 1px 6px;
            margin-right: 8px;
            font-size: 10px;
            cursor: default;
            user-select: text;
        }

        span.type {
            font-size: 12px;
            padding-right: 6px;
            cursor: default;
            user-select: text;

            i {
                font-size: 13px;
            }
        }

        span.name {
            font-size: 11px;
            cursor: default;
            user-select: text;
        }

    }

    .trans-fade-transition {
        transition: all .3s ease;
        height: 150px;
        opacity: 1;

    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .trans-fade-enter, .trans-fade-leave {
        height: 0;
        opacity: 0;
    }
</style>


<script>
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import Area from '../components/area.vue';
    import  MenuButtom from '../components/MenuButtom.vue'
    import BubbleBox from '../components/MessageBox/BubbleBox.vue';
    import InputBox from '../components/MessageBox/InputBox.vue';
    //import CompA from '../components/A.vue'

    export default {
        data(){
            return {
                Gob: Gob,
                Lang: Lang,
                o_msg_input: UI_model.msg_input,
                o_msg_bubble: UI_model.msg_bubble,

                options: [
                    {
                        value: 'inver_order_layers',
                        label: '倒序图层',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: this.inver_order_layers,
                        button: true,
                        block: true,
                    },
                    {
                        value: 'name_order_layers',
                        label: '按名称排序图层',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        block: true,
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
            inver_order_layers: function ()
            {
                Proteins.exec("quick_permute_doSelectLayersInveroOrder", {})
            },
            name_order_layers: function ()
            {
                Proteins.exec("quick_permute_doSelectLayersInveroOrder", {byName: true})
            },
            rename_rename: async function ()
            {
                var data = [
                    {name: "新名称", type: "text", value: "图层 $i"},
                    {name: "", type: "notetext", html: "原名：$& <br>计数：$i <br>倒序计数：$-i"},
//                    {name: "事实上", type: "textarea"},
                ]

                async function ok_func(data, doneFunc)
                {
//                    alert(data[0].value + data[1].value + data[2].checked)
                    var time = await Proteins.exec("layersRename_replace", {
                        findText: ".*",
                        replace: data[0].value,
                        useReg: true,
                    })
                    UI_action.show_message_bubble("layer_selector", "", Lang.from("已替换 ") + time + Lang.from(" 个图层"), "")
                    doneFunc()
                }

                UI_action.show_message_input("layer_selector", "重命名图层", data, ok_func)
            },
            rename_replace: async function ()
            {
                var data = [
                    {name: "寻找文本", type: "text"},
                    {name: "替换文本", type: "text"},
                    {name: "使用正则表达式", type: "checkbox", checked: false},
                    {name: "", type: "note", html: "寻找任意文本：.* <br>指代寻找到的文本：$& <br>计数：$i <br>倒序计数：$-i", value: 2},
//                    {name: "事实上", type: "textarea"},
                ]

                async function ok_func(data, doneFunc)
                {
//                    alert(data[0].value + data[1].value + data[2].checked)
                    var param = {
                        findText: data[0].value,
                        replace: data[1].value,
                        useReg: data[2].checked,
                    }
                    var time = await Proteins.exec("layersRename_replace", param);
                    UI_action.show_message_bubble("layer_selector", "", Lang.from("已替换 ") + time + Lang.from(" 个图层"), "")
                    doneFunc()
                }

                UI_action.show_message_input("layer_selector", "图层名称替换", data, ok_func)
            },
            find_select: async function ()
            {
                var data = [
                    {name: "寻找文本", type: "text"},
                    {name: "使用正则表达式", type: "checkbox", checked: false},
//                    {name: "事实上", type: "textarea"},
                ]

                async function ok_func(data, doneFunc)
                {

                    var time = await  Proteins.exec("layerNameFindAndSelected", {
                        findText: data[0].value,
                        useReg: data[1].checked,
                    })
                    UI_action.show_message_bubble("input_box", "", Lang.from("寻找到 ") + time + Lang.from(" 个图层"), "")
//                    doneFunc()
                }

                UI_action.show_message_input("layer_selector", "寻找并选中图层", data, ok_func)

            },
            tag_select: async function ()
            {

                var data = [
                    {name: "寻找的标签", type: "text"},
                    {name: "排除模式", type: "checkbox", checked: false},
//                    {name: "事实上", type: "textarea"},
                ]

                async function ok_func(data, doneFunc)
                {

                    var time = await selectLayerByTag(data[0].value, data[1].checked)
//                    var time = await  Proteins.exec("layerNameFindAndSelected", {
//                        findText: data[0].value,
//                        useReg: data[1].checked,
//                    })
                    UI_action.show_message_bubble("input_box", "", Lang.from("寻找到 ") + time + Lang.from(" 个图层"), "")
//                    doneFunc()
                }

                UI_action.show_message_input("layer_selector", "寻找并选中指定标签的图层", data, ok_func)


                async function selectLayerByTag(tag, notHas)
                {
                    var selectIds = []
                    for (var i  in dataCaryon.layers)
                    {
                        if (dataCaryon.layers[i].more != undefined && dataCaryon.layers[i].more.$tags != undefined)
                        {
                            var hasTag = dataCaryon.layerTags_hasTag(dataCaryon.layers[i].id, tag)
                            if (hasTag)
                            {
                                selectIds.push(dataCaryon.layers[i].id)
                            }
                        }
                    }

                    if (notHas)
                    {
                        await enzymes.selectLoad(selectIds)
                        var time = await Proteins.exec("invertSelectLayer", {})
                        return time

                    } else
                    {
                        enzymes.selectLoad(selectIds)
                        return selectIds.length
                    }

                }
            },
            i_select_layers: function ()
            {
                Proteins.exec("invertSelectLayer", {})
            },
            selectShot: function ()
            {
                if (dataCaryon["doc"]["selectShots"] == undefined)
                {
                    dataCaryon["doc"]["selectShots"] = {}
                }

                var selectIds = []
                Gob.selectList.forEach(function (x) {selectIds.push(x.id)})
                var selectIdsJson = JSON.stringify(selectIds)

                var data = [
                    {name: "记录名称", type: "text"},
                    {name: "记录值", type: "text", value: selectIdsJson},
                ]


                async
                function ok_func(data, doneFunc)
                {
                    if (data[0].value == "")
                    {
                        UI_action.show_message_bubble("input_box", "", Lang.from("记录名不能为空"), "red");
                    } else
                    {
                        dataCaryon["doc"]["selectShots"][data[0].value] = data[1].value
                        doneFunc()
                    }


                }


                UI_action.show_message_input("layer_selector", "记录文档中图层选中状态", data, ok_func)
            },

            selectRepaly: async function ()
            {


                var data = [

                    {
                        name: "记录", type: "select", options: []
                    },
                    {
                        name: "操作", type: "select", options: [
                        {text: Lang.from('还原'), value: 'repaly'},
                        {text: Lang.from('更新'), value: 'rewrite'},
                        {text: Lang.from('删除'), value: 'delete'},
                    ]
                        , select: "repaly"
                    }

                ]

                for (var x in dataCaryon["doc"]["selectShots"])
                {

                    data[0].options.push({text: x, value: x})
                }
                data[0].select = x;

                async
                function ok_func(data, doneFunc)
                {

                    if (data[0].select == undefined || data[0].select === "")
                    {
                        doneFunc()

                    }
                    if (data[1].select == "repaly")
                    {
                        var selectIds = []
                        try
                        {
                            if (dataCaryon["doc"]["selectShots"][data[0].select] != undefined)
                            {
                                var selectJson = dataCaryon["doc"]["selectShots"][data[0].select]
                                selectIds = JSON.parse(selectJson)
                            }
                        } catch (e)
                        {
                        }

                        if (selectIds["length"] != undefined)
                        {
                            enzymes.selectLoad(selectIds)
                        }
                    }
                    else if (data[1].select == "rewrite")
                    {
                        var selectIds = []
                        Gob.selectList.forEach(function (x) {selectIds.push(x.id)})
                        var selectIdsJson = JSON.stringify(selectIds)
                        dataCaryon["doc"]["selectShots"][data[0].select] = selectIdsJson
                    }
                    else if (data[1].select == "delete")
                    {
                        if (dataCaryon["doc"]["selectShots"][data[0].select] != undefined)
                        {
                            delete  dataCaryon["doc"]["selectShots"][data[0].select];
                        }
                        doneFunc();
                    }

                }

                UI_action.show_message_input("layer_selector", "图层选中状态记录", data, ok_func)


            }


        },
        components: {
            "value-input": ValueInput,
            "a-area": Area,
            "menu-buttom": MenuButtom,
            "bubble-box": BubbleBox,
            "input-box": InputBox,

        }
    };

</script>
