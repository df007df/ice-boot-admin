import React, { Component } from 'react';
import { Tree } from '@alifd/next';

import './MenuTree.scss';

export default class MenuBase extends Component {
    static displayName = 'MenuBase';


    static propTypes = {

    };

    static defaultProps = {
        dataSource: [],
        isShow: false,
        onSelect: (key, info) => {
            console.log('onSelect', key, info);
        }
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.defaultConfigBase = {
            title: "demo",
        };
    }

    onSelect(keys, info) {
        this.props.onSelect(keys, info);
    }

    onCheck(keys, info) {
        console.log('onCheck', keys, info);
    }

    onEditFinish(key, label, node) {
        console.log('onEditFinish', key, label, node);
    }

    onRightClick(info) {
        console.log('onRightClick', info);
    }

    _parseDataToTreeNode = (list = []) => {

        let newNode = [];
        list.map((item) => {
            newNode.push({
                id: item.id,
                key: 'tree_' + item.id,
                label: item.name,
                parentId: item.parentId,
            });
        });
        console.log('_parseDataToTreeNode', newNode);
        return setTreeData(newNode);
    }

    _renderTreeNode = (treeNode) => {
        const self = this;
        return treeNode.map((node, i) => {
            if (node.children && node.children.length > 0) {
                return (
                    <Tree.Node key={node.id} label={node.label}>
                        {self._renderTreeNode(node.children)}
                    </Tree.Node>
                )
            } else {
                return (
                    <Tree.Node key={node.id} label={node.label}/>
                )
            }
        })
    }

    render = () => {
        const treeNode = this._parseDataToTreeNode(this.props.dataSource);
        console.log('render_treeNode', treeNode);
        return (

            <Tree
                defaultExpandAll={true}
                autoExpandParent
                showLine

                onSelect={this.onSelect.bind(this)}
                onCheck={this.onCheck.bind(this)}
                onEditFinish={this.onEditFinish}
                onRightClick={this.onRightClick}>

                {this._renderTreeNode(treeNode)}

            </Tree>

        );
    }

}

function setTreeData(data) {
    let cloneData = JSON.parse(JSON.stringify(data))    // 对源数据深度克隆
    let tree = cloneData.filter((father) => {              //循环所有项
        let branchArr = cloneData.filter((child) => {
            return father.id == child.parentId      //返回每一项的子级数组
        });
        if (branchArr.length > 0) {
            father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.parentId == 0;      //返回第一层
    });
    return tree     //返回树形数据
}
