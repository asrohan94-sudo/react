import { AuthContextProvider } from "./AuthContext";
//import { CartItemsContextProvider } from "./CartItemsContext";
import CombinedProvider from "./CombinedContext";
import { ShopContextProvider } from "./ShopContext";

export const AppContextProvider = CombinedProvider(
  AuthContextProvider,
  ShopContextProvider,
//  CartItemsContextProvider
);