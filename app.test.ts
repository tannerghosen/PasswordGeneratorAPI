import { ValidatePassword, GeneratePassword } from "./app";

describe('Validate Password', () =>
{
    it("it should be strong", () =>
    {
        expect(ValidatePassword("asddasdasd3123123123$##@@BOB")).toEqual("This password is strong.")
    });
});

describe('Validate Password 2', () =>
{
    it("it should be not strong", () =>
    {
        expect(ValidatePassword("a")).toEqual("Sorry, this password isn't strong. A strong password should be a minimum of 8 characters but no longer than 32 and contain an uppercase, lowercase, digit, and special character and no excessive repeating characters.")
    });
});


describe('Generate Password', () =>
{
    it("it should generate a 10 length pass", () =>
    {
        expect(GeneratePassword(10)).toHaveLength(10);
    });
});

describe('Generate Password 2', () =>
{
    it("it should generate a 16 length pass", () =>
    {
        expect(GeneratePassword(16)).toHaveLength(16);
    });
});