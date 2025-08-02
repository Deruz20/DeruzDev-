'use client';

import { useRouter } from 'next/navigation';

export default function SettingsActions() {
  const router = useRouter();

  const handleResetPin = () => {
    if (confirm('Are you sure you want to reset your PIN? You will be asked to create a new one the next time you log in.')) {
      localStorage.removeItem('app_pin');
      alert('PIN has been reset.');
    }
  };

  const handleDeleteData = async () => {
    if (confirm('DANGER: Are you sure you want to permanently delete ALL your transaction data? This cannot be undone.')) {
      await fetch('/api/transactions/delete-all', { method: 'DELETE' });
      alert('All transaction data has been deleted.');
      router.refresh();
    }
  };

  return (
    <div className="p-6 bg-card rounded-lg border max-w-md">
      <h3 className="text-xl font-bold mb-4">Account Actions</h3>
      <div className="space-y-4">
        <p className="text-muted-foreground">Manage your application data and security.</p>
        <button onClick={handleResetPin} className="btn btn-secondary w-full">Reset PIN</button>
        <button onClick={handleDeleteData} className="btn btn-danger w-full">Delete All Transaction Data</button>
      </div>
    </div>
  );
}
