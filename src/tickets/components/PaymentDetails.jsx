import React from "react";
import { useRef, useState } from "react";
import { useCreditCardValidator, images } from "react-creditcard-validator";
import { confirmReservation, insertOrder } from "../../database";

function PaymentDetails(props) {
  const theForm = useRef(null);
  // console.log(props.guestInfo[0].name);
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta: { erroredInputs },
  } = useCreditCardValidator();

  function saveBillingInfo(e) {
    e.preventDefault();
    const address = [];

    address.push({
      // name: theForm.current.elements.fullname.value,
      // email: theForm.current.elements.email.value,
      // phonenumber: theForm.current.elements.phone.value,

      streetname: theForm.current.elements.street.value,
      apartment: theForm.current.elements.apartment.value,
      city: theForm.current.elements.city.value,
      country: theForm.current.elements.country.value,
      // basket: props.
    });
    props.setBilling(address);
    insertOrder({
      fullname: theForm.current.elements.mainname.value,
      email: theForm.current.elements.email.value,
      phone: theForm.current.elements.phone.value,
      address: address,
      ticketOwners: props.guestInfo,
      basketContent: props.basket,
    });
    // console.log(props.billing);
    // console.log(props.idValue);
    confirmReservation({ id: props.idValue });
  }

  return (
    <div id="productList" className="box">
      <h2>Billing details</h2>
      <form ref={theForm} onSubmit={(e) => {
            saveBillingInfo(e);
            props.changePage({
              preventDefault: () => {},
              target: {
                name: "next",
              },
            });
          }}>
        <div>
          <h3>Personal details</h3>
          <section className="formInput">
            <label htmlFor="form-mainname" className="labelGuestList">
              Full Name
            </label>
            <div className="formInputCont ">
              <div>
                <input
                  defaultValue={""}
                  type="text"
                  name="mainname"
                  id="form-mainname"
                  placeholder="e.g. Harry Truman"
                  required
                />{" "}
              </div>
            </div>
          </section>
          <section className="formInput">
            <label htmlFor="form-email" className="labelGuestList">
              Email address
            </label>{" "}
            <div className="formInputCont ">
              <div>
                <input
                  defaultValue={""}
                  type="email"
                  name="email"
                  id="form-email"
                  placeholder="example@example.com"
                  required
                />{" "}
              </div>
            </div>
          </section>
          <section className="formInput">
            {" "}
            <label htmlFor="form-phone" className="labelGuestList">
              Phone number
            </label>{" "}
            <div className="formInputCont ">
              <div>
                <input
                  defaultValue={""}
                  type="number"
                  name="phone"
                  id="form-phone"
                  placeholder="e.g. +00 1234 5678"
                  required
                />{" "}
              </div>
            </div>
          </section>
        </div>
        {/* <section>
          <label htmlFor="">Full name</label>
          <input
            defaultValue={""}
            type="text"
            name="fullname"
            id="form-fullname"
            placeholder="your name here"
          />
        </section> */}
        <div>
          <h3>Billing address</h3>
          <section className="formInput">
            <label htmlFor="form-street" className="labelGuestList">
              Street name
            </label>{" "}
            <div className="formInputCont ">
              <div>
                <input
                  defaultValue={""}
                  type="text"
                  name="street"
                  id="form-street"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </section>

          <section className="formInput">
            <label htmlFor="form-street" className="labelGuestList">
              Apartment (number, floor, door, etc)
            </label>
            <div className="formInputCont ">
              <div>
                <input
                  defaultValue={""}
                  type="text"
                  name="apartment"
                  id="form-apartment"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </section>

          <section className="formInput">
            <label htmlFor="form-city" className="labelGuestList">
              City
            </label>
            <div className="formInputCont ">
              <div>
                <input
                  defaultValue={""}
                  type="text"
                  name="city"
                  id="form-city"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </section>
          <section className="formInput">
            <label htmlFor="form-country" className="labelGuestList">
              Country
            </label>
            <div className="formInputCont ">
              <div>
                <input
                  defaultValue={""}
                  type="text"
                  name="country"
                  id="form-country"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </section>
        </div>

        <div className="card_details">
          <h3>Card details</h3>
          <section className="formInput">
            <label htmlFor="form-fullname" className="labelGuestList">
              Name on card
            </label>{" "}
            <div className="formInputCont ">
              <div>
                <input
                  defaultValue={""}
                  type="text"
                  name="fullname"
                  id="form-fullname"
                  placeholder=""
                  required
                />{" "}
              </div>
            </div>
          </section>
          <section className="formInput">
            <label htmlFor="" className="labelGuestList">
              Card number
            </label>
            <div className="formInputCont ">
              <div>
                <input name="cardnumber" {...getCardNumberProps()} />{" "}
              </div>
            </div>
            <small>
              {erroredInputs.cardNumber && erroredInputs.cardNumber}
            </small>
          </section>

          <section className="formInput">
            <label htmlFor="" className="labelGuestList">
              Expiry date
            </label>
            <div className="formInputShorter formInputCont">
              <div>
                <input name="expirydate" {...getExpiryDateProps()} required/>{" "}
              </div>
            </div>
            <small>
              {erroredInputs.expiryDate && erroredInputs.expiryDate}
            </small>
          </section>

          <section className="formInput">
            <label htmlFor="" className="labelGuestList">
              Security code
            </label>
            <div className="formInputShorter formInputCont ">
              <div>
                <input name="cvc" {...getCVCProps()} required/>{" "}
              </div>
            </div>
            <small>{erroredInputs.cvc && erroredInputs.cvc}</small>
          </section>
        </div>

        <div className="checkoutBtns">
        <button
          className="gobackBtn"
          onClick={props.changePage}
          name="back"></button>

        <button
          className="completeBtn"
          name="next"
          ></button>
      </div>
      </form>


    </div>
  );
}

export default PaymentDetails;
