export default {
    data: () => ({
        timestamp: moment().unix()
    }),
    template: `
        <div style="margin-left: 200px;">
            <el-form label-width="80px">
                <el-form-item label="时间戳">
                    <el-input v-model="timestamp"></el-input>
                </el-form-item>
                <el-form-item label="本地时间">
                    <el-input :value="moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss.SSS')" disabled></el-input>
                </el-form-item>
            </el-form>
        </div>
    `
}