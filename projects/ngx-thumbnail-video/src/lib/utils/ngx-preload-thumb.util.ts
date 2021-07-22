import { BehaviorSubject } from 'rxjs';
import { VideoPlayerConfig } from '../models/ngx-thumbnail-video.models';

export function preloadVideoThumbs(
  thumbs$: BehaviorSubject<any[]>,
  duration: number,
  video: any,
  options: Partial<VideoPlayerConfig>
): any {
  document.body.appendChild(video);
  const thumbs: any[] = [];
  const canvasWidth = +(options.width?.replace(/\D/g, '') ?? 0) / (options?.thumbnailRatio ?? 5);
  const canvasHeight = +(options.height?.replace(/\D/g, '') ?? 0) / (options?.thumbnailRatio ?? 5);
  video.addEventListener(
    'loadeddata',
    async function () {
      for (let i = 0; i <= duration; i = i + (options.interval ?? 1)) {
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const context = canvas.getContext('2d');
        video.currentTime = i;

        await new Promise(function (rsv) {
          const event = function () {
            context?.drawImage(video, 0, 0, canvasWidth, canvasHeight);
            const url = canvas.toDataURL('image/jpeg');
            thumbs.push({ sec: i, url });
            video.removeEventListener('canplay', event);
            rsv(null);
          };
          video.addEventListener('canplay', event);
        });
      }
      thumbs$.next(thumbs);
      setTimeout(() => document.body.removeChild(video));
      console.log('thumbnails loaded');
    },
    false
  );
}
