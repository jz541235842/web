import Layout from '@/layout'

const i18n = {
  path: '/i18n',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/i18n/index'),
      name: 'I18n',
      meta: { title: 'i18n', icon: 'international' }
    }
  ]
}

export default i18n
