# Adding your Keystrokes examples to the website

Put your own screenshots or short clips here so they show up in the **“See it in action”** section.

## What to add

- **Screenshots** – Gameplay or stream view with the Keystrokes overlay visible (e.g. `.jpg`, `.png`)
- **GIFs** – Short loops showing keys lighting up (e.g. `.gif`)
- **Short clips** – You can also use `<video>` in the HTML for `.mp4` / `.webm` (see below)

## Quick setup

1. **Add your files** to this `examples` folder.
2. **Name them** so they match what the site expects:
   - `example1.jpg` (or `.png` / `.gif`) → first card
   - `example2.jpg` → second card
   - `example3.jpg` → third card

3. **Refresh the site** – your media will appear in the Examples section.

## Tips for good examples

- **Show the overlay clearly** – frame the shot so the key display is visible (e.g. corner of the game/stream).
- **Keep file size reasonable** – for GIFs, 2–5 seconds and under ~2–3 MB loads best.
- **Aspect ratio** – 16:9 works best; the site crops to that. You can use any size; they’ll be scaled and cropped to fit.

## Adding more than 3 examples

1. In `index.html`, find the `<section class="examples">` block.
2. Copy one of the `<figure class="example-card">...</figure>` blocks.
3. Change the `src` to your new file (e.g. `examples/example4.jpg`) and update the `<figcaption>`.
4. Add your file to this folder with that name.

## Using video instead of images

Replace the `<img>` inside an example card with:

```html
<video autoplay loop muted playsinline>
  <source src="examples/example1.mp4" type="video/mp4">
</video>
```

Use a short loop (a few seconds) and keep the file size small for fast loading.
