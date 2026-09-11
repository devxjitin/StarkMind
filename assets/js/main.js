/**
 * StarkMind - Neo-Brutalist Soft-Minimalist Core Controller
 * High-performance, zero dependencies, smooth tactile interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroKeywordRise();
  initHeroTypewriter();
  initNavbar();
  initStatusCardRotation();
  initStatCounters();
  initProjectFilters();
  initProjectModal();
  initGithubModuleCount();
  initAutourgosDirectory();
  initContactForm();
  initBackToTop();
  initCurrentYear();
  initScrollReveal();
});

/* ===========================================================================
   Scroll Reveal — elements fade/slide in and out as they cross the viewport
   in either scroll direction, staggered per element within their group.
   ========================================================================== */
function initScrollReveal() {
  const targets = document.querySelectorAll('.section-header, .team-member-card, .project-card, .achievement-card');
  if (!targets.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const staggerCounts = new Map();
  targets.forEach((el) => {
    el.classList.add('reveal');
    const group = el.parentElement;
    const index = staggerCounts.get(group) || 0;
    staggerCounts.set(group, index + 1);
    el.style.transitionDelay = `${Math.min(index, 6) * 90}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach((el) => observer.observe(el));
}

/* ===========================================================================
   Landing-page headline typewriter
   ========================================================================== */
function initHeroTypewriter() {
  const target = document.getElementById('heroTypewriter');
  if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const words = ['Impossible', 'Unthinkable', 'A Dream', 'Too Bold'];
  let wordIndex = 0;
  let characterIndex = words[0].length;
  let deleting = false;

  const type = () => {
    const word = words[wordIndex];
    target.textContent = word.slice(0, characterIndex);

    if (!deleting && characterIndex === word.length) {
      deleting = true;
      window.setTimeout(type, 1700);
      return;
    }

    if (deleting && characterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      window.setTimeout(type, 260);
      return;
    }

    characterIndex += deleting ? -1 : 1;
    window.setTimeout(type, deleting ? 55 : 105);
  };

  window.setTimeout(type, 1700);
}

/* ===========================================================================
   Rotating StarkMind status card
   ========================================================================== */
function initStatusCardRotation() {
  const visual = document.querySelector('.about-visual-card');
  const baseCard = visual?.querySelector('.about-card-main');
  if (!visual || !baseCard) return;

  const slides = [
    { badge: 'LIVE', label: 'From idea to impact', footer: 'In motion', command: '$ starkmind --info', lines: [['STATUS', '100% Operational'], ['LAB', 'Production-ready work'], ['XPERIMENTS', 'Ideas in incubation'], ['ACHIEVEMENTS', '2 milestones'], ['MISSION', 'Explore. Build. Celebrate.']], closing: 'Building what is next.' },
    { badge: 'BUILDING', label: 'Current focus', footer: 'Making progress', command: '$ starkmind --building', lines: [['FOCUS', 'Intelligent systems'], ['METHOD', 'Design. Test. Refine.'], ['TEAM', 'Five minds, one vision'], ['MODE', 'Deep work enabled'], ['NEXT', 'FutureXpo projects']], closing: 'Turning ambitious ideas real.' },
    { badge: 'EXPLORING', label: 'Inside the lab', footer: 'Curiosity on', command: '$ starkmind --explore', lines: [['SIGNAL', 'New possibilities found'], ['PROTOTYPES', 'Learning by building'], ['TOOLS', 'AI, voice, and vision'], ['QUESTION', 'What can we make better?'], ['RESULT', 'The next experiment']], closing: 'The future starts as a question.' },
    { badge: 'NEXT UP', label: 'Looking ahead', footer: 'Launch sequence', command: '$ starkmind --future', lines: [['FUTUREXPO', 'Projects on the horizon'], ['RELEASES', 'Coming soon'], ['AMBITION', 'Build what others call impossible'], ['DIRECTION', 'Forward, together'], ['WATCH', 'This space']], closing: 'Preparing the next big leap.' }
  ];

  const renderCard = (card, slide) => {
    const content = card.querySelector('.status-card-content');
    const badge = card.querySelector('.badge-live');
    const label = card.querySelector('#statusCardLabel, .status-card-label');
    const footer = card.querySelector('#statusCardFooter, .status-card-footer');
    const details = slide.lines.map(([key, value]) => `<span class="code-c2">[${key}]</span> ${value}`).join('\n');
    badge.textContent = slide.badge;
    label.textContent = slide.label;
    footer.textContent = slide.footer;
    content.innerHTML = `<pre style="margin: 0; font-family: inherit;"><span class="code-c1">${slide.command}</span>\n\n${details}\n\n<span class="code-c3">&gt;&gt; ${slide.closing}</span></pre>`;
  };

  const stage = document.createElement('div');
  stage.className = 'status-card-stage';
  visual.append(stage);

  const cards = slides.map((slide, index) => {
    const card = index === 0 ? baseCard : baseCard.cloneNode(true);
    card.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
    card.querySelector('.status-card-label')?.classList.add('status-card-label');
    card.querySelector('.status-card-footer')?.classList.add('status-card-footer');
    card.classList.add('status-card-slide');
    renderCard(card, slide);
    stage.append(card);
    return card;
  });

  let activeSlide = 0;
  const updateStack = () => {
    cards.forEach((card, index) => {
      const position = (index - activeSlide + cards.length) % cards.length;
      card.classList.remove('is-active', 'is-stack-one', 'is-stack-two', 'is-stack-three');
      card.classList.add(position === 0 ? 'is-active' : `is-stack-${['one', 'two', 'three'][position - 1]}`);
    });
  };
  updateStack();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.setInterval(() => {
    const outgoingCard = cards[activeSlide];
    outgoingCard.classList.add('is-leaving');
    activeSlide = (activeSlide + 1) % slides.length;
    updateStack();
    window.setTimeout(() => outgoingCard.classList.remove('is-leaving'), 680);
  }, 4500);
}

/* ===========================================================================
   Live GitHub data
   ========================================================================== */
const GITHUB_USERNAME = 'devxjitin';
const AUTOURGOS_PREFIX = 'autourgos-';

let publicAutourgosModulesRequest;

function getPublicAutourgosModules() {
  if (!publicAutourgosModulesRequest) {
    publicAutourgosModulesRequest = fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=public&per_page=100&sort=updated`,
      { headers: { Accept: 'application/vnd.github+json' } }
    )
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`GitHub request failed (${response.status})`))))
      .then((repositories) => repositories
        .filter((repository) => repository.name.startsWith(AUTOURGOS_PREFIX) && !repository.private)
        .sort((a, b) => a.name.localeCompare(b.name)));
  }

  return publicAutourgosModulesRequest;
}

function initGithubModuleCount() {
  const count = document.getElementById('githubModuleCount');
  if (!count) return;

  getPublicAutourgosModules()
    .then((modules) => {
      count.textContent = String(modules.length);
      count.setAttribute('aria-label', `${modules.length} public Autourgos modules on GitHub`);
    })
    .catch(() => {
      count.textContent = String.fromCharCode(0x2014);
      count.setAttribute('aria-label', 'GitHub module count is temporarily unavailable');
    });
}

/* ===========================================================================
   Rising Hero Keyword Tags
   ========================================================================== */
function initHeroKeywordRise() {
  const keywordContainer = document.querySelector('.hero-keywords');
  const hero = document.querySelector('.hero');
  if (!keywordContainer || !hero) return;
  hero.appendChild(keywordContainer);
  const updateRiseDistance = () => {
    const waterY = hero.clientHeight - 150;
    hero.style.setProperty('--keyword-rise-distance', `${-Math.max(200, waterY)}px`);
  };
  updateRiseDistance();
  new ResizeObserver(updateRiseDistance).observe(hero);

  const pseudoRandom = (seed) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  };

  const additionalKeywords = [
    'AI Agents', 'Agent Frameworks', 'Multi-Agent Systems', 'Autonomous Agents', 'AI Assistants',
    'Tool Calling', 'Function Calling', 'Context Engineering', 'Model Context Protocol', 'Embeddings',
    'Vector Databases', 'Semantic Search', 'Knowledge Graphs', 'Fine-Tuning', 'Reasoning Models',
    'Agent Memory', 'AI Evaluation', 'Guardrails', 'LLMOps', 'Workflow Orchestration',
    'Speech to Text', 'Text to Speech', 'NLP', 'Computer Vision', 'Image Generation',
    'AI Coding', 'Data Analysis', 'Deep Learning', 'Neural Networks', 'OpenAI API',
    'Anthropic API', 'Gemini', 'LangChain', 'LangGraph', 'CrewAI',
    'Chatbots', 'Conversational AI', 'Retrieval Pipelines', 'Hybrid Search', 'Chunking'
  ];

  additionalKeywords.forEach((label) => {
    const keyword = document.createElement('span');
    keyword.textContent = label;
    keywordContainer.appendChild(keyword);
  });

  const keywords = keywordContainer.querySelectorAll('span');
  const launchInterval = 1.3;
  const duration = Math.ceil(keywords.length * launchInterval) + 4;

  keywords.forEach((keyword, index) => {
    keyword.classList.add('hero-subfield');
    const horizontalZone = index % 3;
    const horizontalPosition = 6 + horizontalZone * 30 + pseudoRandom(index + 1) * 25;
    const horizontalDrift = -20 + pseudoRandom(index + 11) * 40;
    const launchDepth = 12 + pseudoRandom(index + 23) * 128;
    const scale = 0.72 + pseudoRandom(index + 37) * 0.3;

    keyword.style.setProperty('--keyword-x', `${horizontalPosition}%`);
    keyword.style.setProperty('--keyword-duration', `${duration}s`);
    keyword.style.setProperty('--keyword-delay', `${-(index * launchInterval)}s`);
    keyword.style.setProperty('--keyword-drift', `${horizontalDrift}px`);
    keyword.style.setProperty('--keyword-launch-depth', `${launchDepth}px`);
    keyword.style.setProperty('--keyword-scale', scale);
  });
}

/* ===========================================================================
   Public Autourgos Module Directory
   ========================================================================== */
function initAutourgosDirectory() {
  const grid = document.getElementById('autourgosModuleGrid');
  const filters = document.getElementById('autourgosModuleFilters');
  const count = document.getElementById('autourgosModuleCount');
  if (!grid || !filters || !count) return;

  const moduleType = (name) => {
    if (name.includes('memory')) return 'Memory';
    if (name.includes('openai') || name === 'autourgos-live') return 'LLM adapter';
    if (name.includes('input') || name.includes('output') || name.includes('stt')) return 'Interface';
    if (name.includes('history') || name.includes('skills') || name.includes('toolbox') || name.includes('summarizer') || name.includes('preiteration') || name.includes('hcix')) return 'Middleware';
    if (name.includes('cua')) return 'Computer use';
    if (name.includes('agent') || name === 'autourgos-starter') return 'Agent';
    return 'Foundation';
  };

  function render(modules, activeType = 'All') {
    const types = ['All', ...new Set(modules.map((module) => moduleType(module.name)))];
    filters.replaceChildren();
    types.forEach((type) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `module-filter-btn${type === activeType ? ' active' : ''}`;
      const total = type === 'All' ? modules.length : modules.filter((module) => moduleType(module.name) === type).length;
      button.textContent = `${type} (${total})`;
      button.addEventListener('click', () => render(modules, type));
      filters.append(button);
    });

    grid.replaceChildren();
    modules
      .filter((module) => activeType === 'All' || moduleType(module.name) === activeType)
      .forEach((module) => {
        const card = document.createElement('article');
        card.className = 'autourgos-module-card';

        const type = document.createElement('span');
        type.className = 'module-type';
        type.textContent = moduleType(module.name);

        const title = document.createElement('h4');
        title.textContent = module.name;

        const description = document.createElement('p');
        description.textContent = module.description || 'Public Autourgos framework module.';

        const topics = document.createElement('div');
        topics.className = 'module-topics';
        const githubTopics = Array.isArray(module.topics) ? module.topics : [];
        if (githubTopics.length) {
          githubTopics.forEach((topic) => {
            const tag = document.createElement('span');
            tag.className = 'module-topic';
            tag.textContent = topic;
            topics.append(tag);
          });
        } else {
          const emptyState = document.createElement('span');
          emptyState.className = 'module-topics-empty';
          emptyState.textContent = 'No GitHub topics listed';
          topics.append(emptyState);
        }

        const actions = document.createElement('div');
        actions.className = 'module-card-actions';

        const githubLink = document.createElement('a');
        githubLink.className = 'module-repository-link';
        githubLink.href = module.html_url;
        githubLink.target = '_blank';
        githubLink.rel = 'noopener noreferrer';
        githubLink.innerHTML = '<i class="fa-brands fa-github" aria-hidden="true"></i> GitHub';

        const pypiLink = document.createElement('a');
        pypiLink.className = 'module-repository-link';
        pypiLink.href = module.pypi_url || `https://pypi.org/project/${module.name}/`;
        pypiLink.target = '_blank';
        pypiLink.rel = 'noopener noreferrer';
        pypiLink.innerHTML = '<i class="fa-brands fa-python" aria-hidden="true"></i> PyPI';

        actions.append(githubLink, pypiLink);
        card.append(type, title, description, topics, actions);
        grid.append(card);
      });
  }

  getPublicAutourgosModules()
    .then((modules) => {
      if (!modules.length) throw new Error('No public modules returned');
      count.textContent = `${modules.length} public modules`;
      render(modules);
    })
    .catch(() => {
      count.textContent = 'GitHub directory temporarily unavailable';
      filters.replaceChildren();
      grid.replaceChildren();
      const message = document.createElement('p');
      message.className = 'module-directory-message';
      message.textContent = 'The live GitHub module directory could not be loaded. Please try again shortly.';
      grid.append(message);
    });
}

/* ==========================================================================
   2. Navbar ScrollSpy & Mobile Toggle
   ========================================================================== */
function initNavbar() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // ScrollSpy active link detection
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. Stat Counter Animation
   ========================================================================== */
function initStatCounters() {
  // Live values (such as the GitHub module count) do not have a numeric
  // data-target and must not be passed through this static counter animation.
  const statNumbers = document.querySelectorAll('.strip-stat-num[data-target]');
  if (!statNumbers.length) return;

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          if (!Number.isFinite(target)) {
            observer.unobserve(el);
            return;
          }
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const duration = 1400; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * target;

            el.textContent = currentVal.toFixed(decimals) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target.toFixed(decimals) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));
}

/* ==========================================================================
   4. Lab Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects .project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translate(0, 0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Lab Detail Modal
   ========================================================================== */
const projectData = {
  nirmanVoiceAssistant: {
    title: 'Nirman Lab Voice Assistant',
    category: 'Normal',
    description: 'A voice-only AI assistant for the web and Android that uses the Gemini Live API without requiring a backend server.',
    features: ['Natural voice-first interaction', 'React and TypeScript web application', 'Android WebView companion app', 'Serverless architecture using Gemini Live API'],
    tech: ['TypeScript', 'React', 'Gemini Live API', 'Android', 'Vite'],
    githubUrl: 'https://github.com/devxjitin/Nirman-Lab-Voice-Assistant',
    isPublic: true
  },
  ultron: {
    title: 'ULTRON',
    category: 'USP',
    description: 'A voice-controlled Windows desktop assistant that can talk naturally, interpret the screen and webcam, and control desktop tools on request.',
    features: ['Natural voice interaction', 'Screen and webcam awareness', 'Mouse and keyboard control', 'Terminal automation on request'],
    tech: ['Python', 'Computer Vision', 'Speech-to-Text', 'Windows Automation'],
    githubUrl: 'https://github.com/devxjitin/ULTRON',
    isPublic: true
  },
  examina: {
    title: 'Examina',
    category: 'Xperiment',
    description: 'AI-Powered Windows Assistant Designed for Real-Time Exam Cheat, Different types of questions Support, and Accurate On-Screen Understanding.',
    features: ['Work Silently', 'Deep Analyze Questions', 'Global hotkey controls', 'Windows desktop','Undetectable'],
    tech: ['Python', 'Exam Cheat', 'PyAutoGUI', 'Screen Capture', 'Windows'],
    demoVideo: 'assets/videos/Examina.mp4',
    isPublic: false
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const detailButtons = document.querySelectorAll('.btn-details');

  if (!modalOverlay || !closeBtn) return;

  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalDemoLink = document.getElementById('modalDemoLink');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalPublicActions = document.getElementById('modalPublicActions');
  const modalVideoWrap = document.getElementById('modalProjectVideoWrap');
  const modalVideo = document.getElementById('modalProjectVideo');

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (!data) return;

      modalBadge.textContent = data.category;
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;

      if (modalVideoWrap && modalVideo) {
        modalVideo.pause();
        if (data.demoVideo) {
          modalVideo.src = data.demoVideo;
          modalVideoWrap.hidden = false;
          modalVideo.load();
          modalVideo.play().catch(() => {});
        } else {
          modalVideo.removeAttribute('src');
          modalVideoWrap.hidden = true;
        }
      }

      modalFeatures.innerHTML = data.features
        .map(
          (feat) => `
        <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.92rem;">
          <i class="fa-solid fa-circle-check" style="color: var(--cyan-primary); margin-top: 3px;"></i>
          <span>${feat}</span>
        </div>
      `
        )
        .join('');

      modalTechStack.innerHTML = data.tech
        .map((tech) => `<span class="tech-chip">${tech}</span>`)
        .join('');

      // Xperiments are private, so their detail view is strictly informational.
      // Use an explicit display value as well as `hidden` so site styles cannot
      // accidentally reveal the public-action buttons.
      modalPublicActions.hidden = !data.isPublic;
      modalPublicActions.style.display = data.isPublic ? 'flex' : 'none';
      modalPublicActions.setAttribute('aria-hidden', String(!data.isPublic));
      if (data.isPublic) {
        modalDemoLink.hidden = !data.demoUrl;
        modalDemoLink.style.display = data.demoUrl ? 'inline-flex' : 'none';
        if (data.demoUrl) {
          modalDemoLink.href = data.demoUrl;
        }
        modalGithubLink.href = data.githubUrl;
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (modalVideo) modalVideo.pause();
  }

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Contact Form Delivery & Quick Copy
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotice');

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-bolt" style="color: var(--cyan-primary);"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'Devxjitin@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast('Email: Devxjitin@gmail.com');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error('Formspree request failed');
        contactForm.reset();
        showToast('Message sent! StarkMind will get back to you shortly.');
      } catch (error) {
        showToast('Message could not be sent. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
}

/* ==========================================================================
   7. Back To Top
   ========================================================================== */
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. Dynamic Year
   ========================================================================== */
function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
