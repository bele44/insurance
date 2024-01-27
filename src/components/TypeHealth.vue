<template>
  <div class="sm:pt-28 lg:pt-2">
    <h1 class="text-black text-2xl font-bold ml-2">Select cover</h1>
    <div class="flex justify-start text-white">
      <div class="mt-6 flex items-center">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <label class="radio-container m-2">
            <input type="radio" v-model="selectedOption" value="perPerson" @change="handleOptionChange" />
            <span class="checkmark"></span>
            <h1 class="text-black text-lg font-bold">Individual Cover</h1>
          </label>
          <label class="radio-container m-2">
            <input type="radio" v-model="selectedOption" value="perFamily" @change="handleOptionChange" />
            <span class="checkmark"></span>
            <h1 class="text-black text-lg font-bold">Family Cover</h1>
          </label>
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
    };
  },
  watch: {
    selectedOption(newOption) {
      this.handleOptionChange();
    },
  },
  methods: {
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
.radio-container {
  position: relative;
  display: block;
  padding-left: 35px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 16px;
  color: black;
}

.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #2196f3; /* Change border color */
  border-radius: 50%;
}

.radio-container:hover input ~ .checkmark {
  background-color: #f3f3f3;
}

.radio-container input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}

.radio-container input:checked ~ .checkmark:after {
  content: '\2713'; /* Checkmark character */
  color: #fff;
  font-size: 14px;
}
</style>

