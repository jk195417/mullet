<script setup lang="ts">
import { reactive } from 'vue'
import type { PriceRow } from '../pricing'

const prices = defineModel<PriceRow[]>({ required: true })
const form = reactive({ level: '', min: '', max: '', money: '' })

function add() {
  prices.value.push({
    level: Number(form.level),
    min: Number(form.min),
    max: Number(form.max),
    money: Number(form.money),
  })
  Object.assign(form, { level: '', min: '', max: '', money: '' })
}
</script>

<template>
  <form class="row g-2 mb-3" @submit.prevent="add">
    <div class="col-6 col-md">
      <input v-model="form.level" type="number" class="form-control" placeholder="等級" aria-label="等級" required />
    </div>
    <div class="col-6 col-md">
      <input v-model="form.min" type="number" step="any" min="0" class="form-control" placeholder="最小重量(兩)" aria-label="最小重量(兩)" required />
    </div>
    <div class="col-6 col-md">
      <input
        v-model="form.max"
        type="number"
        step="any"
        :min="form.min || 0"
        class="form-control"
        placeholder="最大重量(兩)"
        aria-label="最大重量(兩)"
        required
      />
    </div>
    <div class="col-6 col-md">
      <input v-model="form.money" type="number" step="any" min="0" class="form-control" placeholder="價格(元/斤)" aria-label="價格(元/斤)" required />
    </div>
    <div class="col-12 col-md-auto">
      <button type="submit" class="btn btn-success w-100">新增</button>
    </div>
  </form>
  <div class="card table-responsive">
    <table class="table mb-0">
      <thead class="table-dark">
        <tr>
          <th>等級</th>
          <th>重量範圍(兩)</th>
          <th>價格(元/斤)</th>
          <th><span class="visually-hidden">刪除</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in prices" :key="index">
          <td>{{ row.level }}</td>
          <td>{{ row.min }} ~ {{ row.max }}</td>
          <td>{{ row.money }}</td>
          <td class="text-end">
            <button type="button" class="btn-close" :aria-label="`刪除等級 ${row.level}`" @click="prices.splice(index, 1)"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
