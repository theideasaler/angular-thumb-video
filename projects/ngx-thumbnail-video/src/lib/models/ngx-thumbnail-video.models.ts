export interface VideoPlayerConfig {
  /** Default width, by default is '960px'  */
  width?: string;
  /** Default height, by default is '540px' */
  height?: string;
  /** Auto play video on load, by default is false */
  autoplay?: boolean;
  /** Preload thumbnail at front end, by default is true */
  frontendPreload?: boolean;
  /** Mute video at beginning, by default is true */
  mute?: boolean;
  /** Set a border radius for your video player, by default is 0 */
  borderRadius?: string;
  /** Set time(in second) interval to load a new thumb, by default is 1 */
  interval?: number;
  /** Thumbnail image ratio, by default is 5, which has 1/5 of video height & 1/5 of width */
  thumbnailRatio?: number;
}
