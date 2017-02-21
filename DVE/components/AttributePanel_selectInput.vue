<template>
    <div class="select_input">
        <div class="exmo_box_name" v-if="(name!=undefinde)||(name_html!=undefinde)"
        v-bind:title="title"
        >

            {{name|lang}} {{{name_html}}}</div>
        <attr-select
                v-bind:block="block"
                v-bind:in_class="in_class"
                v-bind:default_value="default_value"
                v-bind:value.sync="value"
                v-bind:select_style="select_style"
                v-bind:list_style="list_style"
                v-bind:options="options"
        >
        </attr-select>
        <div class="more-edit">
            <slot></slot>
        </div>

    </div>

</template>
<style lang='scss' rel="stylesheet/scss">

    .select_input {
        .more-edit{
            display: inline-block;
            vertical-align: bottom;
            opacity: 0;
            transition: all .3s;
            .exmo_box_name {
                width: 0px;
            }
        }

        &:hover .more-edit{
            opacity: 1;
        }


        .exmo_box_name {
            max-width: 24px;
            line-height: 26px;
        }

        .value_input_box{
            vertical-align: bottom;
        }
    }

    .attr_select {
        display: inline-block;
    }

</style>
<script>
    import AttrSelect from "./AttributePanel_select.vue"

    export default{

        props: ['name','title', 'name_html', 'value', 'block', 'select_style','list_style', 'options', 'default_value', 'in_class'],
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {
            "attr-select": AttrSelect
        }
    }
</script>
