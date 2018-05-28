#include <stdio.h>
#include "tinyexpr.h"
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) 
{
    printf("WebAssembly module loaded\n");
}

EMSCRIPTEN_KEEPALIVE        // Needed for calling method from javascript
double evaluate(char *s)
{
    return te_interp(s, 0); // Sends the string expression to the method te_interp
}                           // which takes a string like "5+5" and evaluates it
