import { Component, signal } from '@angular/core';

type Project = {
  number: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  mediaType: 'image' | 'video';
  mediaSrc: string;
  mediaAlt: string;
  layout: 'media-left' | 'media-right';
  orientation?: 'landscape' | 'portrait';
  link?: string;
  fallback: string;
};

@Component({
  selector: 'app-root',
  styles: [`
    :host {
      --rose-pale: #FDE8EF;
      --rose-medium: #F9BFCF;
      --rose-vif: #E8376A;
      --rose-fonce: #C41E5B;
      --bleu-nuit: #1B1F3B;
      --gris-texte: #4A4A5A;
      --blanc: #FFFFFF;
      --ombre-rose: rgba(232, 55, 106, 0.12);
      display: block;
      min-height: 100vh;
      color: var(--gris-texte);
      background: linear-gradient(180deg, #FDE8EF 0%, #FFFFFF 100%);
      font-family: 'DM Sans', sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button {
      font: inherit;
    }

    .page-shell {
      position: relative;
      overflow-x: clip;
      min-height: 100vh;
      background: linear-gradient(180deg, #FDE8EF 0%, #FFFFFF 100%);
    }

    .page-shell::before {
      content: '';
      position: absolute;
      top: -120px;
      right: -80px;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: rgba(249, 191, 207, 0.5);
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(12px);
      background: rgba(255, 255, 255, 0.72);
      border-bottom: 1px solid rgba(232, 55, 106, 0.15);
    }

    .nav-wrap,
    .hero-grid,
    .section-inner,
    .feature-grid,
    .experience-grid,
    .contact-panel {
      width: min(1160px, calc(100% - 32px));
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .nav-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 76px;
      gap: 24px;
    }

    .brand {
      font-family: 'Syne', sans-serif;
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--rose-vif);
      letter-spacing: -0.04em;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .nav-links a,
    .mobile-panel a {
      position: relative;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      color: var(--bleu-nuit);
      padding: 4px 0;
      transition: color 180ms ease;
    }

    .nav-links a::after,
    .mobile-panel a::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2px;
      transform: scaleX(0);
      transform-origin: left;
      background: var(--rose-vif);
      transition: transform 180ms ease;
    }

    .nav-links a:hover,
    .mobile-panel a:hover {
      color: var(--rose-vif);
    }

    .nav-links a:hover::after,
    .mobile-panel a:hover::after {
      transform: scaleX(1);
    }

    .menu-toggle {
      display: none;
      width: 48px;
      height: 48px;
      border: 1px solid rgba(232, 55, 106, 0.2);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.92);
      color: var(--bleu-nuit);
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .menu-toggle span,
    .menu-toggle::before,
    .menu-toggle::after {
      content: '';
      display: block;
      width: 20px;
      height: 2px;
      border-radius: 999px;
      background: currentColor;
      transition: transform 180ms ease, opacity 180ms ease;
    }

    .menu-toggle span {
      margin: 5px 0;
    }

    .menu-toggle.is-open::before {
      transform: translateY(7px) rotate(45deg);
    }

    .menu-toggle.is-open span {
      opacity: 0;
    }

    .menu-toggle.is-open::after {
      transform: translateY(-7px) rotate(-45deg);
    }

    .mobile-panel {
      display: none;
      padding: 0 16px 16px;
    }

    .mobile-panel nav {
      display: grid;
      gap: 14px;
      padding: 18px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.96);
      box-shadow: 0 18px 40px var(--ombre-rose);
    }

    .hero {
      min-height: calc(100vh - 76px);
      display: grid;
      align-items: center;
      padding: 48px 0 80px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 55% 45%;
      align-items: center;
      gap: 48px;
    }

    .eyebrow {
      margin: 0 0 18px;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--rose-vif);
    }

    .hero-copy h1,
    .section-heading h2,
    .contact-copy h2 {
      margin: 0;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      color: var(--bleu-nuit);
      letter-spacing: -0.05em;
    }

    .hero-copy h1 {
      font-size: 72px;
      line-height: 0.96;
    }

    .hero-copy h1 em {
      color: var(--rose-vif);
      font-style: italic;
      font-weight: 800;
    }

    .hero-copy p,
    .section-heading p,
    .project-copy p,
    .experience-card p,
    .contact-copy p {
      font-size: 16px;
      line-height: 1.7;
      color: var(--gris-texte);
    }

    .hero-copy .lead {
      max-width: 540px;
      margin: 22px 0 0;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 30px;
    }

    .button-primary,
    .button-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 54px;
      padding: 14px 28px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease;
    }

    .button-primary {
      background: var(--rose-vif);
      color: var(--blanc);
      box-shadow: 0 8px 24px var(--ombre-rose);
    }

    .button-primary:hover {
      background: var(--rose-fonce);
      transform: translateY(-2px);
      box-shadow: 0 14px 28px var(--ombre-rose);
    }

    .button-secondary {
      border: 1.5px solid var(--rose-vif);
      color: var(--rose-vif);
      background: transparent;
    }

    .button-secondary:hover {
      background: var(--rose-pale);
      transform: translateY(-2px);
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin-top: 34px;
      max-width: 540px;
    }

    .stat-card {
      padding: 18px 18px 16px;
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.82);
      box-shadow: 0 14px 30px var(--ombre-rose);
      border: 1px solid rgba(232, 55, 106, 0.08);
    }

    .stat-card strong {
      display: block;
      font-family: 'Syne', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: var(--bleu-nuit);
      line-height: 1;
    }

    .stat-card span {
      display: block;
      margin-top: 8px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--gris-texte);
    }

    .hero-media-zone {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 560px;
      padding: 28px 28px 56px;
    }

    .hero-main-media {
      position: relative;
      width: min(520px, 100%);
      height: 340px;
      border-radius: 20px;
      overflow: hidden;
      transform: rotate(-1.5deg);
      box-shadow: 0 20px 60px rgba(27, 31, 59, 0.15);
      background: var(--blanc);
    }

    .hero-main-media img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }

    .hero-fallback {
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      padding: 24px;
      text-align: center;
      background: var(--bleu-nuit);
      color: var(--blanc);
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1.05rem;
    }

    .floating-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 2;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: var(--blanc);
      color: var(--bleu-nuit);
      font-family: 'Syne', sans-serif;
      font-size: 11px;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(27, 31, 59, 0.1);
    }

    .hero-phone-video {
      position: absolute;
      right: 4px;
      bottom: 0;
      width: 140px;
      height: 240px;
      border-radius: 24px;
      border: 3px solid #111111;
      background: #111111;
      overflow: hidden;
      z-index: 10;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    }

    .hero-phone-video video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: #111111;
    }

    .skills-strip {
      overflow: hidden;
      background: var(--bleu-nuit);
      padding: 20px 0;
    }

    .marquee {
      display: flex;
      width: max-content;
      animation: marquee 22s linear infinite;
      will-change: transform;
    }

    .marquee-track {
      display: flex;
      gap: 0;
      align-items: center;
      padding-right: 18px;
    }

    .marquee-item {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 0 10px;
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      white-space: nowrap;
      color: var(--blanc);
    }

    .marquee-item:nth-child(even) {
      color: var(--rose-vif);
    }

    .marquee-item::after {
      content: '·';
      color: var(--rose-vif);
    }

    .section {
      padding: 110px 0;
    }

    .section-heading {
      max-width: 680px;
      margin-bottom: 52px;
    }

    .section-heading h2 {
      font-size: 56px;
      line-height: 1;
    }

    .section-heading p {
      margin: 14px 0 0;
    }

    .projects-list {
      display: grid;
      gap: 42px;
    }

    .project-card {
      padding: 28px;
      border-radius: 28px;
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(232, 55, 106, 0.08);
      box-shadow: 0 18px 46px var(--ombre-rose);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 24px 56px rgba(27, 31, 59, 0.12);
    }

    .feature-grid {
      display: grid;
      grid-template-columns: 60% 40%;
      gap: 32px;
      align-items: center;
    }

    .project-card.media-right .feature-grid {
      grid-template-columns: 40% 60%;
    }

    .project-card.media-right .project-copy {
      order: 1;
    }

    .project-card.media-right .project-media {
      order: 2;
    }

    .project-media {
      min-width: 0;
    }

    .media-shell {
      position: relative;
      width: 100%;
      max-width: 640px;
      min-height: 400px;
      border-radius: 16px;
      overflow: hidden;
      background: var(--bleu-nuit);
      box-shadow: 0 16px 48px rgba(27, 31, 59, 0.12);
    }

    .media-shell img,
    .media-shell video {
      display: block;
      width: 100%;
      height: 100%;
    }

    .media-shell img {
      object-fit: cover;
      object-position: top center;
    }

    .media-shell video {
      object-fit: contain;
      background: linear-gradient(180deg, rgba(27, 31, 59, 0.96), rgba(45, 50, 88, 0.96));
    }

    .media-shell.portrait {
      max-width: 320px;
      min-height: 520px;
      margin-inline: auto;
      border-radius: 26px;
    }

    .project-placeholder {
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      padding: 24px;
      text-align: center;
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--blanc);
    }

    .project-number {
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--rose-vif);
    }

    .project-tag {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      margin-top: 16px;
      border-radius: 999px;
      background: var(--rose-pale);
      color: var(--rose-vif);
      font-family: 'Syne', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .project-copy h3 {
      margin: 18px 0 14px;
      font-family: 'Syne', sans-serif;
      font-size: 28px;
      font-weight: 700;
      line-height: 1.1;
      color: var(--bleu-nuit);
    }

    .stack-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
    }

    .stack-pills span {
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--rose-pale);
      color: var(--rose-fonce);
      font-size: 12px;
      line-height: 1.4;
    }

    .project-link {
      display: inline-flex;
      margin-top: 22px;
      color: var(--rose-vif);
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      transition: color 180ms ease;
    }

    .project-link:hover {
      color: var(--rose-fonce);
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .experience-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 22px;
    }

    .experience-card {
      padding: 28px;
      border-radius: 24px;
      background: var(--blanc);
      border: 1px solid rgba(232, 55, 106, 0.08);
      box-shadow: 0 16px 40px var(--ombre-rose);
    }

    .experience-card .label {
      display: inline-block;
      margin-bottom: 16px;
      font-family: 'Syne', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--rose-vif);
    }

    .experience-card h3 {
      margin: 0;
      font-family: 'Syne', sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--bleu-nuit);
      line-height: 1.15;
    }

    .contact-panel {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 28px;
      padding: 34px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.84);
      border: 1px solid rgba(232, 55, 106, 0.08);
      box-shadow: 0 18px 48px var(--ombre-rose);
    }

    .contact-copy h2 {
      font-size: 48px;
      line-height: 0.98;
    }

    .contact-links {
      display: grid;
      gap: 14px;
      align-content: start;
    }

    .contact-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 18px 20px;
      border-radius: 18px;
      background: var(--blanc);
      color: var(--bleu-nuit);
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      box-shadow: 0 12px 28px rgba(27, 31, 59, 0.06);
      transition: transform 180ms ease, color 180ms ease;
    }

    .contact-link:hover {
      transform: translateY(-2px);
      color: var(--rose-vif);
    }

    @keyframes marquee {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }

    @media (max-width: 1024px) {
      .hero-grid,
      .feature-grid,
      .project-card.media-right .feature-grid,
      .contact-panel,
      .experience-grid {
        grid-template-columns: 1fr;
      }

      .hero-media-zone {
        min-height: auto;
        padding: 20px 0 46px;
      }

      .hero-main-media {
        width: min(100%, 620px);
      }

      .project-card.media-right .project-copy,
      .project-card.media-right .project-media {
        order: initial;
      }

      .contact-copy h2 {
        font-size: 42px;
      }
    }

    @media (max-width: 820px) {
      .nav-links {
        display: none;
      }

      .menu-toggle {
        display: inline-flex;
        flex-direction: column;
      }

      .mobile-panel {
        display: block;
      }

      .mobile-panel[hidden] {
        display: none;
      }
    }

    @media (max-width: 767px) {
      .nav-wrap,
      .hero-grid,
      .section-inner,
      .feature-grid,
      .experience-grid,
      .contact-panel {
        width: min(100% - 20px, 1160px);
      }

      .hero {
        padding: 24px 0 64px;
      }

      .hero-copy h1 {
        font-size: 42px;
      }

      .hero-copy .lead {
        max-width: 100%;
      }

      .stats-row {
        grid-template-columns: 1fr;
      }

      .hero-main-media {
        height: 260px;
      }

      .hero-phone-video {
        right: 0;
        bottom: -10px;
        width: 120px;
        height: 210px;
      }

      .section {
        padding: 84px 0;
      }

      .section-heading h2 {
        font-size: 40px;
      }

      .project-card {
        padding: 18px;
      }

      .media-shell {
        min-height: 280px;
      }

      .media-shell.portrait {
        max-width: 240px;
        min-height: 420px;
      }

      .project-copy h3 {
        font-size: 24px;
      }

      .contact-copy h2 {
        font-size: 36px;
      }
    }
  `],
  template: `
    <main class="page-shell">
      <header class="site-header">
        <div class="nav-wrap">
          <a class="brand" href="#top" aria-label="Retour en haut">NH</a>

          <nav class="nav-links" aria-label="Navigation principale">
            <a href="#projets">Projets</a>
            <a href="#experience">Exp&eacute;rience</a>
            <a href="#contact">Contact</a>
          </nav>

          <button
            class="menu-toggle"
            type="button"
            [class.is-open]="menuOpen()"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Ouvrir le menu"
            (click)="toggleMenu()"
          >
            <span></span>
          </button>
        </div>

        <div class="mobile-panel" [hidden]="!menuOpen()">
          <nav aria-label="Navigation mobile">
            <a href="#projets" (click)="closeMenu()">Projets</a>
            <a href="#experience" (click)="closeMenu()">Exp&eacute;rience</a>
            <a href="#contact" (click)="closeMenu()">Contact</a>
          </nav>
        </div>
      </header>

      <section class="hero" id="top">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">INT&Eacute;GRATRICE D'APPLICATIONS &middot; GRENOBLE</p>
            <h1>
              Je construis<br />
              <em>des apps r&eacute;elles</em><br />
              de A &agrave; Z.
            </h1>
            <p class="lead">
              Alternance EHESS &middot; PHP/Symfony &middot; Angular &middot; Flutter &middot; n8n.
              Du back-end solide &agrave; l'interface qui convainc.
            </p>

            <div class="hero-actions">
              <a class="button-primary" href="#projets">Voir mes projets</a>
              <a class="button-secondary" href="mailto:houssounynadjidatie@gmail.com?subject=Demande%20de%20CV">T&eacute;l&eacute;charger mon CV</a>
            </div>

            <div class="stats-row">
              @for (stat of stats; track stat.value) {
                <article class="stat-card">
                  <strong>{{ stat.value }}</strong>
                  <span>{{ stat.label }}</span>
                </article>
              }
            </div>
          </div>

          <div class="hero-media-zone" aria-label="Apercu des projets">
            <div class="hero-main-media">
              <div class="floating-badge">✦ Alternance en cours &middot; EHESS</div>
              <img src="images/gestionDesCentresPersonnel.png" alt="Capture EHESS dashboard" />
              <!-- REMPLACER : capture EHESS dashboard -->
            </div>

            <div class="hero-phone-video">
              <video
                src="video/mobilePorject.mp4"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                aria-label="Demo mobile"
              ></video>
              <!-- REMPLACER : video/demo-mobile.mp4 -->
            </div>
          </div>
        </div>
      </section>

      <section class="skills-strip" aria-label="Technologies">
        <div class="marquee">
          <div class="marquee-track">
            @for (skill of skillsMarquee; track skill + '-1') {
              <span class="marquee-item">{{ skill }}</span>
            }
          </div>
          <div class="marquee-track" aria-hidden="true">
            @for (skill of skillsMarquee; track skill + '-2') {
              <span class="marquee-item">{{ skill }}</span>
            }
          </div>
        </div>
      </section>

      <section class="section" id="projets">
        <div class="section-inner">
          <div class="section-heading">
            <h2>Mes projets</h2>
            <p>Du professionnel &agrave; l'acad&eacute;mique.</p>
          </div>

          <div class="projects-list">
            @for (project of projects; track project.number) {
              <article class="project-card" [class.media-right]="project.layout === 'media-right'">
                <div class="feature-grid">
                  <div class="project-media">
                    <div class="media-shell" [class.portrait]="project.orientation === 'portrait'">
                      @if (project.mediaType === 'image') {
                        <img [src]="project.mediaSrc" [alt]="project.mediaAlt" />
                      } @else {
                        <video
                          [src]="project.mediaSrc"
                          [attr.aria-label]="project.mediaAlt"
                          autoplay
                          muted
                          loop
                          playsinline
                          preload="metadata"
                        ></video>
                      }
                    </div>
                  </div>

                  <div class="project-copy">
                    <div class="project-number">{{ project.number }}</div>
                    <span class="project-tag">{{ project.tag }}</span>
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>

                    <div class="stack-pills">
                      @for (item of project.stack; track item) {
                        <span>{{ item }}</span>
                      }
                    </div>

                    @if (project.link) {
                      <a class="project-link" [href]="project.link" target="_blank" rel="noreferrer">
                        &rarr; Voir sur GitHub
                      </a>
                    }
                  </div>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <section class="section" id="experience">
        <div class="section-inner">
          <div class="section-heading">
            <h2>Exp&eacute;rience</h2>
            <p>Des projets concrets, des contraintes r&eacute;elles, et une vraie logique produit.</p>
          </div>

          <div class="experience-grid">
            @for (item of experiences; track item.title) {
              <article class="experience-card">
                <span class="label">{{ item.label }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </article>
            }
          </div>
        </div>
      </section>

      <section class="section" id="contact">
        <div class="contact-panel">
          <div class="contact-copy">
            <p class="eyebrow">CONTACT</p>
            <h2>Nadjidatie Houssouny Abdallah</h2>
            <p>
              D&eacute;veloppeuse en alternance &agrave; l'EHESS &agrave; Grenoble.
              Je travaille des applications utiles, fiables et claires, du besoin m&eacute;tier
              jusqu'au d&eacute;ploiement.
            </p>
          </div>

          <div class="contact-links">
            <a class="contact-link" href="mailto:houssounynadjidatie@gmail.com">
              <span>houssounynadjidatie@gmail.com</span>
              <span>&rarr;</span>
            </a>
            <a class="contact-link" href="https://www.linkedin.com/in/houssouny-abdallah-nadjidatie/" target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <span>&rarr;</span>
            </a>
            <a class="contact-link" href="https://github.com/Nadjidatie" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  `
})
export class App {
  protected readonly menuOpen = signal(false);

  protected readonly stats = [
    { value: '2 ans', label: 'alternance & stages' },
    { value: '6+', label: 'projets livres' },
    { value: '5', label: 'stacks maitrisees' }
  ];

  protected readonly skillsMarquee = [
    'PHP/Symfony',
    'Angular',
    'TypeScript',
    'Flutter/Dart',
    'Java/Kotlin',
    'Firebase',
    'Drupal 10',
    'n8n',
    'Zapier',
    'CAS/LDAP',
    'SQL',
    'Linux',
    'Git',
    'REST API'
  ];

  protected readonly projects: Project[] = [
    {
      number: '01',
      tag: 'ALTERNANCE EN COURS',
      title: 'Outil de gestion des personnels heberges - EHESS',
      description:
        "Projet applicatif complet mene de bout en bout pour la Direction de la Recherche de l'EHESS. Recueil des besoins, modelisation UML, developpement, tests et deploiement. Authentification CAS centralisee, interrogation annuaire LDAP, maintenance serveurs Linux.",
      stack: ['PHP/Symfony', 'SQL', 'CAS', 'LDAP', 'Linux', 'Git'],
      mediaType: 'image',
      mediaSrc: 'images/gestionDesCentresPersonnel.png',
      mediaAlt: 'Dashboard EHESS - gestion personnels heberges',
      layout: 'media-left',
      orientation: 'landscape',
      link: 'https://github.com/Nadjidatie',
      fallback: 'Capture EHESS - Dashboard personnels'
    },
    {
      number: '02',
      tag: 'PROJET ACADEMIQUE',
      title: 'Plateforme de gestion aeroportuaire - Angular & Kotlin',
      description:
        "Application metier concue avec une vraie logique de parcours. Travail sur la structuration du front Angular, la clarte des ecrans et la connexion a une logique back-end robuste pour suivre les operations aeroportuaires.",
      stack: ['Angular', 'TypeScript', 'Java', 'Kotlin', 'UML', 'Git'],
      mediaType: 'image',
      mediaSrc: 'images/gestionAeroport.png',
      mediaAlt: 'Projet de gestion aeroportuaire',
      layout: 'media-right',
      orientation: 'landscape',
      link: 'https://github.com/Nadjidatie',
      fallback: 'Capture projet aeroport'
    },
    {
      number: '03',
      tag: 'DEMO MOBILE',
      title: 'Prototype mobile et parcours video en format telephone',
      description:
        "Mise en scene d'une experience mobile avec lecture video verticale integree. Le but est de montrer une interface en conditions reelles, avec un format natif smartphone qui garde la lisibilite du produit.",
      stack: ['Flutter', 'Dart', 'Firebase', 'UX', 'Mobile UI'],
      mediaType: 'video',
      mediaSrc: 'video/mobilePorject.mp4',
      mediaAlt: 'Video mobile portrait',
      layout: 'media-left',
      orientation: 'portrait',
      link: 'https://github.com/Nadjidatie',
      fallback: 'Video mobile portrait'
    }
  ];

  protected readonly experiences = [
    {
      label: 'EHESS',
      title: 'Alternance orientee besoins metier',
      text:
        "Recueil du besoin, cadrage technique, developpement Symfony, securisation de l'authentification et maintenance d'un environnement Linux existant."
    },
    {
      label: 'FRONT-END',
      title: 'Interfaces Angular et Flutter',
      text:
        'Construction de front-ends clairs, responsives et relies a de vraies donnees avec une attention forte sur la lisibilite et la hierarchie visuelle.'
    },
    {
      label: 'OUTILLAGE',
      title: 'Automatisation, integration et data',
      text:
        'Travail avec n8n, SQL, Firebase, Git et APIs pour connecter les briques, automatiser les flux et rendre les applications utilisables au quotidien.'
    }
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
