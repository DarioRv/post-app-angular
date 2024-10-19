import { Component } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';

@Component({
  selector: 'app-feed-page',
  standalone: true,
  imports: [PostFormComponent],
  templateUrl: './feed-page.component.html',
  styles: ``,
})
export class FeedPageComponent {}
