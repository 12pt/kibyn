# kibyn

A tiny library for parsing keybinding strings. Doesn't care about shift. Aim to be <100 lines.

You'll likely want to use this library within an event listener for any event extending `KeyboardEvent`.

## Usage

There are 4 reserved letters for parsing the keybinding string:

* M => meta
* S => super
* C => ctrl
* A => alt

There's one weird pseudo-reserved character which is `-`. If it's used between letters, it is ignored and used as a separator.
If it's at a place one would not use a separator e.g. the end of a keybind, it is used as a non-modifier key.

For example, ctrl + hyphen would be:

```javascript
kibyn.create("C--");
```

Only one non-modifier key is supported. Supplying more than one will result in the final non-modifier being picked. For example,
`C-A-ntelope" would resolve to the equivalent object to `C-A-e`.

### Common Use-case

```javascript
var copyKb = kibyn.create("C-c"); // Ctrl-C

myThing.addEventListener("keydown", function(event) {
    if(kibyn.matches(event, copyKb) {
        // code to copy something
    }
});
```

## TODO

* Actual tests might be a plan :thumbs_up:
