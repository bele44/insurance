<template>
  <MyHeader />
  
  <div class="bg-gray-100 min-h-screen  lg:pt-28 pt-96 md:pt-28 ">
    
    <div class="grid grid-cols-1 md:grid-cols-2 ">
      <div class="flex flex-col items-end">
      <!--  <TypeHealth /> -->
      <h1 class="text-2xl font-semibold m-4 md:ml-0 mb-0 font-serif">Individual Cover</h1>
    
  
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
    <div class="mx-auto p-6 bg-gray-200 shadow-md rounded-md w-auto  ">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="text-xl font-semibold w-auto m-4  p-4 text-black ml-72 font-poppins"> Choose Cover Type</div>
        <div class=" w-auto m-4  p-4">
          <label class="block text-md font-bold ">


            <span class="text-xl font-poppins">Total Premium: {{ calculateTotalPremium() }} Birr/Month</span>

          </label>
        </div>
      </div>

     
        <!-- Display each category type in a separate card -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6    ">
       
       <div v-for="category in filteredCategories" :key="category.packageCategory" 
          class="bg-white rounded-lg overflow-hidden shadow-md">
          
          
            <div class="mt-2">
        <label  class="text-lg font-semibold ml-10 mt-6 font-poppins"> {{ category.packageCategory }} </label>
       
      </div> 
           <!-- First column for radio buttons -->
    <div class="md:col-span-1 mt-">
        <div v-for="pack in category.packages" :key="pack.packageUuid" class="p-1  ml-4 text-lg font-poppins  ">
            <input type="radio" v-model="selectedPackage[category.packageCategory]" :value="pack.packageUuid" class="ml-4">
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
               class=" text-center border h-10 border-black rounded-md w-56 hover:border-blue-500" :disabled="!isRadioButtonSelected(category)" />

           </div>
           <!-- per month premium -->
           <div class="bg-gray- w-auto   md:col-span-1 m-4 ">
        <label class="block text-md ">
            <h1 class="text-xl flex-col items-end text-black">Premium: {{ calculateAnnualPremium(category) }} Birr/Month</h1>
        </label>
    </div>
             
         </div>
          
         </div>
    
     </div>

       <!-- Add an input field for the user's  -->
       <div class=" flex-col items-center grid grid-cols-1 md:grid-cols-2 gap-2">
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
    
        
        <div class="mt-28 ml-20 flex flex-col items-center mb-10 pt-0">
          <button @click="submitData" class="bg-blue-500 text-white font-bold py-5  px-6 rounded-2xl hover:bg-blue-950 ">
            Submit
          </button>
          
        </div>
        
     
       
      <SignupModal ref="signupModal" :postData="postData" /> 

    </div>
    
  </div>
  <MedicalFooter />
</template>

<script>
import axios from 'axios';
import MyHeader from "../components/MyHeader.vue";
//import TypeHealth from "../components/TypeHealth.vue";
import SignupModal from "../components/SignupModal.vue";
import apiService from "../services/apiService";
import MedicalFooter from "../components/MedicalFooter.vue";

export default {
  name: "PerPerson",
  components: {
    MyHeader,
   // TypeHealth,
    SignupModal,
    MedicalFooter,
    
  },
  data() {
    return {
      categories: [],
      selectedPackage: {},
        searchFilter: "",
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
      benefit: 0,
      premium: 0,

    },
     
    };
  },
 
  computed: {
    isRadioButtonSelected() {
    return category => {
      return this.selectedPackage[category.packageCategory] !== undefined;
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
     apiService.get('/package')   
      .then(response => {
        console.log('API Response:', response.data);
        this.categorizePackages(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  },
  methods: {
   
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

  for (const categoryIndex of Object.keys(this.selectedPackage)) {
    const selectedCategory = this.categories.find(cat => cat.packageCategory === categoryIndex);

    if (selectedCategory && typeof selectedCategory.value !== 'undefined') {
      const sliderValue = parseFloat(selectedCategory.value);

      if (!isNaN(sliderValue) && sliderValue !== null) {
        const selectedPackageUuid = this.selectedPackage[categoryIndex];

        const premium = parseFloat(this.calculateAnnualPremium(selectedCategory));
        totalPremium += premium;
        totalBenefit += sliderValue;

        this.postData.covers.push({
          packageUuid: selectedPackageUuid,
          benefit: sliderValue,
          premium: premium,
        });
      }
    }
  }

  this.postData.benefit = totalBenefit;
  this.postData.premium = totalPremium;
 console.log('postData',this.postData)
 this.$store.commit("updatePostData", this.postData);
 
  axios.post('http:', this.postData)
    .then(response => {
       console.log('Data submitted successfully!', response.data);
      localStorage.setItem('benefitUuid', response.data.individualBenefitUuid);
     this.$refs.signupModal.openModal(this.postData);
      
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
    }



    ,
    onSliderChange(category) {
      // This method will be called when the slider value changes
      console.log('Slider value changed:', category.value);

      // If you want to recalculate the annual premium immediately, you can call your method here
      this.calculateAnnualPremium(category);
    }
  },
  watch: {
    'categories.value': function (newValue, oldValue) {
      console.log('Slider value changed:', newValue);
    }
  },
};
</script>  

<style>
.bg-image {
  
  background-image: url('../assets/home.jpg');
 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  margin: 0;
}
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
body {
    font-family: 'Poppins', sans-serif;
}
.bg {
  background-color: lightblue;
}
</style>