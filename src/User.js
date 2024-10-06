import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Modal from 'react-modal'
import UpdateUserForm from "./UpdateUserForm"


export default function User() {
    const { id } = useParams()

    const [userData, setUserData] = useState()
    const [showEditForm, setShowEditForm] = useState(false)

    //getting single user with the id
    const getUserWithId = async () => {
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            const data = await response.json()
            setUserData(data)
        } catch(err){
            console.log(err)
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getUserWithId()
    }, [])


    //handling form submit
    const onEditClicked =() => {
        setShowEditForm(prev => !prev)
    }

    const deleteUser = async () => {
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'DELETE'
            })
            const data = await response.json()
            alert('user deleted')
        } catch(err){
            console.log(err)
            alert("something went wrong")
        }
    }

    const onDeleteClicked = () => {
        deleteUser()
    }

    

    return (
        <>
            {userData ?
                <>
                    <div className="user-data">

                        <div>Name: {userData.name}</div>
                        <div>Username: {userData.username}</div>
                        <div>Full address: Street: {userData.address.street} city: {userData.address.city} </div>
                        <div>Phone Number: {userData.phone}</div>
                        <div>Company Name: {userData.company.name}</div>
                        <div>Website: {userData.website}</div>

                        <button className="button" onClick={onEditClicked}>Edit</button>
                        <button className="button" onClick={onDeleteClicked}>Delete</button>

                    </div>

                    {showEditForm ? <UpdateUserForm show={true} user={userData} setUserData={setUserData} /> : null}
                </>
                :
                <p>loading...</p>
            }
        </>
    )
}