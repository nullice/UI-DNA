<template>

    <a-area area_title="关于" area_id="setting_about_panel"
            v-bind:area_suspend="true"
    >

        <div class="top-box">
            <div class="logo-box">
                <div class="logo"><i class="iconfont  icon-ui-dna"></i></div>
                <div class="logo_title">UI DNA</div>
                <div class="logo_version">
                    <span class="ver-tag">Beta</span>
                    <sapn class="ver">{{UIDNA.version}}</sapn>
                    <sapn class="ver-data">- {{UIDNA.varData}}</sapn>
                </div>
            </div>

            <div class="lnfo-box">

                <div class="info">
                    设计构建工具
                </div>
                <div class="author"><span class="by">by </span>nullice</div>
            </div>
        </div>


    </a-area>
</template>

<style lang="scss" rel="stylesheet/scss">





    .setting_about_panel.suspend {
        height: 70px;
        background: transparent;
        border-bottom: none;
    }

    .setting_about_panel {
        h2 {
            margin: -6px 0 4px 0;
        }

        .top-box
        {
            text-align: center;
        }

        .lnfo-box
        {
            display: inline-block;
            width: 120px;
            height: 64px;
            vertical-align: top;

            .info {
                font-size: 12px;
                text-align: left;
                padding-left: 14px;
                color: #737373;
                padding-top: 14px;
            }
            .author {
                font-family: "Eras Medium ITC";
                font-size: 17px;
                padding: 0 0 14px 0;
                color: rgba(0, 0, 0, 0.61);
                text-align: left;
                margin-left: 15px;
                cursor: pointer;

                span.by {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.34);
                }
            }


        }

        .logo-box {
            display: inline-block;
            width: 120px;

            .logo_version {
                user-select: text;
                font-size: 9px;
                color: rgba(0, 0, 0, 0.57);

                sapn.ver {
                    font-weight: bold;
                }

            }

            text-align: right;
            .logo {
                i {
                    font-size: 33px;
                    color: #525252;
                }
            }
            .logo_title {

                font-size: 12px;
                color: rgba(0, 0, 0, 0.54);
                font-weight: bold;
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
            }
        },

        methods: {},

        components: {
            "a-area": Area
        },

    };

</script>
