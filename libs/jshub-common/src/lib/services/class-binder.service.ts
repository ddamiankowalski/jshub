import { ElementRef, inject } from '@angular/core';

export class ClassBinder {
  public elementRef: ElementRef = inject(ElementRef);

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public bind(className: string): void {
    this.nativeElement.classList.add(className);
  }
}
