import Storage from './storage'
import Items from './items'

const UI = {

  selectors: {
    regularItemsList: document.querySelector('#regularItemsList'),
    importantItemsList: document.querySelector('#importantItemsList'),
    input: document.querySelector('#input'),
    addBtn: document.querySelector('#addBtn'),
    impBtn: document.querySelector('#impBtn'),
    impCheckbox: document.querySelector('#importance')
  },

  renderItemHTML(item) {
    const createdDate = this.formatDate(item.createdDate);
    const editedDate = this.formatDate(item.editedDate);
    const html =
      `<li class="${item.done ? `list-group-item-success` : ''} ${item.important ? `border border-danger` : ''} my-1 list-group-item rounded d-flex justify-content-between flex-wrap" id="item-${item.id}">
        <div class="w-100 mr-2 mb-3 align-self-start">${item.text}</div>
        <div class="ml-auto d-flex flex-column justify-content-between align-items-end">
          <div class="btn-group" role="group">
            <button class="btn btn-sm btn-outline-success" id="doneBtn"><i class="fa fa-check" aria-hidden="true"></i></button>
            <button class="btn btn-sm btn-outline-info" id="editBtn"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-sm btn-outline-danger" id="deleteBtn"><i class="fa fa-times" aria-hidden="true"></i></button>
          </div>
          <div class="d-flex flex-column mt-1">
            <small class="align-self-end">${editedDate ? `edited: ${editedDate}` : ``}</small>
            <small class="align-self-end">created: ${createdDate}</small>
          </div>
        </div>
      </li>`;
    return html;
  },

  formatDate(date) {
    if (!date) {
      return
    }
    let createdDate = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}
    return createdDate = createdDate.toLocaleDateString('pl-PL', options);
  },

  fillItemsList(items) {
    this.selectors.importantItemsList.innerHTML = '';
    this.selectors.regularItemsList.innerHTML = '';
    items.forEach(function(item) {
      UI.addItemToList(item)
    });
  },

  getInputValue() {
    return this.selectors.input.value;
  },

  getImpValue() {
    return this.selectors.impCheckbox.checked;
  },

  addItemToList(item) {
    const itemHtml = this.renderItemHTML(item);
    if (item.important) {
      this.selectors.importantItemsList.insertAdjacentHTML('afterbegin', itemHtml);
    } else {
      this.selectors.regularItemsList.insertAdjacentHTML('afterbegin', itemHtml);
    }
  },

  setItemToEdit(itemId) {
    const span = document.querySelector('li#item-'+itemId).firstElementChild;
    const html = `<input type="text" value="${span.innerText}" id="input-${itemId}" class="edit-input"></input>`;
    span.innerText = '';
    span.insertAdjacentHTML('afterbegin', html);
    span.children[0].focus();
    return span.children[0];
  },

  updateEditedItem(item, editedDate) {
    const input = document.querySelector('#input-'+item.id);
    let inputValue = input.value;
    if (inputValue.trim() === '') {
      inputValue = item.text
    }
    const span = input.parentNode;
    span.innerText = inputValue;
    input.remove();
    const editedDateSpan = document.querySelector('#item-' + item.id).children[1].children[1].children[0];
    editedDate = this.formatDate(editedDate);
    editedDateSpan.innerText = `edited: ${editedDate}`;
    return inputValue;
  },

  deleteItem(itemId) {
    const li = document.querySelector('li#item-'+itemId);
    li.remove();
  },

  markItemDoneUndone(itemId) {
    const li = document.querySelector('li#item-'+itemId);
    li.classList.toggle('list-group-item-success');
  },

  clearInput() {
    this.selectors.input.value = '';
    this.selectors.impCheckbox.checked = false;
  }
}

export default UI;
