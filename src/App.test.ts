import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

async function fill(wrapper: ReturnType<typeof mount>, label: string, value: string) {
  await wrapper.find(`input[aria-label="${label}"]`).setValue(value)
}

describe('App', () => {
  it('prices mullets with the price table and updates when the table changes', async () => {
    const wrapper = mount(App)
    const [priceForm, mulletForm] = wrapper.findAll('form')

    await fill(wrapper, '等級', '1')
    await fill(wrapper, '最小重量(兩)', '0')
    await fill(wrapper, '最大重量(兩)', '6')
    await fill(wrapper, '價格(元/斤)', '1600')
    await priceForm.trigger('submit')

    await fill(wrapper, '重量(兩)', '5')
    await mulletForm.trigger('submit')
    await fill(wrapper, '重量(兩)', '8')
    await mulletForm.trigger('submit')

    expect(wrapper.get('[data-testid="total-weight"]').text()).toBe('13')
    // Only the 5-tael mullet is in range: 1600 * 5 / 16 = 500
    expect(wrapper.get('[data-testid="total-price"]').text()).toBe('500')

    await wrapper.get('button[aria-label="刪除等級 1"]').trigger('click')
    expect(wrapper.get('[data-testid="total-price"]').text()).toBe('0')
  })

  it('clears the form after adding', async () => {
    const wrapper = mount(App)
    await fill(wrapper, '重量(兩)', '5')
    await wrapper.findAll('form')[1].trigger('submit')
    expect((wrapper.get('input[aria-label="重量(兩)"]').element as HTMLInputElement).value).toBe('')
  })
})
