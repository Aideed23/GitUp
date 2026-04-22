#!/usr/bin/env python3
"""Run the SecurityOps demo app from any working directory.

Usage:
  python3 SecurityOpsApp/server.py
  python3 SecurityOpsApp/server.py --port 9000
"""

from __future__ import annotations

import argparse
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

APP_DIR = Path(__file__).resolve().parent


def parse_args() -> argparse.Namespace:
  parser = argparse.ArgumentParser(description="Serve SecurityOps demo app")
  parser.add_argument("--host", default="127.0.0.1", help="Host interface to bind")
  parser.add_argument("--port", type=int, default=8080, help="TCP port to bind")
  return parser.parse_args()


def main() -> None:
  args = parse_args()
  handler = functools.partial(SimpleHTTPRequestHandler, directory=str(APP_DIR))
  server = ThreadingHTTPServer((args.host, args.port), handler)
  print(f"SecurityOps demo running at http://{args.host}:{args.port}/")
  print(f"Serving files from: {APP_DIR}")
  try:
    server.serve_forever()
  except KeyboardInterrupt:
    pass
  finally:
    server.server_close()


if __name__ == "__main__":
  main()
