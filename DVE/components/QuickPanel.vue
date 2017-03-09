<template>

    <a-area area_title="快捷功能" area_id="attr_panel">



123123123123

    </a-area>





</template>
<style lang="scss" rel="stylesheet/scss">


</style>
<script>
    import AttrOption from "./AttributePanel_option.vue"
    import ValueInput from '../components/AttributePanel_valueInput.vue';
    import Area from '../components/area.vue';
    import AttrSelect from "./AttributePanel_select.vue"
    import SelectInput from "./AttributePanel_selectInput.vue"
    import AttrTextarea from "./AttributePanel_textarea.vue"




    export default{
        props: [],
        data(){
            return {
                o_editing: false,
                inline_block: true,
                options: [
                    {
                        value: 'test2',
                        label: "sss第三方",
                        block: true,
                    },
                    {
                        br: true,
                    },
                    {
                        value: 'test',
                        label: "创建同步变量的文本图层",
                    },
                    {
                        br: true,
                    },
                    {
                        value: '0',
                        label_html: '<i class="icon-reference-tl" style="font-size: 21px;">',
                        label: "",
                        selected: true,
                    },
                    {
                        value: '1',
                        label_html: '<i class="icon-reference-tm" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '2',
                        label_html: '<i class="icon-reference-tr" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        hr: true,
                    },
                    {
                        value: '3',
                        label_html: '<i class="icon-reference-cl " style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '4',
                        label_html: '<i class="icon-reference-cm" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '5',
                        label_html: '<i class="icon-reference-cr" style="font-size: 21px;">',
                        label: ''
                    }, {

                        hr: true,
                    },
                    {
                        value: '6',
                        label_html: '<i class="icon-reference-bl" style="font-size: 21px;">',
                        label: ''
                    },
                    {
                        value: '7',
                        label_html: '<i class="icon-reference-bm" style="font-size: 21px;">',
                        label: ''
                    }
                    ,
                    {
                        value: '8',
                        label_html: '<i class="icon-reference-br" style="font-size: 21px;">',
                        label: ''
                    }

                ]
            }

        },
        methods: {


        },
        computed: {
            // 一个计算属性的 getter
            o_range_style: {
                get: function ()
                {
                    if (this.assist_range_width != undefined)
                    {
                        return {
                            width: this.assist_range_width + "px"
                        }
                    }
                    else
                    {
                        return {
                            width: "90px"
                        }
                    }
                },
            },

            getThis: {
                get: function ()
                {
                    return this;
                },
            }
        },
        components: {
            "attr-option": AttrOption,
            "value-input": ValueInput,
            "a-area": Area,
            "attr-select": AttrSelect,
            "select-input": SelectInput,
            "attr-textarea": AttrTextarea,
        }


    }
</script>
