<script setup lang="ts">
import { computed, ref } from 'vue'
import { findPriceRow, formatMoney, priceOf, type PriceRow } from '../pricing'

const props = defineProps<{ prices: PriceRow[] }>()
const weights = defineModel<number[]>({ required: true })
const newWeight = ref('')

// Level and price follow the price table, so editing the table updates every mullet
const rows = computed(() =>
  weights.value.map((weight) => ({
    weight,
    level: findPriceRow(weight, props.prices)?.level,
    price: priceOf(weight, props.prices),
  })),
)
const totalWeight = computed(() => rows.value.reduce((sum, row) => sum + row.weight, 0))
const totalPrice = computed(() => rows.value.reduce((sum, row) => sum + row.price, 0))

function add() {
  weights.value.push(Number(newWeight.value))
  newWeight.value = ''
}
</script>

<template>
  <form class="row g-2 mb-3" @submit.prevent="add">
    <div class="col">
      <input v-model="newWeight" type="number" step="any" min="0" class="form-control" placeholder="重量(兩)" aria-label="重量(兩)" required />
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-success">新增</button>
    </div>
  </form>
  <div class="card table-responsive">
    <table class="table mb-0">
      <thead class="table-dark">
        <tr>
          <th>等級</th>
          <th>重量(兩)</th>
          <th>金額(元)</th>
          <th><span class="visually-hidden">刪除</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ row.level ?? '—' }}</td>
          <td>{{ row.weight }}</td>
          <td>{{ formatMoney(row.price) }}</td>
          <td class="text-end">
            <button type="button" class="btn-close" :aria-label="`刪除第 ${index + 1} 個`" @click="weights.splice(index, 1)"></button>
          </td>
        </tr>
      </tbody>
      <tfoot class="table-light fw-bold">
        <tr>
          <td>總計</td>
          <td data-testid="total-weight">{{ totalWeight }}</td>
          <td data-testid="total-price">{{ formatMoney(totalPrice) }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
