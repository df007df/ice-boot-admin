/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Icon } from '@icedesign/base';
import cloneDeep from 'lodash.clonedeep';
import CustomForm from '../CustomForm';
import PropTypes from 'prop-types';

export default class SearchFilter extends Component {
  static displayName = 'SearchFilter';

  static propTypes = {
    configFormFileds: PropTypes.func,
    fetchData: PropTypes.func,
    handleReset: PropTypes.func,
  };

  static defaultProps = {
    configFormFileds: () => { console.log("defaultProps.configFormFiled") },
    fetchData: () => { console.log("defaultProps.fetchData") },
  };


  constructor(props) {
    super(props);

    this.fieldsDefaultValueMap = this._initParseFormFiled();
    this.state = {
      hasAdvancedFields: false,
      showAdvancedFields: false,
      value: cloneDeep(this.fieldsDefaultValueMap),
    };
  }

  /**
   * @todo
   * 解析列表搜索表单字段
   * 1，一般和高级搜索字段
   * 2，url,解析参数 初始化搜索表单默认值
   */
  _initParseFormFiled = () => {
    const configFormFileds = this.props.configFormFileds();
    let baseFileds = {};
    let advancedFileds = {};
    let fileds = {};

    configFormFileds.forEach((item) => {
      if (item.advancedSearch) {
        advancedFileds[item.name] = item.componentProps.defaultValue || '';
      } else {
        baseFileds[item.name] = item.componentProps.defaultValue || '';
      }

      fileds[item.name] = item.componentProps.defaultValue || '';
    });

    return fileds;
  }


  _findFiledOperator = (name) => {
    const configFormFileds = this.props.configFormFileds();
    let operator = '=';
    configFormFileds.forEach((item) => {
      if (item.name == name && item.operator) {
        operator = item.operator;
        return;
      }
    });
    return operator;
  }

  /**
   * 提交回调函数
   */
  handleSubmit = (errors, value) => {
    if (errors) {
      console.log({ errors });
      return;
    }
    this.props.fetchData(this._handleFormValues(value));
  };

  _handleFormValues = (values) => {

    console.log("_handleFormValues", values);
    console.log("this.fieldsDefaultValueMap",  this.fieldsDefaultValueMap);
    const formKeys = Object.keys(values);
    let formParams = {};
    /**
     * 过滤掉还是默认值的数据
     */
    formKeys.forEach((key) => {
      if (this.fieldsDefaultValueMap[key] != values[key] &&
        values[key].length != 0
        ) {
          formParams[key] = this._findFiledOperator(key) + "|" + values[key];
      }
    });
    
    return formParams;
  };




  /**
   * 重置表单
   */
  handleReset = () => {
    this.setState(
      {
        value: Object.assign(
          {},
          this.fieldsDefaultValueMap
        ),
      },
      () => {
        this.props.handleReset();
      }
    );
  };

  /**
   * 高级搜索
   */
  handleAdvancedSearch = () => {
    const { showAdvancedFields } = this.state;
    this.setState({
      showAdvancedFields: !showAdvancedFields,
    });
  };

  /**
   * 渲染按钮
   */
  renderExtraContent = () => {

    if (this.state.hasAdvancedFields) {
      return (
        <div style={styles.extraContent} onClick={this.handleAdvancedSearch}>
          高级搜索{' '}
          <Icon
            size="xs"
            type={this.state.showAdvancedFields ? 'arrow-up' : 'arrow-down'}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  /**
   * 获取渲染表单的字段
   */
  getFormFiled = () => {
    const configFormFileds = this.props.configFormFileds();
    const { showAdvancedFields } = this.state;
    const { fieldsDefaultValueMap } = this;
    const allFieldsKeys = Object.keys(fieldsDefaultValueMap);

    if (showAdvancedFields) {
      return {
        config: configFormFileds,
        fields: Object.assign({}, fieldsDefaultValueMap),
      };
    }

    // const config = configFormFileds.filter((item) => {
    //   return baseKeys.includes(item.formBinderProps.name);
    // });

    return {
      config: configFormFileds,
      fields: Object.assign({}, fieldsDefaultValueMap),
    };
  };

  render() {
    const getFormFiled = this.getFormFiled();

    return (
      <CustomForm
        value={this.state.value}
        config={getFormFiled.config}
        handleSubmit={this.handleSubmit}
        handleReset={this.handleReset}
        extraContent={this.renderExtraContent()}
      />
    );
  }
}

const styles = {
  extraContent: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
  },
};
