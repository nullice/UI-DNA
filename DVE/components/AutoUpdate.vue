<template>
    <div id="auto-update">
        <label  id="auto-update-close-but" class="exmo_button_icon mini " v-on:click="doClose">x</label>


        <h2>{{'新版本：' | lang}}{{info.version}}  <span class="sub">{{info.varData}}</span></h2>
        <div class="now_ver">{{'当前版本：' | lang}} {{now_ver}} , {{'基础版本：' | lang}} {{base_ver}}</div>
        <div class="clog">


            <ul>
                <li v-for="x in cl">{{x}}</li>
            </ul>
        </div>


        <div class="but-bar" v-show="!downloaing">

            <button v-show="!downloaing" class="exmo_button_icon " v-on:click="doAutoUpdata">
                {{'自动更新' | lang}}
            </button>

            <button v-show="!downloaing" class="exmo_button_icon " v-on:click="doOpenUrl">
                {{'手动下载' | lang}}
            </button>

            <div v-show="downloaing"> 下载中...</div>

        </div>
    </div>
</template>
<style lang="scss">


    div#auto-update {
        position: fixed;
        z-index: 333;
        top: 90px;
        background: #F5F5F5;
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1), 0 24px 133px rgba(0, 0, 0, 0.41);
        /* color: #fff; */
        width: 100%;
        left: 0;
        right: 0;
        min-height: 200px;
        h2 {
            font-size: 16px;
            padding: 14px;
            padding-top: 20px;
            padding-bottom: 2px;

            span.sub {
                font-size: 12px;
                vertical-align: bottom;
                line-height: 20px;
                padding-left: 12px;
            }

        }

        #auto-update-close-but {
            position: absolute;
            right: 2px;
            color: #B5B5B5;
            display: inline-block;
            width: 12px;
            height: 12px;
            top: 2px;
            padding: 4px;
            margin: 0;
            line-height: 12px;
            text-align: center;
        }
        .now_ver {
            padding: 4px;
            padding-left: 14px;
            font-size: 12px;
            color: rgba(23, 21, 53, 0.58);
        }
        .clog {
            font-family: inherit;
            font-size: 12px;
            text-align: left;
            padding: 12px 20px;
            color: rgba(0, 0, 0, 0.72);
            ul {
                padding: 0;
                list-style: none;

                il {
                    display: block;
                    padding: 4px;
                }
            }
        }

        .but-bar {
            text-align: center;
            white-space: nowrap;
            font-size: 0;
            .exmo_button_icon {

                border: none;
                background: rgba(166, 88, 88, 0);
                color: #6B6B6B;
                font-family: inherit;
                padding: 10px 40px;
                margin: 0;
                -webkit-transition: all .3s;
                transition: all .3s;
                outline: none;
                width: 50%;
                box-sizing: border-box;
                font-size: 14px;

                &:hover {
                    background: #5EB4F2;
                    color: #FFFFFF;
                }
            }

        }

    }

</style>


<script>
    export default {

        watch: {},
        mounted: function ()
        {
            this.$nextTick(function ()
            {
                // 代码保证 this.$el 在 document 中
            })
        },
        props: ["info", "show"],
        data () {
            return {
                downloaing: false,
                base_ver: UIDNA_BASE_VERINNDEX,
                now_ver: UIDNA.version,
            }
        },
        methods: {
            doOpenUrl: function ()
            {
                appCaryon.openUrl(this.info.url)
            },


            doAutoUpdata: async function ()
            {

                this.downloaing = true
                await appCaryon.startAutoUptate(this.info.autoUpdate.url, this.info.autoUpdate.fileName)
                this.downloaing = false
                appCaryon.restar_UI_DNA()

            },
            doClose:function ()
            {
                this.show=false
            }
        },
        computed: {
            cl: {
                get: function ()
                {

                    var list = this.info.changeList.split("\n")

                    return list

                }
            }
        },
        components: {}
    }
</script>

