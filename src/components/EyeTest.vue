<template>

    <div>
        <div v-for="i in (1,gridCount)" class="row">
            <div v-for="j in (1,gridCount)" class="col" :style="getColStyle(i,j)" @click="handleColClicked(i,j)">
            </div>
            <div style="clear: left"></div>
        </div>
    </div>

</template>
<style>
    .col {
        float: left;
        border: 1px solid white;
        cursor: pointer;
    }
</style>
<script>

    export default {
        props: {
            gridCount: {
                type: Number,
                required: true,
            },
            containerSize: {
                type: Number,
                default: 800,
            },
            basicColor: {
                type: String,
                required: true,
            },
            answerColor: {
                type: String,
                required: true,
            },
            stage: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                answerI: parseInt(Math.random() * this.gridCount, 0) + 1,
                answerJ: parseInt(Math.random() * this.gridCount, 0) + 1,
            };
        },
        watch: {
            stage() {
                this.refreshAnswer();
            },
        },
        methods: {
            refreshAnswer() {
                this.answerI = parseInt(Math.random() * this.gridCount, 0) + 1;
                this.answerJ = parseInt(Math.random() * this.gridCount, 0) + 1;
            },
            getColStyle(i, j) {
                const color = i === this.answerI && j === this.answerJ ? this.answerColor : this.basicColor;
                return {
                    width: `${this.containerSize / this.gridCount}px`,
                    height: `${this.containerSize / this.gridCount}px`,
                    backgroundColor: color,
                };
            },
            handleColClicked(i, j) {
                if (i === this.answerI && j === this.answerJ) {
                    console.log(`got`);
                    this.$emit('next');
                }
            },
        },
    }

</script>
