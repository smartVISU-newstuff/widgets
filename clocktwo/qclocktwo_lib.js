var q2_lang = 'de';

var q2 = {
    languages: {
        de: { offset: 35, clock: 'ESKISTAFÜNFZEHNZWANZIGDREIVIERTELVORFUNKNACHHALBAELFÜNFEINSXÄMZWEIDREIAUJVIERSECHSNLACHTSIEBENZWÖLFZEHNEUNKUHR', hr: ['3b:0:7:0', '3b:0:780:0', '3b:0:7800:0', '3b:0:3c0000:0', '3b:7800000:0:0', '3b:0:7c00000:0', '3b:0:0:7e0', '3b:0:0:1e', '3b:0:0:780000', '3b:0:0:f0000', '3b:e00000:0:0', '3b:0:0:f800'], mi: ['0:0:0:7000000', '780:f000:0:0', '7800:f000:0:0', 'c000000:f01f:0:0', '3f8000:f000:0:0', '780:f00e0:0:0', '0:f0000:0:0', '780:ff000:0:0', '3f8000:e0:0:0', 'c000000:ff:0:0', '7800:e0:0:0', '780:e0:0:0'] },
        en: { offset: 25, clock: 'ITLISASTIMEACQUARTERDCTWENTYFIVEXHALFBTENFTOPASTERUNINEONESIXTHREEFOURFIVETWOEIGHTELEVENSEVENTWELVETENSEoCLOCK', hr: ['1b:0:7:0', '1b:0:380000:0', '1b:0:7c0:0', '1b:0:7800:0', '1b:0:78000:0', '1b:0:38:0', '1b:0:0:3e0', '1b:0:7c00000:0', '1b:7800000:0:0', '1b:0:0:70000', '1b:0:8000000:1f', '1b:0:0:fc00'], mi: ['0:0:0:7e00000', '0:f000f:0:0', '0:f1c00:0:0', 'fe800:f0000:0:0', 'fc00000:f0000:0:0', 'fc00000:f000f:0:0', '0:f01e0:0:0', 'fc00000:c00f:0:0', 'fc00000:c000:0:0', 'fe800:c000:0:0', '0:dc00:0:0', '0:c00f:0:0'] },
        nl: { offset: 40, clock: 'HETKISAVIJFTIENBTZVOOROVERMEKWARTHALFSPWOVERVOORTHGÉÉNSTWEEPVCDRIEVIERVIJFZESZEVENONEGENACHTTIENELFTWAALFBFUUR', hr: ['37:3800000:0:0', '37:0:f:0', '37:0:780:0', '37:0:7800:0', '37:0:78000:0', '37:0:380000:0', '37:0:7c00000:0', '37:0:0:1e0', '37:0:0:1f', '37:0:0:1e00', '37:0:0:e000', '37:0:0:3f0000'], mi: ['0:0:0:7000000', '3c00780:0:0:0', '3c07800:0:0:0', '0:f01f:0:0', '3c7800:1e0:0:0', '3c0780:1e0:0:0', '0:1e0:0:0', '3c00780:1e0:0:0', '3c07800:1e0:0:0', '0:f001f:0:0', '3c7800:0:0:0', '3c0780:0:0:0'] },
        it: { offset: 25, clock: 'SONORLEBOREÉRĽUNASDUEZTREOTTONOVEDIECIUNDICIDODICISETTEQUATTROCSEICINQUESMENOECUNOQUARTOVENTICINQUEDIECIEMEZZA', hr: ['1e800:0:0:0', '1c006f:0:0:0', '1c0006f:0:0:0', '6f:0:7f:0', '6f:0:1f800:0', '6f:0:700:0', '6f:7c00000:0:0', 'e00006f:1:0:0', '6f:1e:0:0', '6f:3e0:0:0', '6f:fc00:0:0', '6f:3f0000:0:0'], mi: ['0:0:0:0', '0:0:400000:fc00', '0:0:400000:1f0000', '0:0:b400000:1f', '0:0:400000:3e0', '0:0:400000:ffe0', '0:0:400000:7c00000', '0:0:3c0000:ffe0', '0:0:3c0000:3e0', '0:0:b3c0000:1f', '0:0:3c0000:1f0000', '0:0:3c0000:fc00'] },
        es: { offset: 25, clock: 'ESONELASUNADOSITRESORECUATROCINCOSEISASIETENOCHONUEVEYOLADIEZSONCEDOCELYMENOSOVEINTEDIEZVEINTICINCOMEDIACUARTO', hr: ['763:0:0:0', '38ee:0:0:0', '780ee:0:0:0', 'fc000ee:0:0:0', 'ee:1f:0:0', 'ee:1e0:0:0', 'ee:7c00:0:0', 'ee:f0000:0:0', 'ee:1f00000:0:0', 'ee:0:3c:0', 'ee:0:780:0', 'ee:0:7800:0'], mi: ['0:0:0:0', '0:0:10000:f800', '0:0:10000:1e', '0:0:10000:7e00000', '0:0:f810000:1', '0:0:10000:ffe0', '0:0:10000:1f0000', '0:0:3e0000:ffe0', '0:0:fbe0000:1', '0:0:3e0000:7e00000', '0:0:3e0000:1e', '0:0:3e0000:f800'] },
        fr: { offset: 25, clock: 'ILNESTOUNERDEUXNUTROISQUATREDOUZECINQSIXSEPTHUITNEUFDIXONZERHEURESMOINSOLEDIXETRQUARTREDVINGT-CINQUETSDEMIEPAN', hr: ['3bb:0:3e0:0', '783b:0:7e0:0', '3e003b:0:7e0:0', 'fc0003b:0:7e0:0', '3b:1e0:7e0:0', '3b:e00:7e0:0', '3b:f000:7e0:0', '3b:f0000:7e0:0', '3b:f00000:7e0:0', '3b:7000000:7e0:0', '3b:0:7ef:0', '3b:1f:7e0:0'], mi: ['0:0:0:0', '0:0:0:7800', '0:0:380000:0', '0:0:ec00000:3', '0:0:0:3e0', '0:0:0:7fe0', '0:0:0:fb0000', '0:0:f800:7fe0', '0:0:f800:3e0', '0:0:e06f800:3', '0:0:38f800:0', '0:0:f800:7800'] },
        da: { offset: 35, clock: 'KLOKKENVEROFEMTYVESKLAOJEKVARTVATTIAMINUTTERVEMOVERILMFMONALISHALVETTOTREFIREFEMSEKSRSYVOTTERNIMETIELLEVEATOLV', hr: ['37f:0:1800:0', '37f:0:6000:0', '37f:0:38000:0', '37f:0:3c0000:0', '37f:0:1c00000:0', '37f:0:e000000:1', '37f:0:0:1c', '37f:0:0:1e0', '37f:0:0:c00', '37f:0:0:c000', '37f:0:0:3f0000', '37f:0:0:7800000'], mi: ['0:0:0:0', '3800:78ff00:0:0', '0:78ff60:0:0', 'e000000:780003:0:0', '3c000:78ff00:0:0', '3800:ff00:7a0:0', '0:0:780:0', '3800:78ff00:780:0', '3c000:ff00:20:0', 'e000000:3:20:0', '0:60:20:0', '3800:0:20:0'] },
        ru: { offset: 0, clock: 'СЕЙЧАСБДВАОЧЕТЫРЕДВЕПЯОДИННАДЦАТЬТРИДЕВОСЕМЬДЕСЯТЬФПЯТЬШЕСТЬОЧАСОВЧАСАЯДВАТРИПЯТНАДЦАТЬЛЬДЕСЯТСОРОКПЯТЬВФМИНУТ', hr: ['3f:0:3800:0', '3bf:0:7800:0', '3f:e0:7800:0', '1f83f:0:7800:0', '3f:7800000:7c0:0', '3f:0:7df:0', '3f:f000:7c0:0', '3f:fc00:7c0:0', '3f:380700:7c0:0', '3f:3f0000:7c0:0', 'fc0003f:1f:7c0:0', 'c0e003f:1f:7c0:0'], mi: ['0:0:0:0', '0:0:0:7cf0000', '0:0:0:7ce01c0', '0:0:fc00000:7c0000f', '0:0:8070000:7c0000f', '0:0:8070000:7cf000f', '0:0:8380000:7c0000f', '0:0:8380000:7cf000f', '0:0:0:7c0f800', '0:0:0:7cff800', '0:0:1c00000:7c007e0', '0:0:1c00000:7cf07e0'] },
        sv: { offset: 35, clock: 'KLOCKANVÄRKFEMYISTIONIKVARTQIENZOTJUGOLIVINAÖVERKONHALVETTUSCHXTVÅTREMYKYFYRAFEMSTWORSEXSJUÅTTAINIOTIOELVATOLV', hr: ['37f:0:7:0', '37f:0:700:0', '37f:0:3800:0', '37f:0:3c0000:0', '37f:0:1c00000:0', '37f:0:0:1c', '37f:0:0:e0', '37f:0:0:f00', '37f:0:0:e000', '37f:0:0:70000', '37f:0:0:780000', '37f:0:0:7800000'], mi: ['0:0:0:0', '3800:f0000:0:0', 'e0000:f0000:0:0', '7c00000:f0000:0:0', '0:f03e0:0:0', 'b800:7800000:0:0', '0:7800000:0:0', '3800:78f0000:0:0', '0:be0:0:0', '7c00000:1:0:0', '2e0000:0:0:0', 'b800:0:0:0'] },
        defaultLanguage: 'de'
    },
    animation: {
        stepCount: 30,
        stepDelay: 50,
        textColor: [46, 46, 46, 255, 255, 255],
        glowColor: [0, 0, 0, 255, 249, 174],
        glowSize: 5
    },
    current: {
        language: '',
        offset: 0,
        hrData: [],
        miData: [],
        minute: -1,
        animationStep: 0,
        litCells: [0, 0, 0, 0],
        lowerCells: $(),
        raiseCells: $()
    },
    clockTimer: 0,
    fadeTimer: 0
};

function initQlockTwo(lang, id) {
    var q2lang = q2.languages[lang];
    var q2_clock = q2lang.clock;
    var q2_id = id;
    q2.current.offset = q2lang.offset;
    q2.current.hrData = q2lang.hr;
    q2.current.miData = q2lang.mi;

    var q2div = $(q2_id);
    console.log("Q2 div ", q2div);

    for (var col = 0; col < 11; col++) {
        var column = $('<div/>', { 'id': 'q2_col_' + col, 'class': 'q2col' });
        for (var row = 0; row < 10; row++) {
            var cellNumber = (row * 11) + col + 1;
            var cellId = 'q2_' + cellNumber.toString(16);
            var cellText = q2_clock.charAt(cellNumber - 1);

            var newCell = $('<div/>', { 'id': cellId });
            if (cellText == 'o') {
                newCell.text('O');
                newCell.append($('<span/>', { 'class': 'q2quot' }).text('\u2019'));
            }
            else {
                newCell.text(cellText);
            }
            column.append(newCell);
        }
        q2div.append(column);
        column.insertBefore('#second');
    }
}

function parseCells(cell_text) {
    var parsed_cells = [0, 0, 0, 0];
    var split_cells = cell_text.split(':');
    for (var i = 0; i < 4; i++) { parsed_cells[i] = parseInt(split_cells[i], 16); }
    return parsed_cells;
}

function mergeCells(l_cells, r_cells) {
    var merged_cells = [0, 0, 0, 0];
    for (var i = 0; i < 4; i++) { merged_cells[i] = l_cells[i] | r_cells[i]; }
    return merged_cells;
}

function selectCells(cells) {
    var matchList = [];
    var offsets = [1, 29, 56, 84];
    for (var i = 0; i < 4; i++) {
        var cellSet = cells[i];
        var cellRange = 28 - (i % 2);
        var cellOffset = offsets[i];

        for (var j = 0; j < cellRange; j++) {
            if (cellSet & 1 == 1) {
                var cellId = j + cellOffset;
                matchList.push('#q2_' + cellId.toString(16));
            }
            cellSet >>>= 1;
        }
    }
    return $(matchList.join(','));
}

function changeCorners(currentMinute) {
    var x = Math.pow(2, currentMinute % 5) - 1;
    var pos = ['#q2UL', '#q2UR', '#q2BR', '#q2BL'];
    var q2c = q2.current;
    for (var i = 0; i < 4; i++) {
        var corner = $(pos[i]);
        var isLit = corner.hasClass('lit');
        var lightCorner = (x & 1 == 1); x >>>= 1;

        if (!lightCorner && isLit) { q2c.lowerCells = q2c.lowerCells.add(corner); }
        if (lightCorner && !isLit) { q2c.raiseCells = q2c.raiseCells.add(corner); }
    }
}

function changeCells(newLitCells) {
    var q2c = q2.current;
    var lower = [0, 0, 0, 0];
    var raise = [0, 0, 0, 0];

    for (var i = 0; i < 4; i++) {
        var oldCells = q2.current.litCells[i];
        var newCells = newLitCells[i];
        var keepCells = oldCells & newCells;
        lower[i] = oldCells ^ keepCells;
        raise[i] = newCells ^ keepCells;
    }

    q2c.litCells = newLitCells;
    q2c.lowerCells = q2c.lowerCells.add(selectCells(lower));
    q2c.raiseCells = q2c.raiseCells.add(selectCells(raise));
}

function currentTimeCells() {
    var currentTime = new Date();
    var currentMinute = Math.floor(currentTime.getMinutes() / 5);
    var currentHour = currentTime.getHours();

    if (currentHour === 0) { currentHour = 12; }
    if (((currentMinute * 5) + q2.current.offset) >= 60) { currentHour += 1; }
    if (currentHour > 12) { currentHour = currentHour - 12; }

    var hr_cells = parseCells(q2.current.hrData[currentHour - 1]);
    var mi_cells = parseCells(q2.current.miData[currentMinute]);
    return mergeCells(hr_cells, mi_cells);
}

function onFadeTimerCompleted() {
    clearInterval(q2.fadeTimer);
    q2.current.raiseCells.css({ 'color': '', 'text-shadow': '' }).addClass('lit');
    q2.current.lowerCells.css({ 'color': '', 'text-shadow': '' }).removeClass('lit');
    q2.current.raiseCells = $();
    q2.current.lowerCells = $();
}

function rgbConv(r1, g1, b1, r2, g2, b2, x, y) {
    var rx = Math.max(0, Math.min(255, Math.floor((r1 * x) + (r2 * y))));
    var gx = Math.max(0, Math.min(255, Math.floor((g1 * x) + (g2 * y))));
    var bx = Math.max(0, Math.min(255, Math.floor((b1 * x) + (b2 * y))));
    return 'rgb(' + rx + ',' + gx + ',' + bx + ')';
}

function onFadeTimerFired() {
    var tc = q2.animation.textColor;
    var gc = q2.animation.glowColor;
    var gs = q2.animation.glowSize;
    var x = (q2.animation.stepCount - q2.current.animationStep) / q2.animation.stepCount;
    var y = q2.current.animationStep / q2.animation.stepCount;

    var fadeI = rgbConv(tc[3], tc[4], tc[5], tc[0], tc[1], tc[2], x, y);
    var fadeO = rgbConv(tc[0], tc[1], tc[2], tc[3], tc[4], tc[5], x, y);
    var fadeGI = rgbConv(gc[3], gc[4], gc[5], gc[0], gc[1], gc[2], x, y);
    var fadeGO = rgbConv(gc[0], gc[1], gc[2], gc[3], gc[4], gc[5], x, y);
    var fadeSI = Math.max(1, Math.floor(gs * x));
    var fadeSO = Math.max(1, Math.floor(gs * y));

    if (q2.current.animationStep > 0) {
        q2.current.raiseCells.css({ 'color': fadeI, 'text-shadow': '0 0 ' + fadeSI + 'px ' + fadeGI });
        q2.current.lowerCells.css({ 'color': fadeO, 'text-shadow': '0 0 ' + fadeSO + 'px ' + fadeGO });
        q2.current.animationStep -= 1;
    }
    else {
        onFadeTimerCompleted();
    }
}

function abortFadeTimer() {
    if (q2.current.animationStep > 0) {
        q2.current.animationStep = 0;
        onFadeTimerCompleted();
    }
}

function startFadeTimer() {
    abortFadeTimer();
    q2.current.animationStep = q2.animation.stepCount;
    onFadeTimerFired();
    q2.fadeTimer = setInterval('onFadeTimerFired()', q2.animation.stepDelay);
}

function onClockTimerFired() {
    var currentTime = new Date();
    var currentMinute = currentTime.getMinutes();

    if (currentMinute != q2.current.minute) {
        q2.current.minute = currentMinute;
        changeCorners(currentMinute);
        if (currentMinute % 5 === 0) { changeCells(currentTimeCells()); }
        startFadeTimer();
    }
}
