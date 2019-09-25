# Build a Portfolio Presentation from GitHub

---

## Develop the Query

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

Next, install the `gatsby-source-github` plug-in:

```bash
npm install gatsby-source-github --save-dev
```