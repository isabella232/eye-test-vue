let currentColor = {
    r: parseInt(256 * Math.random(), 0),
    g: parseInt(256 * Math.random(), 0),
    b: parseInt(256 * Math.random(), 0),
};

function getColorDiffPercentage(stage) {
    if (stage <= 5) {
        return 15;
    } else if (stage <= 10) {
        return 12;
    } else if (stage <= 15) {
        return 9;
    } else if (stage <= 20) {
        return 7;
    } else if (stage <= 25) {
        return 5;
    } else if (stage <= 30) {
        return 4;
    } else if (stage <= 35) {
        return 3;
    } else {
        return 2;
    }
}

function toHex(d) {
    return ("0" + (Number(d).toString(16))).slice(-2).toUpperCase();
}

export function getNextColor(stage) {
    currentColor.r += parseInt(255 * Math.random());
    currentColor.g += parseInt(255 * Math.random());
    currentColor.b += parseInt(255 * Math.random());
    if (currentColor.r > 255) {
        currentColor.r = Math.abs(currentColor.r - 255);
    }
    if (currentColor.g > 255) {
        currentColor.g = Math.abs(currentColor.r - 255);
    }
    if (currentColor.b > 255) {
        currentColor.b = Math.abs(currentColor.r - 255);
    }

    let diffR = parseInt((255 * getColorDiffPercentage(stage) / 100), 0);
    let diffG = parseInt((255 * getColorDiffPercentage(stage) / 100), 0);
    let diffB = parseInt((255 * getColorDiffPercentage(stage) / 100), 0);
    if (diffR + currentColor.r > 255) {
        diffR = -diffR
    }
    if (diffG + currentColor.g > 255) {
        diffG = -diffG
    }
    if (diffB + currentColor.b > 255) {
        diffB = -diffB
    }

    const answerColor = {
        r: currentColor.r + diffR,
        g: currentColor.g + diffG,
        b: currentColor.b + diffB,
    };

    return {
        basicColor: `#${toHex(currentColor.r)}${toHex(currentColor.g)}${toHex(currentColor.b)}`,
        answerColor: `#${toHex(answerColor.r)}${toHex(answerColor.g)}${toHex(answerColor.b)}`,
    }
}
