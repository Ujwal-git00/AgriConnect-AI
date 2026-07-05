import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const USERS_FILE = join(__dirname, "users.json");

const PORT = Number(process.env.PORT || 5000);

function loadUsers() {
  if (!existsSync(USERS_FILE)) return [];
  try {
    return JSON.parse(readFileSync(USERS_FILE, "utf-8"));
  } catch (error) {
    return [];
  }
}

function saveUsers(list) {
  writeFileSync(USERS_FILE, JSON.stringify(list, null, 2));
}

let users = loadUsers();
let nextId = users.reduce((max, user) => Math.max(max, user.id), 0) + 1;

const dashboard = {
  farmProfile: {
    farmSize: "3.5 acres",
    soilType: "Red loamy soil",
    irrigation: "Drip and borewell",
    season: "Kharif",
    primaryCrops: ["Tomato", "Paddy", "Chilli"]
  },
  weather: {
    location: "Mysuru",
    summary: "Partly cloudy",
    temperature: 27,
    humidity: 74,
    rainfallChance: 42
  },
  advisories: [
    "Irrigate tomato beds before 9 AM to reduce evaporation loss.",
    "Scout paddy fields for leaf folder activity this week.",
    "Apply compost around chilli plants after the next light rain."
  ],
  cropRecommendations: [
    {
      crop: "Tomato",
      score: 92,
      reason: "Matches current temperature, drip irrigation, and Mysuru market demand.",
      season: "Kharif",
      expectedMargin: "High"
    },
    {
      crop: "Ragi",
      score: 86,
      reason: "Low water need and strong fit for red loamy soil.",
      season: "Kharif",
      expectedMargin: "Medium"
    },
    {
      crop: "Green Gram",
      score: 79,
      reason: "Short crop cycle, improves soil nitrogen, and works well after paddy.",
      season: "Late Kharif",
      expectedMargin: "Medium"
    }
  ],
  marketIntelligence: {
    bestSellingWindow: "Next 12-18 days",
    insight: "Tomato prices are improving in Mysuru APMC while arrivals remain moderate.",
    action: "Hold graded produce for staggered sale if storage is available.",
    demandSignals: ["Hotel demand rising", "Moderate mandi arrivals", "Nearby district prices up 6%"]
  },
  diseaseRisk: {
    crop: "Tomato",
    riskLevel: "Medium",
    condition: "Humidity above 70% with cloudy weather",
    prevention: [
      "Remove lower infected leaves and improve air movement.",
      "Avoid evening irrigation for the next three days.",
      "Use a recommended preventive spray after local expert confirmation."
    ]
  },
  schemes: [
    {
      name: "PM-KISAN",
      benefit: "Direct income support for eligible farmers.",
      fit: "High",
      nextStep: "Verify Aadhaar-linked land record status."
    },
    {
      name: "PM Fasal Bima Yojana",
      benefit: "Crop insurance against weather and yield losses.",
      fit: "High",
      nextStep: "Check enrollment window before sowing."
    },
    {
      name: "Kisan Credit Card",
      benefit: "Short-term credit for crop and farm expenses.",
      fit: "Medium",
      nextStep: "Prepare land documents and bank account details."
    }
  ],
  marketplace: [
    {
      buyer: "FreshMart Aggregators",
      crop: "Tomato",
      quantity: "1.2 tons",
      offer: 2550,
      location: "Mysuru",
      status: "Open"
    },
    {
      buyer: "Mandya Rice Traders",
      crop: "Paddy",
      quantity: "3 tons",
      offer: 2220,
      location: "Mandya",
      status: "Negotiating"
    },
    {
      buyer: "SpiceLink Foods",
      crop: "Chilli",
      quantity: "500 kg",
      offer: 13600,
      location: "Byadgi",
      status: "Open"
    }
  ],
  marketPrices: [
    { crop: "Tomato", market: "Mysuru APMC", price: 2450, trend: "up" },
    { crop: "Paddy", market: "Mandya", price: 2180, trend: "stable" },
    { crop: "Chilli", market: "Byadgi", price: 13200, trend: "down" }
  ],
  tasks: [
    { id: 1, label: "Check soil moisture in Plot A", done: false },
    { id: 2, label: "Upload crop photo for disease scan", done: false },
    { id: 3, label: "Review mandi prices before harvest booking", done: true }
  ]
};

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function getUserFromToken(req) {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  const match = token.match(/^token-(\d+)$/);
  if (!match) return null;
  return users.find((user) => user.id === Number(match[1])) || null;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.url === "/api/health" && req.method === "GET") {
    return sendJson(res, 200, { status: "ok", service: "AgriConnect AI backend" });
  }

  if (req.url === "/api/signup" && req.method === "POST") {
    try {
      const { name, email, password, location } = await readBody(req);

      if (!name || !String(name).trim()) {
        return sendJson(res, 400, { message: "Please enter your name" });
      }
      if (!isValidEmail(email)) {
        return sendJson(res, 400, { message: "Please enter a valid email address" });
      }
      if (!password || String(password).length < 4) {
        return sendJson(res, 400, { message: "Password must be at least 4 characters" });
      }

      const exists = users.some((user) => user.email.toLowerCase() === String(email).toLowerCase());
      if (exists) {
        return sendJson(res, 409, { message: "An account with this email already exists. Please log in instead." });
      }

      const user = {
        id: nextId++,
        name: String(name).trim(),
        role: "Farmer",
        location: location && String(location).trim() ? String(location).trim() : "Not specified",
        email: String(email).toLowerCase(),
        password: String(password)
      };

      users.push(user);
      saveUsers(users);

      const { password: _password, ...safeUser } = user;
      return sendJson(res, 201, {
        token: `token-${user.id}`,
        user: safeUser
      });
    } catch (error) {
      return sendJson(res, 400, { message: "Could not read signup details" });
    }
  }

  if (req.url === "/api/login" && req.method === "POST") {
    try {
      const { email, password } = await readBody(req);
      const user = users.find(
        (item) => item.email.toLowerCase() === String(email || "").toLowerCase() && item.password === password
      );

      if (!user) {
        return sendJson(res, 401, { message: "Invalid email or password. New here? Create an account instead." });
      }

      const { password: _password, ...safeUser } = user;
      return sendJson(res, 200, {
        token: `token-${user.id}`,
        user: safeUser
      });
    } catch (error) {
      return sendJson(res, 400, { message: "Could not read login details" });
    }
  }

  if (req.url === "/api/dashboard" && req.method === "GET") {
    const user = getUserFromToken(req);
    if (!user) {
      return sendJson(res, 401, { message: "Please log in to view the dashboard" });
    }

    const { password: _password, ...safeUser } = user;
    return sendJson(res, 200, { user: safeUser, ...dashboard });
  }

  return sendJson(res, 404, { message: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`AgriConnect AI backend running at http://localhost:${PORT}`);
});
