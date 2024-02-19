// store.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    postData: {
      firstName: "",
      fatherName: "",
      grandFatherName: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      covers: [],
      benefit: 0,
      premium: 0,
    },
  },
  mutations: {
    updatePostData(state, newData) {
      
      Object.assign(state.postData, newData);
    },
  },
  actions: {
    
  },
});




