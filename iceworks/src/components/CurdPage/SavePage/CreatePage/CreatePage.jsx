import React, { Component } from 'react';
import SavePage from '../components/SavePage';
import { Button, Grid } from '@icedesign/base';
const { Row, Col } = Grid;
import './CreatePage.scss';

export default class CreatePage extends SavePage {
  static displayName = 'CreatePage';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {}
    };
  }

  configForm = () => {
    return [];
  }


  componentWillMount() {
    this._parseDefaultValueToDataSource();
  }

  /**
   * 保持提交接口
   */
  _saveData = (data) => {
    const { urlApiPath, urlApi, urlPagePath, urlPage } = this._configBase();
    let url = urlApiPath + urlApi.create;
    this._apiPost(url, data, (data) => {

      this.setState({
        dataSource: data
      });
      this._pageFeedbackSuccess("新增成功！");
      this._goPath(urlPagePath + urlPage.urlList);
    });
  }

  _renderButton = () => {
    return (
      <Row style={{ marginTop: 20 }}>
        <Col offset="3">
          <Button
            size="large"
            type="primary"
            style={{ width: 100, marginRight: '10px' }}
            onClick={this._validateAllFormField}
          >
            新 增
            </Button>

          <Button size="large" type="normal" onClick={this._goBack}>
            返 回
             </Button>
        </Col>
      </Row>
    );
  }

  /**
   * 转换默认值到 dataSource
   */
  _parseDefaultValueToDataSource = () => {
    const configForm = this.configForm();
    let defaultValues = {};

    console.log('createPage => configForm', configForm);

    configForm.map((item) => {
      const { name, componentProps } = item;
      defaultValues[name] = componentProps.defaultValue;
    });
    console.log('_parseDefaultValueToDataSource', defaultValues);
    this.setState({
      dataSource: defaultValues
    });
  }
}