enyo.kind({
    name: "Envelopes",
    kind: enyo.Control,
    components: [
        { name: "popup", kind: BuyPopup,
        },
    ],
    tap: function(inSender, inEvent) {
        if(inSender.kindName == "Envelope") {
            this.$.popup.setEid(inSender.getEid());
            this.$.popup.setTitle("Pulling money out of " + 
                                  inSender.getEname());
        }
        this.$.popup.show();
    },
});
