import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))
    

def init_db():
    sql = """
        CREATE TABLE IF NOT EXISTS sessions (
            id SERIAL PRIMARY KEY,
            phrase TEXT NOT NULL,
            transcribed TEXT NOT NULL,
            score INTEGER NOT NULL,
            grade TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
        
        CREATE TABLE IF NOT EXISTS streaks (
            id SERIAL PRIMARY KEY,
            day DATE NOT NULL,
            count INTEGER DEFAULT 1
        );
    """
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql)