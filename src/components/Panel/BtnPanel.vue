<template>
    <div @click="onClick">
        <router-link
                class="btn-panel"
                :to="link"
        >
            <img
                    :alt="title"
                    :src="src"
            />
            <div>
                <h4>{{title}}</h4>
                <p>{{brief}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "BtnPanel",
        props: {
            src: {type: String, required: true},
            title: {type: String, required: true},
            brief: {type: String, required: true},
            link: {type: String, required: true},
            onClick: {type: Function, required: false}
        }
    };
</script>

<style lang="scss" scoped>
    .btn-panel {
        padding: $padding-basic;
        background: $color-background-card;
        box-shadow: $shadow;
        display: flex;
        align-items: center;
        margin-bottom: $padding-basic;
        transition: background-color $trans;

        &:hover {
            background: rgba(250, 250, 255, 0.4);
        }

        img {
            height: 40px;
            margin-right: $padding-basic;
        }

        h4 {
            font-size: 20px;
        }

        p {
            margin-top: 8px;
            text-overflow: ellipsis;
        }
    }
</style>

