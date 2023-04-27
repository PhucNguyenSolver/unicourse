// Simple Arithmetics Grammar
// ==========================
//
// Accepts expressions like "2 * (3 + 4)" and computes their value.

{
    // Constants defined in service
    let Constants = {
        AND: "AND",
        OR: "OR",
        TQ: 1,
        HT: 2,
        SH: 3,  
    }

    function makeOp(OP, head, tail) {
        // TODO
        let leaves = tail.reduce(
            (acc, next) => { return [...acc, next[3]] },
            [head]
        )
        return ({
            op: OP,
            leaves
        })
    }

    function makeCourse(courseId, conditionType = Constants.TQ) {
        return ({
            course: {
                type: conditionType,
                courseDesId: courseId
            }
        })
    }
}

/* ----------- AST ----------- */

Expression = _ expr:TrimmedExpression _ { return expr }

TrimmedExpression
    = head:Term tail:(_ AND _ Term)+ { return makeOp(Constants.AND, head, tail) }
    / head:Term tail:(_  OR _ Term)+ { return makeOp(Constants.OR,  head, tail) }
    / Term

Term
    = "(" _ expr:Expression _ ")" { return expr }
    / CourseType

CourseType
    = course:courseId _ "-" _ type:conditionType { return makeCourse(course, type) }
    / course:courseId { return makeCourse(course) }


/* ----------- Lexemes ----------- */

AND = "AND"i

OR = "OR"i

courseId "courseId"
    = (AND / OR) { expected("courseId") }
    / chars:[a-zA-Z0-9]+ { return chars.join("").toUpperCase() }

conditionType
    = "HT"i { return Constants.HT }
    / "TQ"i { return Constants.TQ }
    / "SH"i { return Constants.SH }

_ "whitespace"
= [ \t\n\r]*