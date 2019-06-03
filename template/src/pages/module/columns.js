import React from 'react';
import { Icon ,Popover} from 'antd';
import {Global} from 'winning-megreziii-utils';
import style from './common.less';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1071755_ckg8ra4f4pi.js',
});
const titleEdit='更新';
const titleDelete='删除';
export default (self)=>{

    const { module }=self.props;
    return [
        {
            title: '序号',
            // dataIndex: 'mk_id',
            render:(text,record,index)=>`${index+1}`,
            width: '10%',
        }, {
            title: '菜单名称',
            dataIndex: 'mk_mc',
            width: '20%',
        }, {
            title: '菜单标识',
            dataIndex: 'mk_code',
            width: '15%', render: (text, record, index) => (
                <div>{Global.nullText(text)}</div>
            )
        },  {
            title: '上级菜单',
            dataIndex: 'sj_mk_mc',
            width: '15%',
        },{
            title: '备注',
            dataIndex:'bz',
            render: (text, record, index) => (
                <div className={style.operate}>
                    <Popover placement="topLeft" title="备注" content={Global.nullText(text)} >
                        <div className={style["winning-bz"]}>{Global.nullText(text)}</div>
                    </Popover>
                    { record.operate ?
                        <div>
                            <IconFont type="iconbianji" title={titleEdit} className={style.editIcon} onClick={()=>{self.goEdit(record)}}/>
                            <IconFont type="iconshanchu" title={titleDelete} className={style.deleteIcon} onClick={()=>{Global.showConfirm({title:Global.BtnText.Delete,onConfirm:()=>{ module.handleRemove(self,record)}})}}/>
                        </div> : <div></div>}
                </div>
            )
        }
    ]
}