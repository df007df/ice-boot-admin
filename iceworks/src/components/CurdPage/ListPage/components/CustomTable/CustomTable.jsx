import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import PropTypes from 'prop-types';
import './CustomTable.scss';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static defaultProps = {
    columns: [],
    dataSource: [],
  };

  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    renderOper: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  componentDidMount() {
    // 拉取第一页的数据
    //this.props.fetchData();
  }

  render() {
    const { dataSource, columns, renderOper, style = {}, isLoading = false } = this.props;

    return (
      <div style={style}>
        <Table
          onSort={this.props.onSort}
          isLoading={isLoading}
          dataSource={dataSource}
          hasBorder={false}
          className="custom-table"
          style={{ minHeight: '500px' }}
        >
          {columns.map((item) => {
            return (
              <Table.Column
                title={item.title}
                dataIndex={item.dataIndex}
                key={item.key}
                sortable={item.sortable || false}
                cell={item.cell || renderOper}
                width={item.width || 'auto'}
              />
            );
          })}
        </Table>

      </div>
    );
  }
}