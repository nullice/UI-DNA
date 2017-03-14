<template>
    <div class="message-box-input  message-color-{{msg_color}}">
        <div class="message-window-input   animated zoomIn" >
            <h2 class="message-title">{{msg_title}}</h2>
            <div class="message-msg">{{{msg}}}</div>

            <bubble-box v-if="o_msg_bubble.input_box.show"
                        v-bind:msg="o_msg_bubble.input_box.msg"
                        v-bind:msg_title="o_msg_bubble.input_box.title"
                        v-bind:msg_color="o_msg_bubble.input_box.color"
            ></bubble-box>

            <div class="input_item" v-for="item in msg_input_data" v-bind:class="{'textarea-big':item.type=='textareaBig'}">
                <span v-if="item.type!='checkbox'">{{item.name}}</span>
                <input v-if="item.type=='text'" type="text" class="exmo_input_text"
                       placeholder="{{item.placeholder||''}}"
                       v-model="item.value"
                       v-on:change="change_verify(item.verify,item.value, $event)">
                <!--v-on:change="(item.verify!=undefined)?item.verify(item.value,$event):null-->


                <select v-if="item.type=='select'" name="select" class="exmo_select" v-model="item.select">
                    <option v-for="option in item.options" v-bind:value="option.value">
                        {{ option.text }}
                    </option>
                </select>
                <label v-if="item.type=='checkbox'" class="exmo_checkbox">
                    <input type="checkbox" v-model="item.checked">
                    <div class="exmo_checkbox_shadow"></div>
                    {{item.name}}
                </label>

                <div class="notetext" v-if="(item.type=='note')&&msg_input_data[item.value].checked"  >
                    {{item.note}}{{{item.html}}}
                </div>

                <div class="value_input_textarea_box" >

                          <textarea
                                  v-if="item.type=='textarea'||item.type=='textareaBig'"
                                  v-model="item.value"
                                  class="exmo_inbox value_input_box"
                                  v-bind:cows="item.cows||2"
                          ></textarea>
                </div>


            </div>

            <div class="button_bar">
                <button class="exmo_button" v-on:click="ok">{{"确定"||lang}}</button>
                <button class="exmo_button" v-on:click="cancel">{{"返回"||lang}}</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" rel="stylesheet/scss">

    .message-box-input {
        position: fixed;
        background: rgba(0, 0, 0, 0.13);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;

        .message-window-input {
            animation-duration: .3s;
            position: absolute;
            width: 90%;
            background: #F0F0F0;
            border-radius: 6px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.11);
            padding: 20px;
            box-sizing: border-box;
            left: 0;
            right: 0;
            top: 20%;
            margin: auto;


            .notetext{
                -webkit-user-select: text;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.47);
            }
            .message-msg {
                font-size: 13px;
                color: #3A3A3A;
                p.p_var_list {
                    color: #4268DD;
                    padding-left: 16px;
                }
            }
            .input_item {
                font-size: 13px;
                color: rgb(77, 77, 77);
                margin-bottom: 8px;


                &.textarea-big{
                    position: relative;
                    width: 100%;

                    .value_input_textarea_box{
                        width: 100%;
                    }

                    .value_input_textarea_box textarea.exmo_inbox.value_input_box{
                        padding: 0;
                    }

                    span{
                        display: inline;
                        min-width: 0;
                    }
                }

                input.illegal_value {
                    color: #F04D45;
                    &:focus {
                        border-bottom: 1px solid #E24F4F;
                    }
                }
                span {
                    display: inline-block;
                    min-width: 18%;
                    text-align: right;
                    opacity: .75;
                }



            }

            .button_bar {
                text-align: center;
                margin-top: 24px;
                margin-bottom: -7px;

                button.exmo_button {
                    margin: 0 6px;
                }
            }

            .exmo_input_text, .exmo_select {
                width: 65%;
            }

            textarea.exmo_inbox.value_input_box {
                width: 100%;
            }

            .value_input_textarea_box {
                display: inline-block;
            }

        }

    }


</style>
<script>

    import ARR  from "../../Caryon/Richang_JSEX/arrayARR.js"
    import BubbleBox from "./BubbleBox.vue"

    export default{
        props: ["msg_input_data", "msg_callback", "msg_title", "msg_color", "msg_mode", "msg"],
        data(){
            return {
                o_msg_bubble: UI_model.msg_bubble,
            }
        },
        methods: {
            ok: function (event)
            {
                if (this.msg_callback != undefined)
                {
                    this.msg_callback(this.msg_input_data, this.cancel)
                }
            },
            cancel: function ()
            {
                this.msg_mode.show = false;
            },
            change_verify:function (verify,value, $event)
            {
                if(typeof verify == "function")
                {
                    verify(value,$event)

                }
            }

        },
        computed: {},
        components: {
            "bubble-box": BubbleBox
        }
    }
</script>
