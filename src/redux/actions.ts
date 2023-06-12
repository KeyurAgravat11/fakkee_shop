import { FoodItems } from '../appinterface';

export const addToCart = (item: FoodItems) => ({
  type: 'ADD_TO_CART',
  item,
});

export const removeItem = (item: FoodItems) => ({
  type: 'REMOVE_ITEM',
  item,
});
