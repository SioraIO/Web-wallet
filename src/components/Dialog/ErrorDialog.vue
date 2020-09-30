<template>
    <BaseDialog class="container" v-bind="$attrs" v-on="$listeners">
        <div class="dialog-title">{{title}}</div>
        <div class="dialog-body">
            <img src="../../assets/ic_error.png" alt="" class="image-error"/>
        </div>
        <div class="dialog-footer">
            <button type="button" @click="handleOnClose">{{confirmText}}</button>
        </div>
    </BaseDialog>
</template>

<script>
    import BaseDialog from "./BaseDialog.vue";

    export default {
        name: "ErrorDialog",
        components: {
            BaseDialog
        },
        props: {
            title: {
                type: String,
                default: "ERROR"
            },
            confirmText: {
                type: String,
                default: "Ok"
            },
            onClose: Function
        },
        methods: {
            handleOnClose() {
                this.$emit("update:active", false);
                this.onClose();
            }
        }
    };
</script>

<style scoped>

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 20px;
        z-index: 5;
    }

    .dialog-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
        color: #E2574C
    }

    .dialog-footer {
        text-align: right;
        margin-top: 20px;
    }

    .dialog-footer button {
        font-size: 20px;
        cursor: pointer;
        background-color: #EC6E6E;
        color: white;
        border-radius: 10px;
        border-color: #EC6E6E;
        min-width: 200px;
        min-height: 47px;
        margin-bottom: 10px;
    }

    .image-error {
        width: 100px;
        height: 100px;
    }

</style>
