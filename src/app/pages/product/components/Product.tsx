import React, { useEffect, useState } from "react";
import Appbar from "../../../appLayout/appbar/Appbar";
import TableData from "../../../appLayout/table/TableProduct/TableProduct";
import fetchApi from "../../../fetchApi/fetchApi";
import apiLinks from "../../../utils/api-links";
import { AxiosResponse } from "axios";
import { ProductDetails } from "../product.model";

const Product: React.FC = () => {

    const [td, setTd] = useState<ProductDetails[] | []>([]);
    const api = {
        url: apiLinks.admin.productManagement.product.get,
        method: 'get',
    }


    useEffect(() => {

        fetchApi(api)
            .then((product: AxiosResponse) => {
                setTd(product.data)
            })
            .catch((reason) => {
                console.log(reason);
            })




    }, [])

    const hanldeUpdateTd = (newTd: ProductDetails[]) => {
        setTd(newTd)
    }


    const th = [
        "productId",
        "productName",
        "quantityPerUnit",
        "unitPrice",
        "unitsInStock",
        "unitsOnOrder",
        "reorderLevel",
        "discontinued",
        "remove",
        "update"
    ]


    return (
        <React.Fragment>

            <Appbar />
            <TableData th={th} td={td} setTd={hanldeUpdateTd} />

        </React.Fragment>
    )
}


export default Product
