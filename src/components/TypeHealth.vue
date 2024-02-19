<template>
  <div class="sm:pt- lg:pt-2">
    <div class="flex justify-start text-white">
      <div class="flex items-center">
        <div class="dropdown">
          <div class="dropdown-toggle" @click="toggleDropdown">
            <span class="selected-option text-xl font-serif">{{ selectedOption ? selectedOption : 'Medical Covers' }}</span>
            <div class="arrow-down"></div>
          </div>

          <div v-show="isDropdownOpen" class="dropdown-options show font-serif">
            <div @click="selectOption('perPerson')" >Individual Cover</div>
            <div @click="selectOption('perFamily')">Family Cover</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypeHealth',
  data() {
    return {
      selectedOption: '',
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      console.log('Dropdown toggled');
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
      this.handleOptionChange();
    },
    handleOptionChange() {
      if (this.selectedOption === 'perPerson') {
        this.$router.push({ name: 'PerPerson' });
      } else if (this.selectedOption === 'perFamily') {
        this.$router.push({ name: 'PerFamily' });
      }
    },
  },
};
</script>

<style scoped>
/* Dropdown Styles */
.dropdown {
  margin-left: 10px;
  position: relative;
  width: 200px;
}

.dropdown-toggle {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
  position: absolute;
  top: 50%;
  left: calc(100% - 50px); 
  transform: translateY(-50%);
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1000;
  background-color: #fff;
}

.dropdown-options.show {
  display: block;
}

.dropdown-options div {
  padding: 10px;
  cursor: pointer;
  color: black;
}

.dropdown-options div:hover {
  background-color: blue;
}
</style>
