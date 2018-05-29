
var evaluate = Module.cwrap( // ".cwrap" creates a reusable kind of method that calls the C code
    'evaluate'      // C function to call
    , 'number'      // Return type
    , ['string']);  // Parameters

var useWasm;        // boolean: use webasm or not
var type = set();   // string: the string value from the selector

// Sets the string on the screen
function setScreen(val) {
    document.getElementById("calc-display").value = val;
}

// Adds the string of the button pressed to the calc screen/display
function addToScreen(val) {
    document.getElementById("calc-display").value += val;
}

/*
* Checks if using js or wasm
* For js: eval() solves the string expression ex: eval("5+5")
* For WASM: evaluate() is a C function compiled into WebAssembly
* that is called to evaluate a string expression ex: evaluate("5+5")
*/
function equals() { 
    if(!useWasm)
    {   
        console.log("Using JS");
        try 
        { 
            setScreen(eval(document.getElementById("calc-display").value)); 
        } 
        catch(e) 
        {
            setScreen('Error'); 
        }
    }
    else
    {
        console.log("Using WASM");
        setScreen(evaluate(document.getElementById("calc-display").value));
    }
}

// Sets the useWasm and type from the selector
function set() {
    var e = document.getElementById("selector");
    type = e.options[e.selectedIndex].value;
    useWasm = (type === "wasm");
    return type;
}