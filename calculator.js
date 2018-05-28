
var evaluate = Module.cwrap( // ".cwrap" creates a reusable kind of method that calls the C code
    'evaluate'      // C function to call
    , 'number'      // Return type
    , ['string']);  // Parameters
var useWasm;        // boolean: use webasm or not
var type = set();   // string: the string value from the selector

function setScreen(val) {
    document.getElementById("d").value = val;
}

function addToScreen(val) {
    document.getElementById("d").value += val;
}

function e() { 
    if(!useWasm)
    {   
        console.log("Using JS");
        try 
        { 
            setScreen(eval(document.getElementById("d").value)); 
        } 
        catch(e) 
        {
            setScreen('Error'); 
        }
    }
    else
    {
        console.log("Using WASM");

        setScreen(evaluate(document.getElementById("d").value));
    }
}

function set() {
    var e = document.getElementById("selector");
    type = e.options[e.selectedIndex].value;
    useWasm = (type === "wasm");
    console.log("value: " + type + "   bool: " + useWasm);
    return type;
}