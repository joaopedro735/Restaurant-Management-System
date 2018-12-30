<template>
    <v-dialog v-model="show" @click.stop="show = false" width="600px">
        <v-card>
            <v-card-title class="headline grey lighten-2">
                {{ invoiceTitle }}
                <v-spacer></v-spacer>
                {{ invoiceInfo.date}}
            </v-card-title>


            <v-list two-line>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon color="indigo">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ invoiceInfo.waiter }}</v-list-tile-title>
                        <v-list-tile-sub-title>Responsible Waiter</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="indigo">place</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ invoiceInfo.table_number }}</v-list-tile-title>
                        <v-list-tile-sub-title>Table number</v-list-tile-sub-title>
                    </v-list-tile-content>

                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="indigo">euro_symbol</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ invoiceInfo.price }}</v-list-tile-title>
                        <v-list-tile-sub-title>Price</v-list-tile-sub-title>
                    </v-list-tile-content>

                </v-list-tile>

                <v-divider></v-divider>

                <v-list-group
                        v-for="(item, i) in invoiceInfo.items"
                        :key="i"
                        no-action
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title>{{i | capitalize}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile
                            v-for="subItem in item"
                            :key="subItem.title"
                            @click=""
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{subItem.quantity}} x {{subItem.unit_price}}€</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-list-tile-sub-title>{{ subItem.sub_total_price }}€</v-list-tile-sub-title>
                        </v-list-tile-action>

                    </v-list-tile>
                </v-list-group>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            visible: Boolean,
            invoiceInfo: Object,
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
            },
            invoiceTitle() {
                return "Invoice ID: " + this.invoiceInfo.id;
            },
        }
    }
</script>

<style scoped>

</style>
