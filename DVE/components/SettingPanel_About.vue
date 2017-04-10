<template>

    <a-area area_title="关于" area_id="setting_about_panel"
            v-bind:area_suspend="true"
    >


        <div v-if="updateInfo.hasNewVar" class="var-update-box animated  bounceInLeft"
             v-on:click="openUrl(updateInfo.latestVar.url)"
             v-bind:title="updateInfo.latestVar.varData +' - ' + updateInfo.latestVar.title">

            <span class="title">{{'新版本' | json}}</span> <span class="var-to"></span> <span
                class="new-var">{{updateInfo.latestVar.version}}</span>

        </div>


        <div class="top-box">

            <div class="logo-box">
                <div class="logo" title="{{'访问官网'|lang}}" v-on:click="openUrl('http://design-enzyme.com/UI-DNA')"><i
                        class="iconfont  icon-ui-dna"></i></div>
            </div>

            <div class="lnfo-box">

                <div class="lnfo-cell">
                    <div class="logo_title">UI DNA</div>
                    <div class="logo_version" title="{{'检查更新'|lang}}" v-on:click="click_update">
                        <span class="ver-tag">Beta</span>
                        <sapn class="ver" title="{{UIDNA.varData}}">{{UIDNA.version}}</sapn>
                        <!--<sapn class="ver-data">- {{UIDNA.varData}}</sapn>-->
                    </div>
                </div>

                <div class="lnfo-cell right">
                    <div class="info">
                        设计构建工具

                    </div>
                    <div class="author" title="{{'作者主页 ： nullice.com'|lang}}"
                         v-on:click="openUrl('http://nullice.com')"><span class="by">by </span>nullice
                    </div>
                </div>

                <div class="net-messge-box">
                    <div class="msg-item lv{{x.lv}}" v-for="x in messge" v-if="x.lv > 0">
                        <span v-on:click="msgOpen(x.url)">{{x.messge}}</span>
                    </div>
                </div>

            </div>
        </div>

        <div class="links-box">
            <ul>
                <li v-on:click="openUrl('http://design-enzyme.com/UI-DNA')">{{'主页' | lang}}</li>
                <li v-on:click="openUrl('http://design-enzyme.com/UI-DNA')">{{'社区' | lang}}</li>
                <li v-on:click="openUrl('http://design-enzyme.com/UI-DNA')">{{'微博' | lang}}</li>
                <li v-on:click="openUrl('http://design-enzyme.com/UI-DNA')">{{'Twitter' | lang}}</li>
                <li v-on:click="openUrl('http://design-enzyme.com/UI-DNA')">{{'知乎' | lang}}</li>
                <li v-on:click="openUrl('http://design-enzyme.com/UI-DNA')">{{'Github' | lang}}</li>
                <li v-on:click="openUrl('http://design-enzyme.com/UI-DNA')">{{'Dribbble' | lang}}</li>
            </ul>
        </div>

    </a-area>
</template>

<style lang="scss" rel="stylesheet/scss">


    .setting_about_panel.suspend {
        height: 110px;
        bottom: 0;
        background: rgb(240, 240, 240);
        border-bottom: none;
        overflow: visible;
        z-index: 10;

    }

    .setting_about_panel {

        .links-box {

            text-align:  center;
            ul {
                padding: 0 30px;
            }

            li {
                display: inline-block;
                font-size: 11px;
                padding: 2px 4px;
                color: rgba(0, 0, 0, 0.49);
                cursor: pointer;

                &:hover {
                    color: #553BFA;
                    transition: all .7s;
                }

            }

        }

        .var-update-box {
            background: rgba(207, 205, 247, 0.34);
            border: 1px solid #7D74FF;
            padding: 1px 0;
            color: #7D74FF;
            font-size: 11px;
            display: inline-block;
            position: absolute;
            border-radius: 4px;
            right: 10px;
            top: 12px;
            cursor: pointer;

            span.title {
                padding: 2px 4px 2px 10px;
            }

            span.new-var {
                padding: 1px 8px;
                background: #7D74FF;
                color: #EDECFF;
                border-radius: 0 2px 2px 0;
            }
        }

        h2 {
            margin: -6px 0 4px 0;
        }

        .top-box {
            text-align: center;
        }

        .logo {
            i {
                font-size: 33px;
                color: #525252;
            }
            cursor:  pointer;
        }

        .lnfo-box {
            vertical-align: top;
            padding-bottom: 6px;
            margin-top: -3px;

            .logo_version {
                user-select: text;
                color: rgba(0, 0, 0, 0.57);
                font-size: 10px;
                margin-top: 2px;

                sapn.ver {
                    font-weight: bold;
                }
            }
            .logo_version:hover {
                color: #2C6BA8 !important;
                cursor: pointer;
            }

            .logo_title {

                font-size: 12px;
                color: rgba(0, 0, 0, 0.54);
                font-weight: bold;
            }

            .lnfo-cell {
                display: inline-block;
                vertical-align: top;
                text-align: right;
                width: 120px;

                &.right {
                    border-left: 1px solid rgba(0, 0, 0, 0.07);
                    padding-left: 6px;
                    height: 38px;
                }
            }

            .info {
                font-size: 11px;
                text-align: left;
                color: #737373;
                padding-top: 1px;
            }
            .author {
                font-family: "Eras Medium ITC";
                font-size: 13px;
                color: rgba(0, 0, 0, 0.61);
                text-align: left;
                cursor: pointer;

                span.by {
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.34);
                }
            }

        }

        .logo-box {
            text-align: center;
            margin-top: -4px;
            padding-bottom: 8px;
        }

        .net-messge-box {
            font-size: 11px;
            color: #808080;
            margin-top: 10px;
            .msg-item {
                margin-bottom: 10px;
                span {
                    background: rgba(239, 228, 255, 0.42);
                    border: 1px solid rgba(186, 140, 255, 0.33);
                    color: rgba(60, 0, 102, 0.7);
                    padding: 2px 20px;
                    min-width: 123px;
                    border-radius: 3px;
                    cursor: pointer;
                }
            }

            .msg-item:nth-of-type(1) {
                margin-bottom: 20px;
            }

            .msg-item.lv1 span {
                background: rgba(234, 234, 234, 0.42);
                border: 1px solid rgba(165, 165, 165, 0.33);
                color: rgba(103, 103, 103, 0.7);
                padding: 2px 20px;
                min-width: 123px;
                border-radius: 3px;
                cursor: pointer;
            }

        }

    }


</style>


<script>

    import Area from '../components/area.vue';

    export default {
        data(){
            return {
                UIDNA: UIDNA,
                messge: {},
                opn: opn,
                openUrl: appCaryon.openUrl,
                o_msg_bubble: UI_model.msg_bubble.setting_panel,
                updateInfo: {
                    hasNewVar: false,
                    latestVar: {}
                }

            }
        },


        ready: function ()
        {
            this.checkMessge()

            this.checkUpdate()
        },

        methods: {
            msgOpen: function (url)
            {

                opn(url)
            },

            checkMessge: async function ()
            {
                var messge = await  netCaryon.getOfficialMessges()
                if (messge != undefined)
                {
                    this.messge = messge
                }
            },

            checkUpdate: async function ()
            {

                var latest = await  netCaryon.getLatestVersion()
                if (latest != undefined)
                {
                    if (latest.verIndex > UIDNA.verIndex)
                    {
                        this.updateInfo.hasNewVar = true
                        this.updateInfo.latestVar = latest

                        return true
                    }

                }

                return false
            },
            click_update: async function ()
            {
                UI_action.show_message_bubble("setting_panel", "", "检查更新中...")
                if (await this.checkUpdate())
                {
                    UI_action.show_message_bubble("setting_panel", "", "发现新版本！", null, 3000)
                } else
                {
                    UI_action.show_message_bubble("setting_panel", "", "目前没有更新的版本~", 3000)
                }
            }
        },

        components: {
            "a-area": Area
        },

    };

</script>
