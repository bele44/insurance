<template>
 
     <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" v-if="isModalOpen">
    <div class="modal-content">
    <div class="mb-4  ">
    <label for="addFamilyMember" class="font-serif  text-2xl font-semibold mb-2 text-black font">Add Your Family Members here:</label>
    <div class="grid grid-cols-2 gap-4">
     <div>
    <input
      v-model="familyMemberData.newFamilyMemberName"
      id="newFamilyMemberFirstName"
      type="text"
      placeholder=" Family member name"
      class="bg-white px-3 py-2 border rounded-md w-60 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 font-serif"
    />
</div>
<div>
    <input
      v-model="familyMemberData.newFamilyMemberFatherName"
      id="newFamilyMemberFatherName"
      type="text"
      placeholder="Fathername"
      class="bg-white px-3 py-2 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 font-serif"
    />
</div>
<div>
    <input
      v-model="familyMemberData.newFamilyMemberGrandFatherName"
      id="newFamilyMemberGrandFatherName"
      type="text"
      placeholder="Grand father"
      class="bg-white px-3 py-2 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 font-serif"
    />
</div>
<div>
    
    <input
      v-model="familyMemberData.newFamilyMemberPhoneNumber"
      id="newFamilyMemberPhoneNumber"
      type="text"
      placeholder="Phonenumber"
      class="bg-white px-3 py-2 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 font-serif"
    />
</div>
<div>
    <select v-model="familyMemberData.relationShip" id="newFamilyMemberRelationShip" class="bg-white px-3 py-3 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 font-serif">
          <option value= "child">Child</option>
          <option value= "spous">Spous</option>
         >
        </select>
    </div>
    <div>
    <input v-model="familyMemberData.newFamilyMemberDateOfBirth" id="dateOfBirth" type="date"
      class="bg-white px-3 py-2 border rounded-md w-56 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 font-serif" />
    </div>  
    <div>
    <select v-model="familyMemberData.newFamilyMemberGender" id="addFamilyMemberGender" class="w-56 p-2 border rounded-md m-2 ml-3">
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
</div>
<div></div>
   
  </div>
  
  <div class=" flex flex-col items-center pt-6">
    <div class="grid grid-cols-2 gap-4">
    <button @click="addFamilyMember" class=" px-4 py-2 bg-blue-500  hover:bg-blue-800 text-black rounded-md w-40 font-serif font-bold">
      Save
    </button>

    <button @click="closeModal" class="bg-red-200 rounded-lg hover:bg-red-800">Cancel</button>
</div>
</div>
</div>
</div>
</div>
</template>
<script>
export default{
    props: {
    isModalOpen: Boolean,
    
  },
    data() {
    return {
        familyMemberData:{
        newFamilyMemberName: "",
      newFamilyMemberFatherName: "",
      newFamilyMemberGrandFatherName: "",
      newFamilyMemberDateOfBirth: "",
      newFamilyMemberGender:"Male",
      newFamilyMemberPhoneNumber:"",
      isUpdateModalOpen: false,
      relationShip:"child",
      
        } 
    };
},
methods: {
    addFamilyMember() {
      
      this.$emit('add-family-member', this.familyMemberData);
      this.closeModal();
      this.familyMemberData.newFamilyMemberName = "";
      this.familyMemberData.newFamilyMemberFatherName = "";
      this.familyMemberData.newFamilyMemberGrandFatherName = "";
      
      this.familyMemberData.newFamilyMemberDateOfBirth = "";
      
      this.familyMemberData.newFamilyMemberPhoneNumber = "";
    },
    closeModal() {
      
      this.$emit('close-modal');
    },
  },
}
</script>
<style scoped>
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 600px;
  width: 100%;
  
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}
</style>