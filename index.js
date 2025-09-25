// cli/index.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'EMP> '
});

let employees = []; // in-memory array of { id: string, name: string }

function showMenu() {
  console.log('\nEmployee Management CLI');
  console.log('1) List employees');
  console.log('2) Add employee');
  console.log('3) Remove employee by ID');
  console.log('4) Find employee by ID');
  console.log('5) Help');
  console.log('6) Exit\n');
  rl.prompt();
}

function listEmployees() {
  if (employees.length === 0) {
    console.log('No employees yet.');
  } else {
    console.log('\nEmployees:');
    employees.forEach((e, i) => {
      console.log(`${i + 1}. ${e.name} (ID: ${e.id})`);
    });
  }
  showMenu();
}

function addEmployee() {
  rl.question('Enter name: ', (nameRaw) => {
    const name = (nameRaw || '').trim();
    if (!name) {
      console.log('Name cannot be empty.');
      return showMenu();
    }
    rl.question('Enter ID: ', (idRaw) => {
      const id = (idRaw || '').trim();
      if (!id) {
        console.log('ID cannot be empty.');
        return showMenu();
      }
      if (employees.some(e => e.id === id)) {
        console.log(`Employee with ID "${id}" already exists.`);
        return showMenu();
      }
      employees.push({ id, name });
      console.log(`Added: ${name} (ID: ${id})`);
      showMenu();
    });
  });
}

function removeEmployee() {
  rl.question('Enter ID to remove: ', (idRaw) => {
    const id = (idRaw || '').trim();
    const idx = employees.findIndex(e => e.id === id);
    if (idx === -1) {
      console.log(`No employee found with ID "${id}".`);
    } else {
      const removed = employees.splice(idx, 1)[0];
      console.log(`Removed: ${removed.name} (ID: ${removed.id})`);
    }
    showMenu();
  });
}

function findEmployee() {
  rl.question('Enter ID to find: ', (idRaw) => {
    const id = (idRaw || '').trim();
    const found = employees.find(e => e.id === id);
    if (!found) {
      console.log(`No employee found with ID "${id}".`);
    } else {
      console.log(`Found: ${found.name} (ID: ${found.id})`);
    }
    showMenu();
  });
}

function showHelp() {
  console.log('\nType the option number and press Enter. Eg. "2" to add an employee.');
  console.log('You can also press Ctrl+C to exit.');
  showMenu();
}

rl.on('line', (line) => {
  const input = line.trim();
  switch (input) {
    case '1': listEmployees(); break;
    case '2': addEmployee(); break;
    case '3': removeEmployee(); break;
    case '4': findEmployee(); break;
    case '5': showHelp(); break;
    case '6': rl.close(); break;
    default:
      console.log('Unknown option. Type 5 for help.');
      showMenu();
  }
}).on('close', () => {
  console.log('\nGoodbye — session ended. (All data was in memory and is now cleared.)');
  process.exit(0);
});

// Start
showMenu();