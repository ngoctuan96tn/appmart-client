import React, { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export interface ILineItem {
    product: IProduct;
    quantity: number;
    timestamp: number;
}

export interface IProduct {
    id: number;
    name: string,
    image: string,
    price: number;
}

export default class CartProvider {
    static async setItemFromStorage(item: ILineItem[]) {
        const { getItem, setItem } = useAsyncStorage('cart');
        await setItem(JSON.stringify(item));
    };
    static async getItemFromStorage() {
        const { getItem, setItem } = useAsyncStorage('cart');
        const item = await getItem();
        console.log('item: ' + item);
        if (item != null) {
            return JSON.parse(item);
        } else {
            return [];
        }
    };
    
    static async addToCart(product: IProduct, lineItems: ILineItem[]) {
    
        if (lineItems) {
            let newLineItems = lineItems;
            let check = lineItems.findIndex((_item: { product: { id: any; }; }) => {
                return product.id === _item.product.id;
            });
    
            if (check === -1) {
                const newData: ILineItem = {
                    product: product,
                    quantity: 1,
                    timestamp: Date.now(),
                };
                newLineItems = [...await lineItems, newData];
            } else {
                newLineItems = [
                    ...lineItems.filter((_i: { product: { id: any; }; }) => _i.product.id !== product.id),
                    {
                        product: lineItems[check].product,
                        quantity: (lineItems[check].quantity += 1),
                        timestamp: lineItems[check].timestamp,
                    },
                ];
            }
            this.setItemFromStorage(newLineItems.sort(function (a, b) {
                return a.timestamp - b.timestamp;
            })
                .reverse(),
            );

            ToastAndroid.showWithGravityAndOffset('Đã thêm sản phẩm vào giỏ hàng!',
            ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50);
        }
    
    }
    
    static minusToCart(product: IProduct, lineItems: ILineItem[]) {
        let newLineItems = [];
        if (lineItems.length > 0) {
            let check = lineItems.findIndex((_item: { product: { id: any; }; }) => {
                return product.id === _item.product.id;
            });
            newLineItems = [
                ...lineItems.filter((_i: { product: { id: any; }; }) => _i.product.id !== product.id),
                {
                    product: lineItems[check].product,
                    quantity: (lineItems[check].quantity -= 1),
                    timestamp: lineItems[check].timestamp,
                },
            ];
    
            if (lineItems[check].quantity <= 0) {
                this.removeFromCart(product, lineItems);
            } else {
                this.setItemFromStorage(newLineItems.sort(function (a, b) {
                    return a.timestamp - b.timestamp;
                })
                    .reverse(),
                );
            }
            
        }
    }
    
    static removeFromCart(item: IProduct, lineItems: ILineItem[]) {
        this.setItemFromStorage(lineItems.filter((_item: { product: { id: number; }; }) => _item.product.id !== item.id));
    };
    
    static clearCart() {
        this.setItemFromStorage([]);
    };
    
    static cartSum(lineItems: ILineItem[]) {
        let sum = 0;
        lineItems?.forEach(
            (item: { quantity: number; product: { price: number; }; }) => 
            (sum += item.quantity * item.product.price));
        return sum;
    };
    
    static cartCount(lineItems: ILineItem[]) {
        let sum = 0;
        lineItems?.forEach((item: { quantity: number; }) => (sum += item.quantity));
        return sum;
    };
}


