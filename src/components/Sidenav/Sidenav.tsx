import React from "react";
import classNames from "classnames";
import { SidenavItemProps, SidenavProps } from "@/types/ui/sidenav";

/**
 * Sidenav component for rendering a sidebar navigation menu.
 *
 * @component
 * @param {SidenavProps} props - Properties to configure the Sidenav component.
 * @param {Array<SidenavItemProps>} props.navItems - List of navigation items to be displayed.
 * @returns {React.ReactElement} The rendered Sidenav component.
 */
const Sidenav: React.FC<SidenavProps> = (props) => {
  const { navItems } = props;

  return (
    <div className="h-full px-6 bg-background border-r border-r-border-primary max-w-[302px]">
      {/* Logo */}
      <a href="/" className="flex py-3 mb-6 border-b border-b-border-primary">
        <img src="/layer_logo.svg" width={260} height={120} alt="LAYER Logo" />
      </a>

      {/* Navigation Items */}
      <ul className="space-y-2 font-medium">
        {navItems &&
          navItems.map((item: SidenavItemProps, index: number) => (
            <li key={index}>
              <a
                href={item.href}
                target={item.target}
                rel={
                  item.target === "_blank" ? "noopener noreferrer" : undefined
                } // Add rel attribute for security reasons when target is _blank
                className={classNames(
                  "flex items-center p-2 text-text-primary font-semibold text-base rounded-md cursor-pointer select-none hover:bg-background-interactive-hover",
                  { "!bg-background-interactive-selected": item.active }
                )}
              >
                {/* Icon */}
                <span className="material-icons text-text-primary mr-4">
                  {item.icon}
                </span>
                {/* Label */}
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidenav;
