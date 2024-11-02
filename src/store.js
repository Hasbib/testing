import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      authToken: '',
      user: {
        name: '',
        role: '',
        email: ''
      },
      isLoggedIn: '',
    };
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
      state.isLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user.name = user.name;
      state.user.role = user.role;
      state.user.email = user.email;
    },
    logout(state) {
      state.authToken = '';
      state.user = { name: '', role: '', email: '' };
      state.isLoggedIn = false;
    },
    clearUser(state) {
      state.user = { name: '', role: '', email: '' };
    },
  },
  actions: {
    login({ commit }, { email, password, role, remember_me }) {
      return axios.post('/login', { email, password, role, remember_me })
        .then((response) => {
          const token = response.data.token;
          const currentTime = new Date().getTime();
          const oneDay = 24 * 60 * 60 * 1000;
          const twoDays = 2 * 24 * 60 * 60 * 1000;
          
          // Tentukan masa berlaku token berdasarkan remember_me
          const expiration = remember_me ? currentTime + twoDays : currentTime + oneDay;

          localStorage.setItem('token', token); // Simpan token di localStorage
          localStorage.setItem('userExpiration', expiration); // Simpan waktu kedaluwarsa token
          localStorage.setItem('rememberMe', remember_me); // Simpan pilihan remember_me
          
          commit('setAuthToken', token);        // Simpan token di Vuex state
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return axios.get('/user');            // Ambil data user setelah login
        })
        .then((response) => {
          const user = response.data.user;
          localStorage.setItem('user', JSON.stringify(user)); // Simpan data user di localStorage
          commit('setUser', user); // Simpan data user di Vuex state
        })
        .catch((error) => {
          throw error;
        });
    },
    fetchUser({ commit, dispatch }) {
      const token = localStorage.getItem('token');
      if (token) {
        const user = JSON.parse(localStorage.getItem('user'));
        const userExpiration = localStorage.getItem('userExpiration');
        const currentTime = new Date().getTime();

        if (user && userExpiration) {
          if (currentTime < userExpiration) {
            // Jika data user masih valid, set user di Vuex
            commit('setAuthToken', token);
            commit('setUser', user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            // Jika data user kadaluwarsa, panggil logout otomatis
            dispatch('logout');
          }
        }
      }
    },
    logout({ commit }) {
      const token = localStorage.getItem('token');
      
      // Panggil API /logout sebelum melakukan logout di front-end
      return axios.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          // Hapus token dan data user dari localStorage dan Vuex setelah sukses logout
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userExpiration');
          localStorage.removeItem('rememberMe');
          delete axios.defaults.headers.common['Authorization'];
          commit('logout');
        })
        .catch((error) => {
          console.error('Error during logout:', error);
          // Tetap hapus token dan data user meskipun gagal memanggil API logout
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userExpiration');
          localStorage.removeItem('rememberMe');
          delete axios.defaults.headers.common['Authorization'];
          commit('logout');
        });
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
  },
});

export default store;
