export let pubSub = (function () {
    var messages: any = {},
      hasOwnProp = Object.prototype.hasOwnProperty;
  
    function listen(message: any, listenerFn: any) {
      if (!hasOwnProp.call(messages, message)) {
        messages[message] = [];
      }
      messages[message].push(listenerFn);
    }
  
    function trigger(message: any, data: any) {
      if (!messages[message]) {
        return;
      }
      messages[message].forEach(function (listner: any) {
        listner(data);
      });
    }
  
    return {
      publish: trigger,
      subscribe: listen,
    };
  })();