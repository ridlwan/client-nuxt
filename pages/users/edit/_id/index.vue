<template>
    <div class="container-fluid">
        <div class="card mb-4">
            <div class="card-header">
                <h4 class="card-title"></h4>
            </div>
            <div class="card-body">
                <User />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ store, params }) {
        await Promise.all([store.dispatch("user/getData", params.id)]);
        return;
    },
};
</script>

<style scoped>
</style>