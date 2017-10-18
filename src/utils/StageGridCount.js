export function getGridCount(stage) {

    if (stage > 40) {
        return 12;
    }

    return parseInt((stage / 5) + 3, 0)

}
