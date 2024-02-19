<template>
  <div>
    <LoginHeader/>

    <div class="pt-24 ">
      <div class="image-container">
        <div class="image-wrapper">
          <img v-for="(image, index) in images" :key="index" :src="image" class="animated-image"
            :style="{ opacity: activeIndex === index ? 1 : 0, transform: `translate(-50%, -50%) translateX(${(index - activeIndex) * 100}%)` }" />
        </div>
        <button @click="prevSlide" class="carousel-button prev">Previous</button>
        <button @click="nextSlide" class="carousel-button next">Next</button>
      </div>
    </div>

    <!-- Cards Below the Image Carousel -->
    <div class="card-container">
      <div class="card">
        <h3 class="text-xl font-serif font-semibold">NISCO at a Glance</h3>
        <p class="font-normal font-serif text-lg">One of the leading Private insurance companies in Ethiopia.</p>
      </div>
      <div class="card">
        <h3 class="text-xl font-serif font-semibold">Vision and Mission</h3>
        <p class="font-normal font-serif text-lg">Our vision is to be the preferred provider of insurance solutions in all markets we serve.
          Our Mission is to help our customers...</p>
      </div>

      <div class="card-core">
  <h3 class="text-xl font-serif font-semibold">CORE VALUES</h3>
  <p v-for="(value, index) in coreValues" :key="index" :style="{ opacity: activeParagraph === index ? 1 : 0 }" class="font-normal font-serif text-lg">{{ value }}</p>
</div>
    </div>
    
  </div>
  <div class="foot  bg-gray-800 text-white py-4 text-center ">
      <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
  
        <!-- Footer information -->
        <div class=" flex-col items-center md:text-left md:mr-8 grid grid-cols-2">
          <p class="text-base mb-2">For inquiries, contact us at:</p>
          <p class="text-lg font-bold">Nyala Medical Insurance Services</p>
          <div class="flex items-center space-x-4 mt-2 text-base">
            <div>
              <i class="fas fa-map-marker-alt text-lg"></i>
            </div>
            <div>
             Bole, Addis Abeba, Ethiopia
            </div>
          </div>
          <div class="flex items-center space-x-4 mt-2 text-base">
            <div>
              <i class="fas fa-phone-alt text-lg"></i>
            </div>
            <div>
              +25191-456-7890
            </div>
          </div>
          <div class="flex items-center space-x-4 mt-2 text-base">
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
      <p class="text-base mt-4">© 2024 Medical Insurance. All rights reserved.</p>
    </div>
</template>



<script>
import LoginHeader from '../components/LoginHeader.vue';
import MedicalFooter from "../components/MedicalFooter.vue";

export default {
  name: 'MyHome',
  components: {
    LoginHeader,
    MedicalFooter,
  },
  data() {
    return {
      images: [
        '../src/assets/airport.png',
        '../src/assets/Artboard.png',
        '../src/assets/banner.png',
        '../src/assets/1.png',
        '../src/assets/poster.png',
        '../src/assets/Livestock.png',
        '../src/assets/Get insured.png',
      ],
      coreValues: [
        'EXCELLENCE : We set and strive to achieve stretched goals, work constantly to improve, and deliver what we promise and beyond whenever possible.',
        'INTEGRITY : We commit ourselves to conduct our business honestly, ethically and consistently.',
        'INNOVATION : We commit ourselves to conduct our business honestly, ethically and consistently.',
        'PROFESSIONALISM: We engage ourselves at all times,in a professional manner paying due attention to the code of ethics required  in professional insurance service'

      ],
      activeIndex: 0,
      intervalId: null,
      intervalIdParagraphs :null,
      activeParagraph: 0,
    };
  },
  mounted() {
    this.startSlideshow();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    
    startSlideshow() {
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.images.length;
      }, 5000); // Change this to 5000 milliseconds (5 seconds) for each image
        // Set interval for core values paragraphs
    this.intervalIdParagraphs = setInterval(() => {
      this.activeParagraph = (this.activeParagraph + 1) % this.coreValues.length;
    }, 5000); // Change this to 5000 milliseconds (5 seconds) for each paragraph
  },
    
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
    },
  },
};
</script>

<style scoped>

.image-container {
  display: flex;
  overflow: hidden;


}

.image-wrapper {
  display: flex;
  transition: transform 1s ease-in-out;


}

.animated-image {
  width: 80%;     
  height: 50%;
  /* object-fit:cover ; */
  position: absolute;
  top: 40%;
  left: 50%;
  
  transition: opacity 1s ease-in-out, transform 1s ease-in-out, scale 1s ease-in-out;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.next {
  right: 10px;
}

.prev {
  left: 10px;
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  position: absolute;
  top: 70%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
 
  width: 100%;

}

.card {
  width: 30%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
}

.card h3 {
  color: #333;
}

.card p {
 
  color: #666;
}
.card-core {
  width: 30%;
  padding: 15px;
  
  border-radius: 5px;
  
  
  
}
.card-core p {
   color: #666;
   position: absolute;
}
.foot {
  position: absolute;
  top: 100%;
  width: 100%;
}

</style>