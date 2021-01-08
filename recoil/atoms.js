import { atom } from "recoil";

export const clickedProduct = atom({
    key: "clickedProduct",
    default: ""
})

export const currentUser = atom({
    key: "currentUser",
    default: {}
})