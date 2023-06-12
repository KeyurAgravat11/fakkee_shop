import React, { useState } from 'react';
import { createContext } from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
// import { FoodItems } from "../appinterface";

export const DataContext = createContext<any>(null);
const store = createStore(rootReducer);


interface FoodItems {
  id: number;
  name: string;
  price: number;
  url: string;
  desc: string;
  rate: number;
  quantity:number;
}


interface AppState {
  topRated: FoodItems[];
  allCategories: FoodItems[];
  dishesNearYou: FoodItems[];
  cartItemCount: number;
  cartItems: FoodItems[];
}


function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    topRated: [
        {
            id: 1,
            name: "Cake",
            price: 100,
            url: "/assets/cake.jpg",
            desc: "Very tasty",
            rate: 4.1,
            quantity:1

          },
          {
            id: 2,
            name: "Noodles",
            price: 200,
            url: "/assets/noodles.jpg",
            desc: "Chilly",
            rate: 4.1,
            quantity:1
          },
          {
            id: 3,
            name: "Fries",
            price: 70,
            url: "/assets/fries.jpg",
            desc: "Crispy",
            rate: 4.2,
            quantity:1
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
            quantity:1
          },

          {
            id: 5,
            name: "Pizza",
            price: 400,
            url: "/assets/pizza.jpg",
            desc: "Very tasty",
            rate: 4.0,
            quantity:1
          },
          {
            id: 6,
            name: "Salad",
            price: 60,
            url: "/assets/salad.jpg",
            desc: "Very tasty",
            rate: 4.2,
            quantity:1
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
            quantity:1
          },
          {
            id: 8,
            name: "Soup",
            price: 50,
            url: "/assets/soup.jpg",
            desc: "Delicious",
            rate: 4.2,
            quantity:1
          },
          {
            id: 9,
            name: "Tacos",
            price: 110,
            url: "/assets/tacos.jpg",
            desc: "Awesome!!",
            rate: 4.4,
            quantity:1
          },
        ],
   
    cartItemCount: 0,
    cartItems: [],
  });

  const { topRated, allCategories, dishesNearYou, cartItemCount, cartItems } = state;
  
  const addToCart = (item: FoodItems) => {
    const data = { ...item, quantity: 1 };
    if (cartItems.length > 0) {
      const bool = cartItems.some((el) => el.id === item.id);
      if (bool) {
        const itemIndex = cartItems.findIndex((el) => el.id === item.id);
        const c = [...state.cartItems];
        if (c[itemIndex]["quantity"]) {
          c[itemIndex]["quantity"]! += 1;
        }
       
        setState((prevState) => {
          return { ...prevState, cartItems: c };
        });
      } else {
        setState((prevState) => {
          return { ...prevState, cartItems: [...state.cartItems, data] };
        });
      }
    } else {
      setState((prevState) => {
        return { ...prevState, cartItems: [...state.cartItems, data] };
      });
    }
    setState((prevState) => {
      return { ...prevState, cartItemCount: state.cartItemCount + 1 };
    });
  };

  const removeItem = (item: FoodItems) => {
    if (cartItems.length > 0) {
      let bool = state.cartItems.some((i) => i.id === item.id);
      if (bool) {
        let itemIndex = state.cartItems.findIndex((el) => el.id === item.id);
        const c = [...state.cartItems];
        if (cartItems[itemIndex]) {
          c.splice(itemIndex, 1);
          setState((prevState) => {
            return { ...prevState, cartItems: c };
          });
        } else {
          c[itemIndex]["quantity"]! -= 1;
          setState((prevState) => {
            return { ...prevState, cartItems: c };
          });
        }
        if (cartItemCount !== 0) {
          setState((prevState) => {
            return { ...prevState, cartItemCount: state.cartItemCount - 1 };
          });
        }
      }
    }
  };   
  return (
    <Provider store={store}>
      <DataContext.Provider
        value={{
          topRated,
          allCategories,
          dishesNearYou,
          cartItemCount,
          cartItems,
          addToCart,
          removeItem,
        }}
      >
        {children}
      </DataContext.Provider>
    </Provider>
  );
}

export default DataProvider;
