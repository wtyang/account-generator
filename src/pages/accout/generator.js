import React, { Component } from 'react';
import * as mock from './../../mock';
import ClipboardJS from 'clipboard';
import { Icon, Button,Form, Input, message, Select, Col  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class SelectInput extends Component{
  render(){
    return (<Input className="select-input" 
            prefix={<Icon type={this.props.prefix} theme="outlined" />}
            id={this.props.id} type="text" 
            value={this.props.rendomValue} 
            addonAfter={<Icon style={{cursor:'pointer'}} type='copy' data-clipboard-target={"#"+this.props.id} />}
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
    rendomBankCard: '',
    cardBin:'622848',
    defaultBankCard: '6228481234567890003',
    adult: true,
    cardBinList : [
      { name: "农业银行", value: '622848' },
      { name: "建设银行", value: '623668' },
      { name: "交通银行", value: '622262011' },
      { name: "招商银行", value: '622580' },
      { name: "民生银行", value: '622622' },
      { name: "中国银行", value: '622763' },
      { name: "兴业银行", value: '622909' },
      { name: "工商银行", value: '623062' },
      { name: "浦发银行", value: '622228' },
      { name: "中信银行", value: '621771' },
      { name: "光大银行", value: '622663' },
      { name: "民生银行", value: '622617' },
      { name: "平安银行", value: '622156' },
      { name: "邮政银行", value: '620062' },
      { name: "华夏银行", value: '621222' }
    ]
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
  /**
   * 获取用户全部信息
   */
  generateDataAll= ()=>{
    let data = {
      rendomName: this.state.rendomName,
      rendomID: this.state.rendomID,
      rendomMobile: this.state.rendomMobile,
      rendomBankCard: this.state.rendomBankCard,
      defaultBankCard: this.state.defaultBankCard
    } 
    return data;
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
  * 更改生成信息成年人/未成年
  * 
  */
  changeAdult = async ()=>{
    await this.setState({
      adult: !this.state.adult
    })
    this.initRendomData()
  }
  /**
  * 更改卡bin
  * 
  */
  changeCardBin = async (cardBin = this.state.cardBin)=>{
    await this.setState({
      cardBin:cardBin
    })
    this.initRendomData();
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
      rendomID: mock.rendomID(this.state.adult),
      rendomMobile: mock.rendomMobile(),
      rendomBankCard: mock.rendomBankCard(this.state.cardBin)
    })
  }
  render() {
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
        <FormItem inline  {...tailFormItemLayout}>
          
          <Button type="primary" htmlType="button"  onClick={this.initRendomData}>重新生成</Button>
          <Button type="primary" htmlType="button" style={{ marginLeft: 8 }} data-clipboard-text={Object.values(this.generateDataAll()).join(',')}>复制全部</Button>
        </FormItem>
        <Form>
          <FormItem {...formItemLayout} label="姓名">
            <SelectInput id="realName" prefix="user" rendomValue={this.state.rendomName} ></SelectInput>
          </FormItem>
          <FormItem {...formItemLayout} label="身份证号">
            <Col span="6">
              <Select defaultValue={1} onChange={this.changeAdult} style={{marginRight:10}}>
                <Option value={1}>成年人</Option>
                <Option value={0}>未成年</Option>
              </Select>
            </Col>
            <Col span="18"><SelectInput id="idCard" prefix="idcard" rendomValue={this.state.rendomID}></SelectInput></Col>
            
          </FormItem>
          <FormItem {...formItemLayout} label="手机号">
            <SelectInput id="mobileNumber" prefix="mobile" rendomValue={this.state.rendomMobile}></SelectInput>
          </FormItem>
          <FormItem {...formItemLayout} label="固定银行卡号">
            <SelectInput id="defaultBankCard" prefix="credit-card" rendomValue={this.state.defaultBankCard}></SelectInput>
          </FormItem>
          <FormItem {...formItemLayout} label="银行卡号">
            <Col span="6">
              <Select defaultValue={this.state.cardBin} onChange={this.changeCardBin}>
                {
                  this.state.cardBinList.map((element) => {
                    return (<Option value={element.value} key={element.value}>{element.name}</Option>)
                  })
                }
              </Select>
            </Col>
            <Col span="18">
              <SelectInput id="bankCard" prefix="credit-card" rendomValue={this.state.rendomBankCard}></SelectInput>
              
            </Col>
            
          </FormItem>
        </Form>
      </div>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create()(AccountGenerator);
export default WrappedHorizontalLoginForm;
