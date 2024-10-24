import { NextResponse } from 'next/server';
import pool from './db';

export async function POST(req: Request) {
  const { name, mail, password } = await req.json();

  try {
    const query = 'INSERT INTO users (name, mail, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, mail, password];

    const result = await pool.query(query, values);

    return NextResponse.json({ message: 'Usuario creado exitosamente', user: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error al crear el usuario:', error);
    return NextResponse.json({ message: 'Error al crear el usuario', error: 'Error interno' }, { status: 500 });
  }
}
