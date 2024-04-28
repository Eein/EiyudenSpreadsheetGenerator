import ItemTable from '../../game_data/DataTables/ItemTable.json' assert { type: 'json' };
import { getDetail, getName } from './locale.js';

const item_list = ItemTable.list;
const items = {};

item_list.forEach(item => {
  const name = getName(item._nameId);
  const detail = getDetail(item._detailId);
  items[item._id] = {
    id: item._id,
    name,
    detail,
    nameId: item._nameId,
    detailId: item._detailId,
    price: item._price,
    priceHard: item._priceHard,
    sellPrice: item._sellPrice,
    possessionMax: item._possessionMax,
    isTargetingItem: item._isTargetingItem,
    itemCategory: item._itemCategory,
    isDisableUseField: item._isDisableUseField,
    categoryValue: item._categoryValue,
    valuable: item._valuable,
    sortId: item._sortId,
    rarity: item._rarity,
    notNewlyAdded: item._notNewlyAdded0
  }
})

export default items;
