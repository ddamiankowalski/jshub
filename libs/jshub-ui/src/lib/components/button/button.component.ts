import {
  ChangeDetectionStrategy,
  Output,
  Component,
  EventEmitter,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassBinder } from '@jshub/jshub-common';

@Component({
  // eslint-disable-next-line
  selector: 'button[jshubButton]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class ButtonComponent {
  @HostListener('click') onClick(): void {
    this.buttonClick.emit();
  }

  @Output() buttonClick = new EventEmitter<void>();

  constructor(classBinder: ClassBinder) {
    classBinder.bind('jshub-button');
  }
}
