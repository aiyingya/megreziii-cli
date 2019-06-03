import React, {Component} from 'react';
import style from '../common.less'
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import { Form, Input, Button, Row,Col,Divider,Select } from 'antd';
import {Global,ReduxWarpper,BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};

/**
 * 菜单编辑方案
 * 支持 新增内部Router菜单 和 外部http地址菜单
 *     场景                              标识和路径
 * 新增-路由菜单（仅脚本新增）              均必填
 * 新增-外部链接菜单                        均必填（标识暂时必填）
 * 编辑-路由菜单                          均不可编辑（通过http协议判断菜单类型）
 * 编辑-外部链接菜单                       均可编辑（通过http协议判断菜单类型）
 *
 * 如果路径可为空 那么 placeholder="请输入"需要进行判断，禁用时不显示请输入字符串
 * <Input placeholder={record.mk_code ? record.mk_code : "请输入"}  disabled={record.mk_code ? true : false}  />
 *  <Input placeholder={record.mk_code ? '' : "请输入"}  disabled={record.mk_code ? true : false}  />
 */
class EditFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'新增菜单',
            backUrl:'/system/module',
            record:{}
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this)
	    this.inside = React.createRef();

    }
    goBack(){
        this.props.history.push({pathname:this.state.backUrl, query: {frozenPaging:true}})
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.props.state.btnRequest) return
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let parentName = Global.returnNameByValue(this.props.state.parentList,values.sj_mk_id)
                // 排序为必填项,先给一个默认值px:"0"
                let val = {...this.state.record,...values,sj_mk_mc: parentName,px:"0"}
                this.props.moduleOperate.handleOperate(val,()=>{
                    this.goBack()
                })
            }
        });
    }

    componentWillMount(){
        let query = this.props.location.query
        this.props.moduleOperate.initParentMenus()
        if (query && query.record && query.record.mk_id) {
            let record = query.record;
            this.setState({record:{...record},text:'编辑菜单'})
        }
    }
    componentDidMount(){
	    new Scrollbar(this.inside.current).show()

    }

    render() {
        const { btnRequestLoading } = this.props.state
        const { getFieldDecorator } = this.props.form;
        const { record } = this.state
        const isOutSideMenu = !Global.Match.RouterUrl.test(record.mk_rk)
        //  路径为空 或 是外部http协议菜单 则可以编辑
        const isCanEdit = !record.mk_rk || isOutSideMenu
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                <BreadcrumbCustom first="系统管理" second="菜单管理" third={this.state.text} secondUrl={this.state.backUrl}/>
                <Divider />
                <Form onSubmit={this.handleSubmit} className={style.form}>
                    <Form.Item {...formItemLayout} label="菜单名称">
                        {getFieldDecorator('mk_mc', {
                            initialValue: record.mk_mc,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" maxLength={80}/>
                        )}

                    </Form.Item>
                    <Form.Item {...formItemLayout} label="上级菜单">
                        {getFieldDecorator('sj_mk_id', {
                            initialValue: record.sj_mk_id ?record.sj_mk_id +'' : Global.TopMenuValue,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Select>
                                {this.props.state.parentList && this.props.state.parentList.map(item =>
                                    <Select.Option  key={item.value}>{item.name}</Select.Option>
                                )}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="菜单标识">
                        {getFieldDecorator('mk_code', {
                            initialValue: record.mk_code,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(

                            <Input placeholder="请输入" disabled={!isCanEdit} maxLength={25}/>
                            )}
                    </Form.Item>
                   {/* <Form.Item {...formItemLayout} label="图标">
                        {getFieldDecorator('tb', {
                            initialValue:record.tb,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" maxLength={40}/>
                        )}
                    </Form.Item>*/}
                    {/*<Form.Item {...formItemLayout} label="排序">
                        {getFieldDecorator('px', {
                            initialValue: record.px,
                            rules: [{
                                    required: true,
                                    pattern:/^\d{0,12}$/,
                                    type: 'number',
                                    message: '请输入',
                                    whitespace: true,
                                    transform:(value)=> {return Number(value)}
                                }],
                        })(
                            <Input type="number" placeholder="请输入" maxLength={5}/>
                        )}
                    </Form.Item>*/}
                    <Form.Item {...formItemLayout} label="路径" >
                        {
                            getFieldDecorator('mk_rk', {
                                initialValue: record.mk_rk,
                                rules: [{required: true, message: '请输入', whitespace: true}],
                            })(
                                <Input placeholder="请输入" disabled={!isCanEdit}  maxLength={150}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('bz', {
                            initialValue: record.bz
                        })(
                            <Input placeholder="请输入"  maxLength={250}/>
                        )}
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={5}/>
                        <Col span={12} className={style.formBtn}>
                            <Button type="main" htmlType="submit" loading={btnRequestLoading}>保存</Button>
                            <Button type="secondary" onClick={this.goBack}>取消</Button>
                        </Col>
                    </Row>
                </Form>
                </div>
            </div>
        );
    }
}
EditFrom = Form.create({ name: 'ModuleOperate' })(EditFrom);
export default  ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditFrom);