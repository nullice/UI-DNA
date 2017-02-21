<template>
    <a-area area_title="选中图层" area_id="layer_selectors">
        <div class="mini_info">
            <!--<input type="checkbox" class="exmo_icon_cheackbox" id="check_btn_{{name|lowercase}}" autocomplete="off" checked-->
            <!--v-model:value="enable_assign">-->
            <!--<label class="exmo_button_icon mini" for="check_btn_{{name|lowercase}}"><i-->
            <!--class="icon-layer-visible"></i></label>-->
        </div>

        <div class="layers_list">
            <div class="layer-item" v-for="layer in Gob.selectList">
                <span class="type">{{layer.type.typeName}}</span>
                <span class="id" title="ID">{{layer.id}}</span>
                <span class="name">{{layer.name}}</span>
                <span class="index" title="item index">{{layer.itemIndex}}</span>
            </div>

        </div>
    </a-area>
</template>

<style lang="scss" rel="stylesheet/scss" >

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
            font-size: 10px;
            cursor: default;
            user-select: text;
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
            }
        },
        components: {
            "value-input": ValueInput,
            "a-area": Area
        }
    };

</script>
