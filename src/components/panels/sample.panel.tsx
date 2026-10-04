import { useState } from "react";
import { BasePanel, type BasePanelProps } from "./base.panel";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

type SamplePanelProps = Omit<BasePanelProps, 'children'>;

export function SamplePanel({ initialPosition, title }: Readonly<SamplePanelProps>) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState('');

  return (
    <BasePanel initialPosition={initialPosition} title={title}>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">Name</span>
        <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Type a name" />
      </label>
      <div className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">Amount: {amount}</span>
        <Slider value={amount} onValueChange={(value) => setAmount(Array.isArray(value) ? value[0] : value)} />
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">Notes</span>
        <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Write something" />
      </label>
    </BasePanel>
  )
}