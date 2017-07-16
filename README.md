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
only the first non-modifier will be used in the keybinding.

Keys are separated by *any* non-alphanumerical character, so C-M-s makes Ctrl-Meta-s, but CMs makes C. For the sake
of future sanity, I'd recommend only using `-`'s to separate characters, as when non-alphanumericals are supported
this will be the only way of separating them.

For example:

`C-M-what` will produce a keybinding representing Ctrl, Meta, and t.

```javascript
var copyKb = kibyn.create("C-c"); // Ctrl-C

myThing.addEventListener("keydown", function(event) {
    if(kibyn.matches(event, copyKb) {
        // code to copy something
    }
});
```

## TODO

* Support more than just alphanumerical keys being pressed. 
* Actual tests might be a plan :thumbs_up:
