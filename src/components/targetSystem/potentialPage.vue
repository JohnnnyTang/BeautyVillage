<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="statTab-container"></div>
    <div class="main-container">
      <div class="container">
        <div class="leftContainer" style="width:51%;height:88vh;overflow-y: auto;">
          <div class="title">权重矩阵</div>
          <el-row>
            <el-col :span="12">
              <el-table :data="juzhen1_1" style="width: 100%">
                <el-table-column prop="A1" label="A1" />
                <el-table-column prop="B1" label="B1" />
                <el-table-column prop="B2" label="B2" />
                <el-table-column prop="B3" label="B3" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen1_2" style="width: 100%">
                <el-table-column prop="B1" label="B1" />
                <el-table-column prop="C1" label="C1" />
                <el-table-column prop="C2" label="C2" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen1_3" style="width: 100%">
                <el-table-column prop="B2" label="B2" />
                <el-table-column prop="C3" label="C3" />
                <el-table-column prop="C4" label="C4" />
                <el-table-column prop="C5" label="C5" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen1_4" style="width: 100%">
                <el-table-column prop="B3" label="B3" />
                <el-table-column prop="C6" label="C6" />
                <el-table-column prop="C7" label="C7" />
                <el-table-column prop="C8" label="C8" />
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-table :data="juzhen2_1" style="width: 100%">
                <el-table-column prop="A2" label="A2" />
                <el-table-column prop="B4" label="B4" />
                <el-table-column prop="B5" label="B5" />
                <el-table-column prop="B6" label="B6" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen2_2" style="width: 100%">
                <el-table-column prop="B4" label="B4" />
                <el-table-column prop="C9" label="C9" />
                <el-table-column prop="C10" label="C10" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen2_3" style="width: 100%">
                <el-table-column prop="B5" label="B5" />
                <el-table-column prop="C11" label="C11" />
                <el-table-column prop="C12" label="C12" />
                <el-table-column prop="C13" label="C13" />
              </el-table>
            </el-col>
            <el-col :span="20">
              <el-table :data="juzhen2_4" style="width: 100%">
                <el-table-column prop="B6" label="B6" />
                <el-table-column prop="C14" label="C14" />
                <el-table-column prop="C15" label="C15" />
                <el-table-column prop="C16" label="C16" />
                <el-table-column prop="C17" label="C17" />
                <el-table-column prop="C18" label="C18" />
                <el-table-column prop="C19" label="C19" />
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-table :data="juzhen3_1" style="width: 100%">
                <el-table-column prop="A3" label="A3" />
                <el-table-column prop="B7" label="B7" />
                <el-table-column prop="B8" label="B8" />
                <el-table-column prop="B9" label="B9" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen3_2" style="width: 100%">
                <el-table-column prop="B7" label="B7" />
                <el-table-column prop="C20" label="C20" />
                <el-table-column prop="C21" label="C21" />
                <el-table-column prop="C22" label="C22" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen3_3" style="width: 100%">
                <el-table-column prop="B8" label="B8" />
                <el-table-column prop="C23" label="C23" />
                <el-table-column prop="C24" label="C24" />
                <el-table-column prop="C25" label="C25" />
              </el-table>
            </el-col>
            <el-col :span="10">
              <el-table :data="juzhen3_4" style="width: 100%">
                <el-table-column prop="B9" label="B9" />
                <el-table-column prop="C26" label="C26" />
                <el-table-column prop="C27" label="C27" />
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-table :data="juzhen4_1" style="width: 100%">
                <el-table-column prop="A4" label="A4" />
                <el-table-column prop="B10" label="B10" />
                <el-table-column prop="B11" label="B11" />
                <el-table-column prop="B12" label="B12" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen4_2" style="width: 100%">
                <el-table-column prop="B10" label="B10" />
                <el-table-column prop="C28" label="C28" />
                <el-table-column prop="C29" label="C29" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen4_3" style="width: 100%">
                <el-table-column prop="B11" label="B11" />
                <el-table-column prop="C30" label="C30" />
                <el-table-column prop="C31" label="C31" />
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :data="juzhen4_4" style="width: 100%">
                <el-table-column prop="B12" label="B12" />
                <el-table-column prop="C32" label="C32" />
                <el-table-column prop="C33" label="C33" />
              </el-table>
            </el-col>
          </el-row>
        </div>
        <div style="width:50%;margin-left:2%;height:88vh">
          <div class="title">村庄发展潜能评价表</div>
          <div class="table">
            <el-table :data="tableData" :span-method="objectSpanMethod" border class="eleTable" max-height="600" style="width: 85%">
              <el-table-column prop="decisionAims" label="决策目标" width="150"> </el-table-column>
              <el-table-column prop="criterionLayer1" label="准则层1" width="130"> </el-table-column>
              <el-table-column prop="weight1" label="权重"> </el-table-column>
              <el-table-column prop="criterionLayer2" label="准则层2"> </el-table-column>
              <el-table-column prop="weight2" label="权重"> </el-table-column>
            </el-table>
          </div>
        </div>
    </div>
    </div>

</template>

<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus'
import AHP2 from '@/assets/json/AHP2.json'
interface tableItem {
  decisionAims: string
  criterionLayer1: string
  weight1: number
  criterionLayer2: string
  weight2: number
}

interface SpanMethodProps {
  row: tableItem
  column: TableColumnCtx<tableItem>
  rowIndex: number
  columnIndex: number
}
const tableData = AHP2
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex === 0 || rowIndex === 19) {
      return {
        rowspan: 8,
        colspan: 1
      }
    } else if (rowIndex === 8) {
      return {
        rowspan: 11,
        colspan: 1
      }
    } else if (rowIndex === 27) {
      return {
        rowspan: 6,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
  if (columnIndex === 1 || columnIndex === 2) {
    if (rowIndex === 0 || rowIndex === 8 || rowIndex === 25 || rowIndex === 27 || rowIndex === 29 || rowIndex === 31) {
      return {
        rowspan: 2,
        colspan: 1
      }
    } else if (rowIndex === 2 || rowIndex === 5 || rowIndex === 10 || rowIndex === 19 || rowIndex === 22) {
      return {
        rowspan: 3,
        colspan: 1
      }
    } else if (rowIndex === 13) {
      return {
        rowspan: 6,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
}
const juzhen1_1 = [
  {
    A1: 'B1',
    B1: '1',
    B2: '1',
    B3: '3/4'
  },
  {
    A1: 'B2',
    B1: '1',
    B2: '1',
    B3: '3/4'
  },
  {
    A1: 'B3',
    B1: '4/3',
    B2: '4/3',
    B3: '1'
  }
]
const juzhen1_2 = [
  {
    B1: 'C1',
    C1: '1',
    C2: '2'
  },
  {
    B1: 'C2',
    C1: '0.5',
    C2: '1'
  }
]
const juzhen1_3 = [
  {
    B2: 'C3',
    C3: '1',
    C4: '1.5',
    C5: '3'
  },
  {
    B2: 'C4',
    C3: '2/3',
    C4: '1',
    C5: '2/3'
  },
  {
    B2: 'C5',
    C3: '1/3',
    C4: '1.5',
    C5: '1'
  }
]
const juzhen1_4 = [
  {
    B3: 'C6',
    C6: '1',
    C7: '1',
    C8: '1.5'
  },
  {
    B3: 'C7',
    C6: '1',
    C7: '1',
    C8: '1.5'
  },
  {
    B3: 'C8',
    C6: '2/3',
    C7: '2/3',
    C8: '1'
  }
]
const juzhen2_1 = [
  {
    A2: 'B4',
    B4: '1',
    B5: '4/7',
    B6: '4/13'
  },
  {
    A2: 'B5',
    B4: '7/4',
    B5: '1',
    B6: '7/13'
  },
  {
    A2: 'B6',
    B4: '13/4',
    B5: '13/7',
    B6: '1'
  }
]
const juzhen2_2 = [
  {
    B4: 'C9',
    C9: '1',
    C10: '1'
  },
  {
    B4: 'C10',
    C9: '1',
    C10: '1'
  }
]
const juzhen2_3 = [
  {
    B5: 'C11',
    C11: '1',
    C12: '1',
    C13: '2/3'
  },
  {
    B5: 'C12',
    C11: '1',
    C12: '1',
    C13: '2/3'
  },
  {
    B5: 'C13',
    C11: '1.5',
    C12: '1.5',
    C13: '1'
  }
]
const juzhen2_4 = [
  {
    B6: 'C14',
    C14: '1',
    C15: '1',
    C16: '1',
    C17: '1',
    C18: '2/3',
    C19: '1'
  },
  {
    B6: 'C15',
    C14: '1',
    C15: '1',
    C16: '1',
    C17: '1',
    C18: '2/3',
    C19: '1'
  },
  {
    B6: 'C16',
    C14: '1',
    C15: '1',
    C16: '1',
    C17: '1',
    C18: '2/3',
    C19: '1'
  },
  {
    B6: 'C17',
    C14: '1',
    C15: '1',
    C16: '1',
    C17: '1',
    C18: '2/3',
    C19: '1'
  },
  {
    B6: 'C18',
    C14: '1.5',
    C15: '1.5',
    C16: '1.5',
    C17: '1.5',
    C18: '1',
    C19: '1'
  },
  {
    B6: 'C19',
    C14: '1',
    C15: '1',
    C16: '1',
    C17: '1',
    C18: '1',
    C19: '1'
  },
  {
    B6: '',
    C14: '',
    C15: '',
    C16: '',
    C17: '',
    C18: '',
    C19: ''
  }
]
const juzhen3_1 = [
  {
    A3: 'B7',
    B7: '1',
    B8: '9/7',
    B9: '9/5'
  },
  {
    A3: 'B8',
    B7: '7/9',
    B8: '1',
    B9: '7/9'
  },
  {
    A3: 'B9',
    B7: '5/9',
    B8: '9/7',
    B9: '1'
  }
]
const juzhen3_2 = [
  {
    B7: 'C20',
    C20: '1',
    C21: '1',
    C22: '1'
  },
  {
    B7: 'C21',
    C20: '1',
    C21: '1',
    C22: '1'
  },
  {
    B7: 'C22',
    C20: '1',
    C21: '1',
    C22: '1'
  }
]
const juzhen3_3 = [
  {
    B8: 'C23',
    C23: '1',
    C24: '1',
    C25: '2/3'
  },
  {
    B8: 'C24',
    C23: '1',
    C24: '1',
    C25: '2/3'
  },
  {
    B8: 'C25',
    C23: '1.5',
    C24: '1.5',
    C25: '1'
  }
]
const juzhen3_4 = [
  {
    B9: 'C26',
    C26: '1',
    C27: '2/3'
  },
  {
    B9: 'C27',
    C26: '1.5',
    C27: '1'
  }
]
const juzhen4_1 = [
  {
    A4: 'B10',
    B10: '1',
    B11: '5/4',
    B12: '5/3'
  },
  {
    A4: 'B11',
    B10: '4/5',
    B11: '1',
    B12: '4/3'
  },
  {
    A4: 'B12',
    B10: '3/5',
    B11: '3/4',
    B12: '1'
  }
]
const juzhen4_2 = [
  {
    B10: 'C28',
    C28: '1',
    C29: '2/3'
  },
  {
    B10: 'C29',
    C28: '1.5',
    C29: '1'
  }
]
const juzhen4_3 = [
  {
    B11: 'C30',
    C30: '1',
    C31: '1'
  },
  {
    B11: 'C31',
    C30: '1',
    C31: '1'
  }
]
const juzhen4_4 = [
  {
    B12: 'C32',
    C32: '1',
    C33: '2'
  },
  {
    B12: 'C33',
    C32: '0.5',
    C33: '1'
  },
  
]
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
    .container {
  display:flex;
  justify-content: center;
  .title {
    width: 85%;
    line-height: 4vh;
    font-size: calc(0.4vh + 0.8vw);
    padding-left: 7.5%;
    font-weight: 600;
    // color: rgba($color: #ecffe8, $alpha: .8);
    background-image: linear-gradient(25deg, #fdfffc 0%, #d8f5e5 40%, #abe3c2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
  }
  .table {
    /*表格悬停颜色 */
    .eleTable ::v-deep .el-table__body tr:hover > td {
      background-color: rgb(122, 123, 26, 0.5) !important;
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
    ::v-deep .el-table__row {
      background-color: transparent;
    }
    /* 去除底部白线 */
    :deep(.el-table__inner-wrapper::before) {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
      z-index: 3;
    }
    .el-table {
      border: 1px solid white;
      margin-left:2%;
    }
  }
  .leftContainer{
    width:50%;
    height:88vh;
    overflow-y: auto;
    margin-left:2%;
    /*表格悬停颜色 */
    // .eleTable ::v-deep .el-table__body tr:hover > td {
    //   background-color: rgb(122, 123, 26, 0.5) !important;
    // }
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
    ::v-deep .el-table__row {
      background-color: transparent;
    }
    /* 去除底部白线 */
    :deep(.el-table__inner-wrapper::before) {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
      z-index: 3;
    }
    .el-table {
      border: 1px solid white;
      margin-top:0.5% ;
      ::v-deep .el-table__body tr:hover > td {
      background-color: rgb(122, 123, 26, 0.5) !important;
    }
    }
  }
  .leftContainer::-webkit-scrollbar {
      width: 5px;
    }
  /*定义滚动条轨道*/
  .leftContainer::-webkit-scrollbar-track {
      border-radius: 5px;
    }
  /*定义滑块*/
  .leftContainer::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(127, 127, 127,0.5);
  }
}
}

</style>
