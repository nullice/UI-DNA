<script>
    //es6
    export default {
        props: ['title'],

    }
</script>
<template>
    <div class="exmo_area">
        <h2> {{title}} </h2>
        <slot></slot>
    </div>
</template>


<style lang="css">
</style>

