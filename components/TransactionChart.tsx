'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Transaction } from '@/app/dashboard/page'; // We import the Type from our page

// Register the necessary components for Chart.js
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface ChartProps {
  transactions: Transaction[];
}

export default function TransactionChart({ transactions }: ChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart instance if it exists to prevent memory leaks
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const monthlyData = transactions.reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString('default', { month: 'short' });
        acc[month] = acc[month] || { income: 0, expense: 0 };
        if (t.amount > 0) {
          acc[month].income += t.amount;
        } else {
          acc[month].expense += Math.abs(t.amount);
        }
        return acc;
      }, {} as Record<string, { income: number, expense: number }>);
      
      const labels = Object.keys(monthlyData);
      const incomeData = Object.values(monthlyData).map(d => d.income);
      const expenseData = Object.values(monthlyData).map(d => d.expense);

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              backgroundColor: '#22c55e', // Green
              borderRadius: 4,
            },
            {
              label: 'Expense',
              data: expenseData,
              backgroundColor: '#ef4444', // Red
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#9ca3af' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
              ticks: { color: '#9ca3af' },
              grid: { display: false }
            },
          },
          plugins: {
            legend: {
              labels: { color: '#e5e7eb' }
            }
          }
        },
      });
    }

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions]);

  return <div className="h-80"><canvas ref={chartRef}></canvas></div>;
}
