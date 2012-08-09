enyo.kind({
    name: "Envelopes",
    kind: "enyo.FittableRows",
    classes: "onyx envelopes",
    envelopesById: {},
    components: [
        { kind: "onyx.Toolbar",
          classes: "sparsam-title",
          content: "Envelopes", },
        { kind: "enyo.Scroller", components: [
            { kind: "enyo.Repeater",
              count: 0,
              onSetupItem: "envelopeSetup",
              components: [{ name: "envelope", kind: "Envelope", }],}],}],
    create: function() {
        this.inherited(arguments);
        // (show spinner)
        this.fetch();
    },
    fetch: function() {
        var request = new enyo.Ajax({
            method: "GET",
            url: "/sparsam/wsgi/envelopes",
            callbackName: "callback"
        });
        request.response(enyo.bind(this, "answerReady"));
        request.go();
    },
    answerReady: function(inRequest, inResponse) {
        this.envelopeInfo = inResponse['envelopes'];
        this.$.repeater.setCount(Object.keys(this.envelopeInfo).length);
        // (hide spinner)
    },
    envelopeSetup: function(inSender, inEvent) {
        var index = inEvent.index;
        var item = inEvent.item;
        var e = this.envelopeInfo[index];
        item.$.envelope.setFromObject(e);
        return true;
    },
    refetch: function(eid) {
        this.envelopesById[eid].refetch();
    },
});
