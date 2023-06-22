
const authUrl = "http://localhost:5170"

const apiLinks = {
    admin: {
        productManagement: {
            product: {
                get: `${authUrl}/api/Products`,
                create: `${authUrl}/api/Products`,
                delete: `${authUrl}/api/Products`,
                update: `${authUrl}/api/Products`,
            },
            orders: {
                get: `${authUrl}/api/Orders`,
                create: `${authUrl}/api/Orders`,
                update: `${authUrl}/api/Orders`,
                delete: `${authUrl}/api/Orders`
            },
            orderDetails: {
                get: `${authUrl}/api/OrderDetails`,
                create: `${authUrl}/api/OrderDetails`,
                delete: `${authUrl}/api/OrderDetails`,
                update: `${authUrl}/api/OrderDetails`,
            }

        }
    }
}


export default apiLinks