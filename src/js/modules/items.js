import Storage from './storage'
import Item from './Item'

const Items = {

  data: {
    items: []
  },

  randomId() {
      const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let id = '';
      for (let i = 0; i < 10; i++) {
          id += chars[Math.floor(Math.random() * chars.length)];
      }
      return id;
  },

  compare(a, b) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
  },

  sortArray(arr) {
    const self = this;
    arr.sort(function(a, b) {
      const sorted = self.compare(b.done, a.done) || self.compare(a.createdDate, b.createdDate);
      return sorted;
    });
    return arr;
  },

  getItem(id) {
    let itemToGet;
    this.data.items.forEach(function(item) {
      if (item.id === id) {
        itemToGet = item;
      }
    });
    return itemToGet;
  },

  addItem(input, isImportant) {
    const id = this.randomId();
    const createdDate = Items.getDate();
    const newItem = new Item(input, id, createdDate, isImportant);
    this.data.items.push(newItem);
    return newItem;
  },

  getItems() {
    const items = this.sortArray(this.data.items);
    return this.data.items;
  },

  setItems(fetcheditems) {
    const items = this.sortArray(fetcheditems);
    this.data.items = items;
  },

  updateItem(item, text, date) {
    const itemToEdit = this.getItem(item.id);
    itemToEdit.text = text;
    itemToEdit.editedDate = date;
    return itemToEdit;
  },

  deleteItem(item) {
    const index = this.data.items.indexOf(item);
    this.data.items.splice(index, 1);
  },

  isItemDone(item) {
    return item.done;
  },

  isItemEditing(item) {
    return item.editing;
  },

  markItemDoneUndone(itemToMark) {
    this.data.items.forEach(function(item) {
      if (item.id === itemToMark.id) {
        item.done = !item.done;
      }
    });
  },

  getDate() {
    const date = Date.parse(new Date);
    return date;
  }
}

export default Items;
