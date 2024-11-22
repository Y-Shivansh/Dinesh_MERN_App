import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export function NestedMenu({title, m1,m2, m3, mn1,mn2,mn3,m4}) {
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <Menu className="">
      <MenuHandler>
        <Button className="text-headingCol shadow-none bg-transparent font-light"> {title} ▼</Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>{m1}</MenuItem>
        <MenuItem>{m2}</MenuItem>
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
            <MenuItem>{mn1}</MenuItem>
            <MenuItem>{mn2}</MenuItem>
            <MenuItem className="border-t-[0.5px] py-2 underline" >{mn3}</MenuItem>
          </MenuList>
        </Menu>
        <MenuItem>{m4}</MenuItem>
      </MenuList>
    </Menu>
  );
}
