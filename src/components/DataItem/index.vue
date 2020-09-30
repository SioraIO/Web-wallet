<template>
    <div class="data-item">{{label}}
        <span>
      <slot/>
    </span>
    </div>
</template>

<script>
    export default {
        props: {
            label: String
        }
    };
</script>

<style lang="scss" scoped>
    .data-item {
        display: inline-block;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin: $padding-small 0;
        font-weight: bold;

        span {
            font-weight: 500;
            max-width: 100%;
            width: 100%;
            display: inline-block;
            word-break: break-all;
            text-align: left;
        }
    }
</style>
