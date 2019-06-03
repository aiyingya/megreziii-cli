import {Loader} from 'winning-megreziii-utils';

import orgList from './mock/Organization/organize_list';
import orgUnique from './mock/Organization/organization_unique';
import orgUpdate from './mock/Organization/organize_update';
import orgDelete from './mock/Organization/organize_update';
import orgValue from './mock/Organization/parent_organization';
import orgParentValue from './mock/Organization/parent_organization';
import orgTree from './mock/Organization/organize_tree';

const api = {
    OrgList:"/rest/bs/auth/organize_tree",
    OrgUnique:"/rest/bs/auth/organize_unique",
    OrgUpdate:"/rest/bs/auth/organize_update",
    OrgRemove:"/rest/bs/auth/organize_delete",
    OrgValue:"/rest/bs/auth/organization",
    OrgParentValue:"/rest/bs/auth/organization",
    OrgTree:"/rest/bs/auth/query_organize_by_name",
};
export default Loader.batchExport(
    api,
    [orgList,orgUnique,orgUpdate,orgDelete,orgValue,orgParentValue,orgTree]
);
