import {
  ChangeDetectionStrategy,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jshub-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();

  public onClick(): void {
    this.buttonClick.emit();
  }
}
