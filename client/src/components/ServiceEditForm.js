import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
// import * as yup from yup
import { object, string, number } from 'yup'

function ServiceEditForm({ updateService, serviceToEdit }) {
    const [error, setError] = useState()
    const navigate = useNavigate()

    // 10. Set up Formik / Yup - copy and paste from ServiceForm to get started
        // 10.1 Add initial values from our `serviceToEdit` prop to our intialValues object

    // 11. Make a PATCH request
            // 12. Handle errors the same way we did in ServiceForm

    return (
        <div >
            {/* Copy and paste the form from ServiceForm - its the exact same! */}
        </div>
    )
}

export default ServiceEditForm;