<template>
  <v-footer height="auto" color="red lighten-1">
    <v-layout justify-center row wrap>
      <v-btn color="white" round @click="vueToast()">Test VueToasted</v-btn>
      <v-btn v-for="link in links" :key="link" color="white" flat round>{{ link }}</v-btn>
      <v-flex red lighten-2 py-3 text-xs-center white--text xs12>&copy;2018 —
        <strong>Restaurantte</strong>
      </v-flex>
      <v-card>
        <v-input>{{ this.$store.state.token }}</v-input>
      </v-card>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
  }),
  methods: {
    vueToast() {
      this.$toasted.success("VueToasted", {
        icon: "info_outline"
      });
    }
  }
};
</script>

<style>
.toasted-css {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
