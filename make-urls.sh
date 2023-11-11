#!/bin/sh

# Get the URL from arguments
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 1
fi

echo "API_URL=$1" > .env.local