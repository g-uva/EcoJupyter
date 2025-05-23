import React from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { extent, max, bisector } from 'd3-array';
import { downSample, parseData } from '../helpers/utils';

const DATA: [number, string][] = [
  [1748003099, '11506255'],
  [1748003114, '8667375'],
  [1748003129, '8785718'],
  [1748003144, '8260875'],
  [1748003159, '8365529'],
  [1748003174, '8191266'],
  [1748003189, '8340772'],
  [1748003204, '8241948'],
  [1748003219, '8634274'],
  [1748003234, '8296539'],
  [1748003249, '8412432'],
  [1748003264, '8295945'],
  [1748003279, '8196637'],
  [1748003294, '8235686'],
  [1748003309, '8099462'],
  [1748003324, '8307168'],
  [1748003339, '8137289'],
  [1748003354, '8288042'],
  [1748003369, '8297089'],
  [1748003384, '8323724'],
  [1748003399, '8075509'],
  [1748003414, '8553690'],
  [1748003429, '8132247'],
  [1748003444, '8265408'],
  [1748003459, '8696485'],
  [1748003474, '8248823'],
  [1748003489, '8328812'],
  [1748003504, '8317332'],
  [1748003519, '8007114'],
  [1748003534, '8367513'],
  [1748003549, '8138316'],
  [1748003564, '8287620'],
  [1748003579, '8092524'],
  [1748003594, '8289738'],
  [1748003609, '8172890'],
  [1748003624, '8051259'],
  [1748003639, '8056532'],
  [1748003654, '8363207'],
  [1748003669, '8256609'],
  [1748003684, '8254819'],
  [1748003699, '8280893'],
  [1748003714, '8779748'],
  [1748003729, '8250784'],
  [1748003744, '8207528'],
  [1748003759, '9670125'],
  [1748003774, '8330373'],
  [1748003789, '8271472'],
  [1748003804, '8093784'],
  [1748003819, '8273187'],
  [1748003834, '8290853'],
  [1748003849, '8103126'],
  [1748003864, '8307747'],
  [1748003879, '10586641'],
  [1748003894, '9209481'],
  [1748003909, '8211338'],
  [1748003924, '8090819'],
  [1748003939, '8290267'],
  [1748003954, '8995024'],
  [1748003969, '8278404'],
  [1748003984, '8164664'],
  [1748003999, '8211655'],
  [1748004014, '9342939'],
  [1748004029, '10480284'],
  [1748004044, '8241027'],
  [1748004059, '8315443'],
  [1748004074, '9005683'],
  [1748004089, '8405667']
];

const margin = { top: 20, right: 30, bottom: 40, left: 60 };
const width = 700;
const height = 350;

interface IParsedDataPoint {
  date: Date;
  value: number;
}

const bisectDate = bisector<IParsedDataPoint, Date>(d => d.date).left;

type TimeSeriesLineChartProps = {
  rawData?: [number, string][];
};

// Scales
interface IParsedDataPoint {
  date: Date;
  value: number;
}

export default function TimeSeriesLineChart({
  rawData = DATA
}: TimeSeriesLineChartProps) {
  const [data, setData] = React.useState<IParsedDataPoint[]>([]);

  React.useEffect(() => {
    const data = downSample(parseData(rawData));
    setData(data);
  }, [rawData]);

  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } =
    useTooltip<IParsedDataPoint>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  function handleTooltip(event: React.MouseEvent<SVGRectElement>) {
    const { x: xPoint } = localPoint(event) || { x: 0 };
    const x0 = xScale.invert(xPoint as number);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d0) {
      d =
        x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime()
          ? d1
          : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(d.date),
      tooltipTop: yScale(d.value)
    });
  }
  const x = (d: IParsedDataPoint): Date => d.date;
  const y: (d: IParsedDataPoint) => number = (d: IParsedDataPoint): number =>
    d.value;

  const xExtent = extent(data, x);
  const xDomain: [Date, Date] =
    xExtent[0] && xExtent[1]
      ? [xExtent[0] as Date, xExtent[1] as Date]
      : [new Date(), new Date()];
  const xScale = scaleTime({
    domain: xDomain,
    range: [margin.left, width - margin.right]
  });

  const yMax = max(data, y) ?? 0;
  const yScale = scaleLinear({
    domain: [0, yMax],
    nice: true,
    range: [height - margin.bottom, margin.top]
  });

  const TooltipPortal = ({
    tooltipData
  }: {
    tooltipData: IParsedDataPoint | undefined;
  }) =>
    TooltipInPortal({
      top: tooltipTop,
      left: tooltipLeft,
      style: {
        backgroundColor: 'white',
        color: '#1976d2',
        border: '1px solid #1976d2',
        padding: '6px 10px',
        borderRadius: 4,
        fontSize: 13,
        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        maxWidth: '80px'
      },
      children: (
        <div>
          <div>
            <strong>{tooltipData?.value.toLocaleString()}</strong>
          </div>
          <div style={{ fontSize: 11, color: '#333' }}>
            {tooltipData?.date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      )
    }) as React.ReactNode;

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <Group>
          <LinePath
            data={data}
            x={d => xScale(x(d))}
            y={d => yScale(y(d))}
            stroke="#1976d2"
            strokeWidth={2}
            // curve={null}
          />
        </Group>
        <AxisLeft
          scale={yScale}
          top={0}
          left={margin.left}
          // label="Value"
          tickFormat={v => v.toLocaleString()}
          stroke="#888"
          tickStroke="#888"
          tickLabelProps={() => ({
            fill: '#333',
            fontSize: 12,
            textAnchor: 'end',
            dx: '-0.25em',
            dy: '0.25em'
          })}
        />
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          left={0}
          // label="Time"
          numTicks={6}
          tickFormat={date =>
            date instanceof Date
              ? date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : new Date(Number(date)).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })
          }
          stroke="#888"
          tickStroke="#888"
          tickLabelProps={() => ({
            fill: '#333',
            fontSize: 12,
            textAnchor: 'middle'
          })}
        />
        <rect
          width={width - margin.left - margin.right}
          height={height - margin.top - margin.bottom}
          fill="transparent"
          rx={14}
          x={margin.left}
          y={margin.top}
          onMouseMove={handleTooltip}
          onMouseLeave={hideTooltip}
        />
        {tooltipData ? (
          <g>
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={5}
              fill="#1976d2"
              stroke="#fff"
              strokeWidth={2}
              pointerEvents="none"
            />
          </g>
        ) : null}
      </svg>
      {tooltipData ? TooltipPortal({ tooltipData }) : null}
    </div>
  );
}
