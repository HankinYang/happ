

export default {
    fieldGroups: [
        {
            id: 0, title: '基本资料',
            fields:[
                {
                    id:'id',
                    label: "Id",
                    dataIndex: "id",
                    defaultSortOrder: "descend",
                    width: 240,
                    seq:'0',
                    dataInfo:{
                        category:'int'
                    },
                    showInfo:{
                        category:'number'
                    }
                },
                {
                    id:'name',
                    label: "名称",
                    dataIndex: "name",
                    defaultSortOrder: "descend",
                    width: 240,
                    seq:'0',
                    dataInfo:{
                        category:'string'
                    },
                    showInfo:{
                        category:'text'
                    }
                },
                {
                    id:'label',
                    label: "标题",
                    dataIndex: "title",
                    defaultSortOrder: "descend",
                    width: 240,
                    seq:'0',
                    dataInfo:{
                        category:'string'
                    },
                    showInfo:{
                        category:'text'
                    }
                },
                
            ]
        },
        {
            id:1,title:'系统',
            fields:[
                {
                    id:'modifiTime',
                    label: "修改时间",
                    dataIndex: "modifiTime",
                    defaultSortOrder: "descend",
                    width: 180,
                    seq:'2',
                    dataInfo:{
                        category:'datetime'
                    },
                    showInfo:{
                        category:'text',
                        disabled:true
                    }
                },
                {
                    id:'modifier',
                    label: "修改人",
                    dataIndex: "modifier",
                    defaultSortOrder: "descend",
                    width: 180,
                    seq:'1',
                    dataInfo:{
                        category:'string'
                    },
                    showInfo:{
                        category:'text',
                        disabled:true
                    }
                },
                {
                    id:'createTime',
                    label: "创建时间",
                    dataIndex: "createTime",
                    defaultSortOrder: "descend",
                    width: 180,
                    seq:'4',
                    dataInfo:{
                        category:'datetime',
                    },
                    showInfo:{
                        category:'text',
                        disabled:true
                    }
                },
                {
                    id:'creator',
                    label: "创建人",
                    dataIndex: "creator",
                    defaultSortOrder: "descend",
                    width: 180,
                    seq:'3',
                    dataInfo:{
                        category:'string',
                    },
                    showInfo:{
                        category:'text',
                        disabled:true
                    }
                },
            ]
        }
    ]
}