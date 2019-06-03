import {Loader} from 'winning-megreziii-utils';
import dictList from './mock/Dict/dict_list';
import dictUnique from './mock/Dict/dict_unique';
import dictUpdate from './mock/Dict/dict_update';
import dictDelete from './mock/Dict/dict_update';
import userResource from './mock/Role/user_resource';
import dictionary from './mock/Dict/dict';

const api = {
    DictList:"/rest/bs/auth/dict_list",
    DictUnique:"/rest/bs/auth/dict_unique",
    DictUpdate:"/rest/bs/auth/dict_update",
    DictRemove:"/rest/bs/auth/dict_delete",
    UserResource:"/rest/bs/auth/user_resource",
    Dictionary: '/rest/bs/auth/dict_type'
};
export default Loader.batchExport(
    api,
    [dictList,dictUnique,dictUpdate,dictDelete,userResource,dictionary]
);
