<template>
    <a-area area_title="选中图层" area_id="layer_selectors"
            v-bind:area_disable_fixbut="true">
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

    .layers_list {
        max-height: 76px;
        overflow-y: scroll;

        span.layerNumber {
            font-size: 11px;
            background: #AEAEAE;
            color: #fff;
            padding: 1px 6px;
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
    //import CompA from '../components/A.vue'

    export default {
        data(){
            return {
                Gob: Gob,
                Lang: Lang
            }
        },
        components: {
            "value-input": ValueInput,
            "a-area": Area,

        }
    };

</script>
