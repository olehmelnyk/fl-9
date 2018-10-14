const findType = param => typeof param;

const forEach = (array, fn) => {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
};

const map = (array, fn) => {
  let newArray = [];

  forEach(array, el => newArray.push(fn(el)));

  return newArray;
};

const filter = (array, fn) => {
  let newArray = [];

  forEach(array, el => {
    if (fn(el)) {
      newArray.push(el);
    }
  });

  return newArray;
};

const getAdultAppleLovers = data =>
    map(filter(data, el => el.age > 18 && el.favoriteFruit === 'apple'),
        el => el.name);

const keys = obj => {
  let newArray = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArray.push(key);
    }
  }

  return newArray;
};

const values = obj => {
  let newArray = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArray.push(obj[key]);
    }
  }

  return newArray;
};

const showFormattedDate = date =>
    `It is ${date.getDate()} of ${date.toLocaleString('en-US',
        {month: 'short'})}, ${date.getFullYear()}`;
