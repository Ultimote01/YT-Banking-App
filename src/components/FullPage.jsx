
const fullPageStyle = {
     height: '100vh',
    backgroundColor: "rgba(12, 10, 14, 0.966)",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export default function  FullPage({children}) {
    return(
        <div style={fullPageStyle}>{children}</div>
    )
}