import price from './price.js'

export default {
  template: '#price-table',
  data: () => ({
    newLevel: '',
    newMin: '',
    newMax: '',
    newMoney: ''
  }),
  props: ['prices'],
  methods: {
    addPrice: function() {
      let newPrice = {
        level: parseFloat(this.newLevel),
        min: parseFloat(this.newMin),
        max: parseFloat(this.newMax),
        money: parseFloat(this.newMoney)
      }
      this.prices.push(newPrice)
      this.newLevel = ''
      this.newMin = ''
      this.newMax = ''
      this.newMoney = ''
    }
  },
  components: {
    'price': price
  }
}
