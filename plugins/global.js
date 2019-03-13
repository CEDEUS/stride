import Vue from 'vue'
let L = null
if (process.client) {
  L = require('leaflet')
  require('leaflet.markercluster')
}

Vue.mixin({
  methods: {
    // set marker's icon depending on point's score
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
    // filter engine
    filterEngine (array, filters) {
      var filterKeys = Object.keys(filters)
      return array.filter((item) => filterKeys.every((key) => (filters[key].indexOf(item[key]) !== -1)))
    },
    // unsets filtered marker group and load filtered markers
    filterOk (theArray, prop, parent, clear) {
      clear.clearLayers()
      if ((theArray.indexOf(prop)) >= 0) {
        theArray.splice(theArray.indexOf(prop), 1)
      } else {
        theArray.push(prop)
      }
      this.filtered = this.filterEngine(parent, this.filters)
      this.initMarkers(this.filtered)
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
    }
  }
})
