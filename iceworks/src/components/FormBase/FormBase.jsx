import React, { Component } from 'react';
import _ from 'lodash';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid, Select, DatePicker, TimePicker, NumberPicker } from '@icedesign/base';
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError,
} from '@icedesign/form-binder';
const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
// const { ImageUpload } = Upload;
import PropTypes from 'prop-types';
import './FormBase.scss';
import Tool from '../Tool';


export default class FormBase extends Component {
    static displayName = 'FormBase';

    static propTypes = {
    };

    static defaultProps = {
        urlApiPath: '',
        formType: 'create',
        detailId: 0,
        showBottomButton: true,
        configForm: () => { },

        onRef: (self) => { },
        preSave: (values) => { },
        postSave: (data) => { },

    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: {}
        };

    }


    _renderRows = () => {
        const configForm = this.props.configForm();
        console.log('_renderRows', configForm);

        return configForm.map((item, i) => {
            let renderRow;
            if (item.component === 'Input') {
                renderRow = this._renderInput(item);
            } else if (item.component === 'Number') {
                renderRow = this._renderNumber(item);
            } else if (item.component === 'Checkbox') {
                renderRow = this._renderCheckbox(item);
            } else if (item.component === 'Select') {
                renderRow = this._renderSelect(item);
            } else if (item.component === 'Date') {
                renderRow = this._renderDate(item);
            } else if (item.component === 'DatePicker') {
                renderRow = this._renderDatePicker(item);
            } else {
                renderRow = ("不支持的类型" + item.component);
            }
            return this._renderRowDiv(item.label, item.name, renderRow, i);
        });
    }

    _renderRowDiv = (label, name, renderRow, i) => {
        return (
            <Row className="formItem" key={i}>
                <Col xxs="6" s="3" l="3" className="label">
                    {label}：
            </Col>
                <Col s="12" l="10">
                    {renderRow}
                </Col>
                <IceFormError name={name} />
            </Row>
        )
    }

    _renderInput = (item) => {
        const { label, name, formBinderProps, componentProps } = item;
        return (
            <IceFormBinder name={name} whitespace={true} {...formBinderProps}>
                <Input
                    className="inputItem"
                    size="large"
                    {...componentProps}
                />
            </IceFormBinder>
        )
    }

    _renderNumber = (item) => {
        const { label, name, formBinderProps, componentProps } = item;

        return (
            <IceFormBinder name={name} whitespace={true}
                type='number' message="请输入正确的数字" {...formBinderProps}>

                <NumberPicker
                    min={1}
                    size="large"
                    {...componentProps}
                />
            </IceFormBinder>
        )
    }

    _renderSelect = (item) => {
        const { label, name, formBinderProps, componentProps } = item;

        const _setFieldValue = (value) => {
            return value;
        }

        const _getFieldValue = (value) => {
            return value;
        }

        return (
            <IceFormBinder name={name} whitespace={true} required="true" {...formBinderProps} setFieldValue={_setFieldValue} getFieldValue={_getFieldValue}>
                <Select size="large" {...componentProps} />
            </IceFormBinder>
        )
    }

    _renderDatePicker = (item) => {
        const { label, name, formBinderProps, componentProps } = item;

        const _setFieldValue = (time) => {
            return time;
        }

        const _getFieldValue = (time) => {
            console.log('_renderDate___getFieldValue', time);
            return time;
        }

        return (
            <IceFormBinder name={name} whitespace={true} required="true" {...formBinderProps}
                setFieldValue={_setFieldValue} getFieldValue={_getFieldValue}>
                <DatePicker
                    size="large"
                    {...componentProps}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                />
            </IceFormBinder>
        )
    }

    _renderDate = (item) => {
        const { label, name, formBinderProps, componentProps } = item;

        const _setFieldValue = (time) => {
            return getDate(time);
        }

        const _getFieldValue = (time) => {
            return time;
        }

        return (
            <IceFormBinder name={name} {...formBinderProps} setFieldValue={_setFieldValue} getFieldValue={_getFieldValue}
                {...formBinderProps} >
                <Input
                    size="large"
                    readOnly={true}
                    {...componentProps}
                />
            </IceFormBinder>
        )
    }

    _renderRadio = () => {

    }

    _renderCheckbox = () => {

    }

    _renderSwitch = () => {

    }

    validate = () => {
        this._validateAllFormField();
    }

    _validateAllFormField = () => {
        const configForm = this.props.configForm();
        let DateFields = configForm.filter((item) => {
            if (item.component == 'Date') {
                return true;
            } else {
                return false;
            }
        }).map((item) => {
            return item.name;
        });

        DateFields.push('gmtModified');
        this.refs.form.validateAll((errors, values) => {
            //过滤掉 renderDate
            let cloned = _.omit(values, DateFields);
            console.log('errors', errors, 'values', cloned);
            if (!errors) {
                if (this.props.preSave) {
                    cloned = this.props.preSave(cloned);
                }
                if (cloned) {
                    this._saveData(cloned);
                } else {
                    console.log('_saveData is empty');
                }
            }
        });
    };

    /**
     * 保持提交接口
     */
    _saveData = (data) => {

        let url = '';
        if (this.props.detailId > 0) {
            url = this.props.urlApiPath + "/" + this.props.detailId;

            Tool.Api._apiPut(url, data, (data) => {
                this.setState({
                    dataSource: data
                });

                if (this.props.postSave) {
                    this.props.postSave(data);
                } else {
                    Tool.Page._pageFeedbackSuccess("更新成功！");
                }
            })

        } else {
            url = this.props.urlApiPath + "/";
            Tool.Api._apiPost(url, data, (data) => {
                this.setState({
                    dataSource: data
                });

                if (this.props.postSave) {
                    this.props.postSave(data);
                } else {
                    Tool.Page._pageFeedbackSuccess("新建成功！");
                }
            })
        }
    }

    _fetchData = () => {
        const url = this.props.urlApiPath + "/" + this.props.detailId;
        Tool.Api._apiGet(url, {}, (data) => {
            this.setState({
                dataSource: data
            });
        });
    }

    _renderButton = () => {
        if (!this.props.showBottomButton) {
            return;
        }
        return (
            <Row style={{ marginTop: 20 }}>
                <Col offset="3">
                    <Button
                        size="large"
                        type="primary"
                        style={{ width: 100, marginRight: '10px' }}
                        onClick={this._validateAllFormField}
                    >
                        更 新
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
        const configForm = this.props.configForm();
        let defaultValues = {};

        configForm.map((item) => {
            const { name, componentProps } = item;
            defaultValues[name] = componentProps.defaultValue;
        });
        console.log('_parseDefaultValueToDataSource', defaultValues);
        this.setState({
            dataSource: defaultValues
        });
    }

    componentWillMount() {
        this._parseDefaultValueToDataSource();
    }

    componentDidMount = () => {
        this.props.onRef(this)

        if (this.props.detailId) {
            this._fetchData();
        }
    }

    render() {
        const { dataSource } = this.state;
        return (
            <div>
                <IceContainer>
                    <IceFormBinderWrapper value={dataSource} ref="form">
                        <div className="savePage" style={styles.formContent}>
                            {this._renderRows()}
                        </div>
                    </IceFormBinderWrapper>
                    {this._renderButton()}
                </IceContainer>

            </div>
        );
    }
}


function add0(m) { return m < 10 ? '0' + m : m };
function getDate(shijianchuo) {
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

const styles = {
    formContent: {
        width: '100%',
        position: 'relative',
    },

    formTitle: {
        margin: '0 0 20px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
        color: '#333',
    }
};