# GitHub Contributors Spotlight

[![npm version](https://img.shields.io/npm/v/@nyvoda/contributors-spotlight?color=blue&style=flat-square)](https://www.npmjs.com/package/@nyvoda/contributors-spotlight)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/nyvoda/contributors-spotlight/pulls)

## ✨ Overview

`@nyvoda/contributors-spotlight` is a lightweight and powerful tool that automatically generates a dynamic spotlight showcasing your GitHub contributors. It allows you to highlight the top contributors in your README or other markdown files with a single command.

Whether you're maintaining an open-source project or a private repository, this tool can help you acknowledge and appreciate the contributions of your community.

## 🚀 Features

- **Dynamic Spotlight**: Automatically generates a list of 5 top contributors.
- **Customizable**: You can customize the number of contributors and the format in which they are displayed.
- **GitHub API Integration**: Fetches real-time data from GitHub to ensure an accurate spotlight.
- **TypeScript**: Built with TypeScript for enhanced type safety and developer experience.
- **Easy to Use**: Just install, configure, and run a simple command to generate your contributor list.

## 📦 Installation

You can install the `@nyvoda/contributors-spotlight` package via npm:

```bash
npm install @nyvoda/contributors-spotlight
```

Or using Yarn

```bash
yarn add @nyvoda/contributors-spotlight
```

## ⚙️ Usage

After installing the package, you can import and use it to generate the CONTRIBUTORS.md file.

### Usage with ES Modules

If your project is using ES Modules (you have "type": "module" in your package.json), you can use the import syntax.

Create a script file (e.g., generateContributors.js):

```js
import { ContributorsGenerator } from '@nyvoda/contributors-spotlight';

async function generateContributors() {
  try {
    console.log('Starting the contributor generation process...');
    await ContributorsGenerator.generate();
    console.log('CONTRIBUTORS.md file has been generated successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateContributors();
```

Run the script:

```bash
node generateContributors.js
```

### Usage with CommonJS

If your project is using CommonJS (the default module system in Node.js), you can use require instead of import.

Create a script file (e.g., generateContributors.js):

```js
const { ContributorsGenerator } = require('@nyvoda/contributors-spotlight');

async function generateContributors() {
  try {
    console.log('Starting the contributor generation process...');
    await ContributorsGenerator.generate();
    console.log('CONTRIBUTORS.md file has been generated successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateContributors();
```

Run the script:

```bash
node generateContributors.js
```

This will generate a `CONTRIBUTORS.md` file in the root of your project.

## 🍯 Advanced Usage

For more advanced use cases, you can modify the generator’s behavior by customizing the fetcher, processor, or even adding your own template files.

If you wish to integrate this generator into your CI/CD pipeline, you can automate the generation of the `CONTRIBUTORS.md` file as part of your release process.

📌 **Credits**: See our [CONTRIBUTORS.md](CONTRIBUTORS.md) for a list of top contributors!
