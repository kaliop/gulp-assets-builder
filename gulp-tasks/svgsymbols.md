# Task: SVG symbol sprites

- Config key: `svgsymbols`
- Source: `assets-builder/tasks/svgsymbols.js`

Takes a bunch of SVG files and make a [SVG symbol sprite](https://fvsch.com/code/svg-icons/how-to/), to be used inline in your HTML pages or as an external resource.

This task can also output a nice HTML demo page (see options).

## Options

```js
{
  // (Required) Source SVG images
  src: 'assets/icons/main/*.svg',

  // (Required) Destination must be a file name
  dest: 'public/svg/main.svg',

  // (Optional) File patterns to watch for changes, or `true`
  // to use the same value as the src property
  watch: true,

  // (Optional) Output a HTML demo page alongside the sprite
  demo: false,

  // (Optional) Add attributes for an inline <svg> sprite
  inline: false,

  // (Optional) Pattern to use for symbol id attributes. '%f' is the
  // original filename with only lowercase letters and digits.
  symbolId: 'icon-%f',

  // (Optional) Class name(s) to use in HTML usage examples.
  symbolClass: 'icon icon--%f'
}
```
