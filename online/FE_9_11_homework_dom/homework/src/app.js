/********************
 * Helper functions
 ********************/

/**
 * jQuery-like DOM element selector, based on native JS .querySelector() method
 * @param selector {string} css-selector
 * @param selectAll {boolean} determines, if we need all items or only the first one
 * @returns {HTMLElement} HTMLElement(s)
 * @author Oleh Melnyk
 * @example $('section') or $('li', true)
 */
const $ = (selector, selectAll = false) =>
    !selectAll ? document.querySelector(selector) : document.querySelectorAll(selector);

/**
 * Create HTML tags, with attributes and textContent
 * @param tag {string} HTML tag name
 * @param attributes {object} object, that contains tag attributes
 * @param innerTEXT {string} innerText aka textContent of the tag element
 * @returns {HTMLElement}
 * @author Oleh Melnyk
 * @example createElement('li', {'class': 'some-class', 'draggable': true}, 'Some inner text')
 */
const createElement = (tag, attributes = {}, innerTEXT = '') => {
  const element = document.createElement(tag);

  if (Object.keys(attributes).length) {
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
  }

  if (innerTEXT) {
    element.appendChild(document.createTextNode(innerTEXT));
  }

  return element;
};

/********************
 * Add/del list items
 ********************/
let itemCounter = 0;
const MAX_LIST_ITEMS = 10;

const maxItemMsg = $('.todo-cat__max-list-limit-msg');
const inputField = $('.todo-cat__add-new-input');
const addNewItemBtn = $('.todo-cat__add-new-btn');
const todoList = $('.todo-cat__list');

inputField.onchange = inputField.onkeyup = event => {
  const labelText = inputField.value.trim();

  addNewItemBtn.disabled = !labelText;

  if (event.code === 'Enter' && labelText) {
    addItem(labelText);
  }
};

addNewItemBtn.onclick = () => {
  addItem(inputField.value.trim());
};

const addItem = labelText => {
  const checkIcon = createElement('i', {'class': 'material-icons'}, 'check_box_outline_blank');
  const deleteIcon = createElement('i', {'class': 'material-icons'}, 'delete');
  const label = createElement('span', {}, labelText);
  const checkboxBtn = createElement('button', {'class': 'todo-cat__checkbox'});
  const deleteBtn = createElement('button', {'class': 'todo-cat__remove-item'});
  const liItem = createElement('li', {'class': 'todo-cat__list-item', 'draggable': true});

  checkboxBtn.appendChild(checkIcon);
  checkboxBtn.appendChild(label);
  deleteBtn.appendChild(deleteIcon);
  liItem.appendChild(checkboxBtn);
  liItem.appendChild(deleteBtn);
  todoList.appendChild(liItem);

  checkboxBtn.onclick = () => {
    checkIcon.textContent = 'check_box';
  };

  deleteBtn.onclick = () => {
    liItem.remove();
    itemCounter--;

    inputField.disabled = false;
    maxItemMsg.style.display = 'none';
  };

  if (++itemCounter >= MAX_LIST_ITEMS) {
    inputField.disabled = true;
    maxItemMsg.style.display = 'block';
  }

  inputField.value = '';
  addNewItemBtn.disabled = true;
};

/********************
 * Draggable functions
 ********************/
let dragging = null;

todoList.addEventListener('dragstart', event => {
  dragging = event.target;
});

todoList.addEventListener('dragover', event => {
  if (event.target.className === 'todo-cat__list-item') {
    event.preventDefault();

    const ZERO_INDEX = 0, HALF = 2;

    const bounding = event.target.getBoundingClientRect();
    const offset = bounding.y + bounding.height / HALF;

    if (event.clientY - offset > ZERO_INDEX) {
      event.target.style['border-top'] = '';
      event.target.style['border-bottom'] = '2px dashed #ccc';
    } else {
      event.target.style['border-top'] = '2px dashed #ccc';
      event.target.style['border-bottom'] = '';
    }
  }
});

todoList.addEventListener('dragleave', event => {
  event.target.style['border-bottom'] = '';
  event.target.style['border-top'] = '';
});

todoList.addEventListener('drop', event => {
  if (event.target.className === 'todo-cat__list-item') {
    event.preventDefault();

    if (event.target.style['border-bottom']) {
      event.target.style['border-bottom'] = '';
      todoList.insertBefore(dragging, event.target.nextSibling);
    } else {
      event.target.style['border-top'] = '';
      todoList.insertBefore(dragging, event.target);
    }
  }
});
