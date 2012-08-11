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
    handlers: {
        onEnvelopeSelected: "onEnvelopeSelected",
        onBackFromSpendHistoryColumn: "onBackFromSpendHistoryColumn", },
    onEnvelopeSelected: function(inSender, inEvent) {
	// empty spend history, and guarantee refetch in next statement
        this.$.spendHistoryColumn.setEid(0);
        this.$.spendHistoryColumn.setEid(inEvent.eid);
        this.$.spendHistoryColumn.setEname(inEvent.ename);
        this.$.spendHistoryColumn.show();
        this.$.panels.setIndex(1);
        // this messes up the whole alignment, in Chromium. Why?
        this.$.spendHistoryColumn.$.spendNow.$.amount.focus();
    },
    onBackFromSpendHistoryColumn: function(inSender, inEvent) {
        this.$.panels.setIndex(0);
    },
});
