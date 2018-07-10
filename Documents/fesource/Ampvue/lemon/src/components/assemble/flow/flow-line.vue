<template>
    <div class="tetris-flow_line" :class="{'tetris-flow_line_done': this.isDone}" >
        <div class="tetris-flow_process" :style="styles"></div>
    </div>
</template>

<script>

export default {
    name: 'flow-line',
    props: {
        isDone: Boolean,
        ing: Boolean,
    },
    computed: {
        styles () {
            const styles = {
                width: '2px',
                height: '2px'
            };
            if(this.ing) {
                styles.display = 'block';
                if(this.$parent.orientation === 'vertical') {
                    styles.height = '50%';
                } else {
                    styles.width = '50%';
                }
            }
            return styles;
        }
    }
}
</script>
