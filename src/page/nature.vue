<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="natureTab-container">
    <div class="road-title-container">
      <div class="road-title">•生态涵养助力绿色发展</div>
    </div>
    <el-scrollbar>
      <img src="/nature-clipped.png" class="scroll-img" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
//注意引入的写法

</script>

<style lang="scss" scoped>
div.natureTab-container {
  position: absolute;
  left: 12vw;
  top: 8vh;
  padding: 0;
  margin: 0;
  width: 88vw;
  height: 92vh;
  background-color: rgb(85, 255, 0);
  // background-image: url('../assets/farmer-bg.jpg');
  background-image: linear-gradient(to bottom, rgba(216, 216, 216, 0.2) 0%, rgba(222, 222, 222, 0.2) 100%), url('../assets/farmer-bg.jpg');
  background-position-y: center;
  //   url('../assets/rice-field.jpg');
  //filter: blur(4px);
  // -webkit-filter: blur(4px);
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;

  .el-scrollbar {
    height: 82vh;
    width: 88vw;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: rgba(0, 255, 255, 0.543);

    img.scroll-img {
      width: 100%;
    }

    // canvas {
    //   height: 82vh;
    //   width: 88vw;
    // }
  }
}



div.road-title-container {
  width: 88vw;
  height: 10vh;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  background-color: rgba(8, 54, 0, 0.309);

  div.road-title {
    font-family: 'KaiTi';
    font-weight: 600;
    font-size: calc(0.8vh + 1.6vw);
    text-align: center;

    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;

    height: 7vh;
    line-height: 7vh;

    width: fit-content;
    background-color: rgba(195, 255, 203, 0.7);
  }
}
</style>
