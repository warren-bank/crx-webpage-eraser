### [Webpage Eraser](https://github.com/warren-bank/crx-webpage-eraser)

Chrome extension to erase selected visible elements from the current webpage.

#### Comments:

* sometimes it's nice to be able to remove DOM elements without needing to open devtools

#### Usage:

* clicking the menu icon toggles the extension on/off
* when on:
  - all _:hover_ DOM elements get a red border
  - the _:hover_ DOM element nested most deeply is removed with a click

#### Limitations:

* doesn't support undo (_Ctrl-z_) or redo (_Ctrl-y_)
* DOM elements that already have a click handler will receive the event before the extension

#### Credits:

* this project is inspired by the extension: _Vanishing Wand_ v1.1.0 by [Elliot Plant](https://github.com/elliotaplant)
  - [chrome web store](https://chrome.google.com/webstore/detail/vanishing-wand/dmngnclhpbcedbbiplfcdijnimijakdd)
  - [github](https://github.com/elliotaplant/vanishing-wand)
    * license: [MIT](https://github.com/elliotaplant/vanishing-wand/blob/0d79c7f8a4aa80d99614963b2f98db69684c0c85/package.json#L21)

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
