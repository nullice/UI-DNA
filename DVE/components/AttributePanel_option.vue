<template>


    <div v-if="value!=undefind && value != 'noneValue'" v-on:click="doSelect"
         class="attr_option {{in_class}} {{(selected_value==value)?'selected':''}}">
        {{{label_html}}} {{label}}
        <slot></slot>
    </div>

    <div v-if="hr" class="option_hr"></div>
    <div v-if="br" class="option_br"></div>

</template>
<style>
    .attr_option {
        font-size: 13px;
        padding: 6px 14px;
        color: #666;
        cursor: default;
    }

    .attr_option.selected {
        background: rgba(192, 192, 192, 0.4);
    }

    .attr_option:hover {
        background: #41A4FF;
        color: #fff;
        transition: .4s all;
    }

    .option_hr {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
</style>
<script>

    export default{

        props: ['value', "label_html", 'label', "selected", "selected_value", "selected_func", "state", "hr", "br", "in_class"],
        methods: {
            doSelect: function ()
            {
                this.selected_value = this.value;

                if (this.state != undefined)
                {
                    if (typeof  this.state === "boolean")
                    {
                        this.state = !this.state;
                    }
                }
                if (this.selected_func != undefined)
                {
                    this.selected_func();
                }
            },

        },
        data(){
            return {}
        },
        components: {}
    }
</script>
