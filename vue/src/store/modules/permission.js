// import Layout from '@/layout'
// import index from '@/router/modules'
// import wind from '@/router/modules/wind'
// import letter from '@/router/modules/letter'
// import user from '@/router/modules/user'
// import collection from '@/router/modules/collection'
// import data from '@/router/modules/data'
// import configure from '@/router/modules/configure'
// import permission from '@/router/modules/permission'
// import i18n from '@/router/modules/i18n'
import { filterAsyncRouter } from '@/utils/filterAsyncRouter'
import demo from '@/router/modules/test'
// console.log(filterAsyncRouter)
// console.log(demo)
export default {
  namespaced: true,
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = routes
    }
  },
  actions: {
    generateRoutes({ commit }, route) {
      return new Promise(resolve => {
        // const accessedRoutes = [
        //   index,
        //   user,
        //   wind,
        //   letter,
        //   collection,
        //   data,
        //   configure,
        //   permission,
        //   i18n
        // ]
        const accessedRoutes = filterAsyncRouter(demo)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
