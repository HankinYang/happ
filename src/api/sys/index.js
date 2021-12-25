import http from '../http'


export function Result(data) {
    return new Promise(Resolver => {
        setTimeout(() => {
            return Resolver({
                isSuccess: true,
                errMsg: 'success',
                data: data
            });
        }, 300)

    })
}


export function getLanguages(params) {
    return Result([
        { id: 1, name: 'zh-cn', title: '简体中文' },
        { id: 2, name: 'zh-tw', title: '繁体中文' },
        { id: 3, name: 'en', title: 'English' },
        { id: 4, name: 'vn', title: '越南语' },
    ])
}

/**
 * 获取头部导航菜单
 * @param {*} params 
 * @returns 
 */
export function getHeaderNav(params) {
    // return http.getHeaderButtons('',{params})

    return Result([
       
        {
            id: 2,
            key: 2,
            name: 'set',
            title: '系统管理',
            ico: "icon-h-set1",
        },
        {
            id: 1,
            key: 1,
            name: '',
            title: '应用',
            ico: "icon-h-all",
        },
        // {
        //     id: 3,
        //     key: 3,
        //     name: 'set',
        //     title: 'app管理',
        //     ico: "icon-h-all",
        // }
    ])
}

/**
 * 获取用户信息
 * @param {*} params 
 * @returns 
 */
export function getUserInfo(params) {
    return Result({//用户信息
        name: 'Hankin Yang',
        avatarCategory: 'str',
        avatar: 'H.Y',
        dept: '资讯中心',
        title: '工程师',
    })
}

/**
 * 获取左边导航菜单
 * @param {*} params 
 * @returns 
 */
export function getNavMenu(params) {
    // console.log('getNavMenu->' + params)
    var navs = {
        1: [
            { id: 1, key: 1, 'title': '首页', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
        ],
        2: [
            {
                id: 1, key: 1, 'title': '系统设置', 'url': 'http://192.168.1.100:9999', ico: "icon-h-set1",
                children: [
                    { id: 14, key: 14, 'title': '多语言', categroy: 'page', 'page': 'happ/list',params:{id:'1',name:'language'}, ico: "icon-h-all", },
                    { id: 13, key: 13, 'title': '数据字典', categroy: 'page', 'page': 'happ/list',params:{id:'2',name:'dataDict'}, ico: "icon-h-template-fill", },
                    { id: 12, key: 12, 'title': '系统参数', categroy: 'page', 'page': 'happ/list',params:{id:'3',name:'sysParams'}, ico: "icon-h-conditions", },
                    { id: 11, key: 11, 'title': '系统菜单', categroy: 'page', 'page': 'happ/list',params:{id:'4',name:'sysMenu'}, ico: "icon-h-writing", },
                ]
            },
            {
                id: 2, key: 2, 'title': '应用管理', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all",
                children: [
                    { id: 22, key: 22, 'title': '应用列表', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                    { id: 23, key: 23, 'title': '字段类型', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                    { id: 24, key: 24, 'title': '用户设置', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                ]
            },
        ],
        3: [
            {
                id: 1, key: 1, 'title': '系统设置', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all",
                children: [
                    { id: 2, key: 2, 'title': '系统参数', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                    { id: 3, key: 3, 'title': '数据字典', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                    { id: 4, key: 4, 'title': '用户设置', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                ]
            },
        ],
    }
    return Result(navs[params]);
    // return Result([
    //     {
    //         id: 1,
    //         key: 1,
    //         'title': '首页',
    //         'url': 'http://192.168.1.100:9999',
    //         ico: "icon-h-all",
    //         // 'children': []
    //     },
    //     {
    //         id: 2,
    //         key: 2,
    //         'title': '企业信息',
    //         'url': null,
    //         ico: "icon-h-all",
    //         'children': [
    //             {
    //                 id: 21,
    //                 key: 21,
    //                 'title': '公司管理',
    //                 'url': 'http://192.168.1.100:8890//swagger-ui.html',
    //                 ico: "icon-h-all",
    //                 'children': []
    //             }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         key: 3,
    //         'title': '工程管理',
    //         'url': 'http://192.168.1.100:9999/about',
    //         ico: "icon-h-all",
    //         // 'children': []
    //     }
    // ])
}

/**
 * 获取app的操作菜单
 * @param {
 *  appId:1,
 *  
 * } params 
 * @returns 
 */
export function getAppOperatorMenu(params) {
    return Result([
        { id: 23, key: 23, 'title': '查询', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
        {
            id: 1, key: 1, 'title': '保存', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all",
            children: [
                { id: 11, key: 11, 'title': '保存', categroy: 'page', 'page': 'sets/system/menu', ico: "icon-h-all", },
                { id: 12, key: 12, 'title': '暂存', categroy: 'page', 'page': 'sets/system/pars', ico: "icon-h-all", },
            ]
        },
        {
            id: 2, key: 2, 'title': '提交', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all",
            children: [
                { id: 22, key: 22, 'title': '提交', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                { id: 24, key: 24, 'title': '撤回', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
            ]
        },
        {
            id: 2, key: 2, 'title': '审核', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all",
            children: [
                { id: 22, key: 22, 'title': '审核', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                { id: 24, key: 24, 'title': '反审核', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
            ]
        },
        {
            id: 2, key: 2, 'title': '作废', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all",
            children: [
                { id: 22, key: 22, 'title': '作废', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
                { id: 24, key: 24, 'title': '反作废', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
            ]
        },
    ])
}

/**
 * 获取app的查询字段信息
 * @param {
 *  appId:1
 * } params 
 * @returns 
 */
export function getAppSearchFields(params) {
    return Result(
        [
            {
                name: "app1",
                label: "app1",
                fields: [
                    {
                        name: "field2",
                        label: "姓名",
                        valCategory: "string",
                        fieldCategory: "",
                    },
                    {
                        name: "field1",
                        label: "年龄",
                        valCategory: "int",
                        fieldCategory: "InputNumber",
                    },
                    {
                        name: "field3",
                        label: "生日",
                        valCategory: "date",
                        fieldCategory: "DatePicker",
                    },
                    {
                        name: "field4",
                        label: "学历",
                        valCategory: "string",
                        fieldCategory: "select",
                        extend: {
                            list: [
                                { label: "大学", value: "4" },
                                { label: "大学", value: "3" },
                                { label: "大学", value: "2" },
                                { label: "大学", value: "1" },
                            ],
                        },
                    },
                    {
                        name: "field5",
                        label: "性别",
                        valCategory: "bool",
                        fieldCategory: "radio",
                        extend: {
                            list: [
                                { value: 1, label: "男" },
                                { value: 0, label: "女" },
                            ],
                        },
                    },
                    // {
                    //   name: "field6",
                    //   label: "是否成年",
                    //   valCategory: "bool",
                    //   fieldCategory: "checkbox",
                    //   extend: {
                    //     list: [{ value: 0, label: "是" }],
                    //   },
                    // },
                ],
            },
        ]
    )
}

/**
 * 获取查询列表的头部操作菜单
 * @param {
 *  appId:1
 * } params 
 */
export function getListOperators(params) {
    return Result([
        { id: 6, key: 6, 'title': '新增',  ico: "icon-h-add-select",  action:{
            name:'add', category:'openTab','url': '/action/add','title': '新增', 
        } },
        { id: 7, key: 7, 'title': '编辑',  ico: "icon-h-editor",  action:{
            name:'edit', category:'openTab','url': '/action/edit','title': '编辑', 
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
    ])
}

/**
 * 获取列表查询的保存方案
 * @param {
 *  appId:1
 * } params 
 * @returns 
 */
export function getListFilterCases(params) {
    return Result([
        {
            category: 'default', label: '默认方案', config: {
                conditions: []
            }
        },
        {
            category: 'public', label: '公共方案1', config: {
                conditions: []
            }
        },
        {
            category: 'user', label: '用户自定义方案', config: {
                conditions: []
            }
        },
    ])
}

/**
 * 获取列表页的表的列信息
 * @param {
 *  appId:1
 * } params 
 * @returns 
 */
export function getListColumns(params) {
    // console.log(params)
    return Result([
        {
            title: "姓名",
            dataIndex: "name",
            resizable: true,
            width: 150,
            filters: [
                {
                    text: "Joe",
                    value: "Joe",
                },
                {
                    text: "Jim",
                    value: "Jim",
                },
                {
                    text: "Submenu",
                    value: "Submenu",
                    children: [
                        {
                            text: "Green",
                            value: "Green",
                        },
                        {
                            text: "Black",
                            value: "Black",
                        },
                    ],
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend"],
        },
        {
            title: "年龄",
            dataIndex: "age",
            defaultSortOrder: "descend",
            resizable: true,
            width: 150,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "地址",
            dataIndex: "address",
            resizable: true,
            width: 150,
            filters: [
                {
                    text: "London",
                    value: "London",
                },
                {
                    text: "New York",
                    value: "New York",
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "年龄",
            dataIndex: "age",
            defaultSortOrder: "descend",
            resizable: true,
            width: 150,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "年龄",
            dataIndex: "age",
            defaultSortOrder: "descend",
            resizable: true,
            width: 150,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "年龄",
            dataIndex: "age",
            defaultSortOrder: "descend",
            resizable: true,
            width: 150,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "年龄",
            dataIndex: "age",
            defaultSortOrder: "descend",
            resizable: true,
            width: 150,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "年龄",
            dataIndex: "age",
            defaultSortOrder: "descend",
            resizable: true,
            width: 150,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "年龄",
            dataIndex: "age",
            defaultSortOrder: "descend",
            resizable: true,
            width: 150,
            sorter: (a, b) => a.age - b.age,
        },
    ]
    )
}

/**
 * 模拟表格的数据接口
 * @param {
 *  appId:1
 * } params 
 * @returns 
 */
export function getListEgData(params) {
    return Result({
        page: {
            cur: params.page.cur,
            size: params.page.size,
            total: 50,
        },
        list: [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '4',
                name: 'Jim Red',
                age: 32,
                address: 'London No. 2 Lake Park',
            },
            
        ]
    })
}



/**
 * 获取查询列表的头部操作菜单
 * @param {
 *  appId:1
 * } params 
 */
export function getAppOperators(params) {
    return Result([
        { id: 6, key: 6, 'title': '复制',  ico: "icon-h-add-select",  action:{
            name:'add', category:'openTab','url': '/action/add','title': '复制',
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
    ])
}