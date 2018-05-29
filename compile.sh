#!/bin/bash
cwd=$(pwd)
path1="./src/c_code/wasmCalculator.c"   #Path for wasmCalculator.c
path2="./src/c_code/tinyexpr.c"         #Path for tinyexpr.c
output="./src/webpage/index.js"         #Path for output of emcc (emscripten)

emsdk_setup=false                       #If emsdk is set up correctly
compiled=false                          #If compile is successful

trap bashtrap INT
bashtrap(){
    echo "CTRL+C DETECTED : COMPILE NOT COMPLETE! "
}

function fail(){
    echo "Compile failed! Try installing emsdk from https://github.com/juj/emsdk\n and make sure you have emcc installed.\n Try running: sudo apt-get install emscripten"
}

cd $HOME
if [ -d emsdk ] ; then
    cd emsdk
    if [ -x emsdk_env.sh ] ; then
        source ./emsdk_env.sh
        emsdk_setup=true
    else
        fail
    fi
else
    fail
fi

if [ "$emsdk_setup" == true ] ; then
    cd $cwd
    emcc $path1 $path2 -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s WASM=1 -o $output -lm
    compiled=true
else
    fail
fi

if [ "$compiled" == true ] ; then
    echo "COMPILE SUCCESSFUL"
fi






#emcc ./src/c_code/wasmCalculator.c ./src/c_code/tinyexpr.c -s EXPORTED_FUNCTIONS='["ccall", "cwrap"]' -s WASM=1 -o ./src/webpage/index.js -lm