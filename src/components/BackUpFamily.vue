<template>
    <MyHeader />
    <div class="bg-gray-100 min-h-screen lg:pt-24 md:pt-28 sm:p-0 mt-6">
  
      <div class="grid grid-cols-1 md:grid-cols-3 ">
        <div>
          <TypeHealth />
        </div>
        <div>
          <h1 class="text-3xl font-bold ml-0  mt-4"> Family Cover</h1>
  
        </div>
  
        <div class="flex items-center justify-end m-4">
          <div class="relative">
            <input v-model="searchFilter" @input="handleSearchFilter" placeholder="Search  "
              class="bg-red-950 px-3 text-white py-2 pl-10 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300" />
          
            <i class="fas fa-search text-2xl ml absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
  
      </div>
    <div class="mx-auto p-6 bg-gray-200 shadow-md rounded-md w-auto">
      <div class="">
    <div class="mb-4">
    <label for="userName" class="text-lg font-semibold mb-2 text-black">User Name:</label>
    <input
      v-model="userName"
      id="userName"
      type="text"
      placeholder="Enter your Fullname"
      class="bg-white px-3 py-2 border rounded-md w-96 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
    />
  </div>
  <div class="mb-4">
          <label for="familySize" class="text-lg font-semibold mb-2 text-black">Family Size:</label>
          <select v-model="selectedFamilySize" id="familySize" class="w-48 p-2 border rounded-md ">
            <option v-for="(size, sizeIndex) in familySizes" :key="sizeIndex" :value="size.value" class="">{{ size.value }}
            </option>
          </select>
   </div>
  </div>
        <div class="mb-4">
       
       <div class="flex items-center ">
        <label for="addFamilyMember" class="  text-lg font-semibold mb-2 text-black">Add Family:</label>
      <input
        v-model="newFamilyMemberName"
        id="addFamilyMember"
        type="text"
        placeholder="Enter family member name"
        class="bg-white px-3 py-2 border rounded-md w-56 ml-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />
      <input
        v-model="newFamilyMemberAge"
        id="addFamilyMemberAge"
        type="number"
        placeholder="Enter age"
        class="bg-white  p-2 m-3 border rounded-md w-28  focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />
      <select v-model="newFamilyMemberSex" id="addFamilyMemberSex" class="w-20 p-2 border rounded-md m-2 ml-3">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button @click="addFamilyMember" class=" px-4 py-2 bg-blue-500 text-white rounded-md">
        Add
      </button>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
  <table class="table-auto w-auto  bg-white border m-4 border-gray-300 shadow-md">
    <thead class="bg-blue-200">
      <tr>
        <th class="px-4 py-2 border text-xl">S.n</th>
        <th class="px-4 py-2 border text-xl">Name</th>
        <th class="px-4 py-2 border text-xl">Age</th>
        <th class="px-4 py-2 border text-xl">Gender</th>
        <th class="px-4 py-2 border text-xl">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(member, index) in familyMembers" :key="index" class="hover:bg-gray-100">
        <td class="border px-4 py-2 text-lg">{{ index + 1 }}</td>
        <td class="border px-4 py-2 text-lg">{{ member.name }}</td>
        <td class="border px-4 py-2 text-lg">{{ member.age }}</td>
        <td class="border px-4 py-2 text-lg">{{ member.sex }}</td>
        <td class="border px-4 py-2 text-lg">
          <!-- Update Button -->
          <button @click="openUpdateModal(index)" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ml-10">
          
            Update
          </button>
          <!-- Delete Button -->
          <button @click="deleteFamilyMember(index)" class="bg-red-500 text-white px-4 py-2 rounded-md ml- ">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  
        
      <div class=" w-auto m-4 h-1 p-4 sm:m-6">
                    <label class="block text-md font-bold text-gray-600">
                      
                      
                      <h1 class="text-4xl">Total Premium: {{ totalPremium.toFixed(2) 
                        }} Birr/M</h1>
  
                    </label>
                  </div>
                </div>
  <UpdateFormModal
      :isModalOpen="isUpdateModalOpen"
      :selectedFamilyMember="familyMembers[updateModalIndex]"
      @update-family-member="handleUpdateFamilyMember"
      :closeModal="closeUpdateModal"
    />
  
    
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Display each coverage type in a separate card -->
          <div v-for="(coverageType, index) in filteredCoverageTypes" :key="index"
            class="bg-white rounded-lg overflow-hidden shadow-md">
            <div class="p-4">
              <div class="mb-4">
                <!-- Add a checkbox before the coverage name text -->
                <label :for="`${coverageType.covarageName}-Checkbox`" class="flex items-center cursor-pointer">
                  <input type="checkbox" :id="`${coverageType.covarageName}-Checkbox`"
                    v-model="selectedCoverageType[index].mainCheckbox" @change="handleMainCheckboxChange" class="mr-2" />
                  <span class="text-xl font-bold">{{ capitalize(coverageType.covarageName) }} Cover</span>
                </label>
              </div>
              <div class="mb-4">
                <!-- Display radio buttons for each value in the inner array -->
                <label v-for="(value, valueIndex) in coverageType.value" :key="valueIndex"
                  class="flex items-center cursor-pointer w-96">
                  <input type="radio" :id="`${coverageType.covarageName}-${valueIndex}`" :value="value.value"
                    v-model="selectedCoverageType[index].radio" @change="handleCoverageChange" class="mr-2" />
                  <span class="text-lg font-medium text-gray-800">{{ capitalize(value.value) }}</span>
                </label>
              </div>
  
              <!-- Add a slider for each coverage type -->
              <div>
                <label :for="`${coverageType.covarageName}CoverageLimit`" class="block text-md font-bold text-gray-600 ">
                  Coverage price: {{ selectedCoverageType[index].slider }} birr
  
                </label>
                <input :id="`${coverageType.covarageName}CoverageLimit`" type="range"
                  v-model="selectedCoverageType[index].slider" :min="coverageType.coverageLimits[0].value"
                  :max="coverageType.coverageLimits[1].value" :step="intervalCoverageLimit" @input="handleSliderChange"
                  class="w-60 mt-1 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 border-gray-300 rounded-md" />
                <div class="grid grid-cols-1 md:grid-cols-2 mt-6 ">
                  <div class="bg-black auto m-4 p-4">
                    <label class="pl-2px ml-4 p-4px font-medium text-white">Or Enter Amount</label>
                    <input :id="`${coverageType.covarageName}CoverageLimitInput`" type="number"
                      v-model="selectedCoverageType[index].slider" @input="handleInputFieldChange(index)"
                      class="ml-2 text-center border h-20 border-gray-300 rounded-md"
                      @change="handleSliderFromInput(index)" />
  
                  </div>
                  <div class="bg-black w-auto m-4  p-4">
                    <label :for="`${coverageType.covarageName}CoverageLimit`" class="block text-md font-bold text-gray-600">
  
                      <h1 class="text-xl"> Coverage price: {{ selectedCoverageType[index].slider }} birr </h1>
                      <br>
                      <h1 class="text-4xl">Premium: {{ calculateAnnualPayment(selectedCoverageType[index].slider,
                        coverageType.rate) }} Birr/M</h1>
  
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-black w-1/2  m-4  p-4">
                    <label class="block text-md font-bold text-gray-600">
                      
                      
                      <h1 class="text-4xl ">Total Premium: {{ totalPremium.toFixed(2) 
                        }} Birr/M</h1>
  
                    </label>
                  </div>
        <button @click="postSelectedData" :disabled="!canPost" class="custom-button">
          Send Selected Data
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import MyHeader from "../components/MyHeader.vue";
  import TypeHealth from "../components/TypeHealth.vue";
  import * as ApiService from "../services/apiService";
  
  import UpdateFormModal from "../components/UpdateFormModal.vue";
  export default {
    name: "PerFamily",
    components: {
      MyHeader,
      TypeHealth,
      UpdateFormModal,
    },
    data() {
      return {
        coverageLimit: null,
        minCoverageLimit: 0,
        maxCoverageLimit: 0,
        intervalCoverageLimit: 0.01,
        selectedCoverageType: [], // Use separate properties for checkbox and slider for each coverage
        coverageTypes: [], // New array to store dynamic coverage types
        canPost: false,
        selectedFamilySize: 0,
        familySizes: [],
        searchFilter: "",
        inputFieldValue: null,
        userName:"",
        familyMembers: [], // Array to store family members
        newFamilyMemberName: "",
        newFamilyMemberSex: "",
        newFamilyMemberAge: "",
        isUpdateModalOpen: false,
        updateModalIndex: null,
        totalPremium: 0,
      };
    },
    computed: {
     
      // Compute a filtered array based on the search filter
      filteredCoverageTypes() {
        const filter = this.searchFilter.toLowerCase();
        if (!filter) {
          // If there's no search filter, return all coverage types
          return this.coverageTypes;
        } else {
          // If there's a search filter, filter based on the coverageName
          return this.coverageTypes.filter(
            (coverageType) =>
              coverageType.covarageName.toLowerCase().includes(filter)
          );
        }
      },
    },
    watch: {
      selectedCoverageType: {
        handler: 'updateTotalPremium',
        deep: true,
      },
    },
    methods: {
      updateTotalPremium() {
        let totalPremium = 0;
  
        for (let index = 0; index < this.selectedCoverageType.length; index++) {
          const selectedType = this.selectedCoverageType[index];
  
          if (selectedType.mainCheckbox !== undefined && selectedType.slider !== null) {
            const premium = parseFloat(this.calculateAnnualPayment(selectedType.slider, this.coverageTypes[index].rate));
            totalPremium += premium;
            console.warn('totalPremium', totalPremium);
          }
        }
  
        this.totalPremium = totalPremium;
        console.warn('Updated Total Premium:', this.totalPremium);
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
      addFamilyMember() {
      // Validate that the input field is not empty
      if (this.newFamilyMemberName.trim() !== "") {
        // Add the new family member to the array
        this.familyMembers.push({
          name: this.newFamilyMemberName,
          age: this.newFamilyMemberAge,
          sex: this.newFamilyMemberSex, 
        });
  
        // Clear the input field after adding the family member
        this.newFamilyMemberName = "";
      }
    },
      handleSearchFilter() {
        // Handle the search filter change
        
        console.log("Search filter:", this.searchFilter);
      },
      calculateAnnualPayment(sliderValue, rate) {
        
        const rateDecimal = (rate / 100) / 12;
        return (sliderValue * rateDecimal).toFixed(2);
      },
  
      handleInputFieldChange(index) {
        const inputValue = this.selectedCoverageType[index].slider;
        const min = this.coverageTypes[index].coverageLimits[0].value;
        const max = this.coverageTypes[index].coverageLimits[1].value;
  
        // Ensure the entered value is within the valid range
        let validValue = Math.min(Math.max(parseFloat(inputValue), min), max);
  
        // Only enforce the minimum value if the entered value is less than the minimum
        if (parseFloat(inputValue) >= min) {
          this.selectedCoverageType[index].slider = validValue;
          this.canPost = this.hasSelectedCoverageType() && this.coverageLimit >= min;
        }
      },
      handleSliderFromInput(index) {
        const inputValue = this.selectedCoverageType[index].slider;
        const min = this.coverageTypes[index].coverageLimits[0].value;
        const max = this.coverageTypes[index].coverageLimits[1].value;
  
        const validValue = Math.min(Math.max(parseFloat(inputValue), min), max);
  
        this.selectedCoverageType[index].slider = validValue;
        this.canPost = this.hasSelectedCoverageType() && this.coverageLimit >= min;
      },
      handleSliderChange() {
        // Handle slider change if needed
  
        console.log("Selected Family Size:", this.selectedFamilySize);
  
        // Update canPost value
        this.canPost = this.hasSelectedCoverageType() && this.coverageLimit !== null;
      },
      handleCoverageChange() {
        // Handle coverage type change
        console.log("Selected coverage types:", this.selectedCoverageType);
  
        // Update canPost value
        this.canPost = this.hasSelectedCoverageType() && this.coverageLimit !== null;
      },
      handleMainCheckboxChange() {
        console.log("Selected coverage types:", this.selectedCoverageType);
  
        // Update canPost value
        this.canPost = this.hasSelectedCoverageType() && this.coverageLimit !== null;
      },
      hasSelectedCoverageType() {
        // Check if at least one checkbox and slider are selected for each coverage type
        return this.selectedCoverageType.some((coverage) => coverage.mainCheckbox !== undefined && coverage.slider !== null);
      },
      updateValues() {
        // Iterate over selectedCoverageType and post data only for selected coverage types
        for (let index = 0; index < this.selectedCoverageType.length; index++) {
          const covarageName = this.coverageTypes[index].covarageName;
          const selectedType = this.selectedCoverageType[index];
  
          // Check if the coverage type is selected before sending data
          if (selectedType.mainCheckbox !== undefined && selectedType.slider !== null) {
            ApiService.postSelectedCoverageFamily({
              coverageLimit: selectedType.slider,
              selectedCoverageType: selectedType.radio,
              covarageName: covarageName,
              familySize: this.selectedFamilySize,
              userName: this.userName,
              familyMembers: this.familyMembers,
            })
              .then((response) => {
                console.log(`Values for ${covarageName} updated successfully:`, response.data);
                alert(`Selected ${covarageName} successfully`);
              })
              .catch((error) => {
                console.error(`Error updating values for ${covarageName}:`, error);
              });
          }
        }
      },
  
      postSelectedData() {
        if (this.canPost) {
          this.updateValues();
        }
      },
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
    },
    // watch: {
    //   selectedFamilySize(newSize) {
    //     // Update the familyMembers array when selectedFamilySize changes
    //     this.familyMembers = Array.from({ length: newSize }, () => ({
    //       name: "",
    //       age: null,
    //       sex: "Male"
    //     }));
    //   },
    // },
  created() {
    // Fetch dynamic coverage types and family sizes in a single call
    Promise.all([
      ApiService.getCoverageTypesInFamily().then((response) => response.data),
      ApiService.getFamilySize().then((response) => response.data)
    ])
      .then(([coverageData, familySizeData]) => {
        // Update the coverageTypes and other properties accordingly
        this.coverageTypes = coverageData;
        this.familySizes = familySizeData;
  
        // Assuming the first coverage type has an array of coverageLimits
        const firstCoverageType = coverageData[0];
        this.minCoverageLimit = firstCoverageType.coverageLimits[0].value;
        this.maxCoverageLimit = firstCoverageType.coverageLimits[1].value;
        this.coverageLimit = this.minCoverageLimit; // Set initial value
  
        // Initialize selectedCoverageType array with objects for each coverage type
        this.selectedCoverageType = Array.from({ length: coverageData.length }, () => ({
          mainCheckbox: undefined,
          slider: null
        }));
  
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  
  };
  </script>
  
  <style>
  /* Override default browser styles for select element and its label */
  </style>
  