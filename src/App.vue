<template>
  <div class="header">
    <div class="header-title-focus">“蘇”</div>
    <div class="header-title">写新时代宜居宜业和美乡村新画卷</div>
    <div class="header-title-sub">——江苏省特色田园乡村调查</div>
    <div class="header-logo"></div>
  </div>
  <div class="verticle-nav">
    <el-menu default-active="1" :default-openeds="defaultOpen">
      <el-menu-item index="1" @click="routeStat">
        <div class="menu-item-icon one"></div>
        <span class="menu-item-text">首页</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <div class="menu-item-icon pie"></div>
          <span class="menu-item-text">指标体系</span>
        </template>
        <el-menu-item index="2-1" @click="routeStat">
          <!-- <div class="menu-item-icon one"></div> -->
          <span class="menu-item-text">村庄发展潜能</span>
        </el-menu-item>
        <el-menu-item index="2-2" @click="routeStat">
          <!-- <div class="menu-item-icon one"></div> -->
          <span class="menu-item-text">村庄发展成效</span>
        </el-menu-item>
        <el-menu-item index="2-3" @click="routeStat">
          <!-- <div class="menu-item-icon one"></div> -->
          <span class="menu-item-text">指标说明</span>
        </el-menu-item>
        <el-menu-item index="2-4" @click="routeStat">
          <!-- <div class="menu-item-icon one"></div> -->
          <span class="menu-item-text">打分表</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <div class="menu-item-icon road"></div>
          <span class="menu-item-text">建设路径</span>
        </template>
        <el-menu-item index="3-1" @click="routeStat">
          <!-- <div class="menu-item-icon one"></div> -->
          <span class="menu-item-text">产业主导</span>
        </el-menu-item>
        <el-menu-item index="3-2" @click="routeStat">
          <!-- <div class="menu-item-icon one"></div> -->
          <span class="menu-item-text">绿色发展</span>
        </el-menu-item>
        <el-menu-item index="3-3" @click="routeStat">
          <!-- <div class="menu-item-icon one"></div> -->
          <span class="menu-item-text">文化传承</span>
        </el-menu-item>
        <el-menu-item index="3-4" @click="routeStat">
          <!-- <div class="menu-item-icon one"></div> -->
          <span class="menu-item-text">特色治理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4" @click="routeStat">
        <div class="menu-item-icon key"></div>
        <span class="menu-item-text">建设密码</span>
      </el-menu-item>
    </el-menu>
  </div>
  <!-- <div class="tab-container">

  </div> -->
  <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const routeStat = (e) => {
  const routerIndex = e.index
  if(routerIndex == '2-1'){
    router.push('/potential')
  }
  else if(routerIndex == '2-2'){
    router.push('/effect')
  }
  else if(routerIndex == '2-3'){
    router.push('/target')
  }
  else if(routerIndex == '2-4'){
    router.push('/scoreTable')
  }
  else{
    router.push('/stat')
  }

}
//解决ResizeObserver loop completed with undelivered notifications
const debounce = (callback: (...args: any[]) => void, delay: number) => {
    let tid: any;
    return function (...args: any[]) {
      const ctx = self;
      tid && clearTimeout(tid);
      tid = setTimeout(() => {
        callback.apply(ctx, args);
      }, delay);
    };
  };

const _ = (window as any).ResizeObserver;
(window as any).ResizeObserver = class ResizeObserver extends _ {
  constructor(callback: (...args: any[]) => void) {
    callback = debounce(callback, 20);
    super(callback);
  }
};
const defaultOpen = ref(['2', '3']);

</script>

<style lang="scss">
#app,
body {
  height: 100vh;
  width: 100vw;
  // background-color: aqua;
  margin: 0;
  padding: 0;
}

div.header {
  position: absolute;
  width: 100vw;
  height: 8vh;
  padding: 0;
  margin: 0;
  background-image: url('./assets/rice-field-clipped.jpg');
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  flex-flow: row nowrap;

  &:hover {
    cursor: pointer;
  }

  div.header-title-focus {
    line-height: 8vh;
    font-size: calc(1vh + 2vw);
    width: fit-content;
    font-family: 'STZhongsong';
    font-weight: 600;
    background-image: linear-gradient(25deg,
        #fdfffc 0%,
        #a7ecc6 40%,
        #38eb83 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  div.header-title {
    line-height: 8vh;
    font-size: calc(0.6vh + 1.4vw);
    width: fit-content;
    font-weight: 600;
    // color: rgba($color: #ecffe8, $alpha: .8);
    background-image: linear-gradient(25deg,
        #fdfffc 0%,
        #d8f5e5 40%,
        #abe3c2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  div.header-title-sub {
    line-height: 8vh;
    font-size: calc(0.4vh + 1.2vw);
    width: fit-content;
    font-weight: 400;
    // color: rgba($color: #ecffe8, $alpha: .8);
    background-image: linear-gradient(25deg,
        #fdfffc 0%,
        #eefff5 40%,
        #d1ffce 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  div.header-logo {
    position: absolute;
    right: 2vw;
    top: 1vh;
    height: 6vh;
    width: 6vh;
    background-image: url('./assets/china-country.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
}

div.verticle-nav {
  position: absolute;
  height: 92vh;
  width: 12vw;
  // background-color: bisque;
  background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 100%
      ),
      // url('./assets/green-field-clipped.jpg');
      url('./assets/rice-field-vertical.jpg');
  // background-image: url('./assets/green-field-clipped.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  left: 0;
  top: 8vh;
  padding: 0;
  margin: 0;

  ul.el-menu {
    background-color: rgba(17, 17, 17, 0.5);
    backdrop-filter: blur(2px);
    border-radius: 6px;
  }

  div.menu-item-icon {
    height: 4vh;
    width: 4vh;
    // background-color: aqua;
    margin-right: 8%;
    transition: all ease-in-out 0.2s;

    &.one {
      background-image: url('./assets/jiangsu.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    &.two {
      background-image: url('./assets/jiangsu.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    &.three {
      background-image: url('./assets/farmland.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    &.key {
      background-image: url('./assets/key1.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    &.pie {
      background-image: url('./assets/pieChart.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    &.road {
      background-image: url('./assets/roadmap.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  span.menu-item-text {
    font-size: calc(0.3vh + 0.9vw);
    font-weight: 800;
    font-family: 'KaiTi', 'FangSong', 'SimHei';
    transition: all ease-in-out 0.2s;
  }

  li.el-sub-menu {
    // height: 6vh;
    transition: all ease-in-out 0.2s;
    border-radius: 6px;
    color: #ffff;
    div.el-sub-menu__title {
      color: #ffff;
      &:hover {
        background-color: #00531e8b;
      }
    }
    div.menu-item-icon {
      height: 2.4vh;
      width: 2.4vh;
      transition: all ease-in-out 0.2s;
    }
    &.is-active {
      div.menu-item-icon {
        height: 2.8vh;
        width: 2.8vh;
        transition: all ease-in-out 0.2s;
      }
    }

    &:hover {
      background-color: #00531e8b;
    }
    // border-radius: 6px;
    // border-style: solid;
    // border-width: 1px;
    // border-color: #d8f5ff;
  }

  li.el-menu-item {
    padding-left: 0;
    // height: 6vh;
    transition: all ease-in-out 0.2s;
    border-radius: 6px;
    color: #ffff;
    // border-style: solid;
    // border-width: 1px;
    // border-color: #d8f5ff;
    div.menu-item-icon {
      height: 2.4vh;
      width: 2.4vh;
      transition: all ease-in-out 0.2s;
    }

    &.is-active {
      background-image: linear-gradient(45deg,
        rgb(221, 255, 220) 0%,
        rgb(170, 255, 169) 30%,
        rgb(17, 249, 87) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: rgb(0, 58, 158);
      border-style: outset;
      border-width: 3px;
      span.menu-item-text {
        font-size: calc(0.5vh + 1vw);
        transition: all ease-in-out 0.2s;
      }
      transition: all ease-in-out 0.2s;
      // border-color: #a1e6ff;

      div.menu-item-icon {
        height: 2.8vh;
        width: 2.8vh;
        transition: all ease-in-out 0.2s;
      }
    }

    &:hover {
      background-color: #00531e8b;
    }

    // background-color: rgba($color: #fffafa, $alpha: 0.2);
  }
}

div.tab-container {
  position: absolute;
  left: 12vw;
  top: 8vh;
  padding: 0;
  margin: 0;
  width: 88vw;
  height: 92vh;
  background-color: blue;
}
</style>
