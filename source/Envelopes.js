enyo.kind({
    name: "Envelopes",
    kind: "enyo.FittableRows",
    classes: "onyx envelopes",
    envelopesById: {},
    handlers: {
	onSpendPosted: "onSpendPosted", },
    components: [
        { kind: "onyx.Toolbar",
          classes: "sparsam-title",
          content: "Envelopes", },
        { kind: "enyo.Scroller",
	  fit: true,
	  classes: "sparsam",
	  components: [
            { kind: "onyx.Scrim",
              showing: false,
              name: "spinner",
              components: [
                { kind: "onyx.Spinner", },
                { tag: "div", content: "Fetching envelopes", }],},
            { kind: "enyo.Repeater",
              count: 0,
              onSetupItem: "envelopeSetup",
              components: [{ name: "envelope", kind: "Envelope", }],}],},
	{ kind: "onyx.Toolbar", }],
    create: function() {
        this.inherited(arguments);
        this.fetch();
    },
    fetch: function() {
        var request = new EnvelopesFetch();
        request.response(enyo.bind(this, "answerReady"));
        this.$.spinner.show();
        request.go();
    },
    answerReady: function(inRequest, inResponse) {
        this.envelopeInfo = inResponse['envelopes'];
        this.$.repeater.setCount(Object.keys(this.envelopeInfo).length);
        this.$.spinner.hide();
    },
    envelopeSetup: function(inSender, inEvent) {
        var index = inEvent.index;
        var item = inEvent.item;
        var e = this.envelopeInfo[index];
        item.$.envelope.setFromObject(e);
	this.envelopesById[e.eid] = item.$.envelope;
        return true;
    },
    onSpendPosted: function(inSender, inEvent) {
        this.envelopesById[inEvent.eid].refetch();
        return false;
    },
});
