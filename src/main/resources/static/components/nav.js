export default {
    data: () => ({
    }),
    template: `
        <div>
            <el-menu class="fixed-top" background-color="#303133" text-color="#fff" active-text-color="#409EFF" :default-active="$route.matched[1].path" mode="horizontal" router unique-opened>
                <el-menu-item index="/">
                    <i class="fas fa-terminal"></i>
                    <span>GeekTry控制台</span>
                </el-menu-item>
                <el-menu-item index="/product">
                    <i class="fas fa-project-diagram"></i>
                    <span>GeekTry产品</span>
                </el-menu-item>
                <el-menu-item index="/tool">
                    <i class="fas fa-toolbox"></i>
                    <span>GeekTry工具</span>
                </el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>
    `
}