import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({ selector: '[appThousandsFormatter]' })
export class ThousandsFormatDirective implements OnInit {

  private el: HTMLInputElement;
  private thousandSeparator = ',';
  private numberPattern: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  private thousandsPattern = /\B(?=(\d{3})+(?!\d))/g;
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];

  constructor(
    private elementRef: ElementRef,
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    setTimeout(() => {
      this.el.value = this.format(this.el.value);
    });
  }

  /** Listener on focus, remove thousands format */
  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string): void {
    this.el.value = this.parse(value);
  }

  /** Listener on blur, add thousands format */
  @HostListener('blur', ['$event.target.value'])
  onBlur(value): void {
    this.el.value = this.format(value);
  }

  /** Listener on keydown, enter number only */
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const next: string = this.el.value.concat(event.key);
    if (next && !String(next).match(this.numberPattern)) {
      event.preventDefault();
    }
  }

  /**
   * method for thousand format
   */
  private format(value: string): string {
    return value.replace(this.thousandsPattern, this.thousandSeparator);
  }

  /**
   * method for remove thousand format
   */
  private parse(value): string {
    return value.replace(new RegExp(this.thousandSeparator, 'g'), '');
  }

}
