import React, { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export interface ILineItem {
    product: IProduct;
    quantity: number;
    timestamp: number;
}

export interface IProduct {
    id: number;
    price: number;
}

export async function setItemFromStorage(item: ILineItem[]) {
    const { getItem, setItem } = useAsyncStorage('cart');
    await setItem(JSON.stringify(item));
};
export async function getItemFromStorage() {
    const { getItem, setItem } = useAsyncStorage('cart');
    const item = await getItem();
    console.log('item: ' + item);
    if (item != null) {
        return JSON.parse(item);
    } else {
        return [];
    }
};

export async function addToCart(product: IProduct, lineItems: ILineItem[]) {
    let newLineItems = [];
    if (lineItems.length > 0) {
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
    } else {
        const newData: ILineItem = {
            product: product,
            quantity: 1,
            timestamp: Date.now(),
        };
        newLineItems = [...await lineItems, newData];
    }
    setItemFromStorage(newLineItems.sort(function (a, b) {
        return a.timestamp - b.timestamp;
    })
        .reverse(),
    );
}

export async function removeFromCart(item: IProduct) {
    const [lineItems, setLineItems] = useState<ILineItem[]>([]);
    const itemList = getItemFromStorage();
    setLineItems(await itemList);
    setItemFromStorage(lineItems.filter((_item: { product: { id: number; }; }) => _item.product.id !== item.id));
};

export async function clearCart() {
    setItemFromStorage([]);
};

export async function cartSum(lineItems: ILineItem[]) {
    let sum = 0;
    lineItems?.forEach((item: { quantity: number; product: { price: number; }; }) => (sum += item.quantity * item.product.price));
    return sum;
};

export async function cartCount(lineItems: ILineItem[]) {
    let sum = 0;
    lineItems?.forEach((item: { quantity: number; }) => (sum += item.quantity));
    return sum;
};

