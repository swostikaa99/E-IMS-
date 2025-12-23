import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  className?: string;
}

const MetricCard = ({ title, value, change, changeLabel, icon: Icon, className }: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className={cn("metric-card opacity-0 animate-fade-in", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-accent">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
          isPositive ? "bg-accent text-primary" : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{changeLabel}</p>
    </div>
  );
};

export default MetricCard;