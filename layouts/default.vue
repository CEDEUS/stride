<template>
  <v-app>
    <Header></Header>
    <v-content>
      <v-container fill-height fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      class="pa-3">
      <v-spacer></v-spacer>
      <div>Developed by Fondecyt 1150239/AccesoBarrio, <a href="https://www.cedeus.cl" target="_blank">CEDEUS</a> and <a href="https://www.walk21.com/" target="_blank">Walk21</a> &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="sass">
.v-footer
  a
    color: black
</style>


