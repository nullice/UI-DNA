import VCC from "./../vue-color-cylinder.vue"

var mainVue3 = new Vue({
    el: '#vcc',
    name:"vue_vcc",
    methods: {},

    data: {

        cc: window.cc,
    },
    components: {"vue-color-cylinder": VCC}
})
