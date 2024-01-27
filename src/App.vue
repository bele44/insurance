<template>
  <router-view/>
</template>
<script>



export default {
  name: 'App',

  components: {
    
},

  data: () => ({
    //
  }),
}
</script>

<style>
.custom-button {
  background-color: #4caf50; 
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 4px;
}

.custom-button:hover {
  background-color: #45a049;
}

.custom-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>
