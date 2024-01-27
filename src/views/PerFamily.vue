<template>
  <MyHeader />
  <div class="bg-gray-100 min-h-screen md:pt-56 lg:pt-28">
    <div class="grid grid-cols-1 md:grid-cols-2 ">
      <div class="md:ml-4">
        <TypeHealth />
      </div>
      <div class="md:ml-4 md:mr-4">
        <h1 class="text-3xl font-bold m-4 md:ml-0 mb-0 font-serif"> Family Cover</h1>
        <div class="flex items-center justify-end m-4">
          <div class="relative">
            <input v-model="searchFilter" @input="handleSearchFilter" placeholder="Search"
              class="bg-red-950 px-3 text-white py-2 pl-10 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            <!-- Use FontAwesome icon as a background image -->
            <i class="fas fa-search text-2xl ml absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto p-6 bg-gray-200 shadow-md rounded-md w-auto">
     
      <div class="grid-cols-1 lg:grid-cols-2 gap-10 pl-8">
      <div class="mb-4  ">
        <label for="familySize" class=" font-serif text-lg font-semibold mb-2 text-black">Family Size:</label>
        <select v-model="familySize" id="familySize" class="w-48 p-2 border rounded-md">
          <option value= 1>Self+1</option>
          <option value= 2>Self+2</option>
          <option value= 3>Self+3</option>
          <option value= 4>Self+4</option>
          <option value= 5>Self+5</option>
          <option value= 6>Self+6</option>
        </select>
     
      <label for="addFamilyMember" class=" ml-6 font-serif  text-lg font-semibold mb-2 text-black font">Add Family Members:</label>
      <button @click="openAddFamilyMemberModal" class=" p-10 text-black font-serif bg-blue-500 font-semibold px-4 py-2 rounded-xl mt-4">
        <i class="fas fa-plus text-2xl text-white"></i>
  </button>
  </div>
</div>
<div v-if="errorMessage" class="text-red-500 mt-2 font-serif text-lg">{{ errorMessage }}</div>

<div class="overflow-x-auto">
  <table class="table-auto w-full bg-white border m-4 border-gray-300 shadow-md">
    <thead class="bg-blue-200 font-serif">
      <tr>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">S.n</th>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">Name</th>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">FatherName</th>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">GrandFatherName</th>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">BirthDate</th>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">Gender</th>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">PhoneNumber</th>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">RelationShip</th>
        <th class="px-2 py-1 border text-sm md:text-base lg:text-lg">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(member, index) in familyMembers" :key="index" class="hover:bg-gray-100">
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ index + 1 }}</td>
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.firstName }}</td>
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.fatherName }}</td>
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.grandFatherName }}</td>
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.dateOfBirth }}</td>
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.gender }}</td>
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.phoneNumber }}</td>
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.relationShip }}</td>
        <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">
          <!-- Update Button -->
          <div grid grid-cols-1>

            <button @click="openUpdateModal(index)" class="bg-blue-500 text-white  px-1 md:px-2 py-1 md:py-2 rounded-md mr-4 md:mr-2 ml-1 md:ml-2">
              Update
            </button>

            <!-- Delete Button -->

            <button @click="deleteFamilyMember(index)" class="bg-red-500 text-white px-1 md:px-2 py-1 md:py-2 rounded-md pl-1 md:ml-2">
              Delete
            </button>

          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<UpdateFormModal
    :isModalOpen="isUpdateModalOpen"
    :selectedFamilyMember="familyMembers[updateModalIndex]"
    @update-family-member="handleUpdateFamilyMember"
    :closeModal="closeUpdateModal"
  />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="text-4xl font-semibold w-auto m-4  p-4 text-black ml-72 font-serif"> Choose Cover Type</div>
        <div class="bg-gray-200 w-auto m-4  p-4">
          <label class="block text-md font-bold text-gray-600">


            <span class="text-4xl">Total Premium: {{ calculateTotalPremium() }} Birr/Month</span>

          </label>
        </div>
      </div>

      <!-- Display each category type in a separate card -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-lg m-4 ">
       
        <div v-for="category in filteredCategories" :key="category.packageCategory" 
           class="bg-white rounded-lg overflow-hidden shadow-md">
      
        

          <div class="text-xl font-bold ml-10 mt-6 font-serif"> {{ category.packageCategory }}</div>

          <!-- Add the new loop for displaying package names -->
          <div v-for="pack in category.packages" :key="pack.packageUuid" class="p-2 ml-2 text-lg font-semibold">
            <input type="radio" v-model="selectedPackage[category.packageCategory]" :value="pack.packageUuid">

            <label class="ml-2">{{ pack.packageName }}</label>
          </div>
          <div class="ml-6">
           <!-- Only show the slider if a radio button is selected -->
          <template v-if="selectedPackage[category.packageCategory]">
                <input type="range" v-model="category.value" :min="category.minLimit" :max="category.maxLimit"
                @input="onSliderChange(category)" />
                <span class="">{{ category.value }}</span>
              </template>
          </div>
          
            
          <!-- Add an input field for each category -->
          <div class="grid grid-cols-1 md:grid-cols-2 mt-4">
            <div class="bg-gray-500 w-auto m-4 p-4">
              <div class="pl-2px ml-4 p-4px  text-black font-semibold">Enter Annual Cover Amount</div>
              <input type="number" v-model="category.value" :min="category.minLimit" :max="category.maxLimit"
                id="sliderInput" @input="inputValueChanged()"
                class="ml-2 text-center border h-10 border-gray-300 rounded-md w-auto" />

            </div>
            <!-- per month premium -->
            <div class="bg-gray-500 w-auto m-4 p-4">
              <label class="block text-md font-bold">
                <h1 class="text-4xl">Premium: {{ calculateAnnualPremium(category) }} Birr/month</h1>
              </label>
            </div>
          </div>
        </div>
        <!-- Add an input field for the user's  -->
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 font-serif">
           
            <h1 class="text-2xl font-bold m-6  text-blue-950  p-6 border rounded-lg">Please Register Here</h1>
               <span></span>
            <div class="mb-4">
              <label for="userName" class="text-lg font-semibold mb-2 text-black">FirstName:</label>
              <input v-model="firstName" id="firstName" type="text" placeholder="Enter your name"
              class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
            <div class="mb-4">
              <label for="fatherName" class="text-lg font-semibold mb-2 text-black">Father's Name:</label>
              <input v-model="fatherName" id="fatherName" type="text" placeholder="Enter father's name"
                class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
  
            <div class="mb-4">
              <label for="grandFatherName" class="text-lg font-semibold mb-2 text-black">Grandfather's Name:</label>
              <input v-model="grandFatherName" id="grandFatherName" type="text" placeholder="Enter grandfather's name"
                class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
  
            <div class="mb-4">
              <label for="dateOfBirth" class="text-lg font-semibold mb-2 text-black">Date of Birth:</label>
              <input v-model="dateOfBirth" id="dateOfBirth" type="date"
                class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
  
            <div class="mb-4">
              <label for="gender" class="text-lg font-semibold mb-2 text-black">Gender:</label>
              <select v-model="gender" id="gender"
                class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
  
            <div class="mb-4">
              <label for="phoneNumber" class="text-lg font-semibold mb-2 text-black">Phone Number:</label>
              <input v-model="phoneNumber" id="phoneNumber" type="tel" placeholder="Enter phone number"
                class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
          </div>
      
     
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="m-20 ">
          <button @click="submitData" class="bg-blue-500 text-white font-bold py-5  px-6 rounded-2xl hover:bg-blue-950 ">
            Submit
          </button>
        </div>
        <div class="w-1/2  m-4  p-4 mb-10">
          <label class="block text-md font-bold text-gray-600">


            <span class="text-4xl">Total Premium: {{ calculateTotalPremium() }} Birr/Month</span>

          </label>
        </div>
        <SignupModalFamily ref="signupModalFamily" />
      </div>
    </div>
    <AddFamilyMemberModal
    :isModalOpen="isAddFamilyMemberModalOpen"
    @add-family-member="handleAddFamilyMember"
    @close-modal="closeAddFamilyMemberModal"
  />
  </div>
  <MedicalFooter/>
</template>

<script>
import axios from 'axios';
import AddFamilyMemberModal from "../components/AddFamilyMemberModal.vue";
import MyHeader from "../components/MyHeader.vue";
import TypeHealth from "../components/TypeHealth.vue";
import SignupModalFamily from "../components/SignupModalFamily.vue";
import UpdateFormModal from "../components/UpdateFormModal.vue";
import MedicalFooter from "../components/MedicalFooter.vue";
export default {
  name: "PerFamily",
  components: {
    MyHeader,
    TypeHealth,
    SignupModalFamily,
    UpdateFormModal,
    MedicalFooter,
    AddFamilyMemberModal,
  },
  data() {
    return {
      categories: [],
      selectedPackage: {},
        searchFilter: "",
        firstName: "",
        fatherName: "",
        grandFatherName: "",
        dateOfBirth: "",
        gender: "male",
        phoneNumber: "",
       
        familySize:0,
      
      familyMembers: [], // Array to store family members
      updateModalIndex: null,
       
      isAddFamilyMemberModalOpen: false,
      isUpdateModalOpen: false,
      errorMessage: "",
    };
  },
  computed: {
    filteredCategories() {
      if (!this.searchFilter) {
        return this.categories;
      }

      const filtered = this.categories.map(category => {
        const filteredPackages = category.packages.filter(pack =>
          pack.packageName.toLowerCase().includes(this.searchFilter.toLowerCase())
        );
        return { ...category, packages: filteredPackages };
      });

      return filtered.filter(category => category.packages.length > 0);
    },
  },
  mounted() {
    axios.get('http://157.175.203.69:8193/api/medicalinsurance/package')
      .then(response => {
        console.log('API Response:', response.data);
        this.categorizePackages(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  },
  methods: {
    openAddFamilyMemberModal() {
      this.isAddFamilyMemberModalOpen = true;
    },
    closeAddFamilyMemberModal() {
      this.isAddFamilyMemberModalOpen = false;
    },
    handleAddFamilyMember(newFamilyMemberData) {
    if (this.familyMembers.length < this.familySize) {
      const newFamilyMember = {
        firstName: newFamilyMemberData.newFamilyMemberName,
        fatherName: newFamilyMemberData.newFamilyMemberFatherName,
        grandFatherName: newFamilyMemberData.newFamilyMemberGrandFatherName,
        relationShip: newFamilyMemberData.relationShip,
        dateOfBirth: newFamilyMemberData.newFamilyMemberDateOfBirth,
        gender: newFamilyMemberData.newFamilyMemberGender,
        phoneNumber: newFamilyMemberData.newFamilyMemberPhoneNumber,
        
      };

      this.errorMessage = "";
      this.familyMembers.push(newFamilyMember);
      this.closeAddFamilyMemberModal();
    } else {
      this.closeAddFamilyMemberModal();
      alert("Family size limit reached or Not selected ");
      this.errorMessage = "Family size limit reached. You cannot add more members.";
      
    }
  },
    categorizePackages(data) {
      const uniqueCategories = [...new Set(data.map(item => item.packageCategory))];
      this.categories = uniqueCategories.map(category => {
        const categoryPackages = data.filter(item => item.packageCategory === category);
        const firstPackage = categoryPackages[0];

        return {
          packageUuid: firstPackage.packageUuid,
          packageName: firstPackage.packageName,
          packageCategory: firstPackage.packageCategory,
          minLimit: firstPackage.minLimit,
          maxLimit: firstPackage.maxLimit,
          packages: categoryPackages.map(pkg => ({
            ...pkg,
            benefitRanges: pkg.benefitRanges,
          })),
          value: 0,
        };
      });
    },
    submitData() {
      let totalPremium = 0;
    let totalBenefit = 0;
  const postData = {
    firstName: this.firstName,
    fatherName: this.fatherName,
    grandFatherName: this.grandFatherName,
    dateOfBirth: this.dateOfBirth,
    gender: this.gender,
    phoneNumber: this.phoneNumber,
    covers: [],
    familySize:this.familySize,
   members: this.familyMembers,
  };

  for (const categoryIndex of Object.keys(this.selectedPackage)) {
    const selectedCategory = this.categories.find(cat => cat.packageCategory === categoryIndex);

    if (selectedCategory && typeof selectedCategory.value !== 'undefined') {
      const sliderValue = parseFloat(selectedCategory.value);

      if (!isNaN(sliderValue) && sliderValue !== null) {
        const selectedPackageUuid = this.selectedPackage[categoryIndex];
        

        const premium = parseFloat(this.calculateAnnualPremium(selectedCategory));
        totalPremium += premium;
          totalBenefit += sliderValue;

        postData.covers.push({
          packageUuid: selectedPackageUuid,
          benefit: sliderValue,
          premium: premium,
        });
      }
    }
  }
  postData.benefit = totalBenefit;
postData.premium = totalPremium;
  console.log("postData:", postData);

  axios.post('http://157.175.203.69:8193/api/medicalinsurance/familybenefit', postData)
    .then(response => {
      console.log('Data submitted successfully!', response.data);
      localStorage.setItem('familyBenefitUuid', response.data.familyBenefitUuid);
      this.$refs.signupModalFamily.openModal();
    })
    .catch(error => {
      console.error('Error submitting data:', error);
    });
}, 
handleSearchFilter() {
      // Update filteredPackages based on the search filter
      this.filteredPackages = this.categories.filter(category =>
        category.packages.some(pack =>
          pack.packageName.toLowerCase().includes(this.searchFilter.toLowerCase())
        )
      );
    },
  

    calculateTotalPremium() {
      let totalPremium = 0;

      for (const categoryKey in this.selectedPackage) {
        const selectedPackageId = this.selectedPackage[categoryKey];
        const category = this.categories.find(cat => cat.packageCategory === categoryKey);

        if (category && selectedPackageId) {
          totalPremium += parseFloat(this.calculateAnnualPremium(category));
        }
      }

      // Use toFixed to format with 2 decimal places and remove leading zero
      const formattedTotalPremium = totalPremium.toFixed(2).replace(/^0+/, '');

      return formattedTotalPremium;
    },

    calculateAnnualPremium(category) {
      const selectedPackageId = this.selectedPackage[category.packageCategory];
      console.log('Selected Package ID:', selectedPackageId);

      const selectedPackage = category.packages.find(pack => pack.packageUuid === selectedPackageId);

      if (selectedPackage) {
        const selectedRange = Number(category.value);
        console.log('Selected Range:', selectedRange);

        if (selectedPackage.benefitRanges && selectedPackage.benefitRanges.length > 0) {
          const selectedBenefitRange = selectedPackage.benefitRanges.find(range => {
            const isInRange = selectedRange >= range.minLimit && selectedRange <= range.maxLimit;
            console.log('Range:', range, 'Is in Range:', isInRange);
            return isInRange;
          });


          console.log('Selected Benefit Range:', selectedBenefitRange);

          if (selectedBenefitRange) {
            const selectedRate = selectedBenefitRange.rate / 100;
            const annualPremium = (selectedRate * selectedRange) ;
            console.log('Selected Rate:', selectedRate);
            console.log('Annual Premium:', annualPremium);
            const formattedPremium = annualPremium.toFixed(2);
            return formattedPremium;
          }
        }
      }

      console.log('Unable to calculate annual premium. Returning 0.');
      return 0;
    } ,
    onSliderChange(category) {
      // This method will be called when the slider value changes
      console.log('Slider value changed:', category.value);

      // If you want to recalculate the annual premium immediately, you can call your method here
      this.calculateAnnualPremium(category);
    },
    handleUpdateFamilyMember(updatedData) {
      
      if (this.updateModalIndex !== null) {
        this.familyMembers.splice(this.updateModalIndex, 1, updatedData);
      }

      this.closeUpdateModal();
    },
  
    openUpdateModal(index) {
      this.isUpdateModalOpen = true;
      this.updateModalIndex = index;
    },
    closeUpdateModal() {
      this.isUpdateModalOpen = false;
    },
    

  deleteFamilyMember(index) {
    // Implement logic to delete the family member based on the index
    this.familyMembers.splice(index, 1);
    console.log(`Delete family member at index ${index}`);
  },
  //   addFamilyMember() {
  //   // Validate that the input field is not empty
  //   if (this.newFamilyMemberName.trim() !== "" ) {
  //     // Add the new family member to the array
  //     this.familyMembers.push({
  //       firstName: this.newFamilyMemberName,
  //       fatherName: this.newFamilyMemberFatherName,
  //        grandFatherName: this.newFamilyMemberGrandFatherName,
  //        relationShip: this.relationShip,
  //       dateOfBirth: this.newFamilyMemberDateOfBirth,
  //       gender: this.newFamilyMemberGender, 
  //       phoneNumber: this.newFamilyMemberPhoneNumber,
  //     });

  //     // Clear the input field after adding the family member
  //     this.newFamilyMemberName = "";
  //     this.newFamilyMemberFatherName = "";
  //     this.newFamilyMemberGrandFatherName = "";
      
  //     this.newFamilyMemberDateOfBirth = "";
      
  //     this.newFamilyMemberPhoneNumber = "";
  //   }
  // },

  },
  watch: {
    'categories.value': function (newValue, oldValue) {
      console.log('Slider value changed:', newValue);
    }
  },
};
</script>  

<style>
@media only screen and (max-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: 1fr; /* Single column for smaller screens */
  }

  .grid-cols-2 {
    grid-template-columns: 1fr; /* Single column for smaller screens */
  }

  .grid-cols-10 {
    grid-template-columns: repeat(1, minmax(0, 1fr)); /* Single column for smaller screens */
  }

  .w-48,
  .w-56,
  .w-60,
  .w-96 {
    width: 100%; /* Full width for smaller screens */
  }

  .md\:ml-0 {
    margin-left: 0; /* Remove left margin on smaller screens */
  }

  .md\:mr-4,
  .ml-72 {
    margin-right: 0; /* Remove right margin on smaller screens */
  }
  
  .md\:pt-56,
  .lg\:pt-28 {
    padding-top: 2rem; /* Adjust top padding for smaller screens */
  }
}
</style>