import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";
import { toast } from "react-toastify";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    const uniqe = _.uniqWith(updateCart, _.isEqual);
    set({ carts: uniqe });
    toast.success(`เพิ่ม ${product.title} ลงในตะกร้าเรียบร้อยแล้ว`);
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(newQuantity, 1) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    const removedProduct = get().carts.find((item) => item.id === productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));

    if (removedProduct) {
      toast.success(`ลบ ${removedProduct.title} ออกจากตะกร้าเรียบร้อยแล้ว`);
    }
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  actionLogin: async (form) => {
    const res = await axios.post("https://ecommerce-server-taupe.vercel.app/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => set({ carts: [] }),
});

const usePersist = {
  name: "ecom-storage",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
