enyo.kind({
    name: "EnvelopeFetch",
    kind: "enyo.Ajax",
    method: "GET",
    url: "https://np4.agrue.info/sparsam-dev/wsgi/envelope",
})




enyo.kind({
    name: "EnvelopesFetch",
    kind: "enyo.Ajax",
    method: "GET",
    url: "https://np4.agrue.info/sparsam-dev/wsgi/envelopes",
})


enyo.kind({
    name: "SpendRequest",
    kind: "enyo.Ajax",
    method: "POST",
    url: "https://np4.agrue.info/sparsam-dev/wsgi/spend",
})
    

enyo.kind({
    name: "HistoryRequest",
    kind: "enyo.Ajax",
    method: "POST",
    url: "https://np4.agrue.info/sparsam-dev/wsgi/history",
})
