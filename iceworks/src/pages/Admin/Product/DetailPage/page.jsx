import React, { Component } from 'react';
import DetailPage from '../../../../components/CurdPage/DetailPage';
import { withRouter } from 'react-router-dom';

@withRouter
export default class Page extends DetailPage {

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
            },
            {
                label: '年龄',
                name: 'age',
            },
            {
                label: '创建时间',
                name: 'gmtCreate',

            },

            {
                label: '是否通过',
                name: 'isPass',
            },
        ];
    }

    handleHistoryPush = () => {
        const { history } = this.props;
        history.push('/new-path');
    };

    render() {
        return super.render();

        const { location } = this.props;
        return (
            <div>
                <div>当前路径： {location.pathname}</div>
                <button onClick={this.handleHistoryPush}>点击跳转新页面</button>
            </div>
        );
    }
}