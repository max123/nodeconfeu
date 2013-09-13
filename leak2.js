
new Error().stack;
var
vm       = require("vm"),
total    = 1000000,
result   = null;

console.log("STARTING");
process.nextTick(function run() {

  var script = vm.createScript('setInterval(function() {}, 0);', 'test.js');
    var sandbox = { setInterval: setInterval, foo: {leak: "hello leaky world"} };
  script.runInNewContext(sandbox);

  total--;
  if (total) {
/*    process.nextTick(run); */
      setTimeout(function() {
	  var foo = {"bar": "hello world"};
	  run();
      }, 1000);
  } else {
    console.log("COMPLETE");
  }
});
