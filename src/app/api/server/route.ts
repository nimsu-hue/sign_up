import { NextResponse } from 'next/server';
import pool from './db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const { name, mail, password } = await req.json();
    const saltRounds: number = 10;

    async function hashPassword(password: string): Promise<string> {
        const hash: string = await bcrypt.hash(password, saltRounds);
        return hash;
    }

    try {
        const checkQuery = 'SELECT * FROM users WHERE mail = $1 OR name = $2';
        const checkValues = [mail, name];
        const checkResult = await pool.query(checkQuery, checkValues);
        
        if (checkResult.rows.length > 0) {
            return NextResponse.json({ 
                message: 'El correo electrónico o el nombre de usuario ya están en uso.' 
            }, { status: 409 });
        }
        
        const hashedPassword = await hashPassword(password)
        const query = 'INSERT INTO users (name, mail, password_hash) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, mail, hashedPassword];
        const result = await pool.query(query, values);

        return NextResponse.json({ 
            message: 'Usuario creado exitosamente', 
            user: result.rows[0] 
        }, { status: 201 });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return NextResponse.json({ 
            message: 'Error al crear el usuario', 
            error: 'Error interno' 
        }, { status: 500 });
    }
}
