enyo.kind({
    name: "Envelopes",
    kind: enyo.Control,
    envelopesById: {},
    components: [
        { name: "wait", kind: onyx.Scrim,
          showing: false,
          style: "text-align: center",
          components: [
            { kind: onyx.Spinner, classes: "onyx-light", }
          ],
        },
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
        this.$.wait.show();
        this.$.spinner.show();
        this.render();
        var request = new enyo.Ajax({
            method: "GET",
            url: "/sparsam/wsgi/envelopes",
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
        this.$.spinner.hide();
        this.$.wait.hide();
        this.render();
    },
    refetch: function(eid) {
        this.envelopesById[eid].refetch();
    }
});
