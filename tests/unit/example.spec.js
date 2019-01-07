import { shallowMount } from '@vue/test-utils'
import Pagination from '@/components/Pagination/index.vue'

describe('index.vue', () => {
  it('renders props.msg when passed', () => {
    const total = 100
    const wrapper = shallowMount(Pagination, {
      propsData: { total }
    })
    expect(wrapper.text()).toMatch(total)
  })
})
