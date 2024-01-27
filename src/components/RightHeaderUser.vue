<template>
  <div class="nav items-center grid grid-cols-1 md:grid-cols-2 md:gap-4 p-2">
   <!--<router-link to="/">Login</router-link> --> 
    
     <a v-on:click="logout" href="#">Logout</a> 
  </div>
</template>

<script>


export default {
  name: 'RightHeader',
  components: {
    
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

.nav a {
  display: block; /* Display as block to occupy full width */
  color: #f2f2f2f2;
  padding: 15px 20px; /* Adjusted padding for better spacing */
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-bottom: 5px; /* Add margin-bottom to create separation */
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
