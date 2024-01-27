<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Selected cover Successfully!</h2>

      <div class="p-8 rounded w-96">
        <!-- Signup form with close button inside -->
        <form @submit.prevent="handleSignup">
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username:</label>
          <input type="text" v-model="username" id="username" class="w-full px-3 py-2 border rounded mb-4" required>

          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password:</label>
          <input type="password" v-model="password" id="password" class="w-full px-3 py-2 border rounded mb-4" required>

          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password:</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" class="w-full px-3 py-2 border rounded mb-4" required>

          <!-- Error message for password mismatch -->
          <p v-if="showPasswordMismatch" class="text-red-500 mb-4">Passwords do not match</p>

          <button type="submit" class="bg-gray-600 hover:bg-blue-950 px-4 py-2 m-4 rounded-xl ml-28">Signup</button>
        </form>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SignupModal",
  components: {
   
  },
 
  data() {
    return {
      showModal: false,
      username: '',
      password: '',
      confirmPassword: '',
      showPasswordMismatch: false,
    };
  },
  methods: {
    handleSignup() {
      if (this.password !== this.confirmPassword) {
        // Passwords do not match, show the error message
        this.showPasswordMismatch = true;
        return;
      }

      // Reset the error message if passwords match
      this.showPasswordMismatch = false;
      this.$router.push('/checkoutindividual');
      

      // const postData = {
      //   username: this.username,
      //   password: this.password,
      // };

      // axios.post('SERVER_ENDPOINT', postData)
      //   .then(response => {
      //     console.log('Signup successful!', response.data);
      //     // You can perform additional actions on successful signup
      //     this.$router.push('/userhome');
      //   })
      //   .catch(error => {
      //     console.error('Error signing up:', error);
      //   });
    },
    openModal() {
      this.showModal = true;
      //console.log('Received postData in SignupModal:', this.postData);
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 400px;
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
