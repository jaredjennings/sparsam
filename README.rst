What is it?
-----------

It's a web-based virtual envelope system for your money. Allocate money to
virtual envelopes, and when you spend it, say which envelope it came out of.
When you run out of money in an envelope for this month, stop spending money on
the category to which the envelope is dedicated.

There are several apps and websites where you can do this already. But I want
the information about my money on my own server, not someone else's.


How does it work?
-----------------

A backend web app keeps an SQLite database with the details of your
expenditures. You interact with this backend via a frontend written with Enyo
2, from your desktop browser or your phone or tablet or what-have-you.
(Theoretically the frontend could be an app you get from an app store, rather
than a cool webpage, but it's early days.)


Deployment
----------

How do you get this sucker running? Well, first you need a secure HTTP (https)
server. I use Debian GNU/Linux as an OS, and Apache as a web server, on QNAP
hardware <http://www.cyrius.com/debian/kirkwood/>. But any way you can run
Python 2.7 code via WSGI will do.

If you are going to have the Sparsam backend and data under /srv/www/sparsam,
and the Enyo frontend app under /srv/www/sparsam/root, just run ``make
install``. Otherwise read on.

Run ``make backend/pythonhome`` to generate the virtual environment. (You need
``make`` and ``virtualenv`` installed to do this, and an Internet connection to
download Python modules into the virtualenv.)

Now copy the entire backend directory somewhere your web server can see. On
Debian I suggest ``/srv/www/sparsam``. Edit the backend/config.py to say where
to store the database. Edit the backend/wsgi/backend.wsgi to reflect wherever
you put it. Then (under Apache with modwsgi), add something like this to your
configuration::

    WSGIScriptAlias /sparsam/wsgi /srv/www/sparsam/backend/wsgi/backend.wsgi

You'll need other WSGI configuration bits. See
<http://code.google.com/p/modwsgi/wiki/WhereToGetHelp?tm=6>, and donate some
money to the mod_wsgi author(s).

So much for the backend. The Enyo app can be deployed by copying things from
the source, enyo and lib directories under your document root, but this makes
things slow because clients must fetch dozens of JavaScript and CSS files
before the whole thing is loaded. So instead you minify it first.

To do this you need NodeJS installed. Then go to the ``tools/`` directory and
run ./deploy.sh. This will construct a directory under ``deploy/`` with the
files that need to be deployed. Make a ``sparsam`` directory under your
document root, and copy all the contents of the
``deploy/sparsam-YYYY_MM_DD-HH_MM_SSPM`` directory into it.

Now visit https://your.webserver.example.com/sparsam/ with a recent browser and
you'll see ... nothing interesting. That's because there are no envelopes in
the database yet.

