function Click() {
    this.observers = [];
}

Click.prototype = {
    subscribe: function (fn) {
        this.observers.push(fn);
    },

    unsubscribe: function (fn) {
        this.observers = this.observers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    fire: function (o, thisObj) {
        var scope = thisObj || window;
        this.observers.forEach(function (item) {
            item.call(scope, o);
        });
    }
}

function run() {
    var clickHandler = function (item) {
        document.getElementById("output").value = item;
        console.log("fired: " + item);
    };

    var click = new Click();

    var text = document.getElementById("input").value;

    click.subscribe(clickHandler);
    click.fire(text);

    // Test 

    click.unsubscribe(clickHandler);
    click.fire("Event not to be fired");
}