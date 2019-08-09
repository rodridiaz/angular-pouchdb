import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private titleService: Title) {
    this.title = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getDeepestTitle(this.router.routerState.snapshot.root))
    );
  }
  appTitle = 'Angular PouchDB App';
  title: Observable<string>;

  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
      this.titleService.setTitle(title);
    }
    return title;
  }
}
