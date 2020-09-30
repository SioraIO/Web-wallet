<template>
    <s-page class="tx-container">
        <s-card :title="$t('main.txInfo')" class="detail-container">
            <el-row class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Hash:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">
                        <el-tooltip
                                class="item"
                                effect="light"
                                :content="detailTransaction.tx_hash"
                                placement="top"
                                popper-class="Content-Tooltip-Hash"
                        >
                            <div
                                    v-clipboard:copy="detailTransaction.tx_hash"
                                    v-clipboard:success="onCopySuccess"
                            >
                                {{ formatHashString(detailTransaction.tx_hash) }}
                            </div>
                        </el-tooltip>
                    </div>
                </el-col>
            </el-row>
            <el-row class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Block:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{detailTransaction.height}}</div>
                </el-col>
            </el-row>
            <el-row class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Start:</div>
                </el-col>
                <el-col :span="19">
                    <div
                            class="grid-content item-transaction-value"
                    >{{ formatDateTime(detailTransaction.timestamp) }}
                    </div>
                </el-col>
            </el-row>
            <el-row class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Type:</div>
                </el-col>
                <el-col :span="19">
                    <div
                            v-if=" detailTransaction.tx_type === 'SendTx' "
                            class="grid-content item-transaction-value"
                    >Send transaction
                    </div>
                    <div
                            v-if=" detailTransaction.tx_type === 'CallTx' "
                            class="grid-content item-transaction-value"
                    >Call transaction
                    </div>
                    <div
                            v-if=" detailTransaction.tx_type === 'PermsTx' "
                            class="grid-content item-transaction-value"
                    >Permission transaction
                    </div>
                </el-col>
            </el-row>
            <el-row class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">From:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{detailTransaction.from_acc}}</div>
                </el-col>
            </el-row>
            <el-row class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">To:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{detailTransaction.to_acc}}</div>
                </el-col>
            </el-row>
            <el-row class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Amount:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{formatBalance(detailTransaction.amount)}}</div>
                </el-col>
            </el-row>
            <el-row v-if="detailTransaction.fee_receiver !== null" class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Fee Receiver</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{detailTransaction.fee_receiver}}</div>
                </el-col>
            </el-row>
            <el-row v-if="detailTransaction.fee_receiver !== null" class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">{{ $t('send.fee') }}:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{formatBalance(detailTransaction.tx_fee)}}</div>
                </el-col>
            </el-row>
            <el-row v-else class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">{{ $t('send.fee') }}:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{formatBalance(detailTransaction.tx_fee)}}</div>
                </el-col>
            </el-row>
        </s-card>

        <s-card :title="$t('main.txtInternal')" class="detail-container" v-if="detailTransaction.internal">
            <el-row class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Hash:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">
                        <el-tooltip
                                class="item"
                                effect="light"
                                :content="detailTransaction.internal.tx_hash"
                                placement="top"
                                popper-class="Content-Tooltip-Hash"
                        >
                            <div
                                    v-clipboard:copy="detailTransaction.internal.tx_hash"
                                    v-clipboard:success="onCopySuccess"
                            >{{ formatHashString(detailTransaction.internal.tx_hash) }}
                            </div>
                        </el-tooltip>
                    </div>
                </el-col>
            </el-row>
            <el-row class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Block:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{detailTransaction.internal.height}}</div>
                </el-col>
            </el-row>
            <el-row class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Start:</div>
                </el-col>
                <el-col :span="19">
                    <div
                            class="grid-content item-transaction-value"
                    >{{ formatDateTime(detailTransaction.internal.timestamp) }}
                    </div>
                </el-col>
            </el-row>
            <el-row class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Type:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">
                        Internal transaction
                    </div>
                </el-col>
            </el-row>
            <el-row class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">From:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{detailTransaction.internal.from_acc}}</div>
                </el-col>
            </el-row>
            <el-row class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">To:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{detailTransaction.internal.to_acc}}</div>
                </el-col>
            </el-row>
            <el-row class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Amount:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">
                        {{formatBalance(detailTransaction.internal.amount)}}
                    </div>
                </el-col>
            </el-row>
            <el-row v-if="detailTransaction.fee_receiver !== null" class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">Fee Receiver</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">{{detailTransaction.internal.fee_receiver}}</div>
                </el-col>
            </el-row>
            <el-row v-if="detailTransaction.fee_receiver !== null" class="row-item">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">{{ $t('send.fee') }}:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">
                        {{formatBalance(detailTransaction.internal.tx_fee)}}
                    </div>
                </el-col>
            </el-row>
            <el-row v-else class="row-sole">
                <el-col :span="colSpanlKey">
                    <div class="grid-content item-key-transaction">{{ $t('send.fee') }}:</div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content item-transaction-value">
                        {{formatBalance(detailTransaction.internal.tx_fee)}}
                    </div>
                </el-col>
            </el-row>
        </s-card>
    </s-page>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import {formatDateTime, showNotifySuccess} from "../../utils/Constant";
    import {Utils} from "xek-sdk";
    import {getFee} from "../../utils/XekSDK";

    export default {
        data() {
            return {
                colSpanlKey: 4
            };
        },
        name: "TransactionInfo",
        computed: {
            ...mapState("transactions", {
                detailTransaction: "detailTransaction"
            })
        },
        methods: {
            ...mapActions({
                getDetailTransaction: "transactions/getDetailTransaction"
            }),
            formatHashString: hash => {
                if (!hash || typeof hash != "string") return `Hash not exist!`;

                if (hash.length > 60) {
                    const hashLength = hash.length;
                    const threeDot = "...";
                    const hashFormated = `${hash.slice(0, 26)} ${threeDot} ${hash.slice(
                        hashLength - 26
                    )}`;
                    return hashFormated;
                } else return hash;
            },
            formatDateTime: dateString => {
                return formatDateTime(dateString);
            },
            formatBalance: balance => {
                return Utils.toXek(balance);
            },
            onCopySuccess() {
                showNotifySuccess(this, this.$t("main.copy"));
            },
        },
        async beforeMount() {
            const hash = this.$route.params.id;
            await this.getDetailTransaction(hash);
        }
    };
</script>

<style lang="scss" scoped>
    .el-row {
        margin-bottom: 1px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 0px;
    }

    .grid-content {
        border-radius: 0px;
        min-height: 36px;
        padding-top: 5px;
    }

    .item-key-transaction {
        padding-left: 10px;
        font-size: 20px;
    }

    .item-transaction-value {
        padding-left: 10px;
    }

    .row-item {
        background: #71a4a5;
    }

    .row-sole {
        background-color: #4b8d8a;
    }
</style>

<style>
    .detail-container {
        max-width: 1000px !important;
    }

    .Content-Tooltip-Hash {
        color: black !important;
    }
</style>
