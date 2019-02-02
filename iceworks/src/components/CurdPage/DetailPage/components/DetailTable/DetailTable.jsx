import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import PropTypes from 'prop-types';
import './DetailTable.scss';

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {
    dataSource: PropTypes.object.isRequired,
    configForm: PropTypes.array.isRequired,
  };

  static defaultProps = {
    dataSource: {},
    configForm: [],
    renderRow: (row) => {
      return (
        <li className="detailItem">
          <div className="detailTitle">{row.label}：</div>
          <div className="detailBody">{row.value}</div>
        </li>
      );
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { dataSource, configForm, renderRow } = this.props;
    let rows = [];

    if (Object.keys(dataSource).length != 0) {
      console.log('dataSource', dataSource);
      configForm.forEach((item) => {
        rows.push({
          label: item.label,
          name: item.name,
          value: dataSource[item.name],
        });
      })
    }

    console.log('rows', rows)
    return (
      <div className="detail-table">
        <IceContainer title={this.state.id}>
          <ul style={styles.detailTable}>

            {rows.map((row, i) => {
              console.log('rows.forEach', row)
              return renderRow(row, i)
            })}

            {/* <li className="detailItem" >
              <div className="detailTitle">收货地址：</div>
              <div classname="detailBody">
                浙江省杭州市余杭区文一西路969号淘宝城
              </div>
            </li> */}
          </ul>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
  },
  statusProcessing: {
    color: '#64D874',
  },
};
