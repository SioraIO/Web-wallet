<template>
    <div class="page-container passport-container page-passport">
        <div class="header">
        </div>
        <div class="content">

            <s-card
                    class="passport-card"
                    :title="$t('passport.title')"
            >
                <s-btn-card
                        :title="$t('passport.create')"
                        :src="icon1"
                        :brief="$t('passport.createBreif')"
                        link="create/pass"
                        class="btn-card-fs"
                />
                <s-btn-card
                        :title="$t('passport.recover')"
                        :src="icon2"
                        :brief="$t('passport.recoverBreif')"
                        link="/recover/phrase/input"
                        class="btn-card-fs"
                />
            </s-card>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {isEmpty} from "lodash";
    import icon1 from "@/assets/icon-create.svg";
    import icon2 from "@/assets/icon-import.svg";

    export default {
        data() {
            return {
                icon1,
                icon2
            };
        },
        computed: {
            ...mapState("account", ["userMap", "userName", "mathAccount", "activeUser"]),
            mathPlugin() {
                return !isEmpty(window.mathExtension);
            }
        },
        mounted() {
            if (this.activeUser) {
                this.$router.push('/main?tab=assets');
            }
        },
        methods: {
            isEmpty
        }
    };
</script>

<style lang="scss" scoped>
    .page-passport {
        margin-top: 105px !important;
    }

    .page-container {
        max-width: $max-width;
        margin: 0 auto $padding-large;
        padding: $padding-large;
    }

    .passport-container {
        /*margin: 0 auto;*/

        .user-select {
            margin: 0 auto;
            max-width: 560px;

            .user-item {
                margin: 0 0 $padding-basic;
                padding: $padding-basic;
                background: rgba(250, 250, 255, 0.15);
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: background-color $trans;

                &.is-checked,
                &:hover {
                    background: rgba(250, 250, 255, 0.4);
                }

                &.math {
                    display: block;

                    .math-top {
                        display: flex;
                        align-items: center;
                        font-size: 20px;

                        span {
                            margin-bottom: 4px;
                        }
                    }

                    .math-logo {
                        width: 36px;
                        overflow: hidden;
                    }

                    p {
                        margin-top: 2px;
                    }
                }

                &.math1 {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }

        .passport-card {
            max-width: 560px;
        }
    }
</style>

