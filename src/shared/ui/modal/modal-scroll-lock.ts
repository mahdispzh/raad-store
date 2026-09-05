const activeModals = new Set<string>();

export function lockBodyScroll(id: string) {
  activeModals.add(id);
  document.body.style.overflow = "hidden";
}

export function unlockBodyScroll(id: string) {
  activeModals.delete(id);
  if (activeModals.size === 0) {
    document.body.style.overflow = "";
  }
}
