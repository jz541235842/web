import Layout from '@/layout'

const wind = {
  path: '/wind',
  component: Layout,
  meta: {
    icon: 'example'
  },
  children: [
    {
      path: 'one',
      name: 'wind',
      component: () => import('@/views/wind/index'),
      meta: { title: 'wind' }
    }
  ]
}

export default wind
