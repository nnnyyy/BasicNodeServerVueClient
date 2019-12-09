<template>  
<div v-if="show" class="f-base f-jc f-ac" style="position: absolute; left: 0;top:0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.4);">
    <slot></slot>
</div>  
</template>

<script>

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {            
        }
    },
    components: {
        
    },
    methods: {        
    },
    created() {        
    }
}
</script>

<style lang="scss">
</style>