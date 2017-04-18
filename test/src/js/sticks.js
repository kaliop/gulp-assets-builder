/**
 * Test JS minification
 */
void function() {

  var ELEMENT_MOVE_SPEED = { min: 20, max: 50 };
  var ELEMENT_FADE_SPEED = { min: 2, max: 5 };
  var ELEMENT_LIFETIME = { min: 2, max: 5 };
  var ELEMENT_COUNT = { min: 4, max: 7 };
  var STYLES_COUNT = 8;
  var container, ww, wh;

  if (CSS.supports('pointer-events', 'none')) {
    init();
  }

  function init() {
    container = document.querySelector('.Sticks-start');
    if (!container) return;
    ww = window.innerWidth;
    wh = window.innerHeight;

    var elCount = ELEMENT_COUNT.min;
    if (grdz.mq.desktop.matches) elCount = ELEMENT_COUNT.max;
    for (var i = 1; i <= elCount; i++) {
      var color = i % STYLES_COUNT || STYLES_COUNT;
      makeStick(color, i / 20);
    }

    window.addEventListener('resize', debounce(function () {
      ww = window.innerWidth;
      wh = window.innerHeight;
    }, 1000), {passive: true});

    container.parentElement.classList.add('Sticks--visible');
  }

  function makeStick(color, delay) {
    var item = document.createElement('span');
    var startSpeed = getMoveSpeed();
    var startRotation = getStickAngle();
    var nextRotation = getStickAngle(startRotation);
    var lifeTime = randInt(ELEMENT_LIFETIME.min, ELEMENT_LIFETIME.max);
    TweenLite.set(item, {
      attr: {
        'class': 'Sticks-item',
        'data-color': color
      },
      x: getCoord(ww),
      y: getCoord(wh),
      rotation: startRotation,
      opacity: 0
    });
    container.appendChild(item);
    fade(item, 1, startSpeed, delay);
    move(item, startSpeed, nextRotation, lifeTime);
  }

  function move(element, duration, angle, lifeTime) {
    var startX = element._gsTransform.x;
    var startY = element._gsTransform.y;
    if (lifeTime <= 1) {
      fade(element, 0, duration);
    }
    TweenLite.to(element, duration, {
      ease: Power1.easeInOut,
      rotation: angle,
      onComplete: function() {
        if (lifeTime <= 1) {
          container.removeChild(element);
          makeStick(element.dataset.color, 'auto');
        } else {
          move(element,
            getMoveSpeed(duration),
            getStickAngle(angle),
            lifeTime - 1
          );
        }
      },
      bezier: { values: [
        {
          x: getCoord(ww, startX),
          y: getCoord(wh, startY)
        },
        {
          x: getCoord(ww, startX),
          y: getCoord(wh, startY)
        }
      ]}
    })
  }

  function fade(element, opacity, moveSpeed, delay) {
    var fadeSpeed = randNum(ELEMENT_FADE_SPEED.min, ELEMENT_FADE_SPEED.max);
    if (typeof moveSpeed === 'number') {
      fadeSpeed = Math.min(fadeSpeed, moveSpeed / 2);
    }
    if (delay === 'auto') {
      delay = fadeSpeed
    }
    TweenLite.to(element, fadeSpeed, {
      delay: delay,
      opacity: opacity
    });
  }

  function randNum(min, max) {
    if (max <= min) return min;
    return Math.random() * (max - min) + min;
  }

  function randInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    if (max <= min) return min;
    var seed = Math.random();
    if (seed === 1) return max;
    return Math.floor(seed * (max + 1 - min) + min);
  }

  function getStickAngle(current) {
    // pick a base angle in the first quarter
    var base = randInt(5, 85);
    // figure out initial number of quarter turns
    var oldTurn = typeof current === 'number' ? Math.floor(current / 90) : 0;
    // favor the current direction
    var offset = 0;
    if (oldTurn === 0) offset = randInt(-3, 3);
    if (oldTurn < 0) offset = randInt(-4, -1);
    if (oldTurn > 0) offset = randInt(-1, 4);
    return base + offset * 90;
  }

  function getCoord(side, current) {
    var offset = side / 8;
    var travel = side / 4;
    var minAbsolute = -0.5 * side - offset;
    var minVisible = -0.5 * side;
    var maxAbsolute = 0.5 * side + offset;
    var maxVisible = 0.5 * side;

    // Initial position in viewport, or slightly outside (if offset > 0)
    if (typeof current !== 'number') {
      return randInt(minAbsolute, maxAbsolute);
    }
    // New position, not too far from current and cannot be out of allowed overflow
    // Also, if start position is outside of vewport, move stick inside viewport
    else {
      var min = current < minVisible ? minVisible : minAbsolute;
      var max = current > maxVisible ? maxVisible : maxAbsolute;
      return randInt(
        Math.max(min, current - travel),
        Math.min(max, current + travel)
      );
    }
  }

  function getMoveSpeed(previous) {
    var rand = randNum(ELEMENT_MOVE_SPEED.min, ELEMENT_MOVE_SPEED.max);
    return previous ? (rand + previous) / 2 : rand;
  }
}();
