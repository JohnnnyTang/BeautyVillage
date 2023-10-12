<template>
    <div class="targetTab-container"></div>
    <div class="main-container">
        <div class="container">
            <div class='title'>
                区域综合评价指标体系
            </div>
            <div class="table">
                <el-table :data="tableData" :span-method="objectSpanMethod" border class="eleTable">
                    <el-table-column prop="layers" label="要素层" width="180">
                    </el-table-column>
                    <el-table-column prop="factor" label="因子层" width="130">
                    </el-table-column>
                    <el-table-column prop="score1" label="0-1分">
                    </el-table-column>
                    <el-table-column prop="score2" label="2-3分">
                    </el-table-column>
                    <el-table-column prop="score3" label="4-5分">
                    </el-table-column>
                </el-table>
            </div>
            <div class="content">
                <p>
                    根据评价指标体系进行打分，可以进一步了解446个特色田园乡村的综合实力，并全面分析是指一个乡村在经济、社会、环境、基础设施、
                    文化等各个领域的综合发展状况、发展水平和发展能力。本文以江苏省第一批到第八批共446个特色田园乡村的综合实力为参数依据，基于科学性
                    、可比性、全面性和协调性原则，建立特色田园乡村综合实力评价指标体系。
                </p>
                <p>
                    特色田园乡村综合实力的基本内涵丰富，它不仅是乡村实力的体现和表达，更有着产业、环境、文化、技术的交错影响。因此，为多方位、
                    多层次反映乡村综合实力的绩效水平，结合国内外相关田园乡村的综合竞争力指标评价体系，构建江苏省特色田园乡村综合实力评价体系。
                </p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import targetData from '@/assets/json/target.json'
import type { TableColumnCtx } from 'element-plus'
const tableData = targetData
interface tableItem {
    layers: string
    factor: string
    score1: string
    score2: string
    score3: string
}
interface SpanMethodProps {
    row: tableItem
    column: TableColumnCtx<tableItem>
    rowIndex: number
    columnIndex: number
}
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {

    if (columnIndex === 0) {
        if (rowIndex === 0 || rowIndex === 3 || rowIndex === 10) {
            return {
                rowspan: 3,
                colspan: 1
            };
        } else if (rowIndex === 6) {
            return {
                rowspan: 4,
                colspan: 1
            };
        }
        else {
            return {
                rowspan: 0,
                colspan: 0
            };
        }
    }
}

</script>
  
<style lang="scss" scoped>
div.targetTab-container {
    position: absolute;
    left: 12vw;
    top: 8vh;
    padding: 0;
    margin: 0;
    width: 88vw;
    height: 92vh;
    // background-color: rgb(85, 255, 0);
    // background-image: url('../assets/farmer-bg.jpg');
    background-image: linear-gradient(to bottom,
            rgba(50, 50, 50, 0.2) 0%,
            rgba(50, 50, 50, 0.2) 100%),
        url('../../assets/farmer-bg.jpg');
    //   url('../assets/rice-field.jpg');
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-size: cover;
    background-repeat: no-repeat;
}

div.main-container {
    position: absolute;
    left: 12vw;
    top: 8vh;
    padding: 0;
    margin: 0;
    width: 88vw;
    height: 92vh;
    z-index: 999;
    background-color: rgba(0, 26, 0, 0.403);


    .container {
        .title {
            width: 85%;
            line-height: 8vh;
            height: 8vh;
            font-size: calc(0.4vh + 1.2vw);
            padding-left: 7.5%;
            font-weight: 600;
            // color: rgba($color: #ecffe8, $alpha: .8);
            background-image: linear-gradient(25deg,
                    #fdfffc 0%,
                    #d8f5e5 40%,
                    #abe3c2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
        }

        .table {
            padding-left: 12%;
            height: fit-content;

            /*表格悬停颜色 */
            .eleTable ::v-deep .el-table__body tr:hover>td {
                background-color: rgba(67, 169, 19, 0.5) !important;
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
                height: 54vh;
                overflow: auto;
                width: 85%;
                max-height: none;
                font-size: calc(0.2vh + 0.7vw);
            }
        }

        .content {
            padding-left: 7.5%;
            width: 85%;
            font-size: calc(0.6vh + 0.8vw);
            font-weight: 800;
            font-family: "KaiTi", "FangSong", "SimHei";
            transition: all ease-in-out 0.2s;
            color: #fdfffc;

            p {
                text-indent: 2em;
            }
        }
    }
}
</style>
  