import React, {Component} from 'react';
import { Popconfirm,Icon ,Switch} from 'antd';
import style from './common.less';
import {Global} from 'winning-megreziii-utils';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1071755_ckg8ra4f4pi.js',
});
const enableText =(state)=>{
    return (state == Global.EnableValue.Enable ? '要禁用吗？':'要启用吗？')
}
const titleEdit='更新';
const titleDelete='删除';
const titleEditRole='分配角色'
const titleEditOrg='用户组织'

export default (self)=>{
    const {user}=self.props;
    return [
        {
            title: '序号',
            // dataIndex: 'yh_id',
            render:(text,record,index)=>`${index+1}`,
            width: '10%',
        }, {
            title: '用户名称',
            dataIndex: 'yh_mc',
            width: '15%',
        }, {
            title: '拼音',
            dataIndex: 'py',
            width: '15%',
            render: (text, record) => (
               <div>{Global.nullText(text)}</div>
            )
        }, {
            title: '职务头衔',
            dataIndex: 'zw',
            width: '20%',
            render: (text, record) => (
                <span>
                    {Global.nullText(Global.returnNameByValue(self.props.state.jobTitle,text))}
                </span>
            ),
        } ,{
            title: '联系电话',
            dataIndex:'dh',
            width: '20%',
            render: (text, record, index) => (
                <div>{Global.nullText(text)}</div>
            )
        }, {
            title: '启用状态',
            dataIndex:'qyzt',
            render: (text, record) => (
                <div className={style.operate}>
                    <div>
                    <Popconfirm placement="topLeft" title={enableText(text)} onConfirm={()=>{ user.handleEnableUser(self,record)}} okText="是" cancelText="否">
                        <Switch checkedChildren="开" unCheckedChildren="关" checked={(text == Global.EnableValue.Enable)} />
                    </Popconfirm>
                    </div>
                    { record.operate ?
                        <div>
                            <IconFont type="iconjigou" title={titleEditOrg} className={style.editIcon} onClick={()=>{self.goEditOrg(record)}}/>
                            <IconFont type="iconjiaoseqiehuan" title={titleEditRole} className={style.editIcon} onClick={()=>{self.goEditRole(record)}}/>
                            <IconFont type="iconbianji" title={titleEdit} className={style.editIcon} onClick={()=>{self.goEdit(record)}}/>
                            <IconFont type="iconshanchu" title={titleDelete} className={style.deleteIcon} onClick={()=>{Global.showConfirm({title:Global.BtnText.Delete,onConfirm:()=>{ user.handleRemove(self,record)}})}}/>
                        </div> : <div></div>}
                </div>
            ),
        }

    ]
}