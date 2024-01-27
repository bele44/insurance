<!-- UpdateFormModal.vue -->

<template>
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-container ">
        <h2 class="text-2xl font-bold mb-4 font-serif">Update Your Family Member</h2>
        <form @submit.prevent="updateFamilyMember">
          <!-- Your form fields for updating a family member -->
          <div class="grid grid-cols-2 gap-4">
      
        <div>
      <input
        v-model="name"
        id="name"
        type="text"
        placeholder=" Family member name"
        class="bg-white px-3 py-2 border rounded-md w-60 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />
    </div>
    <div>
      <input
        v-model="fatherName"
        id="fatherName"
        type="text"
        placeholder="Fathername"
        class="bg-white px-3 py-2 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />
    </div>
    <div>
      <input
        v-model="grandFatherName"
        id="grandFatherName"
        type="text"
        placeholder="Grand father"
        class="bg-white px-3 py-2 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />
    </div>
      <div>
      <input
        v-model="phoneNumber"
        id="phoneNumber"
        type="text"
        placeholder="Phonenumber"
        class="bg-white px-3 py-2 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />
    </div>
    <div>
      <select v-model="relationShip" id="newFamilyMemberRelationShip" class="bg-white px-3 py-2 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 font-serif">
          <option value= "child">Child</option>
          <option value= "spous">Spous</option>
         >
        </select>
      </div>
      <div>
      <input v-model="dateOfBirth" id="dateOfBirth" type="date"
        class="bg-white px-3 py-2 border rounded-md w-56 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
      </div>
      <div>  
      <select v-model="gender" id="gender" class="w-56 p-2 border rounded-md m-2 ml-3">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div> 
  </div> 
          
           <div class="ml-40 p-6">
            <button type="submit" class="p-2 bg-blue-300 hover:bg-blue-950 rounded-xl h-20 w-20 font-serif font-bold">save</button>
            <button @click="closeModal" class="p-2 bg-red-300 hover:bg-red-900 w-20 h-20 ml-6 rounded-lg font-serif font-bold">cancel</button>
           </div>
          
        </form>
      </div>
    </div>
  </template>
 


<script>
export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    selectedFamilyMember: {
      type: Object,
      required: true,
    },
    updateFamilyMember: {
      type: Function,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      name: null,
      fatherName: null,
        grandFatherName: null,
        dateOfBirth: null,
        gender: null,
        phoneNumber: null,
        relationShip: null,
    };
  },
  watch: {
    selectedFamilyMember: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.initializeFormFields(newVal);
        }
      },
    },
  },
  methods: {
    initializeFormFields(familyMember) {
      this.name = familyMember.firstName;
        this.fatherName = familyMember.fatherName;
        this.grandFatherName = familyMember.grandFatherName;
        this.dateOfBirth = familyMember.dateOfBirth;
       this. gender = familyMember.gender;
        this.phoneNumber = familyMember.phoneNumber;
        this.relationShip = familyMember.relationShip;
    },
    updateFamilyMember() {
      // Create an object with the updated data
      const updatedData = {
        firstName: this.name,
        fatherName:this.fatherName,
        grandFatherName: this.grandFatherName,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender ,
       phoneNumber: this.phoneNumber,
        relationShip:this.relationShip,
      };

      // Emit the updated data to the parent component
      this.$emit("updateFamilyMember", updatedData);
    },
  },
};
</script>


  
  <style scoped>
  /* Add styles for the modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-container {
    background: #F0FFFF;
    padding: 20px;
    border-radius: 8px;
  }
  .modal-container input,
.modal-container select {
  color: black;
}
  /* Add any additional styles as needed */
  </style>
  