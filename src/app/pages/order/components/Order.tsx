import React, { useEffect, useState } from "react";
import Appbar from "../../../appLayout/appbar/Appbar";
import fetchApi from "../../../fetchApi/fetchApi";
import apiLinks from "../../../utils/api-links";
import { AxiosResponse } from "axios";
import TableOrder from "../../../appLayout/table/TableOrder/TableOrder";


export default function Order() {

    const [order, setOrder] = useState([])

    const api = {
        url: apiLinks.admin.productManagement.orders.get,
        method: 'get',
    }

    const th = [
        "orderId",
        "orderDate",
        "requiredDate",
        "shippedDate",
        "freight",
        "shipName",
        "shipAddress",
        "shipCity",
        "shipRegion",
        "shipPostalCode",
        "shipCountry",
        "remove",
        "update",
        "view order detail",
    ]

    useEffect(() => {        
        fetchApi(api)
            .then((order: AxiosResponse) => {
                setOrder(order.data)
            })
            .catch((reason) => {
                console.log(reason);

            })
    }, [])

    return (
        <React.Fragment>
            <Appbar />
            <TableOrder th={th} td={order} setNewOrder={setOrder} />
        </React.Fragment>
    )
}



