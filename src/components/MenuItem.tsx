import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { MenuItemType } from "../config/menu";

interface MenuItemProps{
    item : MenuItemType
}

export const MenuItem = ( {item} : MenuItemProps) => {
  return (
    <li>
      <Link to={item.path} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        {item.icon && <FontAwesomeIcon icon={item.icon} />}
        <span className="ms-3">{item.label}</span>
      </Link>
    </li>
  );
};