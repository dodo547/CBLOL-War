#!/usr/bin/env python3
"""
Servidor local ultrarrobusto para o CBLOL Chronicles: Batalha pelo Nexus.
"""

import http.server
import socketserver
import os
import sys

DEFAULT_PORT = 8000

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")
        sys.stderr.flush()

def start():
    project_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(project_dir)

    socketserver.TCPServer.allow_reuse_address = True

    port = DEFAULT_PORT
    server = None

    for attempt in range(20):
        try:
            # "0.0.0.0" permite conexões de outros PCs da rede local / Wi-Fi
            server = socketserver.TCPServer(("0.0.0.0", port), CORSRequestHandler)
            break
        except OSError:
            port += 1

    if not server:
        print(f"Erro: Não foi possível vincular o servidor em portas 8000-{port}.", flush=True)
        sys.exit(1)

    import socket
    local_ip = "localhost"
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
    except Exception:
        pass

    print("\n" + "=" * 62, flush=True)
    print(" 🏆 CBLOL CHRONICLES: BATALHA PELO NEXUS", flush=True)
    print("=" * 62, flush=True)
    print(f" 🚀 Servidor ativo e liberado na rede local!", flush=True)
    print(f" 🖥️  Neste Mac:             http://localhost:{port}", flush=True)
    print(f" 📱 No outro PC / Celular:   http://{local_ip}:{port}", flush=True)
    print(f" 📁 Diretório raiz:          {project_dir}", flush=True)
    print("=" * 62 + "\n", flush=True)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.", flush=True)
        server.server_close()
        sys.exit(0)

if __name__ == "__main__":
    start()
