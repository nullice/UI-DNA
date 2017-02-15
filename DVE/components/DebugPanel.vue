<template>

    <div class="debug-microscope">
        <a-area area_title="debug-microscope" area_hight="40">
            <!--<pre>dataCaryon._nowDoucmentId：{{dataCaryon._nowDoucmentId}}-->
                <!--dataCaryon.info.status：{{dataCaryon.info.status|json}}-->
                <!--<pre>-->
  <pre> Gob.text.color:
      {{Gob.text.color|json}}</pre>
            <!--<div class="title">UI_model.msg_color_picker.color1</div>-->
                    <!--<pre>-->
                    <!--{{UI_model.msg_color_picker.color1 |json}}-->
                    <!--</pre>-->


                    <!--<div class="title">Gob.shape</div>-->
                    <!--<pre>-->
                    <!--{{Gob.shape |json}}-->
                    <!--</pre>-->

                    <!--<div class="title">dataCaryon</div>-->
                    <!--<pre>-->
                    <!--{{dataCaryon |json}}-->
                    <!--</pre>-->
                    <!--<div class="title">Gob</div>-->
                    <!--<pre>-->
                    <!--{{Gob |json}}-->
                    <!--</pre>-->

                    <!--<div class="Gob.text">Gob</div>-->
                    <!--<pre>-->
                    <!--{{Gob.text.color |json}}-->
                    <!--</pre>-->
        </a-area>
    </div>

</template>
<style>
    .debug-microscope .title {
        border-bottom: 2px solid rgba(30, 118, 227, 0.42);
        font-size: 13px;
        color: rgba(85, 142, 213, 0.89);
        padding: 2px 0;
    }


</style>
<script>
    import Area from '../components/area.vue';


    export default{
        data(){
            return {
                msg: 'hello vue',
                Gob: Gob,
                dataCaryon: dataCaryon,
            }
        },
        components: {
            "a-area": Area,
        }
    }

</script>
