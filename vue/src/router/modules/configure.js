import Layout from '@/layout'

const configure = {
  path: '/configure',
  component: Layout,
  name: 'Configure',
  meta: {
    title: 'configCenter',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'rule',
      name: 'Rule',
      component: () => import('@/views/configure/rule'),
      meta: { title: 'rule' }
    },
    {
      path: 'ruleConfig',
      name: 'RuleConfig',
      component: () => import('@/views/configure/ruleConfig'),
      meta: { title: 'ruleConfig' }
    },
    {
      path: 'collectionTeam',
      name: 'CollectionTeam',
      component: () => import('@/views/configure/collectionTeam'),
      meta: { title: 'collectionTeam' }
    },
    {
      path: 'shortMssage',
      name: 'ShortMssage',
      component: () => import('@/views/configure/shortMssage'),
      meta: { title: 'shortMssage' }
    },
    {
      path: 'productLog',
      name: 'ProductLog',
      component: () => import('@/views/configure/journal/productLog')
    },
    {
      path: 'groupList',
      name: 'GroupList',
      component: () => import('@/views/configure/journal/groupList')
    },
    {
      path: 'massageLog',
      name: 'MassageLog',
      component: () => import('@/views/configure/journal/massageLog')
    }
  ]
}

export default configure
