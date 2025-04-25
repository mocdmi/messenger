type PlainObject<T = unknown> = {
    [k in string]: T;
};

type ArrayOrObject = PlainObject | unknown[];

function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is PlainObject | unknown[] {
    return isPlainObject(value) || isArray(value);
}

export default function isEqual<T extends object>(
    lhs: T | ArrayOrObject,
    rhs: T | ArrayOrObject,
): boolean {
    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = (rhs as PlainObject)[key];

        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}
