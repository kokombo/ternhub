"use client";

import { NavigationBar, Sidebar } from "@/containers";
import { Fragment, useState } from "react";

const NavAndSidebarWrapper = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const openSidebar = () => setSidebarIsOpen(true);

  const closeSidebar = () => setSidebarIsOpen(false);
  return (
    <Fragment>
      <NavigationBar openSidebar={openSidebar} />
      <Sidebar sidebarIsOpen={sidebarIsOpen} closeSidebar={closeSidebar} />
    </Fragment>
  );
};

export default NavAndSidebarWrapper;
