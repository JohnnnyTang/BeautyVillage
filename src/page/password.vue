<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="passWordTab-container">
    <div class="button-group-container">
      <el-button-group class="button-group">
        <el-button type="success" size="large" @click="pass1" text plain class="tab-button" color="#000"
          font-weight="bold"> 以物质空间改善为先导<br>筑牢绿色保障</el-button>
        <el-button type="danger" size="large" @click="pass2" text plain class="tab-button" color="#000">
          以历史文化沉淀为底蕴<br>打造乡土特色 </el-button>
        <el-button type="danger" size="large" @click="pass3" text plain class="tab-button"
          color="#000">以特色的产业链为主线<br>实现产业融合 </el-button>
        <el-button type="danger" size="large" @click="pass4" text plain class="tab-button" color="#000">
          &nbsp;以城乡融合发展为蓝本<br>注入城市活力 </el-button>
        <el-button type="danger" size="large" @click="pass5" text plain class="tab-button" color="#000">
          以乡村共建共享为载体<br>协同联动发展 </el-button>
      </el-button-group>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import router from '../router'

// const router = useRouter()

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
div.passWordTab-container {
  position: absolute;
  left: 12vw;
  top: 8vh;
  padding: 0;
  margin: 0;
  width: 88vw;
  height: 92vh;
  overflow: hidden;
  // background-color: rgb(85, 255, 0);
  // background-image: url('../assets/farmer-bg.jpg');
  //background-image: linear-gradient(to bottom, rgba(50, 50, 50, 0.2) 0%, rgba(50, 50, 50, 0.2) 100%), url('../assets/farmer-bg.jpg');
  //   url('../assets/rice-field.jpg');
  // filter: blur(4px);
  //-webkit-filter: blur(4px);
  //background-size: cover;
  //background-repeat: no-repeat;

  div.button-group-container {
    height: 8vh;

    .button-group {
      height: 8vh;
      width: 88vw;

      button {
        width: 17.6vw;
        height: 8vh;
        padding: 0;
        background-color: rgba(213, 255, 212, 0.702);
        margin-right: 0;
        border-style:inset;
        border-width: 1px;
        border-color: rgba(13, 105, 4, 0.823);

        &:hover {
          background-color: rgba(128, 211, 127, 0.702);
        }

        &:focus {
          background-color: rgba(170, 231, 169, 0.767);
        }

      }
    }
  }
}

.el-button {
  span {
    font-family: 'KaiTi';
    font-weight: 600;
    font-size: calc(0.5vh + 0.8vw);
  }
}</style>
