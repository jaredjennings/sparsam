enyo.kind({
    name: "NumberButton",
    kind: onyx.Button,
    classes: ["number-button"],
})

enyo.kind({
    name: "NumberClear",
    kind: NumberButton,
    classes: ["number-button-clear"],
})

enyo.kind({
    name: "NumberDecimalPoint",
    kind: NumberButton,
    classes: ["number-button-decimal-point"],
})

enyo.kind({
    name: "NumberPad",
    kind: enyo.Control,
    tag: "div",
    components: [
        {
            tag: "div",
            kind: enyo.Control,
            components: [
                { kind: NumberButton, content: "7", },
                { kind: NumberButton, content: "8", },
                { kind: NumberButton, content: "9", }
            ],
        },
        {
            tag: "div",
            kind: enyo.Control,
            components: [
                { kind: NumberButton, content: "4",},
                { kind: NumberButton, content: "5",},
                { kind: NumberButton, content: "6",}
            ],
        },
        {
            tag: "div",
            kind: enyo.Control,
            components: [
                { kind: NumberButton, content: "1",},
                { kind: NumberButton, content: "2",},
                { kind: NumberButton, content: "3",}
            ],
        },
        {
            tag: "div",
            kind: enyo.Control,
            components: [
                { kind: NumberButton, content: "0",},
                { kind: NumberDecimalPoint, content: ".",},
                { kind: NumberClear, content: "C", }
            ],
        },

    ],
})


