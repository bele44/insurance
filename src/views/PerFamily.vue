<template>
  <MyHeader />
  <div class="bg-gray-100 min-h-screen pt-96 md:pt-28 lg:pt-28">
    <div class="grid grid-cols-1 md:grid-cols-2 ">
      <div class="flex flex-col items-end">
        <!--  <TypeHealth /> -->
        <h1 class="text-2xl font-semibold m-4 md:ml-0 mb-0 font-poppins">Family Covers</h1>


      </div>
      <div class="md:ml-4 md:mr-4">

        <div class="flex items-center justify-end m-4">
          <div class="relative">
            <input v-model="searchFilter" @input="handleSearchFilter" placeholder="Search"
              class="w-auto px-3 text-black py-2 pl-10 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            <!-- Use FontAwesome icon as a background image -->
            <i class="fas fa-search text-2xl ml absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto p-6 bg-gray-200 shadow-md rounded-md w-auto">

      <div class="grid-cols-1 lg:grid-cols-2 gap-10 pl-8">
        <div class="mb-4  ">
          <label for="familySize" class="  text-lg font-semibold mb-2 text-black font-poppins">Family Size:</label>
          <select v-model="postData.familySize" id="familySize" class="w-48 p-2 border rounded-md font-poppins">
            <option value=1>Self+1</option>
            <option value=2>Self+2</option>
            <option value=3>Self+3</option>
            <option value=4>Self+4</option>
            <option value=5>Self+5</option>
            <option value=6>Self+6</option>
          </select>

          <label for="addFamilyMember" class=" ml-6   text-lg font-semibold mb-2 text-black font-poppins">Add Family
            Members:</label>
          <button @click="openAddFamilyMemberModal"
            class=" p-10 text-black font-serif bg-blue-500 font-semibold px-4 py-2 rounded-xl mt-4">
            <i class="fas fa-plus text-2xl text-white"></i>
          </button>
        </div>
      </div>
      <div v-if="errorMessage" class="text-red-500 mt-2 font-serif text-lg">{{ errorMessage }}</div>

      <div class="overflow-x-auto">
        <table class="table-auto w-full bg-white border m-4 border-gray-300 shadow-md">
          <thead class="bg-blue-200 font-poppins font-light">
            <tr >
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">S.n</th>
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">Name</th>
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">FatherName</th>
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">GrandFatherName</th>
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">BirthDate</th>
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">Gender</th>
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">PhoneNumber</th>
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">RelationShip</th>
              <th class="px-2 py-1 border text-sm md:text-base lg:text-l">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in postData.members" :key="index" class="hover:bg-gray-100">
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

                  <button @click="openUpdateModal(index)"
                    class="bg-blue-500 text-white  px-1 md:px-2 py-1 md:py-2 rounded-md mr-4 md:mr-2 ml-1 md:ml-2">
                    Update
                  </button>

                  <!-- Delete Button -->

                  <button @click="deleteFamilyMember(index)"
                    class="bg-red-500 text-white px-1 md:px-2 py-1 md:py-2 rounded-md pl-1 md:ml-2">
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <UpdateFormModal :isModalOpen="isUpdateModalOpen" :selectedFamilyMember="postData.members[updateModalIndex]"
        @update-family-member="handleUpdateFamilyMember" :closeModal="closeUpdateModal" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="text-xl font-semibold w-auto m-4  p-4 text-black ml-72 font-serif"> Choose Cover Type</div>
        <div class="bg-white w-1/2 ml-72 m-4  p-4">
          <label class="block text-md font-semibold">


            <span class="text-xl font-poppins">Total Premium: {{ calculateTotalPremium() }} Birr/Month</span>

          </label>
        </div>
      </div>

   <!-- Display each category type in a separate card -->
   <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/6 flex-col items-center ml-72 ">
       
       <div v-for="category in filteredCategories" :key="category.packageCategory" 
          class="bg-white rounded-lg overflow-hidden shadow-md pt-10 pb-7">
          
          
          <input type="checkbox" v-model="category.isSelected" :value="category.packageCategory" class="ml-5 " @change="clearSelectedPackage(category.packageCategory)" >
    <label class="text-lg font-semibold ml-4  font-poppins">{{ category.packageCategory }}</label>
           <!-- First column for radio buttons -->
           <template v-if="category.isSelected" class="" >
            <div class="md:col-span-1 ">
        <div v-for="pack in category.packages" :key="pack.packageUuid" class="p-1  ml-4 text-lg font-poppins  ">
            <input type="radio" v-model="selectedPackage[category.packageCategory]" :value="pack.packageUuid" class="ml-4" >
            <label class=" ml-1 font-medium  text-base">{{ pack.packageName }}</label>
        </div>
    </div>

         <div class="ml-6">
          <!-- Only show the slider if a radio button is selected -->
        
               <input type="range" v-model="category.value" :min="category.minLimit" :max="category.maxLimit"
               @input="onSliderChange(category)" class="ml-4" :disabled="!isRadioButtonSelected(category)"/>
               <span class="">{{ category.value }} birr</span>
               <div class="bg-gray- w-auto  p-4">
             <div class=" text-black font-semibold text-base">Enter Annual Cover Amount</div>
             <input type="number" v-model="category.value" :min="category.minLimit" :max="category.maxLimit"
               id="sliderInput" @input="inputValueChanged()" placeholder="Enter Cover Amount"
               class=" text-center border h-10 border-black rounded-md w-56 " :disabled="!isRadioButtonSelected(category)" />

           </div>
           <!-- per month premium -->
           <div class="bg-gray- w-auto   md:col-span-1 m-4 ">
        <label class="block text-md ">
            <h1 class="text-xl flex-col items-end text-black">Premium: {{ calculateAnnualPremium(category) }} Birr/Month</h1>
        </label>
    </div>
             
         </div>
           </template>
    
          
         </div>
    
     </div>

       <!-- Add an input field for the user's  -->
       <div class=" flex-col items-center grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <div class="ml-40   m-4  p-4 mb-10 mt-20 ">
          <label class="block text-md font-bold ">


            <span class="text-2xl font-serif font-bold">Total Premium: {{ calculateTotalPremium() }} Birr/Month</span>

          </label>
        </div>
 
       <div class="grid grid-cols-1 md:grid-cols-2 gap-2 font-poppins">
          
          <h1 class="text-xl font-bold m-6  text-blue-950  p-6 border rounded-lg">Please Register Here</h1>
             <span></span>
          <div class="mb-4">
            <label for="userName" class="text-lg font-semibold mb-2 text-black">FirstName:</label>
            <input v-model="postData.firstName" id="firstName" type="text" placeholder="Enter your name"
            class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
          </div>
          <div class="mb-4">
            <label for="fatherName" class="text-lg font-semibold mb-2 text-black">Father's Name:</label>
            <input v-model="postData.fatherName" id="fatherName" type="text" placeholder="Enter father's name"
              class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
          </div>

          <div class="mb-4">
            <label for="grandFatherName" class="text-lg font-semibold mb-2 text-black">Grandfather's Name:</label>
            <input v-model="postData.grandFatherName" id="grandFatherName" type="text" placeholder="Enter grandfather's name"
              class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
          </div>

          <div class="mb-4">
            <label for="dateOfBirth" class="text-lg font-semibold mb-2 text-black">Date of Birth:</label>
            <input v-model="postData.dateOfBirth" id="dateOfBirth" type="date"
              class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
          </div>

          <div class="mb-4">
            <label for="gender" class="text-lg font-semibold mb-2 text-black ml-4">  Gender:</label>
            <select v-model="postData.gender" id="gender"
              class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="phoneNumber" class="text-lg font-semibold mb-2 text-black">Phone Number:</label>
            <input v-model="postData.phoneNumber" id="phoneNumber" type="tel" placeholder="Enter phone number"
              class="bg-white px-3 py-2 border rounded-md w-80 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
          </div>
        </div>
        
       </div>

      
        <div class="mt-28 ml-20 flex flex-col items-center mb-10 pt-0 ">
          <button @click="submitData" class="bg-blue-500 text-white font-bold py-5  px-6 rounded-2xl hover:bg-blue-950 ">
            Submit
          </button>
        </div>
       
        <SignupModalFamily ref="signupModalFamily" />
      
    </div>
    <AddFamilyMemberModal :isModalOpen="isAddFamilyMemberModalOpen" @add-family-member="handleAddFamilyMember"
      @close-modal="closeAddFamilyMemberModal" />
  </div>
  <MedicalFooter />
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
       
        
      
      // Array to store family members
      updateModalIndex: null,
       
      isAddFamilyMemberModalOpen: false,
      isUpdateModalOpen: false,
      errorMessage: "",
      postData: {
      firstName: "",
      fatherName: "",
      grandFatherName: "",
      dateOfBirth: "",
      gender: "male",
      phoneNumber: "",
      familySize:0,
      covers: [],
      benefit: 0, 
      premium: 0, 
      benefit: 0,
      premium: 0,
      members: [], 

    },
    };
  },
  computed: {
    isRadioButtonSelected() {
    return category => {
      return this.selectedPackage[category.packageCategory] !== null;
    };
  },
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
    axios.get('http:')
      .then(response => {
        console.log('API Response:', response.data);
        this.categorizePackages(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  },
  methods: {
  
    clearSelectedPackage(packageCategory) {
    // Clear the selected package for the given category
    this.selectedPackage[packageCategory] = null;
    // Reset the slider value to 0 or null for the category
    const category = this.categories.find(cat => cat.packageCategory === packageCategory);
    if (category) {
      category.value = 0; // Or you can set it to null if you prefer
    }
  },
    openAddFamilyMemberModal() {
      this.isAddFamilyMemberModalOpen = true;
    },
    closeAddFamilyMemberModal() {
      this.isAddFamilyMemberModalOpen = false;
    },
    handleAddFamilyMember(newFamilyMemberData) {
    if (this.postData.members.length < this.postData.familySize) {
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
      this.postData.members.push(newFamilyMember);
      this.closeAddFamilyMemberModal();
    } else {
      this.closeAddFamilyMemberModal();
      alert("Family size limit reached or Not selected ");
      this.errorMessage = "Check Your Family size ! You cannot add more members.";
      
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
  const selectedCategories = this.categories.filter(category => {
    return this.selectedPackage[category.packageCategory] && category.value > 0;
  });
  for (const category of selectedCategories) {
    const sliderValue = parseFloat(category.value);
    const selectedPackageUuid = this.selectedPackage[category.packageCategory];
    
    // Add to total premium and benefit
    totalPremium += parseFloat(this.calculateAnnualPremium(category));
    totalBenefit += sliderValue;

    // Push data for this category to postData
    this.postData.covers.push({
      packageUuid: selectedPackageUuid,
      benefit: sliderValue,
      premium: this.calculateAnnualPremium(category),
    });
  }

  this.postData.benefit = totalBenefit;
  this.postData.premium = totalPremium;
 console.log('postData',this.postData)
 this.$store.commit("updatePostData", this.postData);
 

  axios.post('http:', postData)
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
        this.postData.members.splice(this.updateModalIndex, 1, updatedData);
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
    this.postData.members.splice(index, 1);
    console.log(`Delete family member at index ${index}`);
  },
  

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
    grid-template-columns: 1fr;
    /* Single column for smaller screens */
  }

  .grid-cols-2 {
    grid-template-columns: 1fr;
    /* Single column for smaller screens */
  }

  .grid-cols-10 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    /* Single column for smaller screens */
  }

  .w-48,
  .w-56,
  .w-60,
  .w-96 {
    width: 100%;
    /* Full width for smaller screens */
  }

  .md\:ml-0 {
    margin-left: 0;
    /* Remove left margin on smaller screens */
  }

  .md\:mr-4,
  .ml-72 {
    margin-right: 0;
    /* Remove right margin on smaller screens */
  }

  .md\:pt-56,
  .lg\:pt-28 {
    padding-top: 2rem;
    /* Adjust top padding for smaller screens */
  }
}

body {
  font-family: 'Poppins', sans-serif;
}</style>