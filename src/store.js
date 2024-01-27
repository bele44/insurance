import { createStore } from 'vuex';

export default createStore({
  state: {
    individualBenefitUuid: null,
    postData: {
      firstName: "",
      fatherName: "",
      grandFatherName: "",
      dateOfBirth: "",
      gender: "male",
      phoneNumber: "",
      covers: [],
      benefit: 0,
      premium: 0,
    },
  },
  mutations: {
    setIndividualBenefitUuid(state, uuid) {
      state.individualBenefitUuid = uuid;
    },
  },
});



