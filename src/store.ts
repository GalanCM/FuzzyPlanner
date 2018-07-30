import Vue from "vue";
import Vuex from "vuex";
import { RootState, TaskData } from "@/types";

Vue.use(Vuex);

const state: RootState = {
  tasks: [
    {
      id: 0,
      description: "First Task",
      date: new Date(),
      order: 1,
      done: false
    },
    {
      id: 1,
      description: "Second Task",
      date: new Date(),
      order: 1,
      done: true
    }
  ]
};

const getTasksByDate = (state_: RootState, date: Date) => {
  console.log(state_.tasks.filter((task: TaskData) => task.date.toDateString() === date.toDateString()));
  return state_.tasks.filter((task: TaskData) => task.date.toDateString() === date.toDateString()).sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
      return -1;
    } else {
      return 0;
    }
  });
};

const getters = {
  getTasksByDate: (state_: RootState) => (date: Date) => {
    return getTasksByDate(state_, date);
  },
  getTodaysTasks: (state_: RootState) => {
    let date = new Date(Date.now());
    return getTasksByDate(state_, date);
  },
  getTomorrowsTasks: (state_: RootState) => {
    let date = new Date(Date.now());
    date.setDate(date.getDate() + 1);
    return getTasksByDate(state_, date);
  },
  getNextDaysTasks: (state_: RootState) => {
    let date = new Date(Date.now());
    date.setDate(date.getDate() + 2);
    return getTasksByDate(state_, date);
  }
};

const mutations = {
  updateTask(state_: RootState, updatedTask: TaskData) {
    if (updatedTask.id === undefined) {
      updatedTask.id = window.performance.now() + Math.random();
      state_.tasks.push(updatedTask);
    } else {
      let storedTask = state_.tasks.find((task) => task.id === updatedTask.id);
      storedTask = { ...storedTask, ...updatedTask };
    }
  }
};

const store = {
  state,
  getters,
  mutations,
  actions: {}
};

export default new Vuex.Store(store);
