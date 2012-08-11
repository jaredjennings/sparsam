enyo.kind({
	name: "SpendHistory",
	kind: "enyo.Scroller",
	classes: "sparsam onyx spend-history",
	published: {
		eid: 0,
	},
	components: [
		{kind: "onyx.Scrim",
		 fit: true,
		 name: "spinner",
		 showing: false,
		 components: [
			{kind: "onyx.Spinner", },
			{tag: "div",
			 fit: "true",
			 content: "Fetching history", }],},
		{kind: "enyo.Repeater",
		 count: 0,
		 onSetupItem: "spendItemSetup",
		 components: [
			{ kind: "SpendHistoryItem", }],
		}],
	spendItemSetup: function(inSender, inEvent) {
		var index = inEvent.index;
		var item = inEvent.item;
		var txn = this.history[index];
		item.$.spendHistoryItem.setDate(txn.date);
		item.$.spendHistoryItem.setAmount(txn.amount);
	},
	eidChanged: function(oldValue) {
		if(this.eid == 0) {
			this.$.repeater.setCount(0);
		} else {
                        var request = new HistoryRequest();
                        request.response(enyo.bind(this, "historyFetched"));
			this.$.spinner.show();
                        request.go({eid: this.getEid()});
		}
	},
	historyFetched: function(inSender, inEvent) {
		this.history = inEvent.history;
		this.$.spinner.hide();
		this.$.repeater.setCount(this.history.length);
	},
})
