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
