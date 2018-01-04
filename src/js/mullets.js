import mullet from './mullet.js'

export default {
  template: '#mullets',
  data: () => ({
    newWeight: ''
  }),
  props: ['mullets', 'prices'],
  methods: {
    addMullet: function() {
      let newMullet = {
        level: 0,
        weight: parseFloat(this.newWeight),
        price: 0
      }
      this.mullets.push(newMullet)
      this.newWeight = ''
    }
  },
  computed: {
    totalPrice: function() {
      return this.mullets.map((m) => m.price)
        .reduce((sum, n) => (sum + n), 0)
    },
    totalWeight: function() {
      return this.mullets.map((m) => m.weight)
        .reduce((sum, n) => (sum + n), 0)
    }
  },
  components: {
    'mullet': mullet
  }
}
