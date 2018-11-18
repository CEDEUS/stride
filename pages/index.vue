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
        <v-list-tile v-if="isAuthenticated && !myPoints" @click="activateMyPoints">
          <v-list-tile-action>
            <v-icon>person_pin_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My points</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated && allPoints" @click="activateMyPoints">
          <v-list-tile-action>
            <v-icon>person_pin_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>All points</v-list-tile-title>
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
                  @change="filter(filters.score, 'R', markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.score, 'Y', markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.score, 'G', markers)"
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
                  @change="filter(filters.sex, 'H', markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.sex, 'M', markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.sex, 'O', markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex class="xs12">
                <hr class="v-divider theme--light">
              </v-flex>
            <v-flex class="xs12">
              <h4 text-xs-center>Ability</h4>
            </v-flex>
            <v-flex xs4 class="color">Able</v-flex>
            <v-flex xs4 class="color">Impaired</v-flex>
            <v-flex xs4 class="color">Assisted</v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.ability, '1', markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.ability, '2', markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs4>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.ability, '3', markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex class="xs12">
                <hr class="v-divider theme--light">
              </v-flex>
            <v-flex class="xs12">
              <h4 text-xs-center>Age</h4>
            </v-flex>
              <v-flex xs3 class="color">Child</v-flex>
              <v-flex xs3 class="color">Teenager</v-flex>
              <v-flex xs3 class="color">Adult</v-flex>
              <v-flex xs3 class="color">Elderly</v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs3>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.age, 1, markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.age, 2, markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.age, 3, markers)"
                >
                </v-switch>
              </v-flex>
              <v-flex xs3>
                <v-switch
                  value
                  input-value="true"
                  @change="filter(filters.age, 4, markers)"
                >
                </v-switch>
              </v-flex>
          </v-layout>
        </v-container>
        <v-container
          class="locations"
          v-show="!drawers.mini && locationsSelected"
        >
          <ul
            v-for="location in locations"
            v-bind:key="location.name"
          >
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
  require('leaflet.markercluster.layersupport')
}

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  auth: false,
  data () {
    return {
      locations: [
        { name: 'Santiago', flag: require('~/assets/images/flags/cl.svg'), center: [-33.447487, -70.673676] },
        { name: 'Concepción', flag: require('~/assets/images/flags/cl.svg'), center: [-36.833333, -73.05] },
        { name: 'San Pedro de la Paz', flag: require('~/assets/images/flags/cl.svg'), center: [-36.833333, -73.116667] },
        { name: 'Bogotá', flag: require('~/assets/images/flags/co.svg'), center: [4.598889, -74.080833] },
        { name: 'Medellín', flag: require('~/assets/images/flags/co.svg'), center: [6.244747, -75.574828] },
        { name: 'Lagos', flag: require('~/assets/images/flags/ng.svg'), center: [6.455027, 3.384082] },
        { name: 'Cheltenham', flag: require('~/assets/images/flags/gb-eng.svg'), center: [51.896519, -2.078428] }
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
      filters: {
        score: ['R', 'Y', 'G'],
        sex: ['H', 'M', 'O'],
        ability: ['1', '2', '3'],
        age: [1, 2, 3, 4]
      },
      filtered: [],
      filtersSelected: true,
      locationsSelected: false,
      myPoints: false,
      allPoints: false
    }
  },
  mounted () {
    this.retrievePoints()
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

    // retrieves points from api and then loads map
    async retrievePoints () {
      await this.$axios.$get('/observed/?limit=250')
        .then((res) => {
          this.points = res.results
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
              }
            } else {
              for (let index = 0; index < coords.length; index++) {
                this.markers.push({
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
              }
            }
          })
          this.mAll = L.markerClusterGroup.layerSupport({
            disableClusteringAtZoom: 15,
            maxClusterRadius: 50
          })
          this.initMarkers(this.markers)
          if (this.loading === true) {
            this.loading = !this.loading
          }
        })
    },
    // sets marker color by score
    getColor (score) {
      let icoG = L.icon({ iconUrl: require('../assets/images/green.png'), iconSize: [15, 15] })
      let icoY = L.icon({ iconUrl: require('../assets/images/yellow.png'), iconSize: [15, 15] })
      let icoR = L.icon({ iconUrl: require('../assets/images/red.png'), iconSize: [15, 15] })
      if (score === 'R') {
        return icoR
      } else if (score === 'Y') {
        return icoY
      } else {
        return icoG
      }
    },

    // function that load markers in map and clusters them
    initMarkers (markersArray) {
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

    // popup format
    templatePopup (prop1, prop2, prop3, prop4, prop5, prop6) {
      let theDate = new Date(prop6).toLocaleString()
      return `
            <div class="el-popup">
              <div class="po-direccion">
                <p>Some Address</p>
              </div>
              <p>Observant: <span>` + prop1 + `</span></p>
              <p class="sujeto">Subject</p>
              <ul class="datos-sujeto">
                <li>
                  Sex:<span> ` + prop2 + `<span>
                </li>
                <li>
                  Age:<span> ` + prop3 + `<span>
                </li>
                <li>
                  Mobility disability:<span> ` + prop4 + `</span>
                </li>
                <li>
                  Category:<span> ` + prop5 + `</span>
                </li>
                <li>
                  Date:<span> ` + theDate + `</span>
                </li>
              </ul>
            </div>
          `
    },

    // filter engine
    filterEngine (array, filters) {
      var filterKeys = Object.keys(filters)
      return array.filter((item) => filterKeys.every((key) => (filters[key].indexOf(item[key]) !== -1)))
    },

    // unsets filtered marker group and load filtered markers
    filter (theArray, prop, parent) {
      this.mAll.clearLayers()
      if ((theArray.indexOf(prop)) >= 0) {
        theArray.splice(theArray.indexOf(prop), 1)
      } else {
        theArray.push(prop)
      }
      this.filtered = this.filterEngine(parent, this.filters)
      this.initMarkers(this.filtered)
      console.log(this.filtered)
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
    activateMyPoints () {
      if (this.myPoints === false && this.allPoints === false) {
        this.myPoints = true
        this.allPoints = true
        this.mAll.clearLayers()
      } else {
        this.myPoints = false
        this.allPoints = false
        this.loading = true
        this.mAll.clearLayers()
        this.retrievePoints()
      }
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
  padding: 0 !important
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
    height: unset
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
    padding: 20px
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
</style>
