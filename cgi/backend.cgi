#!/srv/www/root/sparsam/pythonhome/bin/python
import sys
sys.path.append("/srv/www/root/sparsam/backend")
from wsgiref.handlers import CGIHandler
from backend import app

CGIHandler().run(app)
