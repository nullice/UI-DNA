<template>
    <div class="exmo_area">
        <h2> 变量列表 </h2>

        <!--<div class="var_list" >-->
            <!--<div class="var_item"  v-for="layer in Gob.selectList"> <span class="id">{{layer.id}}</span> <span class="name">{{layer.name}}</span> <span class="index">{{layer.itemIndex}}</span></div>-->
        <!--</div>-->

    </div>
</template>

<style lang="scss">

</style>


<script>
    import ValueInput from '../components/AttributePanel_valueInput.vue';

    export default {
        data(){
            return {

            }
        },
        components: {
            "value-input": ValueInput,
        }
    };

</script>
