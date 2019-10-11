/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'
const letter = {
  path: '/letter',
  component: Layout,
  name: 'Letter',
  meta: {
    title: 'letter',
    icon: 'skill'
  },
  children: [
    {
      path: 'all',
      name: 'All',
      component: () => import('@/views/letter/all/index'),
      meta: { title: 'all' }
    },
    {
      path: 'manage',
      component: () => import('@/views/letter/manage/index'),
      name: 'Manage',
      meta: { title: 'manage' },
      children: [
        {
          path: 'manage-1',
          component: () => import('@/views/letter/manage/manage-1'),
          name: 'Manage-1',
          meta: { title: 'chushen' }
        },
        {
          path: 'manage-2',
          component: () => import('@/views/letter/manage/manage-2'),
          name: 'Manage-2',
          meta: { title: 'fushen' }
        },
        {
          path: 'manage-3',
          component: () => import('@/views/letter/manage/manage-3'),
          name: 'Manage-3',
          meta: { title: 'myshenpi' }
        }
      ]
    }
  ]
}
export default letter
