export default {
    data: () => ({
    }),
    template: `
        <div>
            <el-menu class="fixed-left" background-color="#303133" text-color="#fff" active-text-color="#409EFF" :default-active="$route.matched[2].path" style="width: 200px;" router unique-opened>
                <el-submenu index="/product/note">
                    <template slot="title">
                        <i class="fas fa-pencil-ruler"></i>
                        <span>GeekTry笔记</span>
                    </template>
                    <el-menu-item index="/product/note/statistics">
                        <i class="fas fa-chart-area"></i>
                        <span>数据统计</span>
                    </el-menu-item>
                    <el-menu-item index="/product/note/operation">
                        <i class="fas fa-briefcase"></i>
                        <span>常规管理</span>
                    </el-menu-item>
                    <el-menu-item index="/product/note/group">
                        <i class="fas fa-folder-open"></i>
                        <span>分组管理</span>
                    </el-menu-item>
                </el-submenu>
                <p class="absolute-bottom text-center" style="font-size: 10px; color: #fff;">©2018 GeekTry.com</p>
            </el-menu>
            <router-view></router-view>
        </div>
    `
}