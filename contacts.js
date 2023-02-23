const path = require('path')
const fs = require('fs/promises')

const {nanoid} = require('nanoid')

const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsArr = await listContacts(contactsPath);
  const oneContact = contactsArr.find(item => item.id === contactId);
  return oneContact || null;
}

async function removeContact(contactId) {
  const contactsArr = await listContacts(contactsPath);
  const indexRemoveContact = contactsArr.findIndex(item => item.id === contactId);
  if (indexRemoveContact === -1) {
    return null;
  }
  const [result] = contactsArr.splice(indexRemoveContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2))
  return result;
}

async function addContact({name, email, phone}) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  const contactsArr = await listContacts(contactsPath);
  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  return newContact;
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}