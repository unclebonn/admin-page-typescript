import { ProductDetails } from "../product.model"
import style from '../../../appLayout/table/TableProduct/TableProduct.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react"
import fetchApi from "../../../fetchApi/fetchApi"
import apiLinks from "../../../utils/api-links"
import { AxiosResponse } from "axios"





const UpdateProduct = ({ data, setShowPopup, setTd }: { setTd: any, data: ProductDetails, setShowPopup: any }) => {

    const icon = useRef(null)
    const icon2 = useRef(null)
    const updateInformation = useRef(null)
    const popupUpdateProduct = useRef<HTMLDivElement>(null!)
    const [dataApi, setDataApi] = useState<ProductDetails>({
        "productId": data.productId,
        "productName": data.productName,
        "quantityPerUnit": data.quantityPerUnit,
        "unitPrice": data.unitPrice,
        "unitsInStock": data.unitsInStock,
        "unitsOnOrder": data.unitsOnOrder,
        "reorderLevel": data.reorderLevel
    })

    const handleRemove = (e: any) => {
        if (e.target === icon.current || e.target === icon2.current || e.target === popupUpdateProduct.current) {
            setShowPopup(false)
        }
    }


    const handleUpdate = (e: any) => {
        const api = {
            url: apiLinks.admin.productManagement.product.update + `/${data.productId}`,
            method: 'put',
            data: dataApi
        }
        e.preventDefault();
        fetchApi(api)
            .then((res) => {
                if (res.status === 200) {
                    const api = {
                        url: apiLinks.admin.productManagement.product.get,
                        method: 'get',
                    }
                    fetchApi(api)
                        .then((product: AxiosResponse) => {
                            setTd(product.data)
                        })
                }

                setShowPopup(false)
                alert("Update successfully")
            })
            .catch((reason) => {
                console.log(reason);
            })
    }

    const storeValue = (e: any) => {
        setDataApi({ ...dataApi, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleUpdate}>
            <div className={style.popupUpdateProduct} ref={popupUpdateProduct} onClick={handleRemove}>
                <div className={style.updateInformation} ref={updateInformation}>
                    <div className={style.removeIcon} ref={icon}>
                        <FontAwesomeIcon icon={faXmark} ref={icon2} className={style.icon} />
                    </div>
                    <div>
                        <label>Product ID</label>
                        <input readOnly defaultValue={data.productId} name="productId" />
                    </div>
                    <div>
                        <label>Product Name</label>
                        <input defaultValue={data.productName} name="productName" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Quantity Per Unit</label>
                        <input defaultValue={data.quantityPerUnit} name="quantityPerUnit" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Unit Price</label>
                        <input type="number" defaultValue={data.unitPrice} name="unitPrice" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Unit In Stock</label>
                        <input type="number" defaultValue={data.unitsInStock} name="unitsInStock" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Unit On Order</label>
                        <input type="number" defaultValue={data.unitsOnOrder} name="unitsOnOrder" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Reorder Level</label>
                        <input type="number" defaultValue={data.reorderLevel} name="reorderLevel" onChange={storeValue} />
                    </div>
                    <div>
                        <label>Discontinued</label>
                        <input readOnly defaultValue={data.discontinued ? 'Out of stock' : 'Available'} />
                    </div>
                    <div>
                        <button type="submit">Update</button>
                    </div>
                </div>
            </div>

        </form>
    )
}



export default UpdateProduct