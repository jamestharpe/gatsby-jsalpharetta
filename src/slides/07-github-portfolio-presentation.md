# Build a Portfolio Presentation from GitHub

---

## Develop the GitHub Query

Go to the [GitHub GraphQL Explorer](https://developer.github.com/v4/explorer/) and tweak your query.

---

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

---

## Install the `gatsby-source-github` plug-in

```bash
npm install gatsby-source-github --save-dev
```

---

## Configure it in `gatsby-config.js`:

```javascript
{
  resolve: 'gatsby-source-github',
  options: {
    headers: {
      Authorization: `Bearer ...`, // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
    },
    queries: [
      `{ 
        user(login: "jamestharpe") {
          repositories(first: 5, orderBy: { field: STARGAZERS, direction: DESC}) {
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
      }`,
    ],
  },
}
```

---

Generate pages in `gatsby-node.js`

```javascript
const repos = result.data.allGithubRepositories.edges.map(({ node }) => {
  return {
    node: {
      html: `
        <h2>${node.name} (${node.forkCount} forks, ${node.stargazers.totalCount} stars)</h2>
        <p>${node.description}</p>
        <p>
          <a href="${node.url}" target="_blank>Lear more!</a>
        </p>
      `,
      fileAbsolutePath: node.stargazers.totalCount,
    },
  };
});

const slides = result.data.allMarkdownRemark.edges.concat(repos);
```

---

## Magic!