enyo.kind({
	name: "SpendHistory",
	kind: "enyo.Scroller",
	classes: "sparsam onyx spend-history",
	published: {
		eid: 0,
	},
	components: [
		{kind: "enyo.Repeater",
		 count: 0,
		 onSetupItem: "spendItemSetup",
		 components: [
			{ kind: "SpendHistoryItem", }],
		}],
	spendItemSetup: function(inSender, inEvent) {
		var index = inEvent.index;
		var item = inEvent.item;
		var txn = this.txns[index];
		item.$.spendHistoryItem.setDate(txn.date);
		item.$.spendHistoryItem.setAmount(txn.amount);
	},
	eidChanged: function(oldValue) {
		alert("eid is " + this.eid);
		if(this.eid == 0) {
			this.$.repeater.setCount(0);
		} else {
			this.$.repeater.setCount(this.txns.length);
		}
	},
	txns: [
		{date: "12 Dec", amount: 4714},
		{date: "13 Dec", amount: 82221},
		{date: "15 Dec", amount: 233},
		{date: "16 Dec", amount: 4714},
		{date: "17 Dec", amount: 82221},
		{date: "19 Dec", amount: 233},
		{date: "20 Dec", amount: 4714},
		{date: "21 Dec", amount: 82221},
		{date: "23 Dec", amount: 233},
		{date: "24 Dec", amount: 4714},
		{date: "25 Dec", amount: 82221},
		{date: "27 Dec", amount: 233},
		{date: "28 Dec", amount: 4714},
		{date: "29 Dec", amount: 82221},
		{date: "31 Dec", amount: 233},
		{date: "32 Dec", amount: 4714},
		{date: "33 Dec", amount: 82221},
		{date: "35 Dec", amount: 233},
		{date: "36 Dec", amount: 4714},
		{date: "37 Dec", amount: 82221},
		{date: "39 Dec", amount: 233},
		{date: "40 Dec", amount: 4714},
		{date: "41 Dec", amount: 82221},
		{date: "43 Dec", amount: 233}
	],
})
