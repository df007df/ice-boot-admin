import CreatePage from '../../../../components/CurdPage/SavePage/CreatePage';

export default class Page extends CreatePage {

    constructor(props) {
        super(props);
    }

    configBase = () => {
        return {
            title: "用户",
            urlApiPath: 'http://localhost.aliyun.com:8080/admin/api/demoUser/curd',
            urlPagePath: '/system/user',
        }
    }


    configForm = () => {

        return [
            {
                label: '姓名',
                name: 'name',
                operator: 'like',
                component: 'Input',
                componentProps: {
                    placeholder: '请输入查询姓名',
                    size: 'large',
                },
                formBinderProps: {
                    required: true,
                    message: '请输入正确的姓名',
                },
            },
            {
                label: '年龄',
                name: 'age',
                operator: '>',
                component: 'Number',
                componentProps: {
                    defaultValue: 1,
                    placeholder: '请输入查询年龄',
                    size: 'large',
                    max: 120
                },
                formBinderProps: {
                    required: true,
                    message: '请输入正确的年龄',
                },
            },
         

            {
                label: '通过',
                name: 'isPass',
                component: 'Select',
                componentProps: {
                    defaultValue: false,
                    placeholder: '请选择',
                    size: 'large',
                    dataSource: [
                        { label: '通过', value: true },
                        { label: '不通过', value: false },
                    ],
                },
                formBinderProps: {
                    type: 'boolean',
                },
            }
        
        ];
    }

}