#!/bin/bash

./node_modules/mocha/bin/mocha ./build/test --timeout 5000 --exit
echo $?

# if [ $code -ne 0 ]
# then
#    node ./build/test/deleteTestEntries
# fi