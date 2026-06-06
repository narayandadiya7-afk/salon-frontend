"use client";

import React, { useState } from 'react';
import { Button, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './BookingForm.module.css';

const { TextArea } = Input;

export default function BookingForm({ salonId, services }: { salonId: string; services: any[] }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(services?.[0]?.id || '');
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<Array<any>>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const base = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:3005/api/';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !serviceId || !time) {
      setMessage('Please select date, time and service');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        salonId,
        serviceId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        appointmentDate: dayjs(date).format('YYYY-MM-DD'),
        startTime: time,
        notes,
      };

      const res = await fetch(`${base}salons/${encodeURIComponent(salonId)}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const json = await res.json();
      if (json.success) {
        setMessage('Booking successful!');
      } else {
        setMessage(json.message || 'Failed to book');
      }
    } catch (err: any) {
      setMessage(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function loadSlots(selectedDate: any) {
    if (!selectedDate || !salonId) return setSlots([]);
    setSlotsLoading(true);
    try {
      const d = dayjs(selectedDate).format('YYYY-MM-DD');
      const res = await fetch(`${base}salons/${encodeURIComponent(salonId)}/slots?date=${encodeURIComponent(d)}`);
      const json = await res.json();
      if (json.success) {
        const available = (json.data || []).filter((s: any) => s.available);
        setSlots(available);
        if (available.length) setTime(available[0].startTime);
      } else {
        setSlots([]);
      }
    } catch (err) {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

      <Select value={serviceId} onChange={(v) => setServiceId(v)}>
        {services.map((s: any) => (
          <Select.Option key={s.id} value={s.id}>{s.name} — ₹{s.price}</Select.Option>
        ))}
      </Select>

      <DatePicker value={date ? dayjs(date) : null} onChange={(d) => { setDate(d); loadSlots(d); }} />

      {slotsLoading ? (
        <div>Loading times…</div>
      ) : (
        <Select value={time} onChange={(v) => setTime(v)}>
          {slots.length === 0 ? (
            <Select.Option value="">No available slots</Select.Option>
          ) : (
            slots.map((s: any) => (
              <Select.Option key={s.startTime} value={s.startTime}>{s.startTime} — {s.endTime}</Select.Option>
            ))
          )}
        </Select>
      )}

      <TextArea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <Button type="primary" htmlType="submit" loading={loading}>Book Appointment</Button>
      {message && <div className={styles.message}>{message}</div>}
    </form>
  );
}
