<template>
    <div class="statTab-container"></div>
    <div class="main-container">
        <router-view/>
    </div>
</template>
  
<script lang="ts" setup>


</script>
  
<style lang="scss" scoped>
div.statTab-container {
    position: absolute;
    left: 12vw;
    top: 8vh;
    padding: 0;
    margin: 0;
    width: 88vw;
    height: 92vh;
    // background-color: rgb(85, 255, 0);
    // background-image: url('../assets/farmer-bg.jpg');
    background-image: linear-gradient(
        to bottom,
        rgba(50, 50, 50, 0.2) 0%,
        rgba(50, 50, 50, 0.2) 100%
      ),
      url('../assets/farmer-bg.jpg');
    //   url('../assets/rice-field.jpg');
    filter: blur(4px);
    -webkit-filter: blur(4px);
    background-size: cover;
    background-repeat: no-repeat;
}
div.main-container{
    position: absolute;
    left: 12vw;
    top: 8vh;
    padding: 0;
    margin: 0;
    width: 88vw;
    height: 92vh;
    z-index: 999;
}
</style>
  