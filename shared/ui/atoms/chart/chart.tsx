import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  value: number;
}

interface ChartProps {
  data: ChartData[];
  title?: string;
  valueLabel?: string;
  color?: string;
  height?: number;
}

export function Chart({ 
  data, 
  title, 
  valueLabel = "Value", 
  color = "#3b82f6",
  height = 300 
}: ChartProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return value.toLocaleString();
    }
    // Round to 1 decimal place for smaller values (like weight)
    return value.toFixed(1);
  };

  // Calculate better Y-axis range for trend visibility
  const values = data.map(item => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;
  
  // Set Y-axis domain with padding for better trend visibility
  const yAxisDomain = [
    Math.max(0, minValue - range * 0.1), // 10% padding below min, but not below 0
    maxValue + range * 0.1 // 10% padding above max
  ];

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{label ? formatDate(label) : ''}</p>
          <p className="text-sm font-medium">
            {valueLabel}: {formatValue(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickFormatter={formatValue}
            domain={yAxisDomain}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 