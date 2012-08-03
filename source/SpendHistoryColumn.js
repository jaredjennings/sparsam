enyo.kind({
	name: "SpendHistoryColumn",
	kind: "FittableRows",
	fit: true,
	showing: false,
	events: {
		onBackFromSpendHistoryColumn: "",
	},
	components: [
		{ kind: "onyx.Toolbar", classes: "sparsam-title",
		  components: [
			{ name: "name", classes: "spend-history-envelope-name",
			  content: "unset" },
		]},
		{ kind: "SpendNow", },
		{ kind: "SpendHistory", fit: true, },
		{ kind: "onyx.Toolbar", components: [
			{ name: "back", kind: "onyx.Button", content: "back",
			  ontap: "backTapped", }
		]},
	],
	fetch: function(eid, name) {
		this.$.name.setContent(name);
	},
	backTapped: function(inSender, inEvent) {
		this.doBackFromSpendHistoryColumn();
	},
})
