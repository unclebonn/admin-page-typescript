import React, { useState } from 'react'
import { ProductDetails } from '../../../pages/product/product.model'
import style from './TableProduct.module.scss'
import fetchApi from '../../../fetchApi/fetchApi'
import apiLinks from '../../../utils/api-links'
import { AxiosResponse } from 'axios'
import { log } from 'console'
import UpdateProduct from '../../../pages/product/components/UpdateProduct'
import ReactDOM from 'react-dom'




interface Table {
    th: string[],
    td: ProductDetails[],
    setTd: any
}
export default function TableData({ th, td, setTd }: Table) {


    const [id, setId] = useState('')
    // const [product, setProduct] = useState<ProductDetails | undefined>(undefined)
    const [flag, setFlag] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [update, setUpdate] = useState<ProductDetails>(undefined!)

    function handleSubmit(e: any) {
        e.preventDefault()
        const api = {
            url: apiLinks.admin.productManagement.product.get + `/${id}`,
            method: 'get'
        }

        fetchApi(api)
            .then((product: AxiosResponse) => {
                setFlag(false)
                setTd([product.data])
            })
            .catch((reason) => {
                setFlag(true)
            });



    }


    function handleRemove(e: number) {
        const api = {
            url: apiLinks.admin.productManagement.product.delete + `/${e}`,
            method: 'delete'
        }
        if (window.confirm('Do you want to delete')) {
            fetchApi(api)
                .then((res) => {
                    alert('Delete successfully')
                })
                .catch((reason) => {
                    console.log(reason);
                })
            const removeProduct = td.filter(item => item.productId != e)
            setTd(removeProduct)
        }

    }

    function handleUpdate(product: ProductDetails) {
        setUpdate(product)
        setShowPopup(true)
    }

    const ProductForm = ({ product }: { product: ProductDetails }) => {
        return (
            <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>{product.unitsOnOrder}</td>
                <td>{product.reorderLevel}</td>
                <td>{product.discontinued === false ? 'Available' : 'Out of stock'}</td>
                <td>
                    <button onClick={() => handleRemove(product.productId)}>Remove</button>
                </td>
                <td>
                    <button onClick={() => handleUpdate(product)}>Update</button>
                </td>
            </tr>
        )
    }



    return (
        <React.Fragment>

            {showPopup && <UpdateProduct setShowPopup={setShowPopup} data={update} setTd={setTd} />}
            <div className={style.findProduct}>
                <form onSubmit={handleSubmit}>
                    <input required type="number" placeholder='id of product' onChange={(e) => { setId(e.target.value) }} />
                    <button type='submit'>Find</button>
                </form>
            </div>
            <div className={style.table}>

                {flag ?
                    <h3>This item is not existed</h3>
                    :
                    <table border={1} cellSpacing={1} cellPadding={3}>
                        <thead>
                            <tr>
                                {th.map((item) => {
                                    return <th key={item}>{item}</th>
                                })}
                            </tr>

                        </thead>

                        <tbody>
                            {
                                td.map((item) => {
                                    return (
                                        <ProductForm key={item.productId} product={item} />

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