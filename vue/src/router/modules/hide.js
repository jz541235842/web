import Layout from '@/layout'
const hide = [{
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
},

{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/user',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'systemMsg',
      name: 'SystemMsg',
      component: () => import('@/views/user/find/systemMsg'),
      meta: { title: 'systemMsg' },
      hidden: true
    },
    {
      path: 'userMsg/:id',
      name: 'UserMsg',
      component: () => import('@/views/user/find/userMsg/index'),
      meta: { title: 'userMsg' },
      hidden: true
    },
    {
      path: 'shortMsg',
      name: 'ShortMsg',
      component: () => import('@/views/user/find/shortMsg'),
      meta: { title: 'shortMsg' },
      hidden: true
    }
  ]
},

{
  path: '/approvalPage',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '/approvalPage',
      component: () => import('@/views/letter/manage/manage-4/approval/approvalPage'),
      name: 'ApprovalPage',
      meta: { title: 'shenpiPage' }
    }
  ]
},
{
  path: '/approvalRecord',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '/approvalRecord',
      component: () => import('@/views/letter/manage/manage-4/approval/approvalRecord'),
      name: 'ApprovalRecord',
      meta: { title: 'shenpiRecord' }
    }
  ]
},
{
  path: '/collection',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'casemanagement',
      component: () => import('@/views/collection/casemanagement/index'),
      meta: { title: 'casemanagement' },
      children: [
        {
          path: 'myCas/:id',
          name: 'MyCas',
          component: () => import('@/views/collection/myCases/myCas')
        },
        {
          path: 'record',
          name: 'Record',
          component: () => import('@/views/collection/myCases/record')
        }
      ]
    }
  ]
}
]
export default hide
