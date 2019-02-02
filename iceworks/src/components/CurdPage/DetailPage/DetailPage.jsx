import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import DetailTable from './components/DetailTable';
import { Button } from '@icedesign/base';
import Qs from 'qs';
import PropTypes from 'prop-types';
import './DetailPage.scss';
import BaseCurdPage from '../components/BaseCurdPage';

export default class DetailPage extends BaseCurdPage {
  static displayName = 'DetailPage';

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const params = this._parseUrlParams(this.props.location.search);

    this.state = {
      detailId: params.id,
      dataSource: {}
    };

  }

  /**
   * 表单显示字段配置
   */
  configForm = () => {
    return [];
  }

  renderRow = (row, i) => {

    if (typeof (row.value) == "boolean") {
      row.value = row.value ? '是' : '否';
    }
    return (
      <li className="detailItem" key={i}>
        <div className="detailTitle">{row.label}：</div>
        <div className="detailBody">{row.value}</div>
      </li>
    )
  }


  _fetchData = () => {
    const { urlApiPath } = this._configBase();
    const url = urlApiPath + "/" + this.state.detailId;
    this._apiGet(url, {}, (data) => {
        this.setState({
          dataSource: data,
        })
    });
  }

  _parseUrlParams = (search) => {
    let arr = "";
    if (search.indexOf('?') == 0) {
      arr = search.split("?")[1];
    } else {
      arr = search;
    }
    let params = Qs.parse(arr);
    console.log("_parseUrlParams", params)
    return params;
  }

  _handleEdit = (e) => {
    const detailId = e.target.value;
    const { history } = this.props;
    const {urlPagePath, urlPage } = this._configBase();
    history.push({
      pathname: urlPagePath + urlPage.urlEdit,
      search: '?id=' + detailId,
      state: { detailId: detailId}
    });
  }

  _handleReturn = () => {
    this._goBack();
  }

  componentDidMount() {
    this._fetchData();
  }

  render() {
    const { title} = this._configBase();
    const { dataSource } = this.state;

    return (
      <IceContainer title={title + this.state.detailId}>
        <div className="portlets-page">
          <DetailTable dataSource={dataSource} configForm={this.configForm()} renderRow={this.renderRow} />
        </div>

        <div className="detailSubmit">
          <Button
            size="large"
            type="primary"
            value={dataSource.id}
            style={{ marginRight: '10px' }}
            onClick={this._handleEdit}
          >
            编 辑
          </Button>

          <Button size="large" type="normal" onClick={this._handleReturn}>
            返 回
          </Button>
        </div>
      </IceContainer>

    );
  }
}
