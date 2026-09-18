import React from 'react';
import { DonutChart, IChartProps, IChartDataPoint } from '@fluentui/react-charting';
import {
  ClockRegular,
  CheckmarkCircleRegular,
  WarningRegular,
} from '@fluentui/react-icons';

interface DocumentStatusProps {
  approvedCount?: number;
  pendingCount?: number;
}

export const DocumentStatusCard: React.FC<DocumentStatusProps> = ({
  approvedCount = 102,
  pendingCount = 103,
}) => {
  const total = approvedCount + pendingCount;
  const approvedPercent = Math.round((approvedCount / total) * 100);
  const pendingPercent = Math.round((pendingCount / total) * 100);

  // Colors matching the design
  const APPROVED_COLOR = '#0A7A1B'; // Forest Green
  const PENDING_COLOR = '#D83B01';  // Bright Rust / Orange-Red
  const BG_TRACK_COLOR = '#F3F2F1'; // Neutral light grey

  // Donut chart configuration
  const chartPoints: IChartDataPoint[] = [
    {
      legend: 'Approved',
      data: approvedCount,
      color: APPROVED_COLOR,
    },
    {
      legend: 'Pending Review',
      data: pendingCount,
      color: PENDING_COLOR,
    },
  ];

  const chartData: IChartProps = {
    chartTitle: 'Document Status',
    chartData: chartPoints,
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 720,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        border: '1px solid #EAEAEA',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
        padding: '24px 28px',
        boxSizing: 'border-box',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ClockRegular style={{ fontSize: 20, color: '#0078D4' }} />
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#323130',
            }}
          >
            Document Status (2 Values)
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            color: '#605E5C',
            fontWeight: 400,
          }}
        >
          Approved vs Pending
        </span>
      </div>

      {/* Main Body */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        {/* Left: Donut Chart Area */}
        <div
          style={{
            position: 'relative',
            width: 220,
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {/* Fluent UI Donut Chart */}
          <DonutChart
            data={chartData}
            innerRadius={72}
            hideLegend={true}
            hideTooltip={false}
            height={220}
            width={220}
            styles={{
              root: {
                width: 220,
                height: 220,
              },
            }}
          />

          {/* Centered Chart Text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#242424',
                lineHeight: 1.1,
              }}
            >
              {total}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.8px',
                color: '#605E5C',
                marginTop: 4,
              }}
            >
              DOCUMENTS
            </div>
          </div>
        </div>

        {/* Right: Legend Cards */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Card: Approved */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E8E8',
              borderRadius: 6,
              padding: '14px 18px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckmarkCircleRegular
                  style={{ fontSize: 18, color: APPROVED_COLOR }}
                />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#242424',
                  }}
                >
                  Approved
                </span>
              </div>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: APPROVED_COLOR,
                }}
              >
                {approvedCount}
              </span>
            </div>

            {/* Progress bar + percentage */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 6,
                  backgroundColor: BG_TRACK_COLOR,
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${approvedPercent}%`,
                    height: '100%',
                    backgroundColor: APPROVED_COLOR,
                    borderRadius: 3,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: '#605E5C',
                  minWidth: 36,
                  textAlign: 'right',
                }}
              >
                {approvedPercent}%
              </span>
            </div>
          </div>

          {/* Card: Pending Review */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E8E8',
              borderRadius: 6,
              padding: '14px 18px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <WarningRegular
                  style={{ fontSize: 18, color: PENDING_COLOR }}
                />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#242424',
                  }}
                >
                  Pending Review
                </span>
              </div>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: PENDING_COLOR,
                }}
              >
                {pendingCount}
              </span>
            </div>

            {/* Progress bar + percentage */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 6,
                  backgroundColor: BG_TRACK_COLOR,
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${pendingPercent}%`,
                    height: '100%',
                    backgroundColor: PENDING_COLOR,
                    borderRadius: 3,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: '#605E5C',
                  minWidth: 36,
                  textAlign: 'right',
                }}
              >
                {pendingPercent}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentStatusCard;
