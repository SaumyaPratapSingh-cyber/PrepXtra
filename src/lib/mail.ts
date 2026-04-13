import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const mailOptions = {
      from: `"PrepXtra Support" <${emailUser}>`,
      to: email,
      subject: "Verify Your PrepXtra Account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4f46e5; text-align: center;">Welcome to PrepXtra!</h2>
          <p>Please use the following One-Time Password (OTP) to verify your email address:</p>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; margin: 20px 0;">
            ${token}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendJobAlert = async (email: string, jobs: any[]) => {
  try {
    const jobCards = jobs.map(job => `
            <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
                    <a href="${job.link}" style="color: #2563eb; text-decoration: none;">${job.title}</a>
                </h3>
                <div style="color: #4b5563; font-size: 14px; margin-bottom: 8px;">
                    <span style="font-weight: 500; color: #111827;">${job.company}</span> • ${job.location}
                </div>
                <div style="display: flex; gap: 8px; font-size: 12px; color: #6b7280;">
                     <span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${job.type || 'Full-time'}</span>
                     <span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${job.source}</span>
                </div>
            </div>
        `).join('');

    const mailOptions = {
      from: `"PrepXtra Job Alerts" <${emailUser}>`,
      to: email,
      subject: `🎯 ${jobs.length} New Job Matches Found For You`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px 20px; border-radius: 12px; margin-top: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f3f4f6; padding-bottom: 20px;">
                    <h1 style="color: #111827; font-size: 24px; margin: 0;">PrepXtra Job Intelligence</h1>
                    <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Curated opportunities matching your profile</p>
                </div>

                <!-- Intro -->
                <div style="margin-bottom: 20px;">
                    <p style="color: #374151; font-size: 16px; line-height: 1.5;">
                        Hello, we found <strong>${jobs.length}</strong> new jobs that match your criteria. 
                        Here are your top matches for today:
                    </p>
                </div>

                <!-- Job List -->
                <div style="margin-bottom: 30px;">
                    ${jobCards}
                </div>

                <!-- Call to Action -->
                <div style="text-align: center; margin: 40px 0;">
                    <a href="http://localhost:3000/dashboard/newsletter" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
                        Adjust Preferences
                    </a>
                </div>

                <!-- Footer -->
                <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
                    <p>
                        This email was sent to ${email}. <br/>
                        You are receiving this because you subscribed to PrepXtra Job Alerts.
                    </p>
                    <p>© ${new Date().getFullYear()} PrepXtra. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Professional Job alert email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending job email:", error);
    return false;
  }
};

export const sendPasswordResetEmail = async (email: string, otp: string) => {
  try {
    const mailOptions = {
      from: `"PrepXtra Security" <${emailUser}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #ea580c; text-align: center;">Reset Your Password</h2>
          <p>You requested a password reset. Please use the following One-Time Password (OTP) to proceed:</p>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; margin: 20px 0; color: #1f2937;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};
