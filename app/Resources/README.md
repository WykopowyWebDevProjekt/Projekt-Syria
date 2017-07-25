# Installation
* Install [Node.js](https://nodejs.org/en/) ( tested on v8.1.3)
* Install [Gulp](https://gulpjs.com/) globally: 
    ```
    npm install gulp -g
    ```
* Install dependencies: 
    ```
    npm install
    ```
# Workflow
After running any of commands below every file in './assets' folder would be moved automatically to the '../../web/bundles' folder. Due to that assets like pictures linked in twig templates should have path like 'bundles/images/img.jpg'

* Watching changes, bundling .js and .scss files. Should be typed before starting any work.
    ```
    gulp watch
    ```
* Minification, building. Used to create production ready assets.
    ```
    gulp build
    ```
# Style guide

* Every .scss file in the './styles/modules' is a seperate [BEM](http://getbem.com/) Block. Do not put more than one block per file.

    ```
    .block {
        // styles for whole block

        &__element {
            // styles for block's element
        }

        &--modificator {
            // styles for block's modificator
        }
    }
    ```

* Every .js file in the './scripts/modules' should be a standalone functionality. For example, a file called MobileMenu.js. 

    ```
        class MobileMenu {
            constructor(model) {
                this._model = model;
                this._root = document.querySelector('mobile-menu');
                this.el = {
                    btn: this._root.querySelector('mobile-menu__btn)
                }

                this.events();
            }

            events() {
                this.el.btn.addEventListener('click', this.handleClick.bind(this));
            }

            handleClick() {
                // sth sth
            }
        }

        export default MobileMenu;
    ```

    and in './scripts/App.js'

    ```
    import MobileMenu from './modules/MobileMenu';

    const mobileMenu = new MobileMenu();
    ```