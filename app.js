const express = require("express");
const app = express();

app.use(express.json());

const customers = [
  {
    id: 1,
    first_name: "Trudey",
    last_name: "McCutcheon",
    email: "tmccutcheon0@php.net",
    gender: "Female",
  },
  {
    id: 2,
    first_name: "Tracy",
    last_name: "Nuemann",
    email: "tnuemann1@discuz.net",
    gender: "Male",
  },
  {
    id: 3,
    first_name: "Quintina",
    last_name: "Kinnin",
    email: "qkinnin2@yellowpages.com",
    gender: "Female",
  },
  {
    id: 4,
    first_name: "Saba",
    last_name: "Eltune",
    email: "seltune3@mlb.com",
    gender: "Female",
  },
  {
    id: 5,
    first_name: "Maximo",
    last_name: "McCloid",
    email: "mmccloid4@google.cn",
    gender: "Male",
  },
  {
    id: 6,
    first_name: "Marrissa",
    last_name: "Hatfield",
    email: "mhatfield5@engadget.com",
    gender: "Genderfluid",
  },
  {
    id: 7,
    first_name: "Prince",
    last_name: "Hayzer",
    email: "phayzer6@hugedomains.com",
    gender: "Male",
  },
  {
    id: 8,
    first_name: "Margareta",
    last_name: "Wickson",
    email: "mwickson7@feedburner.com",
    gender: "Female",
  },
  {
    id: 9,
    first_name: "Cory",
    last_name: "McCaster",
    email: "cmccaster8@unc.edu",
    gender: "Male",
  },
  {
    id: 10,
    first_name: "Rees",
    last_name: "Southeran",
    email: "rsoutheran9@bloglovin.com",
    gender: "Male",
  },
];

app.get("/customers", (req, res) => {
  res
    .status(200)
    .json({ data: customers, message: "Data fetched successfully" });
});

app.get("/customers/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.find((customer) => customer.id == id);
  if (customer) {
    res.status(200).json({ data: [customer], message: "Customer found" });
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
});

app.get("/customers/name/:name", (req, res) => {
  const name = req.params.name;
  const customer = customers.filter(
    (customer) =>
      customer.first_name.toLowerCase().includes(name.toLowerCase()) ||
      customer.last_name.toLowerCase().includes(name.toLowerCase())
  );
  if (customer) {
    res.status(200).json({ data: customer, message: "Customer found" });
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
});

app.post("/add/customer", (req, res) => {
  const { first_name, last_name, email, gender } = req.body;
  const isExist = validateAlreadyExist(first_name, last_name, email);
  if (isExist) {
    return res.status(400).json({ message: "Customer already exists" });
  } else if (first_name && last_name && email && gender) {
    const customer = {
      id: customers.length + 1,
      first_name,
      last_name,
      email,
    };
    customers.push(customer);
    res.status(201).json(customer);
  } else {
    res
      .status(400)
      .json({ message: "Please provide customer information properly" });
  }
});

app.put("/update/customer/:id", (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email } = req.body;
  const customer = customers.find((customer) => customer.id == id);
  const isExist = validateAlreadyExist(first_name, last_name, email);

  if (!first_name || !last_name || !email) {
    return res
      .status(400)
      .json({ message: "Please provide customer information properly" });
  } else if (isExist) {
    return res.status(400).json({ message: "Customer already exists" });
  } else if (customer) {
    customer.first_name = first_name;
    customer.last_name = last_name;
    customer.email = email;
    res.status(200).json(customer);
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
});

app.patch("/update/customer/:id", (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email } = req.body;
  const customer = customers.find((customer) => customer.id == id);
  const isExist = validateAlreadyExist(first_name, last_name, email);

  if (isExist) {
    return res.status(400).json({ message: "Customer already exists" });
  } else if (customer) {
    if (first_name) {
      customer.first_name = first_name;
    }
    if (last_name) {
      customer.last_name = last_name;
    }
    if (email) {
      customer.email = email;
    }
    res.status(200).json(customer);
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
});

app.delete("/delete/customer/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.find((customer) => customer.id == id);
  if (customer) {
    customers.splice(customers.indexOf(customer), 1);
    res.status(200).json({ message: "Customer deleted successfully" });
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
});

function validateAlreadyExist(first_name, last_name, email) {
  return customers.find(
    (customer) =>
      customer.first_name === first_name &&
      customer.last_name === last_name &&
      customer.email === email
  );
}

app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
