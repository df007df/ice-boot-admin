import React, { Component } from 'react';
import { Grid, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import SearchFilter from './components/SearchFilter';
import { Dialog } from '@alifd/next';
import { Link } from 'react-router-dom';
import BaseCurdPage from '../components/BaseCurdPage';
import './ListPage.scss';

const { Row, Col } = Grid;

export default class ListPage extends BaseCurdPage {
  static displayName = 'ListPage';

  static propTypes = {
  };

  static defaultProps = {
    page: 1,
    pageSize: 5,
    pageShowCount: 5,
    sort: {
      key: 'id',
      type: 'desc'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: false,
      pagination: {
        page: this.props.page,
        pageSize: this.props.pageSize,
        total: 0,
      },
    };

    this.page = this.props.page;
    this.condition = [];
    this.sort = this.props.sort;

  }


  /**
   * 列表渲染配置信息
   */
  configColumns = () => {
    return []
  }

  /**
   * 处理用户列配置信息
   */
  _configColumns = () => {
    let columns = this.configColumns();
    columns.push(
      {
        title: '操作',
        align: 'right',
        key: 'detail',
        cell: this.renderOper,
        width: 80,
      }
    );
    return columns;
  }

  /**
   * 列表搜索表单配置
   */
  configFilterForm = () => {
    return [];
  }

  renderOper = (value, index, record) => {

    const { urlPagePath, urlPage } = this._configBase();

    return (
      <div>

        {/* <Link
          style={styles.link}
          to={{
            pathname: urlPagePath + urlPage.urlEdit,
            search: `?id=${record.id}`,
            hash: '',
            state: { detailId: record.id },
          }}
        >修改</Link>

        <span style={styles.separator} /> */}

        <Link
          style={styles.link}
          to={{
            pathname: urlPagePath + urlPage.urlDetail,
            search: `?id=${record.id}`,
            hash: '',
            state: { detailId: record.id },
          }}
        >详情</Link>

        <span style={styles.separator} />

        <a
          style={styles.link}
          onClick={this._deleteData.bind(this, record.id)}
        >删除</a>

      </div>

    );
  };

  /**
   * 操作列 配置信息
   */
  configRenderOper = (value, index, record) => {
    // console.log(value, index, record);
    // console.log(typeof(value));
    if (typeof (value) == "boolean") {
      return value ? 1 : 0;
    }
    return value;
  }

  _onSort = (key, type) => {
    console.log("sort_key", key);
    console.log("sort_type", type);
    this.sort = {
      key,
      type
    };
    this._fetchData(this.condition)
  }

  _handleReset = () => {
    this.sort = this.props.sort;
    this._fetchData([])
  }

  _fetchData = (formParams = []) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        let url = this._configBase().urlApiPath + this._configBase().urlApi.list;

        this._apiGet(url, this._apiCreateUrlParams(formParams), (data) => {
          const { list, pageNum, pageSize, pageTotal } = data;

          this.setState({
            dataSource: list,
            isLoading: false,
            pagination: {
              page: pageNum,
              pageSize: pageSize,
              total: pageTotal,
            },
          })

        }, (error) => {
          this.setState({
            dataSource: [],
            isLoading: false
          })
        })
      }
    );
  };

  _deleteData = (detailId) => {
    const { urlApiPath, urlPagePath, urlPage } = this._configBase();
    const url = urlApiPath + "/" + detailId;
    console.log('_deleteData', url);

    Dialog.confirm({
      title: '删除',
      content: '是否确定删除此条数据',
      onOk: () => {
        // return new Promise(resolve => {
        //   setTimeout(resolve, 2000);
        // }).then(() => {
        //   Message.success('Deleted successfully!');
        // });
        return this._apiDelete(url, null, (data) => {
          this._pageFeedbackSuccess("删除成功！");
          this._handleReset();
        });
      }
    });

  }

  _handlePagination = (current) => {
    this.page = current;
    this.setState((prevState, props) => ({
      // pagination: {
      //   page: current,
      //   pageSize: prevState.pagination.pageSize,
      //   total: prevState.pagination.total
      // }
    }),
      () => {
        this._fetchData(this.condition);
      }
    );
  };

  _apiCreateUrlParams = (formParams) => {
    const { pagination } = this.state;
    this.condition = formParams;
    return {
      pageNum: this.page,
      pageSize: pagination.pageSize,
      condition: formParams,
      orderKey: this.sort.key,
      orderType: this.sort.type
    };
  }

  componentDidMount() {
    this._fetchData([])
  }

  render() {
    const { isLoading, dataSource, pagination } = this.state;
    const { title } = this._configBase();

    return (
      <Row gutter={24} wrap>
        <Col l="24">
          <IceContainer title={title}>
            {/* <ContainerTitle title="合同中心" /> */}
            <div style={{ padding: '20px' }}>
              <SearchFilter fetchData={this._fetchData} configFormFileds={this.configFilterForm} handleReset={this._handleReset} />
              <CustomTable
                isLoading={isLoading}
                dataSource={dataSource}
                fetchData={this._fetchData}
                onSort={this._onSort}
                columns={this._configColumns()}
                renderOper={this.configRenderOper}
              />
              <span>{`共 ${pagination.total} 项`}</span>
              <Pagination
                type="normal"
                style={styles.pagination}
                total={pagination.total}
                current={pagination.page}
                pageSize={pagination.pageSize}
                pageShowCount={this.props.pageShowCount}
                onChange={this._handlePagination}
              />
            </div>
          </IceContainer>
        </Col>
        {/* <Col l="6">
          <SearchHistory fetchData={this.fetchData} />
        </Col> */}
      </Row>
    );
  }
}

const styles = {
  pagination: {
    display: 'inline-block',
    margin: '20px 0',
    textAlign: 'right',
  },

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
    margin: '0 4px',
    display: 'inline-block',
    height: '12px',
    width: '1px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
};
