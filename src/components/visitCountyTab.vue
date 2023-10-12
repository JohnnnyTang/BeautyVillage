<template>
    <div class="countyTab-container">
        <div class="basic-info">
            <div class="name-content">村庄名：{{ countyName }}</div>
            <div class="location-info">
                <div class="location-content city-location">
                    <div class="location-type city-type">市:</div>
                    <div class="location-name city-name">
                        <div class="location-name-content city">{{ countyInfo["市"] }}</div>
                    </div>
                </div>
                <div class="location-content dis-location">
                    <div class="location-type dis-type">县/区：</div>
                    <div class="location-name dis-name">
                        <div class="location-name-content dis">{{ countyInfo["县"] }}</div>
                    </div>
                </div>
                <div class="location-content nh-location">
                    <div class="location-type nh-type">乡镇：</div>
                    <div class="location-name nh-name">
                        <div class="location-name-content nh">{{ countyInfo["乡镇"] }}</div>
                    </div>
                </div>
            </div>
            <div class="desc-content">
                <div class="desc-title">乡村简介：</div>
                <el-scrollbar class="desc-text">&nbsp;&nbsp;&nbsp;&nbsp;{{ countyInfo["简介"] }}</el-scrollbar>
            </div>
        </div>
        <div class="data-charts">
            <div class="chart-title">乡村数据变化（{{ countyVisitData["年份"][0] + '-' + countyVisitData["年份"][1] }}）</div>
            <el-scrollbar class="chart-content">
                <div class="chart-container">
                    <div class="chart-item" v-for="item in chartDomInfo" :key="item.id">
                        <div class="chart-item-title">
                            <div class="chart-item-title-text">{{ item.title }}</div>
                        </div>
                        <div v-if="item.ifChart" class="chart-item-graph" ref="chartDoms"></div>
                        <div v-else class="no-chart-item">
                            <div class="no-chart-text">均为0,无变化</div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <div class="carousel-container">
            <el-carousel height="45vh" class="pic-carousel">
                <el-carousel-item v-for="item in carouselInfo" :key="item.id">
                    <img :src="item.imgSrc" class="image-bg">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="report-container">
            <div class="report-title">调研报告</div>
            <el-scrollbar class="report-content">&nbsp;&nbsp;&nbsp;&nbsp;{{ countyInfo["调研"] }}</el-scrollbar>
        </div>

    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { onMounted, reactive, ref } from 'vue'
import { visitedData, countyData } from './visitedCounty';
import * as echarts from 'echarts';

type EchartsOption = echarts.EChartsOption;
console.log(router.currentRoute.value.params)
const countyName = router.currentRoute.value.params.countyName as string;
const countyInfo = visitedData[countyName];
const countyVisitData = countyData[countyName];
console.log(countyInfo)

const chartDoms = ref<HTMLElement[]>([])

const scoreTypeMap = {
    "产业主导": ["主导产业特色性", "产品丰富度", "产品品质化"],
    "共建共治": ["基层自治特色性", "村民公共事务参与度", "建设力量多元性"],
    "绿色发展": ["景观性", "特色性", "地形地貌丰富度"],
    "文化传承": ["独特性", "历史古迹完整性", "传承与发展", "类型与数量"],
}

const photoPrefix = "http://localhost:8080//"

let carouselInfo = ref([
    { id: 0, imgSrc: 'http://localhost:8080//farmer-blur-text.jpg' },
])

function buildCarouselInfo() {
    if ((countyInfo["图片"] as string[]).length == 0) {
        return;
    }
    else {
        const countyPhotoPathPrefix = photoPrefix + countyInfo["路径"];
        let imgId = 0;
        const newCarouselInfo = [];
        for (let imgName of countyInfo["图片"] as string[]) {
            newCarouselInfo.push({ id: imgId, imgSrc: countyPhotoPathPrefix + '/' + imgName })
        }
        carouselInfo.value = newCarouselInfo;
    }
}
buildCarouselInfo()

let chartDomInfo = ref([
    { id: 1, title: "户籍户数（户）", ifChart: true },
    { id: 2, title: "户籍人数（人）", ifChart: false },
    { id: 3, title: "常住人口数（人）", ifChart: false },
    { id: 4, title: "从业人员数量（人）", ifChart: false },
    { id: 5, title: "农业从业人员数量（人）", ifChart: false },
    { id: 6, title: "返乡创业就业人才（人）", ifChart: false },
    { id: 7, title: "各类人才下乡的人次", ifChart: false },
    { id: 8, title: "村集体总收入（万元）", ifChart: false },
    { id: 9, title: "村民人均可支配收入（万元）", ifChart: false },
    { id: 10, title: "村庄特色主导产业年收入（万元）", ifChart: false },
    { id: 11, title: "特色主导产业吸纳本村村民就业数量（人）", ifChart: false },
    { id: 12, title: "亩均第一产业增加值（万元/亩）", ifChart: false },
    { id: 13, title: "新型农业经营主体或村集体规模化经营比重", ifChart: false },
    { id: 14, title: "农产品加工业产值与农业总产值比", ifChart: false },
    { id: 15, title: "村庄土特产的数量", ifChart: false },
    { id: 16, title: "农产品品牌的数量", ifChart: false },
    { id: 17, title: "入选省级以上农产品品牌目录的数量", ifChart: false },
    { id: 18, title: "农产品电商销售比例", ifChart: false },
    { id: 19, title: "村庄年游客接待量（人）	", ifChart: false },
    { id: 20, title: "村庄旅游总收入（万元））", ifChart: false },
    { id: 21, title: "物质文化遗产数量", ifChart: false },
    { id: 22, title: "非物质文化遗产数量", ifChart: false },
    { id: 23, title: "非物质文化遗产传承人数", ifChart: false },
    { id: 24, title: "农房空置率", ifChart: false },
])

const colors = ['#9AEBA3', '#F2CB05', '#F24405', '#9EF8EE', '#FFCB9A', '#38D0F2', '#DFFBFC', '#FFD5BA', '#FFAAA5', '#F299C2', '#0AA8FC', '#FFCD39'];
const chartOptions: EchartsOption[] = [];

function initChartDoms() {
    let keys = Object.keys(countyVisitData)
    keys = keys.slice(0, keys.length - 1);
    console.log(keys)
    let i = 0;
    for (let key of keys) {
        if ((countyVisitData[key][0] == 0) && (countyVisitData[key][1] == 0)) continue;
        else {
            chartDomInfo.value[i].ifChart = true;
            chartOptions.push({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                },
                xAxis: {
                    data: ['开始', '截止期'],
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: {
                        color: '#e6fffe',
                        fontSize: 12,
                        fontWeight: 'bold'
                    }
                },
                yAxis: {
                    splitLine: { show: false },
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: { show: false }
                },
                grid: {
                    top: '20%',
                    bottom: '0%',
                    left: '5%',
                    right: '5%',
                    containLabel: true
                },
                color: colors[i%colors.length],
                series: {
                    name: key,
                    type: 'pictorialBar',
                    barCategoryGap: '-150%',
                    // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    itemStyle: {
                        opacity: 0.8
                    },
                    label: {
                        show: true,
                        fontFamily: 'Impact',
                        fontSize: 18,
                        color: '#ffffff',
                        position: 'top'
                    },
                    emphasis: {
                        itemStyle: {
                            opacity: 1
                        }
                    },
                    data: countyVisitData[key],
                    z: 10
                }
            })
        } 
        i += 1;
    }
}
initChartDoms()

const testOption: EchartsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
    },
    xAxis: {
        data: ['开始', '截止期'],
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
            color: '#e6fffe',
            fontSize: 16,
            fontWeight: 'bold'
        }
    },
    yAxis: {
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false }
    },
    grid: {
        top: '0%',
        bottom: '0%',
        left: '5%',
        right: '5%',
        containLabel: true
    },
    color: ['#FFCD39'],
    series: {
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '-150%',
        // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
            opacity: 0.8
        },
        label: {
            show: true,
            fontFamily: 'Impact',
            fontSize: 18,
            color: '#ffffff',
            position: 'top'
        },
        emphasis: {
            itemStyle: {
                opacity: 1
            }
        },
        data: [123, 60],
        z: 10
    }
}


// const route = useRoute()
onMounted(() => {
    console.log(chartDoms.value);
    // const testChart = echarts.init(chartDoms.value[0]);
    // testChart.setOption(testOption);

    let i = 0;
    for(let chartDom of chartDoms.value) {
        const aChart = echarts.init(chartDom)
        aChart.setOption(chartOptions[i])
        i += 1;
    }
})

</script>

<style lang="scss">
div.countyTab-container {
    position: absolute;
    left: 12vw;
    top: 8vh;
    padding: 0;
    margin: 0;
    width: 88vw;
    height: 92vh;

    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-content: space-around;

    background-image: linear-gradient(to bottom,
            rgba(50, 50, 50, 0.2) 0%,
            rgba(50, 50, 50, 0.2) 100%),
        url('../assets/green-field.jpg');
    background-size: cover;

    div.basic-info {
        width: 48vw;
        height: 36vh;

        background-color: rgba(28, 59, 78, 0.35);
        backdrop-filter: blur(8px);
        border-radius: 6px;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-content: center;

        div.name-content {
            width: 17vw;
            height: 10vh;
            line-height: 10vh;
            padding-left: 1vw;

            // background-color: aqua;

            font-size: calc(0.8vh + 1.4vw);
            font-family: 'STZhongsong';
            font-weight: 600;

            background-image: linear-gradient(25deg,
                    #f5f9ff 0%,
                    #cbffff 40%,
                    #80ffe6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        div.location-info {
            width: 29vw;
            height: 6vh;
            margin-top: 2vh;

            border-radius: 20px;

            // background-color: rgba(0, 85, 255, 0.502);

            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;

            div.location-content {
                width: 9vw;
                height: 6vh;

                border-radius: 16px;
                // background-color: #80ffe6;

                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;

                div.location-type {
                    width: 4vw;
                    height: 6vh;
                    line-height: 6vh;
                    text-align: center;

                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;

                    font-size: calc(0.4vh + 0.8vw);
                    font-weight: 600;
                    font-family: 'KaiTi';

                    background-color: #95ccffd3;
                    backdrop-filter: blur(6px);
                }

                div.location-name {
                    width: 5vw;
                    height: 6vh;
                    // line-height: 6vh;
                    // text-align: center;
                    // vertical-align: middle;
                    display: table;

                    div.location-name-content {
                        display: table-cell;
                        vertical-align: middle;
                        text-align: center;
                        width: 100%;

                        font-size: calc(0.4vh + 0.8vw);
                        font-weight: 600;
                        font-family: 'KaiTi';
                        color: #dffff8;
                        word-wrap: break-word;

                        &.city,
                        &.dis {
                            font-size: calc(0.5vh + 1vw);
                        }
                    }

                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;

                    background-color: #137ae9;
                    backdrop-filter: blur(6px);

                }
            }
        }

        div.desc-content {
            width: 47.4vw;
            height: 24vh;

            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-content: space-around;
            // background-color: rgba(199, 232, 255, 0.2);
            border-radius: 12px;
            // backdrop-filter: blur(2px);

            div.desc-title {
                height: 4.8vh;
                line-height: 4.8vh;
                width: 46vw;
                padding-left: 1vw;
                border-radius: 12px;
                // background-color: #137ae9;

                font-size: calc(0.8vh + 1vw);
                font-family: 'STZhongsong';
                color: #d9eaff;
            }

            div.desc-text {
                height: 18vh;
                width: 47vw;
                border-radius: 12px;
                // background-color: #80ffe6;

                font-size: calc(0.2vh + 0.7vw);
                font-family: 'Microsoft YaHei';

                color: #e2ffff;

            }
        }


    }

    div.data-charts {
        width: 48vw;
        height: 54vh;

        background-color: rgba(27, 50, 67, 0.4);
        border-radius: 12px;
        backdrop-filter: blur(6px);

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-content: space-around;

        div.chart-title {
            height: 6vh;
            line-height: 6vh;

            text-align: center;

            font-size: calc(0.6vh + 1.2vw);
            font-family: 'STZhongsong';
            font-weight: 600;
            // color: #ffffff;
            color: #e6fffe;
        }

        div.chart-content {
            height: 48vh;
            width: 48vw;

            // background-color: #80ffe6;
            border-radius: 12px;

            div.chart-container {
                height: 48vh;
                width: 96vw;

                display: flex;
                flex-flow: column wrap;
                justify-content: space-around;
                align-content: space-around;

                div.chart-item {
                    width: 7.9vw;
                    height: 23.5vh;
                    // background-color: #80ffe6;

                    display: flex;
                    flex-flow: column nowrap;

                    div.chart-item-title {
                        height: 4.5vh;
                        width: 7.9vw;

                        display: table;

                        div.chart-item-title-text {
                            display: table-cell;
                            vertical-align: middle;
                            text-align: center;
                            width: 100%;

                            font-size: calc(0.4vh + 0.5vw);
                            font-family: 'Microsoft YaHei';
                            color: #e9fcff;
                            font-weight: 600;
                        }

                        border-top-left-radius: 12px;
                        border-top-right-radius: 12px;

                        background-color: #0076b54d;
                    }

                    div.no-chart-item {
                        height: 19vh;
                        width: 7.9vw;

                        background-color: #004f7aa4;

                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: center;

                        div.no-chart-text {
                            height: 19vh;
                            line-height: 19vh;
                            width: 7.9vw;

                            text-align: center;

                            font-size: calc(0.4vh + 0.8vw);
                            font-family: 'Microsoft YaHei';
                            color: #fff8e9;
                        }
                    }

                    div.chart-item-graph {
                        height: 19vh;
                        width: 7.9vw;

                        background-color: #004f7aa4;
                    }
                }
            }


        }
    }

    div.carousel-container {
        width: 39vw;
        height: 45vh;

        background-color: rgba(199, 232, 255, 0.2);
        border-radius: 12px;
        backdrop-filter: blur(2px);
        overflow: hidden;

        .pic-carousel {
            width: 100%;
            height: 100%;

            .el-carousel__container {
                width: 100%;
                height: 100%;

                .image-bg {
                    height: 100%;
                    width: 100%;
                    // background-image: url('http://localhost:8080/南京师范大学吴江实验幼儿园（图片1）.jpg');
                    background-repeat: no-repeat;
                    background-size: cover;
                }
            }
        }
    }

    div.report-container {
        width: 39vw;
        height: 45vh;

        background-color: rgba(27, 50, 67, 0.4);
        border-radius: 12px;
        backdrop-filter: blur(6px);

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-content: space-around;

        div.report-title {
            height: 6vh;
            line-height: 6vh;
            width: 39vw;

            text-align: center;
            font-size: calc(0.6vh + 1.2vw);
            font-family: 'STZhongsong';
            font-weight: 600;
            color: #e6fffe;
        }

        div.report-content {
            height: 39vh;
            // line-height: 6vh;
            width: 39vw;

            font-size: calc(0.4vh + 0.7vw);
            font-family: 'Microsoft YaHei';
            color: #fff8e9;
        }
    }
}
</style>