import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@jshub/jshub-ui';

@Component({
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  selector: 'jshub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'jshub';
}
