# View transition theme animations 

Add cool effect when trnsitionning from light to dark mode using css and view transitions 
> [copied from @jhey on twitter](https://codepen.io/jh3y/pen/BaggYwa)
> 

>[!NOTE]
> This assumes you've already have your dark light mode setup with some sort of function to update your theme

1. Add the css

```css
  /* Angled */
  [data-style='angled']::view-transition-old(root) {
    animation: none;
    z-index: -1;
  }

  [data-style='angled']::view-transition-new(root) {
    animation: unclip 1s;
    clip-path: polygon(-100vmax 100%, 100% 100%, 100% -100vmax);
  }

  @keyframes unclip {
    0% {
      clip-path: polygon(100% 100%, 100% 100%, 100% 100%);
    }
  }

```

2. ensure `data-style="angled"` attribute is set on the root element
in SPA react we use a useEffect hook
```tsx
  useEffect(() => {
    // set the data-style attribute
    document.documentElement.dataset.style = "angled";
  }, []);
```
in SSR it can be set directly  in the html tag


3. wrap your theme change function in a `documnet.startViewTransition` to start the view transition

```ts
  function transitionColors() {
    if (typeof window !== "undefined") {
      document.startViewTransition(() => {
        const newTheme = theme  === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = newTheme;
        updateTheme(newTheme);
      });
    }
  }

```


more transition styles can be added by including the corresponding css file and adding the correct `data-style` attribute

```tsx
      <select
      className="select select-bordered select-sm max-w-xs"
        onChange={(e) =>
          (document.documentElement.dataset.style = e.target.value)
        }
      >
        <option value="default">Default</option>
        <option value="vertical">Vertical</option>
        <option value="wipe">Wipe</option>
        <option value="angled">Angled</option>
        <option value="flip">Flip</option>
        <option value="slides">Slides</option>
      </select>
```

other transtion css
<details>
<summary>Click to exp expand vertical transition css</summary> 


>[!NOTE]
>ensure to have your data-theme atrribute hoisted to the root document fro this to work , add below to your ttheme update logic

```ts
document.documentElement.dataset.theme = newTheme;
```

```css
/* vertical */

  [data-style='vertical']::view-transition-new(root) {
    animation: reveal 1s;
    clip-path: inset(0 0 0 0);
    z-index: 2;
  }

  [data-style='vertical']::view-transition-old(root) {
    z-index: -1;
    animation: none;
  }

  @keyframes reveal {
    from {
      clip-path: inset(var(--from));
    }
  }


    [data-theme='dark'] {
    --from: 0 0 100% 0;
  }

  [data-theme='light'] {
    --from: 100% 0 0 0;
  }

  [data-theme='system'] {
    --from: 0 100% 0 0;
  }


```
</details>

<details>
<summary>Click to exp expand wipe transition css</summary> 

```css
  [data-style='wipe']::view-transition-group(root) {
    animation-duration: 1.25s;
  }

  [data-style='wipe']::view-transition-new(root) {
    animation-name: reveal-light;
  }

  [data-style='wipe']::view-transition-old(root),
  [data-style='wipe'][data-theme='dark']::view-transition-old(root) {
    animation: none;
  }

  [data-style='wipe'][data-theme='dark']::view-transition-new(root) {
    animation-name: reveal-dark;
  }

  @keyframes reveal-dark {
    from {
      clip-path: polygon(-30% 0, -30% 0, -15% 100%, -10% 115%);
    }

    to {
      clip-path: polygon(-30% 0, 130% 0, 115% 100%, -10% 115%);
    }
  }

  @keyframes reveal-light {
    from {
      clip-path: polygon(130% 0, 130% 0, 115% 100%, 110% 115%);
    }

    to {
      clip-path: polygon(130% 0, -30% 0, -15% 100%, 110% 115%);
    }
  }



```
</details>



<details>
<summary>Click to exp expand slides transition css</summary> 
 
 ```css
   @property --column-one {
    inherits: true;
    initial-value: 0;
    syntax: '<number>';
  }

  @property --column-two {
    inherits: true;
    initial-value: 0;
    syntax: '<number>';
  }

  @property --column-three {
    inherits: true;
    initial-value: 0;
    syntax: '<number>';
  }

  @property --column-four {
    inherits: true;
    initial-value: 0;
    syntax: '<number>';
  }

  @property --column-five {
    inherits: true;
    initial-value: 0;
    syntax: '<number>';
  }

  @keyframes one {
    from {
      --column-one: 100;
    }
  }

  @keyframes two {
    from {
      --column-two: 100;
    }
  }

  @keyframes three {
    from {
      --column-three: 100;
    }
  }

  @keyframes four {
    from {
      --column-four: 100;
    }
  }

  @keyframes five {
    from {
      --column-five: 100;
    }
  }

  [data-style='slides']::view-transition-new(root) {
    clip-path: polygon(
      /*	1st column */ 0 100%,
      0 calc(var(--column-one) * 1%),
      20% calc(var(--column-one) * 1%),
      20% 100%,
      /*	2nd column */ 20% 100%,
      20% calc(var(--column-two) * 1%),
      40% calc(var(--column-two) * 1%),
      40% 100%,
      /*	3rd column */ 40% 100%,
      40% calc(var(--column-three) * 1%),
      60% calc(var(--column-three) * 1%),
      60% 100%,
      /*	4th column */ 60% 100%,
      60% calc(var(--column-four) * 1%),
      80% calc(var(--column-four) * 1%),
      80% 100%,
      /*	5th column */ 80% 100%,
      80% calc(var(--column-five) * 1%),
      100% calc(var(--column-five) * 1%),
      100% 100%
    );
  }

  [data-style='slides']::view-transition-new(root) {
    --speed: 0.625;
    --columns: 5;
    animation: one calc(var(--speed) * 1s)
        calc(sin((0 / 5) * 45deg) * var(--speed) * 1s),
      two calc(var(--speed) * 1s) calc(sin((1 / 5) * 45deg) * var(--speed) * 1s),
      three calc(var(--speed) * 1s)
        calc(sin((2 / 5) * 45deg) * var(--speed) * 1s),
      four calc(var(--speed) * 1s)
        calc(sin((3 / 5) * 45deg) * var(--speed) * 1s),
      five calc(var(--speed) * 1s)
        calc(sin((4 / 5) * 45deg) * var(--speed) * 1s);
    animation-fill-mode: both;
    animation-timing-function: linear(
      0 0%,
      0.0027 3.64%,
      0.0106 7.29%,
      0.0425 14.58%,
      0.0957 21.87%,
      0.1701 29.16%,
      0.2477 35.19%,
      0.3401 41.23%,
      0.5982 55.18%,
      0.7044 61.56%,
      0.7987 68.28%,
      0.875 75%,
      0.9297 81.25%,
      0.9687 87.5%,
      0.9922 93.75%,
      1 100%
    );
    z-index: 2;
  }

  [data-style='slides']::view-transition-old(root) {
    animation: none;
  }

 ```
</details>



<details>
<summary>Click to exp expand flip transition css</summary> 

```css
[data-style='flip']:root {
    --size: 45px;
    --line: color-mix(in lch, white, transparent 85%);
    background: linear-gradient(
          90deg,
          var(--line) 1px,
          transparent 1px var(--size)
        )
        50% 50% / var(--size) var(--size),
      linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
        var(--size) var(--size),
      hsl(210 70% 34%);
  }

  [data-style='flip']::view-transition-new(body),
  [data-style='flip']::view-transition-old(body) {
    animation: pan 1s ease-in-out;
    backface-visibility: hidden;
    box-shadow: 2.2px 61.3px 73.1px -2px hsl(0 0% 0% / 0.58);
  }

  [data-style='flip']::view-transition-new(body) {
    --sr: 180deg;
    background: canvas;
  }

  [data-style='flip']::view-transition-old(body) {
    --sr: 0deg;
    backface-visibility: hidden;
  }

  [data-style='flip'] body {
    view-transition-name: body;
  }

  @keyframes pan {
    0% {
      transform: scale(1) rotateY(var(--sr));
    }

    25% {
      transform: scale(0.5) rotateY(var(--sr));
      box-shadow: 1.8px 50.7px 51.4px -3.2px hsl(0 0% 0% / 0.32);
    }

    75% {
      transform: scale(0.5) rotateY(calc(var(--sr) + 180deg));
      box-shadow: 1.8px 50.7px 51.4px -3.2px hsl(0 0% 0% / 0.32);
    }

    100% {
      transform: scale(1) rotateY(calc(var(--sr) + 180deg));
    }
  }

  [data-style='flip']:root {
    view-transition-name: none;
  }

```
</details>

