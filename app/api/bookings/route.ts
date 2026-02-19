import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL;
const SALON_ID = process.env.SALON_ID;

/**
 * POST /api/bookings
 * Proxies the booking request to the backend NestJS server.
 * Injects salonId server-side so it's not exposed or tamperable from the client.
 */
export async function POST(request: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!SALON_ID) {
      return NextResponse.json(
        { error: 'Salon is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      serviceName,
      customerName,
      customerPhone,
      bookingDate,
      bookingTime,
      notes,
    } = body;

    // Basic validation before forwarding to backend
    if (!serviceName || !customerName || !customerPhone || !bookingDate || !bookingTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Forward to backend public booking endpoint with salonId injected server-side
    const backendResponse = await fetch(`${BACKEND_API_URL}/bookings/public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        salonId: SALON_ID,
        serviceName,
        customerName,
        customerPhone,
        bookingDate,
        bookingTime,
        notes: notes || '',
      }),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error('Backend booking error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to create booking' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        booking: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking proxy error:', error);

    // Handle network errors (backend unreachable)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Unable to reach booking service. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
