<template>


    <div v-if="value!=undefind && value != 'noneValue'" v-on:click="doSelect"
         title="{{in_title}}"
         class="attr_option {{in_class}}  {{in_class2}} {{(selected_value==value)?'selected':''}}">
        {{{label_html}}} {{label}}
        <slot></slot>
    </div>

    <div v-if="hr" class="option_hr {{in_class2}}"></div>
    <div v-if="br" class="option_br {{in_class2}}"></div>

</template>
<style>

    .attr_option.rigth-but {
        position: absolute;
        right: 0;
    }

    .attr_option {
        font-size: 13px;
        padding: 6px 14px;
        color: #666;
        cursor: default;
    }

    .attr_option.selected {
        background: rgba(192, 192, 192, 0.4);
    }

    .attr_option:not(.onlytext):hover {
        background: #41A4FF;
        color: #fff;
        transition: .4s all;
    }

    .attr_option.onlytext {
        min-width:60px;
    }

    .option_hr {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
</style>
<script>

    export default{

        props: ['value', "label_html", 'label', "selected", "selected_value",
            "selected_func", "selected_func_param", "state", "hr", "br", "in_class", "in_title", 'button', "in_class2"],
        methods: {
            doSelect: function ()
            {
                if (this.button)
                {

                } else
                {
                    this.selected_value = this.value;
                }

                if (this.state != undefined)
                {
                    if (typeof  this.state === "boolean")
                    {
                        this.state = !this.state;
                    }
                }
                if (this.selected_func != undefined)
                {

                    this.selected_func(this.selected_func_param);
                }
            },

        },
        data(){
            return {}
        },
        components: {}
    }
</script>
