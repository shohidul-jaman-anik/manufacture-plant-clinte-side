import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    const [products, setProducts] = useState([])
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            const url=`http://localhost:5000/orders?email=${user.email}`
            console.log(url)
            fetch(url)
                .then(res => res.json())
                .then(data => setProducts(data))
        }
    }, [user])

    if (loading) {
        return <Loading></Loading>
    }

  

    return (
        <div>
            <h1>{products.length}</h1>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>MOQ</th>
                            <th>Address</th>
                            <th>Number</th>
                            <th>Delete Order</th>
                            <th>Paid Order</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product,index) => <tr>
                            <th>{index+1}</th>
                            <th>{product.name}</th>
                            <td>{product.productName}</td>
                            <td>{product.MOQ}</td>
                            <td>{product.address}</td>
                            <td>{product.number}</td>
                            <td > ❌ </td>
                            <td>💳</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;