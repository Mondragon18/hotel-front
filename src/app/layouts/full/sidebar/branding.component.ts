import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="p-0 d-flex justify-content-center">
      <a href="/">
          <img
          src="./assets/images/hotel/logo.png"
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
