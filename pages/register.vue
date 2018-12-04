<template>
  <v-container class="register" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs11 sm6 md5 lg4>
        <v-card>
          <v-toolbar color="verdeOscuro">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert
              :value="true"
              type="warning"
              class="error"
            >
              If succesful you will be redirected to login. <br>
              - Email must be valid. <br>
              - Username must not exist. <br>
              - Password must have a lenght of at least 8.
            </v-alert>
            <v-form method="post" @submit.prevent="register()">
            <v-text-field color="verdeOscuro" prepend-icon="email" name="email" label="Email" type="email" autocomplete="on" required v-model="email"></v-text-field>
            <v-text-field color="verdeOscuro" prepend-icon="person" name="username" label="Username" type="text" autocomplete="on" required v-model="username"></v-text-field>
            <v-text-field color="verdeOscuro" prepend-icon="lock" name="password" label="Password" type="password" autocomplete="on" required v-model="password"></v-text-field>
            <v-card-actions>
              <v-btn to="/login">Back to login</v-btn>
               <v-spacer></v-spacer>
              <v-btn class="submit" type="submit" color="verdeOscuro">Register</v-btn>
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
  auth: false,
  data () {
    return {
      username: null,
      password: null,
      email: null,
      alert: false
    }
  },
  methods: {
    async register () {
      await this.$axios.$post('/api/users/create/', {
        'email': this.email,
        'username': this.username,
        'password': this.password
      })
        .then((res) => {
          this.$router.push('/login')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.register
  background-image: url("../assets/images/background-login.jpg")
  background-size: cover
.v-toolbar__title
  color: white
.submit
  color: white !important
</style>
