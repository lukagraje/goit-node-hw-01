const { nanoid } = require("nanoid");

const fs = require("node:fs").promises;
const path = require("node:path");



const contactsPath = "./db/contacts.json";

async function listContacts() {
  const file = await fs.readFile(path.resolve(contactsPath));
  const contacts = JSON.parse(file);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(21),
    name,
    email,
    phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
