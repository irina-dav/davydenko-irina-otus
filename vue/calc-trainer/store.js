import Vue from 'vue'
import Vuex from 'vuex'
import {evaluate} from "mathjs";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    settings: {
      accuracy: 90,
      scoreDone: 14,
      scoreQnt: 25,
      dayNum: 20,
      duration: 5,
      complexity: 5,
      operations: {
        addition: true,
        subtraction: false,
        division: false,
        multiplication: false,
        power: false
      },
    },
    tasks: [
      {id: 0, full: "( 66 * 90 ) + ( 97 + ( 64 + 76 ) ) = 6177", quest: "( 66 * x ) + ( x + ( 64 + 76 ) ) = 6177", done: false},
      {id: 1, full: "( 67 * 91 ) - ( 99 + ( 5 + 5) ) = 5988", quest: "( x * 91 ) - ( 99 + ( x + 5 ) ) = 5988", done: false},
      {id: 2, full: "( 13 * 41 ) + ( 91 + ( 71 - 56 ) ) = 639", quest: "( x * 41 ) + ( x + ( 71 - 56 ) ) = 639", done: false},
      {id: 3, full: "(89 * 48) * (16 + 91) = 457104", quest: "( 89 * x ) * ( x + 91 ) = 457104", done: false},
      {id: 4, full: "(21 - 21) + (26 * 54) = 1404", quest: "( 21 - x ) + ( x * 54 ) = 1404", done: false},
      {id: 5, full: "(99 - 31) * (63 - ( 14 - 44) ) = 6324", quest: "( x - 31 ) * ( 63 - ( x - 44 ) ) = 6324", done: false},
      {id: 6, full: "(24 + 58) + (41 - ( 93 - 25) ) = 55", quest: "( 24 + x ) + ( 41 - ( x - 25 ) ) = 55", done: false},
      {id: 7, full: "91 + ( 25 - 43 ) = 73", quest: "91 + ( x - 43 ) = 73", done: false},
    ],
  },
  getters: {
    minId: state => {
      return state.tasks[0].id;
    },
    maxId: state => {
      return state.tasks[state.settings.duration - 1].id;
    },
    doneTasks: state => {
      return state.tasks.filter(t => t.done);
    },
    getTasksCount: state => {
      return state.tasks.length;
    },
    getDoneTasksCount: state => {
      return state.tasks.filter(t => t.done).length;
    },
    getTask: state => id => {
      return state.tasks.find(t => t.id === id);
    },
    checkExpression: state => expr => {
      return evaluate(expr.replace('=', '=='));
    },
  },
  actions: {
    setDone({commit, state}, id) {
      commit('setDone', id);
    },
    setSettings({commit, state}, newSettings) {
      commit('setSettings', newSettings)
    },
    startGame({commit, state}, newSettings) {
      commit('resetDoneAll');
      commit('shuffleTasks');
    }
  },
  mutations: {
    setDone(state, id) {
      let task = state.tasks.find(t => t.id === id);
      task.done = true;
    },
    setSettings(state, newSettings) {
      state.settings = {...state.settings, ...newSettings};
    },
    resetDoneAll(state) {
      state.tasks.forEach(t => t.done = false);
    },
    shuffleTasks(state) {
      for (let i = state.tasks.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [state.tasks[i], state.tasks[j]] = [state.tasks[j], state.tasks[i]];
      }
      state.tasks.forEach((t, idx) => t.id = idx);
    }
  }
})

export default store;