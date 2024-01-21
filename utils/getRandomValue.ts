export type GetRandomValueOptions = {
    min: number,
    max: number,
    decimalPlaces?: number
}

export function getRandomValue({ min, max, decimalPlaces = 0 }: GetRandomValueOptions): number {
    if (decimalPlaces < 0) {
        decimalPlaces = 0; // Ensure non-negative decimal places
    }

    if (min > max) {
        return (min + max) / 2;
    }


    const randomValue = Math.random() * (max - min) + min;

    return Number(randomValue.toFixed(decimalPlaces));
}

