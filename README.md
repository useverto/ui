<p align="center">
  <a href="https://verto.exchange">
    <img src="https://raw.githubusercontent.com/useverto/design/master/logo/logo_light.svg" alt="Verto logo (light version)" width="110" />
  </a>

  <h3 align="center">Verto UI</h3>

  <p align="center">
    React components conforming to the Verto Style Guide, based on <a href="https://geist-ui.dev">Geist UI</a>.
  </p>
</p>

## About

This is the Verto React Component library, based on Geist UI, designed by [@maximousblk](https://github.com/maximousblk), developed by The Verto Team

## Guide

### Install

```
yarn add @verto/ui
```

or

```
npm i @verto/ui
```

### Usage

Before you start using the components, make sure to wrap your app component with the `Verto Provider`:

```tsx
<VertoProvider theme={theme}>
  <App />
</VertoProvider>
```

The `theme` prop can be "Light" or "Dark" and it is required.

### Components

All components' documentation can be found at [ui.verto.exchange](https://ui.verto.exchange) and in the [repo](https://github.com/useverto/ui/blob/main/test/src/App.tsx).

## License

The code contained within this repository is licensed under the MIT license. Geist UI is also licensed under the MIT license.
