enyo.kind({
	name: "SpendHistoryColumn",
	kind: "FittableRows",
	fit: true,
	events: {
		onBackFromSpendHistoryColumn: "",
	},
        handlers: {
		onSpendPosted: "spendPosted",
	},
	published: {
		eid: 0,
		ename: "",
	},
	components: [
		{ kind: "onyx.Toolbar", 
		  name: "name",
		  classes: "spend-history-envelope-name sparsam-title",
		  content: "", },
		{ kind: "SpendNow", },
		{ kind: "SpendHistory", fit: true, },
		{ kind: "onyx.Toolbar", components: [
			{ name: "back", kind: "onyx.Button", content: "back",
			  ontap: "backTapped", }
		]},
	],
	eidChanged: function(oldValue) {
		this.$.spendNow.setEid(this.eid);
                alert('setting spendHistory eid to ' + this.eid);
		this.$.spendHistory.setEid(this.eid);
                alert('spendHistory eid is now ' + this.$.spendHistory.getEid());
	},
	enameChanged: function(oldValue) {
		this.$.name.setContent(this.ename);
	},
	backTapped: function(inSender, inEvent) {
		this.doBackFromSpendHistoryColumn();
	},
        spendPosted: function(inSender, inEvent) {
		this.doBackFromSpendHistoryColumn();
		this.$.spendNow.setEid(0);
		this.setEname("");
	},
})
