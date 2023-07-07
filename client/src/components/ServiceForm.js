import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
// import * as yup from yup
import { object, string, number } from 'yup'

function ServiceForm({ addService }) {
    const [error, setError] = useState()
    const navigate = useNavigate()

    // 7. Use yup for client side validations
        // 7.1 Call the yup `object` function, passing an object as an argument
        // 7.2 This object's keys are the form inputs we want to validate
        // 7.3 Pass the object we create into `useFormik` as a key called `validationSchema`

    // 6. Set up useFormik hook
        // 6.1 useFormik takes an object as an argument
        // 6.2 that object needs to have a key of `initialValues` - it must be this name (no bananas)
        // 6.3 Fill in the initialValues object with all of your input names
        // 6.4 Add a `value` and `onChange` to each input
            // value={formik.values.___}
            // onChange={formik.handleChange}
        // 6.4 Add an `onSubmit` key, with a function as the value - this function will handle our fetch
            // 6.4.1 Pass `formik.handleSubmit` as the `onSubmit` prop to our form element
        // 6.5 Add our service to service state in App.js, using the `addService` prop
        // 6.6 Navigate to /services

    // 9. Set up error handling for errors from the backend
        // 9.1 Check if `res.ok` - if yes, carry on as normal
            // 9.2 if no, set the error in state

    return (
        <div >
            <form className="form service-form">
                
                {/* 8. Display errors from formik/yup */}
                
                {/* 9.3 Display errors from backend after submitting form */}

                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input 
                        type="number" 
                        name="price"
                    />
                </div>

                <input type='submit' className="submit-btn" />
            </form>
        </div>
    )
}

export default ServiceForm;