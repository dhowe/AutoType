// http://localhost/git/autochar/p5/index.html

var dlines, plines, ts = 0, load = true;
var char, chars = { '拑': { character: '拑', strokes: ["M 322 533 Q 391 558 393 559 Q 402 568 396 576 Q 389 588 358 592 Q 340 595 324 590 L 273 570 Q 195 543 130 531 Q 93 521 122 507 Q 158 491 232 508 Q 250 514 273 519 L 322 533 Z", "M 271 328 Q 270 243 269 133 Q 269 111 256 101 Q 250 98 177 111 Q 144 123 147 113 Q 148 106 168 91 Q 234 42 251 12 Q 270 -22 286 -23 Q 301 -24 315 11 Q 333 57 330 130 Q 323 248 321 367 L 321 400 Q 320 467 322 533 L 324 590 Q 324 678 342 741 Q 360 771 304 793 Q 270 812 251 805 Q 233 798 249 775 Q 271 748 272 714 Q 273 698 273 570 L 273 519 Q 272 456 271 370 L 271 328 Z", "M 271 370 Q 189 324 117 277 Q 83 256 59 249 Q 47 243 45 235 Q 44 225 59 212 Q 78 196 102 189 Q 114 186 138 208 Q 196 268 271 328 L 321 367 Q 334 379 349 389 Q 368 402 377 416 Q 383 429 372 428 Q 366 428 321 400 L 271 370 Z", "M 783 429 Q 829 435 888 438 Q 948 442 954 451 Q 958 464 941 477 Q 880 516 810 492 Q 797 489 783 484 L 732 471 Q 665 459 539 428 L 491 419 Q 448 410 399 400 Q 377 396 395 380 Q 429 353 475 367 Q 481 370 491 371 L 539 385 Q 627 412 731 423 L 783 429 Z", "M 539 428 Q 539 509 549 551 Q 556 564 553 576 Q 547 585 497 613 Q 476 626 458 613 Q 454 609 460 595 Q 482 564 484 533 Q 488 487 491 433 Q 491 427 491 419 L 491 371 Q 494 212 488 168 Q 473 108 499 54 Q 505 39 512 36 Q 518 32 524 38 Q 539 47 544 87 L 544 123 Q 543 157 541 261 L 540 293 Q 539 335 539 385 L 539 428 Z", "M 672 103 Q 706 54 712 29 Q 719 -4 732 -9 Q 747 -12 765 22 Q 789 67 794 142 Q 784 286 783 429 L 783 484 Q 783 628 803 697 Q 819 727 764 749 Q 730 768 711 761 Q 693 754 709 731 Q 731 704 733 670 Q 734 651 732 471 L 731 423 Q 730 314 727 150 Q 726 129 715 121 Q 712 121 693 126 C 663 130 655 128 672 103 Z", "M 541 261 Q 607 273 655 281 Q 680 287 670 300 Q 657 315 630 317 Q 587 320 540 293 C 514 278 511 256 541 261 Z", "M 544 87 Q 553 96 672 103 C 702 105 715 106 693 126 Q 686 133 670 143 Q 654 152 623 143 Q 580 131 544 123 C 515 116 518 73 544 87 Z"] } };

function preload() {
  if (load) {
    dlines = loadStrings(DICT);
    plines = loadStrings(STROKES);
  }
}

function setup() {

  createCanvas(1024, 512);
  textAlign(CENTER);
  textSize(18);

  if (load) {
    chars = {};
    parseDict(dlines);
    parseStrokes(plines);
  }
}

var partIdx = 0;

function drawX() {

  background(245);
  if (millis() - ts > 1000 && !mouseIsPressed) {
    char = randomChar(chars);
    ts = millis();
  }

  if (mouseX < width/2) partIdx = 0;
  if (mouseX >= width/2) partIdx = 1;
  if (mouseX >= width) partIdx = -1;

  renderCharacters([randomProp(chars), randomProp(chars)]);
  //renderPath(char, { part: partIdx });
  //text(char.definition, width / 2, height - 10);
  noloop();
}

function randomWord() {

}

function renderCharacters(chars) {
  var s = "";
  for (var i = 0; i < chars.length; i++)
    s += chars[i].character;
  console.log("renderCharacters: "+s);
  for (var i = 0; i < chars.length; i++) {
    renderPath(chars[i], i, -1);
  }
}

function renderPath(char, charPos, options) {

  var pg = options && options.renderer || this._renderer;
  if (typeof pg === 'undefined') throw Error('No renderer');
  if (typeof char.matches === 'undefined') throw Error('No matches: '+char.character);

  var pidx = -1, pos = 0;

  if (options && typeof options.part != 'undefined') pidx = options.part;
  if (typeof charPos != 'undefined' && charPos > 0) pos = charPos;

  //console.log(char.character, pidx);

  var paths = [];
  if (pidx > -1) {
    for (var i = 0; i < char.matches.length; i++) {
      if (char.matches[i] == pidx) {
        paths.push(new Path2D(char.strokes[i]));
      }
    }
  } else {
    for (var i = 0; i < char.strokes.length; i++) {
      paths.push(new Path2D(char.strokes[i]));
    }
  }

  var ctx = pg.drawingContext, adjust = true;

  for (var i = 0; i < paths.length; i++) {
    if (adjust) {
      ctx.translate(0, 512-70); // shift for mirror
      if (pos > 0) ctx.translate(512, 0); // shift for mirror
      ctx.scale(.5, -.5); // mirror-vertically
    }

    ctx.fillStyle = "#000";
    if (ctx.isPointInPath(paths[i], mouseX, mouseY)) {
      ctx.fillStyle = "#d00";
    }

    ctx.fill(paths[i]);

    /*
    ctx.strokeStyle = "#777";
    ctx.lineWidth = 6;
    ctx.stroke(paths[i]);
    */

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
  }
}
