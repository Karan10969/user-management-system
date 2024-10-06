import Modal from 'react-modal'
import { useState } from 'react'

export default function UpdateUserForm({ show, user, setUserData }) {

    console.log(user.username)

    const [modalIsOpen, setIsOpen] = useState(show)
    const handleModalClose = () => setIsOpen(false)

    //user data for form
    const [uname, setName] = useState(user.name)
    const [uusername, setUsername] = useState("")
    const [uemail, setEmail] = useState(user.email)
    const [uphone, setphone] = useState(user.phone)
    const [uaddress, setAddress] = useState(user.address.street)
    const [ucompany, setCompany] = useState(user.company.name)
    const [uwebsite, setwebsite] = useState(user.website)


    //functions for handling input from the form
    const onUserChange = (e) => setUsername(e.target.value)
    const onNameChange = (e) => setName(e.target.value)
    const onEmailChange = (e) => setEmail(e.target.value)
    const onPhoneChange = (e) => setphone(e.target.value)
    const onAddressChange = (e) => setAddress(e.target.value)
    const onCompanyChange = (e) => setCompany(e.target.value)
    const onWebsiteChange = (e) => setwebsite(e.target.value)

    //error message for validations
    let errorMsg = null
    let canSave
    if ( uname.length < 3 || ucompany.length < 3) {
        errorMsg = "Too short, must be more than 3 characters"
    }

    if (!uname || !uemail || !uphone || !uaddress || !ucompany || !uwebsite) {
        errorMsg = null
        canSave = false
    } else {
        canSave = true
    }

    //submit form
    const updateUser = async() => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        name:uname, username:uname, email:uname, phone:uphone, address:uaddress, company:ucompany, website:uwebsite
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const data = await response.json()
                setUserData(data)
                setIsOpen(false)
                
        } catch(err){
            console.log(err)
            alert("Something went wrong")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateUser()
        
    }
    return (
        <Modal
            className="modal-form"
            isOpen={modalIsOpen}
            onRequestClose={handleModalClose}
            ariaHideApp={false}
        >
            <form onSubmit={handleSubmit}>
                <p>New User Form</p>

                <p className="error">{errorMsg}</p>

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-input"
                    required={true}
                    value={uname}
                    onChange={onNameChange}
                ></input>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    className="form-input"
                    required={true}
                    onChange={onUserChange}
                    value={user.username || ""}
                ></input>

                <label htmlFor="email">email</label>
                <input
                    type="email"
                    id="email"
                    className="form-input"
                    required={true}
                    onChange={onEmailChange}
                    value={uemail}
                ></input>

                <label htmlFor="phone">phone</label>
                <input
                    type="text"
                    id="phone"
                    className="form-input"
                    pattern="[1-9]{1}[0-9]{9}"
                    required={true}
                    onChange={onPhoneChange}
                    value={uphone}
                    placeholder="Ex: 9002233990(10Digits)"
                ></input>


                <label htmlFor="address" >address (Street and City)</label>
                <input
                    type="text"
                    id="address"
                    className="form-input"
                    required={true}
                    onChange={onAddressChange}
                    value={uaddress}
                ></input>

                <label htmlFor="company">company</label>
                <input
                    type="text"
                    id="company"
                    className="form-input"
                    onChange={onCompanyChange}
                    value={ucompany}
                ></input>

                <label htmlFor="website">website</label>
                <input
                    type="text"
                    id="website"
                    className="form-input"
                    onChange={onWebsiteChange}
                    value={uwebsite}
                ></input>

                <button disabled={!canSave}>Save</button>

            </form>
        </Modal>
    )
}