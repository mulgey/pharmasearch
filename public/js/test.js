const selectedFilters = {
  color: ["Red", "Blue"],
  type: ["Shirt"],
  size: ["M"]
};

const items = [
  {
      name: "Item 1",
      filters: {
          color: ["Red", "Blue", "Black"],
          type: ["Shirt"],
          size: ["M"]
      }
  },
  {
      name: "Item 2",
      filters: {
          color: ["Red"],
          type: ["Pants"],
          size: ["M"]
      }
  }
];

const filterArr = Object.values(selectedFilters).flat();

const output = items.filter(({filters}) => {
  const objFilters = Object.values(filters).flat();
  return filterArr.every(val => objFilters.includes(val));
})
console.log(output);


for (let key in catBox) {
  searchObj.detailObj = [`${catBox[key]}`];
  // LET THE CODE DO THE MAGIC
  const filterEngine = Object.values(searchObj).flat();

  let result = rowData.filter(({filters}) => {
    const objFilters = Object.values(filters).flat();
    return filterEngine.every(val => objFilters.includes(val));
  });
}