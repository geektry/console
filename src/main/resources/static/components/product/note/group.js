export default {
    data: () => ({
        activeTab: 'multiple',
        multipleTab: {
            groups: []
        },
        singleTab: {
            group: {}
        }
    }),
    methods: {
        isNull: function (obj) {
            return obj === undefined || obj === null;
        },
        listGroups: function () {
            const that = this;
            axios({
                url: '/api/notes/groups',
                method: 'get'
            }).then(function (response) {
                that.multipleTab.groups = response.data;
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        getGroup: function (groupId) {
            const that = this;
            axios({
                url: '/api/notes/groups/' + groupId,
                method: 'get'
            }).then(function (response) {
                that.singleTab.group = response.data;
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        postGroup: function (group) {
            const that = this;
            axios({
                url: '/api/notes/groups/',
                method: 'post',
                data: group
            }).then(function (response) {
                that.singleTab.group.id = response.data;
                that.$message({
                    type: 'success',
                    message: '保存成功！'
                });
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        putGroup: function (group, groupId) {
            const that = this;
            axios({
                url: '/api/notes/groups/' + groupId,
                method: 'put',
                data: group
            }).then(function (response) {
                that.$message({
                    type: 'success',
                    message: '保存成功！'
                });
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        deleteGroup: function (groupId) {
            this.$confirm('确认删除分组：' + groupId + ' ？', '警告', {
                type: 'warning',
                lockScroll: false
            }).then(() => {
                const that = this;
                axios({
                    url: '/api/notes/groups/' + groupId,
                    method: 'delete'
                }).then(function (response) {
                    that.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                    that.listGroups();
                }).catch(function (error) {
                    that.$message({
                        type: 'error',
                        message: error.response.data.message
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '删除失败！'
                });
            });
        },
        handleTabClick: function (tab, event) {
            const tabName = tab.name;
            switch (tabName) {
                case 'multiple':
                    this.listGroups();
                    break;
                case 'single':
                    this.singleTab.group = {};
                    break;
            }
        },
        saveGroup: function () {
            const groupId = this.singleTab.group.id;
            let group = {
                name: this.singleTab.group.name
            };
            if (this.isNull(groupId)) {
                this.postGroup(group);
                return;
            }
            this.putGroup(group, groupId);
        },
        editGroup: function (groupId) {
            this.getGroup(groupId);
            this.activeTab = 'single';
        }
    },
    mounted: function () {
        this.listGroups();
    },
    template: `
        <el-tabs v-model="activeTab" @tab-click="handleTabClick" style="margin-left: 200px;">
            <el-tab-pane label="多组" name="multiple">
                <el-table :data="multipleTab.groups" size="medium" stripe>
                    <el-table-column label="ID" prop="id" width="50"></el-table-column>
                    <el-table-column label="组名" prop="name"></el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="editGroup(scope.row.id)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteGroup(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            
            <el-tab-pane label="单组" name="single">
                <el-form label-width="80px">
                    <el-form-item label="操作" class="clearfix">
                        <el-button class="float-right" type="primary" @click="saveGroup">保存组</el-button>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="singleTab.group.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    `
}