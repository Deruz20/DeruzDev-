export default function HelpPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Help & Support</h1>
      <div className="space-y-4">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-bold mb-2">How do I add a transaction?</h3>
          <p className="text-muted-foreground">Navigate to the 'Transactions' page. Fill in the details in the 'New Transaction' form and click 'Save Transaction'. Expenses should be entered with a negative number (e.g., -50000).</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-bold mb-2">How does the PIN lock work?</h3>
          <p className="text-muted-foreground">The first time you use the app, you set a 4-digit PIN. This PIN is stored in your browser. You will need to enter it every time you start a new session (i.e., open the app in a new tab). You can reset it from the 'Settings' page.</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-xl font-bold mb-2">How do I contact support?</h3>
          <p className="text-muted-foreground">For any issues or feedback, please send an email to <a href="mailto:biztracksupport@gmail.com" className="text-primary underline">biztracksupport@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
