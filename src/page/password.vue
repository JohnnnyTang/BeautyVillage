<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="statTab-container">
    <div>
      <el-button-group class="button-group">
        <el-button type="success" size="large" @click="pass1" text plain class="button" color="#000" font-weight="bold"> 以物质空间改善为先导，筑牢绿色保障 &nbsp;</el-button>
        <el-button type="danger" size="large" @click="pass2" text plain class="button" color="#000"> 以历史文化沉淀为底蕴，打造乡土特色 </el-button>
        <el-button type="danger" size="large" @click="pass3" text plain class="button" color="#000">以特色的产业链为主线，实现产业融合 </el-button>
        <el-button type="danger" size="large" @click="pass4" text plain class="button" color="#000"> &nbsp;以城乡融合发展为蓝本，注入城市活力 </el-button>
        <el-button type="danger" size="large" @click="pass5" text plain class="button" color="#000"> 以乡村共建共享为载体，协同联动发展 </el-button>
      </el-button-group>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const pass1 = () => {
  router.push('pass1')
}
const pass2 = () => {
  router.push('pass2')
}
const pass3 = () => {
  router.push('pass3')
}
const pass4 = () => {
  router.push('pass4')
}
const pass5 = () => {
  router.push('pass5')
}
</script>

<style lang="scss">
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
  //background-image: linear-gradient(to bottom, rgba(50, 50, 50, 0.2) 0%, rgba(50, 50, 50, 0.2) 100%), url('../assets/farmer-bg.jpg');
  //   url('../assets/rice-field.jpg');
  // filter: blur(4px);
  //-webkit-filter: blur(4px);
  //background-size: cover;
  //background-repeat: no-repeat;
}

.carouseldiv {
  height: max-content;
}
.buttongroup {
  width: 100%;
}
.button {
  font-size: 16px;
  font-family: 宋体;
}

.el-button {
  span {
    font-weight: 700;
  }
}
</style>
