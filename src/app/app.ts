import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  signal
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly scrollY = signal(0);
  protected readonly activeShowcaseIndex = signal(0);

  protected readonly expertise = [
    'Angular front architecture',
    'TypeScript interactions',
    'Java back-end systems'
  ];

  protected readonly metrics = [
    { value: '03', label: 'univers visuels forts' },
    { value: '∞', label: 'animations et effets scroll' },
    { value: 'UX', label: 'parcours pense pour captiver' }
  ];

  protected readonly tools = [
    'Angular',
    'TypeScript',
    'Java',
    'Spring Boot',
    'UI Motion',
    'Responsive Design'
  ];

  protected readonly projectCards = [
    {
      tag: 'Projet 01',
      title: 'Dashboard elegant et lumineux',
      text: 'Un espace data premium avec graphiques, composants propres et animations subtiles.'
    },
    {
      tag: 'Projet 02',
      title: 'Experience web immersive',
      text: 'Sections dynamiques, reveal on scroll, transitions de textes et storytelling visuel.'
    },
    {
      tag: 'Projet 03',
      title: 'App metier Java + Angular',
      text: 'Front moderne relie a une logique metier robuste pour des parcours fluides et clairs.'
    }
  ];

  protected readonly timeline = [
    'Hero cinematic avec texte, cartes et fond lumineux',
    'Section sticky ou les mots glissent les uns sur les autres',
    'Galerie projet prete pour photos, maquettes et videos',
    'Bloc contact final a personnaliser avec tes infos'
  ];

  protected readonly scrollProgress = computed(() => Math.min(this.scrollY() / 1400, 1));

  protected readonly heroTransform = computed(() => {
    const offset = this.scrollProgress() * 120;
    return `translate3d(0, ${offset}px, 0)`;
  });

  protected readonly introOpacity = computed(() => 1 - this.scrollProgress() * 0.45);

  ngAfterViewInit(): void {
    this.onWindowScroll();

    const hostElement = this.host.nativeElement as HTMLElement;
    const steps = Array.from(hostElement.querySelectorAll('[data-step]')) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rawIndex = entry.target.getAttribute('data-step') ?? '0';
            this.activeShowcaseIndex.set(Number(rawIndex));
          }
        });
      },
      { threshold: 0.55 }
    );

    steps.forEach((step: HTMLElement) => observer.observe(step));
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.scrollY.set(window.scrollY || 0);
  }
}
