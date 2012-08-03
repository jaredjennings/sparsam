enyo.kind({
	name: "SpendNow",
	kind: "onyx.Toolbar",
	components: [
		{ kind: "onyx.Button", content: "X",
		  classes: "onyx-negative", ontap: "clear", },
		{ kind: "onyx.InputDecorator", components: [
			{ content: "$", classes: "enyo-input onyx-input" },
			{ kind: "onyx.Input", name: "amount",
			  classes: "spend-now-input",
			}],},
		{ kind: "onyx.Button", content: "$",
		  classes: "onyx-affirmative", ontap: "spend", },
	],
	clear: function(inSender, inEvent) {
		this.$.amount.setValue("");
	},
	spend: function(inSender, inEvent) {
		alert("Spending " + this.$.amount.getValue());
		this.clear();
	},
})


