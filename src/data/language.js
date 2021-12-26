

export default {
    list:{

    },
    app: {
        operators:[
            { id: 6, key: 6, 'title': '新增',  ico: "icon-h-add-select",  action:{
                name:'add', category:'openTab','url': '/action/add','title': '新增',
            } },
            { id: 6, key: 6, 'title': '复制',  ico: "icon-h-add-select",  action:{
                name:'copy', category:'openTab','url': '/action/copy','title': '复制',
            } },
            { id: 7, key: 7, 'title': '保存',  ico: "icon-h-editor",  action:{
                name:'save', category:'openTab','url': '/action/edit','title': '保存',
            } },
            {
                id: 2, key: 2, 'title': '提交', 'url': '/action/', ico: "icon-h-seleted",
                children: [
                    { id: 22, key: 22, 'title': '提交',  ico: "icon-h-seleted", 
                    action:{
                        name:'submit', category:'postApi','url': '/action/submit','title': '提交',
                    } },
                    { id: 24, key: 24, 'title': '撤回',  ico: "icon-h-return", action:{
                        name:'unSubmit', category:'postApi','url': '/action/unSubmit','title': '撤回',
                    } },
                ]
            },
            {
                id: 3, key: 3, 'title': '审核',  ico: "icon-h-certified-supplier-fill",
                children: [
                    { id: 32, key: 32, 'title': '审核',  ico: "icon-h-certified-supplier-fill", action:{
                        name:'approve', category:'postApi','url': '/action/approve','title': '审核',
                    } },
                    { id: 34, key: 34, 'title': '反审核',  ico: "icon-h-return", action:{
                        name:'unApprove', category:'postApi','url': '/action/unApprove','title': '反审核',
                    } },
                ]
            },
            {
                id: 4, key: 4, 'title': '作废',  ico: "icon-h-close",
                children: [
                    { id: 42, key: 42, 'title': '作废',  ico: "icon-h-close", action:{
                        name:'obsolete', category:'postApi','url': '/action/obsolete','title': '作废',
                    } },
                    { id: 44, key: 44, 'title': '反作废',  ico: "icon-h-return", action:{
                        name:'unObsolete', category:'postApi','url': '/action/unObsolete','title': '反作废',
                    } },
                ]
            },
            { id: 23, key: 23, 'title': '删除',  ico: "icon-h-ashbin",  action:{
                name:'delete', category:'postApi','url': '/action/delete','title': '删除',
            } },
        ],
        fieldGroups: [
            {
                id: 0, title: '基本资料',
                fields: [
                    {
                        id: 'id',
                        label: "Id",
                        dataIndex: "id",
                        defaultSortOrder: "descend",
                        width: 240,
                        seq: '0',
                        dataInfo: {
                            category: 'int'
                        },
                        showInfo: {
                            category: 'number'
                        }
                    },
                    {
                        id: 'name',
                        label: "名称",
                        dataIndex: "name",
                        defaultSortOrder: "descend",
                        width: 240,
                        seq: '0',
                        dataInfo: {
                            category: 'string'
                        },
                        showInfo: {
                            category: 'text'
                        }
                    },
                    {
                        id: 'label',
                        label: "标题",
                        dataIndex: "title",
                        defaultSortOrder: "descend",
                        width: 240,
                        seq: '0',
                        dataInfo: {
                            category: 'string'
                        },
                        showInfo: {
                            category: 'text'
                        }
                    },

                ]
            },
            {
                id: 1, title: '系统',
                fields: [
                    {
                        id: 'modifiTime',
                        label: "修改时间",
                        dataIndex: "modifiTime",
                        defaultSortOrder: "descend",
                        width: 180,
                        seq: '2',
                        dataInfo: {
                            category: 'datetime'
                        },
                        showInfo: {
                            category: 'text',
                            disabled: true
                        }
                    },
                    {
                        id: 'modifier',
                        label: "修改人",
                        dataIndex: "modifier",
                        defaultSortOrder: "descend",
                        width: 180,
                        seq: '1',
                        dataInfo: {
                            category: 'string'
                        },
                        showInfo: {
                            category: 'text',
                            disabled: true
                        }
                    },
                    {
                        id: 'createTime',
                        label: "创建时间",
                        dataIndex: "createTime",
                        defaultSortOrder: "descend",
                        width: 180,
                        seq: '4',
                        dataInfo: {
                            category: 'datetime',
                        },
                        showInfo: {
                            category: 'text',
                            disabled: true
                        }
                    },
                    {
                        id: 'creator',
                        label: "创建人",
                        dataIndex: "creator",
                        defaultSortOrder: "descend",
                        width: 180,
                        seq: '3',
                        dataInfo: {
                            category: 'string',
                        },
                        showInfo: {
                            category: 'text',
                            disabled: true
                        }
                    },
                ]
            }
        ]
    },
}