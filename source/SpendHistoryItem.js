enyo.kind({
	name: "SpendHistoryItem",
	kind: "enyo.Control",
	classes: "spend-history-item",
	published: {
		amount: 0,
		date: "",
	},
	components: [
		{tag: "span", name: "date", classes: "spend-history-item-date"},
		{tag: "span", name: "amount", classes: "spend-history-item-amount"}],
	amountChanged: function(oldValue) {
		this.$.amount.setContent(this.amount);
	},
	dateChanged: function(oldValue) {
		this.$.date.setContent(this.date);
	},
})

