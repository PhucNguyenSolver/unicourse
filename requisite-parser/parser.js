import peg from "pegjs"
import grammar from "raw-loader!./grammar.pegjs"

let parser = peg.generate(grammar)

// Tests

export function tryParse(input) {
    try {
        const result = parser.parse(input)
        return {
            data: JSON.stringify(result),
            error: null,
        }
    } catch (e) {
        return {
            data: null,
            error: e.message,
        }
    }
}

function test(input) {
    let result = tryParse(input)
    console.log(result)
    return result
}

// test("CO1032-HT")
// test("and")
// test("CO1007 and CO1021 and (CO1007 or CO1021)")
