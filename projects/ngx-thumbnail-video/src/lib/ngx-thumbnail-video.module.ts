import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';

import { NgxThumbnailVideoComponent } from './ngx-thumbnail-video.component';
import { NgxOnHoverDirective } from './directives/ngx-on-hover.directive';
import { NgxVideoControlsComponent } from './ngx-video-controls/ngx-video-controls.component';

@NgModule({
  declarations: [
    NgxThumbnailVideoComponent,
    NgxOnHoverDirective,
    NgxVideoControlsComponent,
  ],
  imports: [CommonModule, MatIconModule, MatProgressBarModule, MatSliderModule],
  exports: [NgxThumbnailVideoComponent, NgxVideoControlsComponent, NgxOnHoverDirective],
})
export class NgxThumbnailVideoModule {}
