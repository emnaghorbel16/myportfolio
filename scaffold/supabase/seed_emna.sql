-- ==============================================================================
-- SCRIPT D'INSERTION DES DONNÉES DU PORTFOLIO D'EMNA GHORBEL DANS SUPABASE
-- À exécuter dans : Supabase Dashboard -> SQL Editor -> New query -> Run
-- ==============================================================================

-- 1. PROFIL PERSONNEL
delete from public.profiles;
insert into public.profiles (
  name,
  professional_title,
  short_bio,
  about,
  location,
  email,
  phone,
  profile_image_url,
  cv_url
) values (
  'Emna Ghorbel',
  'Élève-ingénieure en Génie Informatique – IA, Data, Web & Mobile',
  'Étudiante à l''ENIS avec un master en systèmes embarqués en parallèle. Spécialisée en IA (RAG, agents LLM, vision) et développement Full-Stack & ERP.',
  'Élève-ingénieure en Génie Informatique à l''ENIS, avec un master en systèmes embarqués en parallèle. J''ai conçu et mis en production une plateforme e-commerce/ERP (Next.js, PostgreSQL, Docker) et développé des systèmes d''IA (RAG, agents LLM, vision par ordinateur). À la recherche d''un stage de fin d''études (PFE) pour concevoir des solutions innovantes à forte valeur ajoutée.',
  'Sfax, Tunisie',
  'emna.ghorbel@enis.tn',
  '+216 25 807 677',
  'https://avatars.githubusercontent.com/u/198305016?v=4',
  ''
);

-- 2. LIENS SOCIAUX
delete from public.social_links;
insert into public.social_links (platform, url, icon, display_order, is_visible) values
('GitHub', 'https://github.com/emna1ghorbel', 'github', 1, true),
('LinkedIn', 'https://linkedin.com', 'linkedin', 2, true),
('Email', 'mailto:emna.ghorbel@enis.tn', 'mail', 3, true);

-- 3. CATÉGORIES
insert into public.categories (name, slug, description, display_order, is_visible) values
('IA & Deep Learning', 'ia-deep-learning', 'Modèles d''IA, RAG, agents intelligents et vision par ordinateur', 1, true),
('Full-Stack & Web', 'full-stack-web', 'Applications web modernes, ERP et plateformes e-commerce', 2, true),
('Systèmes Embarqués & FPGA', 'embarque-fpga', 'Accélération matérielle, co-conception CPU-FPGA et IoT', 3, true),
('Mobile', 'mobile', 'Applications mobiles cross-platform', 4, true),
('Big Data', 'big-data', 'Traitement distribué et analyse de données massives', 5, true)
on conflict (slug) do update set 
  name = excluded.name, 
  description = excluded.description,
  is_visible = true;

-- 4. FORMATIONS (EDUCATION)
delete from public.education;
insert into public.education (institution, degree, field, description, location, start_date, end_date, current, display_order, is_visible) values
(
  'École Nationale d''Ingénieurs de Sfax (ENIS)',
  'Diplôme National d''Ingénieur en Génie Informatique (3ème année)',
  'Génie Informatique & IA',
  'Spécialisation en génie logiciel, intelligence artificielle, apprentissage profond, calcul distribué, sécurité et systèmes embarqués.',
  'Sfax, Tunisie',
  '2024-09-01',
  '2026-06-30',
  true,
  1,
  true
),
(
  'École Nationale d''Ingénieurs de Sfax (ENIS)',
  'Master en Systèmes Embarqués',
  'Systèmes Embarqués & Co-conception',
  'Formation de haut niveau suivie en parallèle : architecture des processeurs, accélération matérielle FPGA, VHDL, HLS et systèmes temps réel.',
  'Sfax, Tunisie',
  '2025-01-01',
  '2026-06-30',
  true,
  2,
  true
),
(
  'Institut Préparatoire aux Études d''Ingénieurs de Sfax (IPEIS)',
  'Cycle Préparatoire aux Études d''Ingénieur (Filière Technologie)',
  'Mathématiques, Physique & Informatique fondamentale',
  'Formation intensive d''excellence en mathématiques avancées, algorithmique, physique et sciences de l''ingénieur.',
  'Sfax, Tunisie',
  '2022-09-01',
  '2024-06-30',
  false,
  3,
  true
),
(
  'Lycée Ibno Rachiq',
  'Baccalauréat Sciences Techniques – Mention Bien',
  'Sciences Techniques',
  'Études secondaires orientées vers les technologies, l''électricité et la mécanique appliquée.',
  'Sfax, Tunisie',
  '2021-09-01',
  '2022-06-30',
  false,
  4,
  true
);

-- 5. EXPÉRIENCES PROFESSIONNELLES
delete from public.experience;
insert into public.experience (company, position, location, description, start_date, end_date, current, technologies, display_order, is_visible) values
(
  'Randz Medical',
  'Développeuse Full-Stack',
  'Tunisie',
  'Conception et développement de bout en bout d''une plateforme e-commerce & ERP de dispositifs médicaux en production (monorepo Next.js 15, API REST Express 5, PostgreSQL 16 via Prisma 7, 46 modèles). Couverture de toute la chaîne métier (catalogue, devis, commandes, factures PDF, stocks, finance) et intégration d''un assistant IA (Groq, Llama 3.3 70B). Déploiement en production sur VPS OVH avec Docker Compose et Nginx.',
  '2026-01-01',
  null,
  true,
  'Next.js 15, PostgreSQL 16, Prisma 7, Express 5, Docker, Nginx, OVH, Groq, Playwright',
  1,
  true
),
(
  'Mobelite Tunisia',
  'Stagiaire Développeur Mobile',
  'Sfax, Tunisie',
  'Développement et déploiement de l''application immobilière Property Finder (React Native + Redux Toolkit) avec synchronisation Firestore en temps réel et authentification par rôles. Conception d''un backend Node.js JWT et intégration de l''API de géocodage OpenStreetMap.',
  '2025-06-01',
  '2025-08-31',
  false,
  'React Native, Redux Toolkit, Firebase, Node.js, Expo Go, OpenStreetMap',
  2,
  true
);

-- 6. PROJETS
delete from public.projects;
insert into public.projects (
  category_id,
  title,
  slug,
  short_description,
  description,
  image_url,
  github_url,
  demo_url,
  featured,
  published,
  display_order
)
select 
  c.id,
  p.title,
  p.slug,
  p.short_description,
  p.description,
  p.image_url,
  p.github_url,
  p.demo_url,
  p.featured,
  p.published,
  p.display_order
from (values
  (
    'ia-deep-learning',
    'Système Multi-Agents de Cyber-Threat Intelligence avec RAG',
    'systeme-multi-agents-cti-rag',
    'Pipeline LangGraph à 4 agents spécialisés avec RAG hybride sur index FAISS et LLM Qwen 7B 4-bit supervisé via LangSmith.',
    'Conçu un pipeline LangGraph à 4 agents : Recherche Web (flux RSS/OTX), Analyse CTI (extraction d''IOC + cartographie comportementale), MITRE ATT&CK (scoring tactique, alignement CIS/NIST) et Notification (rapport PDF + alerte e-mail). RAG hybride sur 3 000+ messages Telegram avec Qwen 7B 4-bit (score RAGAS : 0.84).',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/emna1ghorbel',
    '',
    true,
    true,
    1
  ),
  (
    'embarque-fpga',
    'Détection Précoce de la Maladie d''Alzheimer sur FPGA',
    'alzheimer-detection-fpga',
    'Accélération matérielle CPU-FPGA (Xilinx Zynq/Alveo) sur IRM cérébrales avec GNN, PointNet et synthèse HLS.',
    'Pipeline de co-traitement CPU-FPGA sur données IRM (ADNI, OASIS-3). Utilisation de LSTM/ARIMA pour la progression temporelle, GNN/PointNet pour le maillage hippocampique et RF/SVM pour la classification. Réduction forte de la latence et de la consommation énergétique via quantification et synthèse Vivado HLS.',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/emna1ghorbel',
    '',
    true,
    true,
    2
  ),
  (
    'full-stack-web',
    'Randz Medical – Plateforme E-Commerce & ERP Médical',
    'randz-medical-erp',
    'Plateforme e-commerce & back-office admin en production avec Next.js 15, PostgreSQL 16, Prisma 7, Docker et assistant IA.',
    'Architecture monorepo complète couvrant catalogue, devis, commandes, factures PDF, stocks, finance et assistant IA intégré (Groq, Llama 3.3 70B). Déployé sur VPS OVH avec Docker Compose, Nginx et tests automatisés Playwright.',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/emna1ghorbel',
    '',
    true,
    true,
    3
  ),
  (
    'ia-deep-learning',
    'Estimation de Pose Animale (Chevaux) – EFREI Search Lab',
    'estimation-pose-chevaux',
    'Pipeline de deep learning pour l''estimation de keypoints anatomiques (18 articulations) évalué avec la métrique PCK.',
    'Reproduction d''un modèle de référence d''estimation de pose par keypoints : préparation et augmentation de données, architecture PyTorch, fonctions de perte dédiées et outils de visualisation interactive avec OpenCV.',
    'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/emna1ghorbel',
    '',
    true,
    true,
    4
  ),
  (
    'big-data',
    'Analyse Big Data E-commerce avec Hadoop MapReduce',
    'big-data-hadoop-mapreduce',
    'Traitement distribué de données volumineuses sur cluster Hadoop HDFS avec dashboard d''analyse en temps réel.',
    'Développement de jobs MapReduce en Java pour analyser des métriques de vente e-commerce volumineuses (chiffre d''affaires, commandes mensuelles, taux de conversion) et conception d''un dashboard interactif (Chart.js).',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/emna1ghorbel',
    '',
    true,
    true,
    5
  ),
  (
    'mobile',
    'Property Finder – Application Immobilière',
    'property-finder-mobile',
    'Application mobile cross-platform avec React Native, synchronisation Firestore et géocodage OpenStreetMap.',
    'Application mobile avec authentification par rôles (acheteur / agent), recherche géolocalisée et autocomplétion d''adresses. Architecture Redux Toolkit et backend Node.js JWT.',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    'https://github.com/emna1ghorbel',
    '',
    true,
    true,
    6
  )
) as p(cat_slug, title, slug, short_description, description, image_url, github_url, demo_url, featured, published, display_order)
join public.categories c on c.slug = p.cat_slug;

-- 7. COMPÉTENCES (SKILLS)
delete from public.skills;
insert into public.skills (name, category, level, display_order, is_visible) values
('Python', 'Langages', 95, 1, true),
('TypeScript / JavaScript', 'Langages', 90, 2, true),
('C / C++', 'Langages', 80, 3, true),
('Java', 'Langages', 80, 4, true),
('SQL & PostgreSQL', 'Base de données', 90, 5, true),
('Next.js 15 & React', 'Frontend', 95, 6, true),
('React Native & Expo', 'Mobile', 85, 7, true),
('Node.js & Express', 'Backend', 90, 8, true),
('FastAPI', 'Backend', 85, 9, true),
('PyTorch & TensorFlow', 'IA & Data', 90, 10, true),
('LangGraph & RAG (FAISS)', 'IA & Data', 90, 11, true),
('OpenCV & Vision', 'IA & Data', 85, 12, true),
('Docker & Docker Compose', 'DevOps & Cloud', 85, 13, true),
('Linux, Nginx & VPS OVH', 'DevOps & Cloud', 85, 14, true),
('FPGA Xilinx & Vivado HLS', 'Systèmes Embarqués', 80, 15, true),
('Hadoop & MapReduce', 'Big Data', 80, 16, true);

-- 8. DISTINCTIONS ET ACTIVITÉS (ACHIEVEMENTS)
delete from public.achievements;
insert into public.achievements (title, description, date, organization, display_order, is_visible) values
(
  '1er Prix – Challenge Non-Tech',
  'Remporté la 1ère place parmi 6 équipes participantes lors du Congrès Sight Day. Géré la présence numérique du club (web et design visuel).',
  '2025-12-01',
  'IEEE SIGHT ENIS',
  1,
  true
),
(
  'Participation – Pitch Yourself for a Career',
  'Participation active aux trois éditions de l''événement de développement de carrière et prise de parole.',
  '2025-05-01',
  'Pitch Yourself for a Career',
  2,
  true
);
