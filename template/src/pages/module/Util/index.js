
const getFormSearch = (value = {},page = 1,pageSize =10) =>{
    return {
        mk_mc: typeof(value.mk_mc) === 'undefined' ? '': value.mk_mc,
        pageIndex: page,
        pageSize: pageSize
    }
}

export default {
    getFormSearch
}