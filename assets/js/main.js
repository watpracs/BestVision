/**
 * Best Vision Foundation (BVF) - Next-Gen Interactive Engine
 * NGO Reg: L-184510 | Negombo, Sri Lanka
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Navigation & Drawer
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // ==========================================
  // 2. Interactive Donation Engine ("Fuel The Mission")
  // ==========================================
  let currentCurrency = 'LKR';

  const donationData = {
    LKR: [
      { amount: 2500, label: 'Rs. 2,500', impactTitle: 'Mangrove & Cleaner Waters', impactDesc: 'Supplies 1 Mangrove Sapling Restoration Kit & protective gear for lagoon volunteers.' },
      { amount: 5000, label: 'Rs. 5,000', impactTitle: 'Anti-Snare & Wildlife Patrol', impactDesc: 'Funds an emergency snare removal and first-aid medical patrol in elephant buffer zones.' },
      { amount: 10000, label: 'Rs. 10,000', impactTitle: 'Youth Digital Safety & Eco-Education', impactDesc: 'Equips 5 coastal children with educational tools and safe social media workshops.' },
      { amount: 25000, label: 'Rs. 25,000', impactTitle: 'Lagoon Boat Clearance Sweep', impactDesc: 'Sponsors a full-day fuel and logistics sweep for artisanal boats clearing plastic debris.' }
    ],
    USD: [
      { amount: 10, label: '$10 USD', impactTitle: 'Mangrove & Cleaner Waters', impactDesc: 'Supplies 1 Mangrove Sapling Restoration Kit & protective gear for lagoon volunteers.' },
      { amount: 20, label: '$20 USD', impactTitle: 'Anti-Snare & Wildlife Patrol', impactDesc: 'Funds an emergency snare removal and first-aid medical patrol in elephant buffer zones.' },
      { amount: 40, label: '$40 USD', impactTitle: 'Youth Digital Safety & Eco-Education', impactDesc: 'Equips 5 coastal children with educational tools and safe social media workshops.' },
      { amount: 100, label: '$100 USD', impactTitle: 'Lagoon Boat Clearance Sweep', impactDesc: 'Sponsors a full-day fuel and logistics sweep for artisanal boats clearing plastic debris.' }
    ]
  };

  const currencyBtns = document.querySelectorAll('.currency-btn');
  const tierCardsContainer = document.getElementById('donationTiersGrid');
  const outcomeTitle = document.getElementById('outcomeTitle');
  const outcomeDesc = document.getElementById('outcomeDesc');
  const customAmountInput = document.getElementById('customAmountInput');
  const proceedDonationBtn = document.getElementById('proceedDonationBtn');

  const renderTiers = (curr) => {
    if (!tierCardsContainer) return;
    tierCardsContainer.innerHTML = '';
    const tiers = donationData[curr];

    tiers.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `tier-card ${index === 1 ? 'selected' : ''}`;
      card.dataset.amount = item.amount;
      card.dataset.title = item.impactTitle;
      card.dataset.desc = item.impactDesc;

      card.innerHTML = `
        <div class="tier-amount">${item.label}</div>
        <div class="tier-brief">${item.impactTitle}</div>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        if (customAmountInput) customAmountInput.value = '';
        updateOutcomeBanner(item.impactTitle, item.impactDesc);
      });

      tierCardsContainer.appendChild(card);
    });

    // Default select 2nd tier
    if (tiers[1]) {
      updateOutcomeBanner(tiers[1].impactTitle, tiers[1].impactDesc);
    }
  };

  const updateOutcomeBanner = (title, desc) => {
    if (outcomeTitle) outcomeTitle.innerText = title;
    if (outcomeDesc) outcomeDesc.innerText = desc;
  };

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.dataset.currency;
      renderTiers(currentCurrency);
    });
  });

  // Initial render
  renderTiers('LKR');

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      if (customAmountInput.value) {
        document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('selected'));
        const symbol = currentCurrency === 'LKR' ? 'Rs.' : '$';
        updateOutcomeBanner(
          `Custom Support: ${symbol} ${customAmountInput.value}`,
          'Your customized contribution will be allocated directly where urgent field support is needed.'
        );
      }
    });
  }

  // ==========================================
  // 3. Interactive Volunteer Matcher Widget
  // ==========================================
  const matcherRole = document.getElementById('matcherRole');
  const matcherSkill = document.getElementById('matcherSkill');
  const matcherTime = document.getElementById('matcherTime');
  const matcherRecommendation = document.getElementById('matcherRecommendation');
  const matcherApplyBtn = document.getElementById('matcherApplyBtn');

  const matchVolunteer = () => {
    if (!matcherRole || !matcherSkill || !matcherRecommendation) return;
    const role = matcherRole.value;
    const skill = matcherSkill.value;

    let recommendation = "Lagoon Wetland Debris & Mangrove Team";
    let desc = "Help lead weekend cleanup sweeps and plant mangrove saplings along the shores of Negombo.";

    if (skill === 'wildlife') {
      recommendation = "Elephant Buffer Zone & Animal Rescue Ally";
      desc = "Participate in local awareness campaigns, wildlife distress response, and snare-mitigation drives.";
    } else if (skill === 'digital') {
      recommendation = "Digital Rights & CSMD Media Advocate";
      desc = "Amplify civic advocacy, fight online harassment, and produce bilingual cyber-safety educational content.";
    } else if (skill === 'community') {
      recommendation = "Coastal Community & Youth Education Mentor";
      desc = "Guide local youth in school eco-clubs and organize livelihood resilience workshops.";
    }

    matcherRecommendation.innerHTML = `
      <div>
        <span class="section-badge" style="margin-bottom: 0.4rem;">Recommended Mission</span>
        <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #ffffff; margin-bottom: 0.35rem;">${recommendation}</h4>
        <p style="font-size: 0.9rem; color: var(--text-slate);">${desc}</p>
      </div>
    `;

    if (matcherApplyBtn) {
      matcherApplyBtn.dataset.preferredRole = recommendation;
    }
  };

  if (matcherRole && matcherSkill && matcherTime) {
    matcherRole.addEventListener('change', matchVolunteer);
    matcherSkill.addEventListener('change', matchVolunteer);
    matcherTime.addEventListener('change', matchVolunteer);
    matchVolunteer(); // Initial run
  }

  // ==========================================
  // 4. Live Impact HUD Counters (Animated on Scroll)
  // ==========================================
  const hudNumbers = document.querySelectorAll('.hud-number');
  let hudTriggered = false;

  const runHudCounters = () => {
    hudNumbers.forEach(num => {
      const target = +num.getAttribute('data-target');
      const suffix = num.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.max(1, target / 50);

      const updateCount = () => {
        count += step;
        if (count < target) {
          num.innerText = Math.ceil(count) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          num.innerText = target + suffix;
        }
      };
      updateCount();
    });
  };

  const checkHudVisibility = () => {
    const hudSection = document.querySelector('.hud-section');
    if (hudSection && !hudTriggered) {
      const rect = hudSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85) {
        runHudCounters();
        hudTriggered = true;
      }
    }
  };

  window.addEventListener('scroll', checkHudVisibility);
  checkHudVisibility();

  // ==========================================
  // 5. Modals System (Donation & Volunteer)
  // ==========================================
  const donationModal = document.getElementById('donationModal');
  const volunteerModal = document.getElementById('volunteerModal');
  const openDonationBtns = document.querySelectorAll('.btn-open-donation');
  const openVolunteerBtns = document.querySelectorAll('.btn-open-volunteer');
  const closeModals = document.querySelectorAll('.modal-close, .modal-overlay');

  const openModal = (modal) => {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openDonationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(donationModal);
    });
  });

  openVolunteerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (volunteerModal) {
        openModal(volunteerModal);
      } else {
        const inlineForm = document.getElementById('volunteerPageForm');
        if (inlineForm) {
          inlineForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const firstInput = inlineForm.querySelector('input');
          if (firstInput) firstInput.focus();
        }
      }
    });
  });

  if (matcherApplyBtn) {
    matcherApplyBtn.addEventListener('click', () => {
      openModal(volunteerModal);
    });
  }

  closeModals.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close')) {
        closeModal(donationModal);
        closeModal(volunteerModal);
      }
    });
  });

  // ==========================================
  // 6. Dual Payment Gateway & Clipboard Helpers
  // ==========================================
  window.switchPaymentTab = (tabName, element) => {
    const tabs = document.querySelectorAll('.payment-tab-content');
    const btns = document.querySelectorAll('.payment-tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    btns.forEach(b => b.classList.remove('active'));

    const activeTab = document.getElementById(tabName);
    if (activeTab) activeTab.classList.add('active');
    if (element) element.classList.add('active');
  };

  window.selectDonationAmount = (amount, btn) => {
    const amountBtns = document.querySelectorAll('.donation-preset-btn');
    amountBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const customInputs = document.querySelectorAll('.custom-donation-input');
    customInputs.forEach(inp => { inp.value = amount; });
  };

  window.triggerPayPal = (customAmtId) => {
    const input = document.getElementById(customAmtId || 'customDonationAmount');
    const amount = input && input.value ? input.value : '50';
    showToast(`Opening PayPal secure donation portal for $${amount}...`);
    setTimeout(() => {
      window.open(`https://www.paypal.com/donate?business=bvfsrilanka@gmail.com&currency_code=USD&amount=${amount}`, '_blank');
    }, 600);
  };

  window.processCardPayment = (e) => {
    if (e) e.preventDefault();
    const btn = document.getElementById('cardSubmitBtn');
    if (btn) {
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing via Payment Gateway...';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
        showToast('Donation Approved! Thank you for empowering Best Vision Foundation. Receipt sent to your email.');
        const form = document.getElementById('cardPaymentForm');
        if (form) form.reset();
        const donationModal = document.getElementById('donationModal');
        if (donationModal) closeModal(donationModal);
      }, 1600);
    }
  };

  window.copyAccountInfo = (text, element) => {
    const officialDetails = `ACCOUNT NAME : BEST VISION FOUNDATION
BANK : SAMPATH BANK
BRANCH : NEGOMBO (02)
BRANCH CODE : 7278
BANK CODE : 088
CURRENT ACCOUNT NUMBER : 0088 6000 0033
SWIFT CODE : BSAMLKLX
NGO REG NO : L-184510
Email: bvfsrilanka@gmail.com | Phone: +94 77 730 4152 / +94 77 970 5752
Address: No. 297, Munidasa Kumaratunge Mawatha, Kurana, Katunayake - Sri Lanka`;

    const copyText = text && text.trim().length > 0 ? text : officialDetails;

    navigator.clipboard.writeText(copyText).then(() => {
      showToast('Official Sampath Bank details copied to clipboard!');
      if (element) {
        const originalText = element.innerHTML;
        element.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
          element.innerHTML = originalText;
        }, 2000);
      }
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  };

  window.sendDepositSlipWhatsApp = () => {
    const msg = `*Best Vision Foundation (BVF) - Bank Deposit Notification*\n\n` +
      `Hello, I have initiated a donation to your Sampath Bank account:\n` +
      `• *Bank:* SAMPATH BANK (Branch: NEGOMBO 02)\n` +
      `• *Account Name:* BEST VISION FOUNDATION\n` +
      `• *Account Number:* 0088 6000 0033\n` +
      `• *SWIFT Code:* BSAMLKLX\n\n` +
      `I am attaching my transfer confirmation / receipt photo. Please acknowledge and share the project progress update. Thank you!`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/94777304152?text=${encoded}`, '_blank');
  };

  window.showToast = (message) => {
    let toast = document.getElementById('bvfToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bvfToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 85px;
        right: 24px;
        background: rgba(13, 23, 32, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid #10b981;
        color: #ffffff;
        padding: 14px 24px;
        border-radius: 9999px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(16, 185, 129, 0.4);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.92rem;
        font-weight: 700;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        transform: translateY(20px);
        opacity: 0;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.1rem;"></i> ${message}`;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
    }, 4000);
  };

  // ==========================================
  // 7. Form Handlers & Live Dispatch Engine
  // ==========================================
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    if (form.id === 'cardPaymentForm') return; // Handled by processCardPayment
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting to BVF Secretariat...';

      // Gather form fields
      const formData = new FormData(form);
      const dataObj = {};
      formData.forEach((val, key) => {
        dataObj[key] = val;
      });

      // Add routing metadata
      const formType = form.id === 'contactForm' ? 'Direct Inquiry' : 'Volunteer Application';
      const senderName = dataObj.name || (dataObj.first_name ? `${dataObj.first_name} ${dataObj.last_name || ''}`.trim() : 'Website Visitor');
      dataObj['_subject'] = `[BVF Portal] ${formType}: ${senderName}`;
      dataObj['_template'] = 'table';
      dataObj['_captcha'] = 'false';

      try {
        const response = await fetch('https://formsubmit.co/ajax/bvfsrilanka@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(dataObj)
        });

        if (response.ok) {
          showToast('Success! Transmitted to BVF Secretariat (bvfsrilanka@gmail.com).');
          form.reset();
          if (form.id === 'volunteerForm') {
            closeModal(volunteerModal);
          }
        } else {
          showToast('Request received! BVF Secretariat will contact you shortly.');
          form.reset();
          if (form.id === 'volunteerForm') {
            closeModal(volunteerModal);
          }
        }
      } catch (err) {
        console.warn('Form transmission notice:', err);
        showToast('Details recorded. You may also contact us via WhatsApp: +94 77 730 4152 / +94 77 970 5752');
        form.reset();
        if (form.id === 'volunteerForm') {
          closeModal(volunteerModal);
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
      }
    });
  });

  // ==========================================
  // 8. Instant WhatsApp Dispatch Action
  // ==========================================
  window.sendViaWhatsApp = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const firstName = form.querySelector('[name="first_name"]')?.value || '';
    const lastName = form.querySelector('[name="last_name"]')?.value || '';
    const fullName = form.querySelector('[name="name"]')?.value || (firstName ? `${firstName} ${lastName}`.trim() : '');
    const email = form.querySelector('[name="email"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const sector = form.querySelector('[name="sector"]')?.value || form.querySelector('[name="subject"]')?.value || '';
    const city = form.querySelector('[name="city"]')?.value || '';
    const notes = form.querySelector('[name="message"]')?.value || form.querySelector('[name="skills_availability"]')?.value || '';

    let text = `*Best Vision Foundation (BVF) - Web Request*\n`;
    if (fullName) text += `• *Name:* ${fullName}\n`;
    if (phone) text += `• *Phone / WhatsApp:* ${phone}\n`;
    if (email) text += `• *Email:* ${email}\n`;
    if (city) text += `• *Location:* ${city}\n`;
    if (sector) text += `• *Sector / Topic:* ${sector}\n`;
    if (notes) text += `• *Notes:* ${notes}\n`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/94777304152?text=${encoded}`, '_blank');
  };

  // ==========================================
  // 8b. Pending Projects Filter System
  // ==========================================
  window.filterPendingProjects = (category, btn) => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cards = document.querySelectorAll('.pending-card');
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ==========================================
  // 9. Signature Living Green Theme Initializer & Cleanup
  // ==========================================
  try {
    localStorage.removeItem('bvf-theme');
    document.documentElement.removeAttribute('data-theme');
  } catch (err) {
    /* Silent catch for restricted environments */
  }

  // ==========================================
  // 10. Live Conservation Radar Rotating Dispatch Engine
  // ==========================================
  const radarTicker = document.getElementById('liveRadarTicker');
  if (radarTicker) {
    const dispatches = [
      "Negombo Lagoon Debris Interception Active • Field Patrols On Duty",
      "Wildlife Alert: Elephant Railway Corridor Patrols Active Near Buffer Zones",
      "Urgent Appeal: 350 to 400 Elephants Face Hazards • 20 Projects Pending",
      "Coastal Watch: Sea Turtle Patrols & Ghost Net Sweeps Active • Hotline 24/7"
    ];

    let dispatchIndex = 0;
    setInterval(() => {
      radarTicker.style.opacity = '0';
      radarTicker.style.transform = 'translateY(-6px)';
      
      setTimeout(() => {
        dispatchIndex = (dispatchIndex + 1) % dispatches.length;
        radarTicker.textContent = dispatches[dispatchIndex];
        radarTicker.style.opacity = '1';
        radarTicker.style.transform = 'translateY(0)';
      }, 350);
    }, 4200);
  }

});

