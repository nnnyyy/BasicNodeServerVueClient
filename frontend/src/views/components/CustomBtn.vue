<template>  
<div @mouseover="onMouseOver" @mouseout="onMouseOut" class="pos-rel" :class="[ ( disabled || manual_disabled ) ? clsDisabledType : clsType ]" @click="clickEvent()">
    <slot></slot>
    <div class="pos-abs pda-2" style="width: 200px; left: 0; top: 32px; border: 1px solid black; background-color: white; color: black; font-size: 10pt; z-index: 30;" v-if="hovered!='' && mouseovered" >{{hovered}}</div>
</div>
</template>

<script>

export default {
    props: {
        st: {
            type: String,
            default: "2"
        },
        bg_confirm: { type: Boolean },
        bg_cancel: { type: Boolean },
        bg_p1: { type: Boolean },
        bg_p2: { type: Boolean },
        bg_white: { type: Boolean },
        auto: { type: Boolean },
        manual_disabled: { type: Boolean },
        hovered: { type: String, default: '' }
    },
    data() {
        return {
            clsType: '',
            clsDisabledType: '',
            clsSt: '',
            disabled: false,
            mouseovered: false
        }
    },
    components: {
        
    },
    methods: {
        clickEvent() {
            if( this.disabled || this.manual_disabled ) {
                return;
            }

            if( this.auto ) this.disabled = true;
            if( this.auto ) this.clsSt = '';

            this.$emit('listener', this);
        },
        onMouseOver() {
            this.mouseovered = true;            
        },
        onMouseOut() {
            this.mouseovered = false;
        }
    },
    created() {
        this.clsSt = 'bg-p1';

        if( this.bg_confirm ) this.clsSt = 'bg-confirm';
        if( this.bg_cancel ) this.clsSt = 'bg-cancel';
        if( this.bg_p1 ) this.clsSt = 'bg-p1';
        if( this.bg_p2 ) this.clsSt = 'bg-p2';
        if( this.bg_white ) this.clsSt = 'bg-white';

        this.clsType = `btn-${this.st} ${this.clsSt}`;
        this.clsDisabledType = `btn-disabled-${this.st}`;
    }
}
</script>

<style lang="scss" scoped>
.bg-confirm { background-color: $cr-confirm; color: white; }
.bg-cancel { background-color: $cr-cancel; color: white; }
.bg-p1 { background-color: $cr-primary-1; color: white; }
.bg-p2 { background-color: $cr-primary-2; color: white; }
.bg-white { background-color: white; }
</style>