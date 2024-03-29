# gatsby-jsalpharetta

Presentation and Demo Project for https://www.meetup.com/JavaScriptAlpharetta/events/265017002/

## Overview

![Gatsby Process Flow](src/slides/2-gatsby-process-flow.png)

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

![Gatsby Deck](src/slides/1-gatsby-deck.png)

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

**Full Documentation:** [Gatsby Config API Docs](https://www.gatsbyjs.org/docs/gatsby-config/) and [Data in Gatsby Tutorial](https://www.gatsbyjs.org/tutorial/part-four/#data-in-gatsby)

##### `siteMetadata`

Common bits of data to be reused accross the site.

Example use:

```jsx
<Helmet
  title={`${site.siteMetadata.title} — {site.siteMetadata.name}`}
/>
```

> [Helmet](https://github.com/nfl/react-helmet) makes it easy to control content in the `<head>`

##### `plugins`

[Plugins](https://www.gatsbyjs.org/docs/plugins/) are NodeJS packages that implement [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/). Plugins can extend and modify virtually everything Gatsby does.

Typical usecases for plugins:

* Make external data or content available via GraphQL (files, databases, you-name-it)
* Transform data from various formats to JSON objects
* Inject third-party services (e.g. Google Analytics)

##### More

* [`polyfill`](https://www.gatsbyjs.org/docs/gatsby-config/#polyfill) - Exclude the default Promise polyfill.
* [`mapping`](https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types) - Create foreign-key-like relationships between data sources
* [`proxy`](https://www.gatsbyjs.org/docs/gatsby-config/#proxy) - proxy unknown requests to the develop to a specified server

#### `gatsby-node.js`

Gatsby's "entry point" into generating your application. Export [Gatsby function](https://www.gatsbyjs.org/docs/node-apis/) implementations to generate your app.

### Project Structure

* `src/components` _conventionally_ keeps our React components.
* `src/pages` keeps the pre-defined pages of our app. Gatsby auto-generates a page per `js` file. Additional pages can be created using data and tempaltes.
* `src/layouts` _conventionally_ keeps our layout React components. [Layouts](https://www.gatsbyjs.org/tutorial/part-three/) are just React components that wrap other React components with common elements (e.g. header, footer, etc). Most folks keep their layouts in the `src/components` folder (as recommended), but this is necessary for [`gatsby-plugin-layout`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout) support.
* `src/slides` _project specific_ content to define our slides - this becomes queryable data thanks to the `gatsby-source-filesystem` and `gatsby-transformer-remark` plug-ins.
* `src/templates`

#### Layouts vs. Templates

Template components are for page types e.g. blog posts, slides, products. Layout components are for components shared _across_ pages e.g. headers, footers, sidebars, etc.

_Generally_ templates use layouts, but layouts don't use templates.

## How it All Works

### `gatsby develop|build`

1. Gatsby reads `gatsby-config.js` and initializes the plug-ins.
2. Gatsby calls the functions exported from `gastby-node.js`
3. `exports.createPages` queries the markdown in `src/slides`
4. For each markdown file, we:
   1. Create nodes for each slide with `createNode`. [Nodes](https://www.gatsbyjs.org/docs/node-interface/) are how data is modeled in Gatsby. This will make querying "slides" (rather than markdowns) easier later.
   2. Create pages for each slide with `createPage`. The `component` property tells Gatsby which _template_ to use to render the page, in this case `src/templates/slide.js`.
5. `exports.sourceNodes` creates the [GraphQL schema](https://graphql.org/learn/schema/) for our Slide objects.

#### When a Page is Created

```javascript
// From gatsby-node.js
createPage({
  path: `/${index + 1}`, // the path to the page
  component: slideTemplate, // template to use
  context: { // passed to props.pageContext
    index: index + 1 // Used to query the slide
  },
});
```

```jsx
// From src/templates/slide.js
export default ({ data, transition }) => (
  <div style={{'width': '100%'}}>
    <div
      style={transition && transition.style}
      dangerouslySetInnerHTML={{ __html: data.slide.html }}
    />
  </div>
);

export const query = graphql`
  # $index is populated by context in the createPage call
  query SlideQuery($index: Int!) {
    # SlideQuery was defined in our sourceNodes function in gatsby-node.js ('type Slide...')

    # Populate the "slide" property of the "data" property of props
    slide(index: { eq: $index }) {
      html
      index
    }
  }
`;
```

More resources:

* [Inferring Input Filters](https://www.gatsbyjs.org/docs/schema-input-gql/)

## Just Enough React

React is a functional-style library (not a framework!) to produce web UIs. At it's core, React converts models (in the form of "state" and "props") to views.

Let's revisit part of the slide template:

```jsx
// From src/templates/slide.js

// A function that takes in props...
export default ({ data, transition }) => (
  // And returns a vew for those props
  <div style={{'width': '100%'}}>
    <div
      style={transition && transition.style}
      dangerouslySetInnerHTML={{ __html: data.slide.html }}
    />
  </div>
);
```

More resources:

* [Learn React in 10 Tweets](https://twitter.com/chrisachard/status/1175022111758442497)
* [Gatsby: HTML in our JavaScript?](https://www.gatsbyjs.org/tutorial/part-one/#wait-html-in-our-javascript)
* [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html)
* [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

## Just Enough GraphQL

A GraphQL service definines types, then provides functions to resolve each field on each type. In Gatsby,plug-ins define "nodes", which Gatsby can resolve in-memory, or [custom resolvers](https://www.gatsbyjs.org/docs/node-apis/#createResolvers) for more advanced use cases.

We defined our type in `gatsby-node.js`:

```graphql
  type Slide implements Node {
    html: String
    index: Int
  }
```

And loaded them into memory by calling `createNode` in `gatsby-node.js`:

```javascript
  createNode({
    id: createNodeId(`${node.id}_${index + 1} >>> Slide`),
    parent: node.id,
    children: [],
    internal: {
      type: `Slide`,
      contentDigest: createContentDigest(html),
    },
    html: html,
    index: index + 1,
  });
```

We can then query the data in a way very similar to SQL:

```javascript
// Query
allSlide {
  edges { node { id, html, index } }
}
site {
  siteMetadata {
    date
    name
    title
  }
}

// Output
{
  "data": {
    "allSlide": {
      "edges": [
        {
          "node": {
            "index": 1,
            "html": "..."
          }
        },
        // ...
      ]
    },
    "site": {
      "siteMetadata": {
        "date": "September 25, 2019",
        "name": "James Tharpe",
        "title": "JavaScript Alpharetta - Gatsby"
      }
    }
  }
}
```

```javascript
// Query
allSlide(filter: {index: {eq: 3}}) {
  edges {
    node {
      html
      index
    }
  }
}

// Output
{
  "data": {
    "allSlide": {
      "edges": [
        {
          "node": {
            "html": "\n<h1>🤫</h1>\n",
            "index": 3
          }
        }
      ]
    }
  }
}
```

More resources:

* [Introduction to GraphQL](https://graphql.org/learn/)
* [How to GraphQL](https://www.howtographql.com/)
* [Gatsby GraphQL Concepts](https://www.gatsbyjs.org/docs/graphql-concepts/)

### The GraphiQL Explorer

![GraphiQL](src/slides/3-graphiql.png)

## Build a Portfolio Presentation from GitHub

### Develop the Query

Go to the [GitHub GraphQL Explorer](https://developer.github.com/v4/explorer/) and tweak your query.

Here's mine:

```graphql
query { 
  user(login: "jamestharpe") {
    repositories(first: 10, orderBy: { field: STARGAZERS, direction: DESC}) {
      edges {
        node {
          description
          name
          forkCount
          homepageUrl
          stargazers { totalCount }
        }
      }
    }
  }
}
```

Next, install the `gatsby-source-github` plug-in:

```bash
npm install gatsby-source-github --save-dev
```