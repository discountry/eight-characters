import EightCharacters from "./eight-characters";
import { test, expect, it } from 'vitest';

test("EightCharacters", () => {
  expect(EightCharacters).toBeDefined();
});

it("should work", (ctx) => {
  // prints name of the test
  const mybazi = new EightCharacters(1990, 5, 20, 12, 1);
  console.log(mybazi);

  console.log(mybazi.qiYun());

  console.log(mybazi.liuNianTable());

  console.log(mybazi.bazi());

  console.log(mybazi.shiShenTable());

  console.log(mybazi.daYun());

  console.log(mybazi.naYinTable());
});