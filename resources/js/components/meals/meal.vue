<template>
    <div>
        <meal-list></meal-list>
        <br/>
        <orders-list v-if="$store.state.user.type === 'waiter'"></orders-list>
    </div>
</template>
<script>
    import MealList from "./mealsList";
    import OrdersList from "./ordersList";

    export default {
        components: {
            OrdersList,
            MealList
        }
    }
</script>

<style scoped>

</style>
