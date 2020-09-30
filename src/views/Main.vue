<template>
    <div class="main-container">
        <div class="main-top">
            <div v-if="isEmpty(mathAccount)" class="top-balance">
                <div class="balance-left">
                    <div class="name tooltip">
                        <img alt="" :src="icon"/>
                        <span>
                            {{userName}}
                        </span>
                        <div class="tooltiptext">
                            {{userName}}
                        </div>
                    </div>
                    <s-address :address="address" :ellipsis="true"/>
                </div>
            </div>
            <div v-else class="top-balance">
                <div class="balance-left">
                    <div class="name">
                        <div class="math-logo">
                            <img
                                    :src="`https://medishares-cn.oss-cn-hangzhou.aliyuncs.com/mathwallet/images/mathlabs/wallet_en_logo_white.png`"
                            />
                        </div>
                        {{ $t('passport.math') }}
                    </div>
                </div>
            </div>
            <div class="top-btns">
                <router-link class="top-btn" to="receive">
                    <img :src="icon2"/>
                    {{$t('main.receive')}}
                </router-link>
                <div class="top-btn" @click="goSendForm">
                    <img :src="icon1"/>
                    {{$t('main.send')}}
                </div>
                <div class="top-btn" @click="goDeployContract">
                    <img alt="" :src="iconMultiSign"/>
                    MultiSign
                </div>
            </div>
        </div>
        <el-tabs v-model="$route.query.tab" :before-leave="onTabChange" type="card">
            <el-tab-pane :label="$t('main.assets')" name="assets">
                <div element-loading-background="rgba(255, 255, 255, 0)" class="assets">
                    <BalancePanel class="asset-item" :token="gardBalance"/>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('main.txs')" name="txs">
                <div v-loading="false" element-loading-background="rgba(255, 255, 255, 0)" class="txs">
                    <div class="empty" v-if="historyTransaction.total === 0">{{$t('main.empty')}}</div>
                    <TransactionList
                            v-if="historyTransaction.total > 0"
                            :transactionList="historyTransaction"
                            :onPaginationChange="handlePaginationChange"
                    />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {isEmpty} from "lodash";
    import icon1 from "@/assets/icon-to.svg";
    import iconMultiSign from "@/assets/ic_multi_sign.png";
    // import iconMultiSign from "@/assets/multi-sign.svg";
    import icon2 from "@/assets/icon-from.svg";
    import icon from "@/assets/icon-wallet.svg";
    import icon3 from "@/assets/icon-setting.svg";
    import {gardplorerDomain} from "@/constants";
    import {mapState, mapGetters, mapActions} from "vuex";
    import ErrorDialog from "../components/Dialog/ErrorDialog";
    import BalancePanel from "@/components/Panel/BalancePanel";
    import TransactionList from "@/components/TransactionList";
    import SuccessDialog from "../components/Dialog/SuccessDialog";
    import {getWallet} from "../utils/Store";

    export default {
        name: "Main",
        components: {
            SuccessDialog,
            BalancePanel,
            TransactionList,
            ErrorDialog
        },
        data() {
            return {
                icon,
                icon1,
                iconMultiSign,
                icon2,
                icon3,
                domain: gardplorerDomain,
                showDialogError: false,
                showDialogSuccess: false,
                permissionMessage: "",
                arrayPermission: [],
                page: this.$route.query.page ? this.$route.query.page : 1,
                limit: 10,
                balanceData: {denom: "", amount: ""},
                updatePage: false
            };
        },
        computed: {
            ...mapState("account", [
                "userName",
                "keyStore",
                "mathAccount",
                "balance",
                "txs",
                "loading",
                "tokenMap",
                "permission",
                "activeUser"
            ]),
            ...mapState("transactions", {
                historyTransaction: "historyTransaction"
            }),
            ...mapGetters("account", {address: "currentAddress"}),
            gardBalance() {
                const gard = {amount: "0", denom: "xek"};
                return this.balance.find(i => i.denom === "xek") || gard;
            }
        },

        methods: {
            isEmpty,
            ...mapActions({
                getHistoryTransaction: "transactions/getHistoryTransaction"
            }),
            onTabChange(tab) {
                let url = `/main?tab=${tab}`;

                if (tab === "assets") {
                    this.$store.dispatch("account/fetchBalance");
                }

                const current_page = this.historyTransaction.current_page;
                const current_limit = this.historyTransaction.limit;
                if (this.$route.query && this.$route.query.page) {
                    this.page = this.$route.query.page;
                }

                this.limit = current_limit ? current_limit : 10;
                if (tab === "txs") {
                    url = url + `&page=${this.page}`;
                    this.getHistoryTransaction({
                        address: this.address,
                        page: this.page,
                        limit: this.limit
                    });
                }
                this.$router.push(url);
            },
            handlePaginationChange({page, limit}) {
                this.page = page;
                this.limit = limit;
                // this.$router.push(`/main?tab=txs&page=${this.page}`);
                if (this.updatePage) {
                    this.$router.push({query: {tab: 'txs', page: this.page}});
                    this.updatePage = !this.updatePage;
                }
                this.getHistoryTransaction({
                    address: this.address,
                    page: this.page,
                    limit: this.limit
                });
            },
            goSendForm() {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("sendForm");
                this.$router.push({path: "send/form"});
            },
            goDeployContract() {
                this.$router.push({path: "contract/create"});
            },
            handleError(err) {
                console.log("error", err);
                this.$notify.error({
                    title: "Error",
                    message: err
                });
            }
        },
        mounted() {
            let wallet = getWallet();
            if (wallet) {
                this.$store.dispatch("account/fetchBalance");
                let param = this.$route.query && this.$route.query.tab || "";
                if (!this.isEmpty(param) && param === "txs") {
                    // this.onTabChange(this.$route.query.tab);
                    this.getHistoryTransaction({
                        address: this.address,
                        page: this.page,
                        limit: this.limit
                    });
                }
            } else {
                this.$store.dispatch("account/updateActiveUser", false);
                this.$router.push("/passport");
            }

            this.$root.$on("ChangePage", () => {
                this.updatePage = !this.updatePage;
            });
        }
    };
</script>

<style lang="scss" scoped>
    .main-container {
        max-width: $max-width;
        margin: 0 auto $padding-large;
        padding: $padding-large;

        .btn {
            width: 20%;
            padding: 15px 10px 15px 10px;
            margin-top: 20px;
            text-align: center;
            align-self: center;
        }

        .main-top {
            display: flex;
            align-items: stretch;
            margin: -4px -4px $padding-basic;

            .top-balance {
                background: $color-primary-light;
                box-shadow: $shadow;
                padding: 0 0 0 $padding-large;
                margin: 4px;
                flex-basis: 50%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                > .balance-right {
                    flex-basis: 30%;
                }

                .name {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    margin-bottom: 8px;
                    margin-right: 25px;
                    width: 460px;

                    img {
                        height: 24px;
                        margin-right: 8px;
                    }

                    .math-logo {
                        width: 32px;
                        overflow: hidden;
                        margin-bottom: -2px;
                    }

                    span {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        width: 500px;
                        display: inline-block;
                    }
                }

                .tooltip {
                    position: relative;

                    .tooltiptext {
                        visibility: hidden;
                        text-align: center;
                        border-radius: 6px;
                        position: absolute;
                        z-index: 2;
                        background-color: #111111;
                        padding: 10px;
                        bottom: 40px;
                        left: 20px;
                        font-size: smaller;
                    }

                    &:hover .tooltiptext {
                        visibility: visible;
                    }
                }

                .top-btn {
                    flex-grow: 1;
                    line-height: 32px;
                    padding: $padding-large 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        background: $color-primary-light;
                    }

                    img {
                        width: 32px;
                    }
                }
            }

            .top-btns {
                display: flex;
                text-align: center;
                align-items: stretch;
                margin: 4px;
                flex-basis: 50%;
                height: 130px;
                background: $color-primary-light;
                box-shadow: $shadow;
                cursor: pointer;

                .top-btn {
                    flex-grow: 1;
                    line-height: 32px;
                    padding: $padding-large 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        background: $color-primary-light;
                    }

                    img {
                        width: 32px;
                    }

                    i {
                        font-size: 32px;
                    }
                }
            }
        }

        .assets {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            padding: $padding-basic 0;
            margin-left: -24px;

            .asset-item {
                margin-left: 24px;
                margin-bottom: 16px;
            }
        }

        .txs {
            padding: $padding-basic 0;

            .empty {
                margin: $padding-large;
                text-align: center;
                color: rgba(255, 255, 255, 0.5);
            }

            p {
                margin-top: 16px;
            }
        }
    }

    @include responsive($sm) {
        .main-container {
            padding: 16px;

            .main-top {
                flex-direction: column;
            }

            .assets {
                flex-direction: column;
                align-items: stretch;
            }

            .txs {
                padding: $padding-basic 4px;
            }
        }
    }
</style>
