#!/bin/bash
export PATH="/Users/hammid/.nvm/versions/node/v22.17.1/bin:$PATH"
rm -rf .next
exec node node_modules/.bin/next dev --webpack "$@"
