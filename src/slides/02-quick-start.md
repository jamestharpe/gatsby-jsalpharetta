# Quick Start

---

## Software You Need

### MacOS-specific:

```bash
xcode-select --install
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
brew install git
```

---

### Windows-specific:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
choco install nodejs
choco install git.install
```

---

### The Good Stuff

```bash
npm install -g gatsby-cli
gatsby new my-gatsby-site https://github.com/fabe/gatsby-starter-deck
cd my-gatsby-site
gatsby develop
```

---

### You're Ready!

Open [localhost:8000](http://localhost:8000/) and Voilà!

---

### Make a Change

* Edit `src/slides/02-quick-start.md`
* Experience the magic of hot reload!

---

### About Starters

Starters are boilerplate Gatsby sites.

* [Starters Documentation](https://www.gatsbyjs.org/docs/starters/)
* [List of Commuity-Provided Starters](https://www.gatsbyjs.org/starters/)