<template>

    <div class="quick_but {{in_class}}">
        <div class="exmo_button_icon quick_but_icon" v-bind:class="{'more_on':more_onoff}" >
            <slot></slot>
        </div>


        <div class="quick_but_more_icon" v-bind:class="{'more_on':more_onoff,'hidden':!show_more}"
             v-on:click="click_more"

        >
            <i class="icon-play3"></i>
        </div>
    </div>

</template>
<style lang="scss" rel="stylesheet/scss">
    .quick_buts {
        .hidden{
            visibility: hidden;
        }

        font-size: 0;

        .quick_but {
            display: inline-block;
            margin-left: -1px;

            .quick_but_icon {
                display: inline-block;
                padding: 5px 12px;
                margin: 0px;
                i {
                    font-size: 14px;
                }
            }

            .quick_but_more_icon {
                transition: all .3s;
                height: 10px;
                font-size: 8px;
                text-align: center;
                color: rgba(0, 0, 0, 0.48);

                &:hover {
                    color: rgba(30, 118, 227, 1);
                    background: linear-gradient(0deg, rgba(30, 118, 227, 0.36), rgba(49, 118, 227, 0));
                }
                &.more_on {
                    color: rgba(30, 118, 227, 1);
                    background: linear-gradient(0deg, rgba(30, 118, 227, 0.56), rgba(49, 118, 227, 0));
                }


                i {
                    transform: rotate(90deg);
                    display: inline-block;
                    vertical-align: super;

                }

            }

        }

        .quick_but:not(:nth-last-of-type(1)) .quick_but_icon {
            border-right: 1px solid rgba(124, 124, 124, 0.21);
        }

    }


</style>
<script>
    export default{
        props: ["func", "in_class", "more_onoff"],
        data(){
            return {}
        },
        methods: {
            click_more: function ()
            {
                if (this.more_onoff != undefined)
                {
                    this.more_onoff = !this.more_onoff;
                }
            }
        },
        computed: {
            show_more:function ()
            {
                if(this.func != undefined)
                {
                    return true
                }else
                {
                    return false
                }

            }
        }
    }
</script>
