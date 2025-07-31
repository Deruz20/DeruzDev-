'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- CHANGED LINES ---
// We are using relative paths to bypass the alias issue for now
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { CommandBar } from '../components/CommandBar';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';
// ---------------------

export default function Dashboard() {
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <span className="">OmniTrack</span>
          </Link>
          <Link href="/dashboard" className="text-foreground font-bold transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/invoices" className="text-muted-foreground transition-colors hover:text-foreground">
            Invoices
          </Link>
          <Link href="/expenses" className="text-muted-foreground transition-colors hover:text-foreground">
            Expenses
          </Link>
          <Link href="/inventory" className="text-muted-foreground transition-colors hover:text-foreground">
            Inventory
          </Link>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <button
            onClick={() => setIsCommandBarOpen(true)}
            className="ml-auto w-full max-w-[200px] whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Cmd + K
          </button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, DeruzDev!</h1>
            <p className="text-muted-foreground">Here's your business at a glance.</p>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4 md:gap-8 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <span className="text-muted-foreground">💰</span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  <AnimatedNumber to={4250.75} prefix="$" />
                </div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <span className="text-muted-foreground">👥</span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  <AnimatedNumber to={2350} prefix="+" />
                </div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <span className="text-muted-foreground">📈</span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  <AnimatedNumber to={12234} prefix="+" />
                </div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
              </Content>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      <CommandBar isOpen={isCommandBarOpen} setOpen={setIsCommandBarOpen} />
    </div>
  );
}
