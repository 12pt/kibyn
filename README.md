# kibyn

A tiny library for parsing keybinding strings. Doesn't care about shift. Aim to be <100 lines.

You'll likely want to use this library within an event listener for any event extending `KeyboardEvent`.

## Usage

There are 4 reserved letters for parsing the keybinding string:

* M => meta
* S => super
* C => ctrl
* A => alt

Anything else (alphanumerical) passed to `ki.create()` will be interpreted as a non-modifier key, but
only the last non-modifier will be used in the keybinding.

For example:

`C-M-what` will produce a keybinding representing Ctrl, Meta, and t.

```javascript
var copyKb = kibyn.create("C-c"); // Ctrl-C

myThing.addEventListener("keydown", function(event) {
    if(kibyn.matches(event, copyKb) {
        myThing.copyText;
    }
});
```

## TODO

Support more than just alphanumerical keys being pressed. 
