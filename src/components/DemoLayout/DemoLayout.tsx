import React from "react";
import Sidenav from "../Sidenav/Sidenav";
import Topnav from "../Topnav/Topnav";

const DemoLayout = () => {
  return (
    <div className="flex h-[calc(100vh-32px)]">
      <Sidenav
        navItems={[{
          label: "Nav Item 1",
          icon: "arrow_forward_ios",
          active: true,
          href: "#",
        },
        {
          label: "Nav Item 2",
          icon: "arrow_forward_ios",
          active: false,
          href: "#",
        },]}
      />
      <div className="w-full">
        <Topnav
          walletAddress="GARX7YOCGEIOA5YQXCHA6ZM7764KLCFRVTTQJQZMPLJPCZKHY4KATVM3"
          onConnectWalletClick={() => {}}
          onDisconnectWalletClick={() => {}}
          navItems={[
            {
              label: "Services",
              href: "#",
            },
            {
              label: "AI Agents",
              href: "#",
            },
            {
              label: "Steven",
              href: "#",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DemoLayout;
