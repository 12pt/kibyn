var kibyn = (function() {
    /**
     * Parse an emacs-like keybind string e.g. C-M-g and convert
     * it to an object more easily checked. Doesn't care about shift.
     * @param {string} keybind - any combination of characters. capitalized MCS represent modifier keys.
     * @return {Object} returns an object with accessor names matching that of a KeyboardEvent object's relevant accessors.
     */
    function parseKeybinding(keybind) {
        var kb = {
            altKey:   false,
            ctrlKey:  false,
            superKey: false,
            metaKey:  false,
            key:      ""
        };
        // support e.g. C-M-t, CMt, "C M t", etc... only thing that matters is case.
        keybind.match(/[a-zA-Z0-9]+/g).forEach(character => {
            switch(character) {
                case "A": kb.altKey   = true; break;
                case "C": kb.ctrlKey  = true; break;
                case "S": kb.superKey = true; break;
                case "M": kb.metaKey  = true; break;
                default: kb.key       = character; // keep replacing until we get to the last valid character
            }
        });
        return kb;
    }

    /**
     * Whether or not the given thing can be interpreted as a keybind (or KeyboardEvent)
     */
    function isKeybindOrValidEvent(thing) {
        return thing instanceof KeyboardEvent ||
            (typeof(thing.altKey)   == "boolean" &&
             typeof(thing.ctrlKey)  == "boolean" &&
             typeof(thing.metaKey)  == "boolean" &&
             typeof(thing.superKey) == "boolean" &&
             typeof(thing.key)      == "string");
    }

    /**
     * If an object is a string, (try to) convert it to a keybinding. If not, return the object.
     */
    function asKeybindIfString(thing) {
        if(typeof(thing) == "string") {
            return parseKeybinding(thing);
        }
        return thing;
    }

    /**
     * Check if a's fields match b's in a keybinding context. That is, it compares keys.
     * If a parameter is passed as a string, it tries to convert it to a keybinding object.
     * The objects are then compared by relevant accessors.
     *
     * Importantly, parameters can be events implementing KeyboardEvent, and usually at least one
     * parameter will be an implementation of said event.
     *
     * @param {Object|string} a - A keybinding object, or a string representing one.
     * @param {Object|string} b - A keybinding object, or a string representing one.
     * @returns {boolean} whether or not a matches b.
     */
    function matches(a, b) {
        // convert it if it's not a keybind
        a = asKeybindIfString(a);
        b = asKeybindIfString(b);

        if(isKeybindOrValidEvent(a) && isKeybindOrValidEvent(b)) {
            return a.altKey == b.altKey &&
                a.ctrlKey   == b.ctrlKey &&
                a.metaKey   == b.metaKey &&
                a.superKey  == b.superKey &&
                a.key       == b.key;
        } else {
            console.warn("One parameter does not contain expected accessors needed for keybind matching.");
            return false;
        }
    };

    return {
        create: parseKeybinding,
        matches: matches
    };
})();
