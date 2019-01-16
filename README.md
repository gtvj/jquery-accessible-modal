# jQuery accessible modal

This is a simple implementation of a popup which is intended to:

* Provide good accessibility (via ARIA)
* Report analytics information to GTM
* Be easy to integrate into applications

It is intended to be integrated by:
 
 * including `jquery-accessible-modal.js` within a `<script>` tag before the closing `</body>` tag
 * including `modal-styles.css` within a `<style>` tag in the `<head>`
 
 **Please ensure you have tested the integration of this modal before release**.
 
 ## Development machine setup
 
 Here's the command to kick off PHP web server and open the page in Chrome
 
* Clone this repo and run `npm start` (this just masks a Bash command to kick off a PHP server  and open Chrome)
* GruntJS is available for any automation tasks you may need (it is currently doing JSHint only)
* `index.html` is the place to put anything you're expecting to be available in the host pages (i.e. jQuery has been added via a `<script>` tag)
 
 