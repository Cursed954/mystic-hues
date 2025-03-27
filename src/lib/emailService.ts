
/**
 * Email service for handling contact form submissions
 */

// In a real implementation, this would connect to a backend service

export interface ContactFormData {
  name: string;
  email: string;
  destination?: string;
  message: string;
}

export const emailService = {
  /**
   * Sends a contact form submission
   * In a real implementation, this would send data to a backend service
   * that would then send emails using a service like SendGrid, Mailgun, etc.
   */
  sendContactForm: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    try {
      // Log the submission data
      console.log("Contact form submission:", data);
      console.log("This would be sent to: adhirajpundir783@gmail.com, deepanshu95488@gmail.com");
      
      // Basic validation
      if (!data.name || !data.email || !data.message) {
        return {
          success: false,
          message: "Please fill in all required fields"
        };
      }
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation with Supabase, this would:
      // 1. Call a Supabase Edge Function that sends emails
      // 2. Store the message in a Supabase table for reference
      
      // For demonstration purposes, log what would be sent in a real app
      console.log("Email would be sent with the following data:");
      console.log({
        to: ["adhirajpundir783@gmail.com", "deepanshu95488@gmail.com"],
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <h1>New Message from Contact Form</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Destination:</strong> ${data.destination || 'Not specified'}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        `
      });
      
      return {
        success: true,
        message: "Your message has been sent successfully!"
      };
    } catch (error) {
      console.error("Error sending contact form:", error);
      return {
        success: false,
        message: "An error occurred while sending your message. Please try again."
      };
    }
  }
};
