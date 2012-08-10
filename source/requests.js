enyo.kind({
    name: "EnvelopeFetch",
    kind: "enyo.Ajax",
    method: "GET",
    url: "/sparsam/wsgi/envelope",
})

enyo.kind({
    name: "EnvelopesFetch",
    kind: "enyo.Ajax",
    method: "GET",
    url: "/sparsam/wsgi/envelopes",
})
