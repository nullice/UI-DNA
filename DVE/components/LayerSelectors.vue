<template>
    <div class="exmo_area">
        <h2> 选中图层 </h2>

        <div class="layers_list" >
            <div class="layer-item"  v-for="layer in Gob.selectList">{{layer.name}}</div>

        </div>


    </div>
</template>

<style>

    .layer-item {
        font-size: 11px;
        color: #666;
        margin: 4px 0;
        padding-bottom: 6px;
    }


    .layer-item:not(:nth-last-of-type(1)){
        border-bottom: 1px solid rgba(0, 0, 0, 0.04);
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
