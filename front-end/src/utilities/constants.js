const DAY = 1;
const FIVE_DAYS = 5;
const TWO_WEEKS = 14;
export const tabIdToDays = (id) => {
    switch (id) {
        case 1:
            return DAY;
        case 2:
            return FIVE_DAYS;
        case 3:
            return TWO_WEEKS;
        default:
            return 0;
    }
}