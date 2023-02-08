import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../admin/Admin.css'
function Admin() {
    const [search, setSearch] = useState("")
    const [userDetails, setDetails] = useState([])
    const [pageno, setPageno] = useState(1)
    const [perpage, setPerpage] = useState(5)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")
    const [position, setPosition] = useState("")
    const lastindex = pageno * perpage
    const firstindex = lastindex - perpage
    const detailsarray = userDetails.slice(firstindex, lastindex)
    const navigate = useNavigate()



    const decreement = () => {
        if (pageno <= 1) {
            return
        }
        const currpage = pageno - 1
        setPageno(currpage)

    }
    const increement = () => {
        if (lastindex > userDetails.length) {
            return
        }
        const currpage = pageno + 1
        setPageno(currpage)

    }
    const searchSubmit = () => {
        setSearch("")
    }
    const authorised = async (e, f) => {
        var data = {
            authorised: !f
        }
        let res = await axios.post('http://localhost:8080/auth/setAuthorised/' + e, data)
        if (res.data.success) {
            loaddata()
            console.log(res.data.message)
        }
    }
    const deletebutton = async (e) => {
        let res = await axios.delete('http://localhost:8080/auth/deleteUser/' + e)
        if (res.data.success) {
            console.log(res.data.message)
            loaddata()
        }
    }
    const loaddata = async () => {
        let res = await axios.get('http://localhost:8080/auth/getUsers')
        console.log(res.data.message)
        setDetails(res.data.value)
    }
    const editbutton = async (e) => {
        setId(e)
        let res = await axios.get('http://localhost:8080/auth/getEditDataUser/' + e)
        if (res.data.success) {
            setName(res.data.value.name)
            setEmail(res.data.value.email)
            setPhone(res.data.value.phone)
            setPosition(res.data.value.position)
        }
    }
    const saveChanges = async () => {
        console.warn(position)
        const data = {
            name: name,
            email: email,
            phone: phone,
            position: position
        }
        let res = await axios.put('http://localhost:8080/auth/editUser/' + id, data)
        if (res.data.success) {
            setName("")
            setEmail("")
            setPhone("")
            setPosition("")
            setId("")
            loaddata()
            console.log(res.data.message)
        }
    }
    useEffect(() => {
        loaddata()
    }, [])
    return (
        <main>
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="ex3-tab-1" data-mdb-toggle="pill" href="#ex3-pills-1" role="tab" aria-controls="ex3-pills-1" aria-selected="true">Employees</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="ex3-tab-2" data-mdb-toggle="pill" href="#ex3-pills-2" role="tab" aria-controls="ex3-pills-2" aria-selected="false">Inventory</a>
                </li>
            </ul>
            {/* Pills navs */}
            {/* Pills content */}
            <div className="tab-content" id="ex2-content">
                <div className="tab-pane fade show active" id="ex3-pills-1" role="tabpanel" aria-labelledby="ex3-tab-1">
                    <div className="input-group">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <label className="form-label" htmlFor="form1" Style="margin-left: 0px;">Search</label>
                            <div className="form-notch"><div className="form-notch-leading" Style="width: 9px;"></div><div className="form-notch-middle" Style="width: 47.2px;"></div><div className="form-notch-trailing"></div></div></div>
                        <button type="button" className="btn btn-primary" fdprocessedid="f6uw0n" onClick={searchSubmit}>
                            <i Style={"color: white;font-size: 14px"} className="fas fa-search"></i>
                        </button>
                    </div>
                    <section className="w-100 p-4 table-responsive">
                        {userDetails == 0 ?
                            <div>
                                <div Style={"margin: 2rem auto;display: block;"} className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>

                                </div>
                                <h2 className="text-center">Hold On While We Are Fetching Data</h2>
                            </div>

                            :
                            <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Details</th>
                                        <th>Status</th>
                                        <th>Position</th>
                                        <th>Actions</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userDetails.length === 0 ?
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            detailsarray.filter((curr) => {
                                                if (search == '') {
                                                    return curr
                                                }
                                                else if (curr.name.toLowerCase().includes(search)) {
                                                    return curr
                                                }
                                                else {
                                                    return ""
                                                }
                                            }).map((curr, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <div className="ms-3">
                                                            <p className="fw-bold mb-1">{curr._id}</p>
                                                            <p className="text-muted mb-0">{curr.name}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="fw-normal mb-1">{curr.phone}</p>
                                                        <p className="text-muted mb-0">{curr.email}</p>
                                                    </td>
                                                    <td>
                                                        {curr.authorised == false ?
                                                            <span className="badge badge-danger rounded-pill d-inline">Locked</span>
                                                            :
                                                            <span className="badge badge-success rounded-pill d-inline">Unlocked</span>}


                                                    </td>
                                                    <td>{curr.position}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-link btn-sm btn-rounded" fdprocessedid="6h64z" data-mdb-toggle="modal" data-mdb-target="#exampleModal" onClick={(() => editbutton(curr._id))}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button type="button" className="btn btn-link btn-sm btn-rounded" fdprocessedid="6h64z" onClick={(() => deletebutton(curr._id))}>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        {curr.authorised == false ?
                                                            <button type="button" className="btn btn-link btn-sm btn-rounded" fdprocessedid="6h64z" onClick={(() => authorised(curr._id, curr.authorised))}>
                                                                <i className="fa-solid fa-toggle-off"></i>
                                                            </button>
                                                            :
                                                            <button type="button" className="btn btn-link btn-sm btn-rounded" fdprocessedid="6h64z" onClick={(() => authorised(curr._id, curr.authorised))}>
                                                                <i className="fa-solid fa-toggle-on"></i>
                                                            </button>
                                                        }

                                                    </td>
                                                </tr>
                                            })
                                    }

                                </tbody>

                            </table>
                        }
                    </section>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Employee</h5>
                                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Email</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Phone</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <label for="exampleInputEmail1" class="form-label">Position</label>
                                    <select class="form-select mb-3" value={position} onChange={(e) => setPosition(e.target.value)}>
                                        <option value="Admin" >Admin</option>
                                        <option value="Employee" >Employee</option>
                                        <option value="Inventory"  >Inventory</option>
                                    </select>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" data-mdb-dismiss="modal" onClick={saveChanges}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {userDetails == 0 ? ""
                        :
                        <nav Style={{ display: 'block', margin: '1rem auto' }} aria-label="...">
                            <ul className="pagination" Style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                                <li className="page-item ">
                                    <a className="page-link" onClick={decreement}><i className="fa-solid fa-minus"></i></a>
                                </li>
                                <li className="page-item active" aria-current="page">
                                    <a className="page-link">{pageno} <span className="visually-hidden">(current)</span></a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" onClick={increement}><i className="fa-solid fa-plus"></i></a>
                                </li>
                            </ul>
                        </nav>}
                </div>
                <div className="tab-pane fade" id="ex3-pills-2" role="tabpanel" aria-labelledby="ex3-tab-2">
                    Tab 2 content
                </div>
            </div >
            {/* Pills content */}
        </main >
    )
}

export default Admin