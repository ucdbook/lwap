
function getStoreId(storeId) {
    if(!storeId) {
        return 2;
    }
    return parseInt(storeId.substring(4, storeId.length - 3), 10);
}

exports.getStoreId = getStoreId;