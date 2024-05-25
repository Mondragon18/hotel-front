import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.getBreadcrumbs();
    });
  }

  private getBreadcrumbs(): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];
    let currentRoute = this.activatedRoute.root;
    let url = '';

    do {
      const childrenRoutes = currentRoute.children;
      currentRoute = null;

      childrenRoutes.forEach(route => {
        if (route.outlet === 'primary') {
          const routeSnapshot = route.snapshot;
          url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
          breadcrumbs.push({ label: route.snapshot.data.breadcrumb, url: url });
          currentRoute = route;
        }
      });
    } while (currentRoute);

    return breadcrumbs;
  }

}
