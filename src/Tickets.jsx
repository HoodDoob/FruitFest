import React from "react";
import { useState } from "react";
import CheckoutForm from "./components/CheckoutForm";
import TicketHeader from "./components/TicketHeader";
import TicketList from "./components/TicketList";

function Tickets() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* <TicketHeader /> */}

      <main>
        {!showForm && <TicketList setShowForm={setShowForm}/>}
        {showForm && <CheckoutForm showForm={showForm}/>}
      </main>
    </div>
  );
}

export default Tickets;
