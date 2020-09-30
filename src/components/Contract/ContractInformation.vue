<template xmlns="http://www.w3.org/1999/html">
    <div class="contractInfo">

        <el-dialog
                width="40%"
                :title="$t('contract.titleDialogButtonConfirmation').toUpperCase()"
                :visible.sync="showDialogConfirmPassword"
                class="dialog"
                :close-on-click-modal="false"
                center
        >
            <div class="row">
                <div class="row-title"> {{ $t('contract.balanceCurrent') }}</div>
                <div class="row-title">{{ balanceWallet+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('contract.amount') }}</div>
                <div class="row-title"> {{ currentAmount+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('send.fee') }}</div>
                <div class="row-title">{{ fee+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('contract.balanceRemain') }}</div>
                <div class="row-title"> {{balanceRemain+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('contract.password') }}</div>
                <el-input
                        v-model="password"
                        type="password"
                        clearable
                        :placeholder="$t('contract.password')"
                ></el-input>
            </div>
            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button @click="handleCancelConfirmPassword">{{$t('global.cancel')}}</el-button>
                <el-button
                        type="primary"
                        @click="onSubmitTransaction"
                >
                    {{$t('contract.sendTransaction')}}
                </el-button>
        </span>

        </el-dialog>

        <el-dialog
                width="50%"
                :title="isReplaceOwner ? $t('contract.titleReplaceOwner').toUpperCase():$t('contract.titleAddOwner').toUpperCase()"
                :visible.sync="showDialogAddOwner"
                class="dialog"
                :close-on-click-modal="false"
                top="30px"
        >
            <div class="row" v-if="isReplaceOwner">
                <div class="row-title"> {{ $t('contract.ownerName') }}</div>
                <el-input
                        v-model="ownerName"
                        :disabled="true"
                        :placeholder="$t('contract.ownerName')"

                ></el-input>
            </div>

            <div class="row">
                <div class="row-title"> {{ $t('contract.ownerAddress') }}</div>
                <el-input
                        v-model="ownerAddress"
                        :disabled="isReplaceOwner"
                        :maxlength="40"
                        :placeholder="$t('contract.ownerAddress')"
                ></el-input>
            </div>

            <div v-if="isReplaceOwner" class="row">
                <div class="row-title"> {{ $t('contract.newOwnerAddress') }}</div>
                <el-input
                        v-model="ownerAddressEdit"
                        :maxlength="40"
                        :placeholder="$t('contract.newOwnerAddress')"
                ></el-input>
            </div>

            <div class="row">
                <div class="row-title"> {{ $t('contract.password') }}</div>
                <el-input
                        v-model="password"
                        type="password"
                        clearable
                        :placeholder="$t('contract.password')"
                ></el-input>
            </div>

            <div class="row">
                <div class="row-title"> {{ $t('send.fee') }}: {{ fee }}</div>
            </div>

            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button @click="handleCancelAddOwner">{{$t('global.cancel')}}</el-button>
                <el-button
                        v-if="isReplaceOwner"
                        type="primary"
                        @click="onReplaceOwner "
                >
                    {{$t('contract.sendTransaction')}}
                </el-button>
                  <el-button
                          v-if="!isReplaceOwner"
                          type="primary"
                          @click="onAddOwner"
                  >
                    {{$t('contract.sendTransaction')}}
                </el-button>
        </span>

        </el-dialog>

        <el-dialog
                width="50%"
                :title="$t('contract.titleEditOwner').toUpperCase()"
                :visible.sync="showDialogEditOwner"
                class="dialog"
                :close-on-click-modal="false"
                top="30px"
        >

            <div class="row">
                <div class="row-title"> {{ $t('contract.ownerName') }}</div>
                <el-input
                        v-model="ownerNameEdit"
                        :maxlength="20"
                ></el-input>
            </div>

            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button @click="handleCancelEditOwner">{{$t('global.cancel')}}</el-button>
                <el-button type="primary" @click="onEditOwner">{{$t('global.ok')}}</el-button>
        </span>

        </el-dialog>

        <el-dialog
                width="50%"
                :title="$t('contract.removeOwner').toUpperCase()"
                :visible.sync="showDialogRemoveOwner"
                class="dialog"
                :close-on-click-modal="false"
                center
        >
            <div class="row">
                <div class="row-title"> {{ $t('contract.ownerName') }}</div>
                <el-input
                        v-model="ownerRemove.ownerName"
                        :disabled="true"

                ></el-input>
            </div>

            <div class="row">
                <div class="row-title"> {{ $t('contract.ownerAddress') }}</div>
                <el-input
                        v-model="ownerRemove.ownerAddress"
                        :disabled="true"
                ></el-input>
            </div>

            <div class="row">
                <div class="row-title"> {{ $t('contract.password') }}</div>
                <el-input
                        v-model="password"
                        type="password"
                        clearable
                        :placeholder="$t('contract.password')"
                ></el-input>
            </div>

            <div class="row">
                <div class="row-title"> {{ $t('send.fee') }}: {{ fee }}</div>
            </div>

            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button @click="handleCancelRemoveOwner">{{$t('global.cancel')}}</el-button>
                <el-button type="primary" @click="onRemoveOwner">{{$t('contract.sendTransaction')}}</el-button>
        </span>

        </el-dialog>

        <el-dialog
                width="40%"
                :title="$t('contract.titleDialogButtonConfirmation').toUpperCase()"
                :visible.sync="showDialogConfirm"
                class="dialog"
                :close-on-click-modal="false"
                center
        >
            <div class="row">
                <div class="row-title"> {{ $t('contract.balanceCurrent') }}</div>
                <div class="row-title">{{ balanceWallet+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('send.fee') }}</div>
                <div class="row-title">{{ fee+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('contract.balanceRemain') }}</div>
                <div class="row-title">{{ balanceRemain+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('contract.password') }}</div>
                <el-input
                        v-model="password"
                        type="password"
                        clearable
                        :placeholder="$t('contract.password')"
                ></el-input>
            </div>
            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button @click="handleCancelDialogConfirm">{{$t('global.cancel')}}</el-button>
                <el-button type="primary" @click="onConfirmTransaction">{{$t('contract.sendTransaction')}}</el-button>
        </span>

        </el-dialog>

        <el-dialog
                width="40%"
                :title="$t('contract.executeTransaction').toUpperCase()"
                :visible.sync="showDialogExecute"
                class="dialog"
                :close-on-click-modal="false"
                center
        >
            <div class="row">
                <div class="row-title"> {{ $t('contract.balanceCurrent') }}</div>
                <div class="row-title">{{ balanceWallet+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('contract.amount') }}</div>
                <div class="row-title"> {{ currentAmount+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('send.fee') }}</div>
                <div class="row-title">{{ fee+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('contract.balanceRemain') }}</div>
                <div class="row-title"> {{balanceRemain+" XEK" }}</div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('contract.password') }}</div>
                <el-input
                        v-model="password"
                        type="password"
                        clearable
                        :placeholder="$t('contract.password')"
                ></el-input>
            </div>
            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button @click="handleCancelDialogExecute">{{$t('global.cancel')}}</el-button>
                <el-button type="primary" @click="onExecuteTransaction">{{$t('contract.sendTransaction')}}</el-button>
        </span>
        </el-dialog>

        <el-dialog
                width="50%"
                :title="$t('contract.titleDialogSendTransaction').toUpperCase()"
                :visible.sync="showDialogSubmitTransaction"
                class="dialog"
                :close-on-click-modal="false"
                center
        >

            <div class="row">
                <div class="row-title"> {{ $t('contract.destination') }}</div>
                <el-input v-model="contractAddress" :disabled="true"/>
            </div>

            <div class="row">
                <div class="row-title"> {{ $t('contract.ownerName') }}</div>
                <el-input v-model="contractName" :disabled="true"/>
            </div>
            <div>
                <div class="titleParam">{{ $t('contract.parameter') }}</div>
                <div class="row">
                    <div class="row-title">{{ $t('contract.destination') }}</div>
                    <el-input v-model="destination" :maxlength="40"/>
                </div>

                <div class="row">
                    <div class="row-title">{{ $t('contract.value') }}</div>
                    <el-input v-model="valueParameter" min="0" type="number" clearable @input="onChangeValueParam"/>
                </div>
            </div>
            <div class="row">
                <div class="row-title"> {{ $t('send.fee') }}: {{ fee }}</div>
            </div>
            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button @click="handleCancelSubmit">{{$t('global.cancel')}}</el-button>
                <el-button type="primary"
                           @click="handleButtonSubmitDialog">{{$t('contract.sendTransaction')}}
                </el-button>
        </span>

        </el-dialog>

        <div class="titleWallet">
            <a class="title">{{contractName || ""}} {{balanceContract||0}} XEK</a>
            <a class="address"
               v-clipboard:copy="contractAddress"
               v-clipboard:success="onCopySuccess"
            >
                {{contractAddress || ""}}</a>
        </div>

        <div class="table-owner">
            <div class="title-owner">
                <a>{{$t('contract.titleOwner')}}</a>
                <div class="button">
                    <el-button type="primary" class="showMore" @click="onShowOwner">
                        <img alt="" :src="showMoreOwner ? iconArrowUp : iconArrowDown" type="primary"/>
                    </el-button>
                </div>
            </div>
            <div v-if="showMoreOwner">
                <div class="header">
                    <div class="name">{{$t('contract.ownerName')}}</div>
                    <div class="address">{{$t('contract.ownerAddress')}}</div>
                </div>

                <div v-for="(item, index) in listOwner" :key="index">
                    <div class="content">
                        <div class="name">
                            <span>{{item.ownerName}}</span>
                            <!--                            <div class="button" v-if="isOwnerContract">-->
                            <!--                                <el-button type="primary" class="buttonEdit"-->
                            <!--                                           @click="handleButtonEditOwner(index,item.ownerName)">-->
                            <!--                                    {{$t('contract.edit')}}-->
                            <!--                                </el-button>-->
                            <!--                                <el-button type="primary" class="buttonEdit"-->
                            <!--                                           @click="handleButtonReplaceOwner(index,item)">-->
                            <!--                                    {{$t('contract.replace')}}-->
                            <!--                                </el-button>-->
                            <!--                                <el-button type="primary" class="buttonRemove"-->
                            <!--                                           @click="handleButtonRemoveOwner(item)">-->
                            <!--                                    {{$t('contract.remove')}}-->
                            <!--                                </el-button>-->

                            <!--                            </div>-->
                        </div>
                        <div class="address">{{item.ownerAddress}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-transaction">
            <div class="title-owner">
                <a>{{$t('contract.titleMultiSign')}}</a>
                <div class="button">
                    <el-button
                            v-if="isOwnerContract"
                            type="primary"
                            @click="onShowDialogSubmit"
                    >
                        {{$t('contract.createTransactionContract')}}
                    </el-button>
                    <el-button type="primary" class="showMore" @click="onShowTransaction">
                        <img alt="" :src="showMoreTransaction ? iconArrowUp : iconArrowDown" type="primary"/>
                    </el-button>
                </div>
            </div>
            <div v-if="showMoreTransaction">
                <div class="header">
                    <div class="id">{{$t('contract.id')}}</div>
                    <div class="destination">{{$t('contract.destination')}}</div>
                    <div class="data">{{$t('contract.amount')}}</div>
                    <div class="confirmations">{{$t('contract.confirmations')}}</div>
                    <div class="executed">{{$t('contract.status')}}</div>
                </div>

                <div class="content" v-for="(item, index) in listTransaction" :key="index">
                    <div class="id" v-if="item">{{item && item.id +1 || "1"}}</div>
                    <div class="destination"
                         v-if="item"
                         v-clipboard:copy="item && item.destination && coverAddressWithoutPre(item.destination)"
                         v-clipboard:success="onCopySuccess"
                    >
                        <span>{{item && item.destination && coverAddressWithoutPre(item.destination)|| "" }}</span>
                    </div>
                    <div class="data" v-if="item">
                        <div v-if="item.data && item.data.params"
                             v-for=" (itemParam, indexParam) in item.data.params"
                             :key="indexParam">
                            <span v-if="!checkIsAddress(coverAddressWithoutPre(itemParam))">
                                {{getValueParam(item,itemParam)}}
                            </span>
                        </div>
                    </div>
                    <div class="confirmations" v-if="item">
                        <div
                                v-for="(itemConfirm, indexConfirm) in item.confirmations"
                                :key="indexConfirm"
                        >
                            <ul>
                                <li>
                                    {{(itemConfirm && getNameOwner(itemConfirm) || coverAddressWithoutPre(itemConfirm))
                                    +` (${indexConfirm+1}/${requireConfirmations})`
                                    }}
                                </li>
                            </ul>

                        </div>
                        <el-button
                                v-if="!item.executed && !checkConfirm(item.confirmations) && isOwnerContract"
                                type="primary"
                                class="button"
                                @click="handleButtonConfirm(item,checkConfirm(item.confirmations))"
                        >
                            {{$t('contract.confirm')}}
                        </el-button>
                        <!--                         <el-button-->
                        <!--                                v-if="!item.executed && isOwnerContract"-->
                        <!--                                type="primary"-->
                        <!--                                class="button"-->
                        <!--                                @click="handleButtonConfirm(item,checkConfirm(item.confirmations))"-->
                        <!--                        >-->
                        <!--                            {{checkConfirm(item.confirmations) ? $t('contract.revoke'): $t('contract.confirm')}}-->
                        <!--                        </el-button>-->
                        <!--                        -->
                    </div>
                    <div class="executed" v-if="item">
                        <span>{{item.executed ? $t('contract.finish') : $t('contract.process')}}</span>
                        <el-button
                                v-if="onCheckShowButtonExecuted(item.confirmations.length,item.executed) && isOwnerContract"
                                type="primary"
                                class="buttonExecute"
                                @click="handleButtonExecute(item)"
                        >
                            {{ $t('contract.executed')}}
                        </el-button>
                    </div>
                </div>

                <div style="text-align: center;margin-top: 30px;">
                    <el-pagination
                            background
                            :current-page.sync="currentPage"
                            layout="jumper, prev, pager, next, total"
                            :total="totalTransaction"
                            :page-size.sync="listTransaction.limit"
                            @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import iconArrowDown from "../../assets/ic_arrow_down.png";
    import iconArrowUp from "@/assets/ic_arrow_up.png";
    import abi from "../../assets/abi";
    import {
        addOwnerContract,
        checkIsAddress,
        confirmTransaction, executeTransaction,
        getBalance,
        getFee,
        getNumberTotalTransactionContract,
        removeOwnerContract,
        replaceOwnerContract,
        revokeTransaction,
        submitTransactionContract,
        toXek
    } from "../../utils/XekSDK";
    import {getWallet, setListContract} from "../../utils/Store";
    import {
        checkIsOwnerContract,
        coverAddressWithoutPre,
        DATA_EVENT_SOCKET, formatAmountInput,
        getContract,
        getOwnerWallet, hideLoading, showLoading,
        showNotifyError,
        showNotifySuccess,
    } from "../../utils/Constant";
    import {apiGetListTransactionContract, apiGetTransactionContract} from "../../api";
    import Socket from "../../utils/Socket";
    import SDK from 'xek-sdk';
    import BigNumber from "bignumber.js";

    export default {
        name: "ContractInformation",
        data() {
            return {
                iconArrowDown,
                iconArrowUp,
                showMoreOwner: true,
                showMoreTransaction: true,
                contractName: "",
                balanceWallet: "",
                balanceContract: 0,
                currentAmount: 0,
                fee: "",
                contractAddress: "",
                ownerName: "",
                ownerAddress: "",
                listOwner: "",
                requireConfirmations: 0,
                ownerNameEdit: "",
                ownerRemove: "",
                ownerAddressEdit: "",
                ownerIndexEdit: "",
                titleDialogConfirm: "",
                showDialogAddOwner: false,
                showDialogConfirm: false,
                showDialogExecute: false,
                showDialogRemoveOwner: false,
                showDialogConfirmPassword: false,
                showDialogEditOwner: false,
                showDialogSubmitTransaction: false,
                isReplaceOwner: false,
                destination: "",
                method: "submitTransaction",
                abi: abi.abi,
                valueParameter: "",
                arrayConfirm: [],
                password: "",
                totalTransaction: 0,
                walletAddress: '',
                listTransaction: [],
                itemConfirm: "",
                currentPage: 1,
                isOwnerContract: false,
                balanceRemain: "",
                typeConfirm: ""
            };
        },
        async beforeMount() {
            try {
                let data = this.$route.params.data;
                data = data ? JSON.parse(data) : null;
                if (data) {
                    await this.init(data);
                    this.initialSocket(data);
                }
                await this.getAmount();
                await this.getFeeTransaction();
                // console.log("before mount ContractInformation", data);
            } catch (e) {
                console.log(e);
            }
        },
        methods: {
            onChangeValueParam(value) {
                this.valueParameter = formatAmountInput(value);
            },
            async init(contractAddress) {
                this.contractAddress = contractAddress;
                const dataContract = await this.getContractExist(contractAddress);
                this.contractName = dataContract.contractName;
                this.requireConfirmations = dataContract.requireConfirmations;
                this.listOwner = this.covertListOwners(dataContract.listOwner);
                this.isOwnerContract = await checkIsOwnerContract(dataContract);
                await this.getTotalTransactionContract(contractAddress);
                await this.getListTransaction(contractAddress, this.currentPage);
                await this.getBalanceContract(contractAddress);
            },
            coverAddressWithoutPre(address) {
                return coverAddressWithoutPre(address);
            },
            onCopySuccess() {
                showNotifySuccess(this, this.$t("main.copy"));
            },
            onShowOwner() {
                this.showMoreOwner = !this.showMoreOwner;
            },
            onCheckShowButtonExecuted(lengthConfirm, executed) {
                const {requireConfirmations} = this;
                return (Number(lengthConfirm) >= Number(requireConfirmations) && !executed);
            },
            async onConfirmTransaction() {
                this.showDialogConfirm = false;
                const {itemConfirm, arrayConfirm, password, contractAddress, listTransaction, walletAddress, fee, balanceWallet} = this;
                if (!password) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.password")}));
                    return false;
                }
                if (Number(fee) > Number(balanceWallet)) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("send.amountWarn")}));
                    return false;
                }
                // console.log("itemConfirm", itemConfirm);
                let indexTransaction = listTransaction.findIndex(a => a.id === itemConfirm.id);
                let itemTransaction = listTransaction[indexTransaction];
                const loading = showLoading(this);
                let ownerWallet = await getOwnerWallet(password);
                if (ownerWallet) {
                    const indexConfirmTransaction = arrayConfirm.findIndex(a => a === itemConfirm.id);
                    // if (indexConfirmTransaction === -1) {
                    // Handle Confirm
                    let resultConfirm = await confirmTransaction(itemConfirm.id, contractAddress, ownerWallet.address, ownerWallet.privateKey);
                    if (resultConfirm && resultConfirm.success) {
                        let newArrayConfirmTransaction = itemTransaction.confirmations;
                        const indexExists = newArrayConfirmTransaction.findIndex(a => coverAddressWithoutPre(a) === coverAddressWithoutPre(walletAddress));
                        if (indexExists === -1) {
                            newArrayConfirmTransaction = [...newArrayConfirmTransaction, walletAddress];
                        }
                        itemTransaction.confirmations = newArrayConfirmTransaction;
                        this.arrayConfirm = [...arrayConfirm, itemConfirm.id];
                        this.listTransaction = [...this.listTransaction.slice(0, indexTransaction), itemTransaction, ...this.listTransaction.slice(indexTransaction + 1)];
                        this.handleSuccess("Submit Confirm Transaction Success");
                    } else {
                        this.handleError("Error Confirm Transaction");
                    }
                    // } else {
                    //     // Handle Revoke
                    //     let resultRevoke = await revokeTransaction(itemConfirm.id, contractAddress, ownerWallet.address, ownerWallet.privateKey);
                    //     // console.log("resultRevoke", resultRevoke);
                    //     if (resultRevoke && resultRevoke.success) {
                    //         let newArrayConfirmTransaction = itemTransaction.confirmations;
                    //         newArrayConfirmTransaction = newArrayConfirmTransaction.filter(address => address.toUpperCase() !== walletAddress);
                    //         itemTransaction.confirmations = newArrayConfirmTransaction;
                    //         this.arrayConfirm = [...this.arrayConfirm.slice(0, indexConfirmTransaction), ...this.arrayConfirm.slice(indexConfirmTransaction + 1)];
                    //         this.listTransaction = [...this.listTransaction.slice(0, indexTransaction), itemTransaction, ...this.listTransaction.slice(indexTransaction + 1)];
                    //         this.handleSuccess("Submit Revoke Transaction Success");
                    //     } else {
                    //         this.handleError("Error Revoke Transaction");
                    //     }
                    // }
                } else {
                    this.handleError("PASSWORD INCORRECT");
                }
                hideLoading(loading);
                this.handleCancelDialogConfirm();
            },
            onShowTransaction() {
                this.showMoreTransaction = !this.showMoreTransaction;
            },
            onShowDialogSubmit() {
                this.showDialogSubmitTransaction = true;
            },
            async onAddOwner() {
                const {password, ownerAddress, listOwner, contractAddress, fee, balanceWallet} = this;
                if (!password) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.password")}));
                    return false;
                }
                if (!ownerAddress) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.ownerAddress")}));
                    return false;
                }
                if (!checkIsAddress(ownerAddress)) {
                    showNotifyError(this, this.$t("contract.errorFormatAddOwner"));
                    return false;
                }
                if (listOwner && listOwner.findIndex(item => coverAddressWithoutPre(item.ownerAddress) === coverAddressWithoutPre(ownerAddress)) !== -1) {
                    showNotifyError(this, this.$t("contract.errorAddOwner"));
                    return false;
                }
                if (Number(fee) > Number(balanceWallet)) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("send.amountWarn")}));
                    return false;
                }
                const loading = showLoading(this);
                let ownerWallet = await getOwnerWallet(password);
                if (ownerWallet) {
                    let result = await addOwnerContract(ownerAddress, contractAddress, ownerWallet.address, ownerWallet.privateKey);
                    // console.log("result add owner", result);
                    if (result && result.success) {
                        this.handleSuccess("Submit Add Owner Success!");
                    } else {
                        this.handleError("Add Owner Failed!");
                    }
                } else {
                    this.handleError("PASSWORD INCORRECT");
                }
                hideLoading(loading);
                this.handleCancelAddOwner();
            },
            async onEditOwner() {
                const {ownerNameEdit, ownerIndexEdit, listOwner} = this;
                if (!this.ownerNameEdit && ownerIndexEdit === -1) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.ownerName")}));
                } else {
                    for (let i in listOwner) {
                        if (ownerNameEdit.toLowerCase() === listOwner[i].ownerName.toLowerCase()) {
                            showNotifyError(this, this.$t("contract.ownerNameWarn"));
                            return false;
                        }
                    }
                    listOwner[ownerIndexEdit].ownerName = ownerNameEdit;
                    await this.onUpdateOwnersContract(listOwner);
                }
                this.handleCancelEditOwner();
            },
            async onReplaceOwner() {
                const {ownerAddress, ownerAddressEdit, password, contractAddress, listOwner, fee, balanceWallet} = this;
                if (Number(fee) > Number(balanceWallet)) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("send.amountWarn")}));
                    return false;
                }
                if (!ownerAddressEdit) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.newOwnerAddress")}));
                    return false;
                }
                if (!password) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.password")}));
                    return false;
                }
                if (!checkIsAddress(ownerAddressEdit)) {
                    showNotifyError(this, this.$t("contract.errorFormatAddOwner"));
                    return false;
                }
                if (ownerAddressEdit && ownerAddress) {
                    if (ownerAddress.toLowerCase() === ownerAddressEdit.toLowerCase()) {
                        this.handleError("Owner Address is exists in contract!");
                        this.handleCancelAddOwner();
                        return false;
                    }
                    if (listOwner.findIndex(a => coverAddressWithoutPre(a.ownerAddress) === coverAddressWithoutPre(ownerAddressEdit)) !== -1) {
                        this.handleError("Owner Address is exists in contract!");
                        this.handleCancelAddOwner();
                        return false;
                    }
                    const loading = showLoading(this);
                    const ownerWallet = await getOwnerWallet(password);
                    if (ownerWallet) {
                        const result = await replaceOwnerContract(ownerAddress, ownerAddressEdit, contractAddress, ownerWallet.address, ownerWallet.privateKey);
                        // console.log("result replace owner", result);
                        if (result && result.success) {
                            this.handleSuccess("Submit replace owner success!");
                        } else {
                            this.handleError("REPLACE OWNER FAILED!");
                        }

                    } else {
                        this.handleError("PASSWORD INCORRECT!");
                    }
                    hideLoading(loading);
                }
                this.handleCancelAddOwner();
            },
            async onRemoveOwner() {
                const {ownerRemove, contractAddress, password, fee, balanceWallet} = this;
                if (!password) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.password")}));
                    return false;
                }
                if (ownerRemove) {
                    const ownerWallet = await getOwnerWallet(password);
                    if (ownerWallet) {
                        if (Number(fee) > Number(balanceWallet)) {
                            showNotifyError(this, this.$t("global.required", {name: this.$t("send.amountWarn")}));
                            return false;
                        }
                        const loading = showLoading(this, loading);
                        let result = await removeOwnerContract(ownerRemove.ownerAddress, contractAddress, ownerWallet.address, ownerWallet.privateKey);
                        // console.log("result remove owner", result);
                        if (result && result.success) {
                            this.handleSuccess("Submit remove owner success!");
                        } else {
                            this.handleError("REMOVE OWNER FAILED!");
                        }
                        hideLoading(loading);
                    } else {
                        this.handleError("PASSWORD INCORRECT!");
                    }
                }
                this.handleCancelRemoveOwner();
            },
            async onSubmit() {
                const {destination, valueParameter, contractAddress, password} = this;
                const loading = showLoading(this);
                let ownerWallet = await getOwnerWallet(password);
                if (ownerWallet) {
                    submitTransactionContract(destination, SDK.Utils.fromXek(valueParameter), contractAddress, ownerWallet.address, ownerWallet.privateKey)
                        .then(result => {
                            // console.log("result submit transaction", result);
                            if (result && result.success) {
                                this.handleSuccess("Submit Transaction Success!");
                            } else {
                                this.handleError("Submit Transaction Failed!");
                            }
                            hideLoading(loading);
                        }).catch(err => {
                        hideLoading(loading);
                        console.log("error submit", err);
                        this.handleError("Submit Transaction Failed!");
                    });
                } else {
                    hideLoading(loading);
                    this.handleError("PASSWORD INCORRECT");
                }
                this.handleCancelSubmit();
            },
            async onExecuteTransaction() {
                const {itemExecute, password, contractAddress, fee, balanceWallet} = this;
                if (!password) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.password")}));
                    return false;
                }
                if (Number(fee) > Number(balanceWallet)) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("send.amountWarn")}));
                    return false;
                }
                const loading = showLoading(this);
                const ownerWallet = await getOwnerWallet(password);
                if (ownerWallet) {
                    const resultExecute = await executeTransaction(itemExecute.id, contractAddress, ownerWallet.address, ownerWallet.privateKey);
                    if (resultExecute && resultExecute.success) {
                        showNotifySuccess(this, "Submit Execute transaction success!");
                    } else {
                        showNotifyError(this, "Execute transaction failed!");
                    }
                } else {
                    showNotifyError(this, "PASSWORD INCORRECT!");
                    hideLoading(loading);
                    return false;
                }
                hideLoading(loading);
                this.handleCancelDialogExecute();
            },
            async onUpdateOwnersContract(listOwner) {
                let listContract = await getContract();
                if (listContract) {
                    let indexContract = listContract.findIndex(item => item.contractAddress = this.contractAddress);
                    if (indexContract !== -1) {
                        listContract[indexContract].listOwner = listOwner;
                        this.listOwner = listOwner;
                        await setListContract(listContract);
                    }
                }
            },
            onUpdateBalanceContract() {
                getBalance(this.contractAddress, (async balance => {
                        this.balanceContract = balance;
                        let listContract = await getContract();
                        if (listContract) {
                            let indexContract = listContract.findIndex(a => a.contractAddress === this.contractAddress);
                            let itemContract = listContract[indexContract];
                            if (indexContract !== -1) {
                                itemContract.balance = balance;
                                listContract[indexContract] = itemContract;
                                setListContract(listContract);
                            }
                        }
                    })
                );
            },
            getValueParam(item, itemParam) {
                return checkIsAddress(coverAddressWithoutPre(itemParam))
                    ? coverAddressWithoutPre(itemParam)
                    : item.data && item.data.name && item.data.name.toLowerCase() === "send to"
                        ? toXek(itemParam) : itemParam;
            },
            async getContractExist(contractAddress) {
                let listContract = await getContract();
                if (listContract) {
                    let indexContract = listContract.findIndex(item => item.contractAddress === contractAddress);
                    if (indexContract !== -1) {
                        return listContract[indexContract];
                    }
                }
            },
            async getTotalTransactionContract(contractAddress) {
                let ownerWallet = await getWallet();
                if (ownerWallet) {
                    ownerWallet = JSON.parse(ownerWallet);
                    let totalTransaction = await getNumberTotalTransactionContract(contractAddress, ownerWallet.address);
                    this.totalTransaction = totalTransaction && Number(totalTransaction) || 0;
                }
            },
            getBalanceContract(contractAddress) {
                getBalance(contractAddress, (balance => {
                        this.balanceContract = balance;
                    })
                );
            },
            async getAmount() {
                let wallet = await getWallet();
                if (wallet) {
                    try {
                        wallet = JSON.parse(wallet);
                    } catch (e) {
                    }
                    getBalance(wallet.address, (balance => {
                        this.balanceWallet = balance;
                    }));
                    this.walletAddress = wallet.address;
                }
            },
            async getListTransaction(contractAddress, page) {
                let listTransaction = await apiGetListTransactionContract(contractAddress, page);
                if (listTransaction && listTransaction.data) {
                    listTransaction = listTransaction.data;
                    let arrayCheck = [];
                    let wallet = await getWallet();
                    wallet = wallet ? JSON.parse(wallet) : null;
                    if (wallet) {
                        for (let index in listTransaction) {
                            let confirmations = listTransaction[index].confirmations;
                            let id = listTransaction[index].id;
                            if (confirmations && confirmations.findIndex(address => coverAddressWithoutPre(address) === wallet.address) !== -1) {
                                arrayCheck = [...arrayCheck, id];
                            }
                            for (let j in confirmations) {
                                confirmations[j] = coverAddressWithoutPre(confirmations[j]);
                            }
                        }
                    }
                    if (arrayCheck && arrayCheck.length > 0) {
                        this.arrayConfirm = arrayCheck;
                    }
                    console.log({listTransaction});
                    this.listTransaction = listTransaction;
                }
            },
            async getFeeTransaction() {
                let wallet = await getWallet();
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
            checkConfirm(listConfirm) {
                const {walletAddress} = this;
                if (listConfirm && listConfirm.length > 0) {
                    return listConfirm.findIndex(a => coverAddressWithoutPre(a).toLowerCase() === coverAddressWithoutPre(walletAddress).toLowerCase()) !== -1;
                }
                return false;
            },
            getNameOwner(addressOwner) {
                if (addressOwner) {
                    let address = coverAddressWithoutPre(addressOwner);
                    const {listOwner} = this;
                    if (listOwner && listOwner.length > 0) {
                        const owner = listOwner.find(a => a.ownerAddress.toUpperCase() === address);
                        if (owner) {
                            return owner.ownerName || address;
                        }
                    }
                    return address;
                }
                return "";
            },
            covertListOwners(listOwners) {
                let result = [];
                if (listOwners && listOwners.length > 0) {
                    for (let i in listOwners) {
                        let itemOwner = listOwners[i];
                        itemOwner.ownerAddress = coverAddressWithoutPre(itemOwner.ownerAddress);
                        result = [...result, itemOwner];
                    }
                }
                return result;
            },
            handlePageChange(page) {
                this.currentPage = page;
                this.getListTransaction(this.contractAddress, page);
            },
            handleCancelSubmit() {
                this.showDialogSubmitTransaction = false;
                this.destination = "";
                this.valueParameter = "";
                this.password = "";
            },
            handleCancelDialogConfirm() {
                this.showDialogConfirm = false;
                this.password = "";
                this.balanceRemain = "";
            },
            handleCancelDialogExecute() {
                this.showDialogExecute = false;
                this.password = "";
            },
            handleCancelEditOwner() {
                this.showDialogEditOwner = false;
                this.ownerNameEdit = "";
                this.ownerIndexEdit = "";
            },
            handleButtonRemoveOwner(item) {
                this.showDialogRemoveOwner = true;
                this.ownerRemove = item;
            },
            handleCancelRemoveOwner() {
                this.showDialogRemoveOwner = false;
                this.ownerRemove = "";
                this.password = "";
            },
            handleButtonEditOwner(indexOwner, ownerName) {
                this.ownerNameEdit = ownerName;
                this.ownerIndexEdit = indexOwner;
                this.showDialogEditOwner = true;
            },
            handleButtonReplaceOwner(index, item) {
                this.showDialogAddOwner = true;
                this.ownerName = item.ownerName;
                this.ownerAddress = item.ownerAddress;
                this.ownerIndexEdit = index;
                this.isReplaceOwner = true;
            },
            handleButtonAddOwner() {
                this.showDialogAddOwner = true;
                this.ownerName = "";
                this.ownerAddress = "";
                this.isReplaceOwner = false;
            },
            handleButtonSubmitDialog() {
                const {destination, valueParameter, fee, balanceWallet, contractAddress} = this;
                const total = Number(valueParameter) + Number(fee);
                if (!destination || !valueParameter) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.parameter")}));
                    return false;
                }
                if (!checkIsAddress(destination)) {
                    showNotifyError(this, this.$t("contract.errorFormatAddOwner"));
                    return false;
                }
                if (destination.toLowerCase() === contractAddress.toLowerCase()) {
                    showNotifyError(this, "CANNOT TRANSFER TO YOURSELF !");
                    return false;
                }
                if (Number(valueParameter) === 0) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.value")}));
                    return false;
                }
                if (Number(valueParameter) < 0) {
                    showNotifyError(this, this.$t("send.amountWarnPositive"));
                    return false;
                }
                if (total > Number(balanceWallet)) {
                    showNotifyError(this, this.$t("send.amountWarn"));
                    return false;
                }
                this.showDialogConfirmPassword = true;
                this.currentAmount = valueParameter;
                this.balanceRemain = SDK.Utils.subtraction(SDK.Utils.subtraction(this.balanceWallet, this.fee), valueParameter);
            },
            onSubmitTransaction() {
                const {typeConfirm, password} = this;
                if (!password) {
                    showNotifyError(this, this.$t("global.required", {name: this.$t("contract.password")}));
                    return false;
                }
                this.onSubmit();
                this.handleCancelConfirmPassword();
            },
            handleCancelConfirmPassword() {
                this.balanceRemain = "";
                this.password = "";
                this.typeConfirm = "";
                this.currentAmount = 0;
                this.showDialogConfirmPassword = false;
            },
            handleCancelAddOwner() {
                this.showDialogAddOwner = false;
                this.ownerAddressEdit = "";
                this.ownerIndexEdit = "";
                this.ownerName = "";
                this.ownerAddress = "";
                this.password = "";
                this.isReplaceOwner = false;
            },
            handleButtonConfirm(item, isConfirm) {
                this.titleDialogConfirm = isConfirm ? this.$t('contract.titleDialogButtonRevoke') : this.$t('contract.titleDialogButtonConfirmation');
                this.itemConfirm = item;
                this.balanceRemain = SDK.Utils.subtraction(this.balanceWallet, this.fee);
                this.showDialogConfirm = true;
            },
            handleButtonExecute(itemExecute) {
                this.showDialogExecute = true;
                this.itemExecute = itemExecute;

            },
            handleError(err) {
                console.log("error", err);
                this.$notify.error({
                    title: "Error",
                    message: err
                });
            },
            handleSuccess(title) {
                this.$notify({
                    title: "Success",
                    message: title,
                    type: "success"
                });
            },
            checkEventReplaceOwner(dataEvent) {
                let number = 0;
                for (let i in dataEvent) {
                    if (dataEvent[i].name === DATA_EVENT_SOCKET.OWNER_ADDITION || dataEvent[i].name === DATA_EVENT_SOCKET.OWNER_REMOVAL) {
                        number += 1;
                    }
                }
                return number === 2;
            },
            checkIsAddress(number) {
                return checkIsAddress(number);
            },
            toXek(number) {
                return toXek(number);
            },
            initialSocket(contractAddress) {
                Socket.on(contractAddress, (data) => {
                    console.log("data socket", data);
                    if (data && data.length > 0) {
                        if (this.checkEventReplaceOwner(data)) {
                            this.handleDataReplaceOwner(data);
                        } else {
                            for (let index in data) {
                                let itemEvent = data[index];
                                if (itemEvent) {
                                    switch (itemEvent.name) {
                                        case DATA_EVENT_SOCKET.SUBMISSION:
                                            this.handleDataSubmission(itemEvent);
                                            break;
                                        case DATA_EVENT_SOCKET.REVOCATION:
                                            this.handleDataRevocation(itemEvent.data);
                                            break;
                                        case DATA_EVENT_SOCKET.CONFIRMATION:
                                            this.handleDataConfirmation(itemEvent.data);
                                            break;
                                        case DATA_EVENT_SOCKET.EXECUTION:
                                            this.handleDataExecute(itemEvent);
                                            break;
                                        case DATA_EVENT_SOCKET.EXECUTION_FAILURE:
                                            console.log("Failed execution", itemEvent);
                                            this.handleDataExecuteTransactionFailed(itemEvent);
                                            break;
                                        case DATA_EVENT_SOCKET.OWNER_REMOVAL:
                                            this.handleDataRemoveOwner(itemEvent);
                                            break;
                                        case DATA_EVENT_SOCKET.OWNER_ADDITION:
                                            this.handleDataAddOwner(itemEvent);
                                            break;
                                        case DATA_EVENT_SOCKET.REQUIREMENT_CHANGE:
                                            this.handleDataRequirementChange(itemEvent);
                                            break;
                                    }
                                }
                            }
                        }
                    }
                });
            },

            handleDataExecuteTransactionFailed(itemEvent) {
                const transactionId = itemEvent && itemEvent.data && itemEvent.data.transactionId;
                if (transactionId) {
                    showNotifyError(this, "Transaction with id " + (Number(transactionId) + 1) + " execute failed!");
                }
            },

            async handleDataRequirementChange(itemEvent) {
                // console.log("itemEvent", itemEvent);
                const required = itemEvent && itemEvent.data && itemEvent.data.required;
                if (required) {
                    let listContract = await getContract();
                    if (listContract) {
                        let indexContract = listContract.findIndex(a => a.contractAddress === this.contractAddress);
                        let itemContract = listContract[indexContract];
                        if (indexContract !== -1) {
                            itemContract.requireConfirmations = required;
                            listContract[indexContract] = itemContract;
                            this.listContract = listContract;
                            setListContract(listContract);
                        }
                    }
                }
            },

            handleDataReplaceOwner(data) {
                const itemEventRemove = data.find(a => a.name === DATA_EVENT_SOCKET.OWNER_REMOVAL);
                const itemEventAddition = data.find(a => a.name === DATA_EVENT_SOCKET.OWNER_ADDITION);
                const ownerRemove = itemEventRemove && itemEventRemove.data && itemEventRemove.data.owner && coverAddressWithoutPre(itemEventRemove.data.owner);
                const ownerAddition = itemEventAddition && itemEventAddition.data && itemEventAddition.data.owner && coverAddressWithoutPre(itemEventAddition.data.owner);
                if (ownerRemove && ownerAddition) {
                    const {listOwner} = this;
                    let newListOwner = [];
                    let nameOwner = "Owner" + Number(listOwner.length + 1);
                    const indexOwnerRemove = listOwner.findIndex(a => coverAddressWithoutPre(a.ownerAddress) === ownerRemove);
                    if (indexOwnerRemove !== -1) {
                        nameOwner = listOwner[indexOwnerRemove].ownerName;
                        newListOwner = [...listOwner.slice(0, indexOwnerRemove), ...listOwner.slice(indexOwnerRemove + 1)];
                    }
                    newListOwner = [...newListOwner, {
                        ownerName: nameOwner,
                        ownerAddress: ownerAddition
                    }];
                    this.onUpdateOwnersContract(newListOwner);
                }
            },
            handleDataRemoveOwner(itemEvent) {
                const ownerRemove = itemEvent && itemEvent.data && itemEvent.data.owner && coverAddressWithoutPre(itemEvent.data.owner);
                if (ownerRemove) {
                    const {listOwner} = this;
                    const indexOwnerRemove = listOwner.findIndex(a => coverAddressWithoutPre(a.ownerAddress) === ownerRemove);
                    if (indexOwnerRemove !== -1) {
                        this.onUpdateOwnersContract([...listOwner.slice(0, indexOwnerRemove), ...listOwner.slice(indexOwnerRemove + 1)]);
                    }
                }
            },
            handleDataAddOwner(itemEvent) {
                const ownerAddition = itemEvent && itemEvent.data && itemEvent.data.owner && coverAddressWithoutPre(itemEvent.data.owner);
                if (ownerAddition) {
                    const {listOwner} = this;
                    this.onUpdateOwnersContract([...listOwner, {
                        ownerName: "Owner" + Number(listOwner.length + 1),
                        ownerAddress: ownerAddition
                    }]);
                }
            },
            handleDataExecute(itemEvent) {
                const {listTransaction} = this;
                // console.log("event execution success", itemEvent);
                const transactionID = itemEvent.data && itemEvent.data.transactionId;
                let indexTransactionUpdate = listTransaction.findIndex(item => Number(item.id) === Number(transactionID));
                let itemTransactionUpdate = listTransaction[indexTransactionUpdate];
                if (itemTransactionUpdate) {
                    itemTransactionUpdate.executed = true;
                    this.listTransaction = [...this.listTransaction.slice(0, indexTransactionUpdate), itemTransactionUpdate, ...this.listTransaction.slice(indexTransactionUpdate + 1)];
                    if (itemTransactionUpdate.data && itemTransactionUpdate.data.name === "Send To") {
                        setTimeout(() => this.onUpdateBalanceContract(), 1000);
                    }
                }
            },
            handleDataConfirmation(itemEvent) {
                const {listTransaction} = this;
                const transactionId = itemEvent.transactionId;
                const sender = itemEvent.sender && coverAddressWithoutPre(itemEvent.sender);
                let indexTransactionUpdate = listTransaction.findIndex(item => Number(item.id) === Number(transactionId));
                let itemTransactionUpdate = listTransaction[indexTransactionUpdate];
                // console.log("itemEvent", itemEvent);
                if (itemTransactionUpdate) {
                    const indexExists = itemTransactionUpdate.confirmations.findIndex(a => coverAddressWithoutPre(a) === sender);
                    if (indexExists === -1) {
                        itemTransactionUpdate.confirmations = [...itemTransactionUpdate.confirmations, sender];
                        this.listTransaction = [...this.listTransaction.slice(0, indexTransactionUpdate), itemTransactionUpdate, ...this.listTransaction.slice(indexTransactionUpdate + 1)];
                    }
                }
            },
            handleDataRevocation(itemEvent) {
                const {listTransaction} = this;
                const transactionId = itemEvent.transactionId;
                const sender = itemEvent.sender && coverAddressWithoutPre(itemEvent.sender);
                let indexTransactionUpdate = listTransaction.findIndex(item => Number(item.id) === Number(transactionId));
                let itemTransactionUpdate = listTransaction[indexTransactionUpdate];
                // console.log("itemEvent", itemEvent);
                if (itemTransactionUpdate) {
                    itemTransactionUpdate.confirmations = itemTransactionUpdate.confirmations.filter(owner => owner !== sender);
                    this.listTransaction = [...this.listTransaction.slice(0, indexTransactionUpdate), itemTransactionUpdate, ...this.listTransaction.slice(indexTransactionUpdate + 1)];
                }
            },
            async handleDataSubmission(itemEvent) {
                const {contractAddress, listTransaction, currentPage} = this;
                if (Number(currentPage) === 1) {
                    let transactionID = itemEvent.data && itemEvent.data.transactionId;
                    let detailTransaction = await apiGetTransactionContract(contractAddress, transactionID);
                    // console.log("detailTransaction", detailTransaction);
                    if (detailTransaction && detailTransaction.data) {
                        this.listTransaction = [detailTransaction.data, ...listTransaction];
                    }
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .contractInfo {
        flex: 1;

        .titleParam {
            color: black;
            font-size: 19px;
            margin-bottom: 12px;
        }

        .titleWallet {
            display: flex;
            flex-direction: column;

            .title {
                font-size: 40px;
            }

            .address {
                font-size: 17px;
                color: #c1d1dc;
            }
        }

        .table-owner {
            margin-top: 3%;

            .title-owner {
                height: 55px;
                display: flex;
                align-items: center;
                padding-left: 7px;
                border-width: 1px;
                border-color: #e4e1e1;
                border-style: solid;
                background-color: rgba(255, 255, 255, 0.2);
                position: relative;

                a {
                    color: white;
                    font-size: 20px;
                }

                .button {
                    position: absolute;
                    right: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;

                    .showMore {
                        padding: 5% 12% 5% 12%;
                    }
                }
            }

            .header {
                display: flex;
                flex-direction: row;
                height: 35px;
                align-items: center;
                border-color: #e4e1e1;
                border-width: 0 0 1px 1px;
                border-style: solid;

                .name {
                    flex: 3;
                }

                .address {
                    flex: 4;
                }

                div {
                    color: #e4e1e1;
                    border-right-color: #e4e1e1;
                    border-right-style: solid;
                    border-right-width: 1px;
                    height: 100%;
                    margin-left: 5px;
                    align-items: center;
                    display: flex;
                    font-weight: bold;
                }
            }

            .content {
                display: flex;
                flex-direction: row;
                height: 45px;
                align-items: center;
                border-color: #e4e1e1;
                border-width: 0 0 1px 1px;
                border-style: solid;

                .name {
                    flex: 3;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;

                    span {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        max-width: 390px;
                        /*max-width: 150px;*/
                        display: inline-block;
                        font-size: 20px;
                    }

                    .button {
                        right: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: bold;
                        position: absolute;
                        border-width: 0;
                        height: 70%;

                        .buttonEdit {
                            background-color: rgba(255, 255, 255, 0.2);
                            text-align: center;
                            padding: 10px;
                        }

                        .buttonRemove {
                            background-color: #d9534f;
                            text-align: center;
                            padding: 10px;
                        }
                    }
                }

                .address {
                    flex: 4;
                }

                div {
                    color: #e4e1e1;
                    border-right-color: #e4e1e1;
                    border-right-style: solid;
                    border-right-width: 1px;
                    height: 100%;
                    margin-left: 5px;
                    align-items: center;
                    display: flex;
                    font-size: 17px;
                }
            }

        }

        .table-transaction {
            margin-top: 3%;

            .title-owner {
                height: 55px;
                display: flex;
                align-items: center;
                padding-left: 7px;
                border-width: 1px;
                border-color: #e4e1e1;
                border-style: solid;
                background-color: rgba(255, 255, 255, 0.2);
                position: relative;

                a {
                    color: white;
                    font-size: 20px;
                }

                .button {
                    position: absolute;
                    right: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;

                    .showMore {
                        padding: 5px;
                    }
                }
            }

            .header {
                display: flex;
                flex-direction: row;
                height: 35px;
                align-items: center;
                border-color: #e4e1e1;
                border-width: 0 0 1px 1px;
                border-style: solid;

                .id {
                    flex: 1;
                }

                .destination {
                    flex: 10;
                }

                .data {
                    flex: 3
                }

                .confirmations {
                    flex: 4
                }

                .executed {
                    flex: 2
                }


                div {
                    color: #e4e1e1;
                    border-right-color: #e4e1e1;
                    border-right-style: solid;
                    border-right-width: 1px;
                    height: 100%;
                    margin-left: 5px;
                    align-items: center;
                    display: flex;
                    font-weight: bold;
                }
            }

            .content {
                display: flex;
                flex-direction: row;
                height: auto;
                border-color: #e4e1e1;
                border-width: 0 0 1px 1px;
                border-style: solid;
                padding: 0;

                .id {
                    flex: 1;
                }

                .destination {
                    flex: 10;

                    span {
                        word-break: break-all;

                    }
                }

                .data {
                    flex: 3;
                    position: relative;
                    flex-direction: column;
                    align-items: flex-start;
                    padding-bottom: 5px;
                    padding-top: 5px;
                    justify-content: center;

                    span {
                        word-break: break-word;
                    }

                    .bold {
                        font-weight: bold;
                    }

                    .margin-bottom {
                        margin-bottom: 10px;
                    }

                    ul, li {
                        list-style-type: disc;
                        word-break: break-word;
                        align-self: flex-start;
                        margin-top: 3px;
                        padding-left: 12px;

                        li {
                            padding-left: 0;
                        }
                    }

                    div {
                        border-right-style: none;
                        justify-content: flex-start;
                        display: flex;
                    }
                }

                .confirmations {
                    flex: 4;
                    position: relative;
                    flex-direction: column;
                    justify-content: center;

                    .button {
                        font-size: 15px;
                        padding: 5px;
                        background-color: rgba(255, 255, 255, 0.2);
                        align-self: flex-start;
                        margin-bottom: 5px;
                        margin-top: 5px;
                    }

                    span {
                        word-break: break-word;
                        align-self: flex-start;
                        margin-top: 3px;
                    }

                    ul, li {
                        list-style-type: disc;
                        word-break: break-word;
                        align-self: flex-start;
                        margin-top: 3px;
                        padding-left: 12px;

                        li {
                            padding-left: 0;
                        }
                    }

                    div {
                        border-width: 0;
                        width: 100%;
                    }
                }

                .executed {
                    flex: 2;
                    position: relative;
                    justify-content: center;
                    align-items: flex-start;
                    flex-direction: column;

                    .buttonExecute {
                        font-size: 15px;
                        padding: 5px;
                        margin-top: 5px;
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                }

                div {
                    color: #e4e1e1;
                    border-right-color: #e4e1e1;
                    border-right-style: solid;
                    border-right-width: 1px;
                    margin-left: 5px;
                    align-items: center;
                    display: flex;
                    font-size: 17px;
                    padding-top: 0;
                    padding-bottom: 0;
                }
            }

        }

        .dialog {
            color: #000000;

            .row {
                margin-bottom: 18px;

                .row-title {
                    font-size: 15px;
                    line-height: 1.5;
                    font-family: "PingFangSC", Microsoft YaHei, "Helvetica Neue", Helvetica, Arial, STHeiTi, sans-serif;
                    color: #000000;
                    margin-bottom: 5px;
                }
            }
        }
    }
</style>

<style lang="scss">
    .contractInfo {
        .el-pagination {
            li,
            .btn-prev,
            .btn-next {
                background-color: #5f9196 !important;
                padding-left: 5px !important;
                padding-right: 5px !important;
            }

            li:hover {
                color: #67c23a !important;
            }

            .active {
                background-color: #f1f8eb !important;
                color: #67c23a !important;
            }

            .el-pagination__total {
                float: right !important;
                font-family: auto !important;
            }
        }
    }
</style>