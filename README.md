# eCommerce-Application _«this is this.»_

:earth_americas:`this is this.` is a web application for searching and buying travel tours.  
The project is being developed as part of the final task of the course [JavaScript/Front-end (2023Q1)](https://rs.school/js/) from the [RS School](https://rs.school/).  
The [`this-is-this team`](https://github.com/this-is-this-team) is working on the project.

## Commercetools Setup

<details>
  <summary>.env example</summary>
  <br />
  <pre>
    CTP_PROJECT_KEY=
    CTP_CLIENT_SECRET=
    CTP_CLIENT_ID=
    CTP_AUTH_URL=
    CTP_API_URL=
    CTP_SCOPES=
  </pre>
</details>

<details>
  <summary>necessary scopes</summary>
  <br />
  <img src="https://github.com/elsuppo/this-is-this-eCommerce-application/assets/68076610/2533901d-a1bb-4a05-85c9-301057cece49" alt="profile-details"/>
  <ul>
    <li>view_products</li>
    <li>view_cart_discounts</li>
    <li>view_shipping_methods</li>
    <li>view_categories</li>
    <li>view_discount_codes</li>
    <li>view_product_selections</li>
    <li>manage_my_shopping_lists</li>
    <li>manage_my_payments</li>
    <li>manage_my_profile</li>
    <li>manage_my_orders</li>
    <li>create_anonymous_token</li>
  </ul>
</details>

## Project Purpose

- Develop a Single Page Application (SPA) without using frameworks
- Teamwork skills
- Task planning
- Consolidation of knowledge gained on the course

## Technology Stack

[![skills](https://skillicons.dev/icons?i=webpack,ts,html,css,scss,jest,git&theme=light)](#technology-stack) <a href="#technology-stack" title="ESLint"><img src="https://github.com/get-icon/geticon/raw/master/icons/json.svg" alt="eslint" width="48px" height="48px"></a> <a href="#technology-stack" title="Prettier"><img src="https://github.com/get-icon/geticon/raw/master/icons/prettier.svg" alt="prettier" width="48px" height="48px"></a> <a href="https://www.typescriptlang.org/" title="ESLint"><img src="https://github.com/get-icon/geticon/raw/master/icons/eslint.svg" alt="eslint" width="48px" height="48px"></a>

- **TypeScript** <sup>_[docs](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)_</sup>
- **Webpack 5** <sup>_[docs](https://webpack.js.org/concepts/)_</sup>
- **Jest** <sup>_[docs](https://jestjs.io/docs/getting-started)_</sup>
- **SCSS** <sup>_[docs](https://sass-lang.com/documentation/)_</sup>
- **CommerceTools API** <sup>_[docs](https://docs.commercetools.com/api/general-concepts)_</sup>
- Teamwork tools:
  - **Prettier** <sup>_[docs](https://prettier.io/docs/en/)_</sup>
  - **ESLint** <sup>_[docs](https://eslint.org/docs/latest/use/core-concepts)_</sup>
  - **Husky** <sup>_[docs](https://typicode.github.io/husky/)_</sup>
  - **lint-staged** <sup>_[docs](https://github.com/okonet/lint-staged)_</sup>

## Getting Started

To get a local copy of the project perform the following actions:

1. Clone the repo

```
git clone https://github.com/this-is-this-team/eCommerce-Application.git
```

2. Install npm packages

```
npm install
```

3. Run the project locally

```
npm run start
```

## Available scripts

#### Webpack (code building)

- build development version

```
npm run build:dev
```

- build production version

```
npm run build:prod
```

#### Prettier (code formatting)

- сhecks formatting for all project files

```
npm run prettier:check
```

- auto fixes formatting for all project files

```
npm run prettier:fix
```

#### ESLint (code linting)

- checks linting for all project files

```
npm run lint:check
```

- auto fixes linting error for all project files

```
npm run lint:fix
```

#### JEST (code testing)

- run all `*.test.ts` files for test execution

```
npm run test
```

<details>
  <summary>ALSO</summary>
  
  Before making a commit an **automated** check is performed for formatting, linting, and code testing using Husky and lint-staged
  ```
  npx lint-staged
  npm run test
  ```
</details>
