# How do `<audio>` and `<video>` tags work?

HTML provides native elements for embedding audio and video:

* `<audio>` → audio content
* `<video>` → video content

They provide built-in browser media controls when `controls` is specified.

## `<audio>`

```html
<!-- Embed an audio file with native browser controls -->
<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
  <source src="song.ogg" type="audio/ogg" />

  Your browser does not support audio.
</audio>
```

The browser chooses a supported source.

---

## `<video>`

```html
<!-- Embed a video with native controls and a poster image -->
<video
  controls
  width="640"
  height="360"
  poster="thumbnail.jpg"
>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />

  Your browser does not support video.
</video>
```

Common attributes include:

| Attribute     | Purpose                                              |
| ------------- | ---------------------------------------------------- |
| `controls`    | Shows browser media controls                         |
| `autoplay`    | Starts automatically                                 |
| `muted`       | Starts muted                                         |
| `loop`        | Repeats playback                                     |
| `poster`      | Preview image for video                              |
| `preload`     | Provides a hint about loading behavior               |
| `playsinline` | Helps video play inline on supported mobile browsers |

### Autoplay gotcha

Browsers commonly restrict autoplay when media has audible sound.

This is more likely to work:

```html
<!-- Muted autoplay is commonly permitted where autoplay is allowed -->
<video
  autoplay
  muted
  loop
  playsinline
>
  <source src="background.mp4" type="video/mp4" />
</video>
```