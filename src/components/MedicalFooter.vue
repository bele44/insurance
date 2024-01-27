<!-- MedicalFooter.vue -->
<template>
    <footer class="bg-gray-800 text-white py-4 text-center">
      <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
  
        <!-- Footer information -->
        <div class=" flex-col items-center md:text-left md:mr-8 grid grid-cols-2">
          <p class="text-sm mb-2">For inquiries, contact us at:</p>
          <p class="text-lg font-bold">Nyala Medical Insurance Services</p>
          <div class="flex items-center space-x-4 mt-2 text-sm">
            <div>
              <i class="fas fa-map-marker-alt text-lg"></i>
            </div>
            <div>
             Bole, Addis Abeba, Ethiopia
            </div>
          </div>
          <div class="flex items-center space-x-4 mt-2 text-sm">
            <div>
              <i class="fas fa-phone-alt text-lg"></i>
            </div>
            <div>
              +25191-456-7890
            </div>
          </div>
          <div class="flex items-center space-x-4 mt-2 text-sm">
            <div>
              <i class="fas fa-envelope text-lg"></i>
            </div>
            <div>
              nyala@medicalinsurance.com
            </div>
          </div>
        </div>
  
        
      </div>
  
      <!-- Copyright information -->
      <p class="text-sm mt-4">© 2024 Medical Insurance. All rights reserved.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'MedicalFooter',
  };
  </script>
  
  <style scoped>
  /* Add your styles specific to the footer here */
  </style>
  