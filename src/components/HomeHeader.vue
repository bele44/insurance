<template>
    <div class="flex justify-between items-center bg-gray-800 text-white fixed top-0 left-0 right-0 z-50 ">
      <!-- Left side: Family -->
      <div class="flex items-center">
        <i class="fas fa-ambulance text-2xl ml-10"></i>
        <p class="font-bold text-2xl ml-10"> Medical Insurance</p>
      </div>
  
      <!-- Middle section: Packages -->
      <div class="flex items-center">
        
  
        <!-- Package Panel Toggle Button -->
        <button @click="togglePackagePanel" class="icon-button ml-4">
          <i class="fas fa-layer-group text-2xl"></i>
        </button>
      </div>
  
     
  
      <!-- Package Panel -->
      <div v-if="isPackagePanelOpen" class="package-panel">
        <!-- Health Insurance -->
        <router-link to="/health-insurance" class="cursor-pointer">
          <div class="column">
            <i class="fas fa-heart text-2xl"></i>
            <p class="text-sm">Health Insurance</p>
          </div>
          <div class="column">
            <i class="fas fa-heart text-2xl"></i>
            <p class="text-sm">Condominium Insurance</p>
          </div>
          <div class="column">
            <i class="fas fa-heart text-2xl"></i>
            <p class="text-sm">Burglary and Housebreaking Insurance</p>
          </div>
        </router-link>
  
        <!-- Medical Insurance -->
        <router-link to="/medical-insurance" class="cursor-pointer">
          <div class="column">
            <i class="fas fa-hospital text-2xl"></i>
            <p class="text-sm">Medical Insurance</p>
          </div>
          <div class="column">
            <i class="fas fa-hospital text-2xl"></i>
            <p class="text-sm">Fidelity Guarantee Insurance</p>
          </div>
          <div class="column">
            <i class="fas fa-hospital text-2xl"></i>
            <p class="text-sm">Marine Cargo Insurance</p>
          </div>
        </router-link>
  
        <!-- Other Insurance -->
        <router-link to="/other-insurance" class="cursor-pointer">
          <div class="column">
            <i class="fas fa-shield-alt text-2xl"></i>
            <p class="text-sm">Money Insurance</p>
          </div>
              <div class="column">
            <i class="fas fa-shield-alt text-2xl"></i>
            <p >Motor Insurance</p>
          </div>
          <div class="column">
            <i class="fas fa-shield-alt text-2xl"></i>
            <p >Travel Health Insurance</p>
          </div>
        </router-link>
      </div>
  
      <!-- Right Header Component -->
      <div class="lg:ml-auto"><RightHeaderUser/></div>
       <!-- Help Dialog Content -->
       <button @click="openHelpDialog" class="icon-button">
          <i class="fas fa-question-circle text-2xl"></i>
        </button>
       <div v-if="isHelpDialogOpen" class="help-dialog">
        <p>Have Questions?</p>
        <p>Email: bele@example.com</p>
        <p>Phone: +251909356347</p>
        <button @click="closeHelpDialog" class="bg-black text-white p-1">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  import RightHeaderUser from './RightHeaderUser.vue';
  
  export default {
    name: 'MyHeader',
    components: {
      RightHeaderUser,
    },
    data() {
      return {
        isHelpDialogOpen: false,
        isPackagePanelOpen: false,
      };
    },
    methods: {
      openHelpDialog() {
        this.isHelpDialogOpen = true;
      },
      closeHelpDialog() {
        this.isHelpDialogOpen = false;
      },
      togglePackagePanel() {
        this.isPackagePanelOpen = !this.isPackagePanelOpen;
      },
    },
  };
  </script>
  
  <style>
  .icon-button {
    padding: 0.5rem;
    margin: 1rem;
    cursor: pointer;
    position: relative;
  }
  .icon-button:hover .contact-info {
    display: block;
  }
  .help-dialog {
    display: block; /* Hide the dialog by default */
    position: absolute;
    top: 50px;
    left: 90%;
    transform: translateX(-50%);
    background-color: black;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    text-align: center;
    z-index: 2;
  }
  .package-panel {
    display: flex;
    justify-content: center;
    position: absolute;
    
    left: 20%;
    transform: translateX(-50%);
    background-color:gray;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 2;
  
  }
  .package-panel .column {
    text-align: center;
    padding: 1rem;
    cursor: pointer;
  }
  .package-panel .column:hover {
    background-color: #4a4a4a;
  }
  @media only screen and (max-width: 768px) {
    .flex {
      flex-direction: column; /* Stack items vertically on smaller screens */
    }
  
    .ml-auto {
      margin-left: auto; /* Align the RightHeader to the right on smaller screens */
    }
  
    .icon-button {
      margin: 1rem 0; /* Adjust margin for smaller screens */
    }
  
    .help-dialog,
    .package-panel {
      left: 50%; /* Center the dialogs horizontally on smaller screens */
    }
  
    .help-dialog {
      top: 70px; /* Adjust top position for smaller screens */
    }
  
    .package-panel {
      top: 120px; /* Adjust top position for smaller screens */
    }
  
    .package-panel .column {
      padding: 0.5rem; /* Adjust padding for smaller screens */
    }
  }
  </style>
  