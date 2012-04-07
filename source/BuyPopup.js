enyo.kind({
    name: "BuyPopup",
    kind: onyx.Popup,
    modal: true,
    floating: true,
    centered: true,
    autoDismiss: false,
    published: {
        eid: 0,
        title: "",
    },
    components: [
        { name: "title", kind: enyo.Control, 
          tag: "div", content: "" },
        { name: "input", kind: MoneyInput, },
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
    tap: function(inSender, inEvent) {
        var o = inEvent.originator;
        switch(o) {
            case this.$.bOk:
                alert("post!");
                this.hide();
                break;
            case this.$.bCancel:
                alert("cancel");
                this.hide();
                break;
            default:
                // tap was in the input field, or label, or blank area, or
                // outside this popup.
                return false;
                break;
        }
        return true;
    },
})

