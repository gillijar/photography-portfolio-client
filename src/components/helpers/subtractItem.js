export const subtractItem = (item) => {
  const existingItems = JSON.parse(localStorage.getItem("userCart"));

  const obj = [];

  const itemId = item._id;

  const itemCurrent = existingItems.find((item) => item._id === itemId);

  itemCurrent.quantity--;

  if (itemCurrent.quantity <= 0) {
    const indexOfItem = existingItems.findIndex((item) => item._id === itemId);
    existingItems.splice(indexOfItem, 1);
  }

  existingItems.forEach((item) => obj.push(item));

  localStorage.setItem("userCart", JSON.stringify(obj));
};
