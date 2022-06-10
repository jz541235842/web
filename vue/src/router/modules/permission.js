/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const permission = {
  path: '/permission',
  component: Layout,
  name: 'Permission',
  meta: {
    title: 'permission',
    icon: 'lock'
  },
  children: [
    {
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'PagePermission',
      meta: {
        title: 'pagePermission'
      }
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'DirectivePermission',
      meta: {
        title: 'directivePermission'
      }
    },
    {
      path: 'roles',
      component: () => import('@/views/permission/roles'),
      name: 'Roles',
      meta: {
        title: 'rolePermission'
      }
    },
    {
      path: 'userManage',
      component: () => import('@/views/permission/userManage'),
      name: 'UserManage',
      meta: {
        title: 'userManage'
      }
    }
  ]
}
export default permission
