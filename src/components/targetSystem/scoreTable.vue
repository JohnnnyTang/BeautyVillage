<template>
    <div class="statTab-container"></div>
    <div class="main-container">
        <div class="tab">
    <el-form :inline="true">
      <el-form-item label="类型">
        <el-select v-model="value" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-button type="primary" @click="onSearch">搜索</el-button> -->
    </el-form>
  </div>
  <div class="table"> 
    <el-table
        :data="tableData"
        style="width: fit-content;height:90%"
        class="eleTable">
        <el-table-column
        prop="id"
        label="序号"
        width="70">
        </el-table-column>
        <el-table-column
        prop="city"
        label="设区市"
        width="100">
        </el-table-column>
        <el-table-column
        prop="county"
        label="县（市、区）"
        width="100">
        </el-table-column>
        <el-table-column
        prop="town"
        label="乡镇（街道）"
        width="100">
        </el-table-column>
        <el-table-column
        prop="adminVillage"
        label="行政村"
        width="150">
        </el-table-column>
        <el-table-column
        prop="naturalVillage"
        label="自然村"
        width="150">
        </el-table-column>
        <el-table-column
        prop="NamedBatch"
        label="命名批次"
        width="60">
        </el-table-column>
        <el-table-column
        prop="IndustryOriented1"
        :label="label[0]"
        width="140">
        </el-table-column>
        <el-table-column
        prop="IndustryOriented2"
        :label="label[1]"
        width="120">
        </el-table-column>
        <el-table-column
        prop="IndustryOriented3"
        :label="label[2]"
        width="120">
        </el-table-column>
        <el-table-column
        v-if="label[3]"
        prop="IndustryOriented4"
        :label="label[3]"
        width="90">
        </el-table-column>
        <el-table-column
        prop="IndustryOrientedAll"
        label="总分"
        width="60">
        </el-table-column>
    </el-table>
  </div>
    </div>


</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import socreTable1 from '@/assets/json/socreTable1.json'
import socreTable2 from '@/assets/json/socreTable2.json'
import socreTable3 from '@/assets/json/socreTable3.json'
import socreTable4 from '@/assets/json/socreTable4.json'
const types = [{
    value: 'Industry Leading',
    label: '产业主导'
  }, {
    value: 'Green Development',
    label: '绿色发展'
  }, {
    value: 'Culture Succession',
    label: '文化传承'
  }, {
    value: 'Characteristic Governance',
    label: '特色治理'
  }]
const tableTitle = {
  '产业主导型':['主导产业特色性','产品丰富度','产品品质化'],
  '绿色发展型':['景观性','特色性','地形地貌丰富度'],
  '文化传承型':['独特性','历史古迹完整性','传承与发展','类型与数量'],
  '特色治理型':['村容洁净度','生活垃圾处理情况','村内污水处理']
}

const value = ref('产业主导')

const tableData = ref<any[]>([])
const label = ref<string[]>(['主导产业特色性','产品丰富度','产品品质化'])
const handleChange = (value: any)=>{
  console.log(value);
  if(value === 'Industry Leading'){
    tableData.value = socreTable1
    label.value = tableTitle['产业主导型']
  }
  else if(value === 'Green Development'){
    tableData.value = socreTable2
    label.value = tableTitle['绿色发展型']
  }
  else if(value === 'Characteristic Governance'){
    tableData.value = socreTable4
    label.value = tableTitle['特色治理型']
  }
  else
  {
    tableData.value = socreTable3
    label.value = tableTitle['文化传承型']
  }
  console.log(label.value);
  
}
onMounted(()=>{
  tableData.value = socreTable1 
})
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
      url('../../assets/farmer-bg.jpg');
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
    .tab{
  height: 5%;
  width: 80%;
  margin-left: 12%;
  margin-top:2% ;
}
.tab ::v-deep .el-form-item__label {
    color: white ;
    font-weight: 800;
    font-size: 36;
  }
.table{
  position: relative;
  margin-top: 1%;
  margin-left: 12%;
  height: 85%;
  /*表格悬停颜色 */
  .eleTable ::v-deep .el-table__body tr:hover > td {
      background-color: rgb(122,123,26,0.5) !important;
  } 
  /* 表格内背景颜色 */
  ::v-deep .el-table th,
  ::v-deep .el-table tr,
  ::v-deep .el-table td {
    background-color: transparent;
    color: white;
    border: 1px solid white;
  }
  ::v-deep .el-table td.el-table__cell,
  ::v-deep .el-table th.el-table__cell.is-leaf {
    border-bottom: 0;
  }
  ::v-deep.el-table--enable-row-transition .el-table__body td.el-table__cell {
    background-color: transparent !important;
  }
  ::v-deep.el-table td.el-table__cell div.cell {
    background-color: transparent !important;
  }
  ::v-deep .el-table {
    background-color: transparent !important;
  }
  // ::v-deep .el-table__row {
  //   background-color: transparent ;
  // }
  /* 去除底部白线 */
  :deep(.el-table__inner-wrapper::before) {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    z-index: 3;
  }
  .el-table{
    border: 1px solid white;
  }
}
}

</style>
  