'use client';

import { useState, useMemo } from 'react';
import { SiteConfig } from '@/types/config';

/** Generate hour options (9 AM - 6 PM) */
function generateHours(startHour = 9, endHour = 19): { value: string; label: string }[] {
  const hours: { value: string; label: string }[] = [];
  for (let h = startHour; h < endHour; h++) {
    const hh = h.toString().padStart(2, '0');
    const displayH = h % 12 || 12;
    const ampm = h < 12 ? 'AM' : 'PM';
    hours.push({ value: hh, label: `${displayH} ${ampm}` });
  }
  return hours;
}

const MINUTE_OPTIONS = ['00', '15', '30', '45'];

interface BookingFormProps {
  config: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingForm({ config, isOpen, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    serviceName: config.services[0]?.id || '',
    customService: '',
    customerName: '',
    customerPhone: '',
    bookingDate: '',
    bookingHour: '',
    bookingMinute: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Today's date in YYYY-MM-DD format for min date restriction
  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }, []);

  // Pre-generated hour options (9 AM - 7 PM)
  const hourOptions = useMemo(() => generateHours(9, 19), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceName: formData.serviceName === 'other' ? formData.customService : formData.serviceName,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          bookingDate: formData.bookingDate,
          bookingTime: `${formData.bookingHour}:${formData.bookingMinute}`,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Your appointment has been booked successfully! We look forward to seeing you.',
        });
        setFormData({
          serviceName: config.services[0]?.id || '',
          customService: '',
          customerName: '',
          customerPhone: '',
          bookingDate: '',
          bookingHour: '',
          bookingMinute: '',
          notes: '',
        });
        setTimeout(() => {
          onClose();
          setMessage(null);
        }, 2500);
      } else {
        setMessage({
          type: 'error',
          text: 'Booking failed. Please try again or contact us directly.',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please check your information and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-accent border-b border-primary/10 px-8 py-6 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold text-foreground">Book Your Appointment</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <fieldset disabled={loading} className="space-y-6 disabled:opacity-60">
          {/* Service Selection */}
          <div>
            <label htmlFor="serviceName" className="block font-semibold text-foreground mb-2">
              Select Service *
            </label>
            <select
              id="serviceName"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary bg-background"
            >
              {config.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - {service.price}
                </option>
              ))}
              <option value="other">Other (please specify)</option>
            </select>
            {formData.serviceName === 'other' && (
              <input
                type="text"
                id="customService"
                name="customService"
                value={formData.customService}
                onChange={handleChange}
                required
                placeholder="Enter your desired service..."
                className="w-full mt-3 px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary bg-background"
              />
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="customerName" className="block font-semibold text-foreground mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary bg-background"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="customerPhone" className="block font-semibold text-foreground mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              required
              placeholder="(555) 123-4567"
              className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary bg-background"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bookingDate" className="block font-semibold text-foreground mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
                min={todayStr}
                className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary bg-background"
              />
            </div>
            <div>
              <label className="block font-semibold text-foreground mb-2">
                Preferred Time *
              </label>
              <div className="flex items-center gap-2">
                <select
                  id="bookingHour"
                  name="bookingHour"
                  value={formData.bookingHour}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary bg-background"
                >
                  <option value="" disabled>HH</option>
                  {hourOptions.map((h) => (
                    <option key={h.value} value={h.value}>
                      {h.label}
                    </option>
                  ))}
                </select>
                <span className="text-xl font-semibold text-muted-foreground">:</span>
                <select
                  id="bookingMinute"
                  name="bookingMinute"
                  value={formData.bookingMinute}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary bg-background"
                >
                  <option value="" disabled>MM</option>
                  {MINUTE_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block font-semibold text-foreground mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requests or preferences..."
              rows={4}
              className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary bg-background resize-none"
            />
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background font-semibold py-4 px-6 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {loading ? 'Booking...' : 'Complete Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}
