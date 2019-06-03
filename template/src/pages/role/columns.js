import React, {Component} from 'react';
import { Icon,Popover } from 'antd';
import style from './common.less';
import {Global} from 'winning-megreziii-utils';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1071755_ckg8ra4f4pi.js',
});
const titleEdit='更新';
const titleAddModule='分配模块';
const titleAddModuleResource='分配模块资源';
const titleDelete='删除';
export default (self)=>{
    const {role}=self.props;
    return [
        {
            title: '序号',
            // dataIndex: 'js_id',
            render:(text,record,index)=>`${index+1}`,
            width: '10%',
        }, {
            title: '角色名称',
            dataIndex: 'js_mc',
            width: '20%',
        }, {
            title: '角色类型',
            dataIndex: 'js_lx',
            width: '20%',
            render: (text, record) => (
                <div>
                    {Global.nullText(Global.returnNameByValue(self.props.state.roleType,text))}
                </div>
            ),
        }, {
            title: '备注',
            dataIndex: 'bz',
            key: 'zw',
            render: (text, record, index) => (
                <div className={style.operate}>
                    <Popover placement="topLeft" title="备注" content={Global.nullText(text)} >
                        <div className={style["winning-bz"]}>{Global.nullText(text)}</div>
                    </Popover>
                    { record.operate ?
                        <div>
                            <IconFont type="iconmodule" title={titleAddModule} className={style.deleteIcon} onClick={()=>{self.goEditModule(record)}}/>
                            <IconFont type="iconresource" title={titleAddModuleResource} className={style.deleteIcon} onClick={()=>{self.goEditModuleResource(record)}}/>
                            <IconFont type="iconbianji" title={titleEdit} className={style.editIcon} onClick={()=>{self.goEdit(record)}}/>
	                        <IconFont type="iconshanchu" title={titleDelete} className={style.deleteIcon} onClick={()=>{Global.showConfirm({title:Global.BtnText.Delete,onConfirm:()=>{ role.handleRemove(self,record)}})}}/>
                        </div> : <div></div>}
                </div>
            )
        }
    ]
}