It's a web-based virtual envelope system for your money. Allocate money to
virtual envelopes, and when you spend it, say which envelope it came out of.
When you run out of money in an envelope for this month, stop spending money on
the category to which the envelope is dedicated.

There are several apps and websites where you can do this already. But I want
the information about my money on my own server, not someone else's.

Subdirectories:
- source: The Enyo app which shows in the browser. It talks JSON over HTTPS with...
- backend: The web app that mediates between the interface and the database.
- pythonhome: The Python virtualenv under which backend runs.
