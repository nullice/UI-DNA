<template>
    <div class="exmo_area">
        <h2> 选中图层 </h2>

    </div>
</template>

<style>

    /*.exmo_area .tag-box{*/
    /*!*display: none;*!*/
    /*opacity: 0;*/
    /*transition: all .5s;*/
    /*}*/
    /*.exmo_area .tag-box.active{*/
    /*!*display: block;*!*/
    /*opacity: 1;*/
    /*transition: all .5s;*/
    /*}*/

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
                Gob:Gob,
            }
        },
        components:{
            "value-input":ValueInput,
//        "comp-a":ValueInput
        }
    };

</script>
