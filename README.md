# Frontend Mentor - Launch countdown timer solution

This is a solution to the [Launch countdown timer challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/launch-countdown-timer-N0XkGfyz-). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
-   [Author](#author)

## Overview

### The challenge

Users should be able to:

-   See hover states for all interactive elements on the page
-   See a live countdown timer that ticks down every second (start the count at 14 days)
-   **Bonus**: When a number changes, make the card flip from the middle

### Screenshot

![](./screenshot.jpg)

### Links

-   Solution URL: [Add solution URL here](https://your-solution-url.com)
-   Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

-   Semantic HTML5 markup
-   Flexbox
-   CSS Grid
-   Desktop-first workflow
-   [SASS](https://sass-lang.com/) - JS library

### What I learned

Learned how apply effects to svg, instead of using fill with sprites in CSS.

```css
&:hover,
&:active {
    filter: invert(48%) sepia(99%) saturate(921%) hue-rotate(309deg) brightness(
            98%
        ) contrast(100%);
}
```

Found how apply and remove some animation in Javascript every tick using this trick.

```js
animationFlipElement.classList.remove("header__time-card__top--animate");

void animationFlipElement.offsetWidth;

animationFlipElement.classList.add("header__time-card__top--animate");
```

### Continued development

The code in Javascript can be improved in the future using ES6 Classes, it's ok for an isolated application for now.

## Author

-   Frontend Mentor - [@okcomputer93](https://www.frontendmentor.io/profile/okcomputer93)
