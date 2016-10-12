<template>
    <div class="exmo_area">
        <h2> 选中图层 </h2>
        <div class="mini_info">

            <!--<input type="checkbox" class="exmo_icon_cheackbox" id="check_btn_{{name|lowercase}}" autocomplete="off" checked-->
                   <!--v-model:value="enable_assign">-->
            <!--<label class="exmo_button_icon mini" for="check_btn_{{name|lowercase}}"><i-->
                    <!--class="icon-layer-visible"></i></label>-->

        </div>

        <div class="layers_list" >
            <div class="layer-item"  v-for="layer in Gob.selectList"> <span class="id">{{layer.id}}</span> <span class="name">{{layer.name}}</span> <span class="index">{{layer.itemIndex}}</span></div>

        </div>


    </div>
</template>

<style lang="scss">

    .layer-item {
        font-size: 11px;
        color: #666;
        margin: 4px 0;
        padding-bottom: 6px;


        &:not(:nth-last-of-type(1)){
            border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }


          span.index {
            float: right;
            color: #C0C0C0;
            font-style: italic;
        }

           span.id {
            background: #C0C0C0;
            color: #fff;
            border-radius: 3px;
            padding: 1px 6px;
            margin-right: 8px;
            font-size: 10px;
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
    //import CompA from '../components/A.vue'

    export default {
        data(){
            return {
                Gob: Gob,
            }
        },
        components: {
            "value-input": ValueInput,
        }
    };

</script>
