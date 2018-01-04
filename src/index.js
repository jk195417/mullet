// import js
import $ from 'jquery/dist/jquery.js'
import Popper from 'popper.js/dist/esm/popper.js'
require('bootstrap')
import Vue from 'vue/dist/vue.esm.js'

// import css
import './css/main.scss'

// js code
// vue
import priceTable from './js/price_table.js'
import mullets from './js/mullets.js'
const app = new Vue({
  el: '#app',
  data: {
    prices: [],
    mullets: []
  },
  components: {
    'price-table': priceTable,
    'mullets': mullets
  }
})
