import Layout from '@/layout'

const collection = {
  path: '/collection',
  component: Layout,
  name: 'Collection',
  redirect: {
    name: 'Cases'
  },
  meta: {
    title: 'collection',
    icon: 'nested'
  },
  children: [
    {
      path: 'cases',
      name: 'Cases',
      component: () => import('@/views/collection/cases'),
      meta: { title: 'cases' }
    },
    {
      path: 'casemanagement',
      name: 'Casemanagement',
      component: () => import('@/views/collection/casemanagement/index'),
      meta: { title: 'casemanagement' },
      redirect: {
        name: 'Casemanagement-1'
      },
      children: [
        {
          path: 'casemanagement-1',
          name: 'Casemanagement-1',
          component: () => import('@/views/collection/casemanagement/casemanagement-1'),
          meta: { title: 'casemanagement-1' }
        },
        {
          path: 'casemanagement-2',
          name: 'Casemanagement-2',
          component: () => import('@/views/collection/casemanagement/casemanagement-2'),
          meta: { title: 'casemanagement-2' }
        },
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
export default collection
