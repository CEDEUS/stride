<template>
  <header>
    <v-toolbar color="verdeAgua">
      <v-toolbar-title>
        <nuxt-link class="logo" to="/">
          <h1>StrideApp</h1>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="el-menu">
        <v-btn
          class="login-button"
          v-if="!isAuthenticated"
          to="/login"
          color="flatBlue"
        >
          LOGIN
        </v-btn>
        <v-menu
          v-if="isAuthenticated"
          offset-y
          open-on-hover
          class="user-menu"
        >
          <v-btn
            depressed
            slot="activator"
            color="flatBlue"
            class="menu"
          >
            <span class="the-user">Hello {{ loggedInUser }}</span>
            <span class="bullet-down">▼</span>
          </v-btn>
          <v-list>
            <v-list-tile to="/">
              <v-list-tile-title>Map</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/stats">
              <v-list-tile-title>My statistics</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title @click="logout()">Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
header
  z-index: 1050
  .logo
    text-decoration: none
    h1
      font-weight: 400
      color: white
      font-size: 1.2em
.menu,
.login-button
  color: white !important
  padding: 0 12px !important
.el-menu
  position: absolute
  right: 1px
  .bullet-down
    padding-left: 5px
</style>
