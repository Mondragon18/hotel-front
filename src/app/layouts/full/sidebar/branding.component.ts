import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
          <img
          src="./assets/images/logos/UltraSuite.png"
          class="align-middle m-2" width="200"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
