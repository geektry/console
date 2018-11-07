export default {
    data: () => ({
    }),
    template: `
        <div>
            <el-menu class="fixed-left" background-color="#303133" text-color="#fff" active-text-color="#409EFF" :default-active="$route.matched[2].path" style="width: 200px;" router unique-opened>
                <el-menu-item index="/tool/health">
                    <i class="fas fa-medkit"></i>
                    <span slot="title">健康</span>
                </el-menu-item>
                <el-menu-item index="/tool/timestamp">
                    <i class="fas fa-clock"></i>
                    <span slot="title">时间戳转换</span>
                </el-menu-item>
                <el-menu-item index="/tool/image">
                    <i class="fas fa-image"></i>
                    <span slot="title">图片</span>
                </el-menu-item>
                <p class="absolute-bottom text-center" style="font-size: 10px; color: #fff;">©2018 GeekTry.com</p>
            </el-menu>
            <router-view></router-view>
        </div>
    `
}