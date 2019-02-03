import React, { Component } from 'react';
import Qs from 'qs';
import axios from 'axios';
import { Feedback } from '@icedesign/base';


const Tool = {
    Api: {},
    Page: {},
    Date: {}
};

Tool.Api._apiGet = (url, params = [], call = (data) => { }, errorCall = (error) => { }) => {
    console.log('_apiGet', {
        url: url,
        params: params,
    });

    axios.get(url, {
        params: params,
        paramsSerializer: function (params) {
            return Qs.stringify(params, { arrayFormat: 'brackets' })
        },
    })
        .then((response) => {
            let data = {};
            console.log("_apiParseResponseToState", response);
            if (response.data.success === true) {
                data = response.data.data;
            } else {
                Tool.Page._error('接口返回异常: ' + response.data.message);
                return;
            }
            call(data);
        })
        .catch((error) => {
            console.log(error);
            Tool.Page._error('接口请求异常: ' + error);
            errorCall(error);
        });

}

Tool.Api._apiPost = (url, params = {}, call = () => { }, errorCall = (error) => { }, method = 'post') => {
    console.log('_apiPost', {
        method: method,
        url: url,
        data: params,
    });

    return axios({
        url: url,
        method: method,
        data: params
    })
        .then((response) => {
            let data = {};
            console.log("_apiPost", response);
            if (response.data.success === true) {
                data = response.data.data;
                call(data);
            } else {
                Tool.Page._error('接口返回异常: ' + response.data.message);
                return;
            }
        })
        .catch((error) => {
            console.log(error);
            Tool.Page._error('接口请求异常: ' + error);
            errorCall(error);
        });
}

Tool.Api._apiPut = (url, params = [], call = () => { }, errorCall = (error) => { }) => {
    Tool.Api._apiPost(url, params, call, errorCall, 'put');
}

Tool.Api._apiDelete = (url, params = [], call = () => { }, errorCall = (error) => { }) => {
    return Tool.Api._apiPost(url, params, call, errorCall, 'delete');
}


Tool.Page._initParseUrlParams = (search) => {
    let arr = "";
    if (search.indexOf('?') == 0) {
        arr = search.split("?")[1];
    } else {
        arr = search;
    }
    let params = Qs.parse(arr);
    console.log("_initParseUrlParams", params)
    return params;
}

Tool.Page._getUrlParams = (key, defaultValue) => {
    return this.params[key] ? this.params[key] : defaultValue;
}

Tool.Page._goPath = (path, search = '', state = {}) => {
    const { history } = this.props;
    history.push({
        pathname: path,
        search: search,
        state: state
    });
}


Tool.Page._goBack = () => {
    const { history } = this.props;
    history.goBack();
}

Tool.Page._error = (msg) => {
    Feedback.toast.error(msg);
}


Tool.Page._pageFeedbackError = (msg) => {
    Feedback.toast.error(msg);
}

Tool.Page._pageFeedbackSuccess = (msg) => {
    Feedback.toast.success(msg);
}


Tool.Date._getDate = (shijianchuo) => {
    function add0(m) { return m < 10 ? '0' + m : m };

    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
};

export default Tool;