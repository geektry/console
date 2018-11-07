export default {
    data: () => ({
        pvOfTimeChartOption: {
            title: {
                text: '最近30天浏览量',
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
                minInterval: 1
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    const time = moment(params[0].name, 'YYYY-MM-DD\\THH:mm:ss').format('MM-DD');
                    const pv = params[0].value;
                    return `${time}<br>浏览量: ${pv}`;
                }
            },
            series: [{
                type: 'line',
                areaStyle: {},
                smooth: true,
                data: []
            }]
        },
        pvOfIdChartOption: {
            title: {
                text: '浏览量分布',
                x:'center'
            },
            tooltip: {
                formatter: function (params, ticket, callback) {
                    const title = params.name;
                    const pv = params.value;
                    const percent = params.percent;
                    return `${title}<br>浏览量: ${pv} (${percent}%)`;
                }
            },
            series: [{
                type: 'pie',
                clockwise: false,
                data:[]
            }]
        },
        pvOfTimeChart: {},
        pvOfIdChart: {},
        notes: [],
        noteId: '',
        date: moment().format('YYYY-MM-DD 00:00:00')
    }),
    methods: {
        listNotes: function () {
            const that = this;
            axios({
                url: '/api/notes',
                method: 'get'
            }).then(function (response) {
                that.notes = response.data;
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        loadPvOfTimeChartData: function () {
            const that = this;
            axios({
                url: '/api/statistics/notes/pv_of_time',
                method: 'get',
                params: {
                    noteId: that.noteId === '' ? null : that.noteId,
                    startTime: moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00'),
                    endTime: moment().format('YYYY-MM-DD 00:00:00')
                }
            }).then(function (response) {
                const pvOfTimeChartData = response.data;

                that.pvOfTimeChartOption.xAxis.data = [];
                that.pvOfTimeChartOption.series[0].data = [];
                for (let i = 0, l = pvOfTimeChartData.length; i < l; i++) {
                    that.pvOfTimeChartOption.xAxis.data.push(pvOfTimeChartData[i].samplingTime);
                    that.pvOfTimeChartOption.series[0].data.push(pvOfTimeChartData[i].pv);
                }
                that.pvOfTimeChart.setOption(that.pvOfTimeChartOption);
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        loadPvOfIdChartData: function () {
            const that = this;
            axios({
                url: '/api/statistics/notes/pv_of_id',
                method: 'get',
                params: {
                    samplingTime: that.date
                }
            }).then(function (response) {
                const pvOfIdChartData = response.data;

                that.pvOfIdChartOption.series[0].data = [];
                for (let i = 0, l = pvOfIdChartData.length; i < l; i++) {
                    that.pvOfIdChartOption.series[0].data.push({
                        name: pvOfIdChartData[i].title,
                        value: pvOfIdChartData[i].pv
                    });
                }
                that.pvOfIdChart.setOption(that.pvOfIdChartOption);
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        }
    },
    mounted: function () {
        this.pvOfTimeChart = echarts.init(document.getElementById('pv-of-time-chart'));
        this.pvOfIdChart = echarts.init(document.getElementById('pv-of-id-chart'));
        this.listNotes();
        this.loadPvOfTimeChartData();
        this.loadPvOfIdChartData();
    },
    template: `
        <div style="margin-left: 200px;">
            <div class="text-center" style="margin-bottom: 20px;">
                <el-select v-model="noteId" clearable placeholder="全部">
                    <el-option v-for="note in notes" :key="note.id" :label="note.title" :value="note.id"></el-option>
                </el-select>
                <el-button @click="loadPvOfTimeChartData">更新</el-button>
            </div>
            <div id="pv-of-time-chart" style="height: 400px;"></div>
            <div class="text-center" style="margin-bottom: 20px;">
                <el-date-picker v-model="date" type="date" :editable="false" placeholder="全部" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
                <el-button @click="loadPvOfIdChartData">更新</el-button>
            </div>
            <div id="pv-of-id-chart" style="height: 350px;"></div>
        </div>
    `
}