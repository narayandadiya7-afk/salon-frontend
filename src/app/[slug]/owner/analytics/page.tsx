'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Row, Col, Card, Tag, Button, Space, Table, Typography, Divider, Tooltip, Select, DatePicker, Progress, Rate,
} from 'antd';
import {
  BarChartOutlined, RiseOutlined, ArrowUpOutlined, ArrowDownOutlined,
  TeamOutlined, WalletOutlined, CalendarOutlined, ScissorOutlined,
  UserOutlined, DownloadOutlined, FilterOutlined, StarOutlined,
  PieChartOutlined, LineChartOutlined, RightOutlined,
} from '@ant-design/icons';
import OwnerLayout from '../../../../components/layout/OwnerLayout';
import PillFilter from '@/components/pill-filter';

const { Text } = Typography;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenueData = [285000, 312000, 298000, 341000, 365000, 352000, 384200, 378000, 395000, 410000, 398000, 425000];
const maxRevenue = Math.max(...revenueData);

const kpis = [
  {
    icon: <WalletOutlined />, label: 'Total Revenue', value: '₹3,84,200',
    trend: '+12.5%', up: true, vs: 'vs last month', color: '#7C1D3E',
  },
  {
    icon: <CalendarOutlined />, label: 'Total Bookings', value: '1,428',
    trend: '+8.3%', up: true, vs: 'vs last month', color: '#7C1D3E',
  },
  {
    icon: <TeamOutlined />, label: 'Customer Retention', value: '68.5%',
    trend: '+5.2%', up: true, vs: 'vs last month', color: '#7C1D3E',
  },
  {
    icon: <StarOutlined />, label: 'Avg. Rating', value: '4.8',
    suffix: <StarOutlined style={{ color: '#C9953F', fontSize: 14 }} />,
    trend: 'from 156 reviews', up: null, vs: '', color: '#C9953F',
  },
];

const serviceData = [
  { service: 'Haircut', bookings: 284, revenue: 426000, growth: 12 },
  { service: 'Facial', bookings: 196, revenue: 431000, growth: 8 },
  { service: 'Manicure', bookings: 168, revenue: 302000, growth: -3 },
  { service: 'Hair Coloring', bookings: 142, revenue: 497000, growth: 15 },
  { service: 'Massage Therapy', bookings: 98, revenue: 392000, growth: 5 },
  { service: 'Bridal Makeup', bookings: 52, revenue: 260000, growth: 22 },
];
const maxServiceBookings = Math.max(...serviceData.map(s => s.bookings));

const staffData = [
  { name: 'Ananya', role: 'Senior Stylist', bookings: 186, revenue: 279000, rating: 4.9, utilization: 92, color: '#7C1D3E' },
  { name: 'Rahul', role: 'Barber', bookings: 152, revenue: 182400, rating: 4.7, utilization: 78, color: '#C9953F' },
  { name: 'Priya', role: 'Esthetician', bookings: 138, revenue: 220800, rating: 4.8, utilization: 85, color: '#4A2D5E' },
  { name: 'Vikram', role: 'Colorist', bookings: 112, revenue: 201600, rating: 4.6, utilization: 71, color: '#1A5C5C' },
];

const retentionData = [
  { month: 'Jan', new: 86, returning: 52, rate: 60.5 },
  { month: 'Feb', new: 94, returning: 61, rate: 64.9 },
  { month: 'Mar', new: 78, returning: 52, rate: 66.7 },
  { month: 'Apr', new: 102, returning: 70, rate: 68.6 },
  { month: 'May', new: 88, returning: 62, rate: 70.5 },
  { month: 'Jun', new: 96, returning: 66, rate: 68.5 },
];

const peakHoursData = [
  { hour: '9 AM', bookings: 8 }, { hour: '10 AM', bookings: 24 },
  { hour: '11 AM', bookings: 32 }, { hour: '12 PM', bookings: 28 },
  { hour: '1 PM', bookings: 12 }, { hour: '2 PM', bookings: 22 },
  { hour: '3 PM', bookings: 30 }, { hour: '4 PM', bookings: 26 },
  { hour: '5 PM', bookings: 18 }, { hour: '6 PM', bookings: 10 },
  { hour: '7 PM', bookings: 6 },
];
const maxPeak = Math.max(...peakHoursData.map(p => p.bookings));

function RevenueBarChart() {
  const currentMonth = new Date().getMonth();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 200, paddingTop: 8 }}>
      {months.map((m, i) => {
        const isCurrent = i === currentMonth;
        const h = (revenueData[i] / maxRevenue) * 100;
        return (
          <Tooltip key={m} title={`${m}: ₹${revenueData[i].toLocaleString()}`}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{
                width: '100%', maxWidth: 40,
                height: `${Math.max(h, 6)}%`,
                borderRadius: '8px 8px 4px 4px',
                background: isCurrent
                  ? 'linear-gradient(180deg, #7C1D3E 0%, #4A2D5E 50%, #C9953F 100%)'
                  : 'linear-gradient(180deg, rgba(124,29,62,0.35) 0%, rgba(124,29,62,0.12) 100%)',
                transition: 'height 0.3s ease',
                position: 'relative',
                border: isCurrent ? '1px solid rgba(124,29,62,0.3)' : 'none',
              }}>
                {isCurrent && (
                  <div style={{
                    position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                    background: '#7C1D3E', color: '#fff', fontSize: 9, padding: '2px 8px',
                    borderRadius: 6, whiteSpace: 'nowrap', fontWeight: 600,
                  }}>
                    ₹{revenueData[i].toLocaleString()}
                  </div>
                )}
              </div>
              <Text style={{ fontSize: 10, color: isCurrent ? '#7C1D3E' : 'var(--theme-text-tertiary)', fontWeight: isCurrent ? 600 : 400 }}>{m}</Text>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}

function PeakHoursChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {peakHoursData.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text style={{ width: 40, fontSize: 11, color: 'var(--theme-text-secondary)', textAlign: 'right', flexShrink: 0 }}>{p.hour}</Text>
          <div style={{ flex: 1, height: 20, background: 'rgba(124,29,62,0.06)', borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              width: `${(p.bookings / maxPeak) * 100}%`,
              height: '100%',
              borderRadius: 10,
              background: p.bookings >= 30
                ? 'linear-gradient(90deg, #7C1D3E, #C9953F)'
                : p.bookings >= 20
                  ? 'linear-gradient(90deg, #7C1D3E, #4A2D5E)'
                  : 'linear-gradient(90deg, rgba(124,29,62,0.4), rgba(124,29,62,0.2))',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <Text style={{ width: 24, fontSize: 11, fontWeight: 600, color: 'var(--theme-text)' }}>{p.bookings}</Text>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ percentage, color, size = 80 }: { percentage: number; color: string; size?: number }) {
  const r = size / 2 - 6;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={6} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: size * 0.2, fontWeight: 700, fill: 'var(--theme-text)' }}>
        {percentage}%
      </text>
    </svg>
  );
}

const serviceColumns = [
  {
    title: 'Service', dataIndex: 'service', key: 'service',
    render: (name: string) => (
      <Space>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(124,29,62,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C1D3E', fontSize: 14 }}>
          <ScissorOutlined />
        </div>
        <Text strong style={{ fontSize: 13 }}>{name}</Text>
      </Space>
    ),
  },
  {
    title: 'Bookings', dataIndex: 'bookings', key: 'bookings',
    render: (val: number) => <Text style={{ fontSize: 13, fontWeight: 600 }}>{val}</Text>,
  },
  {
    title: 'Revenue', dataIndex: 'revenue', key: 'revenue',
    render: (val: number) => <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A5C5C' }}>₹{val.toLocaleString()}</Text>,
  },
  {
    title: 'Growth', dataIndex: 'growth', key: 'growth',
    render: (val: number) => (
      <Space size={4}>
        {val >= 0 ? <ArrowUpOutlined style={{ fontSize: 10, color: '#2D5E3A' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#7C1D3E' }} />}
        <Text style={{ fontSize: 12, fontWeight: 600, color: val >= 0 ? '#2D5E3A' : '#7C1D3E' }}>{val >= 0 ? '+' : ''}{val}%</Text>
      </Space>
    ),
  },
  {
    title: 'Popularity', key: 'popularity',
    render: (_: any, record: typeof serviceData[0]) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height: 6, background: 'rgba(124,29,62,0.1)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            width: `${(record.bookings / maxServiceBookings) * 100}%`,
            height: '100%', borderRadius: 3,
            background: 'linear-gradient(90deg, #7C1D3E, #C9953F)',
          }} />
        </div>
        <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{Math.round((record.bookings / maxServiceBookings) * 100)}%</Text>
      </div>
    ),
  },
];

const retentionColumns = [
  { title: 'Month', dataIndex: 'month', key: 'month', render: (m: string) => <Text strong style={{ fontSize: 12 }}>{m}</Text> },
  { title: 'New Customers', dataIndex: 'new', key: 'new', render: (v: number) => <Text style={{ fontSize: 12, fontWeight: 600 }}>{v}</Text> },
  { title: 'Returning', dataIndex: 'returning', key: 'returning', render: (v: number) => <Text style={{ fontSize: 12, fontWeight: 600, color: '#2D5E3A' }}>{v}</Text> },
  {
    title: 'Retention Rate', dataIndex: 'rate', key: 'rate',
    render: (v: number) => (
      <Space size={6}>
        <div style={{ width: 60, height: 6, background: 'rgba(124,29,62,0.1)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            width: `${v}%`, height: '100%', borderRadius: 3,
            background: v >= 68 ? 'linear-gradient(90deg, #2D5E3A, #4A2D5E)' : 'linear-gradient(90deg, #7C1D3E, #4A2D5E)',
          }} />
        </div>
        <Text style={{ fontSize: 12, fontWeight: 600, color: v >= 68 ? '#2D5E3A' : '#7C1D3E' }}>{v}%</Text>
      </Space>
    ),
  },
];

function AnalyticsContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const [activeChart, setActiveChart] = useState('revenue');

  const chartOptions = [
    { key: 'revenue', label: 'Revenue' },
    { key: 'bookings', label: 'Bookings' },
  ];

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Analytics &amp; Insights</h1>
          <p className="page-header-subtitle">Track your salon&apos;s performance and growth</p>
        </div>
        <Space>
          <Select
            defaultValue="6m"
            style={{ width: 140, borderRadius: 10 }}
            options={[
              { value: '1m', label: 'Last Month' },
              { value: '3m', label: 'Last 3 Months' },
              { value: '6m', label: 'Last 6 Months' },
              { value: '1y', label: 'Last Year' },
              { value: 'custom', label: 'Custom Range' },
            ]}
          />
          <Button icon={<FilterOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }} />
          <Button icon={<DownloadOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>
            Download Report
          </Button>
        </Space>
      </div>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        {kpis.map((kpi, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <div className="stat-widget" style={{ borderTop: `3px solid ${kpi.color}` }}>
              <div className="stat-widget-header">
                <div className="stat-widget-icon" style={{ background: `${kpi.color}12`, color: kpi.color }}>{kpi.icon}</div>
                <Tag style={{ borderRadius: 6, margin: 0, fontSize: 10, border: 'none', background: `${kpi.color}10`, color: kpi.color }}>
                  {kpi.vs}
                </Tag>
              </div>
              <div className="stat-widget-label">{kpi.label}</div>
              <div className="stat-widget-value" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {kpi.value}
                {kpi.suffix}
              </div>
              <div className={`stat-widget-trend ${kpi.up === true ? 'stat-widget-trend-up' : kpi.up === false ? 'stat-widget-trend-down' : ''}`}>
                {kpi.up === true && <ArrowUpOutlined />}
                {kpi.up === false && <ArrowDownOutlined />}
                {kpi.trend}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <Card
            className="premium-card"
            title={
              <Space>
                <LineChartOutlined style={{ color: '#7C1D3E' }} />
                <Text strong style={{ fontSize: 15 }}>Revenue Overview</Text>
              </Space>
            }
            extra={
              <PillFilter
                options={chartOptions}
                value={activeChart}
                onChange={setActiveChart}
              />
            }
          >
            <RevenueBarChart />
            <Divider style={{ margin: '16px 0 12px' }} />
            <Row gutter={[16, 12]}>
              <Col span={8}>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Total Revenue (YTD)</Text>
                <div><Text strong style={{ fontSize: 20 }}>₹{revenueData.reduce((a, b) => a + b, 0).toLocaleString()}</Text></div>
              </Col>
              <Col span={8}>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Monthly Average</Text>
                <div><Text strong style={{ fontSize: 20 }}>₹{Math.round(revenueData.reduce((a, b) => a + b, 0) / revenueData.length).toLocaleString()}</Text></div>
              </Col>
              <Col span={8}>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Projected Annual</Text>
                <div><Text strong style={{ fontSize: 20, color: '#7C1D3E' }}>₹{(revenueData.reduce((a, b) => a + b, 0) * 2).toLocaleString()}</Text></div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            className="premium-card"
            title={
              <Space>
                <PieChartOutlined style={{ color: '#C9953F' }} />
                <Text strong style={{ fontSize: 15 }}>Service Analytics</Text>
              </Space>
            }
            extra={<Button type="link" style={{ fontSize: 12 }}>View Details <RightOutlined /></Button>}
          >
            <Table
              columns={serviceColumns}
              dataSource={serviceData}
              rowKey="service"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            className="premium-card"
            title={
              <Space>
                <UserOutlined style={{ color: '#C9953F' }} />
                <Text strong style={{ fontSize: 15 }}>Staff Analytics</Text>
              </Space>
            }
            extra={<Button type="link" style={{ fontSize: 12, color: '#7C1D3E' }}>View All <RightOutlined /></Button>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {staffData.map((staff, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: i < staffData.length - 1 ? '1px solid var(--theme-border-light)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: `${staff.color}15`, color: staff.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, flexShrink: 0,
                    }}>
                      {staff.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ fontSize: 13 }}>{staff.name}</Text>
                        <Space size={3}>
                          <StarOutlined style={{ fontSize: 11, color: '#C9953F' }} />
                          <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{staff.rating}</Text>
                        </Space>
                      </div>
                      <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{staff.role}</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                    <div>
                      <Text style={{ fontSize: 10, color: 'var(--theme-text-tertiary)' }}>Bookings</Text>
                      <div><Text style={{ fontSize: 13, fontWeight: 600 }}>{staff.bookings}</Text></div>
                    </div>
                    <div>
                      <Text style={{ fontSize: 10, color: 'var(--theme-text-tertiary)' }}>Revenue</Text>
                      <div><Text style={{ fontSize: 13, fontWeight: 600, color: '#1A5C5C' }}>₹{staff.revenue.toLocaleString()}</Text></div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <Text style={{ fontSize: 10, color: 'var(--theme-text-tertiary)' }}>Utilization</Text>
                        <Text style={{ fontSize: 10, fontWeight: 600, color: staff.color }}>{staff.utilization}%</Text>
                      </div>
                      <Progress
                        percent={staff.utilization}
                        showInfo={false}
                        size="small"
                        strokeColor={staff.color}
                        trailColor="rgba(0,0,0,0.06)"
                        style={{ margin: 0 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <Card
            className="premium-card"
            title={
              <Space>
                <TeamOutlined style={{ color: '#2D5E3A' }} />
                <Text strong style={{ fontSize: 15 }}>Customer Retention</Text>
              </Space>
            }
            extra={
              <Space>
                {['6 Months', '12 Months'].map(t => (
                  <Tag key={t} style={{ borderRadius: 6, cursor: 'pointer', fontSize: 11, padding: '2px 10px', border: '1px solid var(--theme-border-light)' }}>{t}</Tag>
                ))}
              </Space>
            }
          >
            <div style={{ marginBottom: 16 }}>
              <Row gutter={24} align="middle">
                <Col span={6}>
                  <div style={{ textAlign: 'center' }}>
                    <DonutChart percentage={68.5} color="#2D5E3A" />
                    <div style={{ marginTop: 8 }}>
                      <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Overall Retention</Text>
                    </div>
                  </div>
                </Col>
                <Col span={18}>
                  <div style={{ display: 'flex', gap: 24 }}>
                    {[
                      { label: 'Total Customers', value: '1,284', color: '#7C1D3E' },
                      { label: 'Returning Rate', value: '68.5%', color: '#7C1D3E' },
                      { label: 'Avg. Visits/Month', value: '2.4', color: '#7C1D3E' },
                      { label: 'Churn Rate', value: '6.2%', color: '#4A2D5E' },
                    ].map((s, i) => (
                      <div key={i}>
                        <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{s.label}</Text>
                        <div><Text strong style={{ fontSize: 18, color: s.color }}>{s.value}</Text></div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <Table
              columns={retentionColumns}
              dataSource={retentionData}
              rowKey="month"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            className="premium-card"
            title={
              <Space>
                <BarChartOutlined style={{ color: '#C9953F' }} />
                <Text strong style={{ fontSize: 15 }}>Peak Hours</Text>
              </Space>
            }
            extra={
              <Tag style={{ borderRadius: 6, fontSize: 10, border: 'none', background: 'rgba(124,29,62,0.08)', color: '#7C1D3E' }}>
                Weekdays
              </Tag>
            }
          >
            <PeakHoursChart />
            <Divider style={{ margin: '16px 0 12px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Peak Hour</Text>
                <div><Text strong style={{ fontSize: 16, color: '#C9953F' }}>11 AM</Text></div>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>32 bookings</Text>
              </div>
              <div>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Total Daily</Text>
                <div><Text strong style={{ fontSize: 16 }}>{peakHoursData.reduce((a, p) => a + p.bookings, 0)}</Text></div>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>bookings</Text>
              </div>
              <div>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Avg/Hour</Text>
                <div><Text strong style={{ fontSize: 16 }}>{Math.round(peakHoursData.reduce((a, p) => a + p.bookings, 0) / peakHoursData.length)}</Text></div>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>bookings</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <OwnerLayout>
      <AnalyticsContent />
    </OwnerLayout>
  );
}
