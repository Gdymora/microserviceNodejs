import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IDictionary } from '../interfaces/dictionary-post.interface';


@Component({
  selector: 'english-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
})

export class CardComponent {
  breakpoint = false;
  synth = window.speechSynthesis;
  language = 'ua';
  defaultTouch = { x: 0, y: 0, time: 0 };
  @Input() data!: IDictionary;
  @Output() cardClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();
  @HostListener('window:resize', ['$event'])
  onResize(event?: any): void {
    this.breakpoint = event.target.innerWidth <= 800 ? true : false;
    if (this.breakpoint) {
      // this.noneCard();
    }
  }
  @HostListener('touchstart', ['$event'])
  //@HostListener('touchmove', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  handleTouch(event: any) {
    const touch = event.touches[0] || event.changedTouches[0];

    // check the events
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      const deltaX = touch.pageX - this.defaultTouch.x;
      const deltaY = touch.pageY - this.defaultTouch.y;
      const deltaTime = event.timeStamp - this.defaultTouch.time;

      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < 500) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > 60) {
          // delta x is at least 60 pixels
          if (deltaX > 0) {
            this.doSwipeRight(event);
          } else {
            this.doSwipeLeft(event);
          }
        }

        if (Math.abs(deltaY) > 60) {
          // delta y is at least 60 pixels
          if (deltaY > 0) {
            this.doSwipeDown(event);
          } else {
            this.doSwipeUp(event);
          }
        }
      }
    }
  }

  doSwipeLeft(event: any) {
    this.clickNone(event.target.id, 'left')
    //return colable();
  }

  doSwipeRight(event: any) {
    this.clickNone(event.target.id, 'right')
  }

  doSwipeUp(event: any) {
    console.log('swipe up', event);
  }

  doSwipeDown(event: any) {
    console.log('swipe down', event);
  }



  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 800 ? true : false;
  }

  noneCard() {
    const e = this.document.querySelector('.card');
    if (!e) {
      return;
    }

    e.classList.remove('card');
    e.classList.add('none');

  }

  clickNone(index: number, trend: string) {
    const e = this.document.querySelector(`.in${index}`);
    if (!e) {
      return;
    }
    console.log(index, e.classList)
    e.classList.remove('card');
    e.classList.add('none');

    let next = trend === 'left' ? this.document.querySelector(`.in${+index + 1}`) : this.document.querySelector(`.in${+index - 1}`);
    if (!next) {
      next = this.document.querySelector(`.in${0}`);
    }

    next?.classList.remove('none');
    next?.classList.add('card');
  }

  /**
   * 
   * @param text Speak 
   */

  speak(text: string) {
    this.cardClicked.emit(null);
    const message = new SpeechSynthesisUtterance();
    const voices = this.synth.getVoices();

    message.pitch = 0.7;//висота голосу
    message.volume = 1.5;//гучніть
    message.rate = 0.6;//швидкість від 0.1 до 10
    message.lang = "en-US";
    message.text = text;
    for (let i = 0; i < voices.length; i++) {
      // console.log(voices[i].name)
      if (voices[i].name === 'Google UK English Male') {
        message.voice = voices[i];//голос
      }
    }

    this.synth.speak(message)
  }

  delete(id: number) {
    this.cardClicked.emit(null);
    this.deleteClicked.emit();
    this.clickNone(id, 'left')
  }
}
