import React from 'react';
import {Modal,Transfer,Input} from 'antd';
import {withRouter} from "react-router-dom";
import {ReduxWarpper} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';

class EditRoleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: []
        }
        this.close = this.close.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    close(){
        this.props.userRole.showRoleEdit()
    }
    handleChange(nextTargetKeys, direction, moveKeys) {
        // 左边移动到右边
        this.props.userRole.setUserRoleList(nextTargetKeys)
    }
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        // 显示选中的项
        this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});
    }
    submit(){
        if(!this.props.state.btnRequest) return
        this.props.userRole.handleUserRole( this.props.state.user.yh_id,this.props.state.userRoleListKeys,()=>{
            this.close()
        })
    }
    render() {
        const title = `给 ${this.props.state.user.yh_mc} 分配角色 `
        return (
            <Modal
                visible={this.props.state.editRoleModal}
                title={title}
                onOk={this.submit}
                onCancel={this.close}
                confirmLoading={this.props.state.btnRequestLoading}
                width = {450}
            >
                <Transfer
                    dataSource={this.props.state.roleList}
                    titles={['角色列表', '选中']}
                    targetKeys={this.props.state.userRoleListKeys}
                    selectedKeys={this.state.selectedKeys}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    render={item => item.js_mc}
                    rowKey={record => record.js_id}
                    listStyle={{
                        width: 176,
                        height: 232,
                    }}
                />

            </Modal>
        );
    }
}
export default  ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditRoleModal);