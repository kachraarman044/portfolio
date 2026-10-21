/**
 * i18n.js — Kachara Arman Portfolio
 * English (default) / Urdu language data.
 *
 * Three dictionaries:
 *   TEXT  → exact text-node strings            (nav links, buttons, labels, values)
 *   HTML  → keys used via `data-i18n-html="k"` (sentences that contain inline markup)
 *   ATTR  → placeholder / aria-label / title attribute values
 *
 * Anything not listed here simply stays in English.
 * To add a new translation, add one more entry — no other file needs to change.
 */

(function (global) {
    'use strict';

    /* ──────────────────────────────────────────────
     * TEXT — plain text nodes
     * ────────────────────────────────────────────── */
    const TEXT = {
        // Nav
        'Home': 'ہوم',
        'About': 'تعارف',
        'Skills': 'مہارتیں',
        'Projects': 'منصوبات',
        'Experience': 'تجربہ',
        'Education': 'تعلیم',
        'Certificates': 'اسناد',
        'Contact': 'رابطہ',
        'Recruiter Mode': 'ریکریٹر موڈ',

        // Brand / identity
        'Kachara Arman': 'کچارا ارمان',
        'Arman': 'ارمان',
        'Arman AI': 'ارمان اے آئی',

        // Hero
        'OPEN TO OPPORTUNITIES': 'مواقع کے لیے کھلا',
        'BCA Student • Noble University, Junagadh': 'بی سی اے طالب علم • نوبل یونیورسٹی، جونگھ',
        'View My Projects': 'میرے منصوبات دیکھیں',
        'Download Resume': 'ریزومے ڈاؤن لوڈ کریں',
        '0': '0',
        '+': '+',
        'Technologies': 'ٹیکنالوجیز',
        '7.05': '۷.۰۵',
        'CGPA': 'سی جی پی اے',

        // Section labels
        'About Me': 'میرے بارے میں',
        'Technical Expertise': 'تکنیکی مہارت',
        'Skills Galaxy': 'مہارتوں کا مجموعہ',
        'Hover over any technology to explore my proficiency':
            'میری مہارت دیکھنے کے لیے کسی بھی ٹیکنالوجی پر ہوور کریں',
        'Overview': 'جائزہ',
        'Developer Dashboard': 'ڈویلپر ڈیش بورڈ',
        'Projects Built': 'بنائے گئے منصوبات',
        'Certifications': 'اسناد',
        '& Qualifications': 'اور اہلیات',

        // Buttons / actions
        'Get in Touch': 'رابطہ کریں',
        'Resume': 'ریزومے',
        'View Certificate': 'اسناد دیکھیں',
        'Live Demo': 'لائیو ڈیمو',
        'View on GitHub': 'GitHub پر دیکھیں',
        'View Code': 'کوڈ دیکھیں',
        'View Profile': 'پروفائل دیکھیں',
        'Try it now': 'ابھی آزمائیں',
        'Details': 'تفصیلات',
        'Code': 'کوڈ',
        'All': 'سب',
        'Frontend': 'فرنٹ اینڈ',
        'LIVE': 'لائیو',
        'Close': 'بند کریں',

        // Quick-info keys
        'Name': 'نام',
        'Location': 'مقام',
        'Email': 'ای میل',
        'GitHub': 'گٹ ہب',
        'LinkedIn': 'لنکڈ ان',
        'Role': 'کردار',
        'Focus': 'توجہ',
        'Mindset': 'طرزِ فکر',
        'Education': 'تعلیم',
        'Gujarat, India': 'گجرات، بھارت',

        // About info cards
        'BCA': 'بی سی اے',
        'Noble University, 2023–2026': 'نوبل یونیورسٹی، ۲۰۲۳–۲۰۲۶',
        'Full Stack Developer': 'فل اسٹیک ڈویلپر',
        'React · Node.js · REST': 'ری ایکٹ · نوڈ جے ایس · REST',
        'Full Stack Development': 'فل اسٹیک ڈویلپمنٹ',
        'APIs · Databases · Systems': 'اے پی آئیز · ڈیٹابیسز · سسٹمز',
        'Problem Solving': 'مسائل حل کرنا',
        'Clean code · Continuous learning': 'صاف کوڈ · مسلسل سیکھنا',

        // Project cards
        'AI Portfolio Assistant': 'اے آئی پورٹ فولیو اسسٹنٹ',
        'Face Recognition Attendance System': 'چہرہ شناختی حاضری سسٹم',
        'Gym Management System': 'جم مینجمنٹ سسٹم',
        'Hotel Management Website': 'ہوٹل مینجمنٹ ویب سائٹ',
        'Textbook RAG Assistant': 'ٹیکسٹ بک RAG اسسٹنٹ',

        // Stats / timeline
        'Developer': 'ڈویلپر',
        'Degree': 'ڈگری',
        'B.Sc. IT': 'بی ایس سی آئی ٹی',
        'Current Focus': 'موجودہ توجہ',
        'REST Framework APIs': 'REST فریم ورک APIs',
        'Microservices': 'مائیکرو سروسز',
        'Technical Stack': 'ٹیکنیکل اسٹیک',
        'SQLite': 'SQLite',
        'Journey': 'سفر',
        'Professional': 'پیشہ ورانہ',
        'Freelance': 'فری لنس',
        'Freelance & Projects': 'فری لنس اور منصوبات',
        'Python / Django Developer': 'پائی تھن / جنگو ڈویلپر',
        'Academic': 'تعلیمی',
        'Noble University, Junagadh': 'نوبل یونیورسٹی، جونگھ',

        // Education timeline
        '& Advanced SQL': 'اور ایڈوانسڈ SQL',
        'Post Graduation': 'پوسٹ گریجوایٹ',
        'Master of Science in Information Technology': 'ماسٹر آف سائنس ان انفارمیشن ٹیکنالوجی',
        'Dr. Babasaheb Ambedkar Open University (BAOU) - Ahmedabad':
            'ڈاکٹر باباساہب امبیڈکر اوپن یونیورسٹی (BAOU) - احمدآباد',
        '(Government': '(سرکاری',
        'University)': 'یونیورسٹی)',
        'External Mode': 'ایکسٹرنل موڈ',
        'Duration': 'مدت',
        '2 Years': '۲ سال',
        'Mode': 'انداز',
        'External': 'ایکسٹرنل',
        'Status': 'حالت',
        'Pursuing': 'جاری ہے',
        'PURSUING': 'جاری ہے',
        'COMPLETED': 'مکمل',
        'Graduation': 'گریجوایٹ',
        'Bachelor of Science in Information Technology': 'بیچلر آف سائنس ان انفارمیشن ٹیکنالوجی',
        'Completed': 'مکمل',
        '3 Years': '۳ سال',
        'Result': 'نتیجہ',
        '7.05 CGPA': '۷.۰۵ سی جی پی اے',
        'Semester Performance': 'سمسٹر کی کارکردگی',
        'Higher Secondary': 'ہائیر سیکنڈری',
        'Higher Secondary (HSC)': 'ہائیر سیکنڈری (HSC)',
        'Commerce Stream — GSEB': 'کامرس اسٹریم — GSEB',
        'Commerce with Mathematics': 'ریاضی کے ساتھ کامرس',
        'Board': ' بورڈ',
        'GSEB': 'GSEB',
        'Year': 'سال',
        '78.41%': '۷۸.۴۱٪',
        '78.41': '۷۸.۴۱',
        '%': '٪',
        'Percentage': 'فیصد',
        'Performance Trend': 'کارکردگی کا رجحان',
        'Great': 'زبردست',
        'Performance!': 'کارکردگی!',
        'Great Performance!': 'زبردست کارکردگی!',
        'Secondary School': 'سیکنڈری اسکول',
        'Secondary School Certificate (SSC)': 'سیکنڈری اسکول سرٹیفکیٹ (SSC)',
        'Gujarat Secondary Education Board (GSEB)': 'گجرات سیکنڈری ایڈوکیشن بورڈ (GSEB)',
        '67.49%': '۶۷.۴۹٪',
        '67.49': '۶۷.۴۹',
        'Keep Growing!': 'آگے بڑھتے رہیں!',
        'Degrees': 'ڈگریاں',
        '1 Completed': '۱ مکمل',
        '1 Pursuing': '۱ جاری',
        'Academic Levels': 'تعلیمی مراحل',
        'Flexible learning with career preparation': 'کیریئر کی تیاری کے ساتھ لچکدار تعلیم',
        'Focused Goals': 'مرکزی اہداف',
        'Continuous learning': 'مسلسل سیکھنا',
        'and skill development': 'اور مہارت کی ترقی',

        // Certificates
        'Credentials': 'اسناد',
        '& Achievements': 'اور کارنامے',
        'View Certificate': 'اسناد دیکھیں',
        '9 certificates from NASSCOM, Udemy, Microsoft, Tata, Unstop':
            'NASSCOM، Udemy، Microsoft، Tata اور Unstop سے ۹ اسناد',
        'Certifications': 'اسناد',

        // Contact
        "Let's Connect": 'رابطہ کریں',
        'Email Me': 'ای میل کریں',
        'WhatsApp': 'واٹس ایپ',
        'Send a Message': 'پیغام بھیجیں',
        'Your Name': 'آپ کا نام',
        'Email Address': 'ای میل ایڈریس',
        'Phone (Optional)': 'فون (اختیاری)',
        'Subject': 'موضوع',
        'Message': 'پیغام',
        'Phone': 'فون',
        'All messages are': 'تمام پیغامات',
        'automatically redirected to:': 'خودکار طور پر یہاں بھیجے جاتے ہیں:',
        'Every submission triggers instant notifications via email and SMS.':
            'ہر جمع کرائی ای میل اور ایس ایم ایس کے ذریعے فوری اطلاع دیتی ہے۔',
        'Message Sent Successfully!': 'پیغام کامیابی سے بھیج دیا گیا!',
        'Thank you for reaching out. Arman will get back to you shortly.':
            'رابطہ کرنے کا شکریہ۔ ارمان جلد ہی آپ کا جواب دیں گے۔',

        // Footer
        'Full Stack Developer': 'فل اسٹیک ڈویلپر',
        'All Rights Reserved.': 'جملہ حقوق محفوظ ہیں۔',
        'Python / Django / OpenCV': 'پائی تھن / جنگو / اوپن سی وی',

        // Recruiter mode
        'Core Skills': 'بنیادی مہارتیں',
        'Git / GitHub': 'گٹ / گٹ ہب',
        'HTML / CSS': 'ایچ ٹی ایم ایل / سی ایس ایس',
        'Best Projects': 'بہترین منصوبات',
        'CGPA:': 'سی جی پی اے:',

        // React Skills Galaxy — tooltips
        'HTML — 85% · Web Markup': 'HTML — ۸۵٪ · ویب مارک اپ',
        'CSS — 85% · Styling': 'CSS — ۸۵٪ · اسٹائیلنگ',
        'JavaScript — 75% · Core Logic': 'جاوا اسکرپٹ — ۷۵٪ · کور لاجیک',
        'SQL — 80% · Databases': 'SQL — ۸۰٪ · ڈیٹابیسز',
        'Git/GitHub — 85% · Version Control': 'گٹ / گٹ ہب — ۸۵٪ · ورژن کنٹرول',
        'OpenCV — 75% · Computer Vision': 'اوپن سی وی — ۷۵٪ · کمپیوٹر ویژن',
        'React — 80% · Frontend UI': 'ری ایکٹ — ۸۰٪ · فرنٹ اینڈ یو آئی',
        'Node.js — 75% · Backend Runtime': 'Node.js — ۷۵٪ · بیک اینڈ رن ٹائم',
        'MongoDB — 70% · NoSQL Database': 'MongoDB — ۷۰٪ · NoSQL ڈیٹابیز',
        'Tailwind CSS — 80% · Styling Framework':
            'ٹیل وِنڈ سی ایس — ۸۰٪ · اسٹائیلنگ فریم ورک',

        // React Skills Galaxy — chip / node labels
        'REACT': 'ری ایکٹ',
        'React': 'ری ایکٹ',
        'Node.js': 'Node.js',
        'MongoDB': 'MongoDB',
        'Tailwind CSS': 'ٹیل وِنڈ سی ایس',
        'Tailwind': 'ٹیل وِنڈ',
        'CSS': 'CSS',
        'HTML/CSS': 'ایچ ٹی ایم ایل / سی ایس ایس',

        // Floating controls
        'Toggle dark mode': 'ڈارک موڈ تبدیل کریں',
        'Switch language': 'زبان تبدیل کریں',

        /* ──────────────────────────────────────────
         * Additional coverage
         * ────────────────────────────────────────── */

        // Hero
        [ 'I am Kachara Arman, a highly motivated developer with a singular focus: crafting ' +
            'scalable web applications and integrating advanced machine learning & AI solutions. ' +
            'With a perfect academic record and real-world project experience, I am ready to make ' +
            'an immediate impact.' ]:
            'میں کچارا ارمان ہوں، ایک بہت ہی حوصلے مند ڈویلپر جس کا ایک ہی مقصد ہے: قابلِ توسیع ویب ' +
            'ایپلیکیشنز بنانا اور جدید مشین لرننگ اور AI کو شامل کرنا۔ میرے بہترین تعلیمی نتائج اور ' +
            'حقیقی دنیا کے منصوبات کے تجربے کے ساتھ میں فوری طور پر کوئی بھی فرق ڈالنے کے لیے تیار ہوں۔',

        // Skills tooltips
        'Git/GitHub — 85% · Version Control': 'گٹ / گٹ ہب — ۸۵٪ · ورژن کنٹرول',
        'OpenCV — 75% · Computer Vision': 'اوپن سی وی — ۷۵٪ · کمپیوٹر ویژن',
        // Projects section
        'Portfolio': 'پورٹ فولیو',
        'Featured': 'نمایاں',
        'Dashboard': 'ڈیش بورڈ',
        [ 'A professional AI assistant built with FastAPI and OpenAI that understands portfolio ' +
            'context and answers visitor questions dynamically.' ]:
            'FastAPI اور OpenAI کے ذریعے بنایا گیا ایک پیشہ ور AI اسسٹنٹ جو پورٹ فولیو کا ' +
            'موضوع سمجھتا ہے اور زائرین کے سوالات کا فوراً جواب دیتا ہے۔',
        [ 'Real-time face recognition attendance tracking system with Django REST API backend and ' +
            'automated log recording.' ]:
            'ڈjango REST API بیک اینڈ اور خودکار لاگ ریکارڈنگ کے ساتھ ریئل ٹائم چہرہ شناختی حاضری ' +
            'ٹریکنگ سسٹم۔',
        [ 'Comprehensive Django-based system for managing gym memberships, subscription plans, and ' +
            'payment tracking with an admin dashboard.' ]:
            'جم کی رکنیت، سبسکرپشن پلانز اور ادائیگیوں کا انتظام کرنے والا مکمل Django سسٹم، ' +
            'ایڈمن ڈیش بورڈ کے ساتھ۔',
        [ 'Responsive hotel booking website with modern UI design, interactive booking flow, and ' +
            'optimized mobile experience.' ]:
            'جدید UI ڈیزائن، انٹرایکٹو بکنگ فلو اور بہتر موبائل تجربے کے ساتھ ریسپانسو ہوٹل ' +
            'بکنگ ویب سائٹ۔',
        [ 'Retrieval-Augmented Generation assistant built with Python for semantic textbook queries ' +
            'and intelligent Q&A responses.' ]:
            'سیمینٹک ٹیکسٹ بک سوالات اور ذہانتیاب جواب کے لیے Python سے بنایا گیا ' +
            'ریٹریول ایگمنٹیڈ جنریشن (RAG) اسسٹنٹ۔',

        // Focus items
        'Django REST Framework APIs': 'جنگو REST فریم ورک APIs',
        'FastAPI Microservices': 'فیسٹ اے پی آئی مائیکرو سروسز',
        'AI/ML with Python': 'پائی تھن کے ساتھ AI / ML',
        'SQLite3 & Advanced SQL': 'SQLite3 اور ایڈوانسڈ SQL',

        // Timeline
        '2024 — Present': '۲۰۲۴ — اب تک',
        '2023 — 2026': '۲۰۲۳ — ۲۰۲۶',
        '2026 — Present': '۲۰۲۶ — اب تک',
        [ 'Developing real-world applications including Gym Management Systems, Hotel Booking ' +
            'Websites, and AI-powered utilities. Handling end-to-end development from database ' +
            'design to API deployment.' ]:
            'جم مینجمنٹ سسٹم، ہوٹل بکنگ ویب سائٹس اور AI پر مبنی افادوں جیسے حقیقی دنیا کی ' +
            'ایپلیکیشنز تیار کر رہا ہوں۔ ڈیٹابیس ڈیزائن سے لے کر API ڈیپلائمنٹ تک مکمل ' +
            'اینڈ ٹو اینڈ ڈویلپمنٹ سنبھال رہا ہوں۔',
        'B.Sc. Information Technology': 'بی ایس سی انفارمیشن ٹیکنالوجی',
        [ 'Focusing on advanced computing concepts, relational databases (SQL, SQLite3), and ' +
            'practical application of Computer Vision for attendance and security systems. CGPA: 7.05' ]:
            'ایڈوانسڈ کمپیوٹنگ تصورات، ریلیشنل ڈیٹابیس (SQL، SQLite3) اور حاضری و سیکیورٹی ' +
            'سسٹمز کے لیے کمپیوٹر ویژن کا عملی اطلاق۔ سی جی پی اے: ۶.۸۴',
        'Data Structures': 'ڈیٹا سٹرکچرز',
        'Networking': 'نیٹ ورکنگ',
        'Web Dev': 'ویب ڈیو',

        // Education cards
        '(Government University)': '(سرکاری یونیورسٹی)',
        'Advanced study in computer science, software engineering, and information technology.':
            'کمپیوٹر سائنس، سافٹ ویئر انجینئرنگ اور انفارمیشن ٹیکنالوجی میں ایڈوانسڈ مطالعہ۔',
        'Graduation Completed': 'گریجوایٹ مکمل',
        [ 'Focused on software development, programming, data structures, database systems, and ' +
            'emerging technologies.' ]:
            'سافٹ ویئر ڈویلپمنٹ، پروگرامنگ، ڈیٹا سٹرکچرز، ڈیٹابیس سسٹمز اور نئی ٹیکنالوجیز پر ' +
            'مرکزی توجہ۔',
        'Completed secondary education with strong academic foundation.':
            'مضبوط تعلیمی بنیاد کے ساتھ ثانوی تعلیم مکمل کی۔',
        '10th, 12th, Graduation,': 'دسویں، بارہویں، گریجوایٹ،',
        'Continuing the journey of learning, growing, and achieving excellence.':
            'سیکھنے، بڑھنے اور بہترین نتائج حاصل کرنے کا سفر جاری ہے۔',

        // Certificates
        'QuizOff 2026: India\'s Biggest AI Quiz': 'QuizOff 2026: ہندوستان کا سب سے بڑا AI کوئز',
        'AI For Brand Storytelling Using ChatGPT': 'ChatGPT کے ذریعے برانڈ اسٹوری ٹیلنگ کے لیے AI',
        'Microsoft Copilot — AI Tools': 'مائیکروسافٹ کاپائلٹ — AI ٹولز',
        'Cyber Security Analyst — Tata': 'سائیبر سیکیورٹی اینالیسٹ — ٹاٹا',
        'Windows Command Mastery': 'ونڈوز کمانڈ ماسٹری',
        'Information Security Analyst': 'انفارمیشن سیکیورٹی اینالیسٹ',
        'Network Security Engineer': 'نیٹ ورک سیکیورٹی انجینئر',
        'IoT Security Analyst': 'آئی او ٹی سیکیورٹی اینالیسٹ',
        'AI DevOps Analyst': 'AI ڈیو آپس اینالیسٹ',
        'Cybersecurity': 'سائیبر سیکیورٹی',
        'Cyber Security': 'سائیبر سیکیورٹی',
        'Security': 'سیکیورٹی',

        // Contact
        'Send Message': 'پیغام بھیجیں',
        'Bhesan, Junagadh, Gujarat': 'بھیسن، جونگھ، گجرات',
        'All messages are automatically redirected to:': 'تمام پیغامات خودکار طور پر یہاں بھیجے جاتے ہیں:',
        'Email:': 'ای میل:',
        'Phone:': 'فون:',

        // Footer
        '⟨/⟩ Kachara Arman': '⟨/⟩ کچارا ارمان',
        '© 2026 Kachara Arman. All Rights Reserved.': '© ۲۰۲۶ کچارا ارمان۔ جملہ حقوق محفوظ ہیں۔',

        // Project modal
        'Project Title': 'پروجیکٹ کا عنوان',
        'Detailed description goes here...': 'تفصیلی وضاحت یہاں آئے گی...',
        'Key Features': 'اہم خصوصیات',
        'Architecture': 'آرکی ٹیکچر',
        'System architecture details...': 'سسٹم آرکی ٹیکچر کی تفصیل...',
        'Tech Stack': 'ٹیک اسٹیک',

        // Recruiter mode
        'Face Recognition Attendance': 'چہرہ شناختی حاضری',
        'Noble University, Junagadh (2023–2026)': 'نوبل یونیورسٹی، جونگھ (۲۰۲۳–۲۰۲۶)',
        'CGPA: 7.05': 'سی جی پی اے: ۷.۰۵'
    };

    /* ──────────────────────────────────────────────
     * HTML — blocks with inline markup
     * Referenced from HTML via data-i18n-html="key"
     * ────────────────────────────────────────────── */
    const HTML = {
        heroHeadline:
            'تکنیکی دنیا کا مستقبل بنا رہا ہوں <em>فل اسٹیک کوڈ</em> اور AI گہرائی کے ساتھ',
        aboutTitle: 'پرجوشن فل اسٹیک ڈویلپر <span class="title-accent">ہندوستان سے</span>',
        aboutP1:
            'میں <strong>کچارا ارمان</strong> ہوں، <strong>نوبل یونیورسٹی، جونگھ</strong> کا بی سی اے کا طالب علم۔ ' +
            'میں فل اسٹیک ڈویلپمنٹ میں مہارت رکھتا ہوں، خاص طور پر <strong>ری ایکٹ، نوڈ جے ایس، REST APIs اور بیک اینڈ آرکی ٹیکچر</strong>۔',
        aboutP2:
            'میرے پروجیکٹس میں <strong>چہرہ شناختی ڈور سیکیورٹی سسٹم</strong>، <strong>جاری سے انڈیا</strong> پلیٹ فارم، ' +
            '<strong>ہوٹل مینجمنٹ ویب سائٹ</strong> اور ایک <strong>گیمنگ ویب سائٹ</strong> شامل ہیں — ' +
            'ہر ایک مکمل طور پر بنایا گیا، یوزر انٹرفیس سے لے کر بیک اینڈ تک۔',
        aboutP3:
            'میں <strong>خیالات کو کامیاب سافٹ ویئر میں بدلنے</strong> کا شغور رکھتا ہوں۔ میری فکر ہے صاف، ' +
            '<strong>قابلِ مینٹیننس کوڈ</strong>، سوچ سمجھ کر بنائی گئی آرکی ٹیکچر، اور ایسی ایپلیکیشنز جو لوگوں پر واقعی بھروسہ کیے جا سکیں۔',
        aboutP4:
            'ابھی بی سی اے کر رہا ہوں، میں ایسے مواقع کی تلاش میں ہوں جہاں میں <strong>اپنی مہارت لاگو کر سکوں، ' +
            'حقیقی دنیا کی مصنوعات پر کام کر سکوں، اور ایک فل اسٹیک ڈویلپر کے طور پر ترقی کر سکوں</strong>۔',
        contactTitle: 'آئیے مل کر <span class="title-accent">کچھ بہترین</span> بناییں',
        contactTitle2: 'مل کر <span class="title-accent">بہترین</span>۔',
        contactSub:
            'کوئی پروجیکٹ، موقع یا تعاون کا خیال ہے؟ آئیے رابطہ کرتے ہیں۔',
        recruiterRole: 'فل اسٹیک ڈویلپر · بی سی اے · گجرات، بھارت'
    };

    /* ──────────────────────────────────────────────
     * ATTR — placeholder / aria-label / title values
     * ────────────────────────────────────────────── */
    const ATTR = {
        'Kachara Arman': 'کچارا ارمان',
        'Project inquiry / Collaboration': 'پروجیکٹ استفسار / تعاون',
        'Tell me about your project or opportunity...':
            'اپنے پروجیکٹ یا موقع کے بارے میں بتائیں...',
        '+91 98765 43210': '+۹۱ ۹۸۷۶۵ ۴۳۲۱۰',
        'hello@example.com': 'hello@example.com',
        'Your Name': 'آپ کا نام',
        'Email Address': 'ای میل ایڈریس',
        'Phone (Optional)': 'فون (اختیاری)',
        'Subject': 'موضوع',
        'Message': 'پیغام',
        'Send Message': 'پیغام بھیجیں',
        'Toggle dark mode': 'ڈارک موڈ تبدیل کریں',
        'Switch language': 'زبان تبدیل کریں',
        'Open navigation menu': 'نیویگیشن مینو کھولیں',
        'Close navigation': 'نیویگیشن بند کریں',
        'Open AI Assistant': 'اے آئی اسسٹنٹ کھولیں'
    };

    global.PORTFOLIO_I18N = {
        TEXT: TEXT,
        HTML: HTML,
        ATTR: ATTR,
        DEFAULT_LANG: 'en',
        STORAGE_KEY: 'portfolio_lang',
        HTML_LANG: { en: 'en', ur: 'ur' }
    };
})(window);
