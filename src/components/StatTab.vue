<template>
    <div class="statTab-container">
        <div id="map" class="map-container"></div>
        <div class="selector">
            <el-select v-model="citySelected" clearable placeholder="选择市" @change="citySelectChanged"
                @clear="citySelectCleared">
                <el-option v-for="item in jsCities" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="disSelected" clearable :disabled="disSelectAllow" placeholder="选择区/县"
                @change="disSelectChanged" @clear="disSelectCleared">
                <el-option v-for="item in disList" :key="disList.indexOf(item)" :label="item" :value="item" />
            </el-select>
        </div>
        <div class="map-legend">
            <div class="flag-legend" v-show="flagLegendShow">
                <div class="flag-icon"></div>
                <div class="legend-text-item flag-text">已调研<br>乡村</div>
            </div>
            <div class="heatmap-legend legend-item" v-show="heatMapLegendShow">
                <div class="legend-title">热力图</div>
                <div class="legend-content">
                    <div class="legend-color">
                        <div class="legend-color-item" style="background-color: #61a0db;"></div>
                        <div class="legend-color-item" style="background-color: #e7d87d;"></div>
                        <div class="legend-color-item" style="background-color: #dd9f40;"></div>
                        <div class="legend-color-item" style="background-color: #b4451f;"></div>
                    </div>
                    <div class="legend-text">
                        <div class="legend-text-item">密度 0.10</div>
                        <div class="legend-text-item">密度 0.33</div>
                        <div class="legend-text-item">密度 0.67</div>
                        <div class="legend-text-item">密度 1.00</div>
                    </div>
                </div>
            </div>
            <div class="circle-legend legend-item">
                <div class="legend-title">特色田园乡村</div>
                <div class="legend-content">
                    <div class="legend-color">
                        <div class="legend-color-item" style="background-color: #f24452;"></div>
                        <div class="legend-color-item" style="background-color: #4e5fbf;"></div>
                        <div class="legend-color-item" style="background-color: #2cbf6c;"></div>
                        <div class="legend-color-item" style="background-color: #f2784b;"></div>
                    </div>
                    <div class="legend-text">
                        <div class="legend-text-item">产业主导</div>
                        <div class="legend-text-item">共建共享</div>
                        <div class="legend-text-item">绿色发展</div>
                        <div class="legend-text-item">文化传承</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chart-container" ref="chartDom"></div>
        <div class="num-container">
            <div class="num-data-title">特色田园乡村数据</div>
            <div class="data-desc">
                <div class="city-num simple-num">
                    <div class="num-content city-num-content">{{ cityNum }}</div>
                    <div class="fixed-content">市</div>
                </div>
                <div class="district-num simple-num">
                    <div class="num-content district-num-content">{{ districtNum }}</div>
                    <div class="fixed-content">县/区</div>
                </div>
                <div class="county-num simple-num">
                    <div class="num-content county-num-content">{{ countyNum }}</div>
                    <div class="fixed-content county-fixed-content">
                        <div class="one-row">特色田园<br>乡村</div>
                    </div>
                </div>
                <div class="county-num-chart" ref="barDom"></div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import router from '@/router';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obm55dCIsImEiOiJja2xxNXplNjYwNnhzMm5uYTJtdHVlbTByIn0.f1GfZbFLWjiEayI6hb_Qvg';
import * as echarts from 'echarts';

type EchartsOption = echarts.EChartsOption;

type StringKeyObject<T> = {
    [key: string]: T
}

// const router = useRouter();

const heatMapLegendShow = ref(true)
const flagLegendShow = ref(false);
const chartDom = ref<HTMLElement>();
const barDom = ref<HTMLElement>();

let cityNum = 13;
let districtNum = 95;
let countyNum = 446;

const citySelected = ref('')
const jsCities = [
    { value: '南京市', label: '南京市', },
    { value: '无锡市', label: '无锡市', },
    { value: '徐州市', label: '徐州市', },
    { value: '常州市', label: '常州市', },
    { value: '苏州市', label: '苏州市', },
    { value: '南通市', label: '南通市', },
    { value: '连云港市', label: '连云港市', },
    { value: '淮安市', label: '淮安市', },
    { value: '盐城市', label: '盐城市', },
    { value: '扬州市', label: '扬州市', },
    { value: '镇江市', label: '镇江市', },
    { value: '泰州市', label: '泰州市', },
    { value: '宿迁市', label: '宿迁市', },
]

const disSelected = ref('')
const districtDict: StringKeyObject<Array<string>> = {
    '南京市': ['玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区', '六合区', '溧水区', '高淳区'],
    '无锡市': ['锡山区', '惠山区', '滨湖区', '梁溪区', '新吴区', '江阴市', '宜兴市'],
    '徐州市': ['鼓楼区', '云龙区', '贾汪区', '泉山区', '铜山区', '丰县', '沛县', '睢宁县', '新沂市', '邳州市'],
    '常州市': ['天宁区', '钟楼区', '新北区', '武进区', '金坛区', '溧阳市'],
    '苏州市': ['虎丘区', '吴中区', '相城区', '姑苏区', '吴江区', '常熟市', '张家港市', '昆山市', '太仓市'],
    '南通市': ['崇川区', '通州区', '海门区', '如东县', '启东市', '如皋市', '海安市'],
    '连云港市': ['连云区', '海州区', '赣榆区', '东海县', '灌云县', '灌南县'],
    '淮安市': ['淮安区', '淮阴区', '清江浦区', '洪泽区', '涟水县', '盱眙县', '金湖县'],
    '盐城市': ['亭湖区', '盐都区', '大丰区', '响水县', '滨海县', '阜宁县', '射阳县', '建湖县', '东台市'],
    '扬州市': ['广陵区', '邗江区', '江都区', '宝应县', '仪征市', '高邮市'],
    '镇江市': ['京口区', '润州区', '丹徒区', '丹阳市', '扬中市', '句容市'],
    '泰州市': ['海陵区', '高港区', '姜堰区', '兴化市', '靖江市', '泰兴市'],
    '宿迁市': ['宿城区', '宿豫区', '沭阳县', '泗阳县', '泗洪县']
}

const disList = ref(districtDict['南京市']);
const disSelectAllow = ref(true);

const cityBounds: StringKeyObject<[[number, number], [number, number]]> = {
    '南京市': [[118.3457102209241, 31.166834647188097], [119.48141532965877, 32.63521373470317]],
    '无锡市': [[119.42805196292989, 31.021089382169606], [120.59171037349978, 32.142960162524645]],
    '徐州市': [[116.35429618699698, 33.62963985526349], [118.68819645655674, 35.024067366653966]],
    '常州市': [[119.06606406128805, 31.115744044906208], [120.216984139018, 32.08262362076418]],
    '苏州市': [[119.891502771928, 30.73462139576708], [121.43092661093016, 32.063379306965786]],
    '南通市': [[120.14536241485882, 31.648097708255122], [121.93181638070837, 32.74070390070165]],
    '连云港市': [[118.37590171828276, 33.97171280981678], [119.84903492163727, 35.17681734814518]],
    '淮安市': [[118.18010326280017, 32.68905211824391], [119.70923177047149, 34.128131315044556]],
    '盐城市': [[119.47289615921159, 32.547692705323385], [120.99794775374562, 34.54706123119793]],
    '扬州市': [[118.96877406467979, 32.197006865719075], [119.90717467642315, 33.46644264490861]],
    '镇江市': [[118.94862436736219, 31.60338915491836], [120.00121413310956, 32.34600855265508]],
    '泰州市': [[119.6228645691454, 31.913374029426095], [120.56831001680177, 33.22461785654443]],
    '宿迁市': [[117.89260295944558, 33.11058834458082], [119.2026785450048, 34.48202381965655]]
}

const roadStat: StringKeyObject<Array<number> | StringKeyObject<Array<number>>> =
    { 'province': [183, 57, 117, 89], 'city': { '南京市': [13, 4, 17, 17], '无锡市': [7, 4, 13, 7], '徐州市': [16, 6, 11, 10], '常州市': [13, 4, 2, 9], '苏州市': [29, 4, 15, 9], '南通市': [5, 1, 6, 2], '连云港市': [14, 2, 5, 4], '淮安市': [13, 5, 4, 4], '盐城市': [25, 12, 10, 8], '扬州市': [14, 2, 9, 3], '镇江市': [8, 3, 9, 3], '泰州市': [14, 4, 10, 8], '宿迁市': [12, 6, 6, 5] }, 'district': { '南京市-浦口区': [1, 0, 4, 2], '南京市-栖霞区': [1, 0, 0, 1], '南京市-江宁区': [6, 1, 4, 4], '南京市-六合区': [1, 0, 1, 1], '南京市-溧水区': [2, 1, 2, 5], '南京市-高淳区': [2, 2, 6, 4], '无锡市-锡山区': [2, 1, 1, 0], '无锡市-惠山区': [1, 0, 4, 3], '无锡市-新吴区': [0, 1, 0, 0], '无锡市-滨湖区': [1, 0, 0, 0], '无锡市-江阴市': [0, 1, 1, 3], '无锡市-宜兴市': [3, 1, 7, 1], '徐州市-贾汪区': [2, 1, 0, 2], '徐州市-铜山区': [3, 0, 1, 2], '徐州市-经济开发区': [0, 0, 0, 1], '徐州市-丰县': [1, 1, 1, 1], '徐州市-沛县': [3, 1, 1, 1], '徐州市-睢宁县': [1, 0, 1, 2], '徐州市-新沂市': [2, 3, 4, 0], '徐州市-邳州市': [4, 0, 3, 1], '常州市-钟楼区': [0, 0, 0, 1], '常州市-天宁区': [1, 1, 0, 0], '常州市-新北区': [4, 0, 1, 1], '常州市-武进区': [0, 3, 0, 1], '常州市-金坛区': [2, 0, 0, 2], '常州市-溧阳市': [6, 0, 1, 4], '苏州市-吴中区': [6, 1, 2, 2], '苏州市-相城区': [1, 1, 1, 1], '苏州市-吴江区': [4, 1, 4, 2], '苏州市-高新区': [2, 1, 0, 0], '苏州市-常熟市': [3, 0, 3, 2], '苏州市-张家港市': [4, 0, 1, 1], '苏州市-昆山市': [5, 0, 3, 1], '苏州市-太仓市': [4, 0, 1, 0], '南通市-海门市': [0, 0, 2, 0], '南通市-通州区': [0, 0, 1, 1], '南通市-如东县': [1, 0, 1, 0], '南通市-如皋市': [4, 0, 1, 1], '南通市-海安市': [0, 0, 1, 0], '南通市-启东市': [0, 1, 0, 0], '连云港市-连云区': [2, 0, 3, 1], '连云港市-海州区': [1, 0, 0, 1], '连云港市-赣榆区': [5, 0, 0, 0], '连云港市-灌南县': [1, 2, 0, 0], '连云港市-开发区': [0, 0, 0, 2], '连云港市-东海县': [3, 0, 2, 0], '连云港市-灌云县': [2, 0, 0, 0], '淮安市-淮安区': [3, 0, 0, 2], '淮安市-淮阴区': [0, 2, 1, 0], '淮安市-清江浦区': [0, 0, 1, 1], '淮安市-洪泽区': [3, 1, 0, 0], '淮安市-涟水县': [3, 1, 1, 0], '淮安市-盱眙县': [3, 0, 1, 0], '淮安市-金湖县': [1, 1, 0, 1], '盐城市-盐都区': [2, 2, 4, 3], '盐城市-大丰区': [7, 3, 1, 0], '盐城市-亭湖区': [2, 1, 0, 0], '盐城市-东台市': [6, 1, 2, 1], '盐城市-阜宁县': [1, 2, 1, 1], '盐城市-射阳县': [3, 0, 1, 1], '盐城市-建湖县': [2, 1, 1, 0], '盐城市-滨海县': [2, 1, 0, 1], '盐城市-响水县': [0, 1, 0, 1], '扬州市-广陵区': [0, 0, 2, 0], '扬州市-邗江区': [2, 1, 0, 0], '扬州市-江都区': [4, 0, 1, 0], '扬州市-宝应县': [3, 0, 2, 0], '扬州市-仪征市': [3, 1, 4, 2], '扬州市-高邮市': [2, 0, 0, 1], '镇江市-丹徒区': [1, 0, 4, 0], '镇江市-丹阳市': [2, 1, 1, 3], '镇江市-扬中市': [3, 0, 2, 0], '镇江市-句容市': [2, 2, 2, 0], '泰州市-高港区': [1, 0, 0, 2], '泰州市-姜堰区': [2, 1, 1, 2], '泰州市-海陵区': [2, 0, 0, 0], '泰州市-兴化市': [3, 2, 4, 4], '泰州市-靖江市': [4, 0, 2, 0], '泰州市-泰兴市': [2, 1, 3, 0], '宿迁市-宿城区': [4, 0, 1, 0], '宿迁市-宿豫区': [2, 5, 1, 0], '宿迁市-洋河新区': [1, 0, 0, 0], '宿迁市-沭阳县': [0, 0, 2, 1], '宿迁市-泗阳县': [4, 1, 1, 2], '宿迁市-泗洪县': [1, 0, 1, 2] } }

const districtBounds: StringKeyObject<StringKeyObject<[[number, number], [number, number]] | string>> = { "常州市-天宁区": { "bbox": [[119.92134, 31.7238], [120.185182, 31.870214]] }, "常州市-钟楼区": { "bbox": [[119.736302, 31.740663], [119.960593, 31.848905]] }, "常州市-新北区": { "bbox": [[119.753697, 31.796918], [120.022418, 32.059825]] }, "常州市-武进区": { "bbox": [[119.671942, 31.332442], [120.205443, 31.807675]] }, "常州市-金坛区": { "bbox": [[119.304614, 31.55871], [119.753676, 31.885394]] }, "常州市-溧阳市": { "bbox": [[119.140539, 31.152529], [119.615699, 31.684173]] }, "淮安市-淮安区": { "bbox": [[118.998295, 33.283461], [119.620001, 33.760217]] }, "淮安市-淮阴区": { "bbox": [[118.746908, 33.345846], [119.18282, 33.919372]] }, "淮安市-清江浦区": { "bbox": [[118.888573, 33.33803], [119.229882, 33.69143]] }, "淮安市-洪泽区": { "bbox": [[118.488547, 33.047849], [119.163137, 33.399425]] }, "淮安市-涟水县": { "bbox": [[118.997313, 33.627329], [119.64585, 34.093509]] }, "淮安市-盱眙县": { "bbox": [[118.201926, 32.716039], [118.917354, 33.243944]] }, "淮安市-金湖县": { "bbox": [[118.814318, 32.798913], [119.364168, 33.212776]] }, "连云港市-连云区": { "bbox": [[119.182506, 34.468657], [119.686732, 34.791449]] }, "连云港市-海州区": { "bbox": [[118.968684, 34.430907], [119.422853, 34.799555]] }, "连云港市-赣榆区": { "bbox": [[118.766486, 34.675479], [119.307145, 35.124513]] }, "连云港市-东海县": { "bbox": [[118.405371, 34.308565], [119.119677, 34.795308]] }, "连云港市-灌云县": { "bbox": [[119.055344, 34.194691], [119.822995, 34.550781]] }, "连云港市-灌南县": { "bbox": [[119.12909, 33.979602], [119.804821, 34.44697]] }, "南京市-玄武区": { "bbox": [[118.784096, 32.014842], [118.90834, 32.106036]] }, "南京市-秦淮区": { "bbox": [[118.764079, 31.974726], [118.880638, 32.042896]] }, "南京市-建邺区": { "bbox": [[118.653247, 31.955867], [118.768471, 32.092946]] }, "南京市-鼓楼区": { "bbox": [[118.718698, 32.029106], [118.806132, 32.132458]] }, "南京市-浦口区": { "bbox": [[118.363373, 31.841577], [118.776744, 32.251054]] }, "南京市-栖霞区": { "bbox": [[118.764747, 32.02599], [119.241663, 32.245156]] }, "南京市-雨花台区": { "bbox": [[118.593733, 31.866563], [118.813115, 32.013208]] }, "南京市-江宁区": { "bbox": [[118.482154, 31.618372], [119.121634, 32.10973]] }, "南京市-六合区": { "bbox": [[118.563731, 32.167679], [119.086019, 32.614363]] }, "南京市-溧水区": { "bbox": [[118.83321, 31.380548], [119.234065, 31.78946]] }, "南京市-高淳区": { "bbox": [[118.699753, 31.228097], [119.21801, 31.487955]] }, "南通市-崇川区": { "bbox": [[120.732568, 31.783046], [121.082926, 32.142525]] }, "南通市-通州区": { "bbox": [[120.626886, 31.861107], [121.541005, 32.259441]] }, "南通市-如东县": { "bbox": [[120.69766, 32.191946], [121.499572, 32.63381]] }, "南通市-启东市": { "bbox": [[121.431493, 31.617039], [121.975185, 32.123032]] }, "南通市-如皋市": { "bbox": [[120.343224, 32.000987], [120.838923, 32.490357]] }, "南通市-海门区": { "bbox": [[121.03481, 31.75908], [121.54448, 32.153239]] }, "南通市-海安市": { "bbox": [[120.202315, 32.357997], [120.979655, 32.711134]] }, "苏州市-虎丘区": { "bbox": [[120.206593, 31.219915], [120.610033, 31.420612]] }, "苏州市-吴中区": { "bbox": [[119.920013, 30.926134], [120.901376, 31.435871]] }, "苏州市-相城区": { "bbox": [[120.317586, 31.335554], [120.830333, 31.550846]] }, "苏州市-姑苏区": { "bbox": [[120.528636, 31.259539], [120.655138, 31.379136]] }, "苏州市-吴江区": { "bbox": [[120.356926, 30.75797], [120.90473, 31.229826]] }, "苏州市-常熟市": { "bbox": [[120.543086, 31.493769], [121.101215, 31.836708]] }, "苏州市-张家港市": { "bbox": [[120.368878, 31.720456], [120.889816, 32.045827]] }, "苏州市-昆山市": { "bbox": [[120.807664, 31.103889], [121.161293, 31.54093]] }, "苏州市-太仓市": { "bbox": [[120.975714, 31.364538], [121.372212, 31.762524]] }, "宿迁市-宿城区": { "bbox": [[118.028379, 33.552837], [118.609948, 34.030744]] }, "宿迁市-宿豫区": { "bbox": [[117.994406, 33.798593], [118.599226, 34.170936]] }, "宿迁市-沭阳县": { "bbox": [[118.502791, 33.885627], [119.176151, 34.422056]] }, "宿迁市-泗阳县": { "bbox": [[118.511309, 33.386697], [118.887825, 33.98457]] }, "宿迁市-泗洪县": { "bbox": [[117.938457, 33.135177], [118.780148, 33.744681]] }, "泰州市-海陵区": { "bbox": [[119.813684, 32.371366], [120.045087, 32.640895]] }, "泰州市-高港区": { "bbox": [[119.819179, 32.152262], [120.08187, 32.433188]] }, "泰州市-姜堰区": { "bbox": [[119.894877, 32.336592], [120.310102, 32.713319]] }, "泰州市-兴化市": { "bbox": [[119.6403, 32.663834], [120.313033, 33.219088]] }, "泰州市-靖江市": { "bbox": [[120.022399, 31.931515], [120.559101, 32.144901]] }, "泰州市-泰兴市": { "bbox": [[119.905168, 31.967753], [120.371621, 32.377909]] }, "无锡市-锡山区": { "bbox": [[120.314432, 31.477027], [120.605759, 31.734896]] }, "无锡市-惠山区": { "bbox": [[120.055775, 31.552492], [120.391176, 31.760962]] }, "无锡市-滨湖区": { "bbox": [[120.039711, 31.264001], [120.362579, 31.594553]] }, "无锡市-梁溪区": { "bbox": [[120.241565, 31.513077], [120.352848, 31.630778]] }, "无锡市-新吴区": { "bbox": [[120.313954, 31.416459], [120.553441, 31.583425]] }, "无锡市-江阴市": { "bbox": [[119.990152, 31.687481], [120.600024, 31.99082]] }, "无锡市-宜兴市": { "bbox": [[119.51966, 31.108647], [120.110232, 31.6106]] }, "徐州市-鼓楼区": { "bbox": [[117.115329, 34.263686], [117.293744, 34.353796]] }, "徐州市-云龙区": { "bbox": [[117.179215, 34.143638], [117.344686, 34.278416]] }, "徐州市-贾汪区": { "bbox": [[117.255745, 34.186667], [117.720955, 34.540525]] }, "徐州市-泉山区": { "bbox": [[117.06857, 34.197788], [117.236214, 34.365603]] }, "徐州市-铜山区": { "bbox": [[116.811106, 34.025907], [117.702487, 34.584674]] }, "徐州市-丰县": { "bbox": [[116.362723, 34.406269], [116.873259, 34.940725]] }, "徐州市-沛县": { "bbox": [[116.686477, 34.45602], [117.151271, 34.975087]] }, "徐州市-睢宁县": { "bbox": [[117.518039, 33.710874], [118.18806, 34.172972]] }, "徐州市-新沂市": { "bbox": [[118.035602, 34.096669], [118.674072, 34.474857]] }, "徐州市-邳州市": { "bbox": [[117.595586, 34.116893], [118.184685, 34.679022]] }, "盐城市-亭湖区": { "bbox": [[119.981802, 33.165629], [120.649958, 33.637276]] }, "盐城市-盐都区": { "bbox": [[119.685709, 33.130908], [120.222403, 33.422257]] }, "盐城市-大丰区": { "bbox": [[120.215708, 32.910615], [120.917824, 33.577364]] }, "盐城市-响水县": { "bbox": [[119.503894, 33.945394], [120.103703, 34.481984]] }, "盐城市-滨海县": { "bbox": [[119.634243, 33.801256], [120.359858, 34.39163]] }, "盐城市-阜宁县": { "bbox": [[119.456469, 33.448198], [120.001336, 33.926508]] }, "盐城市-射阳县": { "bbox": [[119.926234, 33.451507], [120.620253, 34.121917]] }, "盐城市-建湖县": { "bbox": [[119.566872, 33.280729], [120.0937, 33.685053]] }, "盐城市-东台市": { "bbox": [[120.109101, 32.571157], [120.981368, 33.02578]] }, "扬州市-广陵区": { "bbox": [[119.424383, 32.217429], [119.724145, 32.50849]] }, "扬州市-邗江区": { "bbox": [[119.280981, 32.224993], [119.519487, 32.665332]] }, "扬州市-江都区": { "bbox": [[119.461982, 32.296481], [119.911872, 32.794919]] }, "扬州市-宝应县": { "bbox": [[119.142655, 33.015605], [119.715066, 33.415822]] }, "扬州市-仪征市": { "bbox": [[119.016454, 32.22217], [119.367909, 32.602823]] }, "扬州市-高邮市": { "bbox": [[119.184928, 32.585882], [119.83028, 33.106582]] }, "镇江市-京口区": { "bbox": [[119.440238, 32.097152], [119.826849, 32.285226]] }, "镇江市-润州区": { "bbox": [[119.292467, 32.086975], [119.505824, 32.261849]] }, "镇江市-丹徒区": { "bbox": [[119.229014, 31.825814], [119.708385, 32.283021]] }, "镇江市-丹阳市": { "bbox": [[119.404724, 31.731151], [119.898964, 32.134651]] }, "镇江市-扬中市": { "bbox": [[119.694612, 32.002332], [119.975506, 32.318916]] }, "镇江市-句容市": { "bbox": [[118.969449, 31.625209], [119.385126, 32.216294]] } }

function sum(arr: number[]) {
    var s = 0;
    for (var i = 0; i < arr.length; i++) {
        s += arr[i];
    }
    return s;
}

function calcCitySumData() {
    const resData: StringKeyObject<number | string>[] = [];
    for (let city in roadStat["city"]) {
        resData.push({
            "value": sum((roadStat["city"] as StringKeyObject<Array<number>>)[city]),
            "name": city
        })
    }
    // console.log(resData);
    return resData;
}

const citySumStat = calcCitySumData();

function calcDistrictSumData() {
    const resData: StringKeyObject<StringKeyObject<number | string>[]> = {};
    for (let district in roadStat["district"]) {
        const cityDistrict = district.split('-');
        if (cityDistrict[0] in resData) {
            resData[cityDistrict[0]].push({
                "value": sum((roadStat["district"] as StringKeyObject<Array<number>>)[district]),
                "name": cityDistrict[1]
            })
        }
        else {
            resData[cityDistrict[0]] = [{
                "value": sum((roadStat["district"] as StringKeyObject<Array<number>>)[district]),
                "name": cityDistrict[1]
            }]
        }
    }
    console.log(resData);
    return resData;
}

const districtSumStat = calcDistrictSumData();

const pieProvinceSeries = [
    {
        name: '四类发展路径村庄占比',
        type: 'pie',
        // roseType: 'radius',
        radius: ['14%', '50%'],
        center: ['50%', '54%'],
        avoidLabelOverlap: false,
        showEmptyCircle: false,
        itemStyle: {
            borderRadius: 8,
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
        label: {
            show: (value: number) => {
                if (value == 0) return false
                else return true
            },
            position: 'inside',
            formatter: '{b}\n{c}个\n{d}%',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        emphasis: {
            label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                borderColor: 'black',
                // position: 'center',
                color: 'white',
                formatter: '{b}\n\n{c}个\n\n{d}%'
            }
        },
        data: [
            {
                value: (roadStat["province"] as number[])[0],
                name: '产业主导',
            },
            {
                value: (roadStat["province"] as number[])[1],
                name: '共建共治'
            },
            {
                value: (roadStat["province"] as number[])[2],
                name: '绿色发展'
            },
            {
                value: (roadStat["province"] as number[])[3],
                name: '文化传承'
            }
        ]
        // .sort(function (a, b) {
        //     return b.value - a.value;
        // }),
    },

    {
        name: '各市占比',
        type: 'pie',
        // roseType: 'radius',
        radius: ['64%', '86%'],
        center: ['50%', '54%'],
        avoidLabelOverlap: false,
        showEmptyCircle: false,
        itemStyle: {
            borderRadius: 8,
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        // color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
        label: {
            show: (value: number) => {
                if (value == 0) return false
                else return true
            },
            position: 'inside',
            formatter: '{b}\n{c}个\n{d}%',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        emphasis: {
            label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                borderColor: 'black',
                // position: 'center',
                color: 'white',
                formatter: '{b}\n{c}个\n{d}%'
            }
        },
        data: citySumStat
        // .sort(function (a, b) {
        //     return b.value - a.value;
        // }),
    }

]

const pieOption: EchartsOption =
{
    title: {
        text: '四类发展路径及各市特色田园乡村占比图',
        left: 'center',
        top: '2%',
        textStyle: {
            color: 'rgba(30, 30, 30, 0.7)',
            fontWeight: 'bolder',
            fontFamily: 'KaiTi',
            fontSize: 32,
        }
    },
    minShowLabelAngle: 0.0001,
    series: pieProvinceSeries as any
}

const barProvinceSeries = [
    {
        name: '产业\n主导',
        type: 'bar',
        stack: 'total',
        label: {
            show: true,
            position: 'inside',
            formatter: '{a}\n{c}个',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        itemStyle: {
            borderRadius: 5,
        },
        color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
        emphasis: {
            label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                // borderColor: 'black',
                // position: 'center',
                color: 'white',
                formatter: '{a}\n{c}个'
            }
        },
        data: [(roadStat["province"] as number[])[0]]
    },
    {
        name: '共建\n共治',
        type: 'bar',
        stack: 'total',
        label: {
            show: true,
            position: 'inside',
            formatter: '{a}\n{c}个',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        itemStyle: {
            borderRadius: 5,
        },
        color: ['#4e5fbf', '#2cbf6c', '#f2784b'],
        emphasis: {
            label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                // borderColor: 'black',
                // position: 'center',
                color: 'white',
                formatter: '{a}\n{c}个'
            }
        },
        data: [(roadStat["province"] as number[])[1]]
    },
    {
        name: '绿色\n发展',
        type: 'bar',
        stack: 'total',
        label: {
            show: true,
            position: 'inside',
            formatter: '{a}\n{c}个',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        itemStyle: {
            borderRadius: 5,
        },
        color: ['#2cbf6c', '#f2784b'],
        emphasis: {
            label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                // borderColor: 'black',
                // position: 'center',
                color: 'white',
                formatter: '{a}\n{c}个'
            }
        },
        data: [(roadStat["province"] as number[])[2]]
    },
    {
        name: '文化\n传承',
        type: 'bar',
        stack: 'total',
        label: {
            show: true,
            position: 'inside',
            formatter: '{a}\n{c}个',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        itemStyle: {
            borderRadius: 8,
        },
        color: ['#f2784b'],
        emphasis: {
            label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                // borderColor: 'black',
                // position: 'center',
                color: 'white',
                formatter: '{a}\n{c}个'
            }
        },
        data: [(roadStat["province"] as number[])[3]]
    }
]

const barOption = {
    xAxis: {
        type: 'value',
        max: 'dataMax',
        axisLabel: {
            show: false,
        }
    },
    yAxis: {
        type: 'category',
        // data: ['四类\n路径\n乡村\n数量'],
        show: false
    },
    barWidth: '90%',
    grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        top: '2%',
        containLabel: true
    },
    series: barProvinceSeries
}

const colors = ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b']
const roads = ["产业主导", "共建共治", "绿色发展", "文化传承"]

let map: mapboxgl.Map;
// let citiesFillProperty: any;
let mapLoaded = false;

let pieChart: echarts.ECharts;
let barChart: echarts.ECharts;

let citySelectChanged = () => {
    console.log(citySelected.value)
    if (citySelected.value != '') {
        disSelectAllow.value = false;
        disList.value = districtDict[citySelected.value];
        heatMapLegendShow.value = false;
        if (mapLoaded) {
            map.fitBounds(cityBounds[citySelected.value])
            map.setPaintProperty('countyHeatMap', 'heatmap-opacity', 0);
            map.setFilter("jsCitiesFill", [
                '==',
                'name',
                citySelected.value
            ]);
            map.setFilter("countyCircle", [
                '==',
                '设区市',
                citySelected.value
            ]);
            map.setFilter("countyCircleHighlight", [
                '==',
                '设区市',
                citySelected.value
            ]);
            map.setFilter("jsDistrictLines", [
                '==',
                'city',
                citySelected.value
            ]);
            map.setFilter("jsDistrictLabel", [
                '==',
                'city',
                citySelected.value
            ]);
            map.setLayoutProperty('jsDistrictLines', 'visibility', 'visible');
            map.setLayoutProperty('jsDistrictLabel', 'visibility', 'visible');
            map.setLayoutProperty('jsCityLabels', 'visibility', 'none');
        }
        cityNum = 1;
        districtNum = districtDict[citySelected.value].length;
        countyNum = sum((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])

        pieChart.setOption({
            title: {
                text: '四类发展路径及各区/县特色田园乡村占比图',
                left: 'center',
                top: '2%',
                textStyle: {
                    color: 'rgba(30, 30, 30, 0.7)',
                    fontWeight: 'bolder',
                    fontFamily: 'KaiTi',
                    fontSize: 32,
                }
            },
            minShowLabelAngle: 0.0001,
            series: [
                {
                    name: '四类发展路径村庄占比',
                    type: 'pie',
                    // roseType: 'radius',
                    radius: ['14%', '50%'],
                    center: ['50%', '54%'],
                    avoidLabelOverlap: false,
                    showEmptyCircle: false,
                    itemStyle: {
                        borderRadius: 8,
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}\n{c}个\n{d}%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{b}\n\n{c}个\n\n{d}%'
                        }
                    },
                    data: [
                        {
                            value: ((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[0],
                            name: '产业主导',
                        },
                        {
                            value: ((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[1],
                            name: '共建共治'
                        },
                        {
                            value: ((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[2],
                            name: '绿色发展'
                        },
                        {
                            value: ((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[3],
                            name: '文化传承'
                        }
                    ]
                },
                {
                    name: '各区占比',
                    type: 'pie',
                    // roseType: 'radius',
                    radius: ['64%', '86%'],
                    center: ['50%', '54%'],
                    avoidLabelOverlap: false,
                    showEmptyCircle: false,
                    itemStyle: {
                        borderRadius: 8,
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    // color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}\n{c}个\n{d}%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{b}\n{c}个\n{d}%'
                        }
                    },
                    data: districtSumStat[citySelected.value]
                    // .sort(function (a, b) {
                    //     return b.value - a.value;
                    // }),
                }
            ]
        })

        barChart.setOption({
            series: [
                { data: [((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[0]] },
                { data: [((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[1]] },
                { data: [((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[2]] },
                { data: [((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[3]] },
            ]
        })
    }
    else {
        disSelectAllow.value = true;
        heatMapLegendShow.value = true;
        cityNum = 13;
        districtNum = 95;
        countyNum = 446;
        if (mapLoaded) {
            if (disSelected.value != '') {
                disSelected.value = '';
                map.setLayoutProperty('jsCitiesFill', 'visibility', 'visible');
                map.setLayoutProperty('jsDistrictsFill', 'visibility', 'none');
            }
            map.setPaintProperty('countyHeatMap', 'heatmap-opacity', 0.5);
            map.flyTo({
                zoom: 7.18,
                center: [119.113, 33.001],
                duration: 1000
            })
            // citiesFillProperty = map.setPaintProperty("jsCitiesFill", 'fill-color', citiesFillProperty);
            map.setFilter("jsCitiesFill", null);
            map.setFilter("jsCitiesFillHighlight", null);
            map.setFilter("countyCircle", null);
            map.setFilter("countyCircleHighlight", null);
            map.setFilter("jsDistrictLabel", null);
            map.setLayoutProperty('jsDistrictLines', 'visibility', 'none');
            map.setLayoutProperty('jsDistrictLabel', 'visibility', 'none');
            map.setLayoutProperty('jsCityLabels', 'visibility', 'visible');
            map.setLayoutProperty('visitedFlag', 'visibility', 'none');
            map.setLayoutProperty('countyAllLabel', 'visibility', 'none');
            map.setLayoutProperty('countyVisitedLabel', 'visibility', 'none');
        }
        pieChart.setOption({
            title: {
                text: '四类发展路径及各市特色田园乡村占比图',
                left: 'center',
                top: '2%',
                textStyle: {
                    color: 'rgba(30, 30, 30, 0.7)',
                    fontWeight: 'bolder',
                    fontFamily: 'KaiTi',
                    fontSize: 32,
                }
            },
            minShowLabelAngle: 0.0001,
            series: pieProvinceSeries
        })
        barChart.setOption({
            series: barProvinceSeries
        })

    }
}

let citySelectCleared = () => {
    console.log("city select cleared");
}

function insertStr(str: string, index: number, insertStr: string) {
    return str.substring(0, index) + insertStr + str.substring(index)
}

let disSelectChanged = () => {
    console.log(disSelected.value)
    if (disSelected.value != '') {
        if (mapLoaded) {
            map.fitBounds(districtBounds[citySelected.value + '-' + disSelected.value]["bbox"] as [[number, number], [number, number]])
            map.setPaintProperty('countyHeatMap', 'heatmap-opacity', 0);
            map.setFilter("jsDistrictsFill", [
                '==',
                'name',
                disSelected.value
            ]);

            map.setFilter("jsDistrictLabel", [
                '==',
                'name',
                disSelected.value
            ]);
            map.setFilter("countyCircle", [
                '==',
                '县区',
                disSelected.value
            ]);
            map.setFilter("countyCircleHighlight", [
                '==',
                '县区',
                disSelected.value
            ]);
            map.setFilter("countyAllLabel", [
                '==',
                '县区',
                disSelected.value
            ]);
            map.setFilter("countyVisitedLabel", [
                '==',
                '县区',
                disSelected.value
            ]);
            map.setLayoutProperty('jsCitiesFill', 'visibility', 'none');
            map.setLayoutProperty('jsDistrictsFill', 'visibility', 'visible');
            map.setLayoutProperty('jsCityLabels', 'visibility', 'none');
            map.setLayoutProperty('visitedFlag', 'visibility', 'visible');
            map.setLayoutProperty('countyAllLabel', 'visibility', 'visible');
            map.setLayoutProperty('countyVisitedLabel', 'visibility', 'visible');
        }

        districtNum = 1;
        countyNum = sum((roadStat["district"] as StringKeyObject<number[]>)[citySelected.value + '-' + disSelected.value])
        flagLegendShow.value = true;


        // console.log((roadStat["district"] as StringKeyObject<number[]>)[citySelected.value+'-'+disSelected.value])
        const ditrictSeries = {
            name: '四类发展路径村庄占比',
            type: 'pie',
            // roseType: 'radius',
            radius: ['20%', '86%'],
            center: ['50%', '54%'],
            avoidLabelOverlap: false,
            showEmptyCircle: false,
            itemStyle: {
                borderRadius: 8,
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            minShowLabelAngle: 0.0001,
            color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
            label: {
                show: (value: number) => {
                    if (value == 0) return false
                    else return true
                },
                position: 'inside',
                formatter: '{b}\n{c}个\n{d}%',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 28,
                    fontWeight: 'bold',
                    borderColor: 'black',
                    // position: 'center',
                    color: 'white',
                    formatter: '{b}\n\n{c}个\n\n{d}%'
                }
            },
            data: [
                {
                    value: ((roadStat["district"] as StringKeyObject<number[]>)[citySelected.value + '-' + disSelected.value])[0],
                    name: '产业主导',
                },
                {
                    value: ((roadStat["district"] as StringKeyObject<number[]>)[citySelected.value + '-' + disSelected.value])[1],
                    name: '共建共治'
                },
                {
                    value: ((roadStat["district"] as StringKeyObject<number[]>)[citySelected.value + '-' + disSelected.value])[2],
                    name: '绿色发展'
                },
                {
                    value: ((roadStat["district"] as StringKeyObject<number[]>)[citySelected.value + '-' + disSelected.value])[3],
                    name: '文化传承'
                }
            ]
        }
        pieChart.clear()
        pieChart.setOption({
            title: {
                text: '四类发展路径特色田园乡村占比图',
                left: 'center',
                top: '2%',
                textStyle: {
                    color: 'rgba(30, 30, 30, 0.7)',
                    fontWeight: 'bolder',
                    fontFamily: 'KaiTi',
                    fontSize: 32,
                }
            },
            minShowLabelAngle: 0.0001,
            series: ditrictSeries as any
        })
        let i = 0;

        const districtSeries = [];
        for (let dataNum of ((roadStat["district"] as StringKeyObject<number[]>)[citySelected.value + '-' + disSelected.value])) {
            if (dataNum != 0) {
                const searie = {
                    name: insertStr(roads[i], 2, '\n'),
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{a}\n{c}个',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    itemStyle: {
                        borderRadius: 5,
                    },
                    color: [colors[i]],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            // borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{a}\n{c}个'
                        }
                    },
                    data: [dataNum]
                }
                districtSeries.push(searie)
            }
            i += 1;
        }
        barChart.clear()
        barChart.setOption({
            xAxis: {
                type: 'value',
                max: 'dataMax',
                axisLabel: {
                    show: false,
                }
            },
            yAxis: {
                type: 'category',
                // data: ['四类\n路径\n乡村\n数量'],
                show: false
            },
            barWidth: '90%',
            grid: {
                left: '0%',
                right: '4%',
                bottom: '3%',
                top: '2%',
                containLabel: true
            },
            series: districtSeries
        })

    }
    else {
        // disSelectAllow.value = true;
        if (mapLoaded) {
            // map.setPaintProperty('countyHeatMap', 'heatmap-opacity', 0.5);
            map.fitBounds(cityBounds[citySelected.value])
            map.setFilter("jsDistrictLines", [
                '==',
                'city',
                citySelected.value
            ]);
            map.setFilter("jsCitiesFill", [
                '==',
                'name',
                citySelected.value
            ]);
            map.setFilter("countyCircle", [
                '==',
                '设区市',
                citySelected.value
            ]);
            map.setFilter("countyCircleHighlight", [
                '==',
                '设区市',
                citySelected.value
            ]);
            map.setFilter("jsDistrictLabel", [
                '==',
                'city',
                citySelected.value
            ]);
            // map.setFilter("jsCitiesFill", null);
            // map.setFilter("jsDistrictLabel", null);
            map.setLayoutProperty('jsCitiesFill', 'visibility', 'visible');
            map.setLayoutProperty('jsDistrictsFill', 'visibility', 'none');
            map.setLayoutProperty('jsCityLabels', 'visibility', 'none');
            map.setLayoutProperty('visitedFlag', 'visibility', 'none');
            map.setLayoutProperty('countyAllLabel', 'visibility', 'none');
            map.setLayoutProperty('countyVisitedLabel', 'visibility', 'none');
        }
        pieChart.setOption({
            title: {
                text: '四类发展路径及各区/县特色田园乡村占比图',
                left: 'center',
                top: '2%',
                textStyle: {
                    color: 'rgba(30, 30, 30, 0.7)',
                    fontWeight: 'bolder',
                    fontFamily: 'KaiTi',
                    fontSize: 32,
                }
            },
            minShowLabelAngle: 0.0001,
            series: [
                {
                    name: '四类发展路径村庄占比',
                    type: 'pie',
                    // roseType: 'radius',
                    radius: ['14%', '50%'],
                    center: ['50%', '54%'],
                    avoidLabelOverlap: false,
                    showEmptyCircle: false,
                    itemStyle: {
                        borderRadius: 8,
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}\n{c}个\n{d}%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{b}\n\n{c}个\n\n{d}%'
                        }
                    },
                    data: [
                        {
                            value: ((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[0],
                            name: '产业主导',
                        },
                        {
                            value: ((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[1],
                            name: '共建共治'
                        },
                        {
                            value: ((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[2],
                            name: '绿色发展'
                        },
                        {
                            value: ((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[3],
                            name: '文化传承'
                        }
                    ]
                },
                {
                    name: '各区占比',
                    type: 'pie',
                    // roseType: 'radius',
                    radius: ['64%', '86%'],
                    center: ['50%', '54%'],
                    avoidLabelOverlap: false,
                    showEmptyCircle: false,
                    itemStyle: {
                        borderRadius: 8,
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    // color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}\n{c}个\n{d}%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{b}\n{c}个\n{d}%'
                        }
                    },
                    data: districtSumStat[citySelected.value]
                    // .sort(function (a, b) {
                    //     return b.value - a.value;
                    // }),
                }
            ]
        })
        barChart.setOption({
            series: [
                {
                    name: '产业\n主导',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{a}\n{c}个',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    itemStyle: {
                        borderRadius: 5,
                    },
                    color: ['#f24452', '#4e5fbf', '#2cbf6c', '#f2784b'],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            // borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{a}\n{c}个'
                        }
                    },
                    data: [((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[0]]
                },
                {
                    name: '共建\n共治',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{a}\n{c}个',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    itemStyle: {
                        borderRadius: 5,
                    },
                    color: ['#4e5fbf', '#2cbf6c', '#f2784b'],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            // borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{a}\n{c}个'
                        }
                    },
                    data: [((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[1]]
                },
                {
                    name: '绿色\n发展',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{a}\n{c}个',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    itemStyle: {
                        borderRadius: 5,
                    },
                    color: ['#2cbf6c', '#f2784b'],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            // borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{a}\n{c}个'
                        }
                    },
                    data: [((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[2]]
                },
                {
                    name: '文化\n传承',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{a}\n{c}个',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    },
                    itemStyle: {
                        borderRadius: 8,
                    },
                    color: ['#f2784b'],
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                            // borderColor: 'black',
                            // position: 'center',
                            color: 'white',
                            formatter: '{a}\n{c}个'
                        }
                    },
                    data: [((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])[3]]
                }
            ]
        })

        flagLegendShow.value = false;

        districtNum = districtDict[citySelected.value].length;
        countyNum = sum((roadStat["city"] as StringKeyObject<number[]>)[citySelected.value])
    }
}

let disSelectCleared = () => {
    console.log("district select cleared");
}

const seriesHighlightFilterMap: StringKeyObject<StringKeyObject<string>[]> = {
    "各市占比": [{ "highlightLayer": "jsCitiesFillHighlight", "normalLayer": "jsCitiesFill", "field": "name", "changeProperty": "fill-opacity", "normalShow": "visible", "highlightShow": "none" }, { "highlightLayer": "countyCircleHighlight", "normalLayer": "countyCircle", "field": "设区市", "changeProperty": "circle-blur", "normalShow": "visible", "highlightShow": "none" }],
    "四类发展路径村庄占比": [{ "highlightLayer": "countyCircleHighlight", "normalLayer": "countyCircle", "field": "发展路", "changeProperty": "circle-blur", "normalShow": "visible", "highlightShow": "none" }],
    "各区占比": [{ "highlightLayer": "jsDistrictsFillHighlight", "normalLayer": "jsCitiesFill", "field": "name", "changeProperty": "fill-opacity", "normalShow": "visible", "highlightShow": "none" }, { "highlightLayer": "countyCircleHighlight", "normalLayer": "countyCircle", "field": "县区", "changeProperty": "circle-blur", "normalShow": "visible", "highlightShow": "none" }]
}


function dynamicLayers(filterType: string, filterName: string) {
    const hightlightList = seriesHighlightFilterMap[filterType];
    const currentFilters: StringKeyObject<Array<any> | undefined> = {};
    const currentNormalFilters: StringKeyObject<Array<any> | undefined> = {};
    
    let flagFilter: Array<any> | undefined;
    let allLabelFilter: Array<any> | undefined;
    let visitedLabelFilter: Array<any> | undefined;
    if (filterType == '四类发展路径村庄占比') {
        flagFilter = map.getFilter('visitedFlag');
        if (flagFilter) {
            map.setFilter('visitedFlag', ['all', flagFilter, ["==", "发展路", filterName]]);
        }
        else {
            map.setFilter('visitedFlag', ["==", "发展路", filterName]);
        }
        allLabelFilter = map.getFilter('countyAllLabel');
        if (allLabelFilter) {
            map.setFilter('countyAllLabel', ['all', allLabelFilter, ["==", "发展路", filterName]]);
        }
        else {
            map.setFilter('countyAllLabel', ["==", "发展路", filterName]);
        }
        visitedLabelFilter = map.getFilter('countyVisitedLabel');
        if (visitedLabelFilter) {
            map.setFilter('countyVisitedLabel', ['all', visitedLabelFilter, ["==", "发展路", filterName]]);
        }
        else {
            map.setFilter('countyVisitedLabel', ["==", "发展路", filterName]);
        }
    }
    console.log(map.getLayer("jsDistrictsFillHighlight"))
    for (let highlight of hightlightList) {
        map.setLayoutProperty(highlight["normalLayer"], 'visibility', 'none');
        map.setLayoutProperty(highlight["highlightLayer"], 'visibility', 'visible');
        currentFilters[highlight["highlightLayer"]] = map.getFilter(highlight["highlightLayer"])
        currentNormalFilters[highlight["normalLayer"]] = map.getFilter(highlight["normalLayer"])
        let filter = [];
        if (currentFilters[highlight["highlightLayer"]]) {
            filter = ['all', currentFilters[highlight["highlightLayer"]], ['==', highlight["field"], filterName]]
        }
        else {
            filter = ['==', highlight["field"], filterName]
        }
        map.setFilter(highlight["highlightLayer"], filter);
    }

    let tick = 1.0;
    const dynamicInterval = setInterval(() => {
        for (let highlight of hightlightList) {
            map.setPaintProperty(highlight["highlightLayer"], highlight["changeProperty"], 0.5 + tick / 20);
        }
        tick = (tick + 1.0) % 10;
    }, 100);

    setTimeout(() => {
        clearInterval(dynamicInterval);
        for (let highlight of hightlightList) {
            map.setLayoutProperty(highlight["normalLayer"], 'visibility', highlight["normalShow"]);
            map.setLayoutProperty(highlight["highlightLayer"], 'visibility', highlight["highlightShow"]);
            map.setFilter(highlight["highlightLayer"], currentFilters[highlight["highlightLayer"]]);
            map.setFilter(highlight["normalLayer"], currentNormalFilters[highlight["normalLayer"]]);
            // map.setFilter(highlight["highlightLayer"], null);
        }
        console.log(map.getLayer("jsDistrictsFillHighlight"))
        console.log(currentFilters);
        if (filterType == '四类发展路径村庄占比') {
            if (flagFilter) {
                map.setFilter('visitedFlag', flagFilter);
            }
            else {
                map.setFilter('visitedFlag', null);
            }
            if (allLabelFilter) {
                map.setFilter('countyAllLabel', allLabelFilter);
            }
            else {
                map.setFilter('countyAllLabel', null);
            }
            if (visitedLabelFilter) {
                map.setFilter('countyVisitedLabel', visitedLabelFilter);
            }
            else {
                map.setFilter('countyVisitedLabel', null);
            }
        }
    }, 2000);
}

onMounted(() => {
    // console.log("stat tab mounted");
    pieChart = echarts.init(chartDom.value);
    pieChart.setOption(pieOption);
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/johnnyt/clnequ2fi01es01r74h3e4wkr',
        zoom: 7.18,
        center: [119.113, 33.001],
        // pitch: 43
    })

    barChart = echarts.init(barDom.value);
    barChart.setOption(barOption);

    pieChart.on('click', (params) => {
        console.log((params as any))
        dynamicLayers(params.seriesName as string, params.name);
    })

    map.on('load', () => {
        // citiesFillProperty = map.getPaintProperty("jsCitiesFill", 'fill-color');
        // console.log(citiesFillProperty);
        mapLoaded = true;
        map.on('mouseenter', 'visitedFlag', () => {
            map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'visitedFlag', () => {
            map.getCanvas().style.cursor = ''
        })

        map.on('click', 'visitedFlag', (e) => {
            // console.log("change to detail", (e.features as mapboxgl.MapboxGeoJSONFeature[])[0].properties)
            if ((e.features as mapboxgl.MapboxGeoJSONFeature[])[0].properties) {
                (e.features as mapboxgl.MapboxGeoJSONFeature[])[0].properties?.["自然村"]
                router.push({
                    name: 'visitCountyTab',
                    params: { countyName: (e.features as mapboxgl.MapboxGeoJSONFeature[])[0].properties?.["自然村"] }
                })
            }
        })
    })
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
    background-image: linear-gradient(to bottom,
            rgba(50, 50, 50, 0.2) 0%,
            rgba(50, 50, 50, 0.2) 100%),
        url('../assets/green-field.jpg');
    //   url('../assets/rice-field.jpg');
    // filter: blur(4px);
    // -webkit-filter: blur(4px);
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-content: space-around;

    div.map-container {
        width: 57vw;
        height: 91vh;
        background-color: aqua;
        border-radius: 6px;
    }

    div.selector {
        position: absolute;
        left: 38vw;
        top: 1.5vh;
        width: 18vw;
        height: 5vh;
        background-color: rgba(230, 230, 230, 0.2);
        backdrop-filter: blur(6px);
        border-radius: 8px;

        display: flex;
        flex-flow: row nowrap;
        gap: 1vw;

        justify-content: space-evenly;
        align-items: center;

        .el-select {
            width: 8vw;
        }

        .el-input {
            --el-input-height: 50px;
            font-size: calc(0.3vh + 0.6vw);
            font-family: 'STZhongsong';

            .el-input__inner {
                font-family: 'STZhongsong';
                font-weight: 600;
            }
        }
    }

    div.map-legend {
        position: absolute;
        left: 1vw;
        bottom: 3vh;
        width: 6vw;
        height: 28vh;

        // background-color: aqua;
        border-radius: 8px;
        // background-color: rgba(230, 230, 230, 0.2);
        // backdrop-filter: blur(6px);

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;

        div.flag-legend {
            height: 3.6vh;
            width: 5vw;
            padding: 6px;
            background-color: #26d9562c;
            backdrop-filter: blur(4px);
            border-radius: 4px;

            display: flex;
            flex-flow: row nowrap;
            justify-content: center;

            div.flag-icon {
                width: 1.8vw;
                height: 3.6vh;
                background-image: url('../assets/flag.png');
                background-size: contain;
                background-repeat: no-repeat;
            }

            div.flag-text {
                width: 3.2vw;
                text-align: center;
            }
        }

        div.legend-item {
            height: 11.5vh;
            width: 5vw;
            background-color: bisque;
            backdrop-filter: blur(4px);
            border-radius: 4px;
            flex-grow: 0;
            padding: 6px;

            &.heatmap-legend {
                background-color: rgba(255, 224, 186, 0.3);
            }

            &.circle-legend {
                background-color: rgba(183, 244, 255, 0.3);
            }

            div.legend-title {
                height: 3vh;
                line-height: 3vh;
                width: 5vw;
                font-size: calc(0.3vh + 0.5vw);
                font-family: 'STZhongsong';
                font-weight: 600;
            }

            div.legend-content {
                height: 8.5vh;
                width: 5vw;

                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;

                div.legend-color {
                    height: 8.4vh;
                    width: 2.4vw;

                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-between;

                    // background-color: blue;

                    div.legend-color-item {
                        height: 2vh;
                        width: 2.4vw;
                    }
                }

                div.legend-text {
                    height: 8.4vh;
                    width: 2.4vw;

                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-between;

                    // background-color: coral;

                    div.legend-text-item {
                        height: 2vh;
                        width: 2.4vw;
                        line-height: 2vh;

                        font-family: 'Microsoft YaHei';
                        font-size: calc(0.4vh + 0.3vw);
                        font-weight: 600;
                    }
                }
            }
        }


    }

    div.chart-container {
        width: 30vw;
        height: 56vh;
        background-color: rgba(233, 233, 233, 0.596);
        border-radius: 6px;

        backdrop-filter: blur(6px);
    }

    div.num-container {
        width: 30vw;
        height: 34vh;
        background-color: rgba(233, 233, 233, 0.596);
        border-radius: 6px;

        backdrop-filter: blur(6px);

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;

        div.num-data-title {
            height: 6vh;
            width: 30vw;
            line-height: 6vh;
            // background-color: #044d17;
            border-radius: 6px;

            font-family: 'KaiTi';
            font-weight: 600;
            font-size: calc(0.5vh + 1.2vw);
            color: rgb(55, 55, 55);

            text-align: center;
            // vertical-align: middle;
        }
    }

    div.data-desc {
        width: 30vw;
        height: 28vh;
        // background-color: rgba(233, 233, 233, 0.596);
        // border-radius: 6px;

        // backdrop-filter: blur(6px);

        display: flex;
        flex-flow: column wrap;
        justify-content: space-around;
        align-content: space-around;

        div.simple-num {
            width: 14.5vw;
            height: 12vh;
            // background-color: aqua;
            border-radius: 6px;

            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            cursor: pointer;

            div.num-content {
                width: 7.25vw;
                height: 12vh;
                line-height: 12vh;
                border-radius: 6px;
                text-align: center;

                background-color: rgba(205, 255, 198, 0.6);

                font-family: 'Impact';
                font-size: calc(1vh + 2vw);

                // font-weight: 600;
                @keyframes backImageTrans {
                    0% {
                        background-position: 0% 50%;
                    }

                    50% {
                        background-position: 100% 50%;
                    }

                    100% {
                        background-position: 0% 50%;
                    }
                }

                &.county-num-content {
                    background: linear-gradient(45deg, #D6FF7F 0%, #00B3CC 100%);
                    background-size: 400% 400%;

                    // transition: all ease-in-out 0.5s;
                    &:hover {
                        animation: backImageTrans 2s ease-in-out;
                    }
                }

            }

            div.fixed-content {
                width: 7.25vw;
                height: 12vh;
                line-height: 12vh;
                border-radius: 6px;
                text-align: center;

                background-color: rgba(255, 239, 175, 0.6);

                font-size: calc(1vh + 1.5vw);
                font-family: 'Microsoft YaHei';
                font-weight: 600;

                &.county-fixed-content {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    font-size: calc(0.4vh + 1vw);
                    // background-image: linear-gradient(45deg, #D6FF7F 0%, #00B3CC 100%);
                    background-color: rgba(205, 255, 198, 0.5);

                    div.one-row {
                        height: 6vh;
                        line-height: 3vh;
                        background-image: linear-gradient(25deg,
                                #b6b284 0%,
                                #288a54 60%,
                                #044d17 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                }
            }
        }

        div.county-num-chart {
            width: 14.5vw;
            height: 12vh;
            border-radius: 6px;

            background-color: rgba(205, 255, 198, 0.5);
        }
    }
}

li.el-select-dropdown__item span {
    font-family: 'STZhongsong';
    font-weight: 600;
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
  