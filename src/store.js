// Importando a função configureStore do Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Importando o cartReducer do arquivo CartSlice
import cartReducer from './CartSlice';

// Configurando a store do Redux
const store = configureStore({
  reducer: {
    cart: cartReducer,  // Vincula o cartReducer ao estado do carrinho
  },
});

export default store;

