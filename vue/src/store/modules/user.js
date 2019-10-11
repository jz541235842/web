import { login, logout, getRoute } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  setTokens: (state, token) => { // 用户令牌
    state.token = token
  },
  setAvatar: (state, avatar) => { // 用户头像
    state.avatar = avatar
  },
  setRoles: (state, roles) => { // 用户角色
    state.roles = roles
  }
}
// 第一步获取Token
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        const { data } = response
        commit('setTokens', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 第二部根据Token获取路由
  getRoute({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoute(state.token).then(response => {
        const { data } = response
        commit('setRoles', [state.token])
        commit('setAvatar', '')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('setTokens', '')
        commit('setRoles', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('setTokens', '')
      commit('setRoles', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
