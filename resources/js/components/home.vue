<template>
    <div>
        <section>
            <v-layout
                    column
                    wrap
                    class="my-5"
                    align-center
            >
                <!--<v-flex xs12 sm4 class="my-3">
                     <div class="text-xs-center">
                         <h2 class="headline">The best way to start developing</h2>
                         <span class="subheading">
                     Cras facilisis mi vitae nunc
                   </span>
                     </div>
                 </v-flex>
                 <v-flex xs12>
                     <v-container grid-list-xl>
                         <v-layout row wrap align-center>
                             <v-flex xs12 md4>
                                 <v-card class="elevation-0 transparent">
                                     <v-card-text class="text-xs-center">
                                         <v-icon x-large class="blue&#45;&#45;text text&#45;&#45;lighten-2">color_lens</v-icon>
                                     </v-card-text>
                                     <v-card-title primary-title class="layout justify-center">
                                         <div class="headline text-xs-center">Material Design</div>
                                     </v-card-title>
                                     <v-card-text>
                                         Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                         Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                         Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                     </v-card-text>
                                 </v-card>
                             </v-flex>
                             <v-flex xs12 md4>
                                 <v-card class="elevation-0 transparent">
                                     <v-card-text class="text-xs-center">
                                         <v-icon x-large class="blue&#45;&#45;text text&#45;&#45;lighten-2">flash_on</v-icon>
                                     </v-card-text>
                                     <v-card-title primary-title class="layout justify-center">
                                         <div class="headline">Fast development</div>
                                     </v-card-title>
                                     <v-card-text>
                                         Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                         Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                         Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                     </v-card-text>
                                 </v-card>
                             </v-flex>
                             <v-flex xs12 md4>
                                 <v-card class="elevation-0 transparent">
                                     <v-card-text class="text-xs-center">
                                         <v-icon x-large class="blue&#45;&#45;text text&#45;&#45;lighten-2">build</v-icon>
                                     </v-card-text>
                                     <v-card-title primary-title class="layout justify-center">
                                         <div class="headline text-xs-center">Completely Open Sourced</div>
                                     </v-card-title>
                                     <v-card-text>
                                         Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                         Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                         Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                                     </v-card-text>
                                 </v-card>
                             </v-flex>
                         </v-layout>
                     </v-container>
                </v-flex>-->
<!--
                <shift-options v-show="showWorker" user="user"></shift-options>
-->
            </v-layout>
        </section>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                /*user: {},
                showAll: false,
                showWorker: false,
                showCashier: false,
                showManager: false,*/
            }
        },
        methods: {
            /*getInformationFromLoggedUser() {
                this.user = this.$store.state.user;
            },
            isUserAWorker(user){
                console.log(user.type);
                if(user.type == "cashier" || user.type == "waiter" || user.type == "cook"){
                    this.showWorker = true;
                }
            }*/
        },
        mounted() {
           /* this.getInformationFromLoggedUser();
            this.isUserAWorker(this.user);*/
        }
    }
</script>

<style scoped>
</style>