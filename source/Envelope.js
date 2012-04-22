enyo.kind({
    name: "Envelope",
    kind: enyo.Control,
    classes: ["envelope-progress"],
    published: {
        eid: 0,
        ename: "",
        capacity: 0,
        spent: 0,
    },
    components: [
        { name: "bar", kind: onyx.ProgressButton,
          showStripes: false, animateStripes: false,
          components: [
              { name: "enametext", kind: enyo.Control,
                content: "",
                classes: ["envelope-name"],
              }
          ],
        }
    ],
    enameChanged: function(inOld) {
        this.$.enametext.setContent(this.ename);
    },
    capacityChanged: function(inOld) {
        this.$.bar.setMax(this.capacity);
    },
    spentChanged: function(inOld) {
        this.$.bar.animateProgressTo(this.spent);
    },
    create: function() {
        this.inherited(arguments);
        this.enameChanged();
        this.capacityChanged();
        this.spentChanged();
    },
    refetch: function() {
        var request = new enyo.Ajax({
            method: "GET",
            url: "/sparsam/cgi/backend.cgi/envelope",
        });
        request.response(enyo.bind(this, "refetched"));
        request.go({ eid: this.eid });
    },
    refetched: function(inRequest, inResponse) {
        if(!inResponse) return;
        this.setCapacity(inResponse['limit_cents']);
        this.setSpent(inResponse['cents']);
    },
})


