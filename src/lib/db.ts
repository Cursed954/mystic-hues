// MongoDB Database Schema Configuration
// Note: This project uses Lovable Cloud (Supabase) instead of MongoDB for backend functionality
// The following schemas are provided for reference only

export interface MongoDBSchemas {
  users: {
    _id: string;
    email: string;
    password: string; // bcrypt hashed
    full_name: string;
    avatar_url?: string;
    bio?: string;
    phone?: string;
    date_of_birth?: Date;
    created_at: Date;
    updated_at: Date;
  };

  profiles: {
    _id: string;
    user_id: string; // Foreign key to users._id
    preferences: {
      language: string;
      currency: string;
      notifications: boolean;
    };
    travel_history: Array<{
      destination: string;
      date: Date;
      rating: number;
    }>;
    favorite_states: string[];
    created_at: Date;
    updated_at: Date;
  };

  trips: {
    _id: string;
    user_id: string;
    title: string;
    description: string;
    destination: string;
    start_date: Date;
    end_date: Date;
    status: 'planned' | 'active' | 'completed';
    itinerary: Array<{
      day: number;
      activities: string[];
      location: string;
    }>;
    created_at: Date;
    updated_at: Date;
  };

  sessions: {
    _id: string;
    user_id: string;
    session_token: string; // JWT token
    expires_at: Date;
    ip_address: string;
    user_agent: string;
    created_at: Date;
  };
}

// MongoDB Connection Configuration
export const mongoConfig = {
  url: process.env.MONGO_URL || "mongodb+srv://Deepanshu954:25148912@cluster0.8wpbjpq.mongodb.net/mystic-india",
  database: "mystic-india",
  collections: {
    users: "users",
    profiles: "profiles", 
    trips: "trips",
    sessions: "sessions"
  }
};

// JWT Configuration
export const jwtConfig = {
  adminPassword: process.env.JWT_ADMIN_PASSWORD || "25148912",
  userPassword: process.env.JWT_USER_PASSWORD || "25148912",
  expiresIn: "7d"
};

// Note: This project uses Supabase for authentication and database functionality
// The above schemas are provided for MongoDB reference but are implemented in Supabase
// Actual database operations should use the Supabase client from @/integrations/supabase/client