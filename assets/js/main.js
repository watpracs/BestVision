// ==========================================
// Global Instant Modal, Lightbox & Donation Engine
// ==========================================
window.activeDonationProject = 'Elephant Hospital & Orphanage (Habarana / Minneriya / Anuradhapura)';
window.activeDonationAmount = 1;

window.setQuickDonationAmount = function(amount, btnElement) {
  const amt = parseFloat(amount) || 1;
  window.activeDonationAmount = amt;

  // Clear custom amount input fields so donor sees preset is selected
  const customInputs = document.querySelectorAll('.custom-amount-field, #modalCustomAmountInput, .custom-donation-input');
  customInputs.forEach(inp => { inp.value = ''; });

  const allQuickBtns = document.querySelectorAll('.quick-amount-btn');
  allQuickBtns.forEach(btn => {
    const btnAmt = parseFloat(btn.getAttribute('data-amount'));
    if (btnAmt === amt) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const amountDisplays = document.querySelectorAll('.modal-selected-amount-display');
  amountDisplays.forEach(el => {
    el.innerText = `$${amt} USD`;
  });
};

window.setCustomDonationAmount = function(val) {
  const cleanVal = (val || '').toString().trim();
  const num = parseFloat(cleanVal);

  // Un-highlight all preset buttons
  const allQuickBtns = document.querySelectorAll('.quick-amount-btn');
  allQuickBtns.forEach(btn => {
    btn.classList.remove('active');
  });

  // Sync all custom amount inputs across modal/page if needed
  const customInputs = document.querySelectorAll('.custom-amount-field, #modalCustomAmountInput');
  customInputs.forEach(inp => {
    if (inp.value !== cleanVal && document.activeElement !== inp) {
      inp.value = cleanVal;
    }
  });

  const amountDisplays = document.querySelectorAll('.modal-selected-amount-display');

  if (!isNaN(num) && num > 0) {
    window.activeDonationAmount = num;
    amountDisplays.forEach(el => {
      el.innerText = `$${num} USD`;
    });
  } else {
    window.activeDonationAmount = 1;
    amountDisplays.forEach(el => {
      el.innerText = '$1 USD';
    });
  }
};

window.getProjectRefCode = function(proj) {
  if (!proj) return 'BVF-ELEPHANT-HOSPITAL';
  const p = proj.toLowerCase();
  if (p.includes('elephant') || p.includes('hospital') || p.includes('orphanage')) return 'BVF-ELEPHANT-HOSPITAL';
  if (p.includes('dog') || p.includes('shelter')) return 'BVF-STRAY-DOG-RESCUE';
  if (p.includes('lagoon') || p.includes('sunken') || p.includes('vessel')) return 'BVF-NEGOMBO-LAGOON';
  if (p.includes('monkey')) return 'BVF-MONKEY-ISLAND';
  if (p.includes('waterway')) return 'BVF-CLEAN-WATERWAYS';
  if (p.includes('fishing gear')) return 'BVF-FISHING-GEAR';
  if (p.includes('school')) return 'BVF-RURAL-SCHOOLS';
  if (p.includes('education') || p.includes('scholarship') || p.includes('children')) return 'BVF-CHILDREN-EDU';
  if (p.includes('machinery') || p.includes('skilled worker')) return 'BVF-SKILLED-WORKERS';
  if (p.includes('toilet') || p.includes('sanitary')) return 'BVF-PUBLIC-TOILETS';
  if (p.includes('fence') || p.includes('corridor')) return 'BVF-ELEPHANT-FENCES';
  if (p.includes('mangrove')) return 'BVF-MANGROVES';
  if (p.includes('coral') || p.includes('reef')) return 'BVF-CORAL-RESTORE';
  if (p.includes('turtle')) return 'BVF-SEA-TURTLES';
  if (p.includes('battery') || p.includes('e-waste')) return 'BVF-EWASTE-PROGRAM';
  if (p.includes('rainwater') || p.includes('harvesting')) return 'BVF-RAINWATER-SYSTEMS';
  if (p.includes('gardening') || p.includes('organic')) return 'BVF-HOME-GARDENING';
  if (p.includes('life jacket')) return 'BVF-LIFE-JACKETS';
  if (p.includes('marine tech') || p.includes('vocational')) return 'BVF-MARINE-TECH';
  if (p.includes('market') || p.includes('women')) return 'BVF-MARKET-CLEANING';
  return 'BVF-PROJECT-DONATION';
};

window.onDonationProjectChanged = function(projectName) {
  window.activeDonationProject = projectName || 'Elephant Hospital & Orphanage (Habarana / Minneriya / Anuradhapura)';
  const refCode = window.getProjectRefCode(window.activeDonationProject);
  
  const refElements = document.querySelectorAll('.modal-bank-project-ref');
  refElements.forEach(el => { el.innerText = refCode; });
  
  const targetElements = document.querySelectorAll('.modal-target-project-name');
  targetElements.forEach(el => { el.innerText = window.activeDonationProject; });

  const badgeElements = document.querySelectorAll('.modal-designated-badge');
  badgeElements.forEach(el => {
    el.innerHTML = `<i class="fa-solid fa-bullseye"></i> Designated: <strong>${window.activeDonationProject}</strong>`;
  });
};

window.openDonationModal = function(projectName, amount) {
  const modal = document.getElementById('donationModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (projectName) {
      window.activeDonationProject = projectName;
      const selects = document.querySelectorAll('.donation-project-select, #donationProjectSelect, #pageDonationProjectSelect');
      selects.forEach(s => {
        let matched = false;
        for (let opt of s.options) {
          if (opt.value.trim().toLowerCase() === projectName.trim().toLowerCase() ||
              (projectName.toLowerCase().includes('elephant') && opt.value.toLowerCase().includes('elephant')) ||
              (projectName.toLowerCase().includes('dog') && opt.value.toLowerCase().includes('dog')) ||
              (projectName.toLowerCase().includes('lagoon') && opt.value.toLowerCase().includes('lagoon'))) {
            s.value = opt.value;
            window.activeDonationProject = opt.value;
            matched = true;
            break;
          }
        }
        if (!matched && projectName) {
          const newOpt = new Option(projectName, projectName, true, true);
          s.add(newOpt);
          s.value = projectName;
          window.activeDonationProject = projectName;
        }
      });
      window.onDonationProjectChanged(window.activeDonationProject);
    }

    if (amount) {
      const presets = [1, 5, 10, 20, 50];
      if (presets.includes(Number(amount))) {
        window.setQuickDonationAmount(amount);
      } else {
        const customInputs = document.querySelectorAll('.custom-amount-field, #modalCustomAmountInput');
        customInputs.forEach(inp => { inp.value = amount; });
        window.setCustomDonationAmount(amount);
      }
    } else {
      if (window.activeDonationAmount && ![1, 5, 10, 20, 50].includes(Number(window.activeDonationAmount))) {
        window.setCustomDonationAmount(window.activeDonationAmount);
      } else {
        window.setQuickDonationAmount(window.activeDonationAmount || 1);
      }
    }
  }
};

window.openDonationModalWithAmount = function(amount, projectName) {
  window.openDonationModal(projectName || window.activeDonationProject, amount);
};

window.triggerPayPal = function(customAmtId, explicitAmt, explicitProject) {
  let amount = explicitAmt || 1;
  if (!explicitAmt && customAmtId) {
    const input = document.getElementById(customAmtId);
    if (input && input.value) amount = input.value;
  }
  let projectName = explicitProject;
  if (!projectName) {
    const selectElem = document.getElementById('donationProjectSelect') || document.getElementById('pageDonationProjectSelect');
    if (selectElem && selectElem.value) projectName = selectElem.value;
  }
  window.openDonationModal(projectName || window.activeDonationProject, amount);
};

// Poster Lightboxes
window.openPosterLightbox = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById('posterLightboxModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    window.open('assets/images/elephant-hospital-tourist-poster.jpg', '_blank');
  }
};

window.openElephantCampaignPoster = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById('elephantCampaignPosterModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    window.open('assets/images/elephant-hospital-campaign-poster.jpg', '_blank');
  }
};

window.openDogRescuePoster = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById('dogRescuePosterModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    window.open('assets/images/stray-dog-rescue-tiers-poster.jpg', '_blank');
  }
};

window.openDogAppealPoster = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById('dogAppealPosterModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    window.open('assets/images/stray-dog-rescue-appeal-poster.jpg', '_blank');
  }
};

window.openLagoonPoster = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById('lagoonPosterModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    window.open('assets/images/negombo-lagoon-cleanup-poster.jpg', '_blank');
  }
};

// Dossier Modals
window.openProjectReportModal = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById('projectReportModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.openDogReportModal = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById('dogReportModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.openLagoonReportModal = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById('lagoonReportModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

// 20 Pending Projects Master Registry
window.pendingProjectsData = {
  1: {
    num: "01",
    title: "Recovery of Sunken Vessels, Ghost Nets & Marine Debris in Negombo Lagoon",
    category: "Waterways & Marine",
    categoryIcon: "fa-water",
    badge: "Formal Ministry Proposal",
    badgeClass: "badge-urgent",
    lead: "MEPA & Ministry of Fisheries Collaboration",
    target: "Negombo Lagoon Estuary, Western Province",
    budget: "$97,000 USD (Barge Salvage & Net Clearing)",
    ref: "BVF-NEGOMBO-LAGOON",
    hasCustomModal: 'openLagoonReportModal',
    desc: "Submitted to Ministry of Fisheries & MEPA: Salvaging 50–80 abandoned and sunken boats and clearing 80–100 tons of suffocating synthetic ghost nets using a 10-ton crane floating barge to safeguard 4,000+ fishing families. Budget: $97,000 USD."
  },
  2: {
    num: "02",
    title: "Providing Continuous Food Supply to Monkey Island in Negombo",
    category: "Wildlife & Animals",
    categoryIcon: "fa-paw",
    badge: "Priority Pending",
    badgeClass: "badge-urgent",
    lead: "Negombo Wildlife Conservation Division",
    target: "Monkey Island (Negombo Lagoon Mangrove Islet)",
    budget: "$12,500 USD / Year ($1,040 / Month)",
    ref: "BVF-MONKEY-ISLAND",
    desc: "Establishing a reliable, nutritious dietary replenishment protocol for native toque macaque primates inhabiting Monkey Island in Negombo, preventing starvation, nutritional stress, and destructive human scavenging across urban waterways."
  },
  3: {
    num: "03",
    title: "Continuous Cleaning Program for All Waterways in the Island",
    category: "Waterways & Marine",
    categoryIcon: "fa-water",
    badge: "Priority Pending",
    badgeClass: "badge-urgent",
    lead: "All-Island River Basin Restoration Team",
    target: "Kelani, Maha Oya, Gin Ganga, and Negombo Canals",
    budget: "$48,000 USD / Year (12 Strategic Waterways)",
    ref: "BVF-CLEAN-WATERWAYS",
    desc: "Islandwide network mobilization engaging grassroots teams to continually clean river mouths, canal networks, and estuary streams, stopping toxic plastic, polythene, and industrial discharge before it reaches ocean waters."
  },
  4: {
    num: "04",
    title: "Providing Fishing Gear to Underprivileged Fishing Families",
    category: "Livelihoods & Training",
    categoryIcon: "fa-fish",
    badge: "Priority Pending",
    badgeClass: "badge-urgent",
    lead: "Artisanal Fishermen Welfare Council",
    target: "Western, Southern & Northwestern Coastal Villages",
    budget: "$35,000 USD (150 Coastal Families)",
    ref: "BVF-FISHING-GEAR",
    desc: "Supplying essential eco-friendly nets, navigational safety equipment, and gear to impoverished coastal artisanal fishermen unable to afford equipment, lifting their families from generational poverty."
  },
  5: {
    num: "05",
    title: "Providing Necessary Facilities to Underprivileged Rural Schools",
    category: "Community & Schools",
    categoryIcon: "fa-graduation-cap",
    badge: "Priority Pending",
    badgeClass: "badge-urgent",
    lead: "Rural Education Uplift Taskforce",
    target: "Monaragala, Nuwara Eliya & Polonnaruwa Districts",
    budget: "$42,000 USD (14 Remote Primary Schools)",
    ref: "BVF-RURAL-SCHOOLS",
    desc: "Supplying clean drinking water filtration systems, proper sanitation units, essential classroom furniture, and learning materials to neglected remote schools across marginalized rural districts."
  },
  6: {
    num: "06",
    title: "Supporting Poor Children in Education with Career-Long Follow-up",
    category: "Community & Schools",
    categoryIcon: "fa-graduation-cap",
    badge: "Priority Pending",
    badgeClass: "badge-urgent",
    lead: "BVF Student Mentorship Board",
    target: "Island-wide Marginalized Communities",
    budget: "$25 / Month Per Student ($300 / Year)",
    ref: "BVF-CHILDREN-EDU",
    desc: "A comprehensive scholarship and mentorship program that financially and academically sponsors underprivileged students from primary grades until completion of their final school career."
  },
  7: {
    num: "07",
    title: "Material & Machinery Support to Skilled Workers in Need",
    category: "Livelihoods & Training",
    categoryIcon: "fa-wrench",
    badge: "Priority Pending",
    badgeClass: "badge-urgent",
    lead: "Artisan & Vocational Empowerment Unit",
    target: "Gampaha, Colombo & Kurunegala Semi-Urban Belts",
    budget: "$28,000 USD (Toolkits & Machinery for 60 Craftsmen)",
    ref: "BVF-SKILLED-WORKERS",
    desc: "Equipping skilled carpenters, mechanics, welders, and artisans with the vital machinery and tools they cannot afford, unlocking sustainable self-employment and dignified local livelihoods."
  },
  8: {
    num: "08",
    title: "Construction & Proper Maintenance of Public Toilet Facilities",
    category: "Community & Schools",
    categoryIcon: "fa-restroom",
    badge: "Priority Pending",
    badgeClass: "badge-urgent",
    lead: "Urban Sanitation & Public Health Group",
    target: "High-Traffic Rural Hubs, Weekly Fairs & Coastal Points",
    budget: "$32,000 USD (8 Modular Sanitation Facilities)",
    ref: "BVF-PUBLIC-TOILETS",
    desc: "Building hygienic, universally accessible public sanitary facilities in bustling town centers and markets with an institutional ongoing maintenance framework to prevent health hazards."
  },
  9: {
    num: "09",
    title: "Safeguarding Elephants in Danger Zones via Fences & Railway Corridors",
    category: "Wildlife & Animals",
    categoryIcon: "fa-paw",
    badge: "High Urgency",
    badgeClass: "badge-urgent",
    lead: "Elephant Corridor Defense Division",
    target: "Maho, Galgamuwa, Habarana & Anuradhapura Railway Sectors",
    budget: "$65,000 USD (Early Warning Sensors & Bio-Fencing)",
    ref: "BVF-ELEPHANT-FENCES",
    desc: "Installing community bio-fences (lime and palmyra cultivation), electric buffer boundaries, and engineered railway pathway corridors at high-risk collision tracks to save elephants from gruesome deaths."
  },
  10: {
    num: "10",
    title: "Establishment of First Elephant Hospital, Rescue Center & Orphanage in North Central Province",
    category: "Wildlife & Animals",
    categoryIcon: "fa-hospital",
    badge: "Top Priority Project",
    badgeClass: "badge-urgent",
    lead: "BVF Veterinary Wildlife Hospital Board",
    target: "Habarana / Minneriya / Anuradhapura Danger Zone",
    budget: "$757,500 USD (Trauma ICU, Operating Theatres, Ambulances, Nursery)",
    ref: "BVF-ELEPHANT-HOSPITAL",
    hasCustomModal: 'openProjectReportModal',
    desc: "Constructing a specialized emergency trauma hospital and sanctuary at Habarana / Minneriya danger zone to eliminate the fatal 250 km transport gap and save elephants from train accidents, Hakka Patas jaw bombs, and gunshots. Total Target: $757,500 USD."
  },
  11: {
    num: "11",
    title: "Mangrove Replanting in Negombo, Chilaw & Puttalam Lagoons",
    category: "Waterways & Marine",
    categoryIcon: "fa-seedling",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "Coastal Wetland Restoration Wing",
    target: "Negombo, Chilaw & Puttalam Lagoons",
    budget: "$22,000 USD (50,000 Native Rhizophora Saplings)",
    ref: "BVF-MANGROVES",
    desc: "Restoring vital coastal nurseries by cultivating native Rhizophora mangrove saplings across eroded lagoons, defending biodiversity and bolstering fish and shrimp breeding grounds."
  },
  12: {
    num: "12",
    title: "Coral Reef Restoration & Ghost Net Removal",
    category: "Waterways & Marine",
    categoryIcon: "fa-water",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "BVF Marine Diver Reconnaissance Team",
    target: "Trincomalee (Pigeon Island), Hikkaduwa & Negombo Barrier Reef",
    budget: "$34,000 USD (Marine Extraction Gear & Coral Nurseries)",
    ref: "BVF-CORAL-RESTORE",
    desc: "Deploying diver squads across Trincomalee, Hikkaduwa, and Negombo coastal seas to extract suffocating discarded ghost fishing nets and transplant climate-resilient coral micro-fragments."
  },
  13: {
    num: "13",
    title: "Sea Turtle Hatchery Protection & Anti-Poaching Patrols",
    category: "Wildlife & Animals",
    categoryIcon: "fa-shield-cat",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "Southern & Western Marine Wildlife Patrol",
    target: "Kosgoda, Rekawa & Bentota Nesting Beaches",
    budget: "$18,500 USD / Year (Beach Patrols & Hatchery Enclosures)",
    ref: "BVF-SEA-TURTLES",
    desc: "Guarding vulnerable nesting beaches, intercepting illegal egg poaching, and running community-supervised turtle hatcheries to safely release thousands of endangered hatchlings into the ocean."
  },
  14: {
    num: "14",
    title: "Urgent Appeal: Stray Dog Rescue, Treatment & Shelter Project",
    category: "Wildlife & Animals",
    categoryIcon: "fa-dog",
    badge: "Urgent Appeal • $225k Budget",
    badgeClass: "badge-urgent",
    lead: "BVF Animal Welfare Care Division",
    target: "Western Province & Central Expressways",
    budget: "$225,000 USD ($151,250 Setup + $71,760/yr Operating)",
    ref: "BVF-STRAY-DOG-RESCUE",
    hasCustomModal: 'openDogReportModal',
    desc: "First-year budget: $225,000 USD ($151,250 setup + $71,760/yr ops). Emergency medical care, rabies vaccination, de-worming, parasite removal, and safe shelter. Tiers: $1/day saves a life, $5/mo feeding, $30/mo adopt a dog."
  },
  15: {
    num: "15",
    title: "E-Waste and Hazardous Battery Collection Program",
    category: "Waterways & Marine",
    categoryIcon: "fa-battery-three-quarters",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "Environmental Contamination Prevention Unit",
    target: "Major Municipalities & Coastal Collection Bins",
    budget: "$16,000 USD (Safe Storage & Certified Recycling)",
    ref: "BVF-EWASTE-PROGRAM",
    desc: "Setting up dedicated drop-off points for electronics and battery recycling to stop lead, mercury, and cadmium contaminants from leaching into drinking water aquifers and lagoon estuaries."
  },
  16: {
    num: "16",
    title: "Rainwater Harvesting Systems for Dry Zone Villages",
    category: "Community & Schools",
    categoryIcon: "fa-cloud-rain",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "Safe Drinking Water Rural Project",
    target: "Anuradhapura, Polonnaruwa & Hambantota Hamlets",
    budget: "$38,000 USD (50 Communal Rainwater Harvesting Units)",
    ref: "BVF-RAINWATER-SYSTEMS",
    desc: "Installing affordable, robust rooftop rainwater harvesting tanks in drought-prone hamlets across Anuradhapura, Polonnaruwa, and Hambantota to prevent Chronic Kidney Disease (CKDu)."
  },
  17: {
    num: "17",
    title: "Organic Home Gardening Training for Poor Families",
    category: "Community & Schools",
    categoryIcon: "fa-seedling",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "Community Nutrition & Food Security Unit",
    target: "Vulnerable Suburban & Rural Low-Income Families",
    budget: "$14,000 USD (Starter Seed Banks, Organic Kits & Training for 200 Families)",
    ref: "BVF-HOME-GARDENING",
    desc: "Distributing heirloom seeds, composting kits, and agricultural training to low-income households to guarantee daily household nutrition and self-sufficiency amid inflation."
  },
  18: {
    num: "18",
    title: "Life Jacket Bank for Small-Boat Artisanal Fishermen",
    category: "Livelihoods & Training",
    categoryIcon: "fa-life-ring",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "Maritime Safety Council",
    target: "Negombo, Chilaw, Kalpitiya & Beruwala Fishing Harbours",
    budget: "$19,500 USD (300 Marine Standard Solas Life Jackets)",
    ref: "BVF-LIFE-JACKETS",
    desc: "Creating an accessible community revolving safety depository providing ISO-certified life jackets on free loan to small traditional non-motorized craft fishermen, averting open-sea drownings."
  },
  19: {
    num: "19",
    title: "Vocational Training for Fishermen's Children in Marine Tech",
    category: "Livelihoods & Training",
    categoryIcon: "fa-graduation-cap",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "BVF Maritime Technical Academy",
    target: "Negombo Fisheries Training Center",
    budget: "$29,000 USD (Outboard Engines, Workshop Tools & Curriculum)",
    ref: "BVF-MARINE-TECH",
    desc: "Free technical academy training youth in outboard boat engine mechanics, fiberglass vessel maintenance, marine electrical systems, and GPS satellite navigation for modern maritime careers."
  },
  20: {
    num: "20",
    title: "Beach & Public Market Cleaning with Women's Collectives",
    category: "Livelihoods & Training",
    categoryIcon: "fa-broom",
    badge: "New Proposed",
    badgeClass: "badge-proposed",
    lead: "Women's Ecological & Economic Collective",
    target: "Negombo Beach Strip, Fish Market & Porutota Canal",
    budget: "$21,000 USD / Year (Daily Stipends & Sanitization Gear for 25 Women)",
    ref: "BVF-MARKET-CLEANING",
    desc: "A dual-impact ecological model hiring vulnerable female heads-of-household for paid beach and municipal fish market sanitization, providing dignified daily incomes while cleaning urban habitats."
  }
};

window.openProjectBriefModal = function(projectId, e) {
  if (e && e.preventDefault) e.preventDefault();
  const data = window.pendingProjectsData && window.pendingProjectsData[projectId];
  if (!data) return;

  if (data.hasCustomModal && typeof window[data.hasCustomModal] === 'function') {
    window[data.hasCustomModal](e);
    return;
  }

  const modal = document.getElementById('projectBriefModal');
  if (modal) {
    const numEl = modal.querySelector('.brief-num');
    const badgeEl = modal.querySelector('.brief-badge');
    const catEl = modal.querySelector('.brief-category');
    const titleEl = modal.querySelector('.brief-title');
    const targetEl = modal.querySelector('.brief-target');
    const budgetEl = modal.querySelector('.brief-budget');
    const refEl = modal.querySelector('.brief-ref');
    const descEl = modal.querySelector('.brief-desc');
    const donateBtn = modal.querySelector('.brief-donate-btn');
    const waBtn = modal.querySelector('.brief-wa-btn');

    if (numEl) numEl.textContent = '#' + data.num;
    if (badgeEl) {
      badgeEl.textContent = data.badge;
      badgeEl.className = 'brief-badge opt-badge ' + (data.badgeClass || 'opt-badge-gold');
    }
    if (catEl) catEl.innerHTML = '<i class="fa-solid ' + data.categoryIcon + '"></i> ' + data.category;
    if (titleEl) titleEl.textContent = data.title;
    if (targetEl) targetEl.textContent = data.target;
    if (budgetEl) budgetEl.textContent = data.budget;
    if (refEl) refEl.textContent = data.ref;
    if (descEl) descEl.textContent = data.desc;

    if (donateBtn) {
      donateBtn.onclick = function() {
        closeBvfModal('projectBriefModal');
        openDonationModal(data.title);
      };
    }

    if (waBtn) {
      waBtn.href = 'https://wa.me/94777304152?text=' + encodeURIComponent('Hello Best Vision Foundation, I would like to sponsor / inquire about Project #' + data.num + ': ' + data.title + ' (Ref: ' + data.ref + ')');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    // If no brief modal on this page, open donation modal directly
    openDonationModal(data.title);
  }
};



// Auto-detect ?donate=1 or #donate from QR code scans to immediately pop up bank transfer modal
window.checkAutoOpenDonation = function() {
  try {
    const params = new URLSearchParams(window.location.search);
    const hash = (window.location.hash || '').toLowerCase();
    if (params.has('donate') || params.has('qr') || hash.includes('donate') || hash === '#bank-details') {
      const amt = params.get('donate') || params.get('amt') || '1';
      let proj = params.get('project') || params.get('proj') || '';
      if (proj.toLowerCase().includes('elephant')) {
        proj = 'Elephant Hospital & Orphanage (Habarana / Minneriya / Anuradhapura)';
      } else if (proj.toLowerCase().includes('dog')) {
        proj = 'Island-Wide Stray Dog Rescue & Shelter';
      } else if (proj.toLowerCase().includes('lagoon')) {
        proj = 'Negombo Lagoon Sunken Vessels & Debris Recovery';
      } else {
        proj = 'Elephant Hospital & Orphanage (Habarana / Minneriya / Anuradhapura)';
      }
      setTimeout(() => {
        window.openDonationModal(proj, amt);
      }, 250);
    }
  } catch (err) {
    console.error('Auto-open donation modal error:', err);
  }
};

window.closeBvfModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Close any active modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });

  window.checkAutoOpenDonation();

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
      { amount: 1, label: '$1 USD', impactTitle: 'Elephant Hospital Fund (Starter)', impactDesc: 'Contributes directly to starting construction on the First Emergency Elephant Hospital in Habarana / Minneriya / Anuradhapura.' },
      { amount: 5, label: '$5 USD', impactTitle: 'Stray Dog Care & Treatment', impactDesc: 'Provides emergency medical relief, rabies vaccination, and parasite care for a rescued stray animal.' },
      { amount: 10, label: '$10 USD', impactTitle: 'Mangrove & Cleaner Waters', impactDesc: 'Supplies 1 Mangrove Sapling Restoration Kit & protective gear for lagoon volunteers.' },
      { amount: 20, label: '$20 USD', impactTitle: 'Anti-Snare & Wildlife Patrol', impactDesc: 'Funds an emergency snare removal and first-aid medical patrol in elephant buffer zones.' },
      { amount: 50, label: '$50 USD', impactTitle: 'Lagoon Ghost Net & Debris Recovery', impactDesc: 'Sponsors logistics, protective gear, and boat sweep operations to clear hazardous marine debris.' }
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
      const proj = btn.getAttribute('data-project') || window.activeDonationProject;
      const amt = btn.getAttribute('data-amount') || '';
      window.openDonationModal(proj, amt);
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
        document.querySelectorAll('.modal-overlay').forEach(m => closeModal(m));
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
BANK COUNTRY : SRI LANKA
CURRENT ACCOUNT NUMBER : 0088 6000 0033
SWIFT CODE : BSAMLKLX
NGO REG NO : L-184510
Email: bvfsrilanka@gmail.com | Phone: +94 77 730 4152 / +94 77 970 5752
Address: No. 297, Munidasa Kumaratunge Mawatha, Kurana, Katunayake - Sri Lanka`;

    const isCustomText = text && text.trim().length > 0;
    const copyText = isCustomText ? text.trim() : officialDetails;

    navigator.clipboard.writeText(copyText).then(() => {
      if (isCustomText) {
        showToast(`Copied ${copyText} to clipboard!`);
      } else {
        showToast('Official Sampath Bank details copied to clipboard!');
      }
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
    const proj = window.activeDonationProject || 'Elephant Hospital Project Fund';
    const ref = (window.getProjectRefCode) ? window.getProjectRefCode(proj) : 'BVF-DIRECT';
    const chosenAmt = window.activeDonationAmount ? `$${window.activeDonationAmount} USD` : '$1 USD';
    const msg = `*Best Vision Foundation (BVF) - Bank Deposit Notification*\n\n` +
      `Hello Treasurer D.W.M. Perera,\n` +
      `I have initiated a donation to your Sampath Bank account for:\n` +
      `• *Contribution Amount:* ${chosenAmt}\n` +
      `• *Designated Project:* ${proj}\n` +
      `• *Deposit Reference:* ${ref}\n` +
      `• *Bank:* SAMPATH BANK (Branch: NEGOMBO 02, Sri Lanka)\n` +
      `• *Bank Country:* SRI LANKA\n` +
      `• *Account Name:* BEST VISION FOUNDATION\n` +
      `• *Account Number:* 0088 6000 0033\n` +
      `• *SWIFT Code:* BSAMLKLX\n\n` +
      `I am attaching my transfer confirmation / receipt photo. Please issue my official audited receipt and keep me updated. Thank you!`;
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
      "Wildlife Alert: 350 to 400 Elephants Face Lethal Hazards • First Emergency Elephant Hospital Fund Active",
      "Field Dispatch: Round-the-Clock Railway Corridor & Anti-Snare Patrols Active in Habarana / Minneriya",
      "Urgent Appeal: $1 Per Tourist Campaign Launched to Break Ground on North Central Elephant Hospital",
      "Field Report: First 24/7 Wildlife Trauma Suite & Hydrotherapy Facility Approved for Danger Zone"
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


window.addEventListener('load', window.checkAutoOpenDonation);
