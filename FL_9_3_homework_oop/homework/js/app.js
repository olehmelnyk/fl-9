/**
 * Returns a UUID v4 (used to generate productID)
 * https://stackoverflow.com/a/2117523/1226226
 * @return {string} UUIDv4
 * @example '498988e9-9ffd-4b2a-924c-80fb2fcd3f12'
 */
function getUUIDv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

/**
 * Returns date and time for history logs
 * @returns {string} date and time
 * @example '29.09.2018, 13:58:19'
 */
function getDate() {
  return new Date().toLocaleString();
}

/**
 * Checks if passed argument is string and it's not empty
 * @param string
 * @returns {boolean}
 */
function isValidString(string) {
  return typeof string === 'string' && string.trim().length > 0;
}

/**
 * Checks if passed param is number, is finite and not a NaN
 * @param price {number}
 * @returns {boolean}
 */
function isValidPrice(price) {
  return typeof price === 'number' && price >= 0
      && !Number.isNaN(price) && Number.isFinite(price);
}

/**
 * Returns string with type of argument and it's string value in format:
 * "object '{a: 1, b: 2}'"
 * @param {*} param
 * @returns {string}
 */
function getArgumentInfo(param) {
  return `${typeof param} '${JSON.stringify(param)}'`;
}

/**
 * Creates a new Product
 * @class
 * @param name {string}
 * @param description {Object}
 * @param price {number}
 * @constructor
 */
function Product(name, description, price) {
  const _logs = [], _productID = getUUIDv4();
  let _price, _productShoppingCart;

  if (isValidString(name)) {
    this.name = name.trim();
  } else {
    console.error(`Wrong product name argument: expected not an empty string, \
${getArgumentInfo(name)} received.`);

    return;
  }

  if (typeof description === 'object') {
    this.description = description;
  } else {
    console.error(`Wrong product description argument: expected object, \
${getArgumentInfo(description)} received.`);

    return;
  }

  if (isValidPrice(price)) {
    _price = +price.toFixed(2);
  } else {
    console.error(`Wrong product price argument: expected positive number, \
${getArgumentInfo(price)} received.`);

    return;
  }

  /**
   * Returns a unique product id
   * @return {string} UUIDv4
   */
  this.getProductId = function() {
    return _productID;
  };

  /**
   * Returns the current product price
   * @returns {number} product price
   */
  this.getPrice = function() {
    return _price;
  };

  /**
   * Sets the price of the product
   * @param {number} newPrice
   * @returns {Product}
   */
  this.setPrice = function(newPrice) {
    if (isValidPrice(newPrice) && newPrice > this.getPrice()) {
      _logs.push(`change price from ${this.getPrice()} to ${newPrice}`);
      _price = +newPrice.toFixed(2);
    } else {
      _logs.push(`failed attempt to change price from ${this.getPrice()} to ${newPrice}`);
    }

    return this;
  };

  /**
   * Returns shopping cart product placed in
   * @return {(ShoppingCart|undefined)}
   */
  this.get = function() {
    return _productShoppingCart;
  };

  /**
   * Sets shopping cart product placed in
   * @param {ShoppingCart} shoppingCart instance of ShoppingCart
   * @return {Product}
   */
  this.add = function(shoppingCart) {
    if (shoppingCart instanceof ShoppingCart) {
      _productShoppingCart = shoppingCart;
      _logs.push(`${this.name} is added to ${_productShoppingCart.name} on ${getDate()}`);
    } else {
      console.error('add(shoppingCart) argument should be an instance of ShoppingCart');
    }

    return this;
  };

  /**
   * Removes shopping cart product placed in
   * @return {Product}
   */
  this.removeProduct = function(shoppingCart) {
    if (shoppingCart instanceof ShoppingCart) {
      _logs.push(`${this.name} is removed from ${_productShoppingCart.name} on ${getDate()}`);
      _productShoppingCart = null;
    } else {
      console.error('removeProduct(shoppingCart) argument should be an instance of ShoppingCart');
    }

    return this;
  };

  /**
   * Return array with the history logs
   * @return {string[]} array of log strings
   */
  this.getHistory = function() {
    return _logs;
  };
}

/**
 * Creates a new ShoppingCart
 * @class
 * @param name {string}
 * @param owner {string}
 * @param maxCount {number}
 * @constructor
 */
function ShoppingCart(name, owner, maxCount) {
  if (isValidString(name)) {
    this.name = name.trim();
  } else {
    console.error(`Wrong ShoppingCart name argument: expected not an empty string, \
${getArgumentInfo(name)} received.`);

    return;
  }

  if (isValidString(owner)) {
    this.owner = owner.trim();
  } else {
    console.error(`Wrong ShoppingCart owner argument: expected not an empty string, \
${getArgumentInfo(owner)} received.`);

    return;
  }

  if (Number.isInteger(maxCount)) {
    this.maxCount = maxCount;
  } else {
    console.error(`Wrong ShoppingCart maxCount argument: expected positive number, \
${getArgumentInfo(maxCount)} received.`);

    return;
  }

  const _products = [];
  const _logs = [`${this.name} was created on ${getDate()}`];

  /**
   * Adds new product to the shopping cart
   * @param product {Product}
   * @return {ShoppingCart}
   */
  this.addNewProduct = function(product) {
    if (product instanceof Product) {
      if (product.get()) {
        if (product.get().name !== this.name) {
          product.get().removeProduct(product);
        } else {
          return this;
        }
      }

      if (_products.length >= this.maxCount) {
        this.removeCheapestProduct();
      }

      product['dateOfAddingToCart'] = getDate();

      _products.push(product);
      product.add(this);

      _logs.push(`${product.name} was added to ${this.name} on ${product['dateOfAddingToCart']}`);
    } else {
      console.error('addNewProduct(product) argument should be an instance of Product');
    }

    return this;
  };

  /**
   * Removes product from the shopping cart
   * @param product {Product}
   * @return {ShoppingCart}
   */
  this.removeProduct = function(product) {
    if (product instanceof Product) {
      for (let i = 0; i < _products.length; i++) {
        if (_products[i].getProductId() === product.getProductId()) {
          _logs.push(`${product.name} was removed from ${this.name} on ${getDate()}`);
          _products.splice(i, 1);
          product.removeProduct(this);

          return this;
        }
      }

      _logs.push(`${product.name} was never added to ${this.name}`);
    } else {
      console.error('removeProduct(product) argument should be an instance of Product');
    }

    return this;
  };

  /**
   * Removes the cheapest product from the cart
   */
  this.removeCheapestProduct = function() {
    let minIndex = 0, minPrice = _products[0].getPrice();

    for (let i = 1; i < _products.length; i++) {
      if (_products[i].getPrice() < minPrice) {
        minPrice = _products[i].getPrice();
        minIndex = i;
      }
    }

    const cheapestProduct = _products[minIndex];
    _logs.push(`${cheapestProduct.name} will be removed to free up space for a new product`);

    this.removeProduct(cheapestProduct);
  };

  /**
   * Returns the average product price from the shopping cart
   * @return {number} the average products price
   */
  this.getAveragePrice = function() {
    return +(this.getTotalPrice() / _products.length).toFixed(2);
  };

  /**
   * Returns an array of shopping cart products
   * @return {Product[]}
   */
  this.getProducts = function() {
    return _products;
  };

  /**
   * Returns a list of products in format:
   * `${name} - is on ${shoppingCartName} from ${dateOfAddingToCart}. Detailed product description: ${productDescription}`
   * @return {string[]}
   */
  this.getFormattedListOfProducts = function() {
    return this.getProducts().map(product =>
        `${product.name} - is on ${this.name} from ${product['dateOfAddingToCart']}. \
Detailed product description: ${JSON.stringify(product.description)}`);
  };

  /**
   * Returns total price of the products from the shopping list
   * @return {number} total price
   */
  this.getTotalPrice = function() {
    return +_products.reduce((accumulator, current) => accumulator + current.getPrice(), 0).toFixed(2);
  };

  /**
   * Returns a list of history log
   * @return {string[]}
   */
  this.getHistory = function() {
    return _logs;
  };
}





/********************
 *     Code demo
 ********************/
const banana1 = new Product('banana1', {color: 'yellow', size: 'medium'}, 45);
const banana2 = new Product('banana2', {color: 'yellow', size: 'medium'}, 45);
const banana3 = new Product('banana3', {color: 'yellow', size: 'medium'}, 45);
const banana4 = new Product('banana4', {color: 'yellow', size: 'medium'}, 45);
const banana5 = new Product('banana5', {color: 'yellow', size: 'medium'}, 45);
const apple = new Product('apple', {color: 'red', size: 'small'}, 30);

const stevesShopCart = new ShoppingCart('stevesCart', 'Steve', 5);

stevesShopCart
  .addNewProduct(banana1)
  .addNewProduct(banana2)
  .addNewProduct(apple)
  .removeProduct(banana1);

console.log(
    'Cart history:', stevesShopCart.getHistory(),
    'Product history:', banana2.getHistory());

console.log('average price:', stevesShopCart.getAveragePrice());
console.log('total price:', stevesShopCart.getTotalPrice());

console.log('banana price:', banana2.getPrice());
banana2.setPrice(20).setPrice(100);

// let's make sure the cheaper apple is removed to free-up space for more bananas
stevesShopCart
  .addNewProduct(banana3)
  .addNewProduct(banana4)
  .addNewProduct(banana5)
  .addNewProduct(banana1);

console.log('Product history:', banana1.getHistory());

console.log(`${stevesShopCart.owner} products:`);
console.table(stevesShopCart.getFormattedListOfProducts());

stevesShopCart.addNewProduct('apple string'); // should show an error msg

// now let's try to create a new ShoppingCart and put there product from the Steve's cart
const olehShoppingCart = new ShoppingCart('Oleh Shopping Cart', 'Oleh', 3);

olehShoppingCart.addNewProduct(banana1); // put banana1 from steveCart to olehCart
olehShoppingCart.addNewProduct(banana1); // we don't add same banana twice to the same cart

console.log(`${olehShoppingCart.owner} products:`);
console.table(olehShoppingCart.getFormattedListOfProducts());

// let's check stevesShopCart for the last time
console.log(`${stevesShopCart.owner} products:`);
console.table(stevesShopCart.getFormattedListOfProducts());