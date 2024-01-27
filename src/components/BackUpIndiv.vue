<template>
    <MyHeader />
    <div class="bg-gray-100 min-h-screen md:pt-56 lg:pt-28">
      <div class="grid grid-cols-1 md:grid-cols-2 ">
        <div class="md:ml-4">
          <TypeHealth />
        </div>
        <div class="md:ml-4 md:mr-4">
          <h1 class="text-3xl font-bold m-4 md:ml-0 mb-0 ">Per Person Cover</h1>
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
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="text-4xl font-semibold w-auto m-4  p-4 text-black ml-72"> Choose Cover Type</div>
          <div class="bg-black w-auto m-4  p-4">
            <label class="block text-md font-bold text-gray-600">
  
  
              <h1 class="text-4xl">Total Premium: {{ totalPremium.toFixed(2)
              }} Birr/month</h1>
  
            </label>
          </div>
        </div>
  
        <!-- Display each category type in a separate card -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div v-for="(category, categoryIndex) in filteredCategories" :key="categoryIndex"
            class="bg-white rounded-lg overflow-hidden shadow-md">
  
  
            <div class="text-xl font-bold p-4">
  
              {{ categoryIndex }}
            </div>
            <!-- Display radio buttons for each packages in the inner array of category -->
            <div v-for="(coverageType, coverageIndex) in category.packages" :key="coverageIndex">
              <div class="p-2 ml-2 text-lg font-semibold">
                <input type="radio" v-model="selectedCategories[categoryIndex]" :value="coverageType.packageUuid"
                  @change="updateTotalPremium" />
  
                {{ coverageType.packageName }}
              </div>
            </div>
            <!-- Add a slider for each category -->
            <div class="p-2 ml-2 text-lg font-semibold">
              <!-- Only show the slider if a radio button is selected -->
              <template v-if="selectedCategories[categoryIndex]">
                <input type="range" v-model="category.sliderValue" :min="category.minLimit" :max="category.maxLimit"
                  @change="updateTotalPremium" />
                <span>{{ categorizedPackages[categoryIndex].sliderValue }}</span>
              </template>
            </div>
  
            <!-- Add an input field for each category -->
            <div class="grid grid-cols-1 md:grid-cols-2 mt-4">
              <div class="bg-black auto m-4 p-4">
                <div class="pl-2px ml-4 p-4px font-medium text-white">Enter Annual Cover Amount</div>
                <span class="text-gray-200">{{ categorizedPackages[categoryIndex].sliderValue }}</span>
                <input type="number" v-model="category.sliderValue" :min="category.minLimit" :max="category.maxLimit"
                  id="sliderInput" @input="inputValueChanged(categoryIndex)"
                  class="ml-2 text-center border h-20 border-gray-300 rounded-md" />
  
              </div>
              <!-- per month premium -->
              <div class="bg-black w-auto m-4 p-4">
                <label :for="`${category.sliderValue}CoverageLimit`" class="block text-md font-bold text-gray-600">
                  <h1 class="text-4xl">Premium: {{ calculateMonthlyPremium(category.sliderValue, 9) }} Birr/month</h1>
                </label>
              </div>
            </div>
          </div>
          <!-- Add an input field for the user's  -->
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <span></span>
            <h1 class="text-2xl font-bold m-6  text-blue-950 bg-blue-200 p-6 border rounded-lg">Please Register Here</h1>
            <div class="mb-4">
              <label for="userName" class="text-lg font-semibold mb-2 text-black">FirstName:</label>
              <input v-model="firstName" id="firstName" type="text" placeholder="Enter your name"
              class="bg-white px-3 py-2 border rounded-md w-96 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
            <div class="mb-4">
              <label for="fatherName" class="text-lg font-semibold mb-2 text-black">Father's Name:</label>
              <input v-model="fatherName" id="fatherName" type="text" placeholder="Enter father's name"
                class="bg-white px-3 py-2 border rounded-md w-96 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
  
            <div class="mb-4">
              <label for="grandFatherName" class="text-lg font-semibold mb-2 text-black">Grandfather's Name:</label>
              <input v-model="grandFatherName" id="grandFatherName" type="text" placeholder="Enter grandfather's name"
                class="bg-white px-3 py-2 border rounded-md w-96 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
  
            <div class="mb-4">
              <label for="dateOfBirth" class="text-lg font-semibold mb-2 text-black">Date of Birth:</label>
              <input v-model="dateOfBirth" id="dateOfBirth" type="date"
                class="bg-white px-3 py-2 border rounded-md w-96 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
  
            <div class="mb-4">
              <label for="gender" class="text-lg font-semibold mb-2 text-black">Gender:</label>
              <select v-model="gender" id="gender"
                class="bg-white px-3 py-2 border rounded-md w-96 focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
  
            <div class="mb-4">
              <label for="phoneNumber" class="text-lg font-semibold mb-2 text-black">Phone Number:</label>
              <input v-model="phoneNumber" id="phoneNumber" type="tel" placeholder="Enter phone number"
                class="bg-white px-3 py-2 border rounded-md w-96 focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
            </div>
          </div>
        </div>
        <!-- total premium -->
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="m-20 ">
            <button @click="submitData" class="bg-blue-500 text-white font-bold py-5  px-6 rounded-2xl hover:bg-blue-950 ">
              Submit
            </button>
          </div>
          <div class="bg-black w-1/2  m-4  p-4 mb-10">
            <label class="block text-md font-bold text-gray-600">
  
  
              <h1 class="text-4xl ">Total Premium: {{ totalPremium.toFixed(2)
              }} Birr/month</h1>
  
            </label>
          </div>
          <SignupModal ref="signupModal" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import MyHeader from "../components/MyHeader.vue";
  import TypeHealth from "../components/TypeHealth.vue";
  import SignupModal from "../components/SignupModal.vue";
  export default {
    name: "PerPerson",
    components: {
      MyHeader,
      TypeHealth,
      SignupModal,
    },
    data() {
      return {
        packages: [],
        categorizedPackages: [],
        selectedCategories: [0],
        minLimit: 0,
        maxLimit: 0,
  
        intervalLimit: 1000,
        totalPremium: 0,
        searchFilter: "",
        firstName: "",
        fatherName: "",
        grandFatherName: "",
        dateOfBirth: "",
        gender: "male",
        phoneNumber: "",
        rate: "",
      };
    },
  
  
    computed: {
      filteredCategories() {
        if (!this.searchFilter) {
          return this.categorizedPackages;
        }
  
        const filtered = {};
        Object.keys(this.categorizedPackages).forEach((category) => {
          const packages = this.categorizedPackages[category].packages.filter((coverageType) => {
            return coverageType.packageName.toLowerCase().includes(this.searchFilter.toLowerCase());
          });
  
          if (packages.length > 0) {
            filtered[category] = { ...this.categorizedPackages[category], packages };
          }
        });
  
        return filtered;
      },
    },
    methods: {
  
  
      submitData() {
        const postData = {
          firstName: this.firstName,
          fatherName: this.fatherName,
          grandFatherName: this.grandFatherName,
          dateOfBirth: this.dateOfBirth,
          gender: this.gender,
          phoneNumber: this.phoneNumber,
          individualCovers: [],
        };
  
        for (const categoryIndex of Object.keys(this.selectedCategories)) {
          const selectedCategory = this.categorizedPackages[categoryIndex];
  
          if (selectedCategory && typeof selectedCategory.sliderValue !== 'undefined') {
            const sliderValue = parseFloat(selectedCategory.sliderValue);
  
            if (!isNaN(sliderValue) && sliderValue !== null) {
              const selectedPackageUuid = this.selectedCategories[categoryIndex];
              const premium = parseFloat(this.calculateMonthlyPremium(sliderValue, rate / (1 / 12)));
  
  
  
  
              postData.individualCovers.push({
                packageUuid: selectedPackageUuid,
                benefit: sliderValue,
                premium: premium,
              });
            }
          }
        }
  
  
        console.log("postData:", postData);
  
  
  
        axios.post('http://157.175.203.69:8193/api/medicalinsurance/individualbenefit', postData)
          .then(response => {
            console.log('Data submitted successfully!', response.data);
            // You can add further actions here, such as redirecting the user or displaying a success message
            this.$refs.signupModal.openModal();
          })
          .catch(error => {
            console.error('Error submitting data:', error);
  
          });
      },
  
      handleSearchFilter() {
  
        this.updateTotalPremium();
      },
      updateTotalPremium() {
        let totalPremium = 0;
  
        for (const categoryIndex of Object.keys(this.selectedCategories)) {
          const selectedCategory = this.categorizedPackages[categoryIndex];
  
          if (selectedCategory && typeof selectedCategory.sliderValue !== 'undefined') {
            const sliderValue = parseFloat(selectedCategory.sliderValue);
  
            if (!isNaN(sliderValue) && sliderValue !== null) {
              const premium = parseFloat(this.calculateMonthlyPremium(sliderValue, this.rate));
              totalPremium += premium;
            }
          }
        }
        console.warn('Updated Total Premium:', totalPremium);
        this.totalPremium = totalPremium;
      },
  
  
      calculateMonthlyPremium(sliderValue, rate) {
        // Add your premium calculation logic here
        // For example, you can multiply the slider value by the rate
        const rateDecimal = (parseFloat(rate) / 100) / 12;
        return (sliderValue * rateDecimal).toFixed(2);
      },
      sliderValueChanged(categoryIndex) {
        // Handle slider change event
        console.log(`Slider value changed for category ${categoryIndex}`);
        this.updateTotalPremium();
      },
      inputValueChanged(categoryIndex) {
        // Handle input field value change event for category
        console.log(`Input field value changed for category ${categoryIndex}`);
  
        // you can set the slider value to the input field value.
        this.categorizedPackages[categoryIndex].sliderValue = parseFloat(this.categorizedPackages[categoryIndex].sliderValue);
  
        // Update total premium after changing the input field value
        this.updateTotalPremium();
      },
  
      updateCategorizedPackages() {
        const categorizedPackages = {};
  
        this.packages.forEach(coverageType => {
          const category = coverageType.packageCategory;
          if (!categorizedPackages.hasOwnProperty(category)) {
            categorizedPackages[category] = {
              packages: [],
              minLimit: coverageType.minLimit,
              maxLimit: coverageType.maxLimit,
             rate: coverageType.individualBenefitRanges[0].rate,
            };
          }
  
          categorizedPackages[category].packages.push(coverageType);
        });
  
        this.categorizedPackages = categorizedPackages;
      },
      fetchPackages() {
        axios
          .get('http://157.175.203.69:8193/api/medicalinsurance/package')
          .then(response => {
            this.packages = response.data;
            this.updateCategorizedPackages();
          })
          .catch(error => {
            console.error(error);
          });
      },
  
    },
    mounted() {
      this.fetchPackages();
    },
  };
  </script>
  
  