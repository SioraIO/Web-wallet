<template>
    <div :class="`header-container ${bgColor}`">
        <div class="header">
            <div class="logo" v-if="!isEmpty(userName) && activeUser">
                <a href="/main?tab=assets">
                    <img
                            alt="logo"
                            src="~@/assets/Katana.png"
                    />
                </a>
            </div>
            <div class="logo" v-else>
                <a href="/">
                    <img
                            alt="logo"
                            src="~@/assets/Katana.png"
                            class="w-image-logo"
                    />
                </a>
            </div>
            <el-dropdown
                    v-if="$route.path === '/home'"
                    class="network"
                    trigger="click"
            >
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>{{nodeInfo.network}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown
                    class="dropdown-menu"
                    trigger="click"
                    @command="getStarted"
                    v-show="!isEmpty(userName) && activeUser"
            >
                <div class="dropdown-menu-btn">
                    <div class="avatar">
                        <img
                                v-if="isEmpty(mathAccount)"
                                :src="walletIcon"
                        />
                    </div>
                    <span class="nameDropDown" v-if="!isEmpty(userName)">{{ userName}}</span>
                    <span v-else></span>
                    <i class="el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="account" class="disabled-submenu" :disabled="checkActive">
                        {{$t('home.account')}}
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">
                        {{$t('home.logout')}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <div class="view-container-dropdown-notify" v-show="!isEmpty(userName) && activeUser">
                <el-dropdown
                        class="dropdown-menu view-notify"
                        trigger="click"
                >
                    <div class="dropdown-menu-btn">
                        <div class="view-total-notify" v-if="numberNotify>0">
                            {{numberNotify > 99 ? "99+" : numberNotify}}
                        </div>
                        <div class="avatar">
                            <img
                                    alt=""
                                    :src="notifyIcon"
                            />
                        </div>
                    </div>
                    <el-dropdown-menu slot="dropdown" class="dropdown-notify">
                        <div class="container-view-item">
                            <div class="view-title-notification">
                                <div>Notification</div>
                            </div>
                            <el-dropdown-item v-for="(item,index) in listNotification"
                                              :key="index"
                                              :class="getClassForViewItemNotify(item)"
                            >
                                <img
                                        alt=""
                                        :src="icNotifySend"
                                        class="icon-notify-wallet"
                                        v-if="item && covertAddress(walletAddress)===covertAddress(item.from_acc_addr)"
                                />
                                <img
                                        alt=""
                                        :src="icNotifyReceive"
                                        class="icon-notify-wallet"
                                        v-if="item && covertAddress(walletAddress)===covertAddress(item.to_acc_addr)"
                                />

                                <div>
                                    <el-button @click="handleClickItemNotify(item)"
                                               class="item-button"
                                               v-if="item && covertAddress(walletAddress)===covertAddress(item.from_acc_addr)">
                                        <div>
                                            <span>Send</span>
                                            <span class="text-bold">{{toXek(item.amount)}}</span>
                                            <span>To</span>
                                            <span class="text-bold">{{item.to_acc_addr}}</span>
                                        </div>
                                        <div class="time-stamp">{{item && getTimeNotify(item.timestamp) || ""}}</div>
                                    </el-button>
                                    <el-button @click="handleClickItemNotify(item)"
                                               class="item-button"
                                               v-if="item && covertAddress(walletAddress)===covertAddress(item.to_acc_addr)">
                                        <div>
                                            <span>Receive</span>
                                            <span class="text-bold">{{toXek(item.amount)}}</span>
                                            <span>From</span>
                                            <span class="text-bold">{{item.from_acc_addr}}</span>
                                        </div>
                                        <div class="time-stamp">{{item && getTimeNotify(item.timestamp) || ""}}</div>
                                    </el-button>
                                </div>
                            </el-dropdown-item>
                            <div class="label-no-notification" v-if="listNotification.length===0">
                                No Notification !
                            </div>
                            <div class="view-footer-notification"
                                 v-if="listNotification.length >= (currentPageNotify*10)">
                                <el-button class="button-view-more" @click="handleViewMoreNotification">
                                    View More
                                </el-button>
                            </div>
                        </div>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {isEmpty} from "lodash";

    import walletIcon from "@/assets/icon-wallet.svg";
    import notifyIcon from "@/assets/ic_notification.png";
    import {coverAddressWithoutPre, covertArrayDuplicate, getTitleTime, showNotifySuccess} from "../../utils/Constant";
    import {apiGetListNotification, apiGetNumberNotification, apiUpdateNotification} from "../../api";
    import {getWallet} from "../../utils/Store";
    import Socket from "../../utils/Socket";
    import SDK from 'xek-sdk';
    import icNotifyReceive from "../../assets/ic_notify_receive.svg";
    import icNotifySend from "../../assets/ic_notify_send.svg";

    export default {
        data() {
            return {
                lang: this.$i18n.locale,
                bgColor: "",
                walletAddress: "",
                walletIcon,
                notifyIcon,
                checkActiveComponent: false,
                listNotification: [],
                numberNotify: 0,
                currentPageNotify: 1,
                icNotifyReceive,
                icNotifySend
            };
        },
        props: {
            netName: String
        },
        computed: {
            ...mapState("account", ["userName", "mathAccount", "address", "activeUser"]),
            ...mapState("transactions", ["nodeInfo"]),
            checkActive() {
                if (this.$route.query.tab) {
                    return true;
                }
                return false;
            }
        },
        methods: {
            isEmpty,
            getStarted(page) {
                const uris = {
                    account: "/main?tab=assets",
                    logout: "/passport"
                };
                if ((this.userName && this.activeUser) || !isEmpty(this.mathAccount)) {
                    if (page === 'logout') {
                        this.$store.dispatch('account/logout');
                        this.$notify({
                            title: "Success",
                            message: "Logout Successfully!",
                            type: "success"
                        });
                        this.$router.push(uris[page]);
                        return;
                    }
                    this.$store.dispatch("account/updateActiveUser", true);
                    this.$router.push(uris[page]);
                    return;
                }
                this.$store.dispatch("account/updateActiveUser", false);
                const agree = localStorage.getItem("gard_wallet_agree");
                if (!agree) {
                    this.$router.push("/agree");
                    return;
                }
                this.$router.push("/passport");
            },
            covertAddress(address) {
                return coverAddressWithoutPre(address);
            },
            async getNumberNotify(walletAddress) {
                let numberNotify = await apiGetNumberNotification(walletAddress);
                if (numberNotify && numberNotify.data && numberNotify.data.unreadable_notification) {
                    this.numberNotify = numberNotify.data.unreadable_notification;
                }
            },
            async getListNotification(page, walletAddress) {
                let listNotify = await apiGetListNotification(page, walletAddress);
                listNotify = listNotify && listNotify.data && listNotify.data.txs;
                if (listNotify) {
                    if (page === 1) {
                        this.listNotification = covertArrayDuplicate(listNotify);
                    } else {
                        this.listNotification = covertArrayDuplicate([...this.listNotification, ...listNotify]);
                    }
                }
            },
            getClassForViewItemNotify(item) {
                let result = "dropdown-menu-view-item menu-notify";
                if (item) {
                    if (!this.checkReadNotification(item)) {
                        result = "dropdown-menu-view-item menu-notify not-read-notify";
                    }
                }
                return result;
            },
            getTimeNotify(time) {
                return getTitleTime(time);
            },
            initSocketNotify(walletAddress) {
                Socket.on(walletAddress, (data) => {
                    // console.log("data socket notify", data);
                    this.addNotification(data);
                });
            },
            toXek(amount) {
                return SDK.Utils.toXek(amount);
            },
            addNotification(notification) {
                if (notification) {
                    showNotifySuccess(this, "You have a new notification");
                    this.listNotification = covertArrayDuplicate([notification, ...this.listNotification]);
                    this.numberNotify = this.numberNotify + 1;
                }
            },
            checkReadNotification(item) {
                const {walletAddress} = this;
                let result = false;
                if (item && item.status && item.status.length > 0) {
                    if (coverAddressWithoutPre(item.from_acc_addr) === coverAddressWithoutPre(walletAddress)) {
                        result = item.status.findIndex(id => Number(id) === Number(item.from_acc_id)) !== -1;
                    } else if (coverAddressWithoutPre(item.to_acc_addr) === coverAddressWithoutPre(walletAddress)) {
                        result = item.status.findIndex(id => Number(id) === Number(item.to_acc_id)) !== -1;
                    }
                }
                return result;
            },
            handleScroll(e) {
                if (window.scrollY > 20) {
                    this.bgColor = "primary";
                } else {
                    this.bgColor = "";
                }
            },
            async handleClickItemNotify(item) {
                // console.log(item);
                if (!this.checkReadNotification(item)) {
                    const {listNotification, numberNotify, walletAddress} = this;
                    let newListNotification = listNotification;
                    let newNotify = item;
                    const indexItem = listNotification.findIndex(notify => notify.notification_id === item.notification_id);
                    if (indexItem !== -1) {
                        // Update notification
                        const resultUpdate = await apiUpdateNotification(item.notification_id, walletAddress);
                        // console.log(resultUpdate);
                        if (resultUpdate && resultUpdate.success) {
                            if (coverAddressWithoutPre(walletAddress) === item.from_acc_addr) {
                                newNotify.status = [...item.status, item.from_acc_id + ""];
                            } else {
                                newNotify.status = [...item.status, item.to_acc_id + ""];
                            }
                            newListNotification[indexItem] = newNotify;
                            this.numberNotify = numberNotify > 0 ? numberNotify - 1 : 0;
                            this.listNotification = newListNotification;
                        }
                    }
                }
            },
            handleViewMoreNotification() {
                const {listNotification, currentPageNotify, walletAddress} = this;
                if (listNotification && listNotification.length >= (currentPageNotify * 10)) {
                    this.getListNotification(currentPageNotify + 1, walletAddress);
                    this.currentPageNotify = currentPageNotify + 1;
                }
            },
        },
        mounted() {
            window.onscroll = this.handleScroll;
            let wallet = localStorage.getItem(('USER_WALLET'));
            if (wallet) {
                this.$store.dispatch("account/updateActiveUser", true);
            }
        },
        async beforeMount() {
            let wallet = await getWallet();
            if (wallet) {
                wallet = JSON.parse(wallet);
                const walletAddress = wallet.address;
                this.walletAddress = walletAddress;
                this.getNumberNotify(walletAddress);
                this.getListNotification(1, walletAddress);
                this.initSocketNotify(walletAddress);
            }
        },
    };
</script>

<style lang="scss" scoped>
    .header-container {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 11;
        padding: 0;
        color: white;
        background: transparent;
        transition: background-color 0.6s ease 0s;

        &.primary {
            background: $color-primary;
            box-shadow: $shadow;
        }
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px $padding-large;
        max-width: $max-width;
        margin: 0 auto;

        .logo {
            flex: 1;
            display: inline-block;
            line-height: 1;

            img {
                /*height: 52px;*/
                width: 8%;
            }
        }

        .network {
            font-size: 16px;

            span {
                color: white;
                cursor: pointer;
            }
        }

        .lang-change {
            cursor: pointer;
            margin-left: $padding-basic;

            .el-icon-sort {
                transform: rotate(90deg);
            }
        }

        .dropdown-menu {
            margin-left: $padding-basic;
            cursor: pointer;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.8);

            .dropdown-menu-btn {
                display: flex;
                align-items: center;

                i {
                    margin-left: 4px;
                    margin-top: 2px;
                }

                //dropdown-menu el-dropdown555
                .view-total-notify {
                    width: 25px;
                    height: 25px;
                    border-radius: 20px;
                    position: absolute;
                    top: 0;
                    right: 2px;
                    font-size: 15px;
                    text-align: center;
                    background-color: red;
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .avatar {
                height: 28px;
                width: 28px;
                background: rgba(255, 255, 255, 0.2);
                overflow: hidden;
                border-radius: 14px;
                padding: 3px;
                margin-right: 6px;

                img {
                    height: 18px;
                    margin: 2px;
                }
            }

            .nameDropDown {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: 100px;
                display: inline-block;
                font-size: 20px;
            }

            &:hover {
                color: white;

                .avatar {
                    background: rgba(255, 255, 255, 0.3);
                }
            }
        }

        .view-container-dropdown-notify {
            position: relative;

            .view-arrow {
                position: absolute;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 8px 15px 8px;
                border-color: transparent transparent #ffffff transparent;
                bottom: -14px;
                right: 37%;
            }
        }
    }

    .view-notify {
        height: 50px;
        padding-right: 15px;
        justify-content: center;
        align-items: center;
        display: flex;
    }


    @include responsive($sm) {
        .header {
            padding: 16px;

            .lang-change {
                margin-left: 12px;
            }

            .dropdown-menu {
                margin-left: 12px;
            }
        }
    }
</style>
