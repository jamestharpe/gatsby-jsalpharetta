# gatsby-jsalpharetta

Presentation and Demo Project for https://www.meetup.com/JavaScriptAlpharetta/events/265017002/

## Overview

![Gatsby Process Flow](gatsby-process-flow.png)

## Quick Start

### Software You Need

MacOS Specific Prerequisites:

```bash
# Xcode Command line tools
xcode-select --install

# Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Actual Dependencies
brew install node
brew install git
```

Windows Specific Prerequisites:

```powershell
# Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex

# Actual Dependencies
choco install nodejs
choco install git.install
```

Now, using a bash-compatible shell (e.g. Terminal on MacOS, Git Bash on Windows):

```bash
npm install -g gatsby-cli
gatsby new my-gatsby-site https://github.com/fabe/gatsby-starter-deck
cd my-gatsby-site
gatsby develop
```

Open [localhost:8000](http://localhost:8000/) and Voilà!

![Gatsby Deck](1-gatsby-deck.png)

### Make a Change

* Edit `src/slides/01-intro.md`
* Experience the magic of hot reload!

### About Starters

Starters are boilerplate Gatsby sites.

* [Starters Documentation](https://www.gatsbyjs.org/docs/starters/)
* [List of Commuity-Provided Starters](https://www.gatsbyjs.org/starters/)

## A Tour of the Files

### Gatsby Project Core Files

#### `gatsby-config.js`

#### `gatsby-node.js`

### Gatsby Starter Deck Files

#### `src/components`

#### `src/layouts`

#### `src/pages`

#### `src/slides`

#### `src/templates`

## Just Enough React

## Just Enough GraphQL