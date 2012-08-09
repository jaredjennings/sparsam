enyo.kind({
	name: "SpendHistoryColumn",
	kind: "FittableRows",
	fit: true,
	showing: false,
	events: {
		onBackFromSpendHistoryColumn: "",
	},
	components: [
		{ kind: "onyx.Toolbar", 
		  name: "name",
		  classes: "spend-history-envelope-name sparsam-title",
		  content: "unset", },
		{ kind: "SpendNow", },
		{ kind: "SpendHistory", fit: true, },
		{ kind: "onyx.Toolbar", components: [
			{ name: "back", kind: "onyx.Button", content: "back",
			  ontap: "backTapped", }
		]},
	],
	fetch: function(eid, ename) {
		this.$.name.setContent(ename);
	},
	backTapped: function(inSender, inEvent) {
		this.doBackFromSpendHistoryColumn();
	},
})
