/**
 * Soujanya - Professional Portfolio
 * Basic, clean vanilla JavaScript for interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Dark / Light Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('soujanya-portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('soujanya-portfolio-theme', newTheme);
    });
  }

  // 3. Cockpit Interactive Views (Marketing ROI / Financial Modeling / Power BI)
  const cockpitTabs = document.querySelectorAll('.cockpit-tab');
  const cockpitContents = document.querySelectorAll('.cockpit-content');

  cockpitTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      cockpitTabs.forEach(t => t.classList.remove('active'));
      // Remove active from all views
      cockpitContents.forEach(c => c.classList.remove('active'));

      // Set active current tab
      tab.classList.add('active');

      // Show target content view
      const targetViewId = 'view-' + tab.getAttribute('data-view');
      const targetContent = document.getElementById(targetViewId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 4. Scroll Spy - Highlight Active Nav Link based on Scroll Position
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 5. Project Case Study Modals Data & Interactions
  const caseStudies = {
    'modal-pbi': {
      title: 'Power BI Executive Sales Performance Cockpit',
      category: 'Business Intelligence & Data Visualization',
      goal: 'Design an interactive, executive-ready Power BI reporting suite that unifies multi-channel sales data into real-time KPI visibility.',
      tools: 'Power BI, DAX Measures, Star-Schema Data Modeling, Power Query',
      highlights: [
        'Structured automated data pipeline importing quarterly sales records from Excel datasets.',
        'Created dynamic DAX formulas for Year-over-Year (YoY) growth, customer margin, and rolling averages.',
        'Engineered interactive slicers for geographic segmentation and category performance breakdown.',
        'Empowered decision-makers to identify top-performing regions and underperforming SKUs instantly.'
      ],
      impact: 'Eliminated 8 hours of manual weekly reporting, delivering immediate visual insights to leadership.'
    },
    'modal-marketing': {
      title: 'Performance Marketing & Omnichannel Campaign Plan',
      category: 'Digital Marketing & Growth Strategy',
      goal: 'Formulate an end-to-end digital acquisition strategy for a consumer lifestyle brand, optimizing customer acquisition cost (CAC) and conversion rates.',
      tools: 'Digital Marketing Strategy, Google Analytics, Social Ad Funnels, SEO & Keyword Mapping',
      highlights: [
        'Conducted thorough target demographic persona research and customer journey stage mapping.',
        'Designed multi-tier retargeting funnels across paid social and search engine channels.',
        'Developed tailored ad copy and creative briefs targeted at high-intent purchase segments.',
        'Established quantitative A/B testing frameworks for landing page headlines and CTA buttons.'
      ],
      impact: 'Modeled a projected 28% reduction in CAC and a 4.6x projected Return on Ad Spend (ROAS).'
    },
    'modal-excel': {
      title: 'Excel Financial Forecast & Budget Variance Model',
      category: 'Financial Modeling & Business Analysis',
      goal: 'Construct a flexible, audit-ready financial statement forecasting and variance analysis spreadsheet model for quarterly budget tracking.',
      tools: 'Advanced MS Excel (XLOOKUP, Pivot Tables, Scenario Manager, Data Validation)',
      highlights: [
        'Formulated linked dynamic revenue and operating expenditure projection schedules.',
        'Built dynamic scenario managers testing Best-Case, Base-Case, and Conservative-Case operating assumptions.',
        'Designed interactive Pivot Table variance reporting dashboards with automated conditional formatting alerts.',
        'Calculated key financial ratios including Operating Margin, Quick Ratio, and Working Capital cycle.'
      ],
      impact: 'Delivered 99.4% variance tracking precision, empowering transparent cost management.'
    }
  };

  const projectButtons = document.querySelectorAll('.project-btn');
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');

  function openModal(studyKey) {
    const data = caseStudies[studyKey];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-case-header">
        <div class="modal-case-meta">
          <span>${data.category}</span>
        </div>
        <h3 class="modal-case-title">${data.title}</h3>
      </div>
      
      <div class="modal-case-section">
        <h4>Objective</h4>
        <p>${data.goal}</p>
      </div>

      <div class="modal-case-section">
        <h4>Tools & Techniques</h4>
        <p><strong>${data.tools}</strong></p>
      </div>

      <div class="modal-case-section">
        <h4>Key Project Contributions</h4>
        <ul>
          ${data.highlights.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-case-section">
        <h4>Strategic Outcome</h4>
        <p><strong>${data.impact}</strong></p>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 6. Contact Form Submission Feedback (Basic Toast Notification)
  const contactForm = document.getElementById('contactForm');
  const toastNotification = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');

  function showToast(message) {
    if (!toastNotification) return;
    toastText.textContent = message;
    toastNotification.classList.add('active');

    setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const senderName = nameInput ? nameInput.value.trim() : 'there';

      // Friendly confirmation toast
      showToast(`Thank you, ${senderName}! Your message has been sent. Soujanya will get back to you shortly.`);
      
      // Reset form
      contactForm.reset();
    });
  }
});
