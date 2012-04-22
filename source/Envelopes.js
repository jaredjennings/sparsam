enyo.kind({
    name: "Envelopes",
    kind: enyo.Control,
    envelopesById: {},
    components: [
        { name: "popup", kind: BuyPopup,
        },
        { name: "pleaseWait", kind: onyx.ProgressBar,
          showStripes: true, animateStripes: true,
          progress: 100,
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
        this.$.pleaseWait.show();
        this.render();
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
        this.envelopesById = {}
        for (id in inResponse) {
            var env = inResponse[id];
            this.envelopesById[id] = this.createComponent(
                { kind: Envelope,
                  eid: id,
                  capacity: env['limit_cents'],
                  spent: env['cents'],
                  ename: env['name'],
                });
        }
        this.$.pleaseWait.hide();
        this.render();
    },
    refetch: function(eid) {
        this.envelopesById[eid].refetch();
    }
});
