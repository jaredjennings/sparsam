enyo.kind({
    name: "SparsamApp",
    kind: "FittableRows",
    fit: true,
    classes: ["onyx enyo-fit"],
    components: [
        { kind: "Panels",
          fit: true,
          wrap: false, // I have found no documentation for what this is
          classes: "sparsam-sliding-panels",
          arrangerKind: "CollapsingArranger",
          components: [
              { kind: "Envelopes" },
              { kind: "SpendHistoryColumn" }],}],
    rendered: function() {
        this.inherited(arguments);
        this.$.envelopes.fetch();
    }
    handlers: {
        onEnvelopeSelected: "onEnvelopeSelected",
        onBackFromSpendHistoryColumn: "onBackFromSpendHistoryColumn",
    },
    onEnvelopeSelected: function(inSender, inEvent) {
        this.$.spendHistoryColumn.fetch(inEvent.eid, inEvent.name);
        this.$.spendHistoryColumn.show();
        this.$.panels.setIndex(1);
        // this messes up the whole alignment, in Chromium. Why?
        //this.$.spendHistoryColumn.$.spendNow.$.amount.focus();
    },
    onBackFromSpendHistoryColumn: function(inSender, inEvent) {
        this.$.panels.setIndex(0);
    },
});
