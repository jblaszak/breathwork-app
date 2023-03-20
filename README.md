# Jo's Breathwork App

I created this project because I wanted an app that I could use to do breathing exercises but there wasn't anything out there that fit my needs.

## Pain Points

- No fine-grained control over the duration of each breath and forced into a limited set of specific breathing patterns
- Using the timer on my phone results in a jarring alarm at the end of the meditation
- Sometimes getting distracted during a meditation and forgetting which portion of the breathing cycle you are currently on

## Features

- Can set each breath for box-breathing between 0 and 15 seconds
  - Can be changed mid-way through meditation and have immediate effect
- Can set total duration of meditation up to 1 hour
- Guiding voice for current breath (optional)
- Breath sounds for inhale/exhale (optional)
- Soothing background wave sound, fading in/out smoothly (optional)
- Soothing completion notifcation at end of meditation
- Preferences automatically saved using localStorage
- Accessibility for screen readers
- Animations!

## Challenges

I started this project originally just wanting to throw together something quick but then kept thinking of more and more things to add or different ways of doing stuff. Unfortunately, this meant a lot more refactoring as things had to not only be handled differently but also designed differently graphically. For my future projects, I plan to create a design, user workflow and desired feature set first to minimize this.

The app was originally made using intervals to handle breath timing, but I ended up using the request animation frame API to allow immediate changes/updates to timing and better control over the animations.

Resetting the animation states programmatically required reflowing elements on the page, but since React batches changes made in a function call this meant the reflow had to be broken up into two different animation frames.

As the animation function created a closure, react state was stuck at what it was when the function was called. This required using refs to store information relevant to the animation state.

Handling sounds was a new experience. There was some bug caused by an outdated version of an I/O package (memfs) that comes with React, fixed by updating the package. Playing, restarting, and controlling playback speed/volume needed to be figured out as well.

Finding good audio with free licensing took longer than I had expected. I had also originally planned to extend the voice/breath sounds for the duration of the breaths but in practice this resulted in choppy audio so it was scrapped.

## Future Possibilities

As AI generated audio and SVG images improve I plan to use better audio and maybe convert this into an app for the iOS app store.

Three.js to add some 3D elements to make things pop a bit more, but would add to load time/dependencies.

I had always liked the idea of having a visual indication of the current breath phase so may include some option to view a flowing curve moving up/down gradually as the breath progresses.

More background sounds! Also, simply editing the background audio to fade/in out in the audio itself seems like a much better solution than doing it programmatically.
