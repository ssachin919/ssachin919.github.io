"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { diveDeeps } from "@/lib/story/dive-deeps";

type DivePanelContextValue = {
  openId: string | null;
  openDive: (id: string) => void;
  closeAll: () => void;
  isOpen: (id: string) => boolean;
  /** Keep panel alive while pointer moves from trigger → sidebar */
  cancelPendingClose: () => void;
  /** Close soon unless pointer enters the sidebar */
  scheduleClose: (delayMs?: number) => void;
  /** Pin open while pointer is inside the sidebar */
  setSidebarHovered: (hovered: boolean) => void;
};

const DivePanelContext = createContext<DivePanelContextValue | null>(null);

export function DivePanelProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sidebarHovered = useRef(false);

  const cancelPendingClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closeAll = useCallback(() => {
    cancelPendingClose();
    sidebarHovered.current = false;
    setOpenId(null);
  }, [cancelPendingClose]);

  const scheduleClose = useCallback(
    (delayMs = 180) => {
      cancelPendingClose();
      closeTimer.current = setTimeout(() => {
        if (!sidebarHovered.current) {
          setOpenId(null);
        }
        closeTimer.current = null;
      }, delayMs);
    },
    [cancelPendingClose]
  );

  const setSidebarHovered = useCallback(
    (hovered: boolean) => {
      sidebarHovered.current = hovered;
      if (hovered) {
        cancelPendingClose();
      } else {
        scheduleClose(120);
      }
    },
    [cancelPendingClose, scheduleClose]
  );

  const openDive = useCallback(
    (id: string) => {
      if (!diveDeeps[id]) return;
      cancelPendingClose();
      // Only one dive visible at a time
      setOpenId(id);
    },
    [cancelPendingClose]
  );

  const isOpen = useCallback((id: string) => openId === id, [openId]);

  const value = useMemo(
    () => ({
      openId,
      openDive,
      closeAll,
      isOpen,
      cancelPendingClose,
      scheduleClose,
      setSidebarHovered,
    }),
    [
      openId,
      openDive,
      closeAll,
      isOpen,
      cancelPendingClose,
      scheduleClose,
      setSidebarHovered,
    ]
  );

  return (
    <DivePanelContext.Provider value={value}>
      {children}
    </DivePanelContext.Provider>
  );
}

export function useDivePanel() {
  const ctx = useContext(DivePanelContext);
  if (!ctx) {
    throw new Error("useDivePanel must be used within DivePanelProvider");
  }
  return ctx;
}
