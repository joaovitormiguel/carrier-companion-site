#!/usr/bin/env python3
"""Local dev server with clean URLs (/product -> product.html). Usage: python3 serve.py [port]"""
import http.server, os, sys
PORT=int(sys.argv[1]) if len(sys.argv)>1 else 8080
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p=super().translate_path(path.split('?')[0])
        if not os.path.exists(p) and os.path.exists(p+'.html'): return p+'.html'
        return p
    def log_message(self,*a): pass
http.server.ThreadingHTTPServer(('',PORT),H).serve_forever()
