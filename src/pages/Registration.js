import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Registration = () => {
    const [selected, setSelected] = useState("six");

    const [userData, setUserData] = useState({
        username: "", // initialize with form values
        firstName: "", // initialize with form values
        lastName: "", // initialize with form values
        email: "", // initialize with form values
    });

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "9",
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        // Capture the transaction funds
        await actions.order.capture();

        // Create user in Firebase
        console.log("success");
    };

    return (
        <div className="h-full md:h-screen flex items-center justify-center">
            <div className="dark-bg rounded py-10 px-2 md:p-10 max-w-5xl w-full">
                <div className="text-center">
                    <h2 className="text-2xl font-medium uppercase text-white mb-3">
                        Create an account
                    </h2>
                    <p className="custom-gray text-sm max-w-3xl w-full m-auto px-5 md:p-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum nec rutrum nulla, sed finibus est. Proin
                        vitae justo consequat, accumsan ligula ac
                    </p>
                </div>
                <div className="flex w-full flex-col-reverse md:flex-row gap-10 mt-12 px-5">
                    <div className="form-container flex flex-col w-full max-w-full md:max-w-[40%]">
                        {/* <div className="info-price mb-5">
                            <div className="flex flex-row justify-between">
                                <h4 className="text-white">SELECTED PRICE</h4>
                                <h4 className="text-white text-[#0feb36]">
                                    $9.00
                                </h4>
                            </div>
                        </div> */}
                        <div className="form flex flex-col  gap-5">
                            <input
                                className=""
                                type="text"
                                placeholder="First name"
                            />
                            <input type="text" placeholder="Last name" />
                            <input type="text" placeholder="Username" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <div className="div">
                                <PayPalScriptProvider
                                    options={{ clientId: "test" }}
                                >
                                    <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </div>
                    <div className="plan-selection flex-flex-col w-full">
                        {/* Single Plan */}
                        <div
                            className={`flex ${
                                selected === "one" ? "selected-plan" : ""
                            } flex-col md:flex-row mb-5 gap-5 single-plan draw-bg rounded md:px-5 cursor-pointer items-center hover:translate-y-1 transition-all duration-300`}
                            onClick={() => setSelected("one")}
                        >
                            <div className="price flex flex-col pt-5 md:pt-0 text-2xl font-semibold text-[#0feb36]">
                                $10.00
                                <span className="text-xs text-center text-white">
                                    one time
                                </span>
                            </div>
                            <div className="flex flex-col text-center px-3 md:px-0 md:text-left py-5 border-t md:border-l md:pl-5 border-dotted border-[#8a8a8a]">
                                <h4 className="font-medium text-white mb-2 md:mb-0">
                                    1 MONTH PASS
                                </h4>
                                <p className="text-[#c7c7c7] text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Vestibulum nec rutrum
                                    nulla, sed finibus est. Vestibulum nec
                                    rutrum nulla, sed finibus est.
                                </p>
                            </div>
                        </div>
                        {/* Single Plan */}
                        <div
                            className={`flex ${
                                selected === "six" ? "selected-plan" : ""
                            } flex-col md:flex-row mb-5 gap-5 single-plan draw-bg rounded md:px-5 cursor-pointer items-center hover:translate-y-1 transition-all duration-300`}
                            onClick={() => setSelected("six")}
                        >
                            <div className="price flex flex-col pt-5 md:pt-0 text-2xl font-semibold text-[#0feb36]">
                                $29.00
                                <span className="text-xs text-center text-white">
                                    one time
                                </span>
                            </div>
                            <div className="flex flex-col text-center px-3 md:px-0 md:text-left py-5 border-t md:border-t-none md:border-l md:pl-5 border-dotted border-[#8a8a8a]">
                                <h4 className="font-medium text-white mb-2 md:mb-0">
                                    6 MONTHS PASS
                                </h4>
                                <p className="text-[#c7c7c7] text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Vestibulum nec rutrum
                                    nulla, sed finibus est. Vestibulum nec
                                    rutrum nulla, sed finibus est.
                                </p>
                            </div>
                        </div>
                        {/* Single Plan */}
                        <div
                            className={`flex ${
                                selected === "year" ? "selected-plan" : ""
                            } flex-col md:flex-row mb-5 gap-5 single-plan draw-bg rounded md:px-5 cursor-pointer items-center hover:translate-y-1 transition-all duration-300`}
                            onClick={() => setSelected("year")}
                        >
                            <div className="price flex flex-col pt-5 md:pt-0 text-2xl font-semibold text-[#0feb36]">
                                $49.00
                                <span className="text-xs text-center text-white">
                                    one time
                                </span>
                            </div>
                            <div className="flex flex-col text-center px-3 md:px-0 md:text-left py-5 border-t md:border-l md:pl-5 border-dotted border-[#8a8a8a]">
                                <h4 className="font-medium text-white mb-2 md:mb-0">
                                    1 YEAR PASS
                                </h4>
                                <p className="text-[#c7c7c7] text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Vestibulum nec rutrum
                                    nulla, sed finibus est. Vestibulum nec
                                    rutrum nulla, sed finibus est.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
