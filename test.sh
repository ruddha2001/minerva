#!/bin/bash

./node_modules/mocha/bin/mocha ./build/test --exit
echo $?

# if [ $code -ne 0 ]
# then
#    node ./build/test/deleteTestEntries
# fi