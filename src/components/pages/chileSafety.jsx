import React from "react";

const ChildSafetyStandards = () => {
  return (
    <>
      <style>{`
        .csae-policy{
          --navy:#152B4A;
          --navy-soft:#4A5D7A;
          --orange:#E8791E;
          --orange-deep:#C9601A;
          --orange-tint:#FDEEDD;
          --green:#2F7D4F;
          --green-tint:#E7F3EB;
          --line:#E7DFCF;
          --card:#FFFFFF;
          --cream:#FCF8F0;

          max-width:1240px;
          margin:0 auto;
          padding:48px 24px 64px;
          font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color:var(--navy);
          background:
            radial-gradient(1200px 420px at 50% -80px, var(--orange-tint) 0%, transparent 60%),
            var(--cream);
          border-radius:18px;
        }

        .csae-policy .eyebrow{
          display:inline-flex;
          align-items:center;
          gap:8px;
          background:var(--card);
          border:1px solid var(--line);
          padding:6px 14px;
          border-radius:999px;
          font-size:12.5px;
          font-weight:700;
          color:var(--orange-deep);
          letter-spacing:.02em;
        }

        .csae-policy .eyebrow .dot{
          width:7px;
          height:7px;
          border-radius:50%;
          background:var(--green);
          display:inline-block;
        }

        .csae-policy .title-row{
          margin-top:20px;
        }

        .csae-policy h1{
          font-size:clamp(26px,4vw,34px);
          font-weight:800;
          letter-spacing:-0.01em;
          margin:0 0 6px;
          display:flex;
          align-items:center;
          gap:12px;
        }

        .csae-policy h1 svg{
          flex:none;
        }

        .csae-policy .devanagari{
          font-size:15px;
          font-weight:600;
          color:var(--green);
          margin:0 0 14px;
        }

        .csae-policy .lede{
          font-size:16px;
          color:var(--navy-soft);
          max-width:600px;
          margin:0 0 8px;
        }

        .csae-policy .meta-row{
          display:flex;
          gap:20px;
          flex-wrap:wrap;
          font-size:13px;
          color:var(--navy-soft);
          margin:18px 0 0;
          padding-top:18px;
          border-top:1px solid var(--line);
        }

        .csae-policy .meta-row strong{
          color:var(--navy);
        }

        .csae-policy section{
          margin-top:36px;
          padding-top:36px;
          border-top:1px solid var(--line);
        }

        .csae-policy section:first-of-type{
          border-top:none;
          margin-top:32px;
          padding-top:0;
        }

        .csae-policy h2{
          font-size:19px;
          font-weight:800;
          display:flex;
          align-items:center;
          gap:12px;
          margin:0 0 16px;
        }

        .csae-policy .num{
          flex:none;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width:28px;
          height:28px;
          border-radius:8px;
          background:var(--green-tint);
          color:var(--green);
          font-size:13px;
          font-weight:800;
        }

        .csae-policy p{
          font-size:15.5px;
          line-height:1.7;
          color:#33455F;
          margin:0 0 14px;
        }

        .csae-policy ul{
          margin:0 0 14px;
          padding:0;
          list-style:none;
        }

        .csae-policy ul li{
          position:relative;
          padding-left:26px;
          margin-bottom:10px;
          font-size:15.5px;
          line-height:1.6;
          color:#33455F;
        }

        .csae-policy ul li::before{
          content:"";
          position:absolute;
          left:0;
          top:7px;
          width:8px;
          height:8px;
          border-radius:2px;
          background:var(--orange);
          transform:rotate(45deg);
        }

        .csae-policy .callout{
          background:var(--card);
          border:1px solid var(--line);
          border-left:4px solid var(--orange);
          border-radius:12px;
          padding:18px 20px;
          margin:6px 0 16px;
          display:flex;
          gap:12px;
        }

        .csae-policy .callout.green{
          border-left-color:var(--green);
        }

        .csae-policy .callout p{
          margin:0;
          font-size:14.5px;
        }

        .csae-policy .callout .ic{
          flex:none;
          margin-top:2px;
        }

        .csae-policy .report-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:14px;
          margin:0 0 16px;
        }

        .csae-policy .report-card{
          background:var(--card);
          border:1px solid var(--line);
          border-radius:12px;
          padding:16px 18px;
        }

        .csae-policy .report-card .label{
          display:flex;
          align-items:center;
          gap:8px;
          font-size:13px;
          font-weight:800;
          color:var(--navy-soft);
          text-transform:uppercase;
          letter-spacing:.03em;
          margin-bottom:6px;
        }

        .csae-policy .report-card .value{
          font-size:15px;
          font-weight:700;
          color:var(--navy);
        }

        .csae-policy .contact-card{
          background:var(--card);
          border:1px solid var(--line);
          border-radius:14px;
          padding:22px 24px;
          display:grid;
          grid-template-columns:auto 1fr;
          gap:14px 18px;
        }

        .csae-policy .contact-card .avatar{
          width:44px;
          height:44px;
          border-radius:50%;
          background:linear-gradient(135deg, var(--orange), var(--green));
          display:flex;
          align-items:center;
          justify-content:center;
          color:#fff;
          font-weight:800;
          font-size:16px;
          grid-row:span 4;
        }

        .csae-policy .contact-card dt{
          font-size:12px;
          text-transform:uppercase;
          letter-spacing:.03em;
          color:var(--navy-soft);
          font-weight:700;
          margin:0;
        }

        .csae-policy .contact-card dd{
          margin:2px 0 0;
          font-size:15px;
          color:var(--navy);
          font-weight:600;
        }

        .csae-policy .contact-row{
          display:contents;
        }

        @media (max-width:520px){
          .csae-policy{
            padding:32px 16px 48px;
            border-radius:0;
          }

          .csae-policy .report-grid{
            grid-template-columns:1fr;
          }
        }
      `}</style>

      <div className="csae-policy">
        <span className="eyebrow">
          <span className="dot"></span>
          सुरक्षा मानक &nbsp;·&nbsp; Safety Standards
        </span>

        <div className="title-row">
          <h1>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 5V11C4 16.5 7.4 21.2 12 22C16.6 21.2 20 16.5 20 11V5L12 2Z"
                fill="#2F7D4F"
              />
              <path
                d="M9 12.2L11 14.2L15.5 9.5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Child Safety Standards
          </h1>

          <p className="devanagari">
            बच्चों की सुरक्षा — हमारी प्राथमिकता
          </p>

          <p className="lede">
            O2 Bharat is committed to keeping our community platform free from
            child sexual abuse and exploitation (CSAE) — across every module,
            including Matrimonial.
          </p>

          <div className="meta-row">
            <span>
              <strong>Applies to:</strong> O2 Bharat app &amp; all modules
            </span>

            <span>
              <strong>Last updated:</strong> July 2026
            </span>
          </div>
        </div>

        <section>
          <h2>
            <span className="num">1</span>
            Our Commitment
          </h2>

          <p>
            O2 Bharat is a digital community platform bringing together
            families, professionals, and local communities across modules
            including Matrimonial, Community Directory, Business Pages, Job
            Portal, Events, and more. We do not tolerate any content or behavior
            that sexually exploits, abuses, or endangers a child on any part of
            our platform.
          </p>

          <p>
            This includes, without limitation: grooming a child for sexual
            exploitation, sextortion of a child, trafficking a child for sex,
            and any other form of child sexual abuse and exploitation (CSAE).
          </p>

          <div className="callout">
            <span className="ic">🔞</span>

            <p>
              <strong>Age requirement:</strong> O2 Bharat's Matrimonial module
              is intended solely for users aged 18 and above. Users must confirm
              their age before accessing matchmaking features, and profiles are
              subject to review.
            </p>
          </div>
        </section>

        <section>
          <h2>
            <span className="num">2</span>
            Prohibited Conduct
          </h2>

          <p>
            The following are strictly prohibited on O2 Bharat, across every
            module:
          </p>

          <ul>
            <li>
              Creating, uploading, sharing, or linking to child sexual abuse
              material (CSAM) in any form.
            </li>

            <li>
              Grooming, soliciting, or attempting to sexually exploit anyone
              believed or represented to be a minor.
            </li>

            <li>
              Using any O2 Bharat feature — including Matrimonial, Community
              Pages, or messaging — to contact, target, or endanger a minor.
            </li>

            <li>
              Misrepresenting one's age to circumvent age-restricted features.
            </li>

            <li>
              Facilitating trafficking, sextortion, or any sexual exploitation
              of a child.
            </li>
          </ul>
        </section>

        <section>
          <h2>
            <span className="num">3</span>
            How to Report a Concern
          </h2>

          <p>
            Users can report suspected CSAE or CSAM without leaving the app:
          </p>

          <div className="report-grid">
            <div className="report-card">
              <div className="label">📱 In-App</div>
              <div className="value">
                "Report" on any profile, post, or message
              </div>
            </div>

            <div className="report-card">
              <div className="label">✉️ Email</div>
              <div className="value">Abuse@o2bharat.com</div>
            </div>
          </div>

          <p>
            All reports are reviewed promptly by our team. Reports involving
            imminent harm to a child should also be directed to local law
            enforcement or, in India, the National Cyber Crime Reporting Portal
            (cybercrime.gov.in).
          </p>
        </section>

        <section>
          <h2>
            <span className="num">4</span>
            How We Handle CSAM
          </h2>

          <p>When we obtain actual knowledge of CSAM on O2 Bharat, we:</p>

          <ul>
            <li>
              Remove the content and disable the associated account without
              delay.
            </li>

            <li>
              Preserve relevant records as required by applicable law.
            </li>

            <li>
              Report the content and account to the appropriate authorities,
              including India's National Cyber Crime Reporting Portal and, where
              applicable, the National Center for Missing &amp; Exploited
              Children (NCMEC).
            </li>

            <li>
              Cooperate with law enforcement investigations relating to
              CSAE/CSAM.
            </li>
          </ul>
        </section>

        <section>
          <h2>
            <span className="num">5</span>
            Legal Compliance
          </h2>

          <p>
            O2 Bharat complies with applicable child safety laws, including the
            Protection of Children from Sexual Offences (POCSO) Act, 2012, and
            the Information Technology Act, 2000, as amended, along with other
            applicable national and international child safety regulations.
          </p>
        </section>

        <section>
          <h2>
            <span className="num">6</span>
            Child Safety Point of Contact
          </h2>

          <div className="contact-card">
            <div className="avatar">AG</div>

            <div className="contact-row">
              <dt>Name</dt>
            </div>

            <dd style={{ gridColumn: 2 }}>Amit Goyal</dd>

            <dt style={{ gridColumn: 2, marginTop: "6px" }}>Role</dt>
            <dd style={{ gridColumn: 2 }}>Trust &amp; Safety Lead</dd>

            <dt style={{ gridColumn: 2, marginTop: "6px" }}>
              Organization
            </dt>
            <dd style={{ gridColumn: 2 }}>O2 Bharat</dd>

            <dt style={{ gridColumn: 2, marginTop: "6px" }}>Email</dt>
            <dd style={{ gridColumn: 2 }}>Abuse@o2bharat.com</dd>
          </div>

          <div className="callout green">
            <span className="ic">🛡️</span>

            <p>
              This individual is designated to speak to O2 Bharat's CSAE
              prevention practices and compliance with Google Play's Child
              Safety Standards policy.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChildSafetyStandards;