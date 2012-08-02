enyo.kind({
    name: "SparsamApp",
    kind: enyo.Scroller,
    classes: ["onyx enyo-fit"],
    components: [
        { name: "envelopes", kind: Envelopes,
        },
    ],
    rendered: function() {
        this.inherited(arguments);
        this.$.envelopes.fetch();
    }
});
