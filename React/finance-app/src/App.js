import React, {useState,useEffect} from "react"
import api from '/api'

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState(({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
    }));

    const fetchTransaction = async () => {
        const response = await api.get('/transactions');
        setTransactions(response.data)

    };

    useEffect(() => {
        fetchTransaction();
        }, []);

    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/transactions/', formData);
        fetchTransaction();
        setFormData({
            amount: '',
            category: '',
            description: '',
            is_income: false,
            date: ''
        });
    };

    return (
        <div>
            <nav className='navbar navbar-dark bg-primary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href = '#'>
                        Finance app
                    </a>
                </div>
            </nav>

            <div className='container'>
                <form onSubmit={handleFormSubmit}>
                    <div className='mb-3 mt-3'>
                        <label htmlFor='amount' className='form-label'>
                            Amount
                        </label>
                        <input type='text' className='form-control' id='amount' name='amount'
                               onChange={handleInputChange} value={formData.amount}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='category' className='form-label'>
                            Category
                        </label>
                        <input type='text' className='form-control' id='category' name='category'
                               onChange={handleInputChange} value={formData.category}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>
                            Description
                        </label>
                        <input type='text' className='form-control' id='description' name='description'
                               onChange={handleInputChange} value={formData.description}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='is_income' className='form-label'>
                            Income?
                        </label>
                        <input type='checkbox' className='form-control' id='is_income' name='is_income'
                               onChange={handleInputChange} value={formData.is_income}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='date' className='form-label'>
                            Date
                        </label>
                        <input type='text' className='date' id='date' name='date'
                               onChange={handleInputChange} value={formData.date}/>
                    </div>

                    <buton type = 'submit' className= 'btn btnprimary'>
                        Submit
                    </buton>


                </form>

                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Desciption</th>
                        <th>Income?</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                    {transactions.map((transactions) => (
                        <tr key={transaction.id}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                            <td>{transaction.date}</td>

                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default App;
