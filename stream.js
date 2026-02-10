// ========================================
// WIKIPEDIA STREAM BACKGROUND
// ========================================

class WikiStream {
  constructor() {
    this.columns = document.querySelectorAll('.stream-column ul');
    this.maxItems = 4;
    this.fetchInterval = 2500;
    this.titles = new Set();
    
    this.init();
  }

  init() {
    // Initial fetch for all columns
    this.columns.forEach((column, index) => {
      setTimeout(() => this.fetchAndAdd(column), index * 800);
    });

    // Continuous fetching
    setInterval(() => {
      const randomColumn = this.columns[Math.floor(Math.random() * this.columns.length)];
      this.fetchAndAdd(randomColumn);
    }, this.fetchInterval);
  }

  async fetchAndAdd(column) {
    try {
      const title = await this.fetchRandomTitle();
      if (title) {
        this.addItem(column, title);
      }
    } catch (error) {
      // Silent fail - background effect isn't critical
      console.debug('Wiki stream fetch failed:', error);
    }
  }

  async fetchRandomTitle() {
    const params = new URLSearchParams({
      action: 'query',
      list: 'recentchanges',
      rcprop: 'title|type',
      rclimit: '10',
      rctype: 'edit|new',
      format: 'json',
      origin: '*'
    });

    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
    const data = await response.json();

    if (data.query?.recentchanges) {
      // Find a title we haven't shown recently
      for (const change of data.query.recentchanges) {
        const title = change.title;
        if (!this.titles.has(title) && !title.startsWith('Special:') && !title.startsWith('User:')) {
          this.titles.add(title);
          // Clean up old titles to prevent memory leak
          if (this.titles.size > 100) {
            const arr = Array.from(this.titles);
            this.titles = new Set(arr.slice(-50));
          }
          return title;
        }
      }
    }
    return null;
  }

  addItem(column, title) {
    const li = document.createElement('li');
    li.textContent = title;
    li.style.opacity = '0';
    
    column.prepend(li);

    // Trigger reflow for animation
    li.offsetHeight;
    li.style.opacity = '';

    // Remove old items
    while (column.children.length > this.maxItems) {
      column.removeChild(column.lastChild);
    }
  }
}

// ========================================
// MOBILE NAVIGATION
// ========================================

class MobileNav {
  constructor() {
    this.toggle = document.querySelector('.nav-toggle');
    this.links = document.querySelector('.nav-links');
    this.isOpen = false;

    if (this.toggle && this.links) {
      this.init();
    }
  }

  init() {
    this.toggle.addEventListener('click', () => this.toggleMenu());

    // Close on link click
    this.links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.toggle.contains(e.target) && !this.links.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.links.classList.toggle('active', this.isOpen);
    this.toggle.classList.toggle('active', this.isOpen);
  }

  closeMenu() {
    this.isOpen = false;
    this.links.classList.remove('active');
    this.toggle.classList.remove('active');
  }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    // Only run if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe sections and cards
    const elements = document.querySelectorAll(
      '.stack-category, .timeline-item, .contact-card'
    );
    
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      this.observer.observe(el);
    });
  }
}

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ========================================
// SMOOTH SCROLL FOR NAV LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  new WikiStream();
  new MobileNav();
  new ScrollAnimations();
});
