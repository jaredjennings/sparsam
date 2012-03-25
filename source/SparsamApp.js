enyo.kind({
    name: "SparsamApp",
    kind: enyo.Control,
    classes: ["onyx"],
    components: [
        { name: "envelopes", kind: Envelopes,
        },
    ],
});
