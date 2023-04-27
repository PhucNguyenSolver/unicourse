import { tryParse } from '../requisite-parser/parser';

export const ParseService = {
  mockParse(input) {
    if (input == "and" || input == "or")
    return {
      data: null,
      error: "Expected ..."
    }

    return {
      data: {
        op: "AND",
        leaves: "...",
      },
      error: null
    }
  },

  parse(input) {
    return tryParse(input)
  },
  
  validate(input) {
    const parsedResult = ParseService.parse(input)
    if (parsedResult.error) return false
    return true
  }
}
