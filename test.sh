#!/bin/bash

./node_modules/mocha/bin/mocha ./build/test --exit
code=$?

if [ $code -ne 0 ]
then
   node ./build/test/deleteTestEntries
fi