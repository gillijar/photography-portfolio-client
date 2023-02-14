// Setting up the cart handler. Definitely needs revised and will need to factor in things like quantity so that instead
// of another entire object being added it will just add to the quantity.
// !!!NEEDS REFACTORING!!! CODE WORKS BUT NEEDS TO BE CLEANER
export const addItem = (item) => {
  // Check to see if there are any existing items currently in the cart.
  const existingItems = JSON.parse(localStorage.getItem("userCart"));

  // Creating an empty array to push the data into which will be passed to the local storage function
  const obj = [];
  let itemObj;
  const itemId = item._id;

  // Checking to see if items already exist in cart so that we can push them to the array first which then be stored in the local storage
  if (existingItems) {
    // If there are existing items, we need to check and see if the current item already exists in the cart
    const itemCurrent = existingItems.find((item) => item._id === itemId);

    // If it does, we will add one to the total quantity and then set the itemObj as the newly mutated current item
    if (itemCurrent) {
      itemCurrent.quantity++;

      // itemObj = itemCurrent;
    }
    // If the item doesn't exist we will create a new one with a quantity of 1 and a whole new object will be placed into the array
    else {
      itemObj = {
        ...item,
        quantity: 1,
      };
      obj.unshift(itemObj);
    }

    // Finally we will push each existing item into the obj array and then push the new itemObj into it after
    existingItems.forEach((item) => obj.push(item));
  } else {
    itemObj = {
      ...item,
      quantity: 1,
    };
    obj.push(itemObj);
  }

  localStorage.setItem("userCart", JSON.stringify(obj));
};
