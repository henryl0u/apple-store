import { useState } from "react";

export default function Billing() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  return (
    <div>
      <input
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="bg-gray-100 w-full py-2 px-4 rounded-xl text-black mb-5"
        type="text"
        placeholder="Full Name"
      ></input>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-100 w-full py-2 px-4 rounded-xl text-black mb-5"
        type="email"
        placeholder="Email"
      ></input>
      <input
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="bg-gray-100 w-full py-2 px-4 rounded-xl text-black mb-5"
        type="tel"
        placeholder="Phone Number"
      ></input>
      <input
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="bg-gray-100 w-full py-2 px-4 rounded-xl text-black mb-5"
        type="text"
        placeholder="Address"
      ></input>
      <input
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="bg-gray-100 w-full py-2 px-4 rounded-xl text-black mb-5"
        type="text"
        placeholder="City"
      ></input>
      <input
        name="postalCode"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        className="bg-gray-100 w-full py-2 px-4 rounded-xl text-black mb-5"
        type="text"
        placeholder="Postal Code"
      ></input>
    </div>
  );
}
