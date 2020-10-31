#!/bin/bash

./node_modules/mocha/bin/mocha ./build/ --exit
code=$?

if [ $code -ne 0 ]
then
   node ./build/test/deleteTestEntries
fi