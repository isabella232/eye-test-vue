<template>
    <div>
        <div class="container">
            <div v-if="started" class="d-flex justify-content-between">
                <div class="p-2"></div>
                <div class="p-2"><h4>Stage: {{stage}}</h4></div>
                <div class="p-2">Time:{{time}}s</div>
            </div>
            <div v-if="started" class="d-flex justify-content-center align-items-center">
                <Eye-test
                    ref="eyeTest"
                    :stage="stage"
                    :grid-count="getGridCount"
                    :container-size="width"
                    :basic-color="colors.basicColor"
                    :answer-color="colors.answerColor"
                    v-on:next="handleNextStage"
                ></Eye-test>
            </div>
            <div v-else>
                <h4>Test your eyes!</h4>
                <button class="btn btn-primary btn-lg" @click="handleGameStart">Start</button>
            </div>
            <div v-if="gameEnded">
                <h3>You passed {{stage - 1}} stages in 60 seconds</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import EyeTest from './EyeTest.vue';
    import { getNextColor } from "../utils/ColorGenerator";
    import { getGridCount } from "../utils/StageGridCount";

    let interval = null;
    const gameTime = 60;
    export default {
        components: {
            EyeTest,
        },
        data() {
            const stage = 1;
            const browserHeight = (window.innerWidth || document.body.clientWidth || 800);
            const browserWidth = (window.innerWidth || document.body.clientWidth || 800);
            return {
                started: false,
                time: gameTime,
                stage: stage,
                colors: getNextColor(stage),
                width: Math.min(browserHeight, browserWidth) * 0.7,
                gameEnded: false,
            }
        },
        computed: {
            getGridCount() {
                return getGridCount(this.stage);
            },
        },
        methods: {
            handleGameStart() {
                this.stage = 1;
                this.time = gameTime;
                this.started = true;
                this.gameEnded = false;
                const vm = this;
                interval = window.setInterval(() => {
                    vm.time = vm.time - 1;
                    if (vm.time <= 0) {
                        if (interval) {
                            window.clearInterval(interval);
                        }
                        vm.started = false;
                        vm.gameEnded = true;
                    }
                }, 1000);
            },
            handleNextStage() {
                this.stage = this.stage + 1;
                this.colors = getNextColor(this.stage);
            },
        },
        beforeDestroy() {
            if (interval) {
                window.clearInterval(interval);
            }
        },
    }
</script>

<style scoped>

</style>
