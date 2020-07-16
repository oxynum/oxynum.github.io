
/**
 * @description This is a light library of utils functions for browser, scroll & viewport management
 */
class Utils {
  constructor() {
    this.lastOffset =  window.pageYOffset || document.documentElement.scrollTop;
  }
   
  /**
   * @description allow to detect if current browser is on mobile or not
   * @returns {Boolean} true if current browser is a mobile browser, false if not
   */
  isMobileBrowser() {
    var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }
    return isMobile;
  }

  /**
   * @description detect if current element is into the viewport (visible for user)
   * @param {HTMLElement} elm - element to check
   * @returns {Boolean} true if current element is visible for user, false if not
   */
  isIntoViewport(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top >= viewHeight);
  }

  /**
   * @description detect if current element is into the focus area (if element was centered on the viewport's center)
   * @param {HTMLElement} elm - element to check
   * @returns {Boolean} true if current element is into the focus area, false if not
   */
  isIntoFocusArea(elm){
    var rect = elm.getBoundingClientRect();
    var rectSize = rect.bottom - rect.top;
    var viewportCenter = Math.max(document.documentElement.clientHeight, window.innerHeight) / 2;
    var focusAreaTop = viewportCenter - rectSize / 2;
    var focusAreaBottom = viewportCenter + rectSize / 2;
    return rect.top <= focusAreaBottom && rect.bottom >= focusAreaTop;
  }

  /**
   * @description get the scroll direction 
   * @returns {String} 'down' or 'up'
   */
  getScrollDirection() {
    var direction;
    var offset = window.pageYOffset || document.documentElement.scrollTop;
    direction = offset > this.lastOffset ? 'down' : 'up';
    this.lastOffset = offset <= 0 ? 0 : offset;
    return direction;
  }
};

var TeamNodule = (function ($, window, document, Utils){
  "use strict";

  // [VARIABLES : begin]
    var $win		= $(window), 
		    $doc		= $(document),
        teammates = $(".team-image"),
        currentFocus; // current pictures on which the focus is 
  // [VARIABLES : end]

  // [MAIN METHODS: begin]

    /**
     * @description will apply _focusManager on small screen (under 576px) or mobile device
     */
    function executeOnSmallScreen() {
      if(Utils.isMobileBrowser() || window.matchMedia("(max-width: 576px)").matches) {
        if (teammates.length > 0){
          // init
          currentFocus = _getCenterClosestPicture();
          _focusManager();

          // update on scroll
          $doc.scroll(function () {
            _focusManager();
          });
        }
      }
      else {
        if(currentFocus && currentFocus.element){
          _blur(currentFocus.element);
        }
        $doc.off('scroll');
        currentFocus = {
          element: null,
          index: -1
        }; // reinit
      }
    }

  // [MAIN METHODS: end]
  
  // [PRIVATE METHODS: begin]
    /**
     * @description will blur element by removing 'unblur' css class
     * @param {HTMLElement} element - element to blur
     */
    function _blur(element){
      if(element && element.classList) {
        element.classList.remove('unblur');
      }
    }

    /**
     * @description will check if element need to be blurred or unblurred, according to scroll direction
     */
    function _focusManager() {
      var forParams = _loopConstructor(Utils.getScrollDirection(), teammates.length - 1);
      for (forParams.initialValue; forParams.condition(); forParams.step()){
        var element = teammates[forParams.initialValue];
        if (!Utils.isIntoViewport(element)){
          continue;
        }
        if (Utils.isIntoFocusArea(element, Utils.getScrollDirection())){
          _unblur(element, forParams.initialValue);
        } else {
          _blur(element);
          break;
        }
      }
    }

    /**
     * @description get the picture closest to the viewport's center
     * @returns {Object} {
     *    element: {HTMLElement}, 
     *    index: {Number}
     * }
     */
    function _getCenterClosestPicture(){
      var pictures = [];
      $.each(teammates, function(index, element){
        pictures.push({
          element: element, 
          index: index
        });
      });
      if (pictures.length > 0){
        var center = Math.max(document.documentElement.clientHeight, window.innerHeight) / 2;
        pictures.sort(function(elm1, elm2){
          var rect1 = elm1.element && elm1.element.getBoundingClientRect && elm1.element.getBoundingClientRect();
          var rect2 = elm2.element && elm2.element.getBoundingClientRect && elm2.element.getBoundingClientRect();
          
          var mid1 = rect1.top + Math.abs(rect1.bottom - rect1.top) / 2;
          var mid2 = rect2.top + Math.abs(rect2.bottom - rect2.top) / 2;
          
          var d1 = Math.abs(center - mid1);
          var d2 = Math.abs(center - mid2);

          if(d1 < d2) {
            return -1
          }
          else if(d1 > d2) {
            return 1
          }
          if(d1 == d2) {
            return 0
          }
        });
        
        return pictures[0];
      }
      else {
        return {
          element: null,
          index: -1
        };
      }
    }

    /**
     * @description will contruct params of a for loop, to be able to reverse its principle according to scroll direction
     * @param {String} direction - scroll direction
     * @param {Number} limit - max size of the loop
     * @returns {Object} {
     *    initialValue: {Number}, 
     *    limitValue: {Number}, 
     *    condition: {Function} to compare initialValue with the limitValue, 
     *    step: {Function} to increase or decrease initialValue
     * }
     */
    function _loopConstructor(direction, limit) {
      var loop = {};

      loop.initialValue = currentFocus && currentFocus.index > 0 ? currentFocus.index : 0; 
      loop.limitValue = direction === 'down' ? limit : 0;

      loop.condition = function() {
        return direction === 'down' ? this.initialValue <= this.limitValue : this.initialValue >= this.limitValue;
      };
      loop.step = function () {
        return this.initialValue = direction === 'down' ? this.initialValue + 1 : this.initialValue - 1;
      }

      return loop;
    }

    /**
     * @description will unblur element by adding a 'unblur' css class, and update the currentFocus var
     * @param {HTMLElement} element - element to unblur
     * @param {Number} index - index of the current element compare to the teammates Array
     */
    function _unblur(element, index){
        if(currentFocus && currentFocus.element && !currentFocus.element.isSameNode(element)){
          _blur(currentFocus.element);
        }
        currentFocus.element = element;
        currentFocus.index = index;
        if (currentFocus.element.classList) {
            currentFocus.element.classList.add('unblur');
        }
    }
  // [PRIVATE METHODS: end]
  
  
  // [EVENTS: begin]
    $doc.ready(function(){
      executeOnSmallScreen();
    });
    $win.resize(function(){
      executeOnSmallScreen();
    });
  // [EVENTS: end]
}(jQuery, window, document, new Utils()));