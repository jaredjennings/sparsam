#!/srv/www/sparsam/backend/pythonhome/bin/python
import os
import sys
sys.path.append("/srv/www/sparsam/backend")
os.environ['SB_SETTINGS'] = '/srv/www/sparsam/backend/config.py'

from wsgiref.handlers import CGIHandler
from backend import app

CGIHandler().run(app)
