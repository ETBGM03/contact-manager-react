import { useState, useEffect } from "react";
import { URL } from "./utils/constants";

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

function App() {
  const [contactList, setContactList] = useState<Contact[]>([]);

  function handleCreateContact() {
    alert("create contact");
  }

  useEffect(() => {
    const controller = new AbortController();
    const getContacts = async () => {
      try {
        const data = await fetch(URL, { signal: controller.signal });
        const response = await data.json();

        setContactList(response);
      } catch (err) {
        console.log(err);
      }
    };

    getContacts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
    <h3 className="font-poppins">HOLAAAA</h3>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contactList.map((contact) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {contact.name}
                </th>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.address}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleCreateContact}>Create a contact</button>
      </div>
    </>
  );
}

export default App;
