<template>
  <div class=" pt-56 md:pt-1 " >
    <div class="pt-20 grid md:grid-cols-2">
      <div class=" w-auto h-auto bg-  p-6 rounded-md shadow-md flex flex-col items-center mr-2 ml-2">


        <div class=" flex flex-col" id="printable-content" >
          <div class="mb-2 text-2xl font-serif " >
            <strong class="text-2xl font-serif ">  Summary Quotes For {{ postData?.firstName }} {{ postData?.fatherName }}
             </strong> 
          </div>
          <div>
            <strong class="text-lg font-serif">Your Family Size Is: {{ postData?.familySize }}</strong>
          </div>
            
        <div class="overflow-x-auto ">
        <table class="table-auto w-1/2 bg-white border m-2 border-gray-300 shadow-md">
          <thead class="bg-blue-200 font-serif">
            <tr>
              <th class="px-1 py-1 border text-sm md:text-base ">S.n</th>
              <th class="px-1 py-1 border text-sm md:text-base ">Name</th>
              <th class="px-1 py-1 border text-sm md:text-base  ">FatherName</th>
              <th class="px-1 py-1 border text-sm md:text-base ">GrandFatherName</th>
              <th class="px- py-1 border text-sm md:text-base ">BirthDate</th>
              <th class="px-1 py-1 border text-sm md:text-base ">Gender</th>
              <th class="px-1 py-1 border text-sm md:text-base ">PhoneNumber</th>
              <th class="px-1 py-1 border text-sm md:text-base  ">RelationShip</th>
             
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in postData.members" :key="index" class="hover:bg-gray-100 font-serif text-gray-500">
              <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ index + 1 }}</td>
              <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.firstName }}</td>
              <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.fatherName }}</td>
              <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.grandFatherName }}</td>
              <td class="border px-2 py-1 text-xs md:text-sm lg:text-base ">{{ member.dateOfBirth }}</td>
              <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.gender }}</td>
              <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.phoneNumber }}</td>
              <td class="border px-2 py-1 text-xs md:text-sm lg:text-base">{{ member.relationShip }}</td>
             
            </tr>
          </tbody>
        </table>
      </div>
         

          <div class="mb-2 text-base  ml-4">
            <strong class="text-lg font-serif ">Selected Covers:</strong>

            <div v-for="(cover, index) in postData?.covers" :key="index" class="text-base text-gray-500 font-serif ml-4">
              <div style="margin-bottom: 10px;">
              <div>Package Name: {{ packageNames[cover.packageUuid] }}</div>
              <div>Benefit: {{ cover.benefit }} birr</div>
              <div>Premium: {{ cover.premium }} birr/Month</div>
            </div>
            <hr style="border-top: 1px solid #ccc;">
          </div>
        </div>
          <div class="mb-2 text-xl font-semibold ml-4">
            <strong class="text-xl font-serif ">TotalBenefit:</strong> {{ postData?.benefit }} birr
          </div>
          <div class="mb-2 text-xl font-semibold ml-4">
            <strong class="text-xl font-serif ">Total Premium:</strong> {{ postData?.premium }} birr/Month
          </div>
          <div class="flex flex-col items-center">
            <button @click="printContent" class="generate-pdf-button" style="background-color: #007bff; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Generate PDF</button>

</div>
          
        </div>

      </div>
     <div class="sidebar  ">
        <div class="text-2xl flex flex-col items-center p-4 font-serif font-semibold">
          <h2>Select Payment Method</h2>
        </div>
        <div class="sidebar-buttons font-serif ">
          <button @click="selectPaymentMethod('telebirr')">Telebirr</button>
          <button @click="selectPaymentMethod('hellocash')">Hellocash</button>
          <button @click="selectPaymentMethod('cbe')">CBE</button>
          <button @click="selectPaymentMethod('commercial')">Commercial</button>
        </div>
        <div class="flex flex-col items-center">

          <!-- Telebirr payment card -->
          <div class="" v-if="selectedPaymentMethod === 'telebirr'">

            <img src="../assets/telebirr.png" alt="Telebirr Logo" class="payment-logo" />
            <h1 class="text-lg font-serif font-bold flex flex-col items-center">Telebirr</h1>
            <div class="payment-details font-serif">
              <input v-model="telebirrAccountNumber" type="text" placeholder="Enter Account Number"
                class="payment-input" />
              <input v-model="telebirrNameHolder" type="text" placeholder="Enter Name Of Account Holder"
                class="payment-input" />
              <input v-model="telebirrPassword" type="password" placeholder="Enter Password" class="payment-input" />
              <input v-model="telebirrPhonenumber" type="number" placeholder="Enter Phone Number" class="payment-input" />
            </div>
            <div class="flex flex-col items-center">
              <button @click="makePayment('telebirr')" class="payment-button">Pay with TeleBirr</button>
            </div>

          </div>

          <!-- Hellocash payment card -->
          <div class="payment-card" v-if="selectedPaymentMethod === 'hellocash'">
            <img src="../assets/hellocash.jpg" alt="Hellocash Logo" class="payment-logo" />
            <h1 class="text-lg font-serif font-bold flex flex-col items-center">Hello Cash</h1>
            <div class="payment-details font-serif">
              <input v-model="hellocashAccountNumber" type="text" placeholder="Enter Account Number"
                class="payment-input" />
              <input v-model="hellocashNameHolder" type="text" placeholder="Enter Name Of Account Holder"
                class="payment-input" />
              <input v-model="hellocashPassword" type="password" placeholder="Enter Password" class="payment-input" />
              <input v-model="hellocashPhonenumber" type="number" placeholder="Enter Phone Number"
                class="payment-input" />
            </div>
            <div class="flex flex-col items-center">
              <button @click="makePayment('hellocash')" class="payment-button">Pay with Hellocash</button>
            </div>

          </div>

          <!-- CBE payment card -->
          <div class="payment-card" v-if="selectedPaymentMethod === 'cbe'">
            <img src="../assets/cbe.png" alt="CBE Logo" class="payment-logo" />
            <h1 class="text-lg font-serif font-bold flex flex-col items-center">CBE</h1>
            <div class="payment-details font-serif">
              <input v-model="cbeAccountNumber" type="text" placeholder="Account Number" class="payment-input" />

              <input v-model="cbeNameHolder" type="text" placeholder="Enter Name Of Account Holder"
                class="payment-input" />
              <input v-model="cbePassword" type="password" placeholder="Enter Password" class="payment-input" />
              <input v-model="cbePhonenumber" type="number" placeholder="Enter Phone Number" class="payment-input" />
            </div>
            <div class="flex flex-col items-center">
              <button @click="makePayment('cbe')" class="payment-button">Pay with CBE</button>
            </div>

          </div>
          <!-- commercial payment card -->
          <div class="payment-card" v-if="selectedPaymentMethod === 'commercial'">
            <img src="../assets/commercial.png" alt="COMMERCIAL Logo" class="payment-logo" />
            <h1 class="text-lg font-serif font-bold flex flex-col items-center">Commercial Bank of Ethiopia</h1>
            <div class="payment-details font-serif">
              <input v-model="commercialAccountNumber" type="text" placeholder="Enter Account Number"
                class="payment-input" />
              <input v-model="commercialNameHolder" type="text" placeholder="Enter Name Of Account Holder"
                class="payment-input" />
              <input v-model="commercialPassword" type="password" placeholder="Enter Password" class="payment-input" />
              <input v-model="commercialPhonenumber" type="number" placeholder="Enter Phone Number"
                class="payment-input" />
            </div>
            <div class="flex flex-col items-center">
              <button @click="makePayment('cbe')" class="payment-button ">Pay with CBE</button>
            </div>

          </div>


        </div>
      </div>
    
  </div>
  <HomeHeader/>
 
  </div>
  <MedicalFooter class="bg-imag"></MedicalFooter> 
</template>



<script>
import { mapState } from 'vuex';
import HomeHeader from "../components/HomeHeader.vue";
import axios from "axios";
import MedicalFooter from "../components/MedicalFooter.vue";
export default {
  name: "CheckOutFamily",
  components: {
    HomeHeader,
    MedicalFooter,
  },
  computed: {
    ...mapState(['postData']),


  },

  data() {
    return {
      backendData: {},
      selectedPaymentMethod: "",
       telebirrAccountNumber: "",
      telebirrNameHolder: "",
      telebirrPassword: "",

      hellocashAccountNumber: "",
      hellocashNameHolder: "",
      hellocashPassword: "",

      cbeAccountNumber: "",
      cbeNameHolder: "",
      cbePassword: "",

      commercialAccountNumber: "",
      commercialNameHolder: "",
      commercialPassword: "",

      packageNames: {}
    };
  },
  methods: {
    printContent() {
          const printableContent = document.getElementById('printable-content')
          const printWindow = window.open('', '', 'height=1000,width=1000')
          printWindow.document.write(printableContent.innerHTML)
          printWindow.print()
        },
    async fetchPackageNamesForCovers() {
      try {
        // Iterate over covers and fetch package names for each packageUuid
        for (const cover of this.postData?.covers) {
          const response = await axios.get(`http:/${cover.packageUuid}`);
          console.log('Response for packageUuid', cover.packageUuid, ':', response.data);
          // Assuming response.data is an object with packageName property
          this.packageNames = { ...this.packageNames, [cover.packageUuid]: response.data.packageName };
        }
      } catch (error) {
        console.error('Error fetching package names:', error);
      }
    },
    selectPaymentMethod(paymentMethod) {
    this.selectedPaymentMethod = paymentMethod;
  },
    makePayment(paymentMethod) {
      
      console.log(`Initiating payment with ${paymentMethod}`);
      console.log("Account Number:", this[`${paymentMethod}AccountNumber`]);
      console.log("Name Holder:", this[`${paymentMethod}NameHolder`]);
      console.log("Password:", this[`${paymentMethod}Password`]);
      
    },
//     fetchBackendData() {
      
//   if (this.isBenefitUuidStored) {
//     const familyBenefitUuid = localStorage.getItem("familyBenefitUuid");
//     const apiUrl = `http:// /familybenefit/${familyBenefitUuid}`;

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         if (response.data) {
//           this.backendData = response.data;
//           console.log(this.backendData)
//         } else {
//           console.error("Empty response or unexpected data structure:", response);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching backend data:", error);
//       });
//   }
// },

  },
  mounted() {
    //  this.fetchBackendData();
    // console.log('Received postData in checkoutfamily:', this.postData);

    console.log('Component mounted. postData:', this.postData);

    this.fetchPackageNamesForCovers();

  },
};
</script>
<style scoped>

.bg-imag {


  /* Set background size and other properties as needed */
  width: 100%;
  height: auto;
  bottom: 0;
  padding-bottom: 0%;
  position: absolute;
}




.payment-logo {
  width: 100px;
  /* Adjust the size as needed */
  height: auto;
  margin-bottom: 10px;
  margin: 8px;
  margin: auto;
}

.payment-details {
  margin-bottom: 10px;
}

.payment-input {
  width: 45%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 8px;
}

.payment-button {
  padding: 8px 16px;
  font-size: 16px;
  margin: auto;
}

.sidebar {
  width: auto;
  height: 100%;
  background-color: ;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 16px;
  text-align: center;
  background-color: #4caf50;
  color: #ffffff;
  font-size: 1.2rem;
}

.sidebar-buttons {
  display: flex;
  flex-direction: row;
  padding: 16px;
  margin-left: 4px;
}

.sidebar button {
  margin-bottom: 8px;
  padding: 16px;
  cursor: pointer;
  border: none;
  background-color: gainsboro;
  color: black;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  border: 1px solid gray;
}

.sidebar button:hover {
  background-color: #45a049;
}
</style>