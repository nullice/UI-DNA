<template>

    <div class="quick_mult_editor">

        <div class="mult_editor_row" v-for="row in text_table">

            <div class="mult_editor_col" v-for="col in row">

                <div class="layer-name">{{col.name}}</div>
                       <textarea class="exmo_inbox value_input_box"
                                 v-model:value="col.text"
                       >
                     </textarea>
            </div>
        </div>



    </div>

</template>
<style lang="scss" rel="stylesheet/scss">

    .quick_mult_editor{
        /*overflow-x: hidden;*/
        /*overflow-y: scroll;*/
        /*max-height: 300px;*/

        .layer-name {
            font-size: 11px;
            padding-left: 6px;
            color: rgba(0, 0, 0, 0.26);
        }
    }

    textarea.exmo_inbox.value_input_box {
        border: none;
        font-family: inherit;
        background: rgba(0, 0, 0, 0.00);
        outline: none;
        border-bottom: 1px solid #ADADAD;
        padding: 6px;
        margin-top: 4px;
        width: calc(100% - 8px);
        font-size: 12px;
    }

    textarea.exmo_inbox.value_input_box:hover {
        background: rgba(0, 0, 0, 0.03);
    }

    textarea.exmo_inbox.value_input_box:focus {
        border-bottom: 1px solid #1e76e3;
    }
</style>
<script>
    export default{
        props: ["text_table"],
        data(){
            return {}
        },
        methods: {},
        computed: {}
    }
</script>
