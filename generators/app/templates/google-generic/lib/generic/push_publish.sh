#!/bin/bash

directory="$HOME/dev/polymer_web_components"

#version=(cat package.json | jq .version | sed 's|"||g')
version_suffix="this thould be made into an npm package"
version_suffix=$(date +%s | cut -c3-9)

git add -A . 
git commit -m "${1}"
git push
npm version 1.0.${version_suffix} --allow-same-version

#${directory}/lib/update_component_list.sh
npm publish
