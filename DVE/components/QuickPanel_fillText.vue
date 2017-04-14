<template>

    <div class="fill-text-box">

        <div class="fun_block">
            <div class="info">
                文本填充






                <div class="inline-but-bar">


                    <input type="checkbox" class="exmo_icon_cheackbox" id="quick_text_fill_02"
                           name="group_derive_mirror"
                           v-model="random">
                    <label class="exmo_button_icon mini" for="quick_text_fill_02">
                        <span>{{'随机' | lang}}</span></label>
                </div>
            </div>
            <div class="fill-text-item" v-for="item in fill_data_item_list">
                <div class="fill-text-buttom">
                    <div class="exmo_button "
                         v-on:click="click_option($index)" v-on:contextmenu.prevent=""
                         v-bind:title="item.title">
                        <span class="name">  {{item.html}} {{item.name}}</span>
                    </div>

                    <menu-buttom v-if="item.moreData!=undefined"
                                 v-bind:options="creatMenuOptions($index, item.moreData)"
                                 v-bind:memu_name="'fill-text-item-option'"
                    >
                        <i class="iconfont icon-gengduo-shuxiang"></i>
                    </menu-buttom>
                </div>
            </div>
        </div>


        <div class="fun_block">
            <div class="info">
                <span>模板文件夹：</span>
                <div class="func_enable">
                    <button title="打开填充模板文件夹" class="exmo_button_icon mini">
                        <i class="icon-layer-group-collapsed"></i>
                    </button>


                    <button class="exmo_button_icon mini" title="刷新" v-on:click="click_refur">
                        <i class="icon-spinner9"></i>
                    </button>
                </div>
            </div>


        </div>


    </div>
    <!--setSystem {{setSystem._path_userDataDir}}-->

</template>
<style lang="scss" rel="stylesheet/scss">
    .quick_funcs_box .quick_more_item.more_on.text_fill {
        overflow: visible;
    }

    .fill-text-item {
        position: relative;
        display: inline-block;
        height: 35px;
        width: 120px;
        margin: 0 7px;
        text-align: center;

        .menu-box {
            z-index: 33;
        }

        span.name {
            -webkit-user-select: none;
            cursor: default;
        }

        .menu-buttom-box .menu-buttom {
            position: absolute;
            top: -4px;
            right: 6px;
        }
        .menu-buttom-box .menu-box {
            position: absolute;
            padding: 0;
            right: 0;
            margin-top: -3px;
        }

    }

</style>
<script>
    import  MenuButtom from '../components/MenuButtom.vue'
    var path = require("path")
    var fs = require("fs")
    export default{
        ready: function ()
        {
            window.fill_data_item_list = this.fill_data_item_list;
            this.importFillDataFromFile()
        },
        props: [],
        data(){
            return {
                setSystem: setSystem,
                random: true,
                fill_data_item_list: [],
                fill_data_item_list_org: [
//                    {
//                        name: "人名",
//                        title: "",
//                        fillData: "all",
//                        moreData: {
//                            "A型": ["CE", "CE", "C6"],
//                            "B型": ["C1", "C2", "C3"],
//                            "C型": ["CC", "CC", "C2"],
//                        }
//                    },
                    {
                        name: "数字序列",
                        title: "",
                        fillData: "(_%/count%_)",
                    },
                    {
                        name: "电话号码占位",
                        title: "",
                        fillData: "all",
                        moreData: {
                            "中国大陆": ["(_%/phone_cn%_)"],
                            "台湾": ["(_%/phone_tw%_)"],
                            "日本": ["(_%/phone_jp%_)"],
                        }
                    },

                ],
                options: [
                    {
                        value: 'inver_order_layers',
                        label: '倒序图层',
                        title: "把所选图层的层叠顺序颠倒",
                        selected_func: null,
                        button: true,
                        block: true,
                    }]

            }
        },
        methods: {

            click_option: function (option)
            {
                if (typeof  option === "object")
                {
                    var data = this.fill_data_item_list[option.dataIndex].moreData[option.moreDataName];
                } else
                {

                    var data = this.fill_data_item_list[option].fillData;
                    console.info("click_option_fillData", data)
                    if (data === "all")
                    {
                        data = []

                        for (var x in this.fill_data_item_list[option].moreData)
                        {
                            if (this.fill_data_item_list[option].moreData[x] != undefined)
                            {
                                data = data.concat(this.fill_data_item_list[option].moreData[x])
                            }

                        }
                    }
                    else if (data.slice(0, 4) === "(_%/")
                    {
                        data = [data]
                    }

                }

                this.func_text_fillText(data)
            },

            click_refur: function ()
            {
                this.importFillDataFromFile()
            },

            importFillDataFromFile: function ()
            {
                this.fill_data_item_list = this.fill_data_item_list_org.slice(0)
                var self = this;
                var textFillDataPath = path.join(setSystem._path_userDataDir, "FillTxet")

                if (fs.existsSync(textFillDataPath))
                {

                    var dir = fs.readdirSync(textFillDataPath)
                    if (dir != undefined && dir.length > 0)
                    {
                        for (var i = 0; i < dir.length; i++)
                        {


                            if (path.extname(dir[i]).toLowerCase() == ".txt")
                            {
                                readTxt(path.join(textFillDataPath, dir[i]), path.parse(dir[i]).name)
                            }
                            else if (path.extname(dir[i]).toLowerCase() == ".json")
                            {

                                readJson(path.join(textFillDataPath, dir[i]))
                            }
                        }
                    }
                }

                function readTxt(filePath, name)
                {
                    var readResult = window.cep.fs.readFile(filePath);
                    if (0 == readResult.err)// err 为 0 读取成功
                    {
                        var txt = readResult.data
                        var dataArr = txt.split(/\r\n|\n/)
                        if (dataArr.length === 1 && txt.length > 1)
                        {
                            dataArr = txt.split(/[,，]/)
                        }

                        pushItem(name, dataArr)
                    }
                    else
                    {
                        console.log("读取错误：" + readResult.err);// 失败
                    }
                }

                function readJson(filePath)
                {
                    var readResult = window.cep.fs.readFile(filePath);
                    if (0 == readResult.err)// err 为 0 读取成功
                    {
                        var jsonText = readResult.data
                        var item = null
                        try
                        {
                            item = JSON.parse(jsonText)
                        } catch (e)
                        {
                            console.error("err: readJson()", e, ":", filePath, readResult)
                        }

                        if (item != undefined)
                        {

                            self.fill_data_item_list.push(item)
                        }
                    }
                    else
                    {
                        console.log("读取错误：" + readResult.err);// 失败
                    }
                }

                function pushItem(name, data)
                {
                    var item = {
                        name: name,
                        fillData: data,
                    }

                    self.fill_data_item_list.push(item)
                }
            },

            creatMenuOptions: function (dataIndex, moreData)
            {


                var options = []

                for (var x in moreData)
                {
                    var option = {
                        value: x,
                        label: x,
                        selected_func: {func: this.click_option, param: {moreDataName: x, dataIndex: dataIndex}},
                        button: true,
                        block: true,
                    }

                    options.push(option)

                }
                return options

            },

            func_text_fillText: async function (fillData)
            {
                var textTable = await Proteins.exec("quick_text_calcTextTable")
                var z = 0;
                var count = 1;
                console.info("fillData", fillData)

                if (textTable != undefined)
                {
                    for (var r = 0; r < textTable.length; r++)
                    {
                        for (var c = 0; c < textTable[r].length; c++)
                        {
                            var newText = getOneFromFillData()
                            if (newText != undefined)
                            {
                                textTable[r][c].text = newText
                            }
                        }
                    }
                }
                Proteins.exec("quick_text_textTableRender", {
                    textTable: textTable,
                })

                function getOneFromFillData()
                {
                    var getValue = null;

                    console.info("self.random")
                    if (self.random)
                    {
                        var index = Math.floor(Math.random() * (fillData.length - 1))
                        getValue = fillData[index]

                    }
                    else
                    {
                        if (z >= fillData.length)
                        {
                            z = 0;
                        }
                        getValue = fillData[z++]

                    }

                    if (getValue === "(_%/count%_)")
                    {
                        getValue = (count) + "";
                        count++;
                    } else if (getValue === "(_%/phone_cn%_)")
                    {
                        var a = [156, 181, 171, 136, 219]
                        var b = "XXXX"
                        var c = Math.floor(1000 + Math.random() * (9999 - 1000 + 1))
                        getValue = a[Math.floor(Math.random() * (a.length - 1))] + b + c
                    }
                    else if (getValue === "(_%/phone_tw%_)")
                    {
                        var seed = '0123456789', i = 0, len = seed.length, max = 10, rs = '', min = 0;
                        var def = new Array('0910', '0911', '0912', '0919', '0921', '0928', '0932', '0933', '0934', '0937', '0963', '0972', '0914', '0918', '0920', '0922', '0935', '0939', '0952', '0953', '0958', '0961', '0970', '0916', '0917', '0926', '0930', '0931', '0936', '0954', '0955', '0913', '0915', '0925', '0927', '0938', '0924', '0929', '0956', '0960', '0971', '0923', '0968', '0982', '0986', '0987', '0988', '0989');
                        var st = 0;
                        if (st == 0) rs = def[Math.floor(Math.random() * def.length)].toString(); else rs = st.toString();
                        min = rs.length;
                        for (i = 0; i < max - min; i++)
                        {
                            rs += seed.substr(Math.floor(Math.random() * len), 1);
                        }
                       rs =  STR.insert(rs,3,3,"XXX")
                        getValue = rs
                    }
                    else if (getValue === "(_%/phone_jp%_)")
                    {
                        var seed = '0123456789', i = 0, len = seed.length, max = 11, rs = '', min = 0;
                        var def = new Array('050', '080', '090', '070', '020', '060');
                        var st = 0;
                        if (st == 0) rs = def[Math.floor(Math.random() * def.length)].toString(); else rs = st.toString();
                        min = rs.length;
                        for (i = 0; i < max - min; i++)rs += seed.substr(Math.floor(Math.random() * len), 1);

                        rs = STR.insert(rs,4,3,"XXX")
                        getValue = rs
                    }

                    return getValue
                }
            }
        },
        computed: {},
        components: {
            "menu-buttom": MenuButtom
        }
    }



</script>
