import type { PropsWithChildren } from "react";
import { BasePanel, type BasePanelPropBase } from "./base.panel";

export type SidePanelProps = BasePanelPropBase & PropsWithChildren;

export function SidePanel({ title, children, ...panelProps }: Readonly<SidePanelProps>) {
  return (
      <BasePanel
        dock="left"
        initialSize={{ width: 320, height: 0 }}
        title={title}
        {...panelProps}
      >
        {children}
      </BasePanel>
  )
}
