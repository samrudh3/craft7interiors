import './Contact.css'
import { useState } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(values: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!values.name.trim()) e.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Enter a valid email.'
    if (values.phone && !/^\+?[0-9 ()-]{7,}$/.test(values.phone)) e.phone = 'Enter a valid phone number.'
    if (!values.message.trim() || values.message.trim().length < 8) e.message = 'Message must be at least 8 characters.'
    return e
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const eobj = validate(form)
    setErrors(eobj)
    if (Object.keys(eobj).length === 0) {
      setSubmitted(true)
      // TODO: wire this to an API or service (Formspree, Netlify, custom backend)
      // For now we simulate success and clear the form
      setForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p className="muted">We'd love to hear about your project. Reach out and we'll get back within 1–2 business days.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {submitted && <div className="success">Thanks — your message was sent.</div>}

          <label className="input-group">
            <span>Name</span>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>

          <label className="input-group">
            <span>Email</span>
            <input name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>

          <label className="input-group">
            <span>Phone (optional)</span>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 555 5555" />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </label>

          <label className="input-group">
            <span>Message</span>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project" rows={6} />
            {errors.message && <small className="error">{errors.message}</small>}
          </label>

          <div className="form-actions">
            <button type="submit" className="btn">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
