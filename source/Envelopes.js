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
    fetch: function() {
        var request = new enyo.Ajax({
            method: "GET",
            url: "/sparsam/cgi/backend.cgi/envelopes",
            callbackName: "callback"
        });
        request.response(enyo.bind(this, "populate"));
        request.go();
    },
    populate: function(inRequest, inResponse) {
        if(!inResponse) return;
        for (id in inResponse) {
            var env = inResponse[id];
            this.createComponent(
                { kind: Envelope,
                  eid: id,
                  capacity: env['limit_cents'] / 100.0,
                  spent: env['cents'],
                  ename: env['name'],
                });
        }
        this.render();
    },
});
