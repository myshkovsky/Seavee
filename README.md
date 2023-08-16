# 🌊 Seavee 
A single page application that accepts user input in order to generate a neat looking CV.

Built for the purpose of completing The Odin Project's React course.

Built with:
- Vite
- TypeScript
- React
- Ant Design UI

## Developer notes 🤓
Throughout the development lifetime of this site, I have created significant technical debt and overlooked a few major things. Overall, it has been a fun learning experience. Even though the site is nowhere near perfect *(as in: "It looked far better in my imagination!")* as of 16/08/2023, I felt like publishing it and submitting it as a solution anyway.

A few things that could use some refactoring:
- The final .js package size is a whopping ~750kb. This is likely due to the poor usage of imports, among other things.
- I've had a lot of trouble converting `Date` types while passing them between the back-end and the forms located in the modals. Had I used DayJS, which is a library that was being used for date formatting by Ant Design UI *(which this project is using)*, this would have been way less of a headache. *I realized this far too late, and should've thought about it at the start.*
- State management is kinda funky, and this is partly due to my planning and partly due to how React handles state. *Personally, I much prefer Svelte's approach to state management*.

I might tinker with the site some more in the future, but right now any further tinkering is highly unlikely.

## Contributions, """licensing""", blah blah blah 😴
If **you** would like to tinker with the site, feel free! Clone it, fork it, anything goes. I don't care what you do with the source code.

However, if you somehow manage to break something important by interacting with the source code, **I will be impressed, but not liable for the damages**. *(tl;dr: use this at your own risk!)*

If you would like to contribute to the site, feel free to make a pull request and **tag me in it**. Make sure to add a proper description of what your pull request achieves, so I don't have to spend an afternoon guessing if the buttons are slightly more or less purple than they were before.

Want to add some features? Go ahead. Want to clean up some code or fix my silly mistakes? Be my guest. If it makes you happy, it makes me happy too 😃👍
