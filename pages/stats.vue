<template>
<v-layout justify-center>
  <v-flex xs11 sm5 md5 lg4 xl4 class="stats">
    <v-card>
      <v-toolbar color="verdeOscuro">
        <v-toolbar-title>My statistics</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-subheader>User since:</v-subheader>
        <p>{{ userSince }}</p>
        <v-subheader>Today's observed persons:</v-subheader>
        <p>{{ todayObservedPerson }}</p>
        <v-subheader>Total observed persons:</v-subheader>
        <p>{{ totalObservedPerson }}</p>
        <v-subheader>Total voted points:</v-subheader>
        <p>{{ totalPointsVoted }}</p>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  data () {
    return {
      userSince: null,
      todayObservedPerson: null,
      totalObservedPerson: null,
      totalPointsVoted: null,
      userID: null
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      await this.$axios.$get('/api/users/me/')
        .then((res) => {
          this.userID = res.id
        })
        .catch((error) => {
          console.log(error)
        })
      await this.$axios.$get('/api/users/' + this.userID + '/')
        .then((res) => {
          this.userSince = new Date(res.date_joined).toLocaleString()
          this.todayObservedPerson = res.today_observed_person
          this.totalObservedPerson = res.total_observed_person
          this.totalPointsVoted = res.total_points_voted
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass">
.stats
  margin-top: 50px
  margin-bottom: 40px
  .v-toolbar__title
    color: white
  p
    padding-left: 16px
</style>
