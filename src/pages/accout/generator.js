import React, { Component } from 'react';

import * as mock from './../../mock';
import ClipboardJS from 'clipboard';
import { Icon, Button,Form, Input, message} from 'antd';
const FormItem = Form.Item;
class SelectInput extends Component{
  render(){
    return (<Input className="select-input" 
            prefix={<Icon type={this.props.prefix} theme="outlined" />}
            id={this.props.id} type="text" 
            value={this.props.rendomValue} 
            addonAfter={<Icon type='copy' data-clipboard-target={"#"+this.props.id} />}
            readOnly 
        />)
  }
  
}

class AccountGenerator extends Component {
  // constructor(props){
  //   super(props)
  // }
  
  state = {
    rendomName: '',
    rendomID:'',
    rendomMobile: '',
    rendomBankCard: ''
  };
  componentDidMount(){
    this.initRendomData()
    let clipboard = new ClipboardJS("[data-clipboard-target],[data-clipboard-text]")
    clipboard.on('success', function(e) {
        // console.info('Action:', e.action);
        // console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);
        message.info('复制成功');
        e.clearSelection();
    });
  }

  rendomNameData = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  getFullAccountData = ()=>{
    //   const dir = {
    //     rendomName: '姓名',
    //     rendomID:'身份证',
    //     rendomMobile: '手机',
    //     rendomBankCard: '银行卡'
    //   }
      return this.state
  }

  /**
   * 伸展菜单
   *
   * @memberof App
   */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  /**
   * 生成虚拟数据
   *  rendomName 姓名
   *  rendomID   身份证
   * 
   * @memberof App
   */
  initRendomData = ()=>{
    this.setState({
      rendomName: mock.rendomName(),
      rendomID: mock.rendomID(),
      rendomMobile: mock.rendomMobile(),
      rendomBankCard: mock.rendomBankCard()
    })
  }
  render() {
      this.getFullAccountData()
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 16,
        },
      },
    };
    return (
        
      <div className="App">
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="button"  onClick={this.initRendomData}>重新生成</Button>
            <Button type="primary" htmlType="button" style={{ marginLeft: 8 }} data-clipboard-text={Object.values(this.state).join(',')}>复制全部</Button>
        </FormItem>
        <FormItem {...formItemLayout} label="姓名">
            {getFieldDecorator('rendomName')(
                <SelectInput prefix="user" rendomValue={this.state.rendomName} ></SelectInput>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证号">
            {getFieldDecorator('rendomID')(
                <SelectInput prefix="idcard" rendomValue={this.state.rendomID}></SelectInput>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号">
            {getFieldDecorator('rendomMobile')(
                <SelectInput prefix="mobile" rendomValue={this.state.rendomMobile}></SelectInput>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="银行卡号">
            {getFieldDecorator('rendomBankCard')(
                <SelectInput prefix="credit-card" rendomValue={this.state.rendomBankCard}></SelectInput>
            )}
        </FormItem>
      </div>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create()(AccountGenerator);
export default WrappedHorizontalLoginForm;
