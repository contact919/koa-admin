import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import { getToken, getMgr } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    token: getToken(),
    mgr: {
      id: getMgr() ? getMgr().id : null,
      name: getMgr() ? getMgr().username : null,
      avatar: getMgr() ? getMgr().avatar : null
    }
  },
  getters: {
    sidebar: state => state.sidebar,
    device: state => state.device,
    token: state => state.token,
    mgr: state => state.mgr
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_MGR: (state, mgr) => {
      state.mgr.id = mgr.id
      state.mgr.name = mgr.username
      state.mgr.avatar = mgr.avatar
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    SetToken: ({ commit }, token) => {
      commit('SET_TOKEN', token)
    },
    SetMgr: ( { commit }, mgr) => {
      commit('SET_MGR', mgr)
    },
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
})
