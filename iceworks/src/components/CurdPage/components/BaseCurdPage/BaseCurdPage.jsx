import React, { Component } from 'react';
import Qs from 'qs';
import axios from 'axios';
import { Feedback } from '@icedesign/base';
import PropTypes from 'prop-types';
import './BaseCurdPage.scss';

export default class BaseCurdPage extends Component {
  static displayName = 'BaseCurdPage';

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
    };

    this.params = this._initParseUrlParams(this.props.location.search);

    this.defaultConfigBase = {
      title: "demo",
      urlApiPath: '',
      urlPagePath: '',
      urlApi: {
        list: '/search',
        create: '/',
      },
      urlPage: {
        urlList: '/list',
        urlDetail: '/detail',
        urlEdit: '/edit',
        urlCreate: '/create',
      }
    };
  }

  /**
   * 基本配置
   */
  configBase = () => {
    return {};
  }

  /**
   * 获取合并默认值后的基本配置
   */
  _configBase = () => {
    return Object.assign(this.defaultConfigBase, this.configBase());
  }

  _initParseUrlParams = (search) => {
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

  _getUrlParams = (key, defaultValue) => {
    return this.params[key] ? this.params[key] : defaultValue;
  }
  
  _apiGet = (url, params = [], call = (data) => {}, errorCall= (error) => {}) => {
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
          this._pageFeedbackError('接口返回异常: ' + response.data.message);
          return;
        }
        call(data);
      })
      .catch((error) => {
        console.log(error);
        this._pageFeedbackError('接口请求异常: ' + error);
        errorCall(error);
      });

  }

  _apiPost = (url, params = [], call = () => {}, errorCall = (error) => {}, method = 'post') => {
    console.log('_apiPost', {
      method: method,
      url: url,
      params: params,
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
          Feedback.toast.error('接口返回异常: ' + response.data.message);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        this._pageFeedbackError('接口请求异常: ' + error);
        errorCall(error);
      });
  }

  _apiPut = (url, params = [], call = () => {}, errorCall = (error) => {}) => {
    this._apiPost(url, params, call, errorCall, 'put');
  }

  _apiDelete = (url, params = [], call = () => {}, errorCall = (error) => {}) => {
    return this._apiPost(url, params, call, errorCall, 'delete');
  }


  _goPath = (path, search = '', state = {}) => {
    const { history } = this.props;
    history.push({
      pathname: path,
      search: search,
      state: state
    });
  }

  _goBack = () => {
    const { history } = this.props;
    history.goBack();
  }


  _pageFeedbackError = (msg) => {
    Feedback.toast.error(msg);
  }

  _pageFeedbackSuccess = (msg) => {
    Feedback.toast.success(msg);
  }

}
