import React from 'react';
import { Icon } from 'antd';
import style from './common.less';
import {Global} from 'winning-megreziii-utils';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1071755_ckg8ra4f4pi.js',
});
const titleEdit='更新';
const titleDelete='删除';
export default (self)=>{
    const {dict}=self.props;
    return [
        {
            title: '序号',
            render:(text,record,index)=>`${index+1}`,
            width: '10%',
        }, {
            title: '字典类型名称',
            dataIndex: 'zd_lx_mc',
            width: '20%',
        }, {
            title: '字典名称',
            dataIndex: 'zd_mc',
            width: '15%',
        }, {
            title: '字典值',
            dataIndex:'zd_z',
            render: (text, record, index) => (
                <div className={style.operate}>
                    <div>{text}</div>
                    { record.operate ?
                        <div>
                            <IconFont type="iconbianji" title={titleEdit} className={style.editIcon} onClick={()=>{self.goEdit(record)}}/>
	                        <IconFont type="iconshanchu" title={titleDelete} className={style.deleteIcon} onClick={()=>{Global.showConfirm({title:Global.BtnText.Delete,onConfirm:()=>{ dict.handleRemove(self,record)}})}}/>
                        </div> : <div></div>}
                </div>
            )
        }
    ]
}