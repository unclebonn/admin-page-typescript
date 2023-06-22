import React, { useEffect, useState } from "react"
import { Order, OrderDetail } from "../../../pages/order/order.model"
import style from './TableOrder.module.scss'
import apiLinks from "../../../utils/api-links"
import fetchApi from "../../../fetchApi/fetchApi"
import { AxiosResponse } from "axios"
import UpdateOrder from "../../../pages/order/components/UpdateOrder"
import ViewOrderDetail from "../../../pages/orderdetail/components/ViewOrderDetail"
import AddProduct from "../../../pages/orderdetail/components/AddProduct"
import { createBrowserHistory } from "history";

interface Table {
    th: string[],
    td: Order[],
    setNewOrder: any
}

interface LocationState {
    message?: string,
    data?: OrderDetail[],
    orderId?: number
}


export default function TableOrder({ th, td, setNewOrder }: Table) {

    const history = createBrowserHistory();
    const historyData: LocationState = history.location.state!
    const historyData2 = history.location
    const [id, setId] = useState('')
    const [orderId, setOrderId] = useState<number>(undefined!)
    const [flag, setFlag] = useState(false)
    const [showPopupUpdateOrder, setShowPopupUpdateOrder] = useState(false)
    const [showPopupOrderDetail, setShowPopupOrderDetail] = useState(false)
    const [update, setUpdate] = useState<Order>(undefined!)
    const [view, setView] = useState<OrderDetail[]>(undefined!)

    // popup information from the 'add product page'
    useEffect(() => {
        if (historyData2.state !== null) {
            if (historyData.message === 'showPopupOrderDetail') {
                setView(historyData.data!);
                setOrderId(historyData.orderId!)
                setShowPopupOrderDetail(true)
                history.replace('/order', { ...historyData2, state: null })
            }
        }
    }, [])

    // search order
    const handleSearch = (e: any) => {
        e.preventDefault()
        const api = {
            url: apiLinks.admin.productManagement.orders.get + `/${id}`,
            method: 'get'
        }

        fetchApi(api)
            .then((order: AxiosResponse) => {
                setNewOrder([order.data])
                setFlag(false)

            })
            .catch((reason) => {
                setFlag(true)
            })
    }

    // remove order
    const handleRemove = (e: number) => {
        if (window.confirm('Do you want to remove this order ? ')) {
            const removeOrder = td.filter(order => order.orderId !== e);
            const api = {
                url: apiLinks.admin.productManagement.orders.delete + `/${e}`,
                method: 'delete'
            }
            fetchApi(api)
                .then((res) => {
                    setNewOrder(removeOrder)
                })
                .catch((reason) => {
                    console.log(reason);

                })
        }

    }

    // update order
    const handleUpdate = (data: Order) => {
        setShowPopupUpdateOrder(true)
        setUpdate(data)
    }

    // view order detail
    const handleView = (orderId: number) => {
        const api = {
            url: apiLinks.admin.productManagement.orders.get + `/${orderId}`,
            method: 'get'
        }

        fetchApi(api)
            .then((order: AxiosResponse) => {
                setShowPopupOrderDetail(true)
                setView(order.data.orderDetails);
                setOrderId(orderId)

            })
            .catch((reason) => {
                setFlag(true)
            })
    }

    // component to render table
    const OrderForm = ({ data }: { data: Order }) => {
        return (
            <tr key={data.orderId}>
                <td>{data.orderId}</td>
                <td>{data.orderDate}</td>
                <td>{data.requiredDate}</td>
                <td>{data.shippedDate}</td>
                <td>{data.freight}</td>
                <td>{data.shipName}</td>
                <td>{data.shipAddress}</td>
                <td>{data.shipCity}</td>
                <td>{data.shipRegion}</td>
                <td>{data.shipPostalCode}</td>
                <td>{data.shipCountry}</td>
                <td>
                    <button onClick={() => handleRemove(data.orderId)}>remove</button>
                </td>
                <td>
                    <button onClick={() => handleUpdate(data)}>update</button>
                </td>
                <td>
                    <button onClick={() => handleView(data.orderId)}>view</button>
                </td>
            </tr>
        )
    }



    return (


        <React.Fragment>

            {showPopupUpdateOrder && <UpdateOrder setShowPopup={setShowPopupUpdateOrder} data={update} setNewOrder={setNewOrder} />}
            {showPopupOrderDetail && <ViewOrderDetail orderId={orderId} setShowPopupOrderDetail={setShowPopupOrderDetail} data={view} setView={setView} />}

            <div className={style.findProduct}>
                <form onSubmit={handleSearch}>
                    <input required type="number" placeholder='id of product' onChange={(e) => { setId(e.target.value) }} />
                    <button type='submit'>Find</button>
                </form>
            </div>




            <div className={style.table}>
                {flag ? <h3>This order is not existed</h3> :
                    <table border={1} cellSpacing={1} cellPadding={3}>
                        <thead>
                            <tr>
                                {th.map(th => {
                                    return <th key={th}>{th}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                td.map((td) => {
                                    return (
                                        <OrderForm key={td.orderId} data={td} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>

        </React.Fragment>
    )
}