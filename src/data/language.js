

export default {
    fieldGroups: [
        {
            id: 0, title: '基本资料',
            fields:[
                {
                    title: "Id",
                    dataIndex: "id",
                    defaultSortOrder: "descend",
                    resizable: true,
                    width: 80,
                    sorter: (a, b) => a.id - b.id,
                },
                {
                    title: "名称",
                    dataIndex: "name",
                    defaultSortOrder: "descend",
                    resizable: true,
                    width: 180,
                    sorter: (a, b) => a.name - b.name,
                },
                {
                    title: "标题",
                    dataIndex: "title",
                    defaultSortOrder: "descend",
                    resizable: true,
                    width: 180,
                    sorter: (a, b) => a.title - b.title,
                },
                
            ]
        },
        {
            id:1,title:'系统',
            fields:[
                {
                    title: "modifiTime",
                    dataIndex: "title",
                    defaultSortOrder: "descend",
                    resizable: true,
                    width: 180,
                    sorter: (a, b) => a.title - b.title,
                },
                {
                    title: "修改人",
                    dataIndex: "modifier",
                    defaultSortOrder: "descend",
                    resizable: true,
                    width: 180,
                    sorter: (a, b) => a.title - b.title,
                },
                {
                    title: "创建时间",
                    dataIndex: "createTime",
                    defaultSortOrder: "descend",
                    resizable: true,
                    width: 180,
                    sorter: (a, b) => a.title - b.title,
                },
                {
                    title: "创建人",
                    dataIndex: "creator",
                    defaultSortOrder: "descend",
                    resizable: true,
                    width: 180,
                    sorter: (a, b) => a.title - b.title,
                },
            ]
        }
    ]
}