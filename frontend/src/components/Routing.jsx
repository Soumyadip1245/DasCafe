import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
function Routing(props) {
    const navigate = useNavigate()
    const Component = props.component

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/')
        }
        else {
            const token = localStorage.getItem("token")
            const decode = jwt_decode(token)
            const position = decode.position
            if (position === "Admin") {
                navigate('/admin')
            }
            else if (position === 'Inventory') {
                navigate('/inventory')
            }
            else if (position === 'Employee') {
                navigate('/employee')
            }
        }

    }, [])
    return (
        <>
            <Component />
        </>
    )
}

export default Routing