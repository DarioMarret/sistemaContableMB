import React from 'react';
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { withRouter } from "react-router-dom";


const PromiseStripe = loadStripe('pk_test_51HzCfKIUXK91B6BdDh57DKt8DWsbOMzW0cQ4OxG6ERbXMfG12oNzpoej4UbA0xdYgSlFkitGrsMyMWjxnR9EhxyO00NnwYBTLy')

const FormValidaTion = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if (!error) {
            const { id } = paymentMethod;
            try {
                const { data } = await axios.post("http://34.196.59.251:4000/plan/suscripcion",
                {
                    id,
                    amount: 2000,
                });
                console.log(data); 
                elements.getElement(CardElement).clear()    
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card card-body">
            <CardElement className="form-control" />
            <button className="btn btn-susscess">
                Cargar
        </button>
        </form>
    )
}


function RegistrarSuscripcion(props) {
    return (
        <div className="container p-4">
            <div style={{ height: '150px' }} />
            <h3 className="text-center" style={{ fontWeight: "bold" }}>Elige uno de los siguente plan</h3>
            <div className="row">
                <div className="col-md-4 ">
                    <div className="card card-header" style={{height:'150px', background:'#33FFF9'}}>
                        <h1 className="text-center">$20</h1>
                    </div>
                    <Elements stripe={PromiseStripe}>
                        <FormValidaTion />
                    </Elements>
                </div>

                {/*<div className="col-md-4 ">
                    <div className="card card-header" style={{height:'150px', background:'#33FFF9'}}>
                        <h1 className="text-center">$30</h1>
                    </div>
                    <Elements stripe={PromiseStripe}>
                        <FormValidaTion />
                    </Elements>
                </div>
                <div className="col-md-4 ">
                    <div className="card card-header  " style={{height:'150px', background:'#33FFF9'}}>
                        <h1 className="text-center">$60</h1>
                    </div>
                    <Elements stripe={PromiseStripe}>
                        <FormValidaTion />
                    </Elements>
                </div>*/}
            </div>
        </div>
    );
}

export default withRouter(RegistrarSuscripcion);