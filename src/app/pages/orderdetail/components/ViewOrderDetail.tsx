import React, { Dispatch, useRef, useState } from 'react'
import style from './ViewOrderDetail.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Order, OrderDetail } from '../../order/order.model'
import fetchApi from '../../../fetchApi/fetchApi'
import apiLinks from '../../../utils/api-links'
import { AxiosResponse } from 'axios'
import AddProduct from './AddProduct'
import { Link } from 'react-router-dom'

interface Props {
    data: OrderDetail
}

export default function ViewOrderDetail({ setShowPopupOrderDetail, data, setView, orderId }: { orderId: number, setView: any, data: OrderDetail[], setShowPopupOrderDetail: any }) {

    const addProductData = {
        orderId: orderId
    }

    const popupUpdateProduct = useRef(null)
    const updateInformation = useRef(null)
    const icon = useRef(null)
    const icon2 = useRef(null)
    const [quantity, setQuantity] = useState<number>(undefined!)
    const quantityRef = useRef(quantity)

    const handleRemove = (e: any) => {
        if (e.target === popupUpdateProduct.current || e.target === icon.current || e.target === icon2.current) {
            setShowPopupOrderDetail(false)
        }
    }



    const handleUpdate = (orderId: number, productId: number) => {
        const api = {
            url: apiLinks.admin.productManagement.orderDetails.update + `?orderId=${orderId}&productId=${productId}`,
            method: 'patch',
            data: [
                {
                    "path": "/quantity",
                    "op": "replace",
                    "value": quantityRef.current
                }
            ]
        }
        fetchApi(api)
            .then((res) => {
                if (res.status === 200) {
                    const api = {
                        url: apiLinks.admin.productManagement.orders.get + `/${orderId}`,
                        method: 'get'
                    }

                    fetchApi(api)
                        .then((order: AxiosResponse) => {
                            setView(order.data.orderDetails);

                        })
                        .catch((reason) => {
                            console.log(reason);

                        })
                    alert('Update successfully')
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
    }

    const getQuantityChange = (e: any) => {
        quantityRef.current = e.target.value;
        console.log(quantityRef.current);

    }

    const OrderDetailForm: React.FC<Props> = (props) => {
        return (
            <tr key={props.data.productId}>
                <td>{props.data.product.productName}</td>
                <td>{props.data.product.quantityPerUnit}</td>
                <td>{props.data.product.unitPrice}</td>
                <td>
                    <input type='number' defaultValue={props.data.quantity} onClick={e => getQuantityChange(e)} />
                </td>
                <td>
                    <button onClick={() => handleUpdate(props.data.orderId, props.data.product.productId)}>Update</button>
                </td>
            </tr>
        )
    }

    return (

        <div className={style.popupUpdateProduct} ref={popupUpdateProduct} onClick={handleRemove}>

            <div className={style.updateInformation} ref={updateInformation}>
                <div className={style.removeIcon} ref={icon}>
                    <FontAwesomeIcon className={style.icon} icon={faXmark} ref={icon2} fontSize={'30px'} />
                </div>

                <div className={style.table}>
                    <table border={1} cellSpacing={1} cellPadding={6} style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity Per Unit</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Update Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((orderdetail) => {
                                return (
                                    <OrderDetailForm key={orderdetail.productId} data={orderdetail} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <Link to={`/order/addproduct`} state={addProductData}>
                        <button>+</button>
                    </Link>
                </div>
            </div>
        </div >


    )
}