<script setup lang="ts">
import { ref } from 'vue'
import type { PriceRow } from './pricing'
import PriceTable from './components/PriceTable.vue'
import MulletTable from './components/MulletTable.vue'

const prices = ref<PriceRow[]>([])
const weights = ref<number[]>([])
</script>

<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <span class="navbar-brand mb-0 h1">烏魚子計算機</span>
    </div>
  </nav>
  <main>
    <section class="container my-4">
      <h1 class="text-center">價目表</h1>
      <PriceTable v-model="prices" />
    </section>
    <hr />
    <section class="container my-4">
      <h1 class="text-center">烏魚子</h1>
      <MulletTable v-model="weights" :prices="prices" />
    </section>
  </main>
</template>
