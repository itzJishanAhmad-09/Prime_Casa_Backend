const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send welcome email
exports.sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: `"Prime Casa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Prime Casa! 🏠',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
          <h1 style="color: #C0392B; font-family: 'Playfair Display', serif;">Welcome to Prime Casa, ${name}!</h1>
          <p style="color: #333; font-size: 16px;">We're excited to help you find your dream home.</p>
          <p style="color: #333; font-size: 16px;">Our team of experts will assist you in every step of your property journey.</p>
          <div style="background: #fff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C0392B;">
            <p style="margin: 0; color: #666;">✨ 0% Brokerage</p>
            <p style="margin: 0; color: #666;">✅ RERA Verified Properties</p>
            <p style="margin: 0; color: #666;">📊 10.5% Average Annual Return</p>
          </div>
          <p style="color: #666; font-size: 14px;">Thank you for joining us!</p>
          <a href="${process.env.FRONTEND_URL}" style="display: inline-block; background: #C0392B; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 10px;">Explore Properties</a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Email error:', error);
  }
};

// Send enquiry notification
exports.sendEnquiryEmail = async (enquiry) => {
  try {
    const mailOptions = {
      from: `"Prime Casa" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry from ${enquiry.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #C0392B;">New Enquiry Received</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${enquiry.name}</p>
            <p><strong>Email:</strong> ${enquiry.email}</p>
            <p><strong>Phone:</strong> ${enquiry.phone}</p>
            <p><strong>Type:</strong> ${enquiry.enquiryType}</p>
            <p><strong>Message:</strong> ${enquiry.message || 'No message'}</p>
            <p><strong>Preferred Sector:</strong> ${enquiry.preferredSector || 'Not specified'}</p>
            <p><strong>Budget Range:</strong> ${enquiry.budgetRange || 'Not specified'}</p>
          </div>
          <a href="${process.env.FRONTEND_URL}/admin/enquiries" style="display: inline-block; background: #C0392B; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 8px; margin-top: 10px;">View Enquiry</a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Enquiry email sent to admin`);
  } catch (error) {
    console.error('Email error:', error);
  }
};