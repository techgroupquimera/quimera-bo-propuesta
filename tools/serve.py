"""Servidor local de revision: identico a http.server pero manda no-store,
para que el navegador NUNCA muestre una version cacheada del CSS/JS."""
import functools, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class NoCache(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    def log_message(self, *a): pass

d = sys.argv[1]; p = int(sys.argv[2])
ThreadingHTTPServer(('127.0.0.1', p), functools.partial(NoCache, directory=d)).serve_forever()
