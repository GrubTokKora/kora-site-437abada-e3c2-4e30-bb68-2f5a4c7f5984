import { API_BASE_URL, BUSINESS_ID } from './config';

interface SubscriptionPayload {
  email: string | null;
  phone_number: string | null;
  email_opt_in: boolean;
  sms_opt_in: boolean;
}

export async function subscribeToNewsletter(payload: SubscriptionPayload): Promise<{ success: boolean; message: string }> {
  const { email, phone_number, email_opt_in, sms_opt_in } = payload;

  if (!email_opt_in && !sms_opt_in) {
    return { success: false, message: 'Please select at least one subscription option.' };
  }
  if (email_opt_in && !email) {
    return { success: false, message: 'Please provide an email address.' };
  }
  if (sms_opt_in && !phone_number) {
    return { success: false, message: 'Please provide a phone number for SMS updates.' };
  }
  if (!email && !phone_number) {
    return { success: false, message: 'Please provide an email or phone number.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/public/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        business_id: BUSINESS_ID,
        email: email_opt_in ? email : null,
        phone_number: sms_opt_in ? phone_number : null,
        email_opt_in,
        sms_opt_in,
        source: 'WEBSITE',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, message: data.message || 'Successfully subscribed!' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Subscription failed. Please try again.';
    return { success: false, message };
  }
}