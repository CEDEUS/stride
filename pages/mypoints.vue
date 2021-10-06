<template>
  <v-layout>
    <v-flex id="myMap"></v-flex>
  </v-layout>
</template>

<script>
let L = null
if (process.client) {
  L = require('leaflet')
  require('leaflet.markercluster')
}

export default {
  data () {
    return {
      myMap: null,
      tile: null,
      mAll: null,
      ids: [],
      points: null,
      toDelete: null,
      error: false
    }
  },
  mounted () {
    this.clusterConfig()
    this.initMap()
  },
  methods: {
    initMap () {
      this.myMap = L.map('myMap').setView([-33.447487, -70.673676], 12)
      this.tileLayer = L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          id: 'mapbox/light-v10',
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/"">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          accessToken: 'pk.eyJ1IjoiZGZsb3JlcyIsImEiOiJjamF3OW41eWo1dWNhMzNvMmdsZ2kwOGNqIn0.vCIE-w4QPcFWpkEEYb3R-A'
        }
      )
      this.tileLayer.addTo(this.myMap)
    },
    clusterConfig () {
      this.mAll = L.markerClusterGroup({
        disableClusteringAtZoom: 15,
        maxClusterRadius: 50
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

.container,
.layout
  padding: 0
  height: 100% !important
#myMap
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
</style>
