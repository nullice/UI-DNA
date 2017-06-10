<template>


    <div class="fun_block">

        <br>
        <br><br>
        <div class="info" @click="updataLayers">
            <span>设置图像：</span>
        </div>
        <div class="quick_template">

            <div v-for="(key,x) in layers">
                <span>layer{{key}} {{x.id}}  ： {{x.name}}</span>
                <button @click="setImg(x.id, key)">选择</button>
            </div>


        </div>


    </div>


</template>
<style lang="scss" rel="stylesheet/scss">


</style>
<script>

    export default{
        props: [],

        ready: function ()
        {
            this.updataLayers()

        },
        watch: {
            "dataCaryon.nowDoucmentId": function ()
            {
                this.updataLayers()
            }
        },
        data(){
            return {
                layers: []

            }
        },
        methods: {

            setImg: async function (id, key)
            {
                var filePath = appCaryon.userSelectFiles()

                if (filePath != undefined)
                {

                    var oldName = await  enzymes.getLayerName_byID(id)

                    var newId = await enzymes.setLayerInfo_smartObject_byId({
                        link: filePath[0]
                    }, id, true)

                    await  enzymes.setLayerName_byActive(oldName)

                    if (key)
                    {
                        dataCaryon.doc.linkLayerIds[key].id = newId

                        this.layer[key].id =newId
                        dataCaryon.save()
                    }



                }


            },

            updataLayers: async function (id)
            {
                var layers = []
                for (var i = 0; i < dataCaryon.doc.linkLayerIds.length; i++)
                {
                    var ob = {id: dataCaryon.doc.linkLayerIds[i]}
                    ob.name = await enzymes.getLayerName_byID(dataCaryon.doc.linkLayerIds[i])
                    layers.push(ob)
                }

                console.log("---_--------asdfsdf", layers)

                Vue.set(this, "layers", layers)


            }
        },
        computed: {
            linkLayers: function ()
            {


            }
        }
    }
</script>
