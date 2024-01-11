import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'societeguis@gmail.com', 
  pass: 'daol mjre mvje wltw', 
      
  },
});

function sendVerificationEmail(email) {
  try {
    const token = jwt.sign({ data: email }, process.env.JWT_SECRET, { expiresIn: '10m' });

    // Email configurations
    const mailConfigurations = {
      from: 'ichrafkhalfaoui1@gmail.com',
      to: email,
      subject: 'Email Verification',
      html:`
      <p>Welcome to Romis ArtsShop!</p>
      <p>We're thrilled to have you on board. You recently visited our website and entered your email.</p>
      <p>Please follow the given link to verify your email:</p>
      <a href="${process.env.PORT}/verify/${token}">Verify Email</a>
      <p>If you have any questions or need assistance, feel free to contact us. Thanks!</p>
  ` ,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) {
        console.error('Email could not be sent:', error);
      } else {
        console.log('Email Sent Successfully');
        console.log(info);
      }
    });
  } catch (error) {
    console.error('Error generating or sending verification email:', error);
  }
}

export { sendVerificationEmail };
