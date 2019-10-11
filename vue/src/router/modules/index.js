import Layout from '@/layout'

const index = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', affix: true }
    }
  ]
}

export default index
