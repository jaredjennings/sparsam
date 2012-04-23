enyo.kind({
    name: "BuyPopup",
    kind: onyx.Popup,
    modal: true,
    floating: true,
    centered: true,
    autoDismiss: false,
    classes: "buy-popup",
    published: {
        eid: 0,
        title: "",
    },
    components: [
        { name: "title", kind: enyo.Control, 
          tag: "div", content: "" },
        { name: "input", kind: onyx.Input,
          type: "number", },
        { tag: "div", style: "text-align: center;",
          components: [
            { name: "bOk", kind: onyx.Button,
              content: "Post",
              classes: "buy-popup-button onyx-affirmative", },
            { name: "bCancel", kind: onyx.Button,
              content: "Cancel",
              classes: "buy-popup-button onyx-negative", },
        ],},
    ],
    titleChanged: function(inOld) {
        this.$.title.setContent(this.title);
    },
    create: function() {
        this.inherited(arguments);
        this.titleChanged();
    },
    setShowing: function(inShowing) {
        this.inherited(arguments);
        if(inShowing) {
            this.$.input.setValue("");
            this.$.input.focus();
        }
    },
    tap: function(inSender, inEvent) {
        var o = inEvent.originator;
        switch(o) {
            case this.$.bOk:
                var request = new enyo.Ajax({
                    method: "POST",
                    url: "/sparsam/cgi/backend.cgi/spend",
                    callbackName: "callback"
                });
                request.response(enyo.bind(this, "showResponse"));
                this.$.bOk.setDisabled(true);
                request.go({
                    cents: Math.floor(parseFloat(this.$.input.getValue()) * 100),
                    eid: this.getEid(),
                });
                return true;
                break;
            case this.$.bCancel:
                this.hide();
                return true;
                break;
            default:
                // tap was in the input field, or label, or blank area, or
                // outside this popup.
                return false;
                break;
        }
        return true;
    },
    showResponse: function(inRequest, inResponse) {
        if(!inResponse) return;
        this.$.bOk.setDisabled(false);
        this.owner.refetch(this.eid);
        this.hide();
    },
})


