import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="redirect-shell">
      <p>Redirection vers le portfolio...</p>
      <a href="/standalone.html">Ouvrir la version autonome</a>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'DM Sans', sans-serif;
      background: linear-gradient(180deg, #FDE8EF, #FFFFFF);
      color: #1B1F3B;
    }

    .redirect-shell {
      min-height: 100vh;
      display: grid;
      place-items: center;
      gap: 12px;
      text-align: center;
    }

    a {
      color: #E8376A;
      text-decoration: none;
      font-weight: 700;
    }
  `]
})
export class App implements OnInit {
  ngOnInit(): void {
    window.location.replace('/standalone.html');
  }
}
