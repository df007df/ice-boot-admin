import React, { Component } from 'react';
import ListPage from '../../../../components/CurdPage/ListPage';
import { Link } from 'react-router-dom';

export default class Page extends ListPage {

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

    configColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                sortable: true,
            },
            {
                title: '名词',
                dataIndex: 'name',
                key: 'name',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 160,
                sortable: true,
            },
            {
                title: '是否通过',
                dataIndex: 'isPass',
                key: 'isPass',
                width: 160,

            },
            {
                title: '创建时间',
                dataIndex: 'gmtCreate',
                key: 'gmtCreate',
                width: 100,
            }

        ];
    };

    configFilterForm = () => {

        return [
            {
                label: '姓名',
                name: 'name',
                operator: 'like',
                component: 'Input',
                componentProps: {
                    defaultValue: "",
                    placeholder: '请输入查询姓名',
                    size: 'large',
                },
                formBinderProps: {
                    name: 'name',
                    required: false,
                    message: '请输入正确的姓名',
                },
            },
            {
                label: '年龄',
                name: 'age',
                operator: '>',
                component: 'Input',
                componentProps: {
                    defaultValue: null,
                    placeholder: '请输入查询年龄',
                    size: 'large',
                },
                formBinderProps: {
                    name: 'age',
                    required: false,
                    message: '请输入正确的年龄',
                },
            },
            {
                label: '创建时间',
                name: 'ctime',
                component: 'RangePicker',
                componentProps: {
                    placeholder: '请选择日期',
                    size: 'large',
                    defaultValue: [],
                },
                formBinderProps: {
                    name: 'ctime',
                },
            },

            {
                label: '是否通过',
                name: 'isPass',
                component: 'Select',
                componentProps: {
                    defaultValue: "-1",
                    placeholder: '请选择',
                    size: 'large',
                    dataSource: [
                        { label: '请选择', value: "-1" },
                        { label: '通过', value: "1" },
                        { label: '不通过', value: "0" },
                    ],
                },
                formBinderProps: {
                    name: 'isPass',
                },
            },
            // {
            //     label: '查询我批准的合同',
            //     name: 'checkbox',
            //     advancedSearch: true,
            //     component: 'Checkbox',
            //     componentProps: {
            //         defaultValue: true,
            //     },
            //     formBinderProps: {
            //         name: 'checkbox',
            //     },
            // },
        ];
    }

}

const styles = {
    stateText: {
        display: 'inline-block',
        padding: '5px 10px',
        color: '#52c41a',
        background: '#f6ffed',
        border: '1px solid #b7eb8f',
        borderRadius: '4px',
    },
    link: {
        margin: '0 5px',
        color: 'rgba(49, 128, 253, 0.65)',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    separator: {
        margin: '0 8px',
        display: 'inline-block',
        height: '12px',
        width: '1px',
        verticalAlign: 'middle',
        background: '#e8e8e8',
    },
};