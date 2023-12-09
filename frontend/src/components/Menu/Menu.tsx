import React from "react";
import c from './Menu.module.scss'
import { Link } from "react-router-dom";
import { IMenuItem } from "types/types";
import { UrlPaths, menuItems } from "constants/AppConstants";
import TextUnderline from "components/TextUnderline/TextUnderline";
import { useAppSelector } from "hooks/reduxHooks";
import { UserRole } from "types/user_types";

interface IMenuProps {
    items?: IMenuItem[]
} 

const Menu: React.FC<IMenuProps> = ({ items }) => {
    //default items
    items = items ?? [...menuItems];
    const { role } = useAppSelector(state => state.user)
    if (role === UserRole.ADMIN && menuItems.length === items.length) {
        items.push({
            text: 'Панель администрации',
            url: UrlPaths.ADMIN,
        },)
    }

    return (
        <div className={c.nav}>
            <ul className={c.list}>
                {items?.map((item, idx) => (
                    <li className={c.item} key={idx}>
                        <Link className={c.link} to={item.url}> 
                            <TextUnderline underlineColor="#C1A300">
                                {item.text}
                            </TextUnderline>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Menu;
