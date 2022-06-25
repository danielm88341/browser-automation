/**
 * Fill Function assistant
 *
 * Note: this has to be copied in its entirety.
 */
const FillFunctAngular = new function() {
    /**
     * Function to set text to an input
     * @param {string} selString selector of the element
     * @param {string} text text to be set in
     */
    this.setText = function (selString, text) {
        let sel = document.querySelector(selString);
        sel.value = text;
        sel.dispatchEvent(new InputEvent('input', {bubbles: true}));
        sel.dispatchEvent(new Event('blur', {bubbles: true}));
    }

    /**
     * Direct selector for doing yes/no radio selectors
     * @param {string} yesSel selector of element
     * @param {string} noSel selector of element
     * @param {boolean} bool
     */
    this.setYesNo = function (yesSel, noSel, bool) {
        let selStr = bool ? yesSel : noSel;
        let sel = document.querySelector(selStr);
        sel.dispatchEvent(new Event('change', {bubbles: true}));
    }

    /**
     * Select for dropdown, by number
     * @param {string} ngSelector
     * @param {number} numChild
     */
    this.setDDWithCount = function (ngSelector, numChild) {
        document.querySelector(ngSelector).dispatchEvent(new Event('input', {bubbles: true}));
        // Dropdown population is handled in a different part of the browser event loop
        // use setTimeout to trigger this process after population
        setTimeout(() => {
            let options = document.querySelectorAll(`${ngSelector} .ng-option`);
            if(numChild < 0 || numChild >= options.length) {
                console.error(`invalid count for selection for ${ngSelector}:: ${numChild} of ${options.length}`);
                document.querySelector(`${ngSelector} ng-dropdown-panel`).dispatchEvent(new Event('outsideClick', {bubbles: true}));
                return;
            }
            options[numChild].dispatchEvent(new Event('click', {bubbles: true}));
        }, 100);
    }

    /**
     * Select for dropdown, by string
     * @param {string} ngSelector
     * @param {string} textStr
     */
    this.setDDWithStr = function (ngSelector, textStr) {
        document.querySelector(ngSelector).dispatchEvent(new Event('input', {bubbles: true}));
        // Dropdown population is handled in a different part of the browser event loop
        // use setTimeout to trigger this process after population
        setTimeout(() => {
            let tmp = textStr.toLowerCase();
            let options = document.querySelectorAll(`${ngSelector} .ng-option`);
            for(let opt = 0; opt < options.length; opt++) {
                if(options[opt].innerText.toLowerCase() == tmp) {
                    options[opt].dispatchEvent(new Event('click', {bubbles: true}));
                    return;
                }
            }
            console.error(`Unable to find a match for ${ngSelector} :: ${textStr}`);
            document.querySelector(`${ngSelector} ng-dropdown-panel`).dispatchEvent(new Event('outsideClick', {bubbles: true}));
        }, 100);
    }
}
