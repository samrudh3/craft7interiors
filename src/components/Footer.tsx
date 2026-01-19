import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-title">Address Details</h2>
        <div className="footer-details">
          <p className="company-name">AARABHYA SYSTEMS PVT LTD</p>
          <p>2nd Floor, No 13, Mahalakshmi, 21st Main Rd,</p>
          <p>opp. Banashankari Shopping Complex,</p>
          <p>Banashankari Stage II,</p>
          <p>Bengaluru, Karnataka 560070</p>
          <p className="phone">Phone: (+91) 99001 52313</p>
          <p className="email">pawan@aarabhya.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Copyright Aarabhya 2022</p>
      </div>
    </footer>
  )
}

export default Footer
