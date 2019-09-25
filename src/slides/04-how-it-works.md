# How it All Works

---

## `gatsby develop|build`

1. Gatsby reads `gatsby-config.js` and initializes the plug-ins.
2. Gatsby calls the functions exported from `gastby-node.js`
3. `exports.createPages` queries the markdown in `src/slides`
4. For each markdown file, we:
   1. Create nodes for each slide with `createNode`. [Nodes](https://www.gatsbyjs.org/docs/node-interface/) are how data is modeled in Gatsby. This will make querying "slides" (rather than markdowns) easier later.
   2. Create pages for each slide with `createPage`. The `component` property tells Gatsby which _template_ to use to render the page, in this case `src/templates/slide.js`.
5. `exports.sourceNodes` creates the [GraphQL schema](https://graphql.org/learn/schema/) for our Slide objects.

--- 

### When a Page is Created

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

---

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
```

---

```jsx
// From src/templates/slide.js (continued)
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

---

## Related Resources

* [Inferring Input Filters](https://www.gatsbyjs.org/docs/schema-input-gql/)