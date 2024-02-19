<template>
    <div>
      <!-- Button to open the signup dialog -->
      <button @click="openSignupDialog" class="hover:bg-slate-500 text-white px-4 py-2 rounded font-serif ">Signup</button>
  
      <!-- Signup dialog overlay -->
      <div v-if="isSignupDialogOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <!-- Signup dialog content -->
        <div class="bg-white p-8 rounded w-96">
          <!-- Signup form with close button inside -->
          <form @submit.prevent="handleSignup">
           
            
  
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username:</label>
            <input type="text" v-model="username" id="username" class="w-full px-3 py-2 border rounded mb-4" required>
  
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password:</label>
            <input type="password" v-model="password" id="password" class="w-full px-3 py-2 border rounded mb-4 text-black" required>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password:</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" class="w-full px-3 py-2 border rounded mb-4 text-black" required>

            
  
            <button type="submit" class="bg-blue-950 text-white px-4 py-2 rounded">Signup</button>
            <button  @click="closeSignupDialog" class="bg-gray-600 hover:bg-blue-950 px-4 py-2 m-4">close
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSignupDialogOpen: false,
        username: '',
        password: '',
        confirmPassword: '',
        // Add more data properties as needed for form fields
      };
    },
    methods: {
      openSignupDialog() {
        this.isSignupDialogOpen = true;
      },
      closeSignupDialog() {
        this.isSignupDialogOpen = false;
      },
      handleSignup() {
        
        this.closeSignupDialog();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles specific to this component */
  </style>
  