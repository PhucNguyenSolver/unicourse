import React from "react"

const LoadingButton = (props) => {
    let { loading = true, title = "title", onClick = () => {} } = props
    if (loading)
        return (
            <button className="btn border border-dark" disabled>
                <span className="spinner-border spinner-border-sm"></span> {title}
            </button>
        )
    else
        return (
            <button className="btn border border-dark" onClick={onClick}>
                {title}
            </button>
        )
}

export default LoadingButton
