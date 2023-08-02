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
    const formSchema = object({
        name: string().required('Please enter a service name'),
        price: number().positive()
    })

    const formik = useFormik({
        initialValues: {
            name: serviceToEdit.name,
            price: serviceToEdit.price
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            // 11. Make a PATCH request
            // 12. Handle errors the same way we did in ServiceForm
            fetch(`http://localhost:5555/services/${serviceToEdit.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(service => {
                        updateService(service)
                        navigate('/services')
                    })
                } else {
                    res.json().then(error => setError(error.message))
                }
            })
        }
    })


    return (
        <div >
            <form className="form service-form" onSubmit={formik.handleSubmit}>
                
                {/* 8. Display errors from formik/yup */}
                { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }

                {/* 9.3 Display errors from backend after submitting form */}
                { error && <p>{error}</p>}

                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input 
                        type="number" 
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />
                </div>

                <input type='submit' className="submit-btn" />
            </form>
        </div>
    )
}

export default ServiceEditForm;