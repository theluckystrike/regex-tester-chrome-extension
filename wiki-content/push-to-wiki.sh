#!/bin/bash
# Push wiki content to the GitHub wiki repository
# Prerequisites: The wiki must be initialized by creating the first page 
# through the GitHub web interface at:
# https://github.com/theluckystrike/regex-tester-chrome-extension/wiki/_new

set -e

REPO="theluckystrike/regex-tester-chrome-extension"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Pushing wiki content to ${REPO}..."

TMPDIR=$(mktemp -d)
cd "$TMPDIR"

git clone "https://github.com/${REPO}.wiki.git" wiki
cd wiki

# Copy all markdown files from wiki-content
cp "$SCRIPT_DIR"/*.md .

git add -A
git commit -m "Update wiki documentation" || echo "No changes to commit"
git push origin master

echo "Wiki content pushed successfully."
rm -rf "$TMPDIR"
