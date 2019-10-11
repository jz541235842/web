const demo = [{
  'path': '/',
  'component': 'Layout',
  'redirect': '/dashboard',
  'children': [{
    'path': 'dashboard',
    'component': 'views/dashboard/index',
    'name': 'Dashboard',
    'meta': {
      'title': 'dashboard',
      'icon': 'dashboard',
      'affix': true
    }
  }]
},
{
  'path': '/user',
  'component': 'Layout',
  'name': 'User',
  'meta': {
    'title': 'user',
    'icon': 'user'
  },
  'children': [
    {
      'path': 'query',
      'name': 'Query',
      'component': 'views/user/query',
      'meta': { 'title': 'query' }
    },
    {
      'path': 'communicate',
      'name': 'Communicate',
      'component': 'views/user/communicate',
      'meta': { 'title': 'userCommunicate' }
    },
    {
      'path': 'callRecord',
      'name': 'CallRecord',
      'component': 'views/user/callRecord',
      'meta': { 'title': 'callRecord' }
    }
  ]
},
{
  'path': '/wind',
  'component': 'Layout',
  'children': [
    {
      'path': 'one',
      'name': 'wind',
      'component': 'views/wind/index',
      'meta': { 'title': 'wind', 'icon': 'example' }
    }
  ]
},
{
  'path': '/letter',
  'component': 'Layout',
  'name': 'Letter',
  'meta': {
    'title': 'letter',
    'icon': 'skill'
  },
  'children': [
    {
      'path': 'all',
      'name': 'All',
      'component': 'views/letter/all/index',
      'meta': { 'title': 'all' }
    },
    {
      'path': 'manage',
      'component': 'views/letter/manage/index',
      'name': 'Manage',
      'meta': { 'title': 'manage' },
      'children': [
        {
          'path': 'manage-1',
          'component': 'views/letter/manage/manage-1/index',
          'name': 'Manage-1',
          'meta': { 'title': 'chushen' }
        },
        {
          'path': 'manage-2',
          'component': 'views/letter/manage/manage-2/index',
          'name': 'Manage-2',
          'meta': { 'title': 'fushen' }
        },
        {
          'path': 'manage-3',
          'component': 'views/letter/manage/manage-3/index',
          'name': 'Manage-3',
          'meta': { 'title': 'myshenpi' }
        }
      ]
    }
  ]
},
{
  'path': '/collection',
  'component': 'Layout',
  'name': 'Collection',
  'meta': {
    'title': 'collection',
    'icon': 'nested'
  },
  'children': [
    {
      'path': 'cases',
      'name': 'Cases',
      'component': 'views/collection/cases',
      'meta': { 'title': 'cases' }
    },
    {
      'path': 'casemanagement',
      'name': 'Casemanagement',
      'component': 'views/collection/casemanagement/index',
      'meta': { 'title': 'casemanagement' },
      'children': [
        {
          'path': 'casemanagement-1',
          'name': 'Casemanagement-1',
          'component': 'views/collection/casemanagement/casemanagement-1',
          'meta': { 'title': 'casemanagement-1' }
        },
        {
          'path': 'casemanagement-2',
          'name': 'Casemanagement-2',
          'component': 'views/collection/casemanagement/casemanagement-2',
          'meta': { 'title': 'casemanagement-2' }
        }
      ]
    }
  ]
},
{
  'path': '/data',
  'component': 'Layout',
  'meta': {
    'icon': 'chart'
  },
  'children': [
    {
      'path': 'one',
      'name': 'One',
      'component': 'views/data/one',
      'meta': { 'title': 'dataCenter' }
    }
  ]
},
{
  'path': '/configure',
  'component': 'Layout',
  'name': 'Configure',
  'meta': {
    'title': 'configCenter',
    'icon': 'clipboard'
  },
  'children': [
    {
      'path': 'rule',
      'name': 'Rule',
      'component': 'views/configure/rule',
      'meta': { 'title': 'rule' }
    },
    {
      'path': 'ruleConfig',
      'name': 'RuleConfig',
      'component': 'views/configure/ruleConfig',
      'meta': { 'title': 'ruleConfig' }
    },
    {
      'path': 'collectionTeam',
      'name': 'CollectionTeam',
      'component': 'views/configure/collectionTeam',
      'meta': { 'title': 'collectionTeam' }
    },
    {
      'path': 'shortMssage',
      'name': 'ShortMssage',
      'component': 'views/configure/shortMssage',
      'meta': { 'title': 'shortMssage' }
    }
  ]
},
{
  'path': '/permission',
  'component': 'Layout',
  'name': 'Permission',
  'meta': {
    'title': 'permission',
    'icon': 'lock'
  },
  'children': [
    {
      'path': 'page',
      'component': 'views/permission/page',
      'name': 'PagePermission',
      'meta': {
        'title': 'pagePermission'
      }
    },
    {
      'path': 'directive',
      'component': 'views/permission/directive',
      'name': 'DirectivePermission',
      'meta': {
        'title': 'directivePermission'
      }
    },
    {
      'path': 'roles',
      'component': 'views/permission/roles',
      'name': 'Roles',
      'meta': {
        'title': 'rolePermission'
      }
    },
    {
      'path': 'userManage',
      'component': 'views/permission/userManage',
      'name': 'UserManage',
      'meta': {
        'title': 'userManage'
      }
    }
  ]
}

]
export default demo
