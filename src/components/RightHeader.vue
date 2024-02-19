<template>
  <div class=" items-center grid grid-cols-1 md:grid-cols-2 md:gap-4 p-2">
    <router-link to="/login" class=" font-serif text-xl hover:bg-gray-500  rounded-lg pt-2 pb-2 pl-2">Login</router-link>
    <SignupDialog class="text-xl" />
    <!-- <a v-on:click="logout" href="#"></a> -->
  </div>
</template>

<script>
import SignupDialog from '../components/SignupDialog.vue';

export default {
  name: 'RightHeader',
  components: {
    SignupDialog,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style>
.nav {
  overflow: hidden;
}



.nav a:hover {
  background: #ddd;
  color: #333;
}

/* Media query for responsiveness */
@media only screen and (max-width: 767px) {
  .nav {
    grid-template-columns: 1fr; /* Switch to a single column layout on smaller screens */
    text-align: center; /* Center the text */
  }

  .nav a {
    margin-right: 0; /* Remove margin-right */
    margin-bottom: 10px; /* Increase margin-bottom for better separation */
  }
}
</style>
