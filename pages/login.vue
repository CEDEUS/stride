<template>
<v-container class="login" fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs11 sm6 md4 lg3 class="form">
      <v-card class="elevation-10">
        <v-toolbar color="verdeOscuro">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-alert
            v-if="alert=alert"
            :value="true"
            type="error"
          >
            Wrong username or password
          </v-alert>
          <v-form method="post" @submit.prevent="login">
            <v-text-field color="verdeOscuro" prepend-icon="person" name="username" label="Username" type="text" autocomplete="on" required v-model="username"></v-text-field>
            <v-text-field color="verdeOscuro" id="password" prepend-icon="lock" name="password" label="Password" type="password" autocomplete="on" required v-model="password"></v-text-field>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="submit" type="submit" color="verdeOscuro">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      username: null,
      password: null,
      alert: false
    }
  },
  methods: {
    async login () {
      // wont run if username or password are empty
      if (this.username != null && this.password != null) {
        if (this.alert === true) {
          this.alert = !this.alert
        }
        try {
          await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          })
          this.$router.push('/')
        } catch (e) {
          this.alert = !this.alert
          this.error = e
          console.log(this.error)
        }
      }
    }
  }
}
</script>

<style lang="sass">
.container
  padding: 0 !important
.login
  background-image: url("../assets/images/background-login.jpg")
  background-size: cover
  padding: 0
.form
  margin-bottom: 20vh
.v-toolbar__title
  color: white
.v-alert
  margin-bottom: 15px
  font-size: 0.9em
.submit
  color: white !important
</style>