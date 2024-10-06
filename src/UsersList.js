import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from 'react-modal'

export default function UsersList() {
    const navigate = useNavigate()

    const [allUsers, setAllUsers] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)

    //user data for form
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setphone] = useState('')
    const [address, setAddress] = useState('')
    const [company, setCompany] = useState('')
    const [website, setwebsite] = useState('')


    //functions for handling input from the form
    const onUserChange = (e) => setUsername(e.target.value)
    const onNameChange = (e) => setName(e.target.value)
    const onEmailChange = (e) => setEmail(e.target.value)
    const onPhoneChange = (e) => setphone(e.target.value)
    const onAddressChange = (e) => setAddress(e.target.value)
    const onCompanyChange = (e) => setCompany(e.target.value)
    const onWebsiteChange = (e) => setwebsite(e.target.value)



    // functions for handling modals
    const handleModalOpen = () => setIsOpen(true)
    const handleModalClose = () => setIsOpen(false)


    // getting all the users
    const getAllUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            setAllUsers(data)
        }
        catch (err) {
            alert("Something went wrong!")
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])


    // view button click
    const onViewBtnClick = (id) => {
        navigate(`${id}`)
    }

    // for mapping data into the table
    const usersTableData = allUsers.map(user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                    <button
                        className="button"
                        onClick={() => onViewBtnClick(user.id)}
                    >View/Edit/Delete</button>
                </td>
            </tr>
        )
    })

    //error message for validations
    let errorMsg = null
    let canSave
    if(username.length < 3 || name.length < 3 || company.length < 3){
        errorMsg = "Too short, must be more than 3 characters"
    }

    if(!username || !name || !email ||!phone || !address || !company || !website ){
        errorMsg = null
        canSave = false
    } else {
        canSave = true
    }

    //submit form
    const addNewuser = async() => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name, username, email, phone, address, company, website
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const data = await response.json()
                setAllUsers( prev => [...prev, data] )
                setIsOpen(false)
        } catch(err){
            console.log(err)
            alert("Something went wrong")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewuser()
        
    }


    return (
        <>
            <button onClick={handleModalOpen} className="button">Add New User</button>
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
                        value={name}
                        onChange={onNameChange}
                    ></input>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        required={true}
                        onChange={onUserChange}
                        value={username}
                    ></input>

                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        required={true}
                        onChange={onEmailChange}
                        value={email}
                    ></input>

                    <label htmlFor="phone">phone</label>
                    <input
                        type="text"
                        id="phone"
                        className="form-input"
                        pattern="[1-9]{1}[0-9]{9}"
                        required={true}
                        onChange={onPhoneChange}
                        value={phone}
                        placeholder="Ex: 9002233990(10Digits)"
                    ></input>


                    <label htmlFor="address" >address (Street and City)</label>
                    <input
                        type="text"
                        id="address"
                        className="form-input"
                        required={true}
                        onChange={onAddressChange}
                        value={address}
                    ></input>

                    <label htmlFor="company">company</label>
                    <input
                        type="text"
                        id="company"
                        className="form-input"
                        onChange={onCompanyChange}
                        value={company}
                    ></input>

                    <label htmlFor="website">website</label>
                    <input
                        type="text"
                        id="website"
                        className="form-input"
                        onChange={onWebsiteChange}
                        value={website}
                    ></input>

                    <button disabled={!canSave}>Save</button>

                </form>
            </Modal>




            {/* For displaying user*/}
            {allUsers.length !== 0 ?
                <div className="all-users-container">
                    <table className="all-users-table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>email</th>
                                <th>phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersTableData}
                        </tbody>
                    </table>
                </div>
                :
                <p>Loading</p> // add a loader
            }
        </>
    )
}