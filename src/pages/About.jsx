import React from 'react'
import AboutHero from '../components/AboutHero.jsx'

export default function About() {
  return <>
    <AboutHero />
    <section className="who-section" aria-label="Who We Are">
      <div className="who-container">
        <div className="who-label">
          <span>WHO WE ARE</span>
        </div>
        <div className="who-body">
          <h2 className="who-statement">
            Trust Pharmaceuticals Pvt. Ltd. Co. is a private pharmaceutical manufacturer based in Debre Birhan, Ethiopia, with an office presence in Addis Ababa. The company is focused on generic finished dosage forms for domestic and wider regional supply.
          </h2>
          <p className="who-subtext">
            Its operating model emphasizes manufacturing know-how, technology, process improvement and dependable quality systems while working toward a broader product portfolio.
          </p>
          <div className="who-bullets">
            <div className="who-bullet-col">
              <div className="who-bullet-item">Simplicity</div>
              <div className="who-bullet-item">Consistency</div>
            </div>
            <div className="who-bullet-col">
              <div className="who-bullet-item">Accessibility</div>
              <div className="who-bullet-item">Credibility</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="about-values-section" aria-label="Mission, Vision and Values">
      <div className="about-values-grid">
        {/* Box 1: Mission */}
        <article className="about-value-box">
          <div className="value-box-top">
            <span className="value-box-num">01</span>
            <h2 className="value-box-title">Our Mission</h2>
          </div>

          <div className="value-box-center">
            <img
              src="/about-values/mission.png"
              alt="Our Mission"
              className="value-box-img"
              loading="lazy"
            />
          </div>

          <div className="value-box-bottom">
            <p className="value-box-desc">
              Build a quality-driven pharmaceutical company with satisfied customers, motivated employees and a clear commitment to public health.
            </p>
          </div>
        </article>

        {/* Box 2: Vision */}
        <article className="about-value-box">
          <div className="value-box-top">
            <span className="value-box-num">02</span>
            <h2 className="value-box-title">Our Vision</h2>
          </div>

          <div className="value-box-center">
            <img
              src="/about-values/vision.png"
              alt="Our Vision"
              className="value-box-img"
              loading="lazy"
            />
          </div>

          <div className="value-box-bottom">
            <p className="value-box-desc">
              Grow into one of East Africa’s notable pharmaceutical manufacturers and suppliers by 2030.
            </p>
          </div>
        </article>

        {/* Box 3: Core Values */}
        <article className="about-value-box">
          <div className="value-box-top">
            <span className="value-box-num">03</span>
            <h2 className="value-box-title">Our Core Values</h2>
          </div>

          <div className="value-box-center">
            <img
              src="/about-values/core-values.png"
              alt="Our Core Values"
              className="value-box-img"
              loading="lazy"
            />
          </div>

          <div className="value-box-bottom">
            <p className="value-box-desc">
              Integrity, humanity, commitment, and customer satisfaction.
            </p>
          </div>
        </article>
      </div>
    </section>
  </>
}
