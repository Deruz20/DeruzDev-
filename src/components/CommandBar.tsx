'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/Command';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CommandBarProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandBar({ isOpen, setOpen }: CommandBarProps) {
  const [open, setInternalOpen] = useState(isOpen);
  const router = useRouter();

  useEffect(() => {
    setInternalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setInternalOpen(false);
    setOpen(false);
  };

  const runCommand = (callback: () => void) => {
    handleClose();
    callback();
  };

  return (
    <CommandDialog open={open} onOpenChange={handleClose}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <span className="mr-2">📊</span> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/invoices'))}>
            <span className="mr-2">🧾</span> Invoices
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/expenses'))}>
            <span className="mr-2">💸</span> Expenses
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/inventory'))}>
            <span className="mr-2">📦</span> Inventory
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push('/invoices/new'))}>
            <span className="mr-2">➕</span> Create New Invoice
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/expenses/new'))}>
            <span className="mr-2">➕</span> Log New Expense
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
