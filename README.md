# Angular Video Thumbnail Player

A simple solution implemented in Angular to display a thumbnail preiview image on video's progress bar hovered. The component can load thumbnail image from either frontend or backend.
<img src="https://github.com/theideasaler/files/blob/main/ngx-thumbnail-video.gif" />

## Installation

Install the npm package.
```
  npm i ngx-thumbnail-video
```
Import module:
```ts
  import { NgxThumbnailVideoModule } from 'ngx-thumbnail-video';

  @NgModule({
      imports: [NgxThumbnailVideoModule]
  })
```

## Usage 1 - Front End
Pass your video url and options into the component. e.g.

in component.ts
```ts
import { Component } from '@angular/core';
import { VideoPlayerConfig } from 'ngx-thumbnail-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options: VideoPlayerConfig = {
    width: '960px',
    height: '540px'
  };
}
```

HTML:
```html
<ngx-thumbnail-video url="assets/video.mp4" [options]="options"></ngx-thumbnail-video>
```


## Usage 2 - Back End
You can choose to load the thumbnail image from a backend to improve the performance of the component. In this case, you will need to add a few configurations.

Step 1. Set the 'frontendPreload' to false in options.
```ts
  options: VideoPlayerConfig = {
    width: '960px',
    height: '540px',
    frontendPreload: false
  };
```

Step 2 Listen to the progressBarHover event from the component to know the currenlty hovered time(in seconds).
```html
<ngx-thumbnail-video url="assets/video.mp4" [options]="options" (progressBarHover)="eventListener($event)" [thumb]="thumb"></ngx-thumbnail-video>
```

Step 3. Pass in a stringified object with sec and url properties, `sec` should be the same as the property emited from progressBarHover, and `url` can be loaded from backend server.
```ts
thumb = JSON.stringify({sec, url});
```


## Options

| name | type | default | description |
|------|------|---------|-------------|
| width | string | '960px' | Video width. |
| height | string | '540px' | Video height. |
| autoplay | boolean| false | Autoplay video on load. |
| frontendPreload | boolean| true | Generate thumbnail image at front end. |
| mute | boolean | true | Mute video at beginning. |
| borderRadius | string | '0' | Video border radius. |
| interval | number | 1 | Interval to load a thumbnail image, must be an integer, unit is second. | 
| thumbnailRatio | number | 5 | Thumbnail image shrink ratio compared to video. |


## Contribute to this package
Are you interested in contributing to this package? Feel free to adding a new functionality and create a merge request. 

## Roadmap

`fullScreen` - add full-screen control to the control bar just like YouTube Video did.
