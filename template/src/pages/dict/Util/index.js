
const getFormSearch = (value = {},page = 1,pageSize =10) =>{
    return {
        zd_lx_mc: typeof(value.zd_lx_mc) === 'undefined' ? '': value.zd_lx_mc,
        zd_mc: typeof(value.zd_mc) === 'undefined' ? '': value.zd_mc,
        zd_z: typeof(value.zd_z) === 'undefined' ? '': value.zd_z,
        pageIndex: page,
        pageSize: pageSize
    }
}

export default {
    getFormSearch
}