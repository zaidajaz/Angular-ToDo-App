import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBannedUser]'
})
export class BannedUserDirective {
  @Input('appBannedUser') bannedUser: string;
  constructor(private reference: ElementRef) {
  }
  @HostListener('change') onchange(){
    if(this.reference.nativeElement.value == this.bannedUser)
      alert('The user is banned');
  }
}
