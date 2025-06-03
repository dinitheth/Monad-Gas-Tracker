import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BlockData } from '../types';

interface GasChartProps {
  data: BlockData[];
}

const GasChart: React.FC<GasChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-400">No data available for chart.</p>;
  }

  const chartData = data.map(block => ({
    // name: `Block ${block.blockNumber}`, // Tooltip will show blockNumber
    blockNumber: block.blockNumber,
    gasUsed: block.gasUsed,
    gasLimit: block.gasLimit,
  }));

  return (
    <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-2xl text-gray-300 border border-slate-700 h-[24rem] md:h-[30rem]">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-indigo-400">Gas Usage Trend (Last {data.length} Blocks)</h3>
      <ResponsiveContainer width="100%" height="90%"> {/* Adjusted height to accommodate title */}
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 30 }}> {/* Adjusted margins for responsiveness */}
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" strokeOpacity={0.5} />
          <XAxis dataKey="blockNumber"
                 tickFormatter={(value) => `${value}`}
                 tick={{ fill: '#A0AEC0', fontSize: '0.75rem' }} // Smaller ticks for dense data
                 axisLine={{ stroke: '#4A5568' }}
                 tickLine={{ stroke: '#4A5568' }}
                 label={{ value: "Block Number", position: "insideBottom", dy: 30, fill: '#A0AEC0', fontSize: '0.875rem' }}
                 height={60} // Increased height for label
          />
          <YAxis yAxisId="left"
                 tickFormatter={(value) => (value / 1000000).toFixed(1) + 'M'} // Format as millions
                 tick={{ fill: '#A0AEC0', fontSize: '0.75rem' }}
                 axisLine={{ stroke: '#4A5568' }}
                 tickLine={{ stroke: '#4A5568' }}
                 label={{ value: "Gas Used", angle: -90, position: "insideLeft", dx: -20, fill: '#A0AEC0', fontSize: '0.875rem' }}
          />
          <Tooltip
                formatter={(value: number, name: string) => [`${value.toLocaleString()} gas`, name.replace("gas", "Gas ")]}
                contentStyle={{ backgroundColor: 'rgba(26, 32, 44, 0.9)', border: '1px solid #4A5568', borderRadius: '0.375rem' }}
                labelStyle={{ color: '#E2E8F0', fontWeight: 'bold' }}
                itemStyle={{ color: '#A0AEC0' }}
                cursor={{ stroke: '#8884d8', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Legend wrapperStyle={{ color: '#A0AEC0', paddingTop: '10px' }} />
          <Line yAxisId="left" type="monotone" dataKey="gasUsed" stroke="#6366F1" strokeWidth={2} activeDot={{ r: 6, strokeWidth: 0 }} dot={false} name="Gas Used" />
          {/* Optional: Line for Gas Limit
          <Line yAxisId="left" type="monotone" dataKey="gasLimit" stroke="#82ca9d" strokeDasharray="5 5" name="Gas Limit" />
          */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GasChart;
