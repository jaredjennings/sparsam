all: deploy-enyo-frontend-stamp

install: install-backend install-enyo-frontend

backend/pythonhome:
	virtualenv backend/pythonhome
	backend/pythonhome/bin/pip install jsonschema
	backend/pythonhome/bin/pip install flask

install-backend: backend/pythonhome
	rm -rf /srv/www/sparsam/backend
	cp -R backend /srv/www/sparsam/backend

# this target does not actually deploy anything: it creates a dir ready to be
# deployed
deploy-enyo-frontend-stamp: source/* enyo/*
	cd tools; ./deploy.sh
	cd deploy; ln -sf `ls -1rt | tail -n 1` latest
	touch $@

install-enyo-frontend: deploy-enyo-frontend-stamp
	rm -rf /srv/www/root/sparsam/*
	cp -R deploy/latest/* /srv/www/root/sparsam/

# food for make(1)
.PHONY: all install install-backend deploy-enyo-frontend
