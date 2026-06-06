'use client';

import React, { useEffect, useState } from 'react';
import { Card, Switch, TimePicker, InputNumber, Button, Typography, Spin, Row, Col, Divider } from 'antd';
import { ClockCircleOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import apiUtil from '../../../../utils/api';
import { ApiOwnerSalon, ApiUpdateWorkingHours } from '../../../../utils/api.constant';
import { notification } from '../../../../utils/notification';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text } = Typography;

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface DaySlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const DEFAULT_SLOTS: DaySlot[] = DAY_NAMES.map((_, i) => ({
  dayOfWeek: i,
  startTime: '09:00',
  endTime: '19:00',
  isAvailable: i !== 0, // Sunday closed by default
}));

export default function AvailabilityPage() {
  const [salonId, setSalonId] = useState<string | null>(null);
  const [slots, setSlots] = useState<DaySlot[]>(DEFAULT_SLOTS);
  const [slotDuration, setSlotDuration] = useState(30);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSalon();
  }, []);

  const fetchSalon = async () => {
    try {
      setLoading(true);
      const res = await apiUtil.get(ApiOwnerSalon);
      const rc = res?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        setSalonId(res.data.id);
        setSlotDuration(res.data.slotDurationMinutes || 30);
        if (res.data.timeSlots && res.data.timeSlots.length > 0) {
          const merged = DEFAULT_SLOTS.map((def) => {
            const existing = res.data.timeSlots.find((s: DaySlot) => s.dayOfWeek === def.dayOfWeek);
            return existing || def;
          });
          setSlots(merged);
        }
      }
    } catch {
      notification.error('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const updateSlot = (dayOfWeek: number, field: keyof DaySlot, value: any) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.dayOfWeek === dayOfWeek ? { ...slot, [field]: value } : slot
      )
    );
  };

  const handleSave = async () => {
    if (!salonId) return;
    try {
      setSaving(true);
      const res = await apiUtil.put(ApiUpdateWorkingHours(salonId), {
        workingHours: slots,
        slotDurationMinutes: slotDuration,
      });
      const rc = res?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        notification.success(res?.dataResponse?.description || 'Availability updated successfully!');
      } else {
        notification.error(res?.dataResponse?.description || 'Failed to update availability');
      }
    } catch {
      notification.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          Availability
        </Title>
        <Text type="secondary">Set your working hours and appointment slot duration</Text>
      </div>

      {/* Slot Duration */}
      <Card style={{ borderRadius: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Text strong style={{ fontSize: 16 }}>Appointment Slot Duration:</Text>
          <InputNumber
            value={slotDuration}
            onChange={(val) => setSlotDuration(val || 30)}
            min={15}
            max={120}
            step={15}
            suffix="minutes"
            style={{ width: 160 }}
            size="large"
          />
          <Text type="secondary">Each booking slot will be {slotDuration} minutes long</Text>
        </div>
      </Card>

      {/* Working Hours */}
      <Card style={{ borderRadius: 12 }} title="Working Hours">
        {slots.map((slot, index) => (
          <div key={slot.dayOfWeek}>
            <Row align="middle" gutter={[16, 8]} style={{ padding: '12px 0' }}>
              <Col xs={24} sm={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Switch
                    checked={slot.isAvailable}
                    onChange={(checked) => updateSlot(slot.dayOfWeek, 'isAvailable', checked)}
                  />
                  <Text strong style={{ color: slot.isAvailable ? '#333' : '#bbb', minWidth: 90 }}>
                    {DAY_NAMES[slot.dayOfWeek]}
                  </Text>
                </div>
              </Col>

              {slot.isAvailable ? (
                <Col xs={24} sm={18}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <TimePicker
                      value={dayjs(slot.startTime, 'HH:mm')}
                      format="HH:mm"
                      minuteStep={15}
                      onChange={(time: Dayjs | null) => {
                        if (time) updateSlot(slot.dayOfWeek, 'startTime', time.format('HH:mm'));
                      }}
                      size="large"
                    />
                    <Text type="secondary">to</Text>
                    <TimePicker
                      value={dayjs(slot.endTime, 'HH:mm')}
                      format="HH:mm"
                      minuteStep={15}
                      onChange={(time: Dayjs | null) => {
                        if (time) updateSlot(slot.dayOfWeek, 'endTime', time.format('HH:mm'));
                      }}
                      size="large"
                    />
                  </div>
                </Col>
              ) : (
                <Col xs={24} sm={18}>
                  <Text type="secondary" style={{ fontStyle: 'italic' }}>Closed</Text>
                </Col>
              )}
            </Row>
            {index < slots.length - 1 && <Divider style={{ margin: 0 }} />}
          </div>
        ))}
      </Card>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          loading={saving}
          onClick={handleSave}
        >
          Save Availability
        </Button>
      </div>
    </div>
  );
}
