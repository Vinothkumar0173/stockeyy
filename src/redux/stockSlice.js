import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 1, name: "Basmati Rice", category: "Grocery", quantity: 45, unit: "kg", price: 120 },
    { id: 2, name: "Sunflower Oil", category: "Grocery", quantity: 8, unit: "liters", price: 160 },
    { id: 3, name: "Milk", category: "Dairy", quantity: 30, unit: "liters", price: 55 },
    { id: 4, name: "Sugar", category: "Grocery", quantity: 5, unit: "kg", price: 48 }
  ],
  customers: [],
  bills: []
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        ...action.payload,
        id: Date.now()
      });
    },

    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    addCustomer: (state, action) => {
      state.customers.push({
        ...action.payload,
        id: Date.now()
      });
    },

    updateCustomer: (state, action) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      );

      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },

    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    },

    addBill: (state, action) => {
      const bill = action.payload;

      // Check that enough stock is available for every item.
      const hasEnoughStock = bill.items.every((item) => {
        const product = state.products.find(
          (product) => product.id === item.id
        );

        return (
          product &&
          Number(item.quantity) > 0 &&
          product.quantity >= Number(item.quantity)
        );
      });

      // Do not save the bill if the stock is insufficient.
      if (!hasEnoughStock) {
        return;
      }

      // Reduce stock after the bill is created.
      bill.items.forEach((item) => {
        const product = state.products.find(
          (product) => product.id === item.id
        );

        product.quantity -= Number(item.quantity);
      });

      state.bills.unshift({
        ...bill,
        id: Date.now()
      });
    },

    deleteBill: (state, action) => {
      state.bills = state.bills.filter(
        (bill) => bill.id !== action.payload
      );
    },

    importProducts: (state, action) => {
      action.payload.forEach((newProduct) => {
        const alreadyExists = state.products.some(
          (product) =>
            product.name.toLowerCase() === newProduct.name.toLowerCase()
        );

        if (!alreadyExists) {
          state.products.push({
            ...newProduct,
            id: Date.now() + state.products.length
          });
        }
      });
    },

    resetStock: () => initialState
  }
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addBill,
  deleteBill,
  importProducts,
  resetStock
} = stockSlice.actions;

export default stockSlice.reducer;