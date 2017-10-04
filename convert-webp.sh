#!/usr/bin/env bash
find . -maxdepth 1 -type f -exec ~/programs/webp/bin/cwebp {} -o {}.webp \;
