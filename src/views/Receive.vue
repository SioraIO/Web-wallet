<template>
    <s-page class="receive-container">
        <s-card :title="$t('main.receive')">
            <div class="card-content">
                <h4>{{$t('main.qrcode')}}</h4>
                <div id="qrcode"></div>
                <h4>{{$t('send.address')}}</h4>
                <s-address
                        class="addr"
                        :address="address || ''"
                        :brightBackground="true"
                />
                <el-button @click="dialogVisible=true" type="primary">Show Private Key</el-button>
            </div>
        </s-card>

        <el-dialog
                width="30%"
                :title="$t('create.pass')"
                :visible.sync="dialogVisible"
                class="dialog-enterPassword"
                top="30px"
                :close-on-click-modal="false"
        >
            <el-input
                    type="password"
                    v-model="pass"
                    :placeholder="$t('create.pass')"
                    @keyup.enter.native="onShowPrivateKey"
            ></el-input>
            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onShowPrivateKey">{{$t('global.ok')}}</el-button>
        </span>
        </el-dialog>

        <el-dialog
                width="25%"
                :title="$t('create.titleDialogPrivateKey')"
                :visible.sync="showPrivateKey"
                class="dialog-enterPassword"
                top="30px"
                :close-on-click-modal="false"
        >
            <div class="titlePrivateKey">{{$t('create.labelPrivateKey')}}</div>
            <div
                    class="privateKey"
                    v-clipboard:copy="privateKey"
                    v-clipboard:success="onCopy"
            >
                {{privateKey}}
            </div>
            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button type="primary" @click="showPrivateKey=false">{{$t('global.ok')}}</el-button>
        </span>
        </el-dialog>

    </s-page>
</template>

<script>
    import {mapState} from "vuex";
    import {isEmpty} from "lodash";
    import QRCode from "@/utils/qrcode";
    import {decryptWallet, getBalance, getFee, sendCoin} from "../utils/XekSDK";
    import {getWallet} from "../utils/Store";

    export default {
        name: "Receive",
        data() {
            return {
                address: "",
                dialogVisible: false,
                pass: "",
                showPrivateKey: false,
                privateKey: ""

            };
        },
        computed: {
            ...mapState("account", ["keyStore", "mathAccount"])
        },
        mounted() {
            if (isEmpty(this.keyStore)) {
                new QRCode(document.getElementById("qrcode"), this.mathAccount.account);
                this.address = this.mathAccount.account;
            } else {
                new QRCode(document.getElementById("qrcode"), this.keyStore.address);
                this.address = this.keyStore.address;
            }
        },
        methods: {
            onCopy() {
                this.$message({
                    type: "success",
                    message: this.$t("main.copy")
                });
            },
            onShowPrivateKey: async function () {
                if (!this.pass) {
                    this.$message({
                        type: "error",
                        message: this.$t("global.required", {name: this.$t("create.pass")}),
                        center: true
                    });
                    return false;
                }
                const loading = this.$loading({
                    lock: true,
                    text: "Loading",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                let wallet = getWallet();
                wallet = wallet ? JSON.parse(wallet) : null;
                if (!wallet) {
                    loading.close();
                    return false;
                } else {
                    const cipherText = wallet.keyEncrypt;
                    const decrypt = await decryptWallet(cipherText, this.pass);
                    if (decrypt && decrypt.privateKey) {
                        const privateKey = decrypt.privateKey;
                        loading.close();
                        this.privateKey = privateKey.toUpperCase();
                        this.showPrivateKey = true;
                        this.dialogVisible = false;
                    } else {
                        loading.close();
                        this.$notify.error({
                            title: "Error",
                            message: "PASSWORD INCORRECT"
                        });
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .receive-container {
        margin: 0 auto;
        text-align: center;

        .card-content {
            background: white;
            border-radius: 4px;
            padding: $padding-basic 0 $padding-large;
            color: rgba(0, 0, 0, 0.7);

            h4 {
                font-size: 20px;
                font-weight: bold;
                margin: 16px;
            }

            #qrcode {
                width: 256px;
                margin: 16px auto;
            }

            .addr {
                justify-content: center;
                padding: 0 $padding-basic;
                word-break: break-all;
                margin-bottom: 3%;
            }
        }

        .titlePrivateKey {
            color: #000000;
            font-size: 16px;
        }

        .privateKey {
            color: red;
            margin-top: 15px;
            border-style: solid;
            border-width: 1px;
            padding: 10px;
            border-radius: 8px;
        }

    }
</style>

