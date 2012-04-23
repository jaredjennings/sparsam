enyo.kind({
    name: "MoneyInput",
    kind: enyo.Control,
    tag: "div",
    components: [
        { name: "input", kind: onyx.Input,
          type: "number",
          classes: ["money-value"], },
    ],
    published: {
        numericValue: 0.0,
        decimalPointTyped: false,
    },
    create: function() {
        this.inherited(arguments);
        this.numericValueChanged();
    },
    addDigit: function(digit) {
        var d = parseInt(digit);
        var v = this.getNumericValue();
        if(this.decimalPointTyped) {
            var dollars = Math.floor(v);
            var cents = (v - dollars) * 100.0;
            cents = cents * 10.0 + d;
            if(cents > 100) {
                // strip off first digit of cents
                var hundredcents = Math.floor(cents / 100.0);
                cents -= 100 * hundredcents;
            }
            this.setNumericValue(dollars + (cents / 100.0));
        } else {
            this.setNumericValue(v * 10.0 + (d / 100.0));
        }
    },
    addDecimalPoint: function(inSource, inEvent) {
        this.setDecimalPointTyped(true);
        this.setNumericValue(this.getNumericValue() * 100.0);
    },
    numericValueChanged: function(inOldValue) {
        this.$.input.setValue(this.numericValue.toFixed(2));
    },
    zero: function() {
        this.setNumericValue(0.0);
        this.setDecimalPointTyped(false);
    },
})
