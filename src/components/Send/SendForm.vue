<template>
    <s-card :title="$t('send.form')">
        <el-form
                ref="form"
                label-position="top"
                :model="form"
                :rules="rules"
                @submit="onSubmit"
        >
            <el-form-item prop="address">
                <el-input
                        v-model="form.address"
                        :placeholder="$t('send.address')"
                        clearable
                        :maxlength="40"
                        @input="toUpperCaseAddress"
                ></el-input>
            </el-form-item>
            <div class="row-balance">
                {{ $t('send.balance') }}: {{ balance }}
                <a @click="setAmountAll">{{$t('send.all')}}</a>
            </div>
            <el-form-item prop="amount">
                <el-input
                        v-model="form.amount"
                        type="number"
                        min="0"
                        step="1"
                        :placeholder="$t('send.amount')"
                        clearable
                        @input="onChangeAmount"
                ></el-input>
            </el-form-item>

            <div class="row-balance">
                {{ $t('send.fee') }}: {{ fee }}
            </div>

            <el-button
                    class="btn-send"
                    native-type=“submit”
                    @click="onSubmit"
                    :disabled="validateValue"
            >{{$t('main.next')}}
            </el-button>
        </el-form>
    </s-card>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import BigNumber from "bignumber.js";
    import {getWallet} from "../../utils/Store";
    import {getBalance, getFee} from "../../utils/XekSDK";
    import SDK from 'xek-sdk';
    import {formatAmountInput, showNotifyError} from "../../utils/Constant";

    export default {
        name: "SendForm",
        data() {
            const requireError = name =>
                new Error(this.$t("global.required", {name}));
            const validateAddr = (rule, value, callback) => {
                if (!value || value.trim() === "") {
                    callback(requireError(this.$t("send.address")));
                    return;
                }
                if (value.length !== 40) {
                    callback(this.$t("send.addressWarn"));
                    return;
                }
                callback();
            };
            const validateAmount = (rule, value, callback) => {
                const input = value - 0;
                const balance = this.balance;
                const total = Number(input) + Number(this.fee);
                if (input <= 0) {
                    callback(new Error(this.$t("send.amountWarnPositive")));
                    return;
                }
                if (total > balance) {
                    callback(new Error(this.$t("send.amountWarn")));
                    return;
                }
                let decimals = 18;
                if (
                    BigNumber(input)
                        .modulo(BigNumber(0.1).pow(decimals))
                        .toNumber() !== 0
                ) {
                    callback(new Error(this.$t("send.amountWarnInvalid")));
                    return;
                }
                callback();
            };
            return {
                formData: {},
                form: {
                    amount: 0,
                    address: "",
                },
                balance: 0,
                fee: 0,
                rules: {
                    address: [{validator: validateAddr, trigger: "blur"}],
                    amount: [{validator: validateAmount, trigger: "blur"}]
                }
            };
        },
        async beforeMount() {
            await this.getAmount();
            await this.getFeeTransaction();

        },
        computed: {
            ...mapState("account", ["tokenMap"]),
            validateValue() {
                const {form, balance, fee} = this;
                if (form.address === "" || Number(form.amount) === 0 || Number(form.amount) > (Number(balance) + Number(fee))) {
                    return true;
                }
                if (form.address.length !== 40) {
                    return true;
                }
                return false;
            },
            ...mapGetters("account", {address: "currentAddress"})
        },
        methods: {
            onChangeAmount(value) {
                this.form.amount = formatAmountInput(value);
            },
            getFeeTransaction() {
                let wallet = getWallet();
                wallet = wallet ? JSON.parse(wallet) : null;
                if (wallet) {
                    const from = wallet.address;
                    getFee((fee, receiver) => {
                        if (fee && from !== receiver) {
                            this.fee = fee;
                        }
                    });
                }
            },
            toUpperCaseAddress(value) {
                this.form.address = value.toUpperCase();
            },
            setAmountAll() {
                this.form.amount = SDK.Utils.compare(this.fee, this.balance) === 1 ? 0 : SDK.Utils.subtraction(this.balance, this.fee) + "";
            },
            async getAmount() {
                let wallet = await getWallet();
                if (wallet) {
                    try {
                        wallet = JSON.parse(wallet);
                    } catch (e) {
                    }
                    getBalance(wallet.address, (balance => {
                        this.balance = balance;
                    }));
                }
            },
            onSubmit(e) {
                e.preventDefault();
                this.$refs["form"].validate(async valid => {
                    if (!valid) return false;
                    let wallet = await getWallet();
                    wallet = wallet ? JSON.parse(wallet) : null;
                    console.log("wallet", wallet);
                    if (!wallet) {
                        showNotifyError(this,"CANNOT FIND YOUR WALLET. PLEASE TRY AGAIN !");
                        return false;
                    }
                    if (this.form.address === wallet.address) {
                        showNotifyError(this,"CANNOT TRANSFER TO YOURSELF !");
                        return false;
                    }
                    sessionStorage.setItem("sendForm", JSON.stringify(this.form));
                    this.$router.push("/send/confirm");
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    .row-balance {
        a {
            cursor: pointer;
            float: right;
        }
    }
</style>

