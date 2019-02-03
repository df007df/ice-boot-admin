import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@icedesign/base';
import Tool from '../../../../components/Tool';
import FormBase from '../../../../components/FormBase';

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {
    dataSource: {},
    formBaseComponent: [],
    fetchData: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.FormBaseRef = null;
  }

  _formBaseComponentPostSave = (data) => {
    Tool.Page._pageFeedbackSuccess("更新成功！");
    this.setState({
      visible: false,
    });
    this.props.fetchData();
  }

  onOpen = (index, record) => {
    this.setState({
      visible: true,
    });
  };


  _addonOk = () => {
    this.FormBaseRef.validate();
  }

  _addonClose = () => {
    this.setState({
      visible: false,
    });
  };

  _onRefFormBase = (ref) => {
    this.FormBaseRef = ref;
  }

  render() {
    const { index, dataSource, formBaseComponent } = this.props;
    return (
      <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, dataSource)}
        >
          编辑
        </Button>
        
        <Dialog
          title="编辑"
          style={{ width: 640 }}
          visible={this.state.visible}
          closable="esc,mask,close"
          onOk={this._addonOk}
          onCancel={this._addonClose}
          onClose={this._addonClose}
        >

          <FormBase detailId={dataSource.id} onRef={this._onRefFormBase} {...formBaseComponent} postSave={this._formBaseComponentPostSave}/>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
