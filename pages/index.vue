<template>
  <v-layout>
    <div
      class="text-xs-center loading-screen"
      v-if="loading"
    >
      <div class="centered">
        <v-progress-circular
          :value="35"
          indeterminate
          :size="70"
          color="verdeOscuro"
        >
        </v-progress-circular>
        <p>Loading markers</p>
      </div>
    </div>
    <v-flex id="map"></v-flex>
    <v-navigation-drawer
      :mini-variant.sync="drawers.mini"
      v-model="drawers.drawer"
      hide-overlay
      stateless
      v-show="!loading"
      touchless
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>settings</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Options</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                icon
                @click.stop="drawers.mini = !drawers.mini"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile @click="activateFilters">
          <v-list-tile-action>
            <v-icon>toggle_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Filters</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="activateLocations">
          <v-list-tile-action>
            <v-icon>place</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Locations</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>place</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Save data <button @click="getAllData" class="download-data">All</button> <button @click="getSelectedData" class="download-data">On map</button></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <hr class="v-divider theme--light">
        <v-container v-show="!drawers.mini && filtersSelected">
          <v-layout
            row
            wrap
            class="dark--text filters"
          >
            <v-btn
              @click="retrievePoints('/observed/')"
              v-show="this.myPoints = true"
              color="flatBlue"
              block
              dark>
              All points
            </v-btn>
            <v-flex class="xs12">
              <hr class="v-divider theme--light divider-top">
            </v-flex>
            <v-flex class="xs12">
            <h3 class="text-xs-center">By user</h3>
            </v-flex>
            <v-flex class="xs8">
            <v-autocomplete
              v-model="selectedUser"
              :items="userList"
            >
            </v-autocomplete>
            </v-flex>
            <v-flex class="xs4 users-button">
              <button @click="retrievePoints('/observed/?created_by__username=' + selectedUser)">GO</button>
            </v-flex>
            <h3 class="text-xs-center">Filters</h3>
            <p class="text-xs-center lead">Toggle switches to filter markers</p>
            <v-flex class="xs12">
              <h4 text-xs-center>Colors</h4>
            </v-flex>
              <v-flex xs4 class="color">
                <div class="red"></div>
              </v-flex>
              <v-flex xs4 class="color">
                <div class="yellow"></div>
              </v-flex>
              <v-flex xs4 class="color">
                <div class="green"></div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.score, 'R', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.score, 'Y', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.score, 'G', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex class="xs12">
                <hr class="v-divider theme--light">
              </v-flex>
            <v-flex class="xs12">
              <h4 text-xs-center>Gender</h4>
            </v-flex>
              <v-flex
                xs4
                class="color"
              >
                <img src="~/assets/images/male.svg" alt="male">
              </v-flex>
              <v-flex
                xs4
                class="color"
              >
                <img src="~/assets/images/female.svg" alt="male">
              </v-flex>
              <v-flex
                xs4
                class="color other"
              >
                Other
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.sex, 'H', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.sex, 'M', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.sex, 'O', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex class="xs12">
                <hr class="v-divider theme--light">
              </v-flex>
            <v-flex class="xs12">
              <h4 text-xs-center>Ability</h4>
            </v-flex>
            <v-flex xs4 class="color" v-for="ability in abilities" :key="ability.index">{{ ability }}</v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.ability, '1', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.ability, '2', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.ability, '3', markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex class="xs12">
                <hr class="v-divider theme--light">
              </v-flex>
            <v-flex class="xs12">
              <h4 text-xs-center>Age</h4>
            </v-flex>
            <v-flex xs3 class="color" v-for="age in ages" :key="age.index">{{ age }}</v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs3>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.age, 1, markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.age, 2, markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.age, 3, markers, mAll)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  value
                  input-value="true"
                  @change="filterOk(filters.age, 4, markers, mAll)"
                >
                </v-switch>
              </v-flex>
          </v-layout>
        </v-container>
        <v-container class="locations" v-show="!drawers.mini && locationsSelected">
          <ul v-for="location in locations" v-bind:key="location.name">
            <li @click="map.panTo(location.center)"><img :src="location.flag" alt=""> {{ location.name }}</li>
          </ul>
        </v-container>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
let L = null
if (process.client) {
  L = require('leaflet')
  require('leaflet.markercluster')
}

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data () {
    return {
      locations: [
        { name: 'Santiago', flag: require('~/assets/images/flags/cl.svg'), center: [-33.447487, -70.673676] },
        { name: 'Concepción', flag: require('~/assets/images/flags/cl.svg'), center: [-36.833333, -73.05] },
        { name: 'San Pedro de la Paz', flag: require('~/assets/images/flags/cl.svg'), center: [-36.833333, -73.116667] },
        { name: 'Bogotá', flag: require('~/assets/images/flags/co.svg'), center: [4.598889, -74.080833] },
        { name: 'Medellín', flag: require('~/assets/images/flags/co.svg'), center: [6.244747, -75.574828] },
        { name: 'Lagos', flag: require('~/assets/images/flags/ng.svg'), center: [6.455027, 3.384082] },
        { name: 'Cheltenham', flag: require('~/assets/images/flags/gb-eng.svg'), center: [51.896519, -2.078428] },
        { name: 'Dhaka', flag: require('~/assets/images/flags/bd.svg'), center: [23.716111, 90.396111] }
      ],
      map: null,
      tilelayer: null,
      points: [],
      markers: [],
      mAll: null,
      loading: true,
      drawers: {
        drawer: true,
        mini: true,
        right: null
      },
      ownPoints: null,
      abilities: ['Able', 'Impaired', 'Assisted'],
      ages: ['Child', 'Teenager', 'Adult', 'Elderly'],
      filters: {
        score: ['R', 'Y', 'G'],
        sex: ['H', 'M', 'O'],
        ability: ['1', '2', '3'],
        age: [1, 2, 3, 4]
      },
      filtered: [],
      filtersSelected: true,
      locationsSelected: false,
      userList: [],
      myPoints: true,
      selectedUser: '',
      selectedPoints: null
    }
  },
  created () {
    this.retrievePoints('/observed/?created_by__username=' + this.loggedInUser)
    this.getUserList()
  },
  mounted () {
    this.clusterConfig()
    this.initMap()
  },
  methods: {
    // set up map
    initMap () {
      this.map = L.map('map').setView([-33.447487, -70.673676], 12)
      this.tileLayer = L.tileLayer(
        'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGZsb3JlcyIsImEiOiJjamF3OW41eWo1dWNhMzNvMmdsZ2kwOGNqIn0.vCIE-w4QPcFWpkEEYb3R-A',
        {
          id: 'mapbox.light',
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/"">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
        }
      )
      this.tileLayer.addTo(this.map)
    },
    clusterConfig () {
      this.mAll = L.markerClusterGroup({
        disableClusteringAtZoom: 15,
        maxClusterRadius: 50
      })
    },
    // retrieves points from api and then loads map
    retrievePoints (endpoint) {
      this.loading = true
      this.markers = []
      this.selectedPoints = []
      this.$axios.$get(endpoint)
        .then((res) => {
          this.points = res
          this.points.forEach(element => {
            let coords = element.data
            let ability = element.ability
            let age = element.age
            let sex = element.sex
            let date = element.created_at
            if (element.created_by !== null) {
              let createdBy = element.created_by.username
              for (let index = 0; index < coords.length; index++) {
                this.markers.push({
                  'id': coords[index].id,
                  'created_by': createdBy,
                  'lat': coords[index].lat,
                  'lon': coords[index].lon,
                  'age': age,
                  'sex': sex,
                  'ability': ability,
                  'score': coords[index].score,
                  'created_at': date,
                  'category': coords[index].category
                })
                this.selectedPoints.push(coords[index].id)
              }
            } else {
              for (let index = 0; index < coords.length; index++) {
                this.markers.push({
                  'id': coords[index].id,
                  'created_by': 'none',
                  'lat': coords[index].lat,
                  'lon': coords[index].lon,
                  'age': age,
                  'sex': sex,
                  'ability': ability,
                  'score': coords[index].score,
                  'created_at': date,
                  'category': coords[index].category
                })
                this.selectedPoints.push(coords[index].id)
              }
            }
          })
          this.initMarkers(this.markers)
          if (this.loading === true) {
            this.loading = !this.loading
          }
        })
    },
    // function that load markers in map and clusters them
    initMarkers (markersArray) {
      if (this.mAll !== null) {
        this.mAll.clearLayers()
      }
      for (let index = 0; index < markersArray.length; index++) {
        let lat = (markersArray[index].lat)
        let lon = (markersArray[index].lon)
        let score = (markersArray[index].score)
        let createdBy = (markersArray[index].created_by)
        let sex = (markersArray[index].sex)
        let age = (markersArray[index].age)
        let ability = (markersArray[index].ability)
        let theDate = (markersArray[index].created_at)
        let category = (markersArray[index].category)
        let marker = L.marker([lat, lon], { icon: this.getColor(score) }).bindPopup(this.templatePopup(createdBy, sex, age, ability, category, theDate))
        marker.addTo(this.mAll)
      }
      this.mAll.addTo(this.map)
    },
    // manage sidebar
    activateFilters () {
      if (this.filtersSelected === false && this.locationsSelected === true) {
        this.locationsSelected = false
        this.filtersSelected = true
      }
    },
    activateLocations () {
      if (this.filtersSelected === true && this.locationsSelected === false) {
        this.locationsSelected = true
        this.filtersSelected = false
      }
    },
    getAllData () {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      let yyyy = today.getFullYear()
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      today = mm + '-' + dd + '-' + yyyy

      const formData = new FormData()
      formData.append('all', true)
      this.$axios.$post('/csv/', formData)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'stride_' + today + '.csv')
          document.body.appendChild(link)
          link.click()
        })
    },
    getSelectedData () {
      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      let yyyy = today.getFullYear()
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      today = mm + '-' + dd + '-' + yyyy

      const formData = new FormData()
      formData.append('csv', this.selectedPoints)
      this.$axios.$post('/csv/', formData)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'stride_' + today + '.csv')
          document.body.appendChild(link)
          link.click()
        })
    },
    getUserList () {
      this.$axios.$get('/api/users/')
        .then((response) => {
          response.forEach(element => {
            this.userList.push(element.username)
          })
        })
    }
  }
}
</script>

<style lang="sass">
@import 'leaflet/dist/leaflet.css'
@import 'leaflet.markercluster/dist/MarkerCluster.css'
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

// general settings
$verdeOscuro: #00b894
@mixin transition($arguments)
  -webkit-transition: $arguments
  -moz-transition: $arguments
  -o-transition: $arguments
  -ms-transition: $arguments
  transition: $arguments
@mixin boton()
  border: none
  cursor: pointer
  background: $verdeOscuro
  &:focus
    outline: none

// map and container
.container,
.layout
  padding: 0
  height: 100% !important
  #map
    height: 100%
    width: 100%
    z-index: 500
    .leaflet-left
      left: unset
      right: 1em
      zoom: 1.5
      top: 1.675em
      .leaflet-control
        margin: 0
        border: none
        a
          @include boton()
          color: white
          margin-bottom: 5px
          border-radius: 2px
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
          @include transition($arguments: all 0.3s cubic-bezier(.25,.8,.25,1))
          &:hover
            box-shadow: 0 0px 10px rgba(0,0,0,0.19), 0 1px 5px rgba(0,0,0,0.23)
    .marker-cluster-small,
    .marker-cluster-small div,
    .marker-cluster-medium,
    .marker-cluster-medium div,
    .marker-cluster-large,
    .marker-cluster-large div
      background-color: rgba(52, 152, 219, 0.6)
    .marker-cluster span
      color: white
    .deletion-form
      max-width: 500px
      margin: 0 auto
      padding: 40px
      p
        margin-bottom: 15px
        max-width: 400px
      .sub
        font-size: 0.8em
      input
        height: 30px
      button
        margin-top: 10px
        border: none
        color: white
        background: rgba(52, 152, 219,1.0)
        padding: 10px
        font-weight: bold
        cursor: pointer
        &:hover
          opacity: 0.8
      span
        font-size: 0.8em

// popup
.leaflet-popup
  font-size: 1.3em
  .datos-sujeto
    list-style: none
    padding: 0
  .leaflet-popup-content-wrapper
    width: 270px
    border-radius: 2px 2px 0px 0px
    .leaflet-popup-content
      margin: 0
      .el-popup
        background: gris
        padding: 0 15px 20px 15px
        span
          font-weight: bold
        .sujeto
          margin-bottom: 5px
        .po-direccion
          background: $verdeOscuro
          font-weight: bold
          color: white
          position: relative
          width: 113%
          top: -1px
          left: -15.6px
          padding: 10px 15px
          p
            margin: 0
            max-width: 230px
.leaflet-popup-close-button
  color: white !important
  font-size: 35px !important
  right: 20px !important
  top: 7px !important

// loading effect
.loading-screen
  z-index: 700
  height: 100%
.centered
  position: absolute
  top: 50%
  left: 50%
  margin-right: -50%
  transform: translate(-50%, -50%)
  p
    margin-top: 15px
    color: white
    padding: 5px
    background-color: #3498db

// sidebar
.v-navigation-drawer
  position: absolute !important
  left: 0
  z-index: 1000 !important
  background-color: #f8f8f8 !important
  border-right: 1px solid rgba(0,0,0,0.12)
  .container,
  .layout
    height: unset !important
    text-align: center
    img
      height: 40px
    p,
    h3,
    h4
      width: 100%
    h4
      margin-top: 15px
      margin-bottom: 10px
    .lead
      margin-bottom: 10px
    .other
      position: relative
      top: 10px
  .container
    padding: 20px !important
    .color
      .red,
      .yellow,
      .green
        height: 25px
        width: 25px
        display: block
        margin: 0 auto
        border-radius: 50%
    .v-input--selection-controls
      margin-top: 8px
      .v-input__control
        display: block
        margin: 0 auto
.v-navigation-drawer__border
  display: none

// locations
.locations
  ul
    text-align: left
    list-style: none
    padding: 0
    li
      width: 100%
      padding: 5px 8px 8px 8px
      margin-bottom: 15px
      border: 1px solid #e6e6e6
      cursor: pointer
      &:hover
        border: 1px solid $verdeOscuro
        color: $verdeOscuro
    img
      height: 20px !important
      position: relative
      top: 5px
      padding-right: 10px

// iconos
.v-icon,
.v-list__tile__title
  cursor: pointer

.divider-top
  margin-top: 15px
  margin-bottom: 15px

.users-button button
  padding: 15px 20px
  display: block
  float: right
  color: white
  border-radius: 2px
  background-color: $verdeOscuro
  &:hover
    opacity: 0.8
  outline: none

.download-data
  margin-left: 10px
  padding: 0 10px
  border: 1px solid $verdeOscuro
  line-height: 1
  color: $verdeOscuro
  outline: none
  &:hover
    opacity: 0.8
</style>
