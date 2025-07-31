import { CommandBar } from "@/components/CommandBar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AnimatedNumber,
  AnimatedNumberProps,
} from "@/components/ui/animated-number";

function StatCard(props: {
  title: string;
  value: AnimatedNumberProps["value"];
  prefix?: AnimatedNumberProps["prefix"];
  suffix?: AnimatedNumberProps["suffix"];
  description?: string;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <AnimatedNumber
          value={props.value}
          prefix={props.prefix}
          suffix={props.suffix}
        />
        {props.description && (
          <p className="text-sm text-muted-foreground">
            {props.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            Dashboard
          </Link>
        </nav>
        <CommandBar />
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={45231.89}
            prefix="$"
            description="+20.1% from last month"
          />
          <StatCard
            title="Subscriptions"
            value={2350}
            description="+19% from last month"
          />
          <StatCard
            title="Sales"
            value={12234}
            description="+20.1% from last month"
          />
          <StatCard
            title="Active Users"
            value={573}
            description="-1.2% from last month"
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            {/* Placeholder for future components */}
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            {/* Placeholder for future components */}
          </div>
        </div>
      </main>
    </div>
  );
}
