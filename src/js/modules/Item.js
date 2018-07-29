class Item {
  constructor(text, id, createdDate, important) {
    this.text = text,
    this.id = id,
    this.done = false,
    this.createdDate = createdDate,
    this.editedDate = null,
    this.important = important
  }
}

export default Item;
