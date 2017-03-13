<template>

    <menu-buttom v-bind:options="options" v-bind:memu_name="layer_selsectors"
    >
        <i class="icon-briefcase"></i>
    </menu-buttom>

    <a-area area_title="选中图层" area_id="layer_selectors"
            v-bind:area_disable_fixbut="true"
            v-bind:area_init_close="true"

    >

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
    //import CompA from '../components/A.vue'

    export default {
        data(){
            return {
                Gob: Gob,
                Lang: Lang,

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
                        value: 'rename_replace',
                        label: '图层名称替换',
                        title: "将图层层叠顺序按名称排列",
                        selected_func: this.name_order_layers,
                        button: true,
                        block: true,
                    },


                    {hr: true},

                    {
                        value: 'radian_all',
                        label_html: '<i class=" icon-radio-unchecked" style="font-size: 14px;">',
                        title: "应用到所有圆角",
                        selected_func: this.open_file,
                        button: true
                    },
                    {
                        value: 'info_pin',
                        label_html: '<i class="icon-pushpin" style="font-size: 12px;">',
                        title: "创建变量标注",
                        selected_func: this.info_pin,
                        button: true
                    }
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
            rename_replace: function ()
            {
                Proteins.exec("quick_permute_doSelectLayersInveroOrder", {byName: true})
            },

        },
        components: {
            "value-input": ValueInput,
            "a-area": Area,
            "menu-buttom": MenuButtom

        }
    };

</script>
