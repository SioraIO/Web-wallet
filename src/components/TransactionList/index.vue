<template>
    <div class="transaction">
        <el-table
                :data="transactionList.txs"
                highlight-current-row
                style="width: 100%"
                class="table-transaction"
                height="500"
                border
                :header-row-style="{color: '#4b8c92'}"
                :row-style="{cursor: 'pointer'}"
                @row-click="handleRowClick"
        >
            <el-table-column label="Index" align="center" width="70">
                <template
                        slot-scope="scope"
                >{{ (transactionList.current_page - 1)*transactionList.limit + (scope.$index + 1) }}
                </template>
            </el-table-column>
            <el-table-column label="Destination" align="center">
                <template slot-scope="scope">
                    <div v-if="address === scope.row.from_acc">{{scope.row.to_acc}}</div>
                    <div v-else-if="address === scope.row.to_acc">{{scope.row.from_acc}}</div>
                    <div v-else-if="address === scope.row.fee_receiver">{{scope.row.to_acc}}</div>
                </template>
            </el-table-column>
            <el-table-column label="Type" align="center" width="90">
                <template slot-scope="scope">
                    <div v-if="address === scope.row.from_acc" slot="reference" class="name-wrapper">
                        <el-tag class="sub" size="medium">OUT</el-tag>
                    </div>
                    <div v-else slot="reference" class="name-wrapper">
                        <el-tag class="add" size="medium">IN</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Amount" align="center" width="100">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">{{ formatBalance(scope.row.amount) }}</div>
                </template>
            </el-table-column>
            <el-table-column label="TimeStamp" align="center" width="230">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">{{ formatDateTime(scope.row.timestamp) }}</div>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
            <el-pagination
                    background
                    :current-page.sync="transactionList.current_page"
                    layout="jumper, prev, pager, next, sizes, total"
                    :total="transactionList.total"
                    :page-size.sync="transactionList.limit"
                    :page-sizes="optionSize"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {formatDateTime} from "../../utils/Constant";
    import {Utils} from "xek-sdk";

    const optionSize = [10, 30, 50, 100, 200];

    export default {
        props: {
            transactionList: Object,
            onPaginationChange: Function
        },
        data() {
            return {
                current_page: 1,
                limit: 10,
                optionSize
            };
        },
        computed: {
            ...mapGetters("account", {address: "currentAddress"})
        },
        methods: {
            formatDateTime: dateString => {
                return formatDateTime(dateString);
            },
            formatBalance: balance => {
                return Utils.toXek(balance);
            },
            handleRowClick(item) {
                const linkTo = `/transaction/${item.tx_hash.toLowerCase()}`;
                if (item.tx_hash) this.$router.push(linkTo);
            },
            handlePageChange(page) {
                this.current_page = page;
                this.limit = this.transactionList.limit;
                this.$root.$emit("ChangePage")
                this.onPaginationChange({
                    page: this.current_page,
                    limit: this.limit
                });
                refreshTable();
            },
            handleSizeChange(size) {
                const maxPage = Math.ceil(this.transactionList.total / size);
                if (maxPage < this.current_page) this.current_page = 1;
                this.limit = size;
                this.onPaginationChange({
                    page: this.current_page,
                    limit: this.limit
                });
                refreshTable();
            }
        }
    };

    const refreshTable = () => {
        const contenTable = document.getElementsByClassName(
            "el-table__body-wrapper is-scrolling-none"
        );
        contenTable[0].scrollTop = 0;
        contenTable[0].scrollLeft = 0;
    };
</script>

<style lang="scss" scoped>
    .el-table {
        color: #679da3;
        box-shadow: 1px 1px 12px 0px rgba(0, 0, 0, 0.15);
    }

    .add {
        min-width: 47px;
        background-color: #67c23a;
        color: white;
    }

    .sub {
        min-width: 47px;
        background-color: red;
        color: white;
    }

    .transaction {
        background-color: #679da3;
        padding: 10px;
        box-shadow: 1px 1px 12px 0px rgba(0, 0, 0, 0.15);
    }
</style>

<style lang="scss">
    .transaction {
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
