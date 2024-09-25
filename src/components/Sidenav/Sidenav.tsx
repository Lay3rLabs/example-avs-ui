import React from "react";
import classNames from "classnames";

export interface SidenavItemProps {
  label: string;
  icon: any;
  active: boolean;
  href: string;
  target?: string;
}

export interface SidenavProps {
  navItems: SidenavItemProps[];
}

const Sidenav: React.FC<SidenavProps> = (props) => {
  return (
    <div className="h-full px-6 bg-background border-r border-r-border-primary max-w-[302px] min-h-screen">
      <a href="/" className="flex py-3 mb-6 border-b border-b-border-primary">
        <img src="/layer_logo.svg" alt="LAYER Logo" />
      </a>
      <ul className="space-y-2 font-medium">
        {props.navItems &&
          props.navItems.map((item: SidenavItemProps, index: number) => (
            <li key={index}>
              <a
                className={classNames(
                  "flex items-center p-2 text-text-primary font-semibold text-base rounded-md cursor-pointer select-none hover:bg-background-interactive-hover",
                  { "!bg-background-interactive-selected": item.active }
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidenav;
