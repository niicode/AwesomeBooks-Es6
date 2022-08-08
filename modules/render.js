export default class Render {
  constructor(view, add, contact) {
    this.view = view;
    this.add = add;
    this.contact = contact;
  }

  render = () => {
    this.view.style.display = 'none';
    this.add.style.display = 'block';
    this.contact.style.display = 'none';
  };
}
