/**
 * Kachara Arman — Premium Full Stack Developer Portfolio
 * script.js — Complete Animation & Interaction System
 */

(function () {
    'use strict';
    // ──────────────────────────────────────────────
    // 0. Theme Toggle  (navbar button + floating button)
    // ──────────────────────────────────────────────
    function syncThemeIcons(isDark) {
        document.querySelectorAll('#themeToggleBtn i, #fcThemeBtn i').forEach(icon => {
            icon.classList.toggle('fa-moon', !isDark);
            icon.classList.toggle('fa-sun', isDark);
        });
    }

    function setTheme(mode) {
        const isDark = mode === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        syncThemeIcons(isDark);
    }

    (function initTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
        syncThemeIcons(document.body.classList.contains('dark-mode'));

        document.querySelectorAll('#themeToggleBtn, #fcThemeBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
            });
        });
    })();

    // ──────────────────────────────────────────────
    // 0.5 Language Switch — English / Urdu
    //      Only the words change. Layout stays as-is.
    // ──────────────────────────────────────────────
    (function initLanguage() {
        const I18N = window.PORTFOLIO_I18N;
        const btn = document.getElementById('fcLangBtn');
        const btnText = document.getElementById('fcLangText');
        if (!I18N || !btn) return;

        const root = document.documentElement;
        const original = new WeakMap();

        // Whitespace-only nodes are skipped, and the original value is kept
        // so switching back to English is lossless.
        const key = str => str.replace(/\s+/g, ' ').trim();

        function translateTextNodes(lang) {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    const tag = parent.tagName;
                    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // Blocks handled by data-i18n-html are skipped entirely
                    if (parent.closest('[data-i18n-html]')) return NodeFilter.FILTER_REJECT;
                    return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            });

            // Matches leading / trailing whitespace so it survives translation
            const edges = /^\s*/;

            let node;
            while ((node = walker.nextNode())) {
                if (!original.has(node)) original.set(node, node.nodeValue);
                const source = original.get(node);

                if (lang === 'en') {
                    node.nodeValue = source;
                    continue;
                }

                const lead = source.match(edges)[0];
                const trail = source.match(/\s*$/)[0];
                const core = source.slice(lead.length, source.length - trail.length);
                const translated = I18N.TEXT[key(core)];
                if (translated) node.nodeValue = lead + translated + trail;
            }
        }

        function translateAttrBlocks(lang) {
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                if (!original.has(el)) original.set(el, el.innerHTML);
                if (lang === 'en') {
                    el.innerHTML = original.get(el);
                } else {
                    const translated = I18N.HTML[el.getAttribute('data-i18n-html')];
                    if (translated) el.innerHTML = translated;
                }
            });
        }

        function translateAttributes(lang) {
            document.querySelectorAll('input, textarea').forEach(el => {
                if (!original.has(el)) original.set(el, el.getAttribute('placeholder') || '');
                const attrKey = el.getAttribute('placeholder');
                if (lang === 'en') {
                    el.setAttribute('placeholder', original.get(el));
                } else {
                    const translated = I18N.ATTR[attrKey];
                    if (translated) el.setAttribute('placeholder', translated);
                }
            });

            const labelled = 'aria-label, title';
            document.querySelectorAll('[aria-label], [title]').forEach(el => {
                ['aria-label', 'title'].forEach(attr => {
                    const value = el.getAttribute(attr);
                    if (!value) return;
                    const store = attr + ':' + value;
                    if (lang === 'ur' && I18N.ATTR[value]) {
                        if (!el.dataset.i18nBack) el.dataset.i18nBack = store;
                        el.setAttribute(attr, I18N.ATTR[value]);
                    } else if (lang === 'en' && el.dataset.i18nBack) {
                        el.setAttribute(attr, el.dataset.i18nBack.split(':').slice(1).join(':'));
                        delete el.dataset.i18nBack;
                    }
                });
            });
        }

        function applyLang(lang) {
            root.classList.toggle('lang-ur', lang === 'ur');
            root.setAttribute('lang', I18N.HTML_LANG[lang]);
            translateAttrBlocks(lang);
            translateTextNodes(lang);
            translateAttributes(lang);

            if (btnText) btnText.textContent = lang === 'ur' ? 'EN' : 'اردو';
            btn.setAttribute('data-lang', lang === 'ur' ? 'en' : 'ur');
            btn.setAttribute('aria-pressed', lang === 'ur' ? 'true' : 'false');
        }

        let current = localStorage.getItem(I18N.STORAGE_KEY) || I18N.DEFAULT_LANG;
        if (current !== 'ur') current = 'en';
        applyLang(current);

        btn.addEventListener('click', () => {
            current = current === 'ur' ? 'en' : 'ur';
            localStorage.setItem(I18N.STORAGE_KEY, current);
            applyLang(current);
        });
    })();

    // ──────────────────────────────────────────────
    // 1. Custom Cursor
    // ──────────────────────────────────────────────
    (function initCursor() {
        const dot  = document.getElementById('cursorDot');
        const ring = document.getElementById('cursorRing');
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX  = 0, ringY  = 0;
        let animId;

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
            animId = requestAnimationFrame(animateRing);
        }
        animateRing();

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = e.clientX + 'px';
            dot.style.top  = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .project-card, .cert-card, .skill-node').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        });
    })();

    // ──────────────────────────────────────────────
    // 2. Mouse Glow
    // ──────────────────────────────────────────────
    (function initMouseGlow() {
        const glow = document.getElementById('mouseGlow');
        const navLinks = document.querySelectorAll('.nav-link');
        const projectCards = document.querySelectorAll('.project-card');
        
        document.addEventListener('mousemove', (e) => {
            if (glow) {
                glow.style.left = e.clientX + 'px';
                glow.style.top  = e.clientY + 'px';
            }
            
            navLinks.forEach(link => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                link.style.setProperty('--lx', `${x}px`);
                link.style.setProperty('--ly', `${y}px`);
            });

            projectCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--card-mouse-x', `${x}px`);
                card.style.setProperty('--card-mouse-y', `${y}px`);
            });
        });
    })();

    // ──────────────────────────────────────────────
    // 3. Navbar — Scroll Behavior & Active ScrollSpy
    // ──────────────────────────────────────────────
    (function initNavbar() {
        const header     = document.getElementById('navHeader');
        const hamburger  = document.getElementById('navHamburger');
        const drawer     = document.getElementById('mobileDrawer');
        const drawerClose= document.getElementById('mobileDrawerClose');
        const progressBar= document.getElementById('scrollProgressBar');
        const backToTop  = document.getElementById('backToTop');
        const navLinks   = document.querySelectorAll('.nav-link');
        const sections   = document.querySelectorAll('section[id]');
        const mobileLinks= document.querySelectorAll('.mobile-nav-link');

        // Scroll progress + back-to-top + spy
        window.addEventListener('scroll', () => {
            const scrollTop  = window.scrollY;
            const docHeight  = document.documentElement.scrollHeight - window.innerHeight;

            // Scroll progress bar
            if (progressBar && docHeight > 0) {
                progressBar.style.width = (scrollTop / docHeight * 100) + '%';
            }

            // Header style
            if (header) {
                header.classList.toggle('scrolled', scrollTop > 40);
            }

            // Back-to-top
            if (backToTop) {
                backToTop.classList.toggle('visible', scrollTop > 350);
            }

            // ScrollSpy
            let current = '';
            sections.forEach(section => {
                if (scrollTop >= section.offsetTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === current);
            });
            mobileLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href === '#' + current);
            });
        }, { passive: true });

        // Hamburger
        function openDrawer() {
            drawer.classList.add('open');
            drawer.removeAttribute('aria-hidden');
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
        function closeDrawer() {
            drawer.classList.remove('open');
            drawer.setAttribute('aria-hidden', 'true');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        if (hamburger) hamburger.addEventListener('click', openDrawer);
        if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

        mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

        document.addEventListener('click', (e) => {
            if (drawer && drawer.classList.contains('open') && !drawer.contains(e.target) && !hamburger.contains(e.target)) {
                closeDrawer();
            }
        });
    })();

    // ──────────────────────────────────────────────
    // 4. Reveal on Scroll (IntersectionObserver)
    // ──────────────────────────────────────────────
    (function initReveal() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal-up, .reveal-fade, .section').forEach(el => {
                el.classList.add('revealed');
                if (el.classList.contains('section')) el.classList.add('in-view');
            });
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    if (entry.target.classList.contains('section')) {
                        entry.target.classList.add('in-view');
                    } else {
                        observer.unobserve(entry.target);
                    }
                } else if (entry.target.classList.contains('section')) {
                    // Optional: remove in-view if we want it to trigger again
                    // entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal-up, .reveal-fade, .section').forEach(el => observer.observe(el));
    })();

    // ──────────────────────────────────────────────
    // 5. Animated Stat Counters
    // ──────────────────────────────────────────────
    (function initCounters() {
        const stats = document.querySelectorAll('.stat-num');
        if (!stats.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        stats.forEach(el => observer.observe(el));

        function animateCount(el) {
            const target   = parseFloat(el.dataset.count || 0);
            const isDecimal= el.dataset.decimal === 'true';
            const duration = 1400;
            const start    = performance.now();

            function step(now) {
                const pct  = Math.min((now - start) / duration, 1);
                const eased= 1 - Math.pow(1 - pct, 3);
                el.textContent = isDecimal
                    ? (target * eased).toFixed(2)
                    : Math.floor(target * eased);
                if (pct < 1) requestAnimationFrame(step);
                else el.textContent = isDecimal ? target.toFixed(2) : target;
            }
            requestAnimationFrame(step);
        }
    })();

    // ──────────────────────────────────────────────
    // 6. CGPA Ring Animation
    // ──────────────────────────────────────────────
    (function initCgpaRing() {
        const ring = document.querySelector('.cgpa-ring-fill');
        if (!ring) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ring.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(ring);
    })();

    // ──────────────────────────────────────────────
    // 7. Semester Bars Animation
    // ──────────────────────────────────────────────
    (function initSemBars() {
        const bars = document.querySelectorAll('.sem-fill');
        if (!bars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        bars.forEach(bar => observer.observe(bar));
    })();

    // ──────────────────────────────────────────────
    // 8. GitHub Language Bars Animation
    // ──────────────────────────────────────────────
    (function initGlbBars() {
        const bars = document.querySelectorAll('.glb-fill');
        if (!bars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        bars.forEach(bar => observer.observe(bar));
    })();

    // ──────────────────────────────────────────────
    // 9. Project 3D Tilt Effect
    // ──────────────────────────────────────────────
    (function initTilt() {
        if (window.matchMedia('(hover: none)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect  = card.getBoundingClientRect();
                const cx    = rect.left + rect.width  / 2;
                const cy    = rect.top  + rect.height / 2;
                const dx    = (e.clientX - cx) / (rect.width  / 2);
                const dy    = (e.clientY - cy) / (rect.height / 2);
                const rotX  = -dy * 6;
                const rotY  =  dx * 6;
                card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    })();

    // ──────────────────────────────────────────────
    // 10. Project Filter
    // ──────────────────────────────────────────────
    (function initProjectFilter() {
        const filterBtns = document.querySelectorAll('[data-filter]');
        const cards      = document.querySelectorAll('.project-card');
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                cards.forEach(card => {
                    const tags = (card.dataset.tags || '');
                    if (filter === 'all' || tags.includes(filter)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    })();

    // ──────────────────────────────────────────────
    // 11. Certificate Filter
    // ──────────────────────────────────────────────
    (function initCertFilter() {
        const filterBtns = document.querySelectorAll('[data-cert-filter]');
        const cards      = document.querySelectorAll('.cert-card');
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.certFilter;

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                cards.forEach(card => {
                    const tags = (card.dataset.certTags || '');
                    if (filter === 'all' || tags.includes(filter)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    })();

    // ──────────────────────────────────────────────
    // 12. Recruiter Mode Toggle
    // ──────────────────────────────────────────────
    (function initRecruiterMode() {
        const btn     = document.getElementById('recruiterModeBtn');
        const overlay = document.getElementById('recruiterOverlay');
        const closeBtn= document.getElementById('recruiterClose');
        if (!btn || !overlay) return;

        function openRecruiter() {
            overlay.removeAttribute('hidden');
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => overlay.style.opacity = '1');
        }
        function closeRecruiter() {
            overlay.setAttribute('hidden', '');
            document.body.style.overflow = '';
        }

        btn.addEventListener('click', openRecruiter);
        if (closeBtn) closeBtn.addEventListener('click', closeRecruiter);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeRecruiter();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) closeRecruiter();
        });
    })();

    // ──────────────────────────────────────────────
    // 13. Project Modal (Case Studies)
    // ──────────────────────────────────────────────
    const projectData = {
        journey: {
            category: 'HTML / CSS / JavaScript',
            title: 'Journey to India',
            liveLink: 'https://journey-to-india.netlify.app',
            codeLink: 'https://github.com/kachraarman044/Collage_project1',
            desc: 'A modern travel website showcasing destinations, experiences, and travel information across India with a beautiful and responsive UI.',
            features: ['Responsive travel destination showcase','Modern UI with smooth animations','Interactive travel information sections','Mobile-first design approach'],
            architecture: 'Pure HTML5, CSS3 and vanilla JavaScript. Deployed on Netlify.',
            tags: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
        },
        gaming: {
            category: 'HTML / CSS / JavaScript',
            title: 'Gaming Website',
            liveLink: 'https://gamming-websit.netlify.app',
            codeLink: 'https://github.com/kachraarman044/Gaming_web',
            desc: 'An interactive gaming platform featuring game-related content, settings, and a modern immersive gaming interface.',
            features: ['Interactive gaming platform UI','Game-related content and settings','Immersive modern interface','Responsive and mobile-friendly'],
            architecture: 'Pure HTML5, CSS3 and vanilla JavaScript. Deployed on Netlify.',
            tags: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
        },
        hotel: {
            category: 'HTML / CSS / JavaScript',
            title: 'Hotel Website',
            liveLink: 'https://hotal-website.netlify.app',
            codeLink: 'https://github.com/kachraarman044/Hotel_Five_Project1',
            desc: 'A responsive hotel booking website with modern UI design, interactive booking flow, and fully optimized mobile experience.',
            features: ['Responsive design with CSS Grid and Flexbox','Interactive booking flow','Smooth scroll and section animations','Mobile-first approach and touch optimization'],
            architecture: 'Pure HTML5, CSS3 and vanilla JavaScript. Deployed on Netlify.',
            tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Netlify'],
        },
        door: {
            category: 'Python / OpenCV / Tkinter',
            title: 'Face Detection Door Security System',
            liveLink: 'https://face-recognitaion.onrender.com/',
            codeLink: 'https://github.com/kachraarman044/Face--Recognitaion/tree/main',
            desc: 'A smart desktop GUI app that simulates a face recognition door lock — register a face via webcam, scan it, and the door opens for authorized users with a welcome voice; shows Access Denied for unknown faces.',
            features: ['Face registration via webcam (5 samples per user)','Real-time face recognition using OpenCV LBPH','Animated door opens on successful recognition','Voice announcement: Welcome, <Name>!','Access Denied for unregistered faces'],
            architecture: 'Python + Tkinter GUI with OpenCV for face detection and LBPH model for recognition. Deployed on Render.',
            tags: ['Python', 'OpenCV', 'Tkinter', 'Face Recognition', 'Render'],
        },
    };

    (function initProjectModal() {
        const modal       = document.getElementById('projectModal');
        const closeBtn    = document.getElementById('modalCloseBtn');
        const modalCat    = document.getElementById('modalCategory');
        const modalTitle  = document.getElementById('modalTitle');
        const modalLive   = document.getElementById('modalLiveLink');
        const modalCode   = document.getElementById('modalCodeLink');
        const modalDesc   = document.getElementById('modalDesc');
        const modalFeat   = document.getElementById('modalFeatures');
        const modalArch   = document.getElementById('modalArchitecture');
        const modalTags   = document.getElementById('modalTags');
        if (!modal) return;

        function openModal(key) {
            const data = projectData[key];
            if (!data) return;
            modalCat.textContent   = data.category;
            modalTitle.textContent = data.title;
            modalLive.href         = data.liveLink;
            modalCode.href         = data.codeLink;
            modalDesc.textContent  = data.desc;
            modalArch.textContent  = data.architecture;
            modalFeat.innerHTML    = data.features.map(f => `<li>${f}</li>`).join('');
            modalTags.innerHTML    = data.tags.map(t => `<span class="ptag">${t}</span>`).join('');
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeModal() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
        });

        // Expose for onclick attributes
        window.openJourneyCaseStudy = () => openModal('journey');
        window.openGamingCaseStudy  = () => openModal('gaming');
        window.openHotelCaseStudy   = () => openModal('hotel');
        window.openDoorCaseStudy    = () => openModal('door');
    })();

    // ──────────────────────────────────────────────
    // 14. Contact Form Submission
    // ──────────────────────────────────────────────
    (function initContactForm() {
        const form        = document.getElementById('contactForm');
        const status      = document.getElementById('formStatus');
        const submitBtn   = document.getElementById('contactSubmitBtn');
        const successModal= document.getElementById('contactSuccessModal');
        const successClose= document.getElementById('successCloseBtn');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic client-side validation
            const nameVal    = form.querySelector('[name="name"]')?.value.trim()    || '';
            const emailVal   = form.querySelector('[name="email"]')?.value.trim()   || '';
            const messageVal = form.querySelector('[name="message"]')?.value.trim() || '';
            if (!nameVal || !emailVal) {
                if (status) { status.textContent = '✗ Name and email are required.'; status.className = 'form-status error'; }
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
                if (status) { status.textContent = '✗ Please enter a valid email address.'; status.className = 'form-status error'; }
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }
            if (status) { status.textContent = ''; status.className = 'form-status'; }

            const data = {
                name:    form.querySelector('[name="name"]')?.value    || '',
                email:   form.querySelector('[name="email"]')?.value   || '',
                number:  form.querySelector('[name="number"]')?.value  || '',
                subject: form.querySelector('[name="subject"]')?.value || '',
                message: form.querySelector('[name="message"]')?.value || '',
                device:  navigator.userAgent,
            };

            try {
                const res = await fetch('/submit-contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                const json = await res.json().catch(() => ({}));

                if (res.ok) {
                    form.reset();
                    if (successModal) {
                        successModal.classList.add('open');
                        document.body.style.overflow = 'hidden';
                    } else if (status) {
                        status.textContent = '✓ Message sent successfully!';
                        status.className = 'form-status success';
                    }
                } else {
                    throw new Error(json.message || 'Server error');
                }
            } catch (err) {
                if (status) {
                    status.textContent = '✗ Failed to send. Please email directly: kachraarman83@gmail.com';
                    status.className = 'form-status error';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
                }
            }
        });

        // Close success modal
        if (successClose) {
            successClose.addEventListener('click', () => {
                successModal.classList.remove('open');
                document.body.style.overflow = '';
            });
        }
        if (successModal) {
            successModal.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    successModal.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        }
    })();

    // ──────────────────────────────────────────────
    // 15. Skills Galaxy — Pause on hover
    // ──────────────────────────────────────────────
    (function initGalaxy() {
        const galaxy = document.getElementById('skillsGalaxy');
        const nodes  = galaxy ? galaxy.querySelectorAll('.skill-node') : [];

        nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                node.style.animationPlayState = 'paused';
            });
            node.addEventListener('mouseleave', () => {
                node.style.animationPlayState = 'running';
            });
        });
    })();

    // ──────────────────────────────────────────────
    // 16. GitHub Contribution Calendar (preserved)
    // ──────────────────────────────────────────────
    (function initContribGraph() {
        const grid   = document.getElementById('contrib-grid');
        const months = document.getElementById('contrib-months');
        if (!grid) return;

        const today = new Date();
        const days  = 371;
        const start = new Date(today);
        start.setDate(start.getDate() - days);

        const activityData = {
            '2025-09-12': 2, '2025-09-13': 3, '2025-09-20': 1,
            '2025-10-05': 4, '2025-10-06': 2, '2025-10-15': 3,
            '2025-10-22': 1, '2025-11-03': 5, '2025-11-04': 3,
            '2025-11-10': 2, '2025-11-17': 4, '2025-11-24': 1,
            '2025-12-01': 3, '2025-12-08': 2, '2025-12-15': 4,
            '2025-12-22': 1, '2025-12-29': 2, '2026-01-05': 3,
            '2026-01-12': 5, '2026-01-19': 2, '2026-01-26': 4,
            '2026-02-02': 3, '2026-02-09': 2, '2026-02-16': 5,
            '2026-02-23': 1, '2026-03-02': 4, '2026-03-09': 3,
            '2026-03-16': 2, '2026-03-23': 5, '2026-04-06': 3,
            '2026-04-13': 4, '2026-04-20': 2, '2026-04-27': 3,
            '2026-05-04': 5, '2026-05-11': 2, '2026-05-18': 4,
            '2026-05-25': 3, '2026-06-01': 5, '2026-06-08': 2,
            '2026-06-15': 4, '2026-06-22': 3, '2026-06-29': 2,
            '2026-07-06': 5, '2026-07-13': 4, '2026-07-20': 3,
            '2026-07-27': 2, '2026-08-03': 5, '2026-08-10': 4,
            '2026-08-17': 3, '2026-08-24': 5, '2026-08-31': 4,
            '2026-09-01': 3, '2026-09-02': 2,
        };

        function fmt(d) {
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        }

        function getLevel(count) {
            if (!count) return 0;
            if (count <= 1) return 1;
            if (count <= 2) return 2;
            if (count <= 4) return 3;
            return 4;
        }

        const weekStart = new Date(start);
        weekStart.setDate(start.getDate() - start.getDay());

        for (let d = new Date(weekStart); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = fmt(d);
            const count   = activityData[dateStr] || 0;
            const level   = getLevel(count);
            const cell    = document.createElement('div');
            cell.className= `contrib-cell level-${level}`;
            cell.title    = `${dateStr}: ${count} contribution${count !== 1 ? 's' : ''}`;
            grid.appendChild(cell);
        }

        // Month labels
        if (months) {
            const labels = ['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'];
            labels.forEach(m => {
                const span = document.createElement('span');
                span.textContent = m;
                months.appendChild(span);
            });
        }
    })();

    // ──────────────────────────────────────────────
    // 17. Smooth scroll handled by smoothEnhancements (with navbar offset)
    // ──────────────────────────────────────────────
    // (Removed duplicate — smoothEnhancements() below handles this with proper navbar offset)

    // ──────────────────────────────────────────────
    // 18. Prefers Reduced Motion guard
    // ──────────────────────────────────────────────
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => el.classList.add('revealed'));
    }

})();

// ──────────────────────────────────────────────────
// CSS for contribution calendar (injected)
// ──────────────────────────────────────────────────
(function injectContribStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .github-contribution-wrapper { display: none; }
    .contrib-cell {
        width: 11px; height: 11px;
        border-radius: 2px;
        background: #EBEDF0;
        display: inline-block;
        margin: 1px;
        cursor: pointer;
        transition: transform 0.15s;
    }
    .contrib-cell:hover { transform: scale(1.3); }
    .contrib-cell.level-1 { background: #9BE9A8; }
    .contrib-cell.level-2 { background: #40C463; }
    .contrib-cell.level-3 { background: #30A14E; }
    .contrib-cell.level-4 { background: #216E39; }
    #contrib-grid {
        display: grid;
        grid-template-rows: repeat(7, 13px);
        grid-auto-flow: column;
        gap: 2px;
    }
    `;
    document.head.appendChild(style);
})();

// Education Timeline Animations
const eduObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            eduObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".cgpa-ring-fill, .sem-fill, .timeline-line").forEach(el => {
    eduObserver.observe(el);
});

// Assign neon glow colors to glass-cards for the HD border lighting effect
(function initNeonBorders() {
    const neonColors = [
        { color: 'rgba(0, 229, 255, 0.8)', shadow: 'rgba(0, 229, 255, 0.4)' }, // Cyan
        { color: 'rgba(255, 234, 0, 0.8)', shadow: 'rgba(255, 234, 0, 0.4)' }, // Yellow
        { color: 'rgba(176, 38, 255, 0.8)', shadow: 'rgba(176, 38, 255, 0.4)' }, // Purple
        { color: 'rgba(0, 230, 118, 0.8)', shadow: 'rgba(0, 230, 118, 0.4)' }, // Green
        { color: 'rgba(41, 121, 255, 0.8)', shadow: 'rgba(41, 121, 255, 0.4)' }  // Blue
    ];
    
    document.querySelectorAll('.glass-card').forEach((card, index) => {
        const neon = neonColors[index % neonColors.length];
        card.style.setProperty('--glow-color', neon.color);
        card.style.setProperty('--glow-shadow', neon.shadow);
    });
})();


// ──────────────────────────────────────────────
// Page Loader — Progress Bar
// ──────────────────────────────────────────────
(function initPageLoader() {
    const loader   = document.getElementById('pageLoader');
    const fill     = document.getElementById('loaderBarFill');
    const percent  = document.getElementById('loaderPercent');
    if (!loader || !fill || !percent) return;

    let current = 0;
    const target = 100;
    const duration = 3200; // ms total
    const interval = 18;   // ms per tick
    const steps = duration / interval;
    const increment = target / steps;

    // Prevent scroll while loading
    document.body.style.overflow = 'hidden';

    const timer = setInterval(() => {
        // Ease-out: slow down near the end
        const remaining = target - current;
        const step = Math.max(0.4, remaining * 0.045);
        current = Math.min(current + step, target);

        const rounded = Math.floor(current);
        fill.style.width = current + '%';
        percent.textContent = rounded + '%';

        if (current >= target) {
            clearInterval(timer);
            percent.textContent = '100%';
            fill.style.width = '100%';

            // Short pause at 100% then hide
            setTimeout(() => {
                loader.classList.add('loader-hide');
                document.body.style.overflow = '';
                // Remove from DOM after animation
                loader.addEventListener('transitionend', () => loader.remove(), { once: true });
            }, 350);
        }
    }, interval);

    // Safety fallback — always hide after 5.5s
    setTimeout(() => {
        clearInterval(timer);
        loader.classList.add('loader-hide');
        document.body.style.overflow = '';
        setTimeout(() => loader.remove(), 600);
    }, 5500);
})();


// ══════════════════════════════════════════════════════
//  SMOOTH APP-LIKE ENHANCEMENTS
// ══════════════════════════════════════════════════════

(function smoothEnhancements() {

    // ── 1. GPU-accelerate all animatable elements ──────
    const gpuEls = document.querySelectorAll(
        '.project-card, .cert-card, .glass-card, .about-info-card, ' +
        '.hero-info-box, .timeline-content, .edu-card, .skill-node, ' +
        '.btn-primary-pill, .btn-glass-pill, .proj-btn, .nav-link, ' +
        '.floating-badge, .sidebar-item, .filter-pill, .stack-chip'
    );
    gpuEls.forEach(el => {
        el.style.willChange = 'transform, opacity, box-shadow';
        // Remove will-change after first interaction to free GPU memory
        el.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => { el.style.willChange = 'auto'; });
        }, { once: false });
        el.addEventListener('mouseenter', () => {
            el.style.willChange = 'transform, opacity, box-shadow';
        });
    });

    // ── 2. Smooth scroll with offset for fixed navbar ──
    const NAVBAR_HEIGHT = 80;
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ── 3. Ripple effect on buttons ───────────────────
    function createRipple(e) {
        const btn = e.currentTarget;
        const existing = btn.querySelector('.ripple');
        if (existing) existing.remove();

        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const rect = btn.getBoundingClientRect();

        circle.className = 'ripple';
        circle.style.cssText = `
            width: ${diameter}px;
            height: ${diameter}px;
            left: ${e.clientX - rect.left - diameter / 2}px;
            top: ${e.clientY - rect.top - diameter / 2}px;
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: scale(0);
            animation: rippleAnim 0.55s linear;
            pointer-events: none;
        `;
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(circle);
        circle.addEventListener('animationend', () => circle.remove());
    }

    document.querySelectorAll(
        '.btn-primary-pill, .btn-glass-pill, .proj-btn.proj-btn-primary, ' +
        '.filter-pill, .cert-view-btn, .contact-quick-btn, .recruiter-mode-btn'
    ).forEach(btn => btn.addEventListener('click', createRipple));

    // Inject ripple keyframe
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleAnim {
            to { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ── 4. Smooth card lift on hover ──────────────────
    const liftCards = document.querySelectorAll(
        '.about-info-card, .hero-info-box, .dash-stat-card, ' +
        '.dash-focus-card, .dash-github-card, .dash-stack-card'
    );
    liftCards.forEach(card => {
        card.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px) scale(1.02)';
            card.style.boxShadow = '0 16px 40px rgba(55,118,171,0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // ── 5. Nav link smooth underline slide ────────────
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.transition = 'color 0.2s ease, background 0.2s ease';
    });

    // ── 6. Smooth image load fade-in ─────────────────
    document.querySelectorAll('img').forEach(img => {
        img.style.transition = 'opacity 0.4s ease';
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', () => { img.style.opacity = '1'; });
        }
    });

    // ── 7. Smooth focus rings ─────────────────────────
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        :focus-visible {
            outline: 2px solid #3776AB;
            outline-offset: 3px;
            border-radius: 6px;
            transition: outline-offset 0.15s ease;
        }
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
        body { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }

        /* Smooth section transitions */
        .section {
            transition: opacity 0.4s ease, transform 0.4s ease;
        }

        /* Smoother modal open/close */
        .modal-overlay {
            transition: opacity 0.25s ease !important;
        }
        .modal-container, .recruiter-panel, .success-modal {
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease !important;
        }

        /* Smoother mobile drawer */
        .mobile-drawer {
            transition: transform 0.35s cubic-bezier(0.4,0,0.2,1) !important;
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
            background: rgba(55,118,171,0.3);
            border-radius: 999px;
            transition: background 0.2s;
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(55,118,171,0.6); }

        /* Smooth filter pills */
        .filter-pill {
            transition: background 0.2s ease, color 0.2s ease,
                        transform 0.2s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.2s ease !important;
        }
        .filter-pill:hover { transform: translateY(-2px); }
        .filter-pill:active { transform: scale(0.96); }

        /* Smooth project cards */
        .project-card {
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.3s ease !important;
        }

        /* Smooth cert cards */
        .cert-card {
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.3s ease !important;
        }
        .cert-card:hover {
            transform: translateY(-6px) scale(1.01);
            box-shadow: 0 16px 40px rgba(55,118,171,0.15);
        }

        /* Smooth social buttons */
        .social-btn, .contact-quick-btn {
            transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.25s ease, background 0.25s ease !important;
        }
        .social-btn:hover { transform: translateY(-4px) scale(1.1); }
        .contact-quick-btn:hover { transform: translateY(-3px); }

        /* Smooth back-to-top */
        .back-to-top {
            transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                        visibility 0.3s ease !important;
        }
        .back-to-top:hover { transform: translateY(-4px) scale(1.1); }

        /* Smooth timeline dots */
        .timeline-dot {
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.3s ease !important;
        }
        .timeline-item:hover .timeline-dot {
            transform: scale(1.15);
            box-shadow: 0 0 20px rgba(55,118,171,0.4);
        }

        /* Floating badges smooth */
        .floating-badge {
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.3s ease !important;
        }
        .floating-badge:hover {
            transform: scale(1.1) translateY(-4px) !important;
            box-shadow: 0 12px 30px rgba(55,118,171,0.25) !important;
        }

        /* Smooth page loader */
        #pageLoader {
            transition: opacity 0.5s ease !important;
        }

        /* Smooth skill chips */
        .skill-chip, .stack-chip {
            transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.2s ease, background 0.2s ease !important;
        }
        .skill-chip:hover, .stack-chip:hover {
            transform: translateY(-3px) scale(1.05);
        }

        /* Input fields smooth focus */
        .contact-form input,
        .contact-form textarea {
            transition: border-color 0.25s ease, box-shadow 0.25s ease !important;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
            border-color: #3776AB !important;
            box-shadow: 0 0 0 3px rgba(55,118,171,0.12) !important;
            outline: none !important;
        }

        /* Smooth AI launcher */
        .ai-launcher {
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.3s ease !important;
        }
        .ai-launcher:hover { transform: scale(1.08) translateY(-3px); }
        .ai-launcher:active { transform: scale(0.95); }
    `;
    document.head.appendChild(focusStyle);

    // ── 8. Smooth page scroll inertia feel ────────────
    // Add passive scroll listeners for better performance
    window.addEventListener('scroll', () => {}, { passive: true });
    window.addEventListener('touchstart', () => {}, { passive: true });
    window.addEventListener('touchmove', () => {}, { passive: true });

    // ── 9. Stagger reveal for grid items ──────────────
    document.querySelectorAll('.project-grid, .cert-grid, .skills-chips-row, .about-cards').forEach(grid => {
        const children = grid.querySelectorAll('.project-card, .cert-card, .skill-chip, .about-info-card');
        children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.05}s`;
        });
    });

    // ── 10. Smooth active state handled by ScrollSpy in initNavbar ──────
    // (Removed duplicate — ScrollSpy in initNavbar() handles active class correctly)

})();
