export default {
  template: '#mullet',
  props: ['level', 'weight', 'price', 'prices'],
  computed: {
    currentLevel: function() {
      var level = null
      const weight = this.weight
      this.prices.forEach(function(n) {
        if ((weight >= n.min) && (weight < n.max)) {
          level = n.level
        }
      })
      return level
    },
    currentPrice: function() {
      var price = 0
      const weight = this.weight
      this.prices.forEach(function(n) {
        if ((weight >= n.min) && (weight < n.max)) {
          price = n.money
        }
      })
      return (price * weight / 16)
    }
  },
  methods: {
    updateLevel: function() {
      this.$emit('update:level', this.currentLevel)
    },
    updatePrice: function() {
      this.$emit('update:price', this.currentPrice)
    }
  },
  mounted: function() {
    this.updateLevel()
    this.updatePrice()
  },
  watch: {
    currentLevel: function() {
      this.updateLevel()
    },
    currentPrice: function() {
      this.updatePrice()
    }
  }
}
