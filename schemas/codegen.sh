#!/bin/bash

rm -rf ./ts

for file in *.json; do
    rm -rf ./foo
    mkdir ./foo
    echo $file
    cp $file ./foo
    CLASS=$(echo ${file%.*} | sed 's/^lavs-//' | sed -r 's/(.)-+(.)/\1\U\2/g;s/^[a-z]/\U&/')
    echo $CLASS
    ts-codegen generate \
            --plugin client \
            --schema ./foo \
            --out ./ts \
            --name $CLASS \
            --bundle
done

ls -l ./ts

# This doesn't work cuz of wrong import paths
# mv ./ts/*.client.ts ../src/contracts/clients
# mv ./ts/*.types.ts ../src/contracts/types

mv ./ts/*.ts ../src/contracts

rm -rf ./ts ./foo