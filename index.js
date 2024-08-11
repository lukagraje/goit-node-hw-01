const { Command } = require("commander");
require("colors");
const { listContacts, getContactById, addContact, removeContact } = require("./contacts");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contacts = await listContacts();
          console.table(contacts)
      break;

    case "get":
          const contact = await getContactById(id);
          console.log(contact);
      break;

    case "add":
          const newContact = await addContact(name, email, phone);
          console.log("New contact added!".green);
          console.log(newContact);
      break;

    case "remove":
          const updatedContacts = await removeContact(id);
          console.log(`Contact with id ${id} removed!`.green)
          console.table(updatedContacts);
      break;

    default:
      console.warn("Unknown action type!".red);
  }
}

invokeAction(argv);
