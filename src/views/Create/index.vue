<template>
    <s-page class="create-container" :link="link">
        <RouterView/>
    </s-page>
</template>

<script>
    export default {
        name: "Create",
        data() {
            return {
                link: "",
            };
        },
        mounted() {
            let param = this.$route.query.link;
            if (param) {
                this.link = "/passport";
            }
        }
    };
</script>

<style lang="scss" scoped>
    .create-container {
        width: 100%;
    }
</style>

