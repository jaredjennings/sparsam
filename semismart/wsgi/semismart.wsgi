#!/srv/www/sparsam/backend/pythonhome/bin/python
import os
import sys
sys.path.append('/srv/www/sparsam/semismart')
os.environ['SB_SETTINGS'] = '/srv/www/sparsam/backend/config.py'

from semismart import app as application
