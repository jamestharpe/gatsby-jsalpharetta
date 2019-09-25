const path = require("path");
const _ = require("lodash");

// Remove trailing slash
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise((resolve, reject) => {
    // Remove trailing slash
    const newPage = Object.assign({}, page, {
      path: page.path === `/` ? page.path : page.path.replace(/\/$/, ``),
    });

    if (newPage.path !== page.path) {
      // Remove the old page
      deletePage(page);
      // Add the new page
      createPage(newPage);
    }

    resolve();
  });
};

// Create pages from markdown nodes
exports.createPages = ({
  actions,
  createContentDigest,
  createNodeId,
  graphql,
}) => {
  const { createPage, createNode } = actions;
  const slideTemplate = path.resolve(`src/templates/slide.js`);

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            html
          }
        }
      }

      allGithubRepositories {
        edges {
          node {
            description
            forkCount
            homepageUrl
            name
            stargazers {
              totalCount
            }
            url
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

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
          fileAbsolutePath: "z" + node.stargazers.totalCount,
        },
      };
    });

    const slides = result.data.allMarkdownRemark.edges.concat(repos);

    console.log("Slides", slides);

    slides.sort((a, b) =>
      a.node.fileAbsolutePath > b.node.fileAbsolutePath ? 1 : -1
    );
    const nodes = slides.flatMap(s =>
      s.node.html.split("<hr>").map(html => ({
        node: s.node,
        html,
      }))
    );

    nodes.forEach(({ node, html }, index) => {
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
    });

    nodes.forEach((slide, index) => {
      createPage({
        path: `/${index + 1}`,
        component: slideTemplate,
        context: {
          index: index + 1,
          // absolutePath: process.cwd() + `/src/slides#${index + 1}`,
        },
      });
    });
  });
};

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Slide implements Node {
      html: String
      index: Int
    }
  `);
};
