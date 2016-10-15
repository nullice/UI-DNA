<template>
    <div class="message-box-input  animated fadeInDown message-color-{{msg_color}}">
        <div class="message-window">
            <h2 class="message-title">{{msg_title}}</h2>

            <div class="input_item" v-for="item in msg_input_data">
                <span v-if="item.type!='checkbox'">{{item.name}}</span>
                <input v-if="item.type=='text'" type="text" class="exmo_input_text"
                       placeholder="{{item.placeholder||''}}"
                       v-model="item.value">
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

        .message-window {
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
                width: inherit;
            }

        }

    }


</style>
<script>

    export default{
        props: ["msg_input_data", "msg_callback", "msg_title", "msg_color"],
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods: {
            ok: function (event)
            {
                if (this.msg_callback != undefined)
                {
                    this.msg_callback(this.msg_input_data)
                }
            }

        },
        computed: {
            o_data: {
                // getter
                get: function ()
                {


                    return this.firstName + ' ' + this.lastName
                },
                // setter
                set: function (newValue)
                {
                    var names = newValue.split(' ')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                }
            }
        },
        components: {}
    }
</script>
