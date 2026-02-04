# Equestrian Legacy - Frontend

React + TypeScript frontend for the Equestrian Legacy horse training and breeding game.

## Features

✅ **Authentication** - Login and registration
✅ **Horse Management** - Create, view, and manage horses
✅ **Training System** - Train horses in various skills
✅ **Real-time Updates** - See stat improvements, skill gains, and mood changes
✅ **Day Management** - Advance days to reset time and update moods
✅ **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - API calls
- **Tailwind CSS** - Styling
- **Shared Module** - Game logic from `../shared`

## Prerequisites

- Node.js 18+
- Backend running on `http://localhost:3000`
- Shared module at `../shared`

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Open in Browser

Navigate to `http://localhost:5173` and you should see the login page!

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components (future)
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── pages/             # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   └── HorseDetails.tsx
│   ├── services/          # API service layer
│   │   └── api.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── App.tsx            # Main app with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## Usage

### Creating an Account

1. Click "Register" on the login page
2. Enter username, email, and password
3. You'll be automatically logged in and redirected to the dashboard

### Creating a Horse

1. Click "+ Create Horse" on the dashboard
2. Enter a name and select gender
3. The horse will be created with random genetics

### Training a Horse

1. Click on a horse to view details
2. Click "Train Horse"
3. Select a skill and duration
4. See the training results!

**Available Skills:**
- **Foundation**: Haltering, Leading, Grooming, Standing, Tying, Picking Up Feet
- **Ground Work**: Longeing
- **Riding**: Saddling, Mounting, Walk/Trot/Canter Under Saddle
- **Advanced**: Jumping

### Understanding the UI

**Dashboard:**
- Shows all your horses
- Displays day, time remaining, and money
- Quick horse overview (personality, mood, fatigue)

**Horse Details:**
- Full stats with training progress
- Genetic potential (star ratings)
- Skills with levels
- Training interface

**Training Results:**
- Skill points gained
- Stats improved
- Fatigue added
- Personality-based message

### Day System

- Each day you have **480 minutes** (8 hours) to train
- Training costs time based on duration (5/15/30/60 min)
- When out of time, click "Advance Day"
- Advancing day:
  - Resets time to 480
  - Updates all horse moods
  - Reduces fatigue
  - Costs daily stable fees

## API Integration

The frontend connects to the backend API at `http://localhost:3000`:

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /users/profile` - Get user data
- `GET /horses` - Get all horses
- `GET /horses/:id` - Get one horse
- `POST /horses` - Create horse
- `POST /horses/train` - Train horse
- `POST /game/advance-day` - Advance day

## Styling

Uses Tailwind CSS with custom utility classes:

- `.btn` - Base button style
- `.btn-primary` - Primary action button (green)
- `.btn-secondary` - Secondary button (gray)
- `.card` - White card with shadow
- `.input` - Form input
- `.label` - Form label

## Future Enhancements

Potential features to add:

- **Breeding Interface** - Select two horses and create foals
- **Horse Comparison** - Compare genetics between horses
- **Training History** - View past training sessions
- **Statistics** - Track progress over time
- **Shows/Competitions** - Compete with your horses
- **Market** - Buy and sell horses
- **Achievements** - Track milestones
- **Mobile App** - React Native version

## Troubleshooting

**"Failed to fetch"**
- Make sure backend is running on `http://localhost:3000`
- Check browser console for CORS errors

**"Cannot find module '@shared'"**
- Make sure shared module is at `../shared`
- Shared module structure should match import paths

**Authentication issues**
- Check that token is being stored in localStorage
- Verify JWT_SECRET matches in backend

**Styles not loading**
- Run `npm install` to ensure Tailwind is installed
- Check that `index.css` is imported in `main.tsx`

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

To serve it:
```bash
npm run preview
```

Or deploy the `dist` folder to any static hosting (Vercel, Netlify, etc.)

---

**Enjoy training your horses!** 🐴✨
