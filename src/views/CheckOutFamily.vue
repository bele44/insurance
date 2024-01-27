<template>
  <div class="bg-image">
  <div class="pt-20 grid md:grid-cols-2" >
    <div class=" w-3/4 bg- h-72 p-6 rounded-md shadow-md flex flex-col items-center mr-2 ml-2">
       
         
       <div class="flex flex-col">
         <div class="mb-2 text-2xl font-serif ">
         <strong class="text-4xl font-serif ">Quotes </strong> For {{ backendData.firstName }} {{ backendData.fatherName }}
       </div>
         <div class="mb-2 text-2xl font-semibold ml-4">
           <strong class="text-2xl font-serif font-bold">Total Premium:</strong> {{ backendData.premium }} birr/Month
         </div>
         <div class="mb-2 text-2xl font-semibold ml-4">
           <strong class="text-2xl font-serif font-bold">TotalBenefit:</strong> {{ backendData.benefit }} birr
         </div>
       </div>
     
     </div>
   <div class="sidebar  ">
      <div class="sidebar-header">
        <h2>Select Payment Method</h2>
      </div>
      <div class="sidebar-buttons">
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
            <div class="payment-details">
              <input v-model="telebirrAccountNumber" type="text" placeholder="Account Number" class="payment-input" />
              <input v-model="telebirrNameHolder" type="text" placeholder="Name Holder" class="payment-input" />
              <input v-model="telebirrPassword" type="password" placeholder="Password" class="payment-input" />
            </div>
            <div class="flex flex-col items-center">
              <button @click="makePayment('telebirr')" class="payment-button">Pay with Telebirr</button>
            </div>
            
          </div>
  
          <!-- Hellocash payment card -->
          <div class="payment-card" v-if="selectedPaymentMethod === 'hellocash'">
            <img src="../assets/hellocash.jpg" alt="Hellocash Logo" class="payment-logo" />
            <h1 class="text-lg font-serif font-bold flex flex-col items-center">Hello Cash</h1>
            <div class="payment-details">
              <input v-model="hellocashAccountNumber" type="text" placeholder="Account Number" class="payment-input" />
              <input v-model="hellocashNameHolder" type="text" placeholder="Name Holder" class="payment-input" />
              <input v-model="hellocashPassword" type="password" placeholder="Password" class="payment-input" />
            </div>
            <div class="flex flex-col items-center">
              <button @click="makePayment('hellocash')" class="payment-button">Pay with Hellocash</button>
            </div>
            
          </div>
  
          <!-- CBE payment card -->
          <div class="payment-card" v-if="selectedPaymentMethod === 'cbe'">
            <img src="../assets/cbe.png" alt="CBE Logo" class="payment-logo" />
            <h1 class="text-lg font-serif font-bold flex flex-col items-center">CBE</h1>
            <div class="payment-details">
              <input v-model="cbeAccountNumber" type="text" placeholder="Account Number" class="payment-input" />
              
              <input v-model="cbeNameHolder" type="text" placeholder="Name Holder" class="payment-input" />
              <input v-model="cbePassword" type="password" placeholder="Password" class="payment-input" />
            </div>
            <div class="flex flex-col items-center">
              <button @click="makePayment('cbe')" class="payment-button">Pay with CBE</button>
            </div>
            
          </div>
          <!-- commercial payment card -->
           <div class="payment-card" v-if="selectedPaymentMethod === 'commercial'">
            <img src="../assets/commercial.png" alt="COMMERCIAL Logo" class="payment-logo" />
            <h1 class="text-lg font-serif font-bold flex flex-col items-center">Commercial Bank of Ethiopia</h1>
            <div class="payment-details">
              <input v-model="commercialAccountNumber" type="text" placeholder="Account Number" class="payment-input" />
              <input v-model="commercialNameHolder" type="text" placeholder="Name Holder" class="payment-input" />
              <input v-model="commercialPassword" type="password" placeholder="Password" class="payment-input" />
            </div >
            <div class="flex flex-col items-center">
              <button @click="makePayment('cbe')" class="payment-button ">Pay with CBE</button>
            </div>
            
          </div>
       
      
    </div>
    </div>
    
  </div>
  <HomeHeader/>
 
  </div>
  <MedicalFooter/>
</template>



<script>
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
    isBenefitUuidStored() {
      return localStorage.getItem("benefitUuid") !== null;
    },
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
    };
  },
  methods: {
    selectPaymentMethod(paymentMethod) {
    this.selectedPaymentMethod = paymentMethod;
  },
    makePayment(paymentMethod) {
      
      console.log(`Initiating payment with ${paymentMethod}`);
      console.log("Account Number:", this[`${paymentMethod}AccountNumber`]);
      console.log("Name Holder:", this[`${paymentMethod}NameHolder`]);
      console.log("Password:", this[`${paymentMethod}Password`]);
      
    },
    fetchBackendData() {
      
  if (this.isBenefitUuidStored) {
    const familyBenefitUuid = localStorage.getItem("familyBenefitUuid");
    const apiUrl = `http://157.175.203.69:8193/api/medicalinsurance/familybenefit/${familyBenefitUuid}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data) {
          this.backendData = response.data;
          console.log(this.backendData)
        } else {
          console.error("Empty response or unexpected data structure:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching backend data:", error);
      });
  }
},

  },
  mounted() {
    this.fetchBackendData();
  },
};
</script>
<style scoped>
.bg-image {
  
  background-image: url('../assets/home.jpg');
  /* Set background size and other properties as needed */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}




.payment-logo {
  width: 100px; /* Adjust the size as needed */
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
  background-color: #4caf50;
  color: #ffffff;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  border: 2px solid gray;
}

.sidebar button:hover {
  background-color: #45a049;
}
</style>