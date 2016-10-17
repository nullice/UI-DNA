<template>
    <div class="message-box-input  message-color-{{msg_color}}">
        <div class="message-window-input   animated zoomIn">
            <h2 class="message-title">{{msg_title}}</h2>

            <bubble-box v-if="o_msg_bubble.input_box.show"
                        v-bind:msg="o_msg_bubble.input_box.msg"
                        v-bind:msg_title="o_msg_bubble.input_box.title"
                        v-bind:msg_color="o_msg_bubble.input_box.color"
            ></bubble-box>

            <div class="input_item" v-for="item in msg_input_data">
                <span v-if="item.type!='checkbox'">{{item.name}}</span>
                <input v-if="item.type=='text'" type="text" class="exmo_input_text"
                       placeholder="{{item.placeholder||''}}"
                       v-model="item.value"
                       v-on:change="(item.verify!=undefined)?item.verify(item.value,$event):null">

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
            </div>

            <div class="button_bar">
                <button class="exmo_button" v-on:click="ok">{{"确定"||lang}}</button>
                <button class="exmo_button" v-on:click="cancel">{{"返回"||lang}}</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

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

            .input_item {
                font-size: 13px;
                color: rgb(77, 77, 77);
                margin-bottom: 8px;

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

        }

    }


</style>
<script>

    import ARR  from "../../Caryon/arrayARR.js"
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
            }

        },
        computed: {},
        components: {
            "bubble-box": BubbleBox
        }
    }
</script>
