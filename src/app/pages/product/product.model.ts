export interface ProductDetails {
    readonly "productId": number,
    "productName"?: string,
    "quantityPerUnit"?: string,
    "unitPrice"?: number,
    "unitsInStock"?: number,
    "unitsOnOrder"?: number,
    "reorderLevel"?: number,
    "discontinued"?: boolean,
    "orderDetails"?: object
}