<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="statTab-container">
    <div><h1 class="h1style">扎根基层赋能特色治理</h1></div>
    <div class="interviewVideo_main" id="videoContainer" v-loading="loading">
      <!--此处根据pdf的页数动态生成相应数量的canvas画布-->
      <canvas v-for="pageIndex in pdfPages" :id="`pdf-canvas-` + pageIndex" :key="pageIndex" style="display: block"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
//注意引入的写法
import * as pdfjsLib from 'pdfjs-dist/build/pdf'
let pdfDoc = reactive({}) // 保存加载的pdf文件流
let pdfPages = ref(0) // pdf文件的页数
let pdfUrl = ref('administer.pdf') //pdf文件的链接
let pdfScale = ref(2.81) // 缩放比例
//调用loadFile方法
onMounted(() => {
  loadFile(pdfUrl.value)
  setTimeout(() => {
    loading.value = false
  }, 2500)
})
const loading = ref(true)
//获取pdf文档流与pdf文件的页数
const loadFile = async url => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
  const loadingTask = pdfjsLib.getDocument(url)
  loadingTask.promise.then(pdf => {
    console.log(pdf)
    pdfDoc = pdf
    pdfPages.value = pdf.numPages
    nextTick(() => {
      renderPage(1)
    })
  })
}
//渲染pdf文件
const renderPage = num => {
  pdfDoc.getPage(num).then(page => {
    const canvasId = 'pdf-canvas-' + num
    const canvas = document.getElementById(canvasId)
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
    const ratio = dpr / bsr
    const viewport = page.getViewport({ scale: pdfScale.value })
    canvas.width = viewport.width * ratio
    canvas.height = viewport.height * ratio
    canvas.style.width = viewport.width + 'px'
    canvas.style.height = viewport.height + 'px'
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }
    page.render(renderContext)
    if (num < pdfPages.value) {
      renderPage(num + 1)
    }
  })
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
  background-color: rgb(85, 255, 0);
  background-image: url('../assets/farmer-bg.jpg');
  background-image: linear-gradient(to bottom, rgba(50, 50, 50, 0.2) 0%, rgba(50, 50, 50, 0.2) 100%), url('../assets/farmer-bg.jpg');
  //   url('../assets/rice-field.jpg');
  //filter: blur(4px);
  // -webkit-filter: blur(4px);
  background-size: cover;
  background-repeat: no-repeat;
}
.interviewVideo_main {
  height: 760px;
  overflow-y: auto;
}
.h1style {
  font-family: 宋体;
  color: #000;
  display: block;
  text-align: center;
  font-size: 35px;
}
</style>
