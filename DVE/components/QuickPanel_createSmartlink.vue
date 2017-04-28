<template>

    <div class="fill-text-box">

        <div class="fun_block">
            <div class="info">
                从选择图层创建链接对象

                <div class="inline-but-bar">

                    <input type="checkbox" class="exmo_icon_cheackbox" id="quick_create_1"
                           name="group_derive_mirror"
                           v-model="random">
                    <label class="exmo_button_icon mini" for="quick_create_1">
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
                    <button title="打开填充模板文件夹" class="exmo_button_icon mini"
                            v-on:click="opn(path.join(setSystem._path_userDataDir, 'FillImage'))">
                        <i class="icon-layer-group-collapsed"></i>
                    </button>


                    <button class="exmo_button_icon mini" title="刷新" v-on:click="click_refur">
                        <i class="icon-spinner9"></i>
                    </button>
                </div>
            </div>

            <!--4-->
            <!--<pre>-->
            <!--{{fill_data_item_list | json }}-->
            <!--</pre>-->


        </div>


        <div class="fun_block">
            <div class="exmo_inbox " title="新图层覆盖原有图层的方式">
                <div class="exmo_box_name">{{'覆盖方式' | lang}}</div>
                <select class="exmo_select" v-model="o_mask_type" style="width: 126px;">
                    <option value="CM"> {{"剪贴蒙版" | lang}}</option>
                    <option value="SM"> {{"蒙版" | lang}}</option>
                </select>
            </div>

            <div class="exmo_checkbox">
                <input type="checkbox" id="quick_create_fsl2"
                       v-model="o_rasterizeLayer">
                <div class="exmo_checkbox_shadow"></div>
                <label for="quick_create_fsl2" title="把新图层栅格化，能减少文档大小">
                    栅格化
                </label>
            </div>

            <span>  </span>

            <div class="exmo_checkbox" v-show="o_mask_type=='CM'">
                <input type="checkbox" id="quick_create_fsl1"
                       v-model="o_linkLayer">
                <div class="exmo_checkbox_shadow"></div>
                <label for="quick_create_fsl1">
                    链接图层
                </label>
            </div>


            <!--<div class="exmo_checkbox" v-show="o_mask_type=='SM'">-->
            <!--<input type="checkbox" id="quick_create_fsl3"-->
            <!--v-model="o_deleteOrgMask">-->
            <!--<div class="exmo_checkbox_shadow"></div>-->
            <!--<label for="quick_create_fsl3" title="删除用来生成蒙版的原图层">-->
            <!--删除原图层-->
            <!--</label>-->
            <!--</div>-->

            <br>


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


            var self = this;
            window._QuickPanel_createSmartLink_importFillDataFromFile = function ()
            {
                self.importFillDataFromFile()
            }

        },
        props: [],
        data(){
            return {
                setSystem: setSystem,
                random: true,
                opn: opn,
                path: path,
                o_mask_type: "CM",
                o_linkLayer: true,
                o_deleteOrgMask: true,
                o_rasterizeLayer: false,


                fill_data_item_list: [],
                fill_data_item_list_org: [
//                    {
//                        name: "调试",
//                        title: "",
//                        fillData: "all",
//                        moreData: {
//                            "A型": ["啊"],
//                            "B型": ["b"],
//                            "C型": ["从"],
//                        }
//                    },
                    {
                        name: "打开文件...",
                        title: "",
                        fillData: "openFiles",
                    }
                    ,
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
//
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
                    else if (data === "openFiles")
                    {
                        try
                        {
                            var result = window.cep.fs.showOpenDialogEx(true, false, "打开图片", "");

                            if (result.data != undefined)
                            {
                                data = []
                                for (var i = 0; i < result.data.length; i++)
                                {
                                    data.push(result.data[i])
                                }

                            }

                        } catch (e)
                        {
                            console.error(e)
                        }

                    }

                }

                console.info("click_option data", data)


                var fileArr = []
                var fillDataPath = path.join(setSystem._path_userDataDir, "FillImage")
                for (var i = 0; i < data.length; i++)
                {
                    var filePath = null;
                    if (fs.existsSync(data[i]))
                    {
                        var filePath = data[i]
                    } else
                    {
                        var testPath = path.join(fillDataPath, data[i])

                        if (fs.existsSync(testPath))
                        {
                            var filePath = testPath
                        } else
                        {
                            console.info("filePath existes not:" + testPath)
                        }
                    }

                    if (filePath != undefined)
                    {
                        var result = this.isDir(filePath)
                        if (result === false)
                        {
                            fileArr.push(filePath)
                        } else
                        {
                            result = result.map(function (x) {return path.join(filePath, x)})
                            fileArr = fileArr.concat(result)

                        }
                    }

                }


//                console.info("fin:", fileArr)

                this.func_create_smartlink(fileArr)


            },

            /**
             * 判断是否是文件夹，否返回 false ，是则返回目录下文件数组
             * @param filePath
             * @returns {boolean}
             */
            isDir: function (filePath)
            {
                try
                {
                    var fileArr = fs.readdirSync(filePath)
                    return fileArr
                } catch (e)
                {
                    return false
                }
            },
            click_refur: function ()
            {
                this.importFillDataFromFile()
            },

            importFillDataFromFile: function ()
            {
                var self = this;
                self.fill_data_item_list = this.fill_data_item_list_org.slice(0)

                var imageFillDataPath = path.join(setSystem._path_userDataDir, "FillImage")
                if (fs.existsSync(imageFillDataPath))
                {
                    var dir = fs.readdirSync(imageFillDataPath)
                    if (dir != undefined && dir.length > 0)
                    {
                        for (var i = 0; i < dir.length; i++)
                        {
                            var result = self.isDir(path.join(imageFillDataPath, dir[i]));
                            if (result !== false)
                            {
                                pushItem(dir[i], result)
                            }
                        }
                    }
                }


                function pushItem(name, data)
                {
                    var rootFile = []
                    var moreData = {}
                    var moreLengt = 0;

                    for (var i = 0; i < data.length; i++)
                    {
                        var itemValue = path.join(name, data[i])

                        var result = self.isDir(path.join(imageFillDataPath, itemValue));
                        if (result !== false)
                        {
                            moreData[data[i]] = [itemValue]
                            moreLengt++;
                        } else
                        {
                            rootFile.push(itemValue)
                        }
                    }


                    if (moreLengt > 0)
                    {
                        moreData[Lang.from('根目录')] = rootFile
                        moreLengt++;

                        var item = {
                            name: name,
                            fillData: "all",
                            moreData: moreData
                        }
                    } else
                    {
                        var item = {
                            name: name,
                            fillData: [name],

                        }
                    }
                    self.fill_data_item_list.push(item)
                }
            },

            creatMenuOptions: function (dataIndex, moreData)
            {
                path
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

            func_create_smartlink: async function (fillData)
            {
                var imagePoll = []

//                console.info("func_create_smartlink：fillData", fillData)

                var selectLength = Gob.selectList.length
                var z = 0;
                for (var i = 0; i < selectLength; i++)
                {
                    if (this.random)
                    {
                        var randomIndex = Math.floor(Math.random() * (fillData.length - 1));
                        console.info()

                        imagePoll.push(fillData[randomIndex])
                    } else
                    {
                        if (z >= fillData.length)
                        {
                            z = 0;
                        }
                        imagePoll.push(fillData[z])
                        z++;
                    }
                }

                if (imagePoll.length < 1)
                {

                    return
                }
                Proteins.exec("quick_create_smartlink_fromShape", {
                    images: imagePoll,
                    linkLayer: this.o_linkLayer,
                    maskType: this.o_mask_type,
                    deleteOrgMask: this.o_deleteOrgMask,
                    rasterizeLayer: this.o_rasterizeLayer,
                })


//                alert(JSON.stringify(fillData))
            }
        },
        computed: {},
        components: {
            "menu-buttom": MenuButtom
        }
    }
</script>
