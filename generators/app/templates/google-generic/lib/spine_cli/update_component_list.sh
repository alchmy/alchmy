#!/bin/bash

#Base info
working_directory="$HOME/dev/spinec/src/spinec"

#latest_commit=$(curl https://api.github.com/repos/musicsmithnz/polymer_web_components/commits | jq .[0])
#latest_version=$(echo ${latest_commit} | jq .commit.message | sed "s|^\"||" | sed "s|\"$||")
pwc_version=$(cat ${working_directory}/package.json | jq .version | sed "s|^\"||" | sed "s|\"$||" )
component_list=($(ls "${working_directory}/node_modules/polymer_web_components/components"))

ipfs_folder_hash=$(ipfs add -r ${working_directory}/node_modules/polymer_web_components/components/ | sed '$!d'| cut -f2 -d' ')

ipfs_cdn_url="https://ipfs.io/ipfs/${ipfs_folder_hash}"
unpkg_cdn_url="https://unpkg.com/polymer_web_components@${pwc_version}/components"
github_cdn_url="https://cdn.rawgit.com/musicsmithnz/polymer_web_components/master/components"

list="---"$'\n'
for component in ${component_list[@]}; do
    begin=$'-\n'
    name=$'  name: '\"${component}\"$'\n'
    ipfs=$'  ipfs: '\"${ipfs_cdn_url}/${component}\"$'\n'
    unpkg=$'  unpkg: '\"${unpkg_cdn_url}/${component}\"$'\n'
    github=$'  github: '\"${github_cdn_url}/${component}\"$'\n'
    list=$list$begin$name$ipfs$github$unpkg
done
list=$list$'...'


echo "$list" > ${HOME}/dev/spinec/resources/polymer_web_components.yaml
echo "polymer web components list saved..."



working_directory="$HOME/dev/spinec"
resource_list='index.html'
resources="---"
for res in ${resource_list[@]}; do
    echo $working_directory/$res

    ipfs_folder_hash=$(ipfs add -w ${working_directory}/${res} | sed '$!d'| cut -f2 -d' ')
    ipfs_res_url="https://ipfs.io/ipfs/${ipfs_folder_hash}/${res}"
    begin=$'-\n'
    ipfs=$'  ipfs: '\"${ipfs_res_url}\"$'\n'
    resources=$begin$ipfs
done
resources=$resources$'...'

#echo "$resources" > ${HOME}/dev/spinec/resources/resources.yaml
#echo "index.html saved to yaml"
