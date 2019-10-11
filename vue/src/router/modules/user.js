import Layout from '@/layout'

const user = {
  path: '/user',
  component: Layout,
  name: 'User',
  meta: {
    title: 'user',
    icon: 'user'
  },
  children: [
    {
      path: 'query',
      name: 'Query',
      component: () => import('@/views/user/query'),
      meta: { title: 'query' }
    },
    {
      path: 'communicate',
      name: 'Communicate',
      component: () => import('@/views/user/communicate'),
      meta: { title: 'userCommunicate' }
    },
    {
      path: 'callRecord',
      name: 'CallRecord',
      component: () => import('@/views/user/callRecord'),
      meta: { title: 'callRecord' }
    }
  ]
}

export default user
