<template>
    <v-dialog v-model="show" @click.stop="show = false" max-width="1200px">
        <v-card>
            <v-card-title class="headline blue darken-4 white--text">
                Meal #{{ mealInfo.id }}
                <v-spacer></v-spacer>
                {{ mealInfo.start }}
            </v-card-title>
            <v-list two-line>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="indigo">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ mealInfo.responsible_waiter }}</v-list-tile-title>
                        <v-list-tile-sub-title>Responsible Waiter</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="indigo">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ mealInfo.table_number }}</v-list-tile-title>
                        <v-list-tile-sub-title>Table number</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="indigo">euro_symbol</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ mealInfo.total_price_preview }}</v-list-tile-title>
                        <v-list-tile-sub-title>Price</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <template v-for="(order, index) in mealInfo.orders">
                    <v-list-tile :key="order.id">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ order.item }}</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary">{{ order.state }}</v-list-tile-sub-title>
                            <v-list-tile-sub-title>{{ order.responsible_cook || "No cook assigned" }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <span class="font-weight-medium">€{{ order.price }}</span>
                        </v-list-tile-action>
                    </v-list-tile>
                </template>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "meal-info",
        props: {
            visible: Boolean,
            mealInfo: Object
        },
        computed: {
            show: {
                get() {
                    return this.visible;
                },
                set(value) {
                    if (!value) {
                        this.$emit("close");
                    }
                }
            }
        }
    };
</script>


