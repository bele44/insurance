
<template>
    <LoginHeader/>
    <div  class="container pt-24 bg-image">
      
      <div class="login">
        <h1 class="font-bold text-4xl p-2 mb-4">Login </h1>
        <input type="text" v-model="email" placeholder="Enter your Email" />
        <input type="password" v-model="password" placeholder="Enter your Password" />
        <button @click="login" class="center-button">Login</button>
      </div>
      
    </div>
    <MedicalFooter/>
  </template>
  
  <script>
 
 import axios from 'axios';
  import router from '../router';
  import LoginHeader from '../components/LoginHeader.vue';

  import MedicalFooter from "../components/MedicalFooter.vue";
  
  export default {
    name: 'MyLogin',
    components:{
    LoginHeader,
    MedicalFooter
    
},
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        if (!this.email || !this.password) {
    alert("Please enter both email and password.");
    return;
  }
  this.$router.push('/person');
  // try {
    
  //   let result = await axios.get(`http://account?email=${this.email}&password=${this.password}`);
  //   if (result.status === 200 && result.data.length > 0) {
  //     localStorage.setItem("user-info", JSON.stringify(result.data[0]));
  //     router.push({ name: 'PerPerson' });
  //   } else {
  //     alert("Invalid email or password.");
  //   }
  // } catch (error) {
  //   console.error("An error occurred during login:", error);
  // }
      },
    },
   
  };
  </script>
  
  <style scoped>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .login input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    border: 1px solid skyblue;
  }
  
  .login button {
    width: 300px;
    height: 40px;
    border: 1px solid skyblue;
    background-color: skyblue;
    color: #fff;
    cursor: pointer;
  }

  .bg-image {
  /* Replace 'path/to/your/image.jpg' with the actual path to your background image */
  background-image: url('../assets/home.jpg');
  /* Set background size and other properties as needed */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>