<template>
    <s-page class="import-container" :link="link ? link : ''">
        <s-card
                class="recover-card"
                :title="$t('passport.recover')"
        >
            <div class="tabs">
                <router-link :to="route">
                </router-link>
            </div>

            <RouterView/>
        </s-card>
    </s-page>
</template>

<script>
    const route = "/recover/phrase/input";

    export default {
        data() {
            return {
                route,
                link: ""
            };
        },
        mounted() {
            let param = this.$route.query.link;
            if (param && param !== undefined) {
                this.link = `/${param}`;
            }
        },
    };
</script>

<style lang="scss" scoped>
    .import-container {
        margin: 0 auto;

        .recover-card {
            max-width: 460px;

            .tabs {
                display: flex;
                justify-content: space-between;

                button {
                    background: rgba(255, 255, 255, 0.15);
                    color: rgba(255, 255, 255, 0.65);
                    border-color: transparent;
                    transition: background-color $trans;

                    &.active,
                    &:hover {
                        color: white;
                        background: rgba(255, 255, 255, 0.4);
                    }
                }
            }
        }
    }
</style>
