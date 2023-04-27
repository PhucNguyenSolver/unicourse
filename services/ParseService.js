export const ParseService = {
  parse(input) {
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

  validate(input) {
    const parsedResult = ParseService.parse(input)
    if (parsedResult.error) return false
    return true
  }
}
