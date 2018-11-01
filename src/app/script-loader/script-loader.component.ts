import { Component, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-script-loader',
  templateUrl: './script-loader.component.html',
  styleUrls: ['./script-loader.component.scss']
})
export class ScriptLoaderComponent implements AfterViewInit {

  @Input()
  src: string;

  @Input()
  type: string;

  @ViewChild('script') script: ElementRef;

  convertToScript() {
    const element = this.script.nativeElement;
    const script = document.createElement('script');
    script.type = this.type ? this.type : 'text/javascript';
    if (this.src) {
      script.src = this.src;
    }
    if (element.innerHTML) {
      script.innerHTML = element.innerHTML;
    }
    const parent = element.parentElement;
    parent.parentElement.replaceChild(script, parent);
  }

  ngAfterViewInit() {
    this.convertToScript();
  }

}
