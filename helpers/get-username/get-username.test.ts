import {getUsername} from "./get-username";

const testCases = [
    {
        test: "ankanbhattacharya89@gmail.com",
        result: "ankanbhattacharya89_gal"
    },
    {
        test: "ankanbhattacharya117@gmail.com",
        result: "ankanbhattacharya117_gal"
    },
    {
        test: "bhatirinki37@gmail.com",
        result: "bhatirinki37_gal"
    },
    {
        test: "aditya.s.rastogi@gmail.com",
        result: "aditya.s.rastogi_gal"
    },
    {
        test: "pallavi_c@gmail.com",
        result: "pallavi_c_gal"
    }
];

testCases.map((testCase) => {
    test(`Username creation for ${testCase.test}`, () => {
        expect(getUsername(testCase.test)).toBe(testCase.result);
    });
});