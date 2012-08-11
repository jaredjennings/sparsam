# This makefile supports building and installing Sparsam, both for production
# and development.
#
# To build, run make.
# To install, (sudo) make install.
#
# To install for a different purpose, put a short string, like perhaps 'dev',
# into a file called sparsam-install-stem in this directory.
#
# --



# The reason this is the contents of a file, instead of being passed via the
# environment, is that when you make install you may use sudo, which will
# probably clean out the environment. If the file doesn't exist, INSTALL_STEM
# will be empty.
INSTALL_STEM = $(shell cat sparsam-install-stem 2>/dev/null)

all: deploy-enyo-frontend-stamp

backend/pythonhome:
	virtualenv backend/pythonhome
	backend/pythonhome/bin/pip install jsonschema
	backend/pythonhome/bin/pip install flask

# INSTALL_TOP is where the WSGI scripts and the database file live.
# INSTALL_WEB_TOP is where all the static files live (e.g., the Enyo
# interface JavaScript, HTML and CSS).
# To have a separate copy of Sparsam for, say, development, set
# INSTALL_STEM to dev, in your .bashrc or similar, or on the make
# command line.
ifneq ($(INSTALL_STEM),)
INSTALL_TOP=/srv/www/sparsam-$(INSTALL_STEM)
INSTALL_WEB_TOP=/srv/www/root/sparsam-$(INSTALL_STEM)
$(warning INSTALL_TOP is $(INSTALL_TOP))
$(warning INSTALL_WEB_TOP is $(INSTALL_WEB_TOP))
$(shell sleep 1)
else
# default
INSTALL_TOP=/srv/www/sparsam
INSTALL_WEB_TOP=/srv/www/root/sparsam
endif


# this target does not actually deploy anything: it creates a dir ready to be
# deployed
deploy-enyo-frontend-stamp: source/* enyo/* index.html assets/*
	mkdir -p deploy
	cd tools; ./deploy.sh
	set -x; cd deploy; rm -f latest; ln -s `ls -1 | tail -n 1` latest
	touch $@

install: install-semismart install-backend install-enyo-frontend

install-backend: backend/pythonhome
	rm -rf $(INSTALL_TOP)/backend
	cp -R backend $(INSTALL_TOP)/backend

install-semismart: backend/pythonhome
	rm -rf $(INSTALL_TOP)/semismart
	cp -R semismart $(INSTALL_TOP)/semismart

install-enyo-frontend: deploy-enyo-frontend-stamp
	rm -rf $(INSTALL_WEB_TOP)/*
	cp -R deploy/latest/* $(INSTALL_WEB_TOP)/

clean:
	rm -rf deploy/*
	rm -f deploy-enyo-frontend-stamp
# food for make(1)
.PHONY: all install install-backend deploy-enyo-frontend clean
