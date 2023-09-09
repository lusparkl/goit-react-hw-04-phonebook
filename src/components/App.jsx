import { useState, useEffect } from "react";
import { AddContactForm } from "./AddContactForm/AddContactForm";
import { ContactsGroup } from "./ContactsGroup/ContactsGroup";
import { FilterContacts } from "./Filter/Filter";


export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromStorage = localStorage.getItem('contacts');
    setContacts(contactsFromStorage ? JSON.parse(contactsFromStorage) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const onAppendToContacts = contact => {
    if (isPossiblyToAppend(contact.name)) {
      setContacts([...contacts, contact])
    };
  };

  const isPossiblyToAppend = name => {
    for (const contact of contacts) {
      if (name.toLowerCase() === contact.name.toLowerCase()) {
        alert(`${name} is already in your contacts.`);
        return false;
      }
    }
    return true;
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const findContact = searchQuery => {
    setFilter(searchQuery.toLowerCase())
  };

  const displayedContacts = filter
    ? contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    )
    : contacts;

  return (
    <>
      <AddContactForm addContact={onAppendToContacts} />
      <FilterContacts findContact={findContact} />
      <ContactsGroup
        contacts={displayedContacts}
        deleteContact={deleteContact}
      />
    </>
  );
}
// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: ''
//   }

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     this.setState({
//       contacts: contacts ? JSON.parse(contacts) : []
//     })
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contact || this.state.contacts !== null) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   };

//   onAppendToContacts = contact => {
//     if (this.isPossiblyToAppend(contact.name)) this.setState(prevState => ({
//       contacts: [...prevState.contacts, contact]
//     }));
//   };

//   isPossiblyToAppend = name => {
//     for (const contact of this.state.contacts) {
//       if (name.toLowerCase() === contact.name.toLowerCase()) {
//         alert(`${name} is already in your contacts.`);
//         return false;
//       }
//     }
//     return true;
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id)
//     }));
//   };

//   findContact = searchQuery => {
//     this.setState({ filter: searchQuery.toLowerCase() });
//   };

//   render() {
//     const displayedContacts = this.state.filter
//       ? this.state.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.state.filter)
//       )
//       : this.state.contacts;

//     return (
//       <>
//         <AddContactForm addContact={this.onAppendToContacts} />
//         <FilterContacts findContact={this.findContact} />
//         <ContactsGroup
//           contacts={displayedContacts}
//           deleteContact={this.deleteContact}
//         />
//       </>
//     );
//   }
// }