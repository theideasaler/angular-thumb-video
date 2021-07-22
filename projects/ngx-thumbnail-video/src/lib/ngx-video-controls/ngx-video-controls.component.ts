
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { MatSliderChange } from '@angular/material/slider';
import { MatTooltip } from '@angular/material/tooltip';
import { COMPONENT_WITH_ON_HOVER } from '../directives/ngx-on-hover.directive';

@Component({
  selector: 'ngx-video-controls',
  templateUrl: './ngx-video-controls.component.html',
  styleUrls: ['./ngx-video-controls.component.scss'],
  providers: [
    { provide: COMPONENT_WITH_ON_HOVER, useExisting: NgxVideoControlsComponent },
  ],
})
export class NgxVideoControlsComponent implements OnInit, OnChanges {
  @Output() stateChange = new EventEmitter<boolean>();
  @Output() pbOnHover = new EventEmitter<number>();
  @Output() nonControlAreaClicked = new EventEmitter();
  @Input() target!: ElementRef<any>;
  @Input() thumb: any = {};
  @ViewChild('tooltip') tooltip!: MatTooltip;
  @ViewChild('progressBar') pb!: ElementRef;
  onHover = false;
  barLength = '0%';
  mouseLeft = '0%';
  totalTime = '00:00';
  currentTime = '0:00';
  mouseTime = '0:00';
  mouseSecs!: number;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.target) return;
    this.totalTime = this._formatTime(this.target.nativeElement.duration);
    this._updateStyles();
    this.target.nativeElement.ontimeupdate = (_: any) => {
      const video = this.target.nativeElement;
      this.barLength = (video.currentTime / video.duration) * 100 + '%';
      this.currentTime = this._formatTime(video.currentTime);
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.thumb &&
      changes.thumb.previousValue !== changes.thumb.currentValue
    ) {
      this.thumb = JSON.parse(changes.thumb.currentValue ?? '{}');
    }
  }

  onMouseMove($event: MouseEvent) {
    this.mouseSecs = this._getMouseTime(
      $event.clientX,
      this.pb.nativeElement.getBoundingClientRect().left,
      this.pb.nativeElement.offsetWidth,
      this.target.nativeElement.duration
    );
    this.mouseTime = this._formatTime(this.mouseSecs);
    this.pbOnHover.emit(parseInt(`${this.mouseSecs}`));
  }

  onProgressbarClick($event: MouseEvent) {
    const mouseSecs = this._getMouseTime(
      $event.clientX,
      this.pb.nativeElement.getBoundingClientRect().left,
      this.pb.nativeElement.offsetWidth,
      this.target.nativeElement.duration
    );
    this.target.nativeElement.currentTime = mouseSecs;
  }

  setVolume($event?: MatSliderChange) {
    if ($event == null) {
      this.target.nativeElement.muted = !this.target.nativeElement.muted;
      if (!this.target.nativeElement.muted)
        this.target.nativeElement.volume = 0.5;
      else this.target.nativeElement.volume = 0;
    } else {
      const volume = $event.value;
      this.target.nativeElement.volume = (volume ?? 0) / 100;
      if (volume === 0) this.target.nativeElement.muted = true;
      else this.target.nativeElement.muted = false;
    }
  }

  @HostListener('click', ['$event'])
  onHostClicked($event: MouseEvent) {
    this.nonControlAreaClicked.emit();
  }

  private _getMouseTime(
    mouseX: number,
    pbLeft: number,
    pbWidth: number,
    duration: number
  ) {
    this.mouseLeft = ((mouseX - pbLeft) / pbWidth) * 100 + '%';
    return ((mouseX - pbLeft) / pbWidth) * duration;
  }

  private _formatTime(secs: number) {
    return moment
      .utc(secs * 1000)
      .format('HH:mm:ss')
      .replace(/^0(?:0:0?)?/, '');
  }

  private _updateStyles() {
    this.elRef.nativeElement.style.setProperty(
      '--widthRatio',
      this.target?.nativeElement?.offsetHeight
        ? (this.target?.nativeElement?.offsetWidth ?? 0) /
            this.target.nativeElement.offsetHeight
        : 1.77
    );
    this.elRef.nativeElement.style.setProperty(
      '--thumbHeight',
      this.target?.nativeElement?.offsetHeight
        ? (this.target?.nativeElement?.offsetHeight ?? 0) / 5 + 'px'
        : '10rem'
    );
  }
}
