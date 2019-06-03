import {Loader} from 'winning-megreziii-utils';

import moduleList from './mock/module/list_module';
import moduleUpdate from './mock/module/module_update';
import moduleRemove from './mock/module/module_update';
import moduleParent from './mock/module/parent_module';

const api = {
    ModuleList:"/rest/bs/auth/list_module",
    ModuleUpdate:"/rest/bs/auth/update_module",
    ModuleRemove:"/rest/bs/auth/module_delete",
    ModuleParent:"/rest/bs/auth/parent_module"
};

export default Loader.batchExport(
    api,
    [moduleList,moduleUpdate,moduleRemove,moduleParent]
);
