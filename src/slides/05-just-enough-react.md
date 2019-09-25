# Just Enough React

React is a functional-style library (not a framework!) to produce web UIs. At it's core, React converts models (in the form of "state" and "props") to views.

---

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

---

## More React Resources

* [Learn React in 10 Tweets](https://twitter.com/chrisachard/status/1175022111758442497)
* [Gatsby: HTML in our JavaScript?](https://www.gatsbyjs.org/tutorial/part-one/#wait-html-in-our-javascript)
* [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html)
* [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)