

import React from 'react';
import './style.css';

function SupportPage() {
  return (
    <main className="main">
      <section className="hero">
        <h1>Support</h1>
        <p>We’re here to help you with any questions or issues.</p>
        <p>You're free to ask any kind of questions or issues on given Mail ID.</p>
      </section>

      <section className="support-content" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> silverseats09@gmail.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Facebook:</strong> silverseats09</p>
        <br/>
        <p><strong>Our Office Address:</strong></p>
        <p>     34,Third Floor,Laxmi Anclaves,</p>
        <p>     Near Gajera School, Gajera Circle,</p>
        <p>     Katargam, Surat, Gujrat</p>
        <p>     Pincode-395004</p>
        
        <br/>
        <br/>
        
      </section>
    </main>
  );
}

export default SupportPage;
