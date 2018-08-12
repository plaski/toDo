import '../scss/style.scss';

import Items from './modules/items'
import Storage from './modules/storage'
import UI from './modules/ui'

const addItemSubmit = function(e) {
  e.preventDefault();
  const isImportant = UI.getImpValue();
  const input = UI.getInputValue();
  if (input.trim() !== '') {
    const newItem = Items.addItem(input, isImportant);
    UI.addItemToList(newItem);
    Storage.storeItem(newItem);
    UI.clearInput();
  }
};

const itemBtnSubmit = function(e) {
  e.preventDefault();
  const itemId = e.target.parentNode.parentNode.parentNode.id.split('-')[1];
  const item = Items.getItem(itemId);
  if (e.target.id === 'editBtn') {
    const itemIsDone = Items.isItemDone(item);
    if (itemIsDone) {
      return
    }
    const input = UI.setItemToEdit(itemId);
    input.addEventListener('blur', function() {
      const dateToUpdate = Items.getDate();
      const textToUpdate = UI.updateEditedItem(item, dateToUpdate);
      const itemToUpdate = Items.updateItem(item, textToUpdate, dateToUpdate);
      Storage.updateItemStorage(itemToUpdate);
    });
  } else if (e.target.id === 'deleteBtn') {
    Items.deleteItem(item);
    UI.deleteItem(itemId);
    Storage.deleteItemFromStorage(itemId)
  } else if (e.target.id === 'doneBtn') {
    Items.markItemDoneUndone(item);
    UI.markItemDoneUndone(itemId);
    Storage.updateItemStorage(item);
    const items = Items.getItems();
    UI.fillItemsList(items);
  }
}

UI.selectors.addBtn.addEventListener('click', addItemSubmit);
UI.selectors.regularItemsList.addEventListener('click', itemBtnSubmit);
UI.selectors.importantItemsList.addEventListener('click', itemBtnSubmit);
const items = Storage.getItemsFromStorage();
Items.setItems(items);
UI.fillItemsList(items);
