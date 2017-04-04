<template>

    <a-area area_title="关于" area_id="setting_about_panel"
            v-bind:area_suspend="true"
    >

        <div class="top-box">

            <div class="logo-box">
                <div class="logo"><i class="iconfont  icon-ui-dna"></i></div>
            </div>

            <div class="lnfo-box">

                <div class="lnfo-cell">
                    <div class="logo_title">UI DNA</div>
                    <div class="logo_version">
                        <span class="ver-tag">Beta</span>
                        <sapn class="ver" title="{{UIDNA.varData}}">{{UIDNA.version}}</sapn>
                        <!--<sapn class="ver-data">- {{UIDNA.varData}}</sapn>-->
                    </div>
                </div>

                <div class="lnfo-cell right">
                    <div class="info">
                        设计构建工具
                    </div>
                    <div class="author"><span class="by">by </span>nullice</div>
                </div>


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

        .top-box {
            text-align: center;
        }

        .logo {
            i {
                font-size: 33px;
                color: #525252;
            }
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

                &.right
                {
                    border-left: 1px solid rgba(0, 0, 0, 0.07);
                    padding-left: 6px;
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
