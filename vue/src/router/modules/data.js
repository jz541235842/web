import Layout from '@/layout'

const data = {
  path: '/data',
  component: Layout,
  meta: {
    icon: 'chart'
  },
  children: [
    {
      path: 'one',
      name: 'One',
      component: () => import('@/views/data/one'),
      meta: { title: 'dataCenter' }
    }
  ]
}

export default data
