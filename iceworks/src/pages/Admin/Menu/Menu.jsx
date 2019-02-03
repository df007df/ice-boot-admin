import React, { Component } from 'react';
import Qs from 'qs';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Button, Dialog } from '@alifd/next';
const { Row, Col } = Grid;
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Tool from '../../../components/Tool';
import FormBase from '../../../components/FormBase';

import MenuTree from './components/MenuTree';
import DeleteBalloon from './components/DeleteBalloon';
import EditDialog from './components/EditDialog';

import './Menu.scss';

export default class Menu extends Component {
    static displayName = 'MenuPage';

    static propTypes = {
    };

    static defaultProps = {
        urlApiPath: 'http://localhost.aliyun.com:8080/admin/api/menu',
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            addDialogVisible: false,
            selectedNodeId: 0
        };

        this.FormBaseRef = null;
        this.selectedNodeId = 0;

        this.FormBaseComponent = {
            urlApiPath: 'http://localhost.aliyun.com:8080/admin/api/menu',
            formType: 'create',
            showBottomButton: false,
            preSave: this._formBaseComponentPreSave,
            postSave: this._formBaseComponentPostSave,
            configForm: () => {
                return [
                    {
                        label: '名称',
                        name: 'name',
                        component: 'Input',
                        componentProps: {
                            placeholder: '请输入查询姓名',
                            size: 'large',
                        },
                        formBinderProps: {
                            required: true,
                            message: '请输入正确的姓名',
                        },
                    },
                    {
                        label: '标号',
                        name: 'code',
                        component: 'Input',
                        componentProps: {
                            defaultValue: '',
                            placeholder: '全局唯一标号',
                            size: 'large',
                        },
                        formBinderProps: {
                            required: true,
                            message: '请输入正确的编号',
                        },
                    },


                    {
                        label: '类型',
                        name: 'type',
                        component: 'Select',
                        componentProps: {
                            defaultValue: 'folder',
                            placeholder: '请选择',
                            size: 'large',
                            dataSource: [
                                { label: '文件夹', value: 'folder' },
                                { label: '前端组件', value: 'module' },

                            ],
                        },
                        formBinderProps: {
                            required: true,
                        },
                    },
                    {
                        label: '是否权限控制',
                        name: 'isControlled',
                        component: 'Select',
                        componentProps: {
                            defaultValue: false,
                            placeholder: '请选择',
                            size: 'large',
                            dataSource: [
                                { label: '是', value: true },
                                { label: '否', value: false },
                            ],
                        },
                        formBinderProps: {
                            required: true,
                            type: 'boolean',
                        },
                    },

                    {
                        label: '访问地址',
                        name: 'path',
                        component: 'Input',
                        componentProps: {
                            defaultValue: '',
                            placeholder: '访问地址',
                            size: 'large',
                        },
                        formBinderProps: {
                            required: true,
                        },
                    },

                    {
                        label: '父ID',
                        name: 'parentId',
                        component: 'Input',
                        componentProps: {
                            defaultValue: this.selectedNodeId,
                            size: 'large',
                        },
                        formBinderProps: {
                            required: true,
                            type: 'number',
                            transform: (value) => {
                                console.log('transform', value);
                                return Number(value);
                            }
                        },
                    },

                    {
                        label: '图标',
                        name: 'ico',
                        component: 'Input',
                        componentProps: {
                            defaultValue: '',
                            size: 'large',
                        },
                        formBinderProps: {
                            required: false,
                        },
                    },

                    {
                        label: '扩展参数',
                        name: 'parameter',
                        component: 'Input',
                        componentProps: {
                            defaultValue: '',
                            size: 'large',
                        },
                        formBinderProps: {
                            required: false,
                        },
                    },

                    {
                        label: '排序',
                        name: 'sort',
                        component: 'Number',
                        componentProps: {
                            defaultValue: 0,
                            size: 'large',
                        },
                        formBinderProps: {
                            required: false,
                        },
                    },

                ];
            }

        }

        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: 20,
            },
            {
                title: '名称',
                dataIndex: 'name',
                width: 80,
            },
            {
                title: '编号',
                dataIndex: 'code',
                width: 50,
            },
            {
                title: '类型',
                dataIndex: 'type',
                width: 50,
            },
            {
                title: '父ID',
                dataIndex: 'parentId',
                width: 25,
            },

            {
                title: '访问地址',
                dataIndex: 'path',
                width: 80,
            },

            // {
            //     title: '是否权限控制',
            //     dataIndex: 'isControlled',
            //     width: 20,
            // },
            {
                title: '创建时间',
                key: 'gmtCreate',
                width: 80,
                render: (value, index, record) => {
                    const date = Tool.Date._getDate(record.gmtCreate);
                    return (
                        <span>{date}</span>
                    )
                }
            },
            {
                title: '操作',
                key: 'action',
                width: 60,
                render: (value, index, record) => {
                    return (
                        <span>
                             
                            <EditDialog
                                index={index}
                                dataSource={record}
                                formBaseComponent={this.FormBaseComponent}
                                fetchData={this._fetchData}
                            />
                            <DeleteBalloon
                                handleRemove={() => { this._deleteMenu(value, index, record) }}
                            />
                        </span>
                    );
                },
            },
        ];
    }


    _renderColumns = () => {
        const { columns } = this;

        return columns.map((item) => {
            if (typeof item.render === 'function') {
                return (
                    <Table.Column
                        title={item.title}
                        key={item.key}
                        cell={item.render}
                        width={item.width || 80}
                        lock="right"
                    />
                );
            }

            return (
                <Table.Column
                    key={item.dataIndex}
                    title={item.title}
                    dataIndex={item.dataIndex}
                    width={item.width || 80}

                />
            );
        });
    };



    _formBaseComponentPreSave = (values) => {
        console.log('_formBaseComponentPreSave', values);
        return values;
    }

    _formBaseComponentPostSave = (data) => {
        console.log('_formBaseComponentPostSave', data);
        //Tool.Page._pageFeedbackSuccess("新建成功！");
        this._closeAddDialog();
        this._fetchData();
    }

    /**
     * 删除菜单
     */
    _deleteMenu = (value, index, record) => {
        const { urlApiPath } = this.props;
        Tool.Api._apiDelete(urlApiPath + '/' + record.id, {}, (data) => {
            this._fetchData()
        });
    }


    _onRefFormBase = (ref) => {
        this.FormBaseRef = ref;
    }


    _showAddDialog = () => {
        this.setState({
            addDialogVisible: true
        })
    }

    _closeAddDialog = () => {
        this.setState({
            addDialogVisible: false
        })
    }


    _addonOk = () => {
        this.FormBaseRef.validate();
    }

    _addonClose = () => {
        this._closeAddDialog();
    }

    _fetchData = () => {
        const { urlApiPath } = this.props;
        Tool.Api._apiGet(urlApiPath + '/search', {
            pageNum: 1,
            pageSize: 15,
            orderKey: 'id',
            orderType: 'desc'
        }, (data) => {
            const { list } = data;
            this.setState(
                {
                    dataSource: list
                }
            );
        });
    }

    /**
     * 设置查询和新增菜单的参数
     */
    _treeOnSelect = (key, info) => {
        if (key.length > 0) {
            this.selectedNodeId = key.pop();
        } else {
            this.selectedNodeId = 0;
        }
    }

    componentDidMount() {
        this._fetchData()
    }

    render = () => {
        const { configForm } = this.FormBaseComponent;
        const { dataSource, addDialogVisible, selectedNodeId } = this.state;

        console.log('render_selectedNodeId', selectedNodeId);

        return (
            <IceContainer>
                <Row gutter={4} align="top" hidden={false} className="menu_panel" >

                    <Col fixedSpan="10" hidden={false}>
                        <MenuTree dataSource={dataSource} onSelect={this._treeOnSelect} />
                    </Col>

                    <Col hidden={false} >
                        <IceContainer title="菜单管理">
                            <div>

                                <Button type="primary" onClick={this._showAddDialog} style={{ marginBottom: 10 }}>新增菜单</Button>

                                <Dialog
                                    style={{ width: 960 }}
                                    title="新增菜单"
                                    visible={addDialogVisible}
                                    onOk={this._addonOk}
                                    onCancel={this._addonClose}
                                    onClose={this._addonClose}>

                                    <FormBase onRef={this._onRefFormBase} {...this.FormBaseComponent}/>
                                </Dialog>

                            </div>
                            <div>
                                <Table dataSource={dataSource}>
                                    {this._renderColumns()}
                                </Table>
                            </div>
                        </IceContainer>
                    </Col>
                </Row>

            </IceContainer>
        );
    }
}