import { combineReducers } from 'redux';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  url: string;
  desc: string;
  rate: number;
}

interface AppState {
  topRated: FoodItem[];
  allCategories: FoodItem[];
  dishesNearYou: FoodItem[];
  cartItemCount: number;
  cartItems: FoodItem[];
}

const initialState: AppState = {
  topRated: [
    {
        id: 1,
        name: "Cake",
        price: 100,
        url: "/assets/cake.jpg",
        desc: "Very tasty",
        rate: 4.1,
      },
      {
        id: 2,
        name: "Noodles",
        price: 200,
        url: "/assets/noodles.jpg",
        desc: "Chilly",
        rate: 4.1,
      },
      {
        id: 3,
        name: "Fries",
        price: 70,
        url: "/assets/fries.jpg",
        desc: "Crispy",
        rate: 4.2,
      },
    ],
    allCategories: [
      {
        id: 4,
        name: "Macroni",
        price: 150,
        url: "/assets/macroni.jpg",
        desc: "Yummy",
        rate: 4.5,
      },
      {
        id: 5,
        name: "Pizza",
        price: 400,
        url: "/assets/pizza.jpg",
        desc: "Very tasty",
        rate: 4.0,
      },
      {
        id: 6,
        name: "Salad",
        price: 60,
        url: "/assets/salad.jpg",
        desc: "Very tasty",
        rate: 4.2,
      },
    ],
    dishesNearYou: [
      {
        id: 7,
        name: "Samosa",
        price: 20,
        url: "/assets/samosa.jpg",
        desc: "Very tasty",
        rate: 4.2,
      },
      {
        id: 8,
        name: "Soup",
        price: 50,
        url: "/assets/soup.jpg",
        desc: "Delicious",
        rate: 4.2,
      },
      {
        id: 9,
        name: "Tacos",
        price: 110,
        url: "/assets/tacos.jpg",
        desc: "Awesome!!",
        rate: 4.4,
      },
    ],
  
  cartItemCount: 0,
  cartItems: [],
};

interface AddToCartAction {
  type: 'ADD_TO_CART';
  item: FoodItem;
}

interface RemoveItemAction {
  type: 'REMOVE_ITEM';
  item: FoodItem;
}

type ActionTypes = AddToCartAction | RemoveItemAction;

const cartReducer = (state: AppState = initialState, action: ActionTypes): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART':
        const itemIndex = state.cartItems.findIndex((el) => el.id === action.item.id);
        if (itemIndex !== -1) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[itemIndex];
          return { ...state, cartItems: updatedCartItems };
        } else {
          return { ...state, cartItems: [...state.cartItems, { ...action.item }] };
        }
        
      case 'REMOVE_ITEM':
        const itemToRemoveIndex = state.cartItems.findIndex((el) => el.id === action.item.id);
        if (itemToRemoveIndex !== -1) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems.splice(itemToRemoveIndex, -1);
          return { ...state, cartItems: updatedCartItems };
        }
        break;
      
 
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
