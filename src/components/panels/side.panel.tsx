import { BasePanel, type BasePanelPropBase } from "./base.panel";

export type SidePanelProps = Omit<BasePanelPropBase, 'children'>;

export function SidePanel({ title, ...panelProps }: Readonly<SidePanelProps>) {
  return (
      <BasePanel
        dock="right"
        initialSize={{ width: 320, height: 0 }}
        title={title}
        {...panelProps}
      >
        <div className="w-full h-full flex flex-col gap-4 overflow-auto p-3">
          <h1>Hello, World!</h1>
        </div>
      </BasePanel>
  )
}