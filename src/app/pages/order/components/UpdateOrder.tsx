import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "../order.model";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from '../../../appLayout/table/TableOrder/TableOrder.module.scss'
import { useRef, useState } from "react";
import fetchApi from "../../../fetchApi/fetchApi";
import apiLinks from "../../../utils/api-links";

export default function UpdateOrder({ data, setShowPopup, setNewOrder }: { setNewOrder: any, data: Order, setShowPopup: any }) {


    const updateInformation = useRef(null)
    const popupUpdateProduct = useRef(null)
    const icon = useRef(null)
    const icon2 = useRef(null)
    const [dataApi, setDataApi] = useState<Order>({
        "orderId": data.orderId,
        "orderDate": data.orderDate,
        "requiredDate": data.requiredDate,
        "shippedDate": data.shippedDate,
        "freight": data.freight,
        "shipName": data.shipName,
        "shipAddress": data.shipAddress,
        "shipCity": data.shipCity,
        "shipRegion": data.shipRegion,
        "shipPostalCode": data.shipPostalCode,
        "shipCountry": data.shipCountry
    })


    const handleUpdate = (e: any) => {
        e.preventDefault()
        const api = {
            url: apiLinks.admin.productManagement.orders.update + `/${data.orderId}`,
            method: 'put',
            data: dataApi
        }
        fetchApi(api)
            .then((res) => {
                if (res.status === 200) {
                    setShowPopup(false)
                    const api = {
                        url: apiLinks.admin.productManagement.orders.get,
                        method: 'get'
                    }
                    fetchApi(api)
                        .then((res) => {
                            setNewOrder(res.data)
                        })
                        .catch((reason) => {
                            console.log(reason);

                        })
                    alert('Update successfully')
                } else {
                    alert('Update unsuccessfully')
                }
            })
            .catch((reason) => {
                console.log(reason);

            })
    }

    const storeValue = (e: any) => {
        const value = { ...dataApi, [e.target.name]: e.target.value }
        setDataApi(value)
    }

    const handleRemove = (e: any) => {
        if (e.target === icon.current || e.target === icon2.current || e.target === popupUpdateProduct.current) {
            setShowPopup(false)
        }
    }

    return (
        <form onSubmit={handleUpdate}>
            <div className={style.popupUpdateProduct} ref={popupUpdateProduct} onClick={handleRemove}>
                <div className={style.updateInformation} ref={updateInformation}>
                    <div className={style.removeIcon} ref={icon}>
                        <FontAwesomeIcon className={style.icon} icon={faXmark} ref={icon2} fontSize={'30px'} />
                    </div>
                    <div>
                        <label>Order ID</label>
                        <input readOnly defaultValue={data.orderId} name="productId" />
                    </div>
                    <div>
                        <label>Order Date</label>
                        <input type="datetime-local" defaultValue={data.orderDate} name="orderDate" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Required Date</label>
                        <input type="datetime-local" defaultValue={data.requiredDate} name="requiredDate" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Shipped Date</label>
                        <input type="datetime-local" defaultValue={data.shippedDate} name="shippedDate" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Freight</label>
                        <input type="text" defaultValue={data.freight} name="freight" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Ship Name</label>
                        <input type="text" defaultValue={data.shipName} name="shipName" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Ship Address</label>
                        <input type="text" defaultValue={data.shipAddress} name="shipAddress" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Ship City</label>
                        <input type="text" defaultValue={data.shipCity} name="shipCity" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Ship Region</label>
                        <input type="text" defaultValue={data.shipRegion} name="shipRegion" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Ship Postal Code</label>
                        <input type="text" defaultValue={data.shipPostalCode} name="shipPostalCode" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Ship Country</label>
                        <input type="text" defaultValue={data.shipCountry} name="shipCountry" onChange={storeValue} />
                    </div>
                    <div>
                        <button type="submit">Update</button>
                    </div>
                </div>
            </div>

        </form>
    )
}