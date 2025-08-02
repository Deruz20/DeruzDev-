'use client';

import { useState } from 'react';

export default function InvoiceGenerator() {
  const [invoiceHtml, setInvoiceHtml] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const client = formData.get('client') as string;
    const item = formData.get('item') as string;
    const price = Number(formData.get('price'));
    const currencyFormatter = new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', minimumFractionDigits: 0 });

    const generatedHtml = `
      <div class="p-8 border rounded-lg bg-background">
        <h2 class="text-2xl font-bold mb-4">Invoice</h2>
        <p class="mb-2"><strong>Bill To:</strong> ${client}</p>
        <hr class="my-4 border-border" />
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left font-semibold">Item / Service</th>
              <th class="text-right font-semibold">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${item}</td>
              <td class="text-right">${currencyFormatter.format(price)}</td>
            </tr>
          </tbody>
        </table>
        <hr class="my-4 border-border" />
        <p class="text-right text-xl font-bold">Total: ${currencyFormatter.format(price)}</p>
      </div>
    `;
    setInvoiceHtml(generatedHtml);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="p-6 bg-card rounded-lg border">
        <h3 className="text-xl font-bold mb-4">Invoice Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group"><label>Client Name</label><input name="client" type="text" className="form-input" required /></div>
          <div className="form-group"><label>Item/Service Description</label><input name="item" type="text" className="form-input" required /></div>
          <div className="form-group"><label>Price (UGX)</label><input name="price" type="number" step="any" className="form-input" required /></div>
          <button type="submit" className="btn w-full">Generate Invoice</button>
        </form>
      </div>
      <div className="p-6 bg-card rounded-lg border">
        <h3 className="text-xl font-bold mb-4">Preview</h3>
        <div id="invoice-output" dangerouslySetInnerHTML={{ __html: invoiceHtml || '<p class="text-muted-foreground">Your generated invoice will appear here.</p>' }}></div>
        {invoiceHtml && (
          <button onClick={() => window.print()} className="btn w-full mt-4">Print / Save as PDF</button>
        )}
      </div>
    </div>
  );
}
