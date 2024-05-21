# Canvas Chart - Forextester Assignment for Middle+/Senior Frontend Developer Position

## Getting Started

To run the development server, use the following command:

```bash
  npm run dev
```

## Assignment Notes:

1. The project was created with [Vite](https://vitejs.dev/)
2. To implement chart functionality, I've decided to use the Web Components API. This approach has both benefits and drawbacks.
3. To make the component work, you should pass a string (the "src" of data to display). I've decided to move all functionality of fetching data, error handling, and state management under the hood of the component, but this behavior is not perfect in some cases. However, for now, I'll leave it as it is.
4. Reusability and customization of the component can be achieved by passing a "config" attribute. As an example, I've added the ability to pass a custom error message (you can see it on the screen when running in dev mode).
5. I didn't attempt to make this component 100% production-ready, focusing instead on implementing basic functionality and structure.
6. I didn't create a production build to save time.
