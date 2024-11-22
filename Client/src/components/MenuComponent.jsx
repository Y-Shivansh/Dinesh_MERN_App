import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export function NestedMenu({ title, m1, m2, m3, mn1, mn2, mn3, m4 }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState(false);
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        navigate("/");
        location.reload()
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

 

  return (
    <Menu>
      <MenuHandler>
        <Button className="text-headingCol shadow-none bg-transparent font-light">
          {title}
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={() => navigate("/food-listings")}>{m1}</MenuItem>
        {/* <MenuItem onClick={() => navigate("/profile")}>{m2}</MenuItem> */}

        {/* Nested Menu */}
        <Menu
          placement="right-start"
          open={openMenu}
          handler={setOpenMenu}
          allowHover
          offset={15}
        >
          <MenuHandler className="flex items-center justify-between">
            <MenuItem>
              {m3}
              <ChevronUpIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${
                  openMenu ? "-rotate-90" : ""
                }`}
              />
            </MenuItem>
          </MenuHandler>
          <MenuList className="py-2">
            <MenuItem onClick={() => navigate("/profile")}>
              {mn1}
            </MenuItem>
            <MenuItem onClick={() => navigate("/profile/update-password")}>
              {mn2}
            </MenuItem>
            <MenuItem
              className="border-t-[0.5px] py-2 underline"
              onClick={handleLogout}
            >
              {mn3}
            </MenuItem>
          </MenuList>
        </Menu>
        <MenuItem onClick={() => navigate("/requests")}>{m4}</MenuItem>
      </MenuList>
    </Menu>
  );
}

