enyo.kind({
    name: "Envelope",
    kind: "enyo.Control",
    classes: "envelope-progress envelope",
    events: {
        onEnvelopeSelected: "",
    },
    published: {
        eid: 0,
        ename: "",
        capacity: 0,
        spent: 0,
        nearlyFull: 0.9,
    },
    setFromObject: function(obj) {
        this.setEid(obj.eid);
        this.setEname(obj.name);
        this.setCapacity(obj.limit_cents);
        this.setSpent(obj.cents);
    },
    components: [
        { name: "bar", kind: "onyx.ProgressButton",
          showStripes: false, animateStripes: false,
          components: [
              { name: "spenttext", kind: enyo.Control,
                content: "",
                classes: ["envelope-spentamount"],
              },
              { name: "enametext", kind: enyo.Control,
                content: "",
                classes: ["envelope-name"],
              },
              { name: "capacitytext", kind: enyo.Control,
                content: "",
                classes: ["envelope-capacity"],
              }
          ],
        }
    ],
    enameChanged: function(inOld) {
        this.$.enametext.setContent(this.ename);
    },
    capacityChanged: function(inOld) {
        this.$.bar.setMax(this.capacity);
        this._remainingChanged();
    },
    spentChanged: function(inOld) {
        this.$.bar.animateProgressTo(this.spent);
        this.$.spenttext.setContent("$" + Math.round(this.spent / 100));
        var ratio = this.spent / this.capacity;
        if(ratio > 1.0) {
            this.addClass('envelope-spent');
        } else if(ratio > this.nearlyFull) {
            this.addClass('envelope-nearly-spent');
        } else {
            this.removeClass('envelope-spent');
            this.removeClass('envelope-nearly-spent');
        }
        this._remainingChanged();
    },
    _remainingChanged: function() {
        var toShow = this.capacity - this.spent;
        var left = "left";
        if(toShow < 0) {
            // show "over" instead of negative "left"
            toShow = -toShow;
            left = "over";
        }
        var dollars = Math.round(toShow / 100);
        var text = "$" + dollars + " " + left;
        this.$.capacitytext.setContent(text);
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
            url: "/sparsam/wsgi/envelope",
        });
        request.response(enyo.bind(this, "refetched"));
        request.go({ eid: this.eid });
    },
    refetched: function(inRequest, inResponse) {
        if(!inResponse) return;
        this.setCapacity(inResponse['limit_cents']);
        this.setSpent(inResponse['cents']);
    },
    tap: function(inSender, inEvent) {
        this.doEnvelopeSelected({ eid: this.getEid(), ename: this.getEname() });
        return true;
    },
})


