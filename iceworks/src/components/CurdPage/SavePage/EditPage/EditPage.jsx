import SavePage from '../components/SavePage';
import _ from 'lodash';
import './EditPage.scss';

export default class EditPage extends SavePage {
  static displayName = 'EditPage';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {}
    };
  }

  configForm = () => {
    return [];
  }

  componentDidMount() {
    this._fetchData();
  }


  //过滤掉未在编辑内容的字段，避免最后验证提交到后端
  _filterNotUpdateFields = (data) => {
    const configForm = this.configForm();
    let updateFields = configForm.map((item) => {
      return item.name;
    });
    const updateData = _.pick(data, updateFields, ['id']);
    console.log('updateData', updateData);
    return updateData;
  }

  _fetchData = () => {
    const { urlApiPath, urlApi } = this._configBase();
    const url = urlApiPath + "/" + this._getUrlParams('id');
    this._apiGet(url, {}, (data) => {
      this.setState({
        dataSource: this._filterNotUpdateFields(data)
      });
    });
  }

  /**
   * 保持提交接口
   */
  _saveData = (data) => {
    const { urlApiPath } = this._configBase();
    const url = urlApiPath + "/" + this._getUrlParams('id');

    this._apiPut(url, data, (data) => {
      this.setState({
        dataSource: this._filterNotUpdateFields(data)
      });
      this._pageFeedbackSuccess("更新成功！");
    });
  }

}