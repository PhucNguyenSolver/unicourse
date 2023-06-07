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

Expression = _ expr:Ory _ { return expr }

Ory
	= head:Andy tail:(_  OR _ Andy)+ { return makeOp(Constants.OR,  head, tail) }
    /Andy

Andy
	= head:Term tail:(_ AND _ Term)+ { return makeOp(Constants.AND, head, tail) }
    / head:Term tail:(_ Term)+ { return makeOp(Constants.AND, head, tail) }
    / Term

Term
    = "(" _ expr:Expression _ ")" { return expr }
    / CourseType

CourseType
    = course:courseId _ "(" _ type:conditionType _ ")" { return makeCourse(course, type) }
    / course:courseId { return makeCourse(course) }


/* ----------- Lexemes ----------- */

AND = "và"i

OR = "hoặc"i

courseId "courseId"
    = chars:([a-zA-Z][a-zA-Z][0-9][0-9][0-9][0-9]) { return chars.join("").toUpperCase() }

conditionType
    = "HT"i { return Constants.HT }
    / "TQ"i { return Constants.TQ }
    / "SH"i { return Constants.SH }

_ "whitespace"
= [ \t\n\r]*