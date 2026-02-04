# Equestrian Legacy - Backend API

NestJS backend for the Equestrian Legacy horse training and breeding simulation game.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Docker Desktop (for MongoDB)
- The `shared` module (located in `../shared`)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start MongoDB:**
```bash
docker-compose up -d
```

This will start MongoDB on `localhost:27017` with:
- Username: `admin`
- Password: `password123`
- Database: `equestrian_legacy`

3. **Configure environment:**
The `.env` file is already set up. You can modify it if needed:
```bash
# Database
MONGODB_URI=mongodb://admin:password123@localhost:27017/equestrian_legacy?authSource=admin

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Game settings
STARTING_MONEY=10000
MAX_STABLE_SIZE=10
DAILY_STABLE_COST_PER_HORSE=10
```

4. **Start the API:**
```bash
npm run start:dev
```

The API will be running at `http://localhost:3000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/              # JWT authentication
│   │   ├── dto/           # Login/register DTOs
│   │   ├── guards/        # Auth guards
│   │   ├── strategies/    # Passport strategies
│   │   └── auth.service.ts
│   │
│   ├── users/             # User management
│   │   ├── schemas/       # User Mongoose schema
│   │   ├── dto/           # User DTOs
│   │   └── users.service.ts
│   │
│   ├── horses/            # Horse CRUD and training
│   │   ├── schemas/       # Horse Mongoose schema
│   │   ├── dto/           # Horse DTOs
│   │   └── horses.service.ts  # Uses shared module
│   │
│   ├── breeding/          # Horse breeding
│   │   └── breeding.service.ts  # Uses shared module
│   │
│   ├── game/              # Game state and day advancement
│   │   └── game.service.ts
│   │
│   ├── app.module.ts      # Main module
│   └── main.ts            # Entry point
│
├── docker-compose.yml     # MongoDB container
├── .env                   # Environment variables
└── package.json
```

## 🔌 API Endpoints

### Authentication

**Register**
```http
POST /auth/register
Content-Type: application/json

{
  "username": "player1",
  "email": "player1@example.com",
  "password": "password123"
}

Response: {
  "access_token": "eyJhbGc...",
  "user": {
    "id": "...",
    "username": "player1",
    "email": "player1@example.com"
  }
}
```

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "username": "player1",
  "password": "password123"
}

Response: Same as register
```

### User Profile

**Get Profile**
```http
GET /users/profile
Authorization: Bearer <token>

Response: {
  "id": "...",
  "username": "player1",
  "email": "player1@example.com",
  "money": 10000,
  "currentDay": 1,
  "timeRemainingToday": 480,
  "trainerSkillLevel": 50
}
```

### Horses

**Create Starter Horse**
```http
POST /horses
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Thunder",
  "gender": "stallion",
  "minPotential": 50,
  "maxPotential": 80
}

Response: Full horse object with genes, stats, etc.
```

**Get All Horses**
```http
GET /horses
Authorization: Bearer <token>

Response: Array of horse objects
```

**Get Single Horse**
```http
GET /horses/:id
Authorization: Bearer <token>

Response: Full horse object
```

**Train Horse**
```http
POST /horses/train
Authorization: Bearer <token>
Content-Type: application/json

{
  "horseId": "...",
  "skillId": "haltering",
  "duration": 15
}

Response: {
  "success": true,
  "skillGained": 3.2,
  "newSkillLevel": 23.2,
  "statsGained": {
    "bravery": 0.032,
    "intelligence": 0.016
  },
  "fatigueGained": 3,
  "message": "Thunder eagerly worked on Haltering...",
  "timeRemaining": 465
}
```

**Update Housing**
```http
PUT /horses/:id/housing
Authorization: Bearer <token>
Content-Type: application/json

{
  "housing": "stall"
}

Response: Updated horse object
```

### Breeding

**Breed Two Horses**
```http
POST /breeding
Authorization: Bearer <token>
Content-Type: application/json

{
  "sireId": "...",
  "damId": "...",
  "foalName": "Lightning"
}

Response: New foal horse object
Cost: $5,000
```

### Game Management

**Get Game State**
```http
GET /game/state
Authorization: Bearer <token>

Response: {
  "currentDay": 1,
  "timeRemainingToday": 480,
  "money": 10000,
  "trainerSkillLevel": 50,
  "horseCount": 2,
  "horses": [...]
}
```

**Advance Day**
```http
POST /game/advance-day
Authorization: Bearer <token>

Response: {
  "newDay": 2,
  "dailyCost": 20,
  "horseUpdates": [
    {
      "horseId": "...",
      "horseName": "Thunder",
      "newMood": "Cheerful",
      "newFatigue": 10
    }
  ]
}
```

## 🎮 How It Works

### Integration with Shared Module

The backend imports and uses the shared game logic:

```typescript
// In horses.service.ts
import {
  applyTraining,
  validateSkillTraining,
  calculateDailyMood,
  // ... etc
} from '../../../shared';

// Use shared functions
const result = applyTraining(horse, skillId, duration, trainer);
```

All game mechanics (genetics, training formula, moods) are in the shared module, ensuring consistency between backend and frontend.

### Training Flow

1. Frontend calls `POST /horses/train` with horse ID, skill, and duration
2. Backend validates:
   - User has enough time
   - Horse can train (age, fatigue, prerequisites)
3. Backend calls `applyTraining()` from shared module
4. Shared module calculates skill gains using your formula
5. Backend updates horse in MongoDB
6. Backend deducts time from user
7. Frontend receives training result

### Daily Cycle

1. Player trains horses throughout the day (480 minutes available)
2. When out of time, player calls `POST /game/advance-day`
3. Backend:
   - Calculates new mood for each horse using shared module
   - Reduces fatigue
   - Resets satisfaction
   - Ages horses (every 365 days)
   - Deducts stable costs
4. Player can train again with fresh time

## 🐛 Troubleshooting

**MongoDB connection failed:**
```bash
# Make sure Docker is running
docker ps

# If MongoDB container isn't running:
docker-compose up -d

# Check logs:
docker logs equestrian-mongodb
```

**"Cannot find module '../../../shared'":**
Make sure the shared module is in the correct location:
```
your-project/
├── shared/          # Shared module here
└── backend/         # Backend here
```

**Port 3000 already in use:**
Change the `PORT` in `.env` file:
```
PORT=3001
```

## 🔧 Development Commands

```bash
# Start in development mode (auto-reload)
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## 🗄️ Database Management

**View data with MongoDB Compass:**
1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connect to: `mongodb://admin:password123@localhost:27017`
3. Navigate to `equestrian_legacy` database

**Reset database:**
```bash
# Stop MongoDB
docker-compose down

# Remove data volume
docker volume rm equestrian-backend_mongodb_data

# Start fresh
docker-compose up -d
```

## 📊 Available Skills

The game includes these trainable skills (from shared module):

**Foundation:** haltering, leading, grooming, standing, tying, picking_up_feet
**Ground Work:** longeing
**Riding:** saddling, mounting, walk_under_saddle, trot_under_saddle, canter_under_saddle
**Advanced:** jumping

Each skill has:
- Prerequisites (other skills needed first)
- Minimum stats (required training levels)
- Stat influences (stats that help learn it)
- Stat contributions (stats that improve from training it)

## 🚀 Next Steps

With the backend running, you can:
1. Test endpoints with Postman or curl
2. Build a frontend that consumes this API
3. Add more endpoints as needed (shows, competitions, etc.)

## 📝 Notes

- JWT tokens expire after 7 days (configurable in `.env`)
- Training costs time, not money
- Breeding costs $5,000
- Daily stable costs are $10 per horse
- Horses must be 2+ years to train
- Horses must be 3+ years to breed
- Max stable size is 10 horses (configurable)
