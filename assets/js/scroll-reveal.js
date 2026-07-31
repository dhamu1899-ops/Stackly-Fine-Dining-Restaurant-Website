/* Section-wise scroll reveal animation (vanilla replacement for the React
   app's framer-motion whileInView fade/slide-up transitions). Walks the
   page's <main> content, tags logical section groups with a `.reveal`
   class, then fades/rises/softens each one into place the first time it
   scrolls into view. Grid-like groups (card layouts) get their children
   individually staggered for a more premium, cascading entrance. */

(function () {
  var STAGGER_STEP_MS = 90;
  var STAGGER_MAX_MS = 540;

  function isElement(node) {
    return node.nodeType === 1;
  }

  function isSkippable(el) {
    return el.classList.contains('hidden') || el.hasAttribute('data-no-reveal');
  }

  function isGridLike(el) {
    return /(^|\s)grid(\s|$)/.test(el.className) || / grid-cols-/.test(' ' + el.className);
  }

  function drill(node, targets, depth) {
    if (isSkippable(node)) return;
    var kids = Array.from(node.children).filter(isElement);
    if (depth < 2 && kids.length === 1) {
      drill(kids[0], targets, depth + 1);
      return;
    }
    if (depth < 2 && kids.length >= 2) {
      kids.forEach(function (k) {
        if (!isSkippable(k)) targets.push(k);
      });
      return;
    }
    targets.push(node);
  }

  function collectTargets(main) {
    var targets = [];
    var topChildren = Array.from(main.children).filter(isElement);
    topChildren.forEach(function (child, idx) {
      if (idx === 0) return; // leave the hero / page banner visible immediately
      drill(child, targets, 0);
    });
    return targets;
  }

  function prepareTarget(el) {
    // Grid-like groups of 2+ cards get each card staggered individually;
    // everything else reveals as a single cohesive block.
    if (isGridLike(el)) {
      var items = Array.from(el.children).filter(isElement).filter(function (c) { return !isSkippable(c); });
      if (items.length >= 2) {
        items.forEach(function (item, i) {
          item.classList.add('reveal');
          item.style.setProperty('--reveal-delay', Math.min(i * STAGGER_STEP_MS, STAGGER_MAX_MS) + 'ms');
        });
        return items;
      }
    }
    el.classList.add('reveal');
    return [el];
  }

  document.addEventListener('DOMContentLoaded', function () {
    var main = document.querySelector('main');
    if (!main) return;

    var groups = collectTargets(main);
    if (!groups.length) return;

    var allNodes = [];
    var nodeToGroupTrigger = new Map();

    groups.forEach(function (group) {
      var members = prepareTarget(group);
      members.forEach(function (m) { allNodes.push(m); });
      // Observe the group's own bounding box (the parent) so the whole
      // cluster fires together even though each child animates on its
      // own staggered delay.
      nodeToGroupTrigger.set(group, members);
    });

    if (!('IntersectionObserver' in window)) {
      allNodes.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var members = nodeToGroupTrigger.get(entry.target);
          (members || [entry.target]).forEach(function (m) { m.classList.add('is-visible'); });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    groups.forEach(function (group) { io.observe(group); });
  });
})();
