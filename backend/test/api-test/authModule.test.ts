import { test, expect } from "vitest";

function getSum(a:number, b:number) {
    return a + b;
}

test("expect 5 + 5 = 10", () => {
    expect(getSum(5, 5)).toBe(10);
})
