# Web Assembly Calculator
## About:
This is a simple calculator that is written in C and JavaScript.
The C program and libraries are compiled to a [".wasm"](https://webassembly.org/docs/text-format/) binary file using
[Emscripten](https://github.com/kripken/emscripten). Emscripten compiles and 
creates a ".js" file with all required code to call C functions directly from 
another ".js" file. For the C calculation, the library [TinyExpr](https://github.com/codeplea/tinyexpr)
is used.

## Compiling
To compile the C files [Emscripten](https://github.com/kripken/emscripten) needs to me installed.
[Emscripten](https://github.com/kripken/emscripten) compiles the C code into a [".wasm"](https://webassembly.org/docs/text-format/) 
file and the auto generates JavaScript file for easy C method calling.
This command was used to compile the C file and libraries.
```
 emcc wasmCalculator.c tinyexpr.c -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s WASM=1 -o index.js -lm
```

## Running the page
To run the page run the command:
```
python SimpleHTTPServer 9000
```
This sets up a local HTTP server to connect to from the adress `localhost:9000`
in a web browser.