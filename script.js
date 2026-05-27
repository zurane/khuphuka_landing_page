const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('[data-accordion] .accordion__trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion__item');
    const group = trigger.closest('[data-accordion]');
    group.querySelectorAll('.accordion__item').forEach((other) => {
      const isActive = other === item && !other.classList.contains('is-open');
      other.classList.toggle('is-open', isActive);
      const btn = other.querySelector('.accordion__trigger');
      btn.setAttribute('aria-expanded', String(isActive));
      btn.querySelector('span').textContent = isActive ? '−' : '+';
    });
  });
});

const gradeCards = [...document.querySelectorAll('.slider-card')];
let gradeIndex = 0;
document.querySelector('.js-next-grade')?.addEventListener('click', () => {
  gradeCards[gradeIndex].classList.remove('active');
  gradeIndex = (gradeIndex + 1) % gradeCards.length;
  gradeCards[gradeIndex].classList.add('active');
});

const campSlides = [
  {
    title: 'Grade 12 Preparation Paradise Camp',
    image: 'assets/grad-12-prep.jpg',
    alt: 'Grade 12 learner writing during exam preparation',
    purpose: 'To intensively prepare learners for final matric examinations through structured revision, exam techniques, and emotional support.',
    focus: 'Subject revision, exam techniques and time management, stress and pressure management, motivation and resilience.',
    outcomes: 'Learners will feel confident and prepared for exams, improve exam technique, reduce anxiety and stress, maintain focus and motivation.',
    matters: 'Matric results have a lasting impact on post-school opportunities. Focused preparation increases learner success.'
  },
  {
    title: 'Grade 11 Smart Study Bootcamp',
    image: 'assets/grad-12-prep.jpg',
    alt: 'Grade 11 smart study bootcamp visual',
    purpose: 'To prepare learners academically and mentally for the demands of Grade 12.',
    focus: 'Study techniques and time management, critical thinking, exam preparation strategies, stress management, focus and discipline.',
    outcomes: 'Improved study habits, stronger academic performance and increased confidence entering matric.',
    matters: 'Grade 11 performance strongly predicts matric success. Strong study habits now lead to better outcomes later.'
  },
  {
    title: 'Grade 10 Passage to Maturity Camp',
    image: 'assets/grad-12-prep.jpg',
    alt: 'Grade 10 learners gathered around a campfire',
    purpose: 'To guide learners through adolescence by fostering self-discovery, leadership skills, and responsible decision-making.',
    focus: 'Identity and self-worth, leadership and influence, peer pressure and values, accountability and responsibility, healthy relationships.',
    outcomes: 'Increased self-awareness, stronger leadership behaviours and improved peer interaction.',
    matters: 'Grade 10 is often a challenging developmental stage. Structured guidance helps learners mature with confidence and purpose.'
  },
  {
    title: 'Grade 9 Careers & Subject Choices Camp',
    image: 'assets/grad-12-prep.jpg',
    alt: 'Grade 9 learner considering school subject choices',
    purpose: 'To empower learners to make informed Grade 10 subject choices aligned to their strengths and interests.',
    focus: 'Strengths and interests identification, career exploration, subject-to-career alignment, decision-making skills, goal setting.',
    outcomes: 'Learners make confident subject choices, reducing future subject changes and academic misalignment.',
    matters: 'Grade 9 subject choices directly influence academic success and post-school opportunities.'
  },
  {
    title: 'Grade 8 Induction Camp',
    image: 'assets/grad-12-prep.jpg',
    alt: 'Grade 8 learners gathered for school induction',
    purpose: 'To support learners transitioning into secondary school and help them adapt socially, emotionally and academically.',
    focus: 'Navigating high school expectations, building positive peer relationships, responsibility and independence, school culture and values, managing change.',
    outcomes: 'Improved adjustment to high school life, reduced anxiety and increased learner confidence.',
    matters: 'A positive induction experience improves learner behavior, engagement, and long-term academic performance.'
  },
  {
    title: 'Grade 7 Leadership & Self-discovery Camp',
    image: 'assets/grad-12-prep.jpg',
    alt: 'Grade 7 learners completing an outdoor teamwork activity',
    purpose: 'To inspire young leaders while building self-confidence, resilience and teamwork skills.',
    focus: 'Self-awareness and identity, confidence building, teamwork and collaboration, communication skills, positive leadership behaviors.',
    outcomes: 'Learners develop confidence, stronger peer relationships and an early leadership mindset.',
    matters: 'Grade 7 is a critical year of identity development. Exposure to leadership skills sets a strong foundation for future academic and personal success.'
  }
];

function initPhotoSlider(slider) {
  const image = slider.querySelector('[data-camp-image]');
  const current = slider.querySelector('[data-current]');
  const total = slider.querySelector('[data-total]');
  const copy = document.querySelector('[data-camp-copy]');
  const title = document.querySelector('[data-camp-title]');
  const purpose = document.querySelector('[data-camp-purpose]');
  const focus = document.querySelector('[data-camp-focus]');
  const outcomes = document.querySelector('[data-camp-outcomes]');
  const matters = document.querySelector('[data-camp-matters]');
  let active = 0;

  total.textContent = campSlides.length;

  const show = (next) => {
    active = (next + campSlides.length) % campSlides.length;
    const camp = campSlides[active];

    copy.classList.add('is-changing');
    image.classList.remove('is-active');

    window.setTimeout(() => {
      title.textContent = camp.title;
      purpose.textContent = camp.purpose;
      focus.textContent = camp.focus;
      outcomes.textContent = camp.outcomes;
      matters.textContent = camp.matters;
      image.src = camp.image;
      image.alt = camp.alt;
      current.textContent = active + 1;

      copy.classList.remove('is-changing');
      image.classList.add('is-active');
    }, 1000);
  };

  slider.querySelector('[data-next]').addEventListener('click', () => show(active + 1));
  slider.querySelector('[data-prev]').addEventListener('click', () => show(active - 1));

  campSlides.slice(1).forEach((camp) => {
    const img = new Image();
    img.src = camp.image;
  });

  setInterval(() => show(active + 1), 6500);
}

document.querySelectorAll('[data-slider]').forEach(initPhotoSlider);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
