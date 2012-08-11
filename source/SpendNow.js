enyo.kind({
	name: "SpendNow",
	kind: "onyx.Toolbar",
	published: {
		eid: 0,
	},
	events: {
		onSpendPosted: "",
	},
	components: [
		{ kind: "onyx.Button", content: "X",
		  classes: "onyx-negative", ontap: "clear", },
		{ kind: "onyx.InputDecorator", components: [
			{ content: "$", classes: "enyo-input onyx-input" },
			{ kind: "onyx.Input", name: "amount",
			  classes: "spend-now-input",
			}],},
		{ kind: "onyx.Button", name: "bSpend", content: "$",
		  classes: "onyx-affirmative", ontap: "spend", },
		{ kind: "onyx.Spinner", showing: false },
	],
	clear: function(inSender, inEvent) {
		this.$.amount.setValue("");
		return true;
	},
	spend: function(inSender, inEvent) {
		var cents = Math.floor(
			parseFloat(this.$.amount.getValue()) * 100);
		var request = new SpendRequest();
		request.response(enyo.bind(this, "spent"));
		this.$.bSpend.setDisabled(true);
		this.$.spinner.show();
		this.clear();
		request.go({
			cents: cents,
			eid: this.getEid(),
		});
		return true;
	},
	spent: function(inRequest, inResponse) {
		// don't know quite what this line does
		if(!inResponse) return;
		this.$.bSpend.setDisabled(false);
		this.$.spinner.hide();
		this.doSpendPosted({eid: this.getEid()});
	},
})
