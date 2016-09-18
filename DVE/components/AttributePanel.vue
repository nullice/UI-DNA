<template>
    <div class="exmo_area">
        <h2> UI-DNA 属性 </h2>

        <div class="exmo_btn_group" data-toggle="buttons">
            <input type="checkbox" name="group1" id="option1" autocomplete="off" checked>
            <label class="btn btn_primary" for="option1" title="{{'位置' |lang}}">
                <span>{{'位置' |lang}}</span>
            </label>

            <input type="checkbox" name="group1" id="option2" autocomplete="off">
            <label class="btn btn_primary " for="option2">
                <span><i class="icon-xor-intersect"></i></span>
            </label>

            <input type="checkbox" name="group1" id="option3" autocomplete="off">
            <label class="btn btn_primary " for="option3">
                <span><i class="icon-xor-difference"></i></span>
            </label>

            <input type="checkbox" id="option4" autocomplete="off">
            <label class="btn btn_primary" for="option4">
                <span><i class="icon-glyph"></i></span>
            </label>
        </div>

        <div>
            <value-input name ="X"  v-bind:edit_value.sync="Gob.position.x" v-bind:out_value.sync="Gob.position.assignment.x" v-bind:enable_assign.sync="Gob.position.enableAssigns.x"></value-input>
            <value-input name ="Y"  v-bind:edit_value.sync="Gob.position.y" v-bind:out_value.sync="Gob.position.assignment.y" v-bind:enable_assign.sync="Gob.position.enableAssigns.y"></value-input>
            <!--<comp-a></comp-a>-->
        </div>

    </div>
</template>
<style>
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
