export default {
    data: () => ({
        weightChartOption: {
            title: {
                text: '最近30天体重',
                x:'center'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    showMinLabel: true,
                    showMaxLabel: true,
                    formatter: function (value, index) {
                        return moment(value, 'YYYY-MM-DD\\THH:mm:ss').format('MM-DD');
                    }
                },
                data: []
            },
            yAxis: {
                type: 'value',
                min: 70,
                max: 80,
                minInterval: 1
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    const time = moment(params[0].name, 'YYYY-MM-DD\\THH:mm:ss').format('MM-DD');
                    const pv = params[0].value;
                    return `${time}<br>体重: ${pv} kg`;
                }
            },
            series: [{
                type: 'line',
                label: {
                    show: true
                },
                areaStyle: {},
                smooth: false,
                data: []
            }]
        },
        weightChart: {},
        weight: null
    }),
    methods: {
        loadWeightChartData: function () {
            const that = this;
            axios({
                url: '/api/statistics/health/weight',
                method: 'get',
                params: {
                    startTime: moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00'),
                    endTime: moment().format('YYYY-MM-DD 00:00:00')
                }
            }).then(function (response) {
                const weightChartData = response.data;

                that.weightChartOption.xAxis.data = [];
                that.weightChartOption.series[0].data = [];
                for (let i = 0, l = weightChartData.length; i < l; i++) {
                    that.weightChartOption.xAxis.data.push(weightChartData[i].samplingTime);
                    that.weightChartOption.series[0].data.push(weightChartData[i].kg);
                }
                that.weightChart.setOption(that.weightChartOption);
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        postWeight: function () {
            const that = this;
            axios({
                url: '/api/health/weight',
                method: 'post',
                data: {
                    kg: that.weight
                }
            }).then(function (response) {
                that.weight = null;
                that.loadWeightChartData();
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        }
    },
    mounted: function () {
        this.weightChart = echarts.init(document.getElementById('weight-chart'));
        this.loadWeightChartData();
    },
    template: `
        <div style="margin-left: 200px;">
            <div class="text-center" style="margin-bottom: 20px;">
                <el-input v-model="weight" placeholder="请输入今日体重" style="width: 200px;"></el-input>
                <el-button @click="postWeight">记录</el-button>
            </div>
            <div id="weight-chart" style="height: 400px;"></div>
        </div>
    `
}