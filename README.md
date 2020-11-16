# React-Ionic-Storybook

## Index

- [Introduction](#Introduction)
- [Third Party Libraries](#Third-Party-Libraries)
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Develop](#Develop)
- [Build](#Build)
- [Code Standards](#Code-Standards)

<br />
<br />

---

<br />

## Introduction

This is a boilerplate app.

Source code for all three platforms (iOS, Android, and Web) is generated from this codebase.

<br />
<br />

---

<br />

## Third Party Libraries

This app is built with [React][react-docs] and [TypeScript][typescript-docs].

[Yarn][yarn-docs] is used as the package manager.

[Ionic][ionic-docs] is used to generate builds for all three platforms (iOS, Android, and Web).

### Linting and Formatting

This app uses [ESLint][eslint-docs] linting and [Prettier][prettier-docs] code formatting. It's recommended to install the ESLint (`dbaeumer.vscode-eslint`) and Prettier (`esbenp.prettier-vscode`) VS Code extensions.

### Scaffolding

[Plop][plop-docs] is used for scaffolding (generation of component, test, and storybook files).

### Internationalising

Internationalisation is achieved using [I18next][i18next-docs] for translations, and [Luxon][luxon-docs] for date and time.

> Luxon has [several benefits][luxon-vs-moment] over Moment, including immutability and a clearer API.

### Showcasing

[Storybook][storybook-docs] is used as the playground and showcasing tool for components and themes.

Storybook is passsword protected. To view Storybook, login to [Storybook][storybook-url].The password is `Welcome1`.

### Testing

Unit testing is done with [Jest][jest-docs] and [Testing Library][testing-library-docs]. End-to-end (e2e) testing uses [Cypress][cypress-docs].

> Testing library was chosen over Enzyme as Testing Library [approaches testing from a user's perspective][testing-library-vs-enzyme].

### Styling

Styling is done using [Emotion][emotion-docs], specifically via a theme-provider and the CSS prop.

> Colocating styles alongside components prevents accidental overriding of other components' styles (as experienced when using standard CSS files). Defining styles in a JavaScript object as a component prop rather than in a colocated SCSS module reduces context switching and gives a clearer understanding of how the component is rendered in the DOM. Applying styles via a single prop rather than multiple style props (such as with Styled System) maintains a separation of concerns by preventing multiple style props from becoming conflated with data props. Emotion's CSS prop allows style overriding and creates a single class for the styled component, rather than creating multiple classes when styles are overridden (as with SCSS), therefore auto-generated CSS order does not cause issues.

### Logging

[Raygun][raygun-docs] is used for logging.

<br />
<br />

---

<br />

## Prerequisites

Before running the app, make sure you have these dependencies installed on your machine:

- [Homebrew (v2.5.6 or later)][homebrew-install]
- [Yarn (v1.22.10 or later)][yarn-install]
- [Node (v14.14.0 or later)][node-install]
- [Ionic CLI (v6.12.0 or later)][ionic-cli-install]
- [XCode (v12.1 or later)][xcode-install] (only required for iOS development)

<br />
<br />

---

<br />

## Installation

To install dependencies, open a terminal in the root directory and run:

```
yarn
```

### Android

To install Android CLI tools and required SDKs, run:

```
yarn install:android
```

### iOS

To install iOS dependencies, run:

```
yarn install:ios
```

<br />
<br />

---

<br />

## Develop

### Web

To start the Web development server, run:

```
yarn dev:web
```

The app is served at `http://localhost:3000`.

### Android

To start the Android development server, run:

```
yarn dev:android
```

The app is served at `http://localhost:3001`. Use `http://10.0.2.2:3001` to view the app from an Android emulator.

### iOS

To start the iOS development server, run:

```
yarn dev:ios
```

The app is served at `http://localhost:3002`.

> When running this for the first time, the build will not be installed on the iOS Simulator. You will need to do this manually. Open the app in Xcode with `ionic cap open ios`, select the `dev-phone-ios` device, and run the build from Xcode. Once the app is installed, you can continue using this script without the need for Xcode.

<br />
<br />

---

<br />

## Build

### Web

To build the Web app, run:

```
yarn build:web
```

The build is located at `<app_root>/build`.

### Android

To build the Android app, run:

```
yarn build:android
```

The build is located at `<app_root>/android`.

### iOS

To build the iOS app, run:

```
yarn build:ios
```

The build is located at `<app_root>/ios`.

<br />
<br />

---

<br />

## Code Standards

Each of the following sections contains bullet points that define the code standards for this codebase.

### Sections

- [Directories And Files](#Directories-And-Files)
- [Internationalisation](#Internationalisation)
- [Style](#Style)
- [Tests](#Tests)
- [Comments](#Comments)
- [JavaScript](#JavaScript)
- [React](#React)
- [TypeScript](#TypeScript)

---

### Directories And Files

- Directory names are `snake_case`
- Component filenames and TypeScript type filenames are `PascalCase`
- All other filenames are `camelCase`
- React Hook filenames are prefixed with `use`
- React Context filenames are suffixed with `Context`
- All TypeScript files use the `.tsx` TypeScript React extension

> TypeScript handles type assertions differently in `.tsx` files compared to `.ts` files, so the extension of all TypeScript files should be consistent.

#### Directory structure

```
src
├── features
│   └── example_feature
│       ├── translations
│       │   └── enNz.tsx
│       ├── ExampleFeature.tsx
│       ├── ExampleFeatureContext.tsx
│       └── useExampleFeature.tsx
├── i18n
│   ├── translations
│   │   └── enNz.tsx
│   ├── I18nContext.tsx
│   └── i18nInstance.tsx
├── shared
│   ├── components
│   │   └── Example.tsx
│   ├── contexts
│   │   └── ExampleContext.tsx
│   ├── helpers
│   │   └── exampleHelpers.tsx
│   └── hooks
│       └── useIsMounted.tsx
├── theme
│   ├── Icons.tsx
│   ├── theme.tsx
│   └── ThemeContext.tsx
├── types
│   ├── Example1.tsx
│   ├── index.tsx
│   └── Example2.tsx
├── App.tsx
├── index.tsx
└── testUtils.tsx
```

---

### Internationalisation

- Dates are formatted based on locale.
- All non-user-defined text is rendered through a translation function.
- Translation keys are `snake_case` and are defined in a flat object.

> Snake case translation keys are easier to find in the translation files than object-based keys. An object-based key such as `section.value` is defined in a translation file as `{ section: { value: "translation" } }`. Searching for `section.value` will only return locations where the translation is used, not defined. A snake case key such as `section_value` is defined as `{ section_value: "translation" }`, so searching for `section_value` returns the location where the translation is defined, as well as the locations where the translation is used.

---

### Style

- Margin is defined by parent components. No component defines its own margin.
- Encapsulate CSS styles in new components rather than repeatedly styling existing components.
- Emotion's CSS prop (and JSX pragma) is used to style components.

---

### Tests

- Test ids are avoided unless necessary. Tests find DOM elements using WAI-ARIA roles and display text.

---

### Comments

- Comments explain _why_ code does what it does, not _what_ code does
- Complex or non-obvious code has comments
- Non-obvious regular expressions have comments
- Code is deleted rather than commented out, unless necessary, in which case a comment explains why
- A `// TODO: ...` comment is used for useful features, optimisations, or refactoring, that can't be done right now
- A `// FIXME: ...` comment is used for known bugs and broken code, that can't be fixed right now
- The validity of existing comments are checked after working on related code
- Non obvious Functions use [JSDoc][jsdoc-docs]

---

### JavaScript

- Async and await is preferred over promise chains
- Variable names avoid abbreviations unless abbreviations are well-known
- Function names are prefixed with `get` if they retrieve existing data, `set` if they write data, or `create` if they generate data
- Arrow functions `() => {}` are used instead of the `function` keyword
- Boolean names read as questions, prefixed with `is`, `are`, `has`, `will`, or `should`
- Boolean names are affirmative, avoiding negation

> For example, prefer `isVisible` instead of `isHidden` unless more appropriate within the context. Never use `isNotHidden` 😭.

---

### React

- Components are named in order of specificity, from most to least specific (`[specific]...[generic]`)

> For example, `IconList` is a list (generic) of icons (specific), where `ListIcon` is an icon (generic) that indicates a list (specific).

- Components are functions, <span style="color:#f88">no class components allowed</span>

> Class components are more verbose, harder to read, contain more boilerplate, and suffer from more gotchas than functions components, and are no longer the focus of React's feature roadmap.

- State is managed using hooks (at the component level) and in React Contexts. Third party state libraries may be used in special cases
- Context is used for global state
- Local state is used for component specific state
- Context files export a hook that wraps the `useContext` React hook

> For example, a `VideoLibraryContext` file exports a `useVideoLibrary` hook.

---

### TypeScript

- Interface names are **not** prefixed with `I`
- Type and Interface names are `PascalCase`
- Type and Interface names are non-plural, unless the object is a container for other values

> Examples of plural names are `Props`, `Options`, and `Settings`.

- Define generics with useful names unless it is obvious what the generic represents

> For example, for a component `List<T>`, `T` is clearly the list item type, whereas for a function `getEncoding<T>`, `T` is non-obvious. A better type name would be `getEncoding<TMedia>`, which makes it clear the type is media data, or `getEncoding<TSettings>` which makes it clear the type is settings data.

- The `any` type is not used unless necessary. If a type is unknown, the `unknown` type is used and the value is confirmed to be the expected type before being used

> Assigning an `any` type to another type can cause runtime errors if the types are not compatible. Trying to assign an `unknown` type to another type will cause a compiler error unless type checking is done to confirm the types are compatible.

<div style="margin:0 0 0 48px;padding:0 0 0 16px;border-left:4px solid #80808040">

##### Example:

<div style="background-color:#ff000030;margin-bottom:-10px;padding:0 8px">

❌ Any

</div>

<div style="border-bottom:1px solid #ff0000"></div>

```tsx
const something: any
const myBool: boolean = something // potential runtime error
```

<div style="border-top:1px solid #ff0000;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#00ff8030;margin-bottom:-10px;padding:0 8px">

✅ Unknown

</div>

<div style="border-bottom:1px solid #00ff80"></div>

```tsx
const something: unknown
const myBool: boolean = something // compiler error
```

<div style="border-top:1px solid #00ff80;padding-bottom:16px;margin-top:-16px"></div>

</div>

- Type annotation is used instead of type assertion unless necessary.

> Type assertion overrides the inferred type and can lead to runtime errors.

<div style="margin:0 0 0 48px;padding:0 0 0 16px;border-left:4px solid #80808040">

##### Example

Consider the type:

```tsx
interface Video {
  play: () => void
}
```

<div style="background-color:#ff000030;margin-bottom:-10px;padding:0 8px">

❌ Type assertion

</div>

<div style="border-bottom:1px solid #ff0000"></div>

```tsx
const video = {} as Video // potential runtime error
```

<div style="border-top:1px solid #ff0000;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#00ff8030;margin-bottom:-10px;padding:0 8px">

✅ Type annotation

</div>

<div style="border-bottom:1px solid #00ff80"></div>

```tsx
const video: Video = {} // compiler error
```

<div style="border-top:1px solid #00ff80;padding-bottom:16px;margin-top:-16px"></div>

Type assertion does not cause a compiler error when asserting `{}` as type `Video`, even though `{}` does not have a `play` method. We get a runtime error `TypeError video.play is not a function.` when calling `video.play()` during execution.

Type annotation causes a compiler errors when we try to assign `{}` to `video` which is annotated with type `Video`. We get compiler error `Property 'play' is missing in type '{}' but required in type 'Video'.`

</div>

- The `typeof` keyword is used when referring to the type of an existing variable

<div style="margin:0 0 0 48px;padding:0 0 0 16px;border-left:4px solid #80808040">

##### Example

Consider the object:

```tsx
const item = {
  id: 'some-id',
}
```

<div style="background-color:#ff000030;margin-bottom:-10px;padding:0 8px">

❌ New type

</div>

<div style="border-bottom:1px solid #ff0000"></div>

```tsx
const newItem: { id: string } = {
  id: 'some-other-id',
}
```

<div style="border-top:1px solid #ff0000;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#00ff8030;margin-bottom:-10px;padding:0 8px">

✅ `typeof` keyword

</div>

<div style="border-bottom:1px solid #00ff80"></div>

```tsx
const newItem: typeof item = {
  id: 'some-other-id',
}
```

<div style="border-top:1px solid #00ff80;padding-bottom:16px;margin-top:-16px"></div>

</div>

- Bracket notation or the `Pick` type is used to create subtypes

> Using bracket notation or `Pick` maintains the relationship with the existing type, meaning changes to the original type trickle down to the subtype.

<div style="margin:0 0 0 48px;padding:0 0 0 16px;border-left:4px solid #80808040">

##### Example

Consider the type:

```tsx
interface User {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
}
```

<div style="background-color:#ff000030;margin-bottom:-10px;padding:0 8px">

❌ New type

</div>

<div style="border-bottom:1px solid #ff0000"></div>

```tsx
type UserDateOfBirth = string
```

<div style="border-top:1px solid #ff0000;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#00ff8030;margin-bottom:-10px;padding:0 8px">

✅ Bracket notation

</div>

<div style="border-bottom:1px solid #00ff80"></div>

```tsx
type UserDateOfBirth = User['dateOfBirth']
```

<div style="border-top:1px solid #00ff80;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#ff000030;margin-bottom:-10px;padding:0 8px">

❌ New type

</div>

<div style="border-bottom:1px solid #ff0000"></div>

```tsx
type UserContactDetails = {
  email: string
  phone: string
}
```

<div style="border-top:1px solid #ff0000;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#00ff8030;margin-bottom:-10px;padding:0 8px">

✅ `Pick` type

</div>

<div style="border-bottom:1px solid #00ff80"></div>

```tsx
type UserContactDetails = Pick<User, 'email' | 'phone'>
```

<div style="border-top:1px solid #00ff80;padding-bottom:16px;margin-top:-16px"></div>

</div>

- Component props are typed with the minimum data required.

> This makes testing a lot easier as the tests do not have to mock redundant data.

<div style="margin:0 0 0 48px;padding:0 0 0 16px;border-left:4px solid #80808040">

##### Example

Consider the type:

```tsx
interface User {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
}
```

In a `UserEmailCard` component that renders a user's email, we only need the `email` value from the user object.

Defining `UserEmailCard` as taking an entire `User` object means that when testing, we have to generate mock values for all the `User` properties, which never get used.

A single `email` prop is easier to test, and makes it obvious that this component only takes a value for `email`:

<div style="background-color:#ff000030;margin-bottom:-10px;padding:0 8px">

❌ Unnecessary props

</div>

<div style="border-bottom:1px solid #ff0000"></div>

```tsx
// component file
interface UserEmailCardProps {
  user: User;
}

const UserEmailCard: FC<UserEmailCardProps> = ({user}) => {
  // ...
}

// test file
const mockUser = {
  id: "1";
  name: "Pipo";
  email: "pipo.the.horse@example.com";
  phone: "012345678";
  dateOfBirth: "01/01/1980";
}

testRender(<UserEmailCard user={user} />)
```

<div style="border-top:1px solid #ff0000;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#00ff8030;margin-bottom:-10px;padding:0 8px">

✅ Single prop

</div>

<div style="border-bottom:1px solid #00ff80"></div>

```tsx
// component file
interface UserEmailCardProps {
  email: User['email']
}

const UserEmailCard: FC<UserEmailCardProps> = ({ email }) => {
  // ...
}

// test file
const mockUserEmail = 'pipo.the.horse@example.com'

testRender(<UserEmailCard email={email} />)
```

<div style="border-top:1px solid #00ff80;padding-bottom:16px;margin-top:-16px"></div>

</div>

- When requiring multiple props from a type, use `Pick` to prevent a long list of props.

<div style="margin:0 0 0 48px;padding:0 0 0 16px;border-left:4px solid #80808040">

##### Example

In a `UserContactCard` component, we only need some of the `User` type properties (`name`, `email`, and `phone`):

<div style="background-color:#ff000030;margin-bottom:-10px;padding:0 8px">

❌ Multiple props

</div>

<div style="border-bottom:1px solid #ff0000"></div>

```tsx
// component file
interface UserContactCardProps {
  name: User['name']
  email: User['email']
  phone: User['phone']
}

const UserContactCard: FC<UserContactCardProps> = ({ name, email, phone }) => {
  // ...
}

// test file
const mockUser = {
  name: 'Pipo',
  email: 'pipo.the.horse@example.com',
  phone: '012345678',
}

testRender(<UserContactCard name={mockUser.name} email={mockUser.email} phone={mockUser.phone} />)
```

<div style="border-top:1px solid #ff0000;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#00ff8030;margin-bottom:-10px;padding:0 8px">

✅ Single Pick prop

</div>

<div style="border-bottom:1px solid #00ff80"></div>

```tsx
// component file
interface UserContactCardProps {
  user: Pick<User, 'name' | 'email' | 'phone'>
}

const UserContactCard: FC<UserContactCardProps> = ({ user }) => {
  const { name, email, phone } = user
  // ...
}

// test file
const mockUser = {
  name: 'Pipo',
  email: 'pipo.the.horse@example.com',
  phone: '012345678',
}

testRender(<UserContactCard user={mockUser} />)
```

<div style="border-top:1px solid #00ff80;padding-bottom:16px;margin-top:-16px"></div>

</div>

- Components are typed with `FC` if props are required.
- Component props are named using the name of the component, and suffixed with `Props`.

<div style="margin:0 0 0 48px;padding:0 0 0 16px;border-left:4px solid #80808040">

##### Example

```tsx
interface VideoPlayerProps {
  // ...
}

const VideoPlayer: FC<VideoPlayerProps> = () => {
  // ...
}
```

</div>

- Interfaces are not exported from component from component files.
- The `ComponentProps` type and `typeof` keyword are used to get prop types for a specific component.

<div style="margin:0 0 0 48px;padding:0 0 0 16px;border-left:4px solid #80808040">

##### Example:

<div style="background-color:#ff000030;margin-bottom:-10px;padding:0 8px">

❌ Exporting component props

</div>

<div style="border-bottom:1px solid #ff0000"></div>

```tsx
import { FC } from 'react'
import { VideoPlayer, VideoPlayerProps } from './VideoPlayer'

export const VideoPlayerWrapper: FC<VideoPlayerProps> = (
  {
    /* ...videoPlayerProps */
  }
) => {
  // ...
}
```

<div style="border-top:1px solid #ff0000;padding-bottom:16px;margin-top:-16px"></div>

<div style="background-color:#00ff8030;margin-bottom:-10px;padding:0 8px">

✅ Using `ComponentProps` and `typeof`

</div>

<div style="border-bottom:1px solid #00ff80"></div>

```tsx
import { FC, ComponentProps } from 'react'
import { VideoPlayer } from './VideoPlayer'

export const VideoPlayerWrapper: FC<ComponentProps<typeof VideoPlayer>> = (
  {
    /* ...videoPlayerProps */
  }
) => {
  // ...
}
```

<div style="border-top:1px solid #00ff80;padding-bottom:16px;margin-top:-16px"></div>

</div>

<br />
<br />
<br />

[cypress-docs]: https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell
[emotion-docs]: https://emotion.sh/docs/introduction
[eslint-docs]: https://eslint.org/docs/user-guide/getting-started
[homebrew-install]: https://brew.sh/
[i18next-docs]: https://www.i18next.com/
[ionic-cli-install]: https://ionicframework.com/docs/react/your-first-app#install-ionic-tooling
[ionic-docs]: https://ionicframework.com/docs
[jest-docs]: https://jestjs.io/docs/en/getting-started
[jsdoc-docs]: https://jsdoc.app/
[luxon-docs]: https://moment.github.io/luxon/docs/manual/tour.html
[luxon-vs-moment]: https://github.com/moment/luxon/blob/master/docs/why.md
[node-install]: https://nodejs.org/en/download/
[plop-docs]: https://plopjs.com/documentation/
[prettier-docs]: https://prettier.io/docs/en/index.html
[raygun-docs]: https://raygun.com/documentation/
[react-docs]: https://reactjs.org/docs/getting-started.html
[storybook-url]: todo
[storybook-docs]: https://storybook.js.org/docs/react/get-started/introduction
[testing-library-docs]: https://testing-library.com/docs/intro
[testing-library-vs-enzyme]: https://medium.com/@boyney123/my-experience-moving-from-enzyme-to-react-testing-library-5ac65d992ce
[typescript-docs]: https://www.typescriptlang.org/docs/
[xcode-install]: https://www.freecodecamp.org/news/how-to-download-and-install-xcode/#option-2-download-via-the-developer-site-for-a-specific-version-my-preferred-option-
[yarn-docs]: https://yarnpkg.com/api/
[yarn-install]: https://classic.yarnpkg.com/en/docs/install/#mac-stable
