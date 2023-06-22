import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { OrderDetail } from '../../order/order.model';
import { ProductDetails } from '../../product/product.model';
import React, { useEffect, useRef, useState } from 'react';
import apiLinks from '../../../utils/api-links';
import fetchApi from '../../../fetchApi/fetchApi';
import style from './ProductSelectedMost.module.scss'


export default function ProductSelectedMost() {
    const [dataApi, setDataApi] = useState<ProductDetails[]>(undefined!)
    var data = undefined;
    const chartRef = useRef<HTMLDivElement>(null!)
    const barRef = useRef<any>(null!)
    const api = {
        url: apiLinks.admin.productManagement.product.get,
        method: 'get'
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await fetchApi(api)
                if (res.status === 200) {
                    setDataApi(res.data)
                }
            } catch (error) {
            }
        }
        fetch()
    }, [])

    if (dataApi !== undefined) {
        data = dataApi.map(product => {
            return {
                name: product.productName,
                amt: product.unitsOnOrder,
            }
        })
    }

    const chart: HTMLDivElement = chartRef.current
    const bar: HTMLDivElement = barRef.current

    if (chart !== null) {

        chart.addEventListener('wheel', (event: WheelEvent) => {
            event.preventDefault();
            const delta = event.deltaY;
            const chartWidth = chart.clientWidth;
            const barWidth = bar.scrollWidth;
            const maxScrollLeft = barWidth - chartWidth;
            chart.scrollLeft += delta;
            if (chart.scrollLeft < 0) {
                chart.scrollLeft = 0;
            } else if (chart.scrollLeft > maxScrollLeft) {
                chart.scrollLeft = maxScrollLeft;
            }
        });
    }


    return (
        <React.Fragment>
            <div className={style.title}>
                <h1>Product on Order</h1>
            </div>
            <div className={style.chart} ref={chartRef}>
                <div className={style.bar} ref={barRef}>
                    <BarChart width={10000} height={550} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={10} />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="amt" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
        </React.Fragment>



    )
}