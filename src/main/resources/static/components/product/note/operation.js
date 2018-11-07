export default {
    data: () => ({
        activeTab: 'multiple',
        multipleTab: {
            notes: []
        },
        singleTab: {
            editPreviewSwitcher: 'edit',
            note: {}
        },
        groups: [],
        groupId: ''
    }),
    computed: {
        singleTabNoteHtmlContent: function () {
            return this.mdToHtml(this.singleTab.note.mdContent);
        },
        iFrameHtmlContent: function () {
            let content = this.singleTabNoteHtmlContent;
            if (this.isNull(content)) {
                content = '';
            }
            return `
                <html>
                <head>
                    <link rel="stylesheet" href="/lib/bootstrap/4.1.1/bootstrap.origin.css">
                    <link rel="stylesheet" href="/lib/highlight.js/9.12.0/styles/darcula.css">
                    <script src="/lib/highlight.js/9.12.0/highlight.pack.js"></script>
                    <script>hljs.initHighlightingOnLoad();</script>
                </head>
                <body style="padding:20px; background-image:url('/image/background.png');">
                    ${content}
                </body>
                </html>
            `;
        }
    },
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
                that.groups = response.data;
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        listNotes: function () {
            const that = this;
            axios({
                url: '/api/notes',
                method: 'get',
                params: {
                    groupId: that.groupId
                }
            }).then(function (response) {
                that.multipleTab.notes = response.data;
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        getNote: function (noteId) {
            const that = this;
            axios({
                url: '/api/notes/' + noteId,
                method: 'get'
            }).then(function (response) {
                that.singleTab.note = response.data;
            }).catch(function (error) {
                that.$message({
                    type: 'error',
                    message: error.response.data.message
                });
            });
        },
        postNote: function (note) {
            const that = this;
            axios({
                url: '/api/notes/',
                method: 'post',
                data: note
            }).then(function (response) {
                that.singleTab.note.id = response.data;
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
        putNote: function (note, noteId) {
            const that = this;
            axios({
                url: '/api/notes/' + noteId,
                method: 'put',
                data: note
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
        deleteNote: function (noteId) {
            this.$confirm('确认删除笔记：' + noteId + ' ？', '警告', {
                type: 'warning',
                lockScroll: false
            }).then(() => {
                const that = this;
                axios({
                    url: '/api/notes/' + noteId,
                    method: 'delete'
                }).then(function (response) {
                    that.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                    that.listNotes();
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
                    this.listNotes();
                    break;
                case 'single':
                    this.singleTab.note = {};
                    break;
            }
        },
        saveNote: function () {
            const noteId = this.singleTab.note.id;
            let note = {
                title: this.singleTab.note.title,
                path: this.singleTab.note.path,
                mdContent: this.singleTab.note.mdContent,
                htmlContent: this.singleTabNoteHtmlContent,
                groupId: this.singleTab.note.groupId
            };
            if (this.isNull(noteId)) {
                this.postNote(note);
                return;
            }
            this.putNote(note, noteId);
        },
        editNote: function (noteId) {
            this.getNote(noteId);
            this.activeTab = 'single';
        },
        mdToHtml: function(md) {
            if (this.isNull(md)) {
                return null;
            }

            let renderer = new marked.Renderer();
            renderer.heading = (text, level) => `<h${level} class="text-center">${text}</h${level}>`;
            renderer.table = (header, body) => `
                <div class="table-responsive">
                    <style>
                        th, td { white-space: nowrap; }
                    </style>
                    <table class="table table-dark table-striped table-bordered table-hover table-sm">
                        <thead>${header}</thead>
                        <tbody>${body}</tbody>
                    </table>
                </div>
            `;
            renderer.link = (href, title, text) => `<a href="${href}" target="_blank">${text}</a>`;
            renderer.image = (href, title, text) => `<img src="${href}" alt="${text}" width="100%">`;

            let mkd = marked;
            mkd.setOptions({
                renderer: renderer,
                highlight: function (code) {
                    return hljs.highlightAuto(code).value;
                }
            });
            return mkd(md);
        }
    },
    mounted: function () {
        this.listGroups();
        this.listNotes();
    },
    template: `
        <el-tabs v-model="activeTab" @tab-click="handleTabClick" style="margin-left: 200px;">
            <el-tab-pane label="多笔记" name="multiple">
                <div class="text-center">
                    <el-select v-model="groupId" placeholder="全部" @change="listNotes" clearable>
                        <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.id"></el-option>
                    </el-select>
                </div>
                <el-table :data="multipleTab.notes" size="medium" stripe>
                    <el-table-column label="ID" prop="id" width="50"></el-table-column>
                    <el-table-column label="标题" prop="title"></el-table-column>
                    <el-table-column label="路径" prop="path"></el-table-column>
                    <el-table-column label="浏览量" prop="pv" width="80"></el-table-column>
                    <el-table-column label="编辑时间" prop="modifiedTs" width="150"></el-table-column>
                    <el-table-column label="创建时间" prop="createdTs" width="150"></el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="window.open('http://note.geektry.com/p/' + scope.row.path)">预览</el-button>
                            <el-button type="primary" size="mini" @click="editNote(scope.row.id)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteNote(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            
            <el-tab-pane label="单笔记" name="single">
                <el-form label-width="80px">
                    <el-form-item label="标题">
                        <el-input v-model="singleTab.note.title"></el-input>
                    </el-form-item>
                    <el-form-item label="路径">
                        <el-input v-model="singleTab.note.path"></el-input>
                    </el-form-item>
                    <el-form-item label="分组">
                        <el-select v-model="singleTab.note.groupId" placeholder="全部" clearable>
                            <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作" class="clearfix">
                        <el-radio-group v-model="singleTab.editPreviewSwitcher">
                            <el-radio-button label="edit">编辑</el-radio-button>
                            <el-radio-button label="preview">预览</el-radio-button>
                        </el-radio-group>
                        <el-button class="float-right" type="primary" @click="saveNote">保存笔记</el-button>
                    </el-form-item>
                    <el-form-item label="内容" v-show="singleTab.editPreviewSwitcher == 'edit'">
                        <el-input type="textarea" v-model="singleTab.note.mdContent" rows="24"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" v-show="singleTab.editPreviewSwitcher == 'preview'">
                        <iframe :srcdoc="iFrameHtmlContent" frameborder="0" width="100%" height="516px"></iframe>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    `
}