

export interface Order {
    readonly "orderId": number,
    "orderDate": string,
    "requiredDate": string,
    "shippedDate": string,
    "freight": number,
    "shipName": string,
    "shipAddress": string,
    "shipCity": string,
    "shipRegion"?: string,
    "shipPostalCode"?: string,
    "shipCountry": string,
    "orderDetails"?: any

}


export interface OrderDetail {

    readonly "orderId": number,
    "product": {
        readonly "productId": number,
        "productName": string,
        "quantityPerUnit": string,
        "unitPrice": number,
        "unitsInStock": number,
        "unitsOnOrder": number,
        "reorderLevel": number,
        "discontinued": boolean,
        "orderDetails": []
    },
    readonly "productId": number,
    "unitPrice": number,
    "quantity": number,
    "discount": number

}