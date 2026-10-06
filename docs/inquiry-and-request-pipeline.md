# Best Vision Foundation (BVF) - Inquiries & Volunteer Intake Pipeline

This guide outlines how user inquiries, volunteer registrations, and partnership requests submitted through the Best Vision Foundation website reach the BVF team.

---

## 1. Request Flow Architecture

```
[ Website Visitor ]
         │
         ├── 1. Fills form & clicks "Submit Application / Transmit Message"
         │            │
         │            ▼
         │   [ FormSubmit.co API Engine ] (Zero-backend AJAX)
         │            │
         │            ▼
         │   [ BVF Official Inbox: bvfsrilanka@gmail.com ]
         │   • Formatted HTML table with all submitted fields
         │   • Direct Reply-To header (click "Reply" to email the visitor)
         │
         └── 2. Clicks "Instant WhatsApp Dispatch"
                      │
                      ▼
             [ WhatsApp Web / Mobile App ]
             • Pre-formatted text message with Name, Phone, Sector, Notes
             • Direct connection to BVF Hotline (+94 77 970 5752)
```

---

## 2. Delivery Channels in Detail

### Channel 1: Direct Email Dispatch to `bvfsrilanka@gmail.com`
* **Trigger:** When a visitor clicks **"Submit Application to Secretariat"** or **"Transmit Message to Secretariat"**.
* **Engine:** Secured asynchronous submission via `https://formsubmit.co/ajax/bvfsrilanka@gmail.com`.
* **Captured Fields:**
  * Full Name / First Name & Last Name
  * Verified Email Address
  * Mobile / WhatsApp Number
  * Target Operational Sector (Lagoon Restoration, Elephant Defense, Digital Rights, Coastal Community)
  * Location / City
  * Skills, Availability, or Inquiry Message
* **Subject Line Formats:**
  * `[BVF Portal] Volunteer Application: [Applicant Name]`
  * `[BVF Portal] Direct Inquiry: [Sender Name]`
* **Recipient Inbox:** `bvfsrilanka@gmail.com`

#### First-Time One-Click Activation (Important):
The very first time a form is submitted on the live site, FormSubmit.co sends a confirmation email to `bvfsrilanka@gmail.com` with the subject:
> **"Action Required: Confirm your form endpoint"**

The BVF administrator simply clicks the **"Activate Form"** button inside that email once. After this one-time step:
1. All future form submissions arrive instantly and silently into the inbox.
2. No captcha or interstitials are displayed to the user.
3. The visitor sees an immediate green confirmation toast on screen: *"Success! Transmitted to BVF Secretariat (bvfsrilanka@gmail.com)."*

---

### Channel 2: 1-Tap WhatsApp Instant Dispatch (`+94 77 970 5752`)
* **Trigger:** When a visitor clicks the secondary button: **"Instant WhatsApp Dispatch (+94 77 970 5752)"**.
* **How it works:**
  1. The JavaScript reads whatever fields the user has typed so far into the form.
  2. It formats the fields into an organized, readable message:
     ```
     *Best Vision Foundation (BVF) - Web Request*
     • Name: Kasun Fernando
     • Phone / WhatsApp: +94 77 123 4567
     • Email: kasun@domain.com
     • Location: Negombo
     • Sector / Topic: Negombo Lagoon Plastic Interception & Mangroves
     • Notes: Available on Saturday mornings with my own boat.
     ```
  3. It launches WhatsApp with the recipient set to `+94 77 970 5752`.
  4. The user simply taps "Send". BVF receives the request in real time on their official mobile phone.

---

### Channel 3: Direct Telephone & Social Messenger
* **Hotline Call:** Tap-to-call links (`tel:+94779705752` and `tel:+94773365114`) on the mobile dock and footer.
* **Direct Mailto:** Tap-to-email link (`mailto:bvfsrilanka@gmail.com`).
* **Official Facebook Page:** Links to `https://www.facebook.com/profile.php?id=100095383907228` where visitors can message the Facebook page via Messenger.

---

## 3. Recommended Administrative Workflow for BVF

1. **Daily Inbox Check:**
   * Filter/label incoming emails with `[BVF Portal]` in Gmail for automatic routing into a "Website Leads" or "Volunteers" folder.
2. **Reply Direct:**
   * Because the visitor's email is set as the `reply-to`, clicking **Reply** in Gmail directly sends an email back to the visitor.
3. **Save Contact to WhatsApp Group:**
   * Add applicant's phone number to BVF's volunteer broadcast list or regional WhatsApp volunteer groups (e.g. Negombo Lagoon Taskforce).
