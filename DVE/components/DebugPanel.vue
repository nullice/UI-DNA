<template>

    <div class="debug-microscope">

        <h3>debug-microscope</h3>

        <input type="checkbox" id="advance_44" autocomplete="off" >
        <label class="btn btn_primary" title="{{'高级' |lang}}"
               for="advance_44">
            <span><i class="select_triangle_icon icon-play3"></i><span class="text">dataCaryon.layers</span></span>
        </label>
        <div class="advance_box">
            <pre><code>
            {{dataCaryon.layers|json}}
             </code></pre>
        </div>
        <br>
        <input type="checkbox" id="advance_45" autocomplete="off" >
        <label class="btn btn_primary"
               for="advance_45">
            <span><i class="select_triangle_icon icon-play3"></i><span class="text">dataCaryon</span></span>
        </label>
        <div class="advance_box">
            <pre><code>
            {{dataCaryon|json}}
             </code></pre>
        </div>

        <br>
        <input type="checkbox" id="advance_46" autocomplete="off" >
        <label class="btn btn_primary"
               for="advance_46">
            <span><i class="select_triangle_icon icon-play3"></i><span class="text">varSystem</span></span>
        </label>
        <div class="advance_box">
            <pre><code>
            {{varSystem|json}}
             </code></pre>
        </div>

        <br>
        <input type="checkbox" id="advance_47" autocomplete="off" >
        <label class="btn btn_primary"
               for="advance_47">
            <span><i class="select_triangle_icon icon-play3"></i><span class="text">Gob</span></span>
        </label>
        <div class="advance_box">
            <pre><code>
            {{Gob|json}}
             </code></pre>
        </div>

        <br>
        <input type="checkbox" id="advance_48" autocomplete="off" >
        <label class="btn btn_primary"
               for="advance_48">
            <span><i class="select_triangle_icon icon-play3"></i><span class="text">setSystem</span></span>
        </label>
        <div class="advance_box">
            <pre><code>
            {{setSystem|json}}
             </code></pre>
        </div>







        <!--<a-area area_title="debug-microscope" area_hight="40">-->
           <!--<pre>-->
                     <!--&lt;!&ndash;{{dataCaryon.layers|json}}&ndash;&gt;-->
             <!--</pre>-->
            <!--&lt;!&ndash;{{UI_model.msg_color_picker.color1 |json}}&ndash;&gt;-->

            <!--&lt;!&ndash;<div class="title">UI_model.msg_color_picker.color1</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<pre>&ndash;&gt;-->
            <!--&lt;!&ndash;{{UI_model.msg_color_picker.color1 |json}}&ndash;&gt;-->
            <!--&lt;!&ndash;</pre>&ndash;&gt;-->


            <!--&lt;!&ndash;<div class="title">Gob.shape</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<pre>&ndash;&gt;-->
            <!--&lt;!&ndash;{{Gob.shape |json}}&ndash;&gt;-->
            <!--&lt;!&ndash;</pre>&ndash;&gt;-->

            <!--&lt;!&ndash;<div class="title">dataCaryon</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<pre>&ndash;&gt;-->
            <!--&lt;!&ndash;{{dataCaryon |json}}&ndash;&gt;-->
            <!--&lt;!&ndash;</pre>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="title">Gob</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<pre>&ndash;&gt;-->
            <!--&lt;!&ndash;{{Gob |json}}&ndash;&gt;-->
            <!--&lt;!&ndash;</pre>&ndash;&gt;-->

            <!--&lt;!&ndash;<div class="Gob.text">Gob</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<pre>&ndash;&gt;-->
            <!--&lt;!&ndash;{{Gob.text.color |json}}&ndash;&gt;-->
            <!--&lt;!&ndash;</pre>&ndash;&gt;-->
        <!--</a-area>-->
    </div>

</template>
<style>
    .debug-microscope .title {
        border-bottom: 2px solid rgba(30, 118, 227, 0.42);
        font-size: 13px;
        color: rgba(85, 142, 213, 0.89);
        padding: 2px 0;
    }

    .debug-microscope  input[id^="advance"] + label {
        position: absolute;
        right: inherit;
        color: #6C55C0;

        overflow: hidden;
        overflow-y: scroll;
    }
    .debug-microscope pre {
        -webkit-user-select: text;
    }

    .debug-microscope pre::selection ,.debug-microscope code::selection {
        background:#6C55C0;
        color: #e4f5ff;
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
                varSystem: varSystem,
                setSystem:setSystem,
            }
        },
        components: {
            "a-area": Area,
        }
    }

</script>
