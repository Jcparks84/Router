requirejs(["./form", "./route", "./pubsub"], function App() {
  Form();
  Route();

  pubSub.subscribe("routes", (r) => {
    Route(r);
    Form(r);
  });
})();
