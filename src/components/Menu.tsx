import { useEffect } from "react";
import { MENU_ITEMS, MenuItemType } from "../config/menu";
import { useAuth } from "./context/AuthContext";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const { user } = useAuth();


  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {MENU_ITEMS.map((item: MenuItemType) => {
            if (user && item.roles.includes(user.role))
              return (<MenuItem item={item} />)
          })}
        </ul>
      </div>
    </aside>
  );
};
