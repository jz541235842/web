// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { ITab } from './type'
export interface State {
  count: number
  collapse: boolean
  tabList: Array<ITab>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    collapse: false,
    tabList: []
  },
  mutations: {
    setCount(state: State, count: number) {
      state.count = count
    },
    // 设置打开收缩
    setCollapse(state: State, collapse: boolean) {
      console.log('666', collapse)
      state.collapse = collapse
    },
    // 添加tab
    setTab(state: State, tab: ITab) {
      //1.判断是否存在
      if (state.tabList.some((item) => item.path === tab.path)) {
        return
      }
      state.tabList.push(tab)
    }
  },
  getters: {
    getCount(state: State) {
      return state.count
    },
    getCollapse(state: State) {
      return state.collapse
    },
    getTab(state: State) {
      return state.tabList
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
