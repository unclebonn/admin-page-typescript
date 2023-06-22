import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import style from './Appbar.module.scss'
import { useState } from "react"
import { NavLink } from "react-router-dom"


export default function Appbar() {
    const [hover, setHover] = useState(true)

    const handleHover = () => {
        setHover(!hover)
        const appbar = document.getElementById('appbar');
        if (appbar instanceof HTMLElement && hover) {
            appbar.style.display = "block"
        } else if (appbar instanceof HTMLElement) {
            appbar.style.display = "none"
        }
    }


    return (
        <div>
            <div className={style.logo}>
                <FontAwesomeIcon className={style.icon} icon={faGear} size={"2x"} onClick={handleHover} />
            </div>
            {hover && <div className={style.appbar} id="appbar">
                <div className={style.menu}>
                    <ul>
                        <li>
                            <div className={style.styleNavLink}>
                                <NavLink to="/product" >
                                    Product
                                </NavLink>

                            </div>
                        </li>
                        <li>
                            <div className={style.styleNavLink}>
                                <NavLink to="/order">
                                    Order
                                </NavLink>

                            </div>

                        </li>
                        {/* <li>
                            <NavLink className={style.styleNavLink} to="/orderdetail">
                                <p>Order Details</p>
                            </NavLink>
                        </li> */}
                        <li>
                            <div className={style.styleNavLink}>
                                Dashboard
                            </div>
                            <ul className={style.chart}>
                                <li>
                                    <NavLink className={style.styleNavLink} to="/dashboard">Product that most choose</NavLink>
                                </li>
                                <li>
                                    <NavLink className={style.styleNavLink} to="/dashboard">1234</NavLink>
                                </li>
                                <li>
                                    <NavLink className={style.styleNavLink} to="/dashboard">1234</NavLink>
                                </li>
                                <li>
                                    <NavLink className={style.styleNavLink} to="/dashboard">1234</NavLink>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </div>
                <div className={style.endInformation}>
                    Made by Anh Khoi
                </div>
            </div>}
        </div>
    )
}