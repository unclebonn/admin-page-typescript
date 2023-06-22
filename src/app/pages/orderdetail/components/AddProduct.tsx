import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order, OrderDetail } from "../../order/order.model";
import style from './AddProduct.module.scss'
import React, { useEffect, useRef, useState } from "react";
import { ProductDetails } from "../../product/product.model";
import apiLinks from "../../../utils/api-links";
import fetchApi from "../../../fetchApi/fetchApi";
import { AxiosResponse } from "axios";
import { Link, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";

interface Props {
    data: OrderDetail
}


export default function AddProduct() {

    // localStorage.setItem('popupData', JSON.stringify(productDetailsData.data)); // second method
    const icon = useRef(null)
    const icon2 = useRef(null)
    const link = useRef(null)
    const location = useLocation();
    const productDetailsData = location.state
    const history = createBrowserHistory()
    const [products, setProducts] = useState<ProductDetails[]>(undefined!)
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>(undefined!)





    // get product list and orderdetails of use
    useEffect(() => {
        const apiProduct =
        {
            url: apiLinks.admin.productManagement.product.get,
            method: 'get'
        }
        const apiOrder =
        {
            url: apiLinks.admin.productManagement.orders.get + `/${productDetailsData.orderId}`,
            method: 'get'
        }
        fetchApi(apiProduct)
            .then((res: AxiosResponse) => {
                setProducts(res.data)
            })
            .catch((reason) => {
                console.log(reason);
            })
        fetchApi(apiOrder)
            .then((res: AxiosResponse) => {
                setOrderDetails(res.data.orderDetails)
            })
            .catch((reason) => {
                console.log(reason);
            })
    }, [])

    // close the page and direct to page 'order'
    const handleExit = (e: any) => {
        const state = {
            message: 'showPopupOrderDetail',
            data: orderDetails,
            orderId: productDetailsData.orderId
        }
        if (e.target === icon.current || e.target === icon2.current || e.target === link.current) {
            history.push('/order', state)
        }
    }


    // add 'product' for order api 
    const createOrderDetails = async (product: ProductDetails) => {
        var status
        const api = {
            url: apiLinks.admin.productManagement.orderDetails.create,
            method: 'post',
            data: {
                "orderId": productDetailsData.orderId,
                "productId": product.productId,
                "unitPrice": product.unitPrice,
                "quantity": 1,
                "discount": 0
            }
        }
        try {
            const res = await fetchApi(api)
            status = res.status
        } catch (error) {
            console.log(error);
        }

        return status
    }

    // get 'order details' api 
    const getOrderDetails = () => {
        const apiOrder =
        {
            url: apiLinks.admin.productManagement.orders.get + `/${productDetailsData.orderId}`,
            method: 'get'
        }
        fetchApi(apiOrder)
            .then((res: AxiosResponse) => {
                setOrderDetails(res.data.orderDetails)
            })
            .catch((reason) => {
                console.log(reason);
            })
    }

    // update quantity api
    const updateQuantity = (product: ProductDetails, quantity: number) => {
        const api = {
            url: apiLinks.admin.productManagement.orderDetails.update + `?orderId=${productDetailsData.orderId}&productId=${product.productId}`,
            method: 'patch',
            data: [
                {
                    "path": "/quantity",
                    "op": "replace",
                    "value": quantity + 1
                }
            ]
        }

        fetchApi(api)
            .then((res) => {
                if (res.status === 200) {
                    getOrderDetails()
                }
            })
            .catch((reason) => {
                console.log(reason);

            })
    }

    const removeProduct = async (product: ProductDetails) => {
        var status
        const api = {
            url: apiLinks.admin.productManagement.orderDetails.delete + `?orderId=${productDetailsData.orderId}&productId=${product.productId}`,
            method: 'delete'
        }


        try {
            const res = await fetchApi(api)
            status = res.status
        } catch (error) {
            console.log(error);

        }

        return status
    }

    // handle onclick Add
    const handleAdd = async (product: ProductDetails) => {
        const getStatus = await createOrderDetails(product)

        if (getStatus === 201) {
            getOrderDetails()
        } else {
            const filterSameProduct = orderDetails.filter(item => item.product.productName === product.productName)
            const quantity = filterSameProduct[0].quantity
            updateQuantity(product, quantity)
        }




    }

    // handle onClick Remove
    const handleRemove = async (product: ProductDetails) => {
        const getStatus = await removeProduct(product);
        if (getStatus === 204) {
            getOrderDetails()
        }
    }


    // component to render 'order detail' table 
    const OrderDetailForm: React.FC<Props> = ({ data }) => {
        return (
            <tr>
                <td>{data.product.productName}</td>
                <td>{data.product.quantityPerUnit}</td>
                <td>{data.product.unitPrice}</td>
                <td>{data.quantity}</td>
                <td>
                    <button onClick={() => handleRemove(data)}>Remove</button>
                </td>
            </tr>
        )
    }

    return (
        <React.Fragment>
            <div>
                <div className={style.title}>
                    <h1>Shopping</h1>
                </div>
                <div className={style.listOfProduct}>
                    <table border={1} cellSpacing={1} cellPadding={6} style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity Per Unit</th>
                                <th>Price</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products !== undefined ?
                                products.map((product: ProductDetails) => {
                                    return (
                                        <tr key={product.productId}>
                                            <td>{product.productName}</td>
                                            <td>{product.quantityPerUnit}</td>
                                            <td>{product.unitPrice}</td>
                                            <td>
                                                <button onClick={() => handleAdd(product)}>Add</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                : <tr></tr>}
                        </tbody>
                    </table>
                </div>

            </div>


            <div className={style.popupAddProduct}>
                <div className={style.orderId}>
                    <h1>Order ID:  {productDetailsData.orderId}</h1>
                </div>

                <div className={style.updateInformation}>
                    <div>
                        <table border={1} cellSpacing={1} cellPadding={6} style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity Per Unit</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails !== undefined ?
                                    orderDetails.map((orderdetail: OrderDetail) => {
                                        return (
                                            <OrderDetailForm key={orderdetail.productId} data={orderdetail} />
                                        )
                                    }) : <tr></tr>}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={style.removeIcon} ref={icon} onClick={handleExit}>
                <Link className={style.link} to={'/order'} ref={link}>
                    <h2 ref={icon2}>X</h2>
                </Link>
            </div>
        </React.Fragment>
    )
}