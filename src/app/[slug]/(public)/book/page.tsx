'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './book.module.css';

const services = [
  { id: '1', name: 'Signature Haircut', category: 'Hair', price: '₹2,500', duration: '60 min', rating: 4.9 },
  { id: '2', name: 'Keratin Treatment', category: 'Hair', price: '₹5,500', duration: '120 min', rating: 4.8 },
  { id: '3', name: 'Luxury Facial', category: 'Skin', price: '₹3,200', duration: '75 min', rating: 4.9 },
  { id: '4', name: 'Bridal Makeup', category: 'Makeup', price: '₹12,000', duration: '180 min', rating: 5.0 },
  { id: '5', name: 'Manicure & Pedicure', category: 'Nails', price: '₹1,800', duration: '90 min', rating: 4.7 },
  { id: '6', name: 'Aromatherapy Massage', category: 'Spa', price: '₹4,000', duration: '90 min', rating: 4.9 },
  { id: '7', name: 'Hair Color & Highlights', category: 'Hair', price: '₹4,500', duration: '150 min', rating: 4.7 },
  { id: '8', name: 'Chemical Peel', category: 'Skin', price: '₹4,000', duration: '60 min', rating: 4.8 },
];

const staff = [
  { id: '1', name: 'Priya Sharma', role: 'Master Stylist', rating: 4.9, image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&q=80' },
  { id: '2', name: 'Ananya Patel', role: 'Lead Esthetician', rating: 4.8, image: 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=200&q=80' },
  { id: '3', name: 'Rohit Verma', role: 'Master Barber', rating: 4.9, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { id: '4', name: 'Maya Krishnan', role: 'Nail Artist', rating: 4.7, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

const timeSlots = {
  morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '2:00 PM', '2:30 PM', '3:00 PM'],
  evening: ['3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'],
};

const steps = ['Service', 'Staff', 'Date & Time', 'Details', 'Confirm'];

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;

  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(searchParams.get('service'));
  const [selectedStaff, setSelectedStaff] = useState<string | null>(searchParams.get('staff'));
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const selectedStaffData = staff.find((s) => s.id === selectedStaff);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  // Generate calendar days
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  if (confirmed) {
    return (
      <section className={`luxe-section ${styles.confirmedSection}`}>
        <div className={`luxe-container-sm ${styles.confirmedContainer}`}>
          <div className={styles.confirmedEmoji}>✨</div>
          <h1 className={`luxe-heading-1 ${styles.confirmedHeading}`}>Booking Confirmed!</h1>
          <p className={`luxe-section-subtitle ${styles.confirmedSubtitle}`}>Your appointment has been booked successfully. We look forward to welcoming you!</p>
          <div className={`luxe-booking-summary ${styles.confirmedSummary}`}>
            <div className="luxe-booking-summary-row">
              <span className="luxe-booking-summary-label">Service</span>
              <span className="luxe-booking-summary-value">{selectedServiceData?.name}</span>
            </div>
            <div className="luxe-booking-summary-row">
              <span className="luxe-booking-summary-label">Staff</span>
              <span className="luxe-booking-summary-value">{selectedStaffData?.name}</span>
            </div>
            <div className="luxe-booking-summary-row">
              <span className="luxe-booking-summary-label">Date</span>
              <span className="luxe-booking-summary-value">{selectedDate ? `${monthName} ${selectedDate}` : ''}</span>
            </div>
            <div className="luxe-booking-summary-row">
              <span className="luxe-booking-summary-label">Time</span>
              <span className="luxe-booking-summary-value">{selectedTime}</span>
            </div>
            <div className={`luxe-booking-summary-row ${styles.summaryRowNoBorder}`}>
              <span className="luxe-booking-summary-label">Total</span>
              <span className="luxe-booking-summary-total">{selectedServiceData?.price}</span>
            </div>
          </div>
          <div className={styles.confirmedActions}>
            <Button type="primary" className="luxe-btn luxe-btn-lg" onClick={() => router.push(`/${slug}`)}>Back to Home</Button>
            <Button className="luxe-btn luxe-btn-lg" onClick={() => { setConfirmed(false); setStep(0); setSelectedService(null); setSelectedStaff(null); setSelectedDate(null); setSelectedTime(null); }}>Book Another</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`luxe-section ${styles.mainSection}`}>
      <div className="luxe-container-sm">
        {/* Stepper */}
        <div className={`luxe-stepper ${styles.stepper}`}>
          {steps.map((label, i) => (
            <div key={label} className={`luxe-step ${i < step ? 'completed' : ''} ${i === step ? 'active' : ''}`}>
              <div className="luxe-step-number">{i < step ? '✓' : i + 1}</div>
              <span className="luxe-step-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Step 0: Choose Service */}
        {step === 0 && (
          <div>
            <div className={`luxe-section-header ${styles.stepHeader}`}>
              <h2 className="luxe-section-title">Choose Your Service</h2>
              <p className="luxe-section-subtitle">Select the service you would like to book.</p>
            </div>
            <div className={`luxe-search ${styles.searchWrapper}`}>
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input className={`luxe-input ${styles.searchInput}`} placeholder="Search services..." />
            </div>
            <div className={styles.servicesList}>
              {services.map((s) => (
                  <Button
                    key={s.id}
                    onClick={() => { setSelectedService(s.id); handleNext(); }}
                    className={`${styles.serviceBtn} ${selectedService === s.id ? styles.serviceBtnSelected : ''}`}
                  >
                    <div>
                      <p className={styles.serviceName}>{s.name}</p>
                      <div className={styles.serviceMeta}>
                        <span>{s.category}</span>
                        <span>•</span>
                        <span>{s.duration}</span>
                        <span>•</span>
                        <span>{s.rating} ★</span>
                      </div>
                    </div>
                    <div className={styles.servicePrice}>{s.price}</div>
                  </Button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Choose Staff */}
        {step === 1 && (
          <div>
            <div className={`luxe-section-header ${styles.stepHeader}`}>
              <h2 className="luxe-section-title">Choose Your Stylist</h2>
              <p className="luxe-section-subtitle">Select a professional for your appointment.</p>
            </div>
            <div className={styles.staffList}>
              {staff.map((st) => (
                  <Button
                    key={st.id}
                    onClick={() => { setSelectedStaff(st.id); handleNext(); }}
                    className={`${styles.staffBtn} ${selectedStaff === st.id ? styles.staffBtnSelected : ''}`}
                  >
                    <img src={st.image} alt={st.name} className={styles.staffImage} />
                    <div className={styles.staffInfo}>
                      <p className={styles.staffName}>{st.name}</p>
                      <p className={styles.staffRole}>{st.role}</p>
                    </div>
                  <div className="luxe-rating">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {st.rating}
                  </div>
                </Button>
              ))}
            </div>
            <div className={styles.skipWrapper}>
              <Button type="text" className="luxe-btn luxe-btn-lg" onClick={handleNext}>Skip — Any Available</Button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <div className={`luxe-section-header ${styles.stepHeader}`}>
              <h2 className="luxe-section-title">Select Date & Time</h2>
              <p className="luxe-section-subtitle">Pick your preferred appointment slot.</p>
            </div>
            <div className={`luxe-calendar ${styles.calendar}`}>
              <div className="luxe-calendar-header">
                <Button className="luxe-calendar-nav">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </Button>
                <span className="luxe-calendar-month">{monthName}</span>
                <Button className="luxe-calendar-nav">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </Button>
              </div>
              <div className="luxe-calendar-grid">
                <div className="luxe-calendar-weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                <div className="luxe-calendar-days">
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {calendarDays.map((day) => {
                    const isPast = day < today.getDate() && today.getMonth() === new Date().getMonth();
                    return (
                      <Button
                        key={day}
                        className={`luxe-calendar-day ${selectedDate === day ? 'selected' : ''} ${day === today.getDate() ? 'today' : ''} ${isPast ? 'disabled' : ''}`}
                        onClick={() => !isPast && setSelectedDate(day)}
                        disabled={isPast}
                      >
                        {day}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {selectedDate && (
              <div>
                <h3 className={styles.availableTimesHeading}>
                  Available Times
                </h3>
                {(['morning', 'afternoon', 'evening'] as const).map((period) => (
                  <div key={period} className={styles.periodGroup}>
                    <p className={styles.periodLabel}>
                      {period === 'morning' ? 'Morning' : period === 'afternoon' ? 'Afternoon' : 'Evening'}
                    </p>
                    <div className="luxe-time-slot">
                      {timeSlots[period].map((time) => (
                        <Button
                          key={time}
                          className={`luxe-time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div>
            <div className={`luxe-section-header ${styles.stepHeader}`}>
              <h2 className="luxe-section-title">Your Details</h2>
              <p className="luxe-section-subtitle">We will send your booking confirmation here.</p>
            </div>
            <div className={styles.detailsForm}>
              <div className="luxe-input-group">
                <label className="luxe-input-label">Full Name *</label>
                <input className="luxe-input" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="luxe-input-group">
                <label className="luxe-input-label">Email *</label>
                <input className="luxe-input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="luxe-input-group">
                <label className="luxe-input-label">Phone *</label>
                <input className="luxe-input" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="luxe-input-group">
                <label className="luxe-input-label">Special Notes</label>
                <textarea className={`luxe-input ${styles.textarea}`} rows={3} placeholder="Any allergies, preferences, or special requests..." value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div>
            <div className={`luxe-section-header ${styles.stepHeader}`}>
              <h2 className="luxe-section-title">Review & Confirm</h2>
              <p className="luxe-section-subtitle">Please review your booking details before confirming.</p>
            </div>
            <div className={`luxe-booking-summary ${styles.summary}`}>
              <div className="luxe-booking-summary-row">
                <span className="luxe-booking-summary-label">Service</span>
                <span className="luxe-booking-summary-value">{selectedServiceData?.name}</span>
              </div>
              {selectedStaffData && (
                <div className="luxe-booking-summary-row">
                  <span className="luxe-booking-summary-label">Staff</span>
                  <span className="luxe-booking-summary-value">{selectedStaffData.name}</span>
                </div>
              )}
              <div className="luxe-booking-summary-row">
                <span className="luxe-booking-summary-label">Date</span>
                <span className="luxe-booking-summary-value">{selectedDate ? `${monthName} ${selectedDate}` : ''}</span>
              </div>
              <div className="luxe-booking-summary-row">
                <span className="luxe-booking-summary-label">Time</span>
                <span className="luxe-booking-summary-value">{selectedTime}</span>
              </div>
              <div className="luxe-booking-summary-row">
                <span className="luxe-booking-summary-label">Duration</span>
                <span className="luxe-booking-summary-value">{selectedServiceData?.duration}</span>
              </div>
              <div className="luxe-booking-summary-row">
                <span className="luxe-booking-summary-label">Name</span>
                <span className="luxe-booking-summary-value">{name}</span>
              </div>
              <div className="luxe-booking-summary-row">
                <span className="luxe-booking-summary-label">Email</span>
                <span className="luxe-booking-summary-value">{email}</span>
              </div>
              <div className={`luxe-booking-summary-row ${styles.summaryRowNoBorder}`}>
                <span className="luxe-booking-summary-label">Total</span>
                <span className="luxe-booking-summary-total">{selectedServiceData?.price}</span>
              </div>
            </div>

            <div className={styles.checkboxRow}>
              <label className={`luxe-checkbox ${styles.checkboxLabel}`}>
                <input type="checkbox" defaultChecked />
                <span className="checkmark">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                I agree to the cancellation policy and terms of service
              </label>
            </div>

            <Button
              className={`luxe-btn luxe-btn-secondary luxe-btn-xl ${styles.confirmBtn}`}
              onClick={() => setConfirmed(true)}
              disabled={!name || !email || !phone}
            >
              Confirm Booking — {selectedServiceData?.price}
            </Button>
          </div>
        )}

        {/* Navigation */}
        {step < 4 && (
          <div className={styles.nav}>
            <Button
              type="text" className="luxe-btn luxe-btn-lg"
              onClick={step === 0 ? () => router.push(`/${slug}`) : handleBack}
            >
              {step === 0 ? 'Cancel' : 'Back'}
            </Button>
            {(step === 2 && selectedDate && selectedTime) && (
              <Button type="primary" className="luxe-btn luxe-btn-lg" onClick={handleNext}>
                Continue
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
