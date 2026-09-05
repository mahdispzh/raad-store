// _types/sidebar._types.ts
// ==================== تایپ‌های سایدبار (Sidebar) ====================
export interface MenuItem {
  icon: string;
  title: string;
  count?: number;
}

export interface SidebarProps {}

export interface SidebarIconMap {
  home: React.ComponentType<any>;
  order: React.ComponentType<any>;
  like: React.ComponentType<any>;
  comment: React.ComponentType<any>;
  location: React.ComponentType<any>;
  message: React.ComponentType<any>;
    ticket: React.ComponentType<any>;

  history: React.ComponentType<any>;
  profile: React.ComponentType<any>;
  exit: React.ComponentType<any>;
  pencil: React.ComponentType<any>;
}
